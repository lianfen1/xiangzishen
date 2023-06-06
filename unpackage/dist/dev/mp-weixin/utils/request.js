"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://tea.qingnian8.com";
function request(params) {
  let dataObj = params.data || {};
  let headerObj = {
    "content-type": "application/json"
  };
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.request({
      url: baseURL + params.url,
      method: params.method || "GET",
      data: dataObj,
      header: headerObj,
      success: (res) => {
        if (res.data.errCode != 0) {
          reject(res.data);
          common_vendor.wx$1.showToast({
            title: res.data.errMsg,
            mask: true,
            icon: "error"
          });
          return;
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.request = request;
