import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { API_BASE_URL } from "constants/general";
import { loginUser, logoutUser, setAuthToken } from "../store/slices/auth";
import { RootState } from "../store";

const baseURL = API_BASE_URL;
const mutex = new Mutex();

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      let withoutAuth = Boolean(headers.get("no-auth"));
      if (withoutAuth) {
        headers.delete("no-auth");
        return headers;
      }
      let rootState: any = getState();
      const token = rootState.auth.token;
      if (token) {
        headers.set("x-auth-token", token);
      }

      return headers;
    },
  });
const refreshAppToken = async (api, extraOptions) => {
  const refreshToken = (api.getState() as RootState)?.auth.refreshToken;
  const result = await baseQuery(
    {
      url: `/users/fresh-token/${refreshToken}`,
      headers: { "no-auth": "false" },
    },
    api,
    extraOptions
  );
  if (result.error) {
    throw new Error("Cannot refresh app token.");
  }
  api.dispatch(setAuthToken(result.data));
  return true;
};
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        await refreshAppToken(api, extraOptions);
        result = await baseQuery(args, api, extraOptions);
      } catch {
        api.dispatch(logoutUser());
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: ["services", "storages", "vouchers", "drafts"],
});
