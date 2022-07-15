import http from "./http";

const demoApi = {
  normalJson: (params) => http({
    url: "/mockJSON/test.json",
    method: "get",
    params: params
  }),
  abnormalJson: (params) => http({
    url: "/mockJSON/test.json",
    method: "post",
    params: params
  }),
};
export default demoApi;
