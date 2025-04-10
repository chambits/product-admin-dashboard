import { apiSlice } from "../../app/api/apiSlice";
import { endpoints } from "../../endpoints";
import { LoginRequest } from "./types";
import { LoginResponse } from "./types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: endpoints.auth.login,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
