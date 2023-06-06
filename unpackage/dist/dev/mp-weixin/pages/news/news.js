"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_common = require("../../utils/common.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      newsArr: [],
      loading: false,
      isData: false
    };
  },
  methods: {
    //获取新闻列表
    getNewsData(size = 0) {
      this.loading = true;
      api_apis.queryNews({
        limit: 8,
        size
      }).then((res) => {
        res.data.forEach((item) => {
          item.view_count = utils_common.formatNum(item.view_count);
          item.publish_date = utils_common.formatTime(item.publish_date, 5);
        });
        let oldData = this.newsArr;
        let newData = oldData.concat(res.data);
        common_vendor.index.stopPullDownRefresh();
        this.newsArr = newData;
        this.loading = false;
        if (this.newsArr.length == res.total) {
          this.isData = true;
        }
      });
    }
  },
  created() {
    this.getNewsData();
  }
};
if (!Array) {
  const _easycom_xzs_header2 = common_vendor.resolveComponent("xzs-header");
  const _easycom_xzs_news_item2 = common_vendor.resolveComponent("xzs-news-item");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  (_easycom_xzs_header2 + _easycom_xzs_news_item2 + _component_van_loading)();
}
const _easycom_xzs_header = () => "../../components/xzs-header/xzs-header.js";
const _easycom_xzs_news_item = () => "../../components/xzs-news-item/xzs-news-item.js";
if (!Math) {
  (_easycom_xzs_header + _easycom_xzs_news_item)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.newsArr, (item, index, i0) => {
      return {
        a: "24bc9d41-1-" + i0,
        b: common_vendor.p({
          item
        }),
        c: index
      };
    }),
    b: $data.loading
  }, $data.loading ? {
    c: common_vendor.p({
      size: "24px"
    })
  } : {}, {
    d: $data.isData
  }, $data.isData ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-24bc9d41"], ["__file", "D:/微信小程序/teaCulture/pages/news/news.vue"]]);
wx.createPage(MiniProgramPage);
