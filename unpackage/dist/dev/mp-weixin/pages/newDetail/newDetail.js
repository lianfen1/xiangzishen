"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      detail: null
    };
  },
  methods: {
    //获取详情页数据  
    getDetail(id) {
      api_apis.newsDetail({
        id
      }).then((res) => {
        res.data.publish_date = utils_common.formatTime(res.data.publish_date, 6);
        res.data.view_count = utils_common.formatNum(res.data.view_count);
        res.data.content = res.data.content.replace(/<p/gi, "<p class='pstyle'");
        res.data.content = res.data.content.replace(/<img/gi, "<img class='imgstyle'");
        common_vendor.index.setNavigationBarTitle({
          title: res.data.title
        });
        this.detail = res.data;
      });
    }
  },
  onLoad(e) {
    this.getDetail(e.id);
  }
};
if (!Array) {
  const _component_van_skeleton = common_vendor.resolveComponent("van-skeleton");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  (_component_van_skeleton + _component_van_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.detail
  }, !$data.detail ? {
    b: common_vendor.p({
      title: true,
      row: "5"
    })
  } : {
    c: common_vendor.t($data.detail.title),
    d: common_vendor.t($data.detail.publish_date),
    e: common_vendor.t($data.detail.author),
    f: common_vendor.t($data.detail.view_count),
    g: common_vendor.p({
      name: "share-o",
      size: "18"
    }),
    h: $data.detail.content
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-efef3d09"], ["__file", "D:/微信小程序/teaCulture/pages/newDetail/newDetail.vue"]]);
wx.createPage(MiniProgramPage);
