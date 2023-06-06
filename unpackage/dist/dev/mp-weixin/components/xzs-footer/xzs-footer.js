"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "xzs-footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.year),
    b: common_assets._imports_0$3
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/微信小程序/teaCulture/components/xzs-footer/xzs-footer.vue"]]);
wx.createComponent(Component);
