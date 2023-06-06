"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "xzs-product-item",
  props: {
    item: {
      type: Object,
      value: {
        title: "默认标题"
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    clickPro(id) {
      common_vendor.index.navigateTo({
        url: "/pages/proDetail/proDetail?id=" + id
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.item.picpath,
    b: common_vendor.t($props.item.title),
    c: common_vendor.t($props.item.pronum),
    d: common_vendor.t($props.item.grade),
    e: common_vendor.t($props.item.year),
    f: common_vendor.t($props.item.weight),
    g: common_vendor.t($props.item.price),
    h: common_vendor.o(($event) => $options.clickPro($props.item._id))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6987441a"], ["__file", "D:/微信小程序/teaCulture/components/xzs-product-item/xzs-product-item.vue"]]);
wx.createComponent(Component);
