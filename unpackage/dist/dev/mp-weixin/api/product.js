"use strict";
const utils_request = require("../utils/request.js");
function getProductDetail(data) {
  return utils_request.request({
    url: "/product/detail",
    method: "POST",
    data
  });
}
exports.getProductDetail = getProductDetail;
