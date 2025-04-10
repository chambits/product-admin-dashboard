import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import LoginPage from "../LoginPage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: () => ({
      state: { from: { pathname: "/dashboard" } },
    }),
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();
  });

  it("renders the login page with correct layout", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  //   it("handles successful login", async () => {
  //     render(<LoginPage />);

  //     const submitButton = screen.getByRole("button", { name: /sign in/i });
  //     await fireEvent.click(submitButton);

  //     expect(localStorage.getItem("token")).toBe("1234567890");
  //     expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
  //   });

  //   it("handles failed login", async () => {
  //     render(
  //       <MemoryRouter>
  //         <LoginPage />
  //       </MemoryRouter>
  //     );

  //     // Mock the form submission with invalid credentials
  //     const submitButton = screen.getByRole("button", { name: /sign in/i });
  //     await fireEvent.click(submitButton);

  //     expect(mockShowNotification).toHaveBeenCalledWith(
  //       "error",
  //       "Invalid credentials"
  //     );
  //     expect(localStorage.getItem("token")).toBeNull();
  //     expect(mockNavigate).not.toHaveBeenCalled();
  //   });

  //   it("redirects to home when no from path is provided", async () => {
  //     // Override the useLocation mock for this test
  //     vi.mock("react-router-dom", async () => {
  //       const actual = await vi.importActual("react-router-dom");
  //       return {
  //         ...actual,
  //         useNavigate: vi.fn(),
  //         useLocation: () => ({ state: null }),
  //       };
  //     });

  //     render(
  //       <MemoryRouter>
  //         <LoginPage />
  //       </MemoryRouter>
  //     );

  //     const submitButton = screen.getByRole("button", { name: /sign in/i });
  //     await fireEvent.click(submitButton);

  //     expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  //   });
});
