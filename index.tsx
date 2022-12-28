import { api } from "../../api";
import getCounties from "./getCounties";
import patchAddresses from "./patchAddresses";

export const addressesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCounties: getCounties(build),
    patchAddresses: patchAddresses(build),
  }),
  overrideExisting: true,
});

export const { useGetCountiesQuery, usePatchAddressesMutation } = addressesApi;
