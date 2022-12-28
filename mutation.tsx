import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<any, any>({
    query: ({ id, body }) => ({
      url: `addresses/${id}`,
      method: "PATCH",
      body: body,
    }),
  });
