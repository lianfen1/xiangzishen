"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "xzs-news-item",
  props: {
    item: {
      type: Object,
      value: {
        title: "默认测试标题",
        author: "咸虾米"
      }
    }
  },
  data() {
    return {};
  }
};
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.item.picurl,
    b: common_vendor.t($props.item.title),
    c: common_vendor.p({
      name: "clock-o",
      size: "14"
    }),
    d: common_vendor.t($props.item.publish_date),
    e: common_vendor.p({
      name: "eye-o",
      size: "14"
    }),
    f: common_vendor.t($props.item.view_count),
    g: common_vendor.p({
      name: "user-o",
      size: "14"
    }),
    h: common_vendor.t($props.item.author),
    i: "/pages/newDetail/newDetail?id=" + $props.item._id
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d10048a4"], ["__file", "D:/微信小程序/teaCulture/components/xzs-news-item/xzs-news-item.vue"]]);
wx.createComponent(Component);
