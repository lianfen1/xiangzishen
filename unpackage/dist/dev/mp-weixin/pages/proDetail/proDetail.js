"use strict";
const api_product = require("../../api/product.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      detail: ""
    };
  },
  onLoad(e) {
    api_product.getProductDetail({
      id: e.id
    }).then((res) => {
      this.detail = res.data;
      console.log(this.detail);
    });
  }
};
if (!Array) {
  const _easycom_xzs_header2 = common_vendor.resolveComponent("xzs-header");
  const _easycom_xzs_footer2 = common_vendor.resolveComponent("xzs-footer");
  (_easycom_xzs_header2 + _easycom_xzs_footer2)();
}
const _easycom_xzs_header = () => "../../components/xzs-header/xzs-header.js";
const _easycom_xzs_footer = () => "../../components/xzs-footer/xzs-footer.js";
if (!Math) {
  (_easycom_xzs_header + _easycom_xzs_footer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.detail.picpath,
    b: common_vendor.t($data.detail.title),
    c: common_vendor.t($data.detail.pronum),
    d: common_vendor.t($data.detail.grade),
    e: common_vendor.t($data.detail.year),
    f: common_vendor.t($data.detail.weight),
    g: common_vendor.t($data.detail.price)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-04581891"], ["__file", "D:/微信小程序/teaCulture/pages/proDetail/proDetail.vue"]]);
wx.createPage(MiniProgramPage);
