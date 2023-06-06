"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
const api_apis = require("../../api/apis.js");
const common_assets = require("../../common/assets.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      navArr: [],
      newsArr: []
    };
  },
  methods: {
    getNavData() {
      api_apis.listNav().then((res) => {
        this.navArr = res.data;
      });
    },
    getNewsData() {
      api_apis.queryNews({
        limit: 3,
        hot: true
      }).then((res) => {
        res.data.forEach((item) => {
          item.view_count = utils_common.formatNum(item.view_count);
          item.publish_date = utils_common.formatTime(item.publish_date, 5);
        });
        this.newsArr = res.data;
      });
    },
    goclassify(id) {
      common_vendor.index.reLaunch({
        url: `/pages/classify/classify?idx=${id}`
      });
    }
  },
  created() {
    this.getNavData();
    this.getNewsData();
  }
};
if (!Array) {
  const _easycom_xzs_header2 = common_vendor.resolveComponent("xzs-header");
  const _easycom_xzs_news_item2 = common_vendor.resolveComponent("xzs-news-item");
  const _easycom_xzs_footer2 = common_vendor.resolveComponent("xzs-footer");
  (_easycom_xzs_header2 + _easycom_xzs_news_item2 + _easycom_xzs_footer2)();
}
const _easycom_xzs_header = () => "../../components/xzs-header/xzs-header.js";
const _easycom_xzs_news_item = () => "../../components/xzs-news-item/xzs-news-item.js";
const _easycom_xzs_footer = () => "../../components/xzs-footer/xzs-footer.js";
if (!Math) {
  (_easycom_xzs_header + _easycom_xzs_news_item + _easycom_xzs_footer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_assets._imports_3,
    e: common_vendor.f($data.navArr, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.classname),
        c: item._id,
        d: "/pages/classify/classify?idx=" + index
      };
    }),
    f: common_vendor.f($data.newsArr, (item, k0, i0) => {
      return {
        a: "1cf27b2a-1-" + i0,
        b: common_vendor.p({
          item
        })
      };
    }),
    g: _ctx.index
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/微信小程序/teaCulture/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
