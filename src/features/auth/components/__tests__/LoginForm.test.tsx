import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TokenKey } from "../../../../constants";
import {
  fireEvent,
  mockNavigate,
  render,
  screen,
} from "../../../../test/test-utils";
import { LoginForm } from "../../components/LoginForm";

const mockHandleLogin = vi.fn();
vi.mock("../../hooks/useLogin", () => ({
  useLogin: () => ({
    handleLogin: mockHandleLogin,
    isLoading: false,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form with all elements", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty form submission", async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await fireEvent.click(submitButton);

    expect(
      await screen.findByText("Please input your username!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please input your password!")
    ).toBeInTheDocument();

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("handles successful login", async () => {
    const mockResponse = { data: { token: "test-token" } };
    mockHandleLogin.mockResolvedValueOnce(mockResponse);

    render(<LoginForm />);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Username"), "testuser");
    await user.type(screen.getByPlaceholderText("Password"), "password123");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockHandleLogin).toHaveBeenCalledWith({
      username: "testuser",
      password: "password123",
    });
  });

  it("shows error message for invalid credentials", async () => {
    mockHandleLogin.mockResolvedValueOnce({
      success: false,
      error: "Invalid username or password",
    });

    render(<LoginForm />);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Username"), "testuser");
    await user.type(screen.getByPlaceholderText("Password"), "wrongpass");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText("Invalid username or password")
    ).toBeInTheDocument();
    expect(localStorage.getItem(TokenKey)).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows error message for network error", async () => {
    mockHandleLogin.mockResolvedValueOnce({
      success: false,
      error: "An error occurred",
    });

    render(<LoginForm />);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Username"), "testuser");
    await user.type(screen.getByPlaceholderText("Password"), "password123");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("An error occurred")).toBeInTheDocument();
    expect(localStorage.getItem(TokenKey)).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
