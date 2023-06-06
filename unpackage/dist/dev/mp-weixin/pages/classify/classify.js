"use strict";
const api_apis = require("../../api/apis.js");
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      navActive: 0,
      navArr: [],
      proArr: [],
      loading: false,
      isData: false,
      navid: ""
    };
  },
  methods: {
    //获取分类导航
    async getNavList() {
      await api_apis.listNav().then((res) => {
        this.navArr = res.data;
        this.$refs.myTabs.resize();
      });
    },
    //获取产品列表
    getProductList(s = 0) {
      this.loading = true;
      api_apis.queryProduct({
        navid: this.navid,
        size: s
      }).then((res) => {
        let oldArr = this.proArr;
        let newArr = oldArr.concat(res.data);
        this.proArr = newArr;
        this.loading = false;
        if (res.total == this.proArr.length) {
          this.isData = true;
        }
      });
    },
    //导航条切换事件
    navChange(e) {
      var _a;
      let index = ((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.index) ?? e;
      this.navid = this.navArr[index]._id;
      this.proArr = [];
      this.loading = false;
      this.isData = false;
      this.navActive = Number(index);
      this.getProductList();
    }
  },
  async onLoad(e) {
    let { idx } = e;
    await this.getNavList();
    if (idx) {
      this.navChange(idx);
    } else {
      this.navid = this.navArr[0]._id;
      this.getProductList();
    }
  },
  onReachBottom() {
    if (this.isData)
      return;
    this.getProductList(this.proArr.length);
  }
};
if (!Array) {
  const _easycom_xzs_header2 = common_vendor.resolveComponent("xzs-header");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _easycom_xzs_product_item2 = common_vendor.resolveComponent("xzs-product-item");
  const _component_van_loading = common_vendor.resolveComponent("van-loading");
  const _easycom_xzs_footer2 = common_vendor.resolveComponent("xzs-footer");
  (_easycom_xzs_header2 + _component_van_tab + _component_van_tabs + _easycom_xzs_product_item2 + _component_van_loading + _easycom_xzs_footer2)();
}
const _easycom_xzs_header = () => "../../components/xzs-header/xzs-header.js";
const _easycom_xzs_product_item = () => "../../components/xzs-product-item/xzs-product-item.js";
const _easycom_xzs_footer = () => "../../components/xzs-footer/xzs-footer.js";
if (!Math) {
  (_easycom_xzs_header + _easycom_xzs_product_item + _easycom_xzs_footer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.f($data.navArr, (item, index, i0) => {
      return {
        a: index,
        b: "6bcfa975-2-" + i0 + ",6bcfa975-1",
        c: common_vendor.p({
          title: item.classname
        })
      };
    }),
    c: common_vendor.sr("myTabs", "6bcfa975-1"),
    d: common_vendor.o($options.navChange),
    e: common_vendor.p({
      border: true,
      color: "#BDA066",
      titleActiveColor: "#BDA066",
      active: $data.navActive,
      id: "myTabs"
    }),
    f: common_vendor.f($data.proArr, (item, index, i0) => {
      return {
        a: "6bcfa975-3-" + i0,
        b: common_vendor.p({
          item
        }),
        c: index
      };
    }),
    g: $data.loading
  }, $data.loading ? {
    h: common_vendor.p({
      size: "24px"
    })
  } : {}, {
    i: $data.isData
  }, $data.isData ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bcfa975"], ["__file", "D:/微信小程序/teaCulture/pages/classify/classify.vue"]]);
wx.createPage(MiniProgramPage);
