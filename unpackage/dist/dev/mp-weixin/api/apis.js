"use strict";
const utils_request = require("../utils/request.js");
function listNav() {
  return utils_request.request({
    url: "/nav/get",
    method: "POST"
  });
}
function queryNews(data) {
  return utils_request.request({
    url: "/news/get",
    method: "POST",
    data
  });
}
function newsDetail(data) {
  return utils_request.request({
    url: "/news/detail",
    method: "POST",
    data
  });
}
function queryProduct(data) {
  return utils_request.request({
    url: "/product/getlist",
    method: "POST",
    data
  });
}
exports.listNav = listNav;
exports.newsDetail = newsDetail;
exports.queryNews = queryNews;
exports.queryProduct = queryProduct;
