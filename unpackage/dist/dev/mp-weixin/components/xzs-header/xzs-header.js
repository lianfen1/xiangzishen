"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "xzs-header",
  data() {
    return {};
  },
  methods: {
    clickSearch() {
    }
  }
};
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$2,
    b: common_vendor.o($options.clickSearch),
    c: common_vendor.p({
      name: "search",
      color: "rgb(145 118 63)"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/微信小程序/teaCulture/components/xzs-header/xzs-header.vue"]]);
wx.createComponent(Component);
