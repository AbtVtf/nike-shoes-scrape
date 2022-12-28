export const generateQueryObject = (endpointUrl, params) => {
  if (params && typeof params === "string") {
    return {
      url: `${endpointUrl}?&${params}`,
    };
  }
  if (params && typeof params === "object") {
    return {
      url: endpointUrl,
      params: params,
    };
  }
};
