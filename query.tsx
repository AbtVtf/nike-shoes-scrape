import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const getCounties = (build: EndpointBuilder<any, any, any>) =>
  build.query<any, void>({
    query: () => ({
      url: "counties",
    }),
  });

export default getCounties;
