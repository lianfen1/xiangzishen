// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/validate.mjs
var isDef = (val) => val !== void 0 && val !== null;
var isFunction = (val) => typeof val === "function";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
var isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, "");
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
var isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
var isIOS = () => inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/basic.mjs
function noop() {
}
var extend = Object.assign;
var inBrowser = typeof window !== "undefined";
function get(object, path) {
  const keys = path.split(".");
  let result = object;
  keys.forEach((key) => {
    var _a;
    result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
  });
  return result;
}
function pick(obj, keys, ignoreUndefined) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== void 0) {
      ret[key] = obj[key];
    }
    return ret;
  }, {});
}
var toArray = (item) => Array.isArray(item) ? item : [item];

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/props.mjs
var unknownProp = null;
var numericProp = [Number, String];
var truthProp = {
  type: Boolean,
  default: true
};
var makeRequiredProp = (type) => ({
  type,
  required: true
});
var makeArrayProp = () => ({
  type: Array,
  default: () => []
});
var makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal
});
var makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal
});
var makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal
});

// ../../../../../微信小程序/teaCulture/node_modules/@vant/use/dist/index.esm.mjs
import { unref } from "vue";
import { ref } from "vue";
import {
  ref as ref2,
  inject,
  computed,
  onUnmounted,
  getCurrentInstance
} from "vue";
import {
  isVNode,
  provide,
  reactive,
  getCurrentInstance as getCurrentInstance2
} from "vue";
import {
  ref as ref3,
  computed as computed2,
  onActivated,
  onDeactivated,
  onBeforeUnmount
} from "vue";
import { unref as unref3 } from "vue";
import {
  watch,
  isRef,
  unref as unref2,
  onUnmounted as onUnmounted2,
  onDeactivated as onDeactivated2
} from "vue";
import { nextTick, onMounted, onActivated as onActivated2 } from "vue";
import { ref as ref4 } from "vue";
import { ref as ref5, onMounted as onMounted2 } from "vue";
import { ref as ref6 } from "vue";
import { watch as watch2, inject as inject2 } from "vue";
var inBrowser2 = typeof window !== "undefined";
function raf(fn2) {
  return inBrowser2 ? requestAnimationFrame(fn2) : -1;
}
function cancelRaf(id) {
  if (inBrowser2) {
    cancelAnimationFrame(id);
  }
}
function doubleRaf(fn2) {
  raf(() => raf(fn2));
}
var isWindow = (val) => val === window;
var makeDOMRect = (width2, height2) => ({
  top: 0,
  left: 0,
  right: width2,
  bottom: height2,
  width: width2,
  height: height2
});
var useRect = (elementOrRef) => {
  const element = unref(elementOrRef);
  if (isWindow(element)) {
    const width2 = element.innerWidth;
    const height2 = element.innerHeight;
    return makeDOMRect(width2, height2);
  }
  if (element == null ? void 0 : element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return makeDOMRect(0, 0);
};
function useToggle(defaultValue = false) {
  const state = ref(defaultValue);
  const toggle = (value = !state.value) => {
    state.value = value;
  };
  return [state, toggle];
}
function useParent(key) {
  const parent = inject(key, null);
  if (parent) {
    const instance4 = getCurrentInstance();
    const { link, unlink, internalChildren } = parent;
    link(instance4);
    onUnmounted(() => unlink(instance4));
    const index = computed(() => internalChildren.indexOf(instance4));
    return {
      parent,
      index
    };
  }
  return {
    parent: null,
    index: ref2(-1)
  };
}
function flattenVNodes(children) {
  const result = [];
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a;
        if (isVNode(child)) {
          result.push(child);
          if ((_a = child.component) == null ? void 0 : _a.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }
          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };
  traverse(children);
  return result;
}
var findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode);
  if (index === -1) {
    return vnodes.findIndex(
      (item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key
    );
  }
  return index;
};
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children);
  internalChildren.sort(
    (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
  );
  const orderedPublicChildren = internalChildren.map((item) => item.proxy);
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  const publicChildren = reactive([]);
  const internalChildren = reactive([]);
  const parent = getCurrentInstance2();
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };
    const unlink = (child) => {
      const index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };
    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    );
  };
  return {
    children: publicChildren,
    linkChildren
  };
}
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTime(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor(time % DAY / HOUR);
  const minutes = Math.floor(time % HOUR / MINUTE);
  const seconds = Math.floor(time % MINUTE / SECOND);
  const milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function useCountDown(options) {
  let rafId;
  let endTime;
  let counting;
  let deactivated;
  const remain = ref3(options.time);
  const current2 = computed2(() => parseTime(remain.value));
  const pause = () => {
    counting = false;
    cancelRaf(rafId);
  };
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
  const setRemain = (value) => {
    var _a, _b;
    remain.value = value;
    (_a = options.onChange) == null ? void 0 : _a.call(options, current2.value);
    if (value === 0) {
      pause();
      (_b = options.onFinish) == null ? void 0 : _b.call(options);
    }
  };
  const microTick = () => {
    rafId = raf(() => {
      if (counting) {
        setRemain(getCurrentRemain());
        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };
  const macroTick = () => {
    rafId = raf(() => {
      if (counting) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };
  const tick = () => {
    if (!inBrowser2) {
      return;
    }
    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };
  const start2 = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };
  const reset = (totalTime = options.time) => {
    pause();
    remain.value = totalTime;
  };
  onBeforeUnmount(pause);
  onActivated(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });
  onDeactivated(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });
  return {
    start: start2,
    pause,
    reset,
    current: current2
  };
}
function onMountedOrActivated(hook) {
  let mounted;
  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });
  onActivated2(() => {
    if (mounted) {
      hook();
    }
  });
}
function useEventListener(type, listener, options = {}) {
  if (!inBrowser2) {
    return;
  }
  const { target = window, passive: passive2 = false, capture = false } = options;
  let cleaned = false;
  let attached;
  const add = (target2) => {
    if (cleaned) {
      return;
    }
    const element = unref2(target2);
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive: passive2
      });
      attached = true;
    }
  };
  const remove2 = (target2) => {
    if (cleaned) {
      return;
    }
    const element = unref2(target2);
    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };
  onUnmounted2(() => remove2(target));
  onDeactivated2(() => remove2(target));
  onMountedOrActivated(() => add(target));
  let stopWatch;
  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove2(oldVal);
      add(val);
    });
  }
  return () => {
    stopWatch == null ? void 0 : stopWatch();
    remove2(target);
    cleaned = true;
  };
}
function useClickAway(target, listener, options = {}) {
  if (!inBrowser2) {
    return;
  }
  const { eventName = "click" } = options;
  const onClick = (event) => {
    const targets = Array.isArray(target) ? target : [target];
    const isClickAway = targets.every((item) => {
      const element = unref3(item);
      return element && !element.contains(event.target);
    });
    if (isClickAway) {
      listener(event);
    }
  };
  useEventListener(eventName, onClick, { target: document });
}
var width;
var height;
function useWindowSize() {
  if (!width) {
    width = ref4(0);
    height = ref4(0);
    if (inBrowser2) {
      const update = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      };
      update();
      window.addEventListener("resize", update, { passive: true });
      window.addEventListener("orientationchange", update, { passive: true });
    }
  }
  return { width, height };
}
var overflowScrollReg = /scroll|auto|overlay/i;
var defaultRoot = inBrowser2 ? window : void 0;
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el, root = defaultRoot) {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}
function useScrollParent(el, root = defaultRoot) {
  const scrollParent = ref5();
  onMounted2(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });
  return scrollParent;
}
var visibility;
function usePageVisibility() {
  if (!visibility) {
    visibility = ref6("visible");
    if (inBrowser2) {
      const update = () => {
        visibility.value = document.hidden ? "hidden" : "visible";
      };
      update();
      window.addEventListener("visibilitychange", update);
    }
  }
  return visibility;
}
var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
function useCustomFieldValue(customValue) {
  const field = inject2(CUSTOM_FIELD_INJECTION_KEY, null);
  if (field && !field.customValue.value) {
    field.customValue.value = customValue;
    watch2(customValue, () => {
      field.resetValidation();
      field.validateWithTrigger("onChange");
    });
  }
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/dom.mjs
import { unref as unref4 } from "vue";
function getScrollTop(el) {
  const top2 = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top2, 0);
}
function setScrollTop(el, value) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
function getElementTop(el, scroller) {
  if (el === window) {
    return 0;
  }
  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return useRect(el).top + scrollTop;
}
var isIOS2 = isIOS();
function resetScroll() {
  if (isIOS2) {
    setRootScrollTop(getRootScrollTop());
  }
}
var stopPropagation = (event) => event.stopPropagation();
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function isHidden(elementRef) {
  const el = unref4(elementRef);
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";
  const parentHidden = el.offsetParent === null && style.position !== "fixed";
  return hidden || parentHidden;
}
var { width: windowWidth, height: windowHeight } = useWindowSize();

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/format.mjs
function addUnit(value) {
  if (isDef(value)) {
    return isNumeric(value) ? `${value}px` : String(value);
  }
  return void 0;
}
function getSizeStyle(originSize) {
  if (isDef(originSize)) {
    if (Array.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1])
      };
    }
    const size = addUnit(originSize);
    return {
      width: size,
      height: size
    };
  }
}
function getZIndexStyle(zIndex) {
  const style = {};
  if (zIndex !== void 0) {
    style.zIndex = +zIndex;
  }
  return style;
}
var rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}
function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}
function convertVw(value) {
  value = value.replace(/vw/g, "");
  return +value * windowWidth.value / 100;
}
function convertVh(value) {
  value = value.replace(/vh/g, "");
  return +value * windowHeight.value / 100;
}
function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }
  if (inBrowser) {
    if (value.includes("rem")) {
      return convertRem(value);
    }
    if (value.includes("vw")) {
      return convertVw(value);
    }
    if (value.includes("vh")) {
      return convertVh(value);
    }
  }
  return parseFloat(value);
}
var camelizeRE = /-(\w)/g;
var camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
var kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
function padZero(num, targetLength = 2) {
  let str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
}
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
function trimExtraChar(value, char, regExp) {
  const index = value.indexOf(char);
  if (index === -1) {
    return value;
  }
  if (char === "-" && index !== 0) {
    return value.slice(0, index);
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
}
function formatNumber(value, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g);
  } else {
    value = value.split(".")[0];
  }
  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g);
  } else {
    value = value.replace(/-/, "");
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, "");
}
function addNumber(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/locale/index.mjs
import { ref as ref7, reactive as reactive2 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/deep-assign.mjs
var { hasOwnProperty } = Object.prototype;
function assignKey(to, from, key) {
  const val = from[key];
  if (!isDef(val)) {
    return;
  }
  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), val);
  }
}
function deepAssign(to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key);
  });
  return to;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/locale/lang/zh-CN.mjs
var stdin_default = {
  name: "姓名",
  tel: "电话",
  save: "保存",
  confirm: "确认",
  cancel: "取消",
  delete: "删除",
  loading: "加载中...",
  noCoupon: "暂无优惠券",
  nameEmpty: "请填写姓名",
  addContact: "添加联系人",
  telInvalid: "请填写正确的电话",
  vanCalendar: {
    end: "结束",
    start: "开始",
    title: "日期选择",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: (maxRange) => `最多选择 ${maxRange} 天`
  },
  vanCascader: {
    select: "请选择"
  },
  vanPagination: {
    prev: "上一页",
    next: "下一页"
  },
  vanPullRefresh: {
    pulling: "下拉即可刷新...",
    loosing: "释放即可刷新..."
  },
  vanSubmitBar: {
    label: "合计:"
  },
  vanCoupon: {
    unlimited: "无门槛",
    discount: (discount) => `${discount}折`,
    condition: (condition) => `满${condition}元可用`
  },
  vanCouponCell: {
    title: "优惠券",
    count: (count) => `${count}张可用`
  },
  vanCouponList: {
    exchange: "兑换",
    close: "不使用",
    enable: "可用",
    disabled: "不可用",
    placeholder: "输入优惠码"
  },
  vanAddressEdit: {
    area: "地区",
    postal: "邮政编码",
    areaEmpty: "请选择地区",
    addressEmpty: "请填写详细地址",
    postalEmpty: "邮政编码不正确",
    addressDetail: "详细地址",
    defaultAddress: "设为默认收货地址"
  },
  vanAddressList: {
    add: "新增地址"
  }
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/locale/index.mjs
var lang = ref7("zh-CN");
var messages = reactive2({
  "zh-CN": stdin_default
});
var Locale = {
  messages() {
    return messages[lang.value];
  },
  use(newLang, newMessages) {
    lang.value = newLang;
    this.add({ [newLang]: newMessages });
  },
  add(newMessages = {}) {
    deepAssign(messages, newMessages);
  }
};
var stdin_default2 = Locale;

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/create.mjs
function createTranslate(name97) {
  const prefix = camelize(name97) + ".";
  return (path, ...args) => {
    const messages2 = stdin_default2.messages();
    const message = get(messages2, prefix + path) || get(messages2, path);
    return isFunction(message) ? message(...args) : message;
  };
}
function genBem(name97, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return ` ${name97}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce(
      (ret, item) => ret + genBem(name97, item),
      ""
    );
  }
  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name97, key) : ""),
    ""
  );
}
function createBEM(name97) {
  return (el, mods) => {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? `${name97}__${el}` : name97;
    return `${el}${genBem(el, mods)}`;
  };
}
function createNamespace(name97) {
  const prefixedName = `van-${name97}`;
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName)
  ];
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/constant.mjs
var BORDER = "van-hairline";
var BORDER_TOP = `${BORDER}--top`;
var BORDER_LEFT = `${BORDER}--left`;
var BORDER_BOTTOM = `${BORDER}--bottom`;
var BORDER_SURROUND = `${BORDER}--surround`;
var BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
var BORDER_UNSET_TOP_BOTTOM = `${BORDER}-unset--top-bottom`;
var HAPTICS_FEEDBACK = "van-haptics-feedback";
var FORM_KEY = Symbol("van-form");

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/interceptor.mjs
function callInterceptor(interceptor, {
  args = [],
  done,
  canceled
}) {
  if (interceptor) {
    const returnVal = interceptor.apply(null, args);
    if (isPromise(returnVal)) {
      returnVal.then((value) => {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/with-install.mjs
function withInstall(options) {
  options.install = (app) => {
    const { name: name97 } = options;
    if (name97) {
      app.component(name97, options);
      app.component(camelize(`-${name97}`), options);
    }
  };
  return options;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar/ActionBar.mjs
import { createVNode as _createVNode2 } from "vue";
import { defineComponent, ref as ref9 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-placeholder.mjs
import { createVNode as _createVNode } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-height.mjs
import { ref as ref8, onMounted as onMounted3, nextTick as nextTick2 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/on-popup-reopen.mjs
import { inject as inject3, watch as watch3 } from "vue";
var POPUP_TOGGLE_KEY = Symbol();
function onPopupReopen(callback) {
  const popupToggleStatus = inject3(POPUP_TOGGLE_KEY, null);
  if (popupToggleStatus) {
    watch3(popupToggleStatus, (show) => {
      if (show) {
        callback();
      }
    });
  }
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-height.mjs
var useHeight = (element, withSafeArea) => {
  const height2 = ref8();
  const setHeight = () => {
    height2.value = useRect(element).height;
  };
  onMounted3(() => {
    nextTick2(setHeight);
    if (withSafeArea) {
      for (let i = 1; i <= 3; i++) {
        setTimeout(setHeight, 100 * i);
      }
    }
  });
  onPopupReopen(() => nextTick2(setHeight));
  return height2;
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-placeholder.mjs
function usePlaceholder(contentRef, bem93) {
  const height2 = useHeight(contentRef, true);
  return (renderContent) => _createVNode("div", {
    "class": bem93("placeholder"),
    "style": {
      height: height2.value ? `${height2.value}px` : void 0
    }
  }, [renderContent()]);
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar/ActionBar.mjs
var [name, bem] = createNamespace("action-bar");
var ACTION_BAR_KEY = Symbol(name);
var actionBarProps = {
  placeholder: Boolean,
  safeAreaInsetBottom: truthProp
};
var stdin_default3 = defineComponent({
  name,
  props: actionBarProps,
  setup(props, {
    slots
  }) {
    const root = ref9();
    const renderPlaceholder = usePlaceholder(root, bem);
    const {
      linkChildren
    } = useChildren(ACTION_BAR_KEY);
    linkChildren();
    const renderActionBar = () => {
      var _a;
      return _createVNode2("div", {
        "ref": root,
        "class": [bem(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    return () => {
      if (props.placeholder) {
        return renderPlaceholder(renderActionBar);
      }
      return renderActionBar();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar/index.mjs
var ActionBar = withInstall(stdin_default3);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar-button/ActionBarButton.mjs
import { createVNode as _createVNode8 } from "vue";
import { computed as computed7, defineComponent as defineComponent7 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-expose.mjs
import { getCurrentInstance as getCurrentInstance3 } from "vue";
function useExpose(apis) {
  const instance4 = getCurrentInstance3();
  if (instance4) {
    extend(instance4.proxy, apis);
  }
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-route.mjs
import {
  getCurrentInstance as getCurrentInstance4
} from "vue";
var routeProps = {
  to: [String, Object],
  url: String,
  replace: Boolean
};
function route({
  to,
  url,
  replace,
  $router: router
}) {
  if (to && router) {
    router[replace ? "replace" : "push"](to);
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function useRoute() {
  const vm = getCurrentInstance4().proxy;
  return () => route(vm);
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/button/Button.mjs
import { createVNode as _createVNode7 } from "vue";
import { defineComponent as defineComponent6 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/icon/Icon.mjs
import { mergeProps as _mergeProps, createVNode as _createVNode5 } from "vue";
import { inject as inject4, computed as computed5, defineComponent as defineComponent4 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/badge/Badge.mjs
import { createVNode as _createVNode3 } from "vue";
import { computed as computed3, defineComponent as defineComponent2 } from "vue";
var [name2, bem2] = createNamespace("badge");
var badgeProps = {
  dot: Boolean,
  max: numericProp,
  tag: makeStringProp("div"),
  color: String,
  offset: Array,
  content: numericProp,
  showZero: truthProp,
  position: makeStringProp("top-right")
};
var stdin_default4 = defineComponent2({
  name: name2,
  props: badgeProps,
  setup(props, {
    slots
  }) {
    const hasContent = () => {
      if (slots.content) {
        return true;
      }
      const {
        content,
        showZero
      } = props;
      return isDef(content) && content !== "" && (showZero || content !== 0 && content !== "0");
    };
    const renderContent = () => {
      const {
        dot,
        max,
        content
      } = props;
      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }
        if (isDef(max) && isNumeric(content) && +content > max) {
          return `${max}+`;
        }
        return content;
      }
    };
    const style = computed3(() => {
      const style2 = {
        background: props.color
      };
      if (props.offset) {
        const [x, y] = props.offset;
        if (slots.default) {
          style2.top = addUnit(y);
          if (typeof x === "number") {
            style2.right = addUnit(-x);
          } else {
            style2.right = x.startsWith("-") ? x.replace("-", "") : `-${x}`;
          }
        } else {
          style2.marginTop = addUnit(y);
          style2.marginLeft = addUnit(x);
        }
      }
      return style2;
    });
    const renderBadge = () => {
      if (hasContent() || props.dot) {
        return _createVNode3("div", {
          "class": bem2([props.position, {
            dot: props.dot,
            fixed: !!slots.default
          }]),
          "style": style.value
        }, [renderContent()]);
      }
    };
    return () => {
      if (slots.default) {
        const {
          tag
        } = props;
        return _createVNode3(tag, {
          "class": bem2("wrapper")
        }, {
          default: () => [slots.default(), renderBadge()]
        });
      }
      return renderBadge();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/badge/index.mjs
var Badge = withInstall(stdin_default4);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/config-provider/ConfigProvider.mjs
import { createVNode as _createVNode4 } from "vue";
import { provide as provide2, computed as computed4, watchEffect, defineComponent as defineComponent3 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-global-z-index.mjs
var globalZIndex = 2e3;
var useGlobalZIndex = () => ++globalZIndex;
var setGlobalZIndex = (val) => {
  globalZIndex = val;
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/config-provider/ConfigProvider.mjs
var [name3, bem3] = createNamespace("config-provider");
var CONFIG_PROVIDER_KEY = Symbol(name3);
var configProviderProps = {
  tag: makeStringProp("div"),
  zIndex: Number,
  themeVars: Object,
  iconPrefix: String
};
function mapThemeVarsToCSSVars(themeVars) {
  const cssVars = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--van-${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}
var stdin_default5 = defineComponent3({
  name: name3,
  props: configProviderProps,
  setup(props, {
    slots
  }) {
    const style = computed4(() => {
      if (props.themeVars) {
        return mapThemeVarsToCSSVars(props.themeVars);
      }
    });
    provide2(CONFIG_PROVIDER_KEY, props);
    watchEffect(() => {
      if (props.zIndex !== void 0) {
        setGlobalZIndex(props.zIndex);
      }
    });
    return () => _createVNode4(props.tag, {
      "class": bem3(),
      "style": style.value
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/icon/Icon.mjs
var [name4, bem4] = createNamespace("icon");
var isImage = (name210) => name210 == null ? void 0 : name210.includes("/");
var iconProps = {
  dot: Boolean,
  tag: makeStringProp("i"),
  name: String,
  size: numericProp,
  badge: numericProp,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var stdin_default6 = defineComponent4({
  name: name4,
  props: iconProps,
  setup(props, {
    slots
  }) {
    const config = inject4(CONFIG_PROVIDER_KEY, null);
    const classPrefix = computed5(() => props.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem4());
    return () => {
      const {
        tag,
        dot,
        name: name210,
        size,
        badge,
        color
      } = props;
      const isImageIcon = isImage(name210);
      return _createVNode5(Badge, _mergeProps({
        "dot": dot,
        "tag": tag,
        "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name210}`],
        "style": {
          color,
          fontSize: addUnit(size)
        },
        "content": badge
      }, props.badgeProps), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && _createVNode5("img", {
            "class": bem4("image"),
            "src": name210
          }, null)];
        }
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/icon/index.mjs
var Icon = withInstall(stdin_default6);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/loading/Loading.mjs
import { createVNode as _createVNode6 } from "vue";
import { computed as computed6, defineComponent as defineComponent5 } from "vue";
var [name5, bem5] = createNamespace("loading");
var SpinIcon = Array(12).fill(null).map((_, index) => _createVNode6("i", {
  "class": bem5("line", String(index + 1))
}, null));
var CircularIcon = _createVNode6("svg", {
  "class": bem5("circular"),
  "viewBox": "25 25 50 50"
}, [_createVNode6("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);
var loadingProps = {
  size: numericProp,
  type: makeStringProp("circular"),
  color: String,
  vertical: Boolean,
  textSize: numericProp,
  textColor: String
};
var stdin_default7 = defineComponent5({
  name: name5,
  props: loadingProps,
  setup(props, {
    slots
  }) {
    const spinnerStyle = computed6(() => extend({
      color: props.color
    }, getSizeStyle(props.size)));
    const renderText = () => {
      var _a;
      if (slots.default) {
        return _createVNode6("span", {
          "class": bem5("text"),
          "style": {
            fontSize: addUnit(props.textSize),
            color: (_a = props.textColor) != null ? _a : props.color
          }
        }, [slots.default()]);
      }
    };
    return () => {
      const {
        type,
        vertical
      } = props;
      return _createVNode6("div", {
        "class": bem5([type, {
          vertical
        }]),
        "aria-live": "polite",
        "aria-busy": true
      }, [_createVNode6("span", {
        "class": bem5("spinner", type),
        "style": spinnerStyle.value
      }, [type === "spinner" ? SpinIcon : CircularIcon]), renderText()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/loading/index.mjs
var Loading = withInstall(stdin_default7);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/button/Button.mjs
var [name6, bem6] = createNamespace("button");
var buttonProps = extend({}, routeProps, {
  tag: makeStringProp("button"),
  text: String,
  icon: String,
  type: makeStringProp("default"),
  size: makeStringProp("normal"),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: makeStringProp("button"),
  loadingSize: numericProp,
  loadingText: String,
  loadingType: String,
  iconPosition: makeStringProp("left")
});
var stdin_default8 = defineComponent6({
  name: name6,
  props: buttonProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }
      return _createVNode7(Loading, {
        "size": props.loadingSize,
        "type": props.loadingType,
        "class": bem6("loading")
      }, null);
    };
    const renderIcon = () => {
      if (props.loading) {
        return renderLoadingIcon();
      }
      if (slots.icon) {
        return _createVNode7("div", {
          "class": bem6("icon")
        }, [slots.icon()]);
      }
      if (props.icon) {
        return _createVNode7(Icon, {
          "name": props.icon,
          "class": bem6("icon"),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      let text;
      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }
      if (text) {
        return _createVNode7("span", {
          "class": bem6("text")
        }, [text]);
      }
    };
    const getStyle = () => {
      const {
        color,
        plain
      } = props;
      if (color) {
        const style = {
          color: plain ? color : "white"
        };
        if (!plain) {
          style.background = color;
        }
        if (color.includes("gradient")) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }
        return style;
      }
    };
    const onClick = (event) => {
      if (props.loading) {
        preventDefault(event);
      } else if (!props.disabled) {
        emit("click", event);
        route2();
      }
    };
    return () => {
      const {
        tag,
        type,
        size,
        block,
        round: round2,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition
      } = props;
      const classes = [bem6([type, size, {
        plain,
        block,
        round: round2,
        square,
        loading,
        disabled,
        hairline
      }]), {
        [BORDER_SURROUND]: hairline
      }];
      return _createVNode7(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, {
        default: () => [_createVNode7("div", {
          "class": bem6("content")
        }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/button/index.mjs
var Button = withInstall(stdin_default8);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar-button/ActionBarButton.mjs
var [name7, bem7] = createNamespace("action-bar-button");
var actionBarButtonProps = extend({}, routeProps, {
  type: String,
  text: String,
  icon: String,
  color: String,
  loading: Boolean,
  disabled: Boolean
});
var stdin_default9 = defineComponent7({
  name: name7,
  props: actionBarButtonProps,
  setup(props, {
    slots
  }) {
    const route2 = useRoute();
    const {
      parent,
      index
    } = useParent(ACTION_BAR_KEY);
    const isFirst = computed7(() => {
      if (parent) {
        const prev = parent.children[index.value - 1];
        return !(prev && "isButton" in prev);
      }
    });
    const isLast = computed7(() => {
      if (parent) {
        const next = parent.children[index.value + 1];
        return !(next && "isButton" in next);
      }
    });
    useExpose({
      isButton: true
    });
    return () => {
      const {
        type,
        icon,
        text,
        color,
        loading,
        disabled
      } = props;
      return _createVNode8(Button, {
        "class": bem7([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route2
      }, {
        default: () => [slots.default ? slots.default() : text]
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar-button/index.mjs
var ActionBarButton = withInstall(stdin_default9);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar-icon/ActionBarIcon.mjs
import { createVNode as _createVNode9, mergeProps as _mergeProps2 } from "vue";
import { defineComponent as defineComponent8 } from "vue";
var [name8, bem8] = createNamespace("action-bar-icon");
var actionBarIconProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  color: String,
  badge: numericProp,
  iconClass: unknownProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default10 = defineComponent8({
  name: name8,
  props: actionBarIconProps,
  setup(props, {
    slots
  }) {
    const route2 = useRoute();
    useParent(ACTION_BAR_KEY);
    const renderIcon = () => {
      const {
        dot,
        badge,
        icon,
        color,
        iconClass,
        badgeProps: badgeProps2,
        iconPrefix
      } = props;
      if (slots.icon) {
        return _createVNode9(Badge, _mergeProps2({
          "dot": dot,
          "class": bem8("icon"),
          "content": badge
        }, badgeProps2), {
          default: slots.icon
        });
      }
      return _createVNode9(Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem8("icon"), iconClass],
        "badgeProps": badgeProps2,
        "classPrefix": iconPrefix
      }, null);
    };
    return () => _createVNode9("div", {
      "role": "button",
      "class": bem8(),
      "tabindex": 0,
      "onClick": route2
    }, [renderIcon(), slots.default ? slots.default() : props.text]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-bar-icon/index.mjs
var ActionBarIcon = withInstall(stdin_default10);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-sheet/ActionSheet.mjs
import { mergeProps as _mergeProps4, createVNode as _createVNode12 } from "vue";
import { nextTick as nextTick4, defineComponent as defineComponent11 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popup/Popup.mjs
import { Fragment as _Fragment, withDirectives as _withDirectives2, mergeProps as _mergeProps3, vShow as _vShow2, createVNode as _createVNode11 } from "vue";
import { ref as ref13, watch as watch6, provide as provide3, Teleport, nextTick as nextTick3, computed as computed8, onMounted as onMounted4, Transition as Transition2, onActivated as onActivated3, onDeactivated as onDeactivated4, defineComponent as defineComponent10 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popup/shared.mjs
var popupSharedProps = {
  show: Boolean,
  zIndex: numericProp,
  overlay: truthProp,
  duration: numericProp,
  teleport: [String, Object],
  lockScroll: truthProp,
  lazyRender: truthProp,
  beforeClose: Function,
  overlayStyle: Object,
  overlayClass: unknownProp,
  transitionAppear: Boolean,
  closeOnClickOverlay: truthProp
};
var popupSharedPropKeys = Object.keys(
  popupSharedProps
);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-lock-scroll.mjs
import { watch as watch4, onBeforeUnmount as onBeforeUnmount2, onDeactivated as onDeactivated3 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-touch.mjs
import { ref as ref10 } from "vue";
function getDirection(x, y) {
  if (x > y) {
    return "horizontal";
  }
  if (y > x) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  const startX = ref10(0);
  const startY = ref10(0);
  const deltaX = ref10(0);
  const deltaY = ref10(0);
  const offsetX = ref10(0);
  const offsetY = ref10(0);
  const direction = ref10("");
  const isVertical = () => direction.value === "vertical";
  const isHorizontal = () => direction.value === "horizontal";
  const reset = () => {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = "";
  };
  const start2 = (event) => {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };
  const move = (event) => {
    const touch = event.touches[0];
    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
    const LOCK_DIRECTION_DISTANCE = 10;
    if (!direction.value || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
  };
  return {
    move,
    start: start2,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal
  };
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-lock-scroll.mjs
var totalLockCount = 0;
var BODY_LOCK_CLASS = "van-overflow-hidden";
function useLockScroll(rootRef, shouldLock) {
  const touch = useTouch();
  const DIRECTION_UP = "01";
  const DIRECTION_DOWN = "10";
  const onTouchMove = (event) => {
    touch.move(event);
    const direction = touch.deltaY.value > 0 ? DIRECTION_DOWN : DIRECTION_UP;
    const el = getScrollParent(
      event.target,
      rootRef.value
    );
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = "11";
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01";
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10";
    }
    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      preventDefault(event, true);
    }
  };
  const lock = () => {
    document.addEventListener("touchstart", touch.start);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  };
  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener("touchstart", touch.start);
      document.removeEventListener("touchmove", onTouchMove);
      totalLockCount--;
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };
  const init = () => shouldLock() && lock();
  const destroy = () => shouldLock() && unlock();
  onMountedOrActivated(init);
  onDeactivated3(destroy);
  onBeforeUnmount2(destroy);
  watch4(shouldLock, (value) => {
    value ? lock() : unlock();
  });
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-lazy-render.mjs
import { ref as ref11, watch as watch5 } from "vue";
function useLazyRender(show) {
  const inited = ref11(false);
  watch5(
    show,
    (value) => {
      if (value) {
        inited.value = value;
      }
    },
    { immediate: true }
  );
  return (render) => () => inited.value ? render() : null;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/overlay/Overlay.mjs
import { withDirectives as _withDirectives, createVNode as _createVNode10, vShow as _vShow } from "vue";
import { ref as ref12, Transition, defineComponent as defineComponent9 } from "vue";
var [name9, bem9] = createNamespace("overlay");
var overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object
};
var stdin_default11 = defineComponent9({
  name: name9,
  props: overlayProps,
  setup(props, {
    slots
  }) {
    const root = ref12();
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender);
    const onTouchMove = (event) => {
      if (props.lockScroll) {
        preventDefault(event, true);
      }
    };
    const renderOverlay = lazyRender(() => {
      var _a;
      const style = extend(getZIndexStyle(props.zIndex), props.customStyle);
      if (isDef(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }
      return _withDirectives(_createVNode10("div", {
        "ref": root,
        "style": style,
        "class": [bem9(), props.className]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[_vShow, props.show]]);
    });
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => _createVNode10(Transition, {
      "name": "van-fade",
      "appear": true
    }, {
      default: renderOverlay
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/overlay/index.mjs
var Overlay = withInstall(stdin_default11);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popup/Popup.mjs
var popupProps = extend({}, popupSharedProps, {
  round: Boolean,
  position: makeStringProp("center"),
  closeIcon: makeStringProp("cross"),
  closeable: Boolean,
  transition: String,
  iconPrefix: String,
  closeOnPopstate: Boolean,
  closeIconPosition: makeStringProp("top-right"),
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: Boolean
});
var [name10, bem10] = createNamespace("popup");
var stdin_default12 = defineComponent10({
  name: name10,
  inheritAttrs: false,
  props: popupProps,
  emits: ["open", "close", "opened", "closed", "keydown", "update:show", "click-overlay", "click-close-icon"],
  setup(props, {
    emit,
    attrs,
    slots
  }) {
    let opened;
    let shouldReopen;
    const zIndex = ref13();
    const popupRef = ref13();
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender);
    const style = computed8(() => {
      const style2 = {
        zIndex: zIndex.value
      };
      if (isDef(props.duration)) {
        const key = props.position === "center" ? "animationDuration" : "transitionDuration";
        style2[key] = `${props.duration}s`;
      }
      return style2;
    });
    const open = () => {
      if (!opened) {
        opened = true;
        zIndex.value = props.zIndex !== void 0 ? +props.zIndex : useGlobalZIndex();
        emit("open");
      }
    };
    const close = () => {
      if (opened) {
        callInterceptor(props.beforeClose, {
          done() {
            opened = false;
            emit("close");
            emit("update:show", false);
          }
        });
      }
    };
    const onClickOverlay = (event) => {
      emit("click-overlay", event);
      if (props.closeOnClickOverlay) {
        close();
      }
    };
    const renderOverlay = () => {
      if (props.overlay) {
        return _createVNode11(Overlay, {
          "show": props.show,
          "class": props.overlayClass,
          "zIndex": zIndex.value,
          "duration": props.duration,
          "customStyle": props.overlayStyle,
          "role": props.closeOnClickOverlay ? "button" : void 0,
          "tabindex": props.closeOnClickOverlay ? 0 : void 0,
          "onClick": onClickOverlay
        }, {
          default: slots["overlay-content"]
        });
      }
    };
    const onClickCloseIcon = (event) => {
      emit("click-close-icon", event);
      close();
    };
    const renderCloseIcon = () => {
      if (props.closeable) {
        return _createVNode11(Icon, {
          "role": "button",
          "tabindex": 0,
          "name": props.closeIcon,
          "class": [bem10("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
          "classPrefix": props.iconPrefix,
          "onClick": onClickCloseIcon
        }, null);
      }
    };
    const onOpened = () => emit("opened");
    const onClosed = () => emit("closed");
    const onKeydown = (event) => emit("keydown", event);
    const renderPopup = lazyRender(() => {
      var _a;
      const {
        round: round2,
        position,
        safeAreaInsetTop,
        safeAreaInsetBottom
      } = props;
      return _withDirectives2(_createVNode11("div", _mergeProps3({
        "ref": popupRef,
        "style": style.value,
        "role": "dialog",
        "tabindex": 0,
        "class": [bem10({
          round: round2,
          [position]: position
        }), {
          "van-safe-area-top": safeAreaInsetTop,
          "van-safe-area-bottom": safeAreaInsetBottom
        }],
        "onKeydown": onKeydown
      }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots), renderCloseIcon()]), [[_vShow2, props.show]]);
    });
    const renderTransition = () => {
      const {
        position,
        transition,
        transitionAppear
      } = props;
      const name210 = position === "center" ? "van-fade" : `van-popup-slide-${position}`;
      return _createVNode11(Transition2, {
        "name": transition || name210,
        "appear": transitionAppear,
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: renderPopup
      });
    };
    watch6(() => props.show, (show) => {
      if (show && !opened) {
        open();
        if (attrs.tabindex === 0) {
          nextTick3(() => {
            var _a;
            (_a = popupRef.value) == null ? void 0 : _a.focus();
          });
        }
      }
      if (!show && opened) {
        opened = false;
        emit("close");
      }
    });
    useExpose({
      popupRef
    });
    useLockScroll(popupRef, () => props.show && props.lockScroll);
    useEventListener("popstate", () => {
      if (props.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });
    onMounted4(() => {
      if (props.show) {
        open();
      }
    });
    onActivated3(() => {
      if (shouldReopen) {
        emit("update:show", true);
        shouldReopen = false;
      }
    });
    onDeactivated4(() => {
      if (props.show && props.teleport) {
        close();
        shouldReopen = true;
      }
    });
    provide3(POPUP_TOGGLE_KEY, () => props.show);
    return () => {
      if (props.teleport) {
        return _createVNode11(Teleport, {
          "to": props.teleport
        }, {
          default: () => [renderOverlay(), renderTransition()]
        });
      }
      return _createVNode11(_Fragment, null, [renderOverlay(), renderTransition()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popup/index.mjs
var Popup = withInstall(stdin_default12);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-sheet/ActionSheet.mjs
var [name11, bem11] = createNamespace("action-sheet");
var actionSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  actions: makeArrayProp(),
  closeIcon: makeStringProp("cross"),
  closeable: truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: truthProp
});
var popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var stdin_default13 = defineComponent11({
  name: name11,
  props: actionSheetProps,
  emits: ["select", "cancel", "update:show"],
  setup(props, {
    slots,
    emit
  }) {
    const updateShow = (show) => emit("update:show", show);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const renderHeader = () => {
      if (props.title) {
        return _createVNode12("div", {
          "class": bem11("header")
        }, [props.title, props.closeable && _createVNode12(Icon, {
          "name": props.closeIcon,
          "class": [bem11("close"), HAPTICS_FEEDBACK],
          "onClick": onCancel
        }, null)]);
      }
    };
    const renderCancel = () => {
      if (slots.cancel || props.cancelText) {
        return [_createVNode12("div", {
          "class": bem11("gap")
        }, null), _createVNode12("button", {
          "type": "button",
          "class": bem11("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : props.cancelText])];
      }
    };
    const renderActionContent = (action, index) => {
      if (action.loading) {
        return _createVNode12(Loading, {
          "class": bem11("loading-icon")
        }, null);
      }
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [_createVNode12("span", {
        "class": bem11("name")
      }, [action.name]), action.subname && _createVNode12("div", {
        "class": bem11("subname")
      }, [action.subname])];
    };
    const renderAction = (action, index) => {
      const {
        color,
        loading,
        callback,
        disabled,
        className
      } = action;
      const onClick = () => {
        if (disabled || loading) {
          return;
        }
        if (callback) {
          callback(action);
        }
        if (props.closeOnClickAction) {
          updateShow(false);
        }
        nextTick4(() => emit("select", action, index));
      };
      return _createVNode12("button", {
        "type": "button",
        "style": {
          color
        },
        "class": [bem11("item", {
          loading,
          disabled
        }), className],
        "onClick": onClick
      }, [renderActionContent(action, index)]);
    };
    const renderDescription = () => {
      if (props.description || slots.description) {
        const content = slots.description ? slots.description() : props.description;
        return _createVNode12("div", {
          "class": bem11("description")
        }, [content]);
      }
    };
    return () => _createVNode12(Popup, _mergeProps4({
      "class": bem11(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props, popupInheritKeys)), {
      default: () => {
        var _a;
        return [renderHeader(), renderDescription(), _createVNode12("div", {
          "class": bem11("content")
        }, [props.actions.map(renderAction), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderCancel()];
      }
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/action-sheet/index.mjs
var ActionSheet = withInstall(stdin_default13);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-edit/AddressEdit.mjs
import { withDirectives as _withDirectives3, vShow as _vShow3, createVNode as _createVNode23 } from "vue";
import { ref as ref20, watch as watch13, computed as computed12, nextTick as nextTick7, reactive as reactive7, defineComponent as defineComponent21 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/area/Area.mjs
import { createVNode as _createVNode15, mergeProps as _mergeProps5 } from "vue";
import { ref as ref16, watch as watch9, computed as computed10, reactive as reactive4, nextTick as nextTick5, onMounted as onMounted5, defineComponent as defineComponent14 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/deep-clone.mjs
function deepClone(obj) {
  if (!isDef(obj)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  if (isObject(obj)) {
    const to = {};
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }
  return obj;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/picker/Picker.mjs
import { createVNode as _createVNode14 } from "vue";
import { ref as ref15, watch as watch8, computed as computed9, defineComponent as defineComponent13 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/picker/PickerColumn.mjs
import { createVNode as _createVNode13 } from "vue";
import { ref as ref14, watch as watch7, reactive as reactive3, defineComponent as defineComponent12 } from "vue";
var DEFAULT_DURATION = 200;
var MOMENTUM_LIMIT_TIME = 300;
var MOMENTUM_LIMIT_DISTANCE = 15;
var [name12, bem12] = createNamespace("picker-column");
function getElementTranslateY(element) {
  const {
    transform
  } = window.getComputedStyle(element);
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
var PICKER_KEY = Symbol(name12);
var isOptionDisabled = (option) => isObject(option) && option.disabled;
var stdin_default14 = defineComponent12({
  name: name12,
  props: {
    textKey: makeRequiredProp(String),
    readonly: Boolean,
    allowHtml: Boolean,
    className: unknownProp,
    itemHeight: makeRequiredProp(Number),
    defaultIndex: makeNumberProp(0),
    swipeDuration: makeRequiredProp(numericProp),
    initialOptions: makeArrayProp(),
    visibleItemCount: makeRequiredProp(numericProp)
  },
  emits: ["change"],
  setup(props, {
    emit,
    slots
  }) {
    let moving;
    let startOffset;
    let touchStartTime;
    let momentumOffset;
    let transitionEndTrigger;
    const root = ref14();
    const wrapper = ref14();
    const state = reactive3({
      index: props.defaultIndex,
      offset: 0,
      duration: 0,
      options: deepClone(props.initialOptions)
    });
    const touch = useTouch();
    const count = () => state.options.length;
    const baseOffset = () => props.itemHeight * (+props.visibleItemCount - 1) / 2;
    const adjustIndex = (index) => {
      index = clamp(index, 0, count());
      for (let i = index; i < count(); i++) {
        if (!isOptionDisabled(state.options[i]))
          return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isOptionDisabled(state.options[i]))
          return i;
      }
    };
    const setIndex = (index, emitChange) => {
      index = adjustIndex(index) || 0;
      const offset2 = -index * props.itemHeight;
      const trigger = () => {
        if (index !== state.index) {
          state.index = index;
          if (emitChange) {
            emit("change", index);
          }
        }
      };
      if (moving && offset2 !== state.offset) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      state.offset = offset2;
    };
    const setOptions = (options) => {
      if (JSON.stringify(options) !== JSON.stringify(state.options)) {
        state.options = deepClone(options);
        setIndex(props.defaultIndex);
      }
    };
    const onClickItem = (index) => {
      if (moving || props.readonly) {
        return;
      }
      transitionEndTrigger = null;
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
    };
    const getOptionText = (option) => {
      if (isObject(option) && props.textKey in option) {
        return option[props.textKey];
      }
      return option;
    };
    const getIndexByOffset = (offset2) => clamp(Math.round(-offset2 / props.itemHeight), 0, count() - 1);
    const momentum = (distance, duration) => {
      const speed = Math.abs(distance / duration);
      distance = state.offset + speed / 3e-3 * (distance < 0 ? -1 : 1);
      const index = getIndexByOffset(distance);
      state.duration = +props.swipeDuration;
      setIndex(index, true);
    };
    const stopMomentum = () => {
      moving = false;
      state.duration = 0;
      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };
    const onTouchStart = (event) => {
      if (props.readonly) {
        return;
      }
      touch.start(event);
      if (moving) {
        const translateY = getElementTranslateY(wrapper.value);
        state.offset = Math.min(0, translateY - baseOffset());
        startOffset = state.offset;
      } else {
        startOffset = state.offset;
      }
      state.duration = 0;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };
    const onTouchMove = (event) => {
      if (props.readonly) {
        return;
      }
      touch.move(event);
      if (touch.isVertical()) {
        moving = true;
        preventDefault(event, true);
      }
      state.offset = clamp(startOffset + touch.deltaY.value, -(count() * props.itemHeight), props.itemHeight);
      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
        touchStartTime = now;
        momentumOffset = state.offset;
      }
    };
    const onTouchEnd = () => {
      if (props.readonly) {
        return;
      }
      const distance = state.offset - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        momentum(distance, duration);
        return;
      }
      const index = getIndexByOffset(state.offset);
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
      setTimeout(() => {
        moving = false;
      }, 0);
    };
    const renderOptions = () => {
      const optionStyle = {
        height: `${props.itemHeight}px`
      };
      return state.options.map((option, index) => {
        const text = getOptionText(option);
        const disabled = isOptionDisabled(option);
        const data = {
          role: "button",
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: bem12("item", {
            disabled,
            selected: index === state.index
          }),
          onClick: () => onClickItem(index)
        };
        const childData = {
          class: "van-ellipsis",
          [props.allowHtml ? "innerHTML" : "textContent"]: text
        };
        return _createVNode13("li", data, [slots.option ? slots.option(option) : _createVNode13("div", childData, null)]);
      });
    };
    const setValue = (value) => {
      const {
        options
      } = state;
      for (let i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i);
        }
      }
    };
    const getValue = () => state.options[state.index];
    const hasOptions = () => state.options.length;
    setIndex(state.index);
    useParent(PICKER_KEY);
    useExpose({
      state,
      setIndex,
      getValue,
      setValue,
      setOptions,
      hasOptions,
      stopMomentum
    });
    watch7(() => props.initialOptions, setOptions);
    watch7(() => props.defaultIndex, (value) => setIndex(value));
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => _createVNode13("div", {
      "ref": root,
      "class": [bem12(), props.className],
      "onTouchstartPassive": onTouchStart,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [_createVNode13("ul", {
      "ref": wrapper,
      "style": {
        transform: `translate3d(0, ${state.offset + baseOffset()}px, 0)`,
        transitionDuration: `${state.duration}ms`,
        transitionProperty: state.duration ? "all" : "none"
      },
      "class": bem12("wrapper"),
      "onTransitionend": stopMomentum
    }, [renderOptions()])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/picker/Picker.mjs
var [name13, bem13, t] = createNamespace("picker");
var pickerSharedProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  itemHeight: makeNumericProp(44),
  showToolbar: truthProp,
  swipeDuration: makeNumericProp(1e3),
  visibleItemCount: makeNumericProp(6),
  cancelButtonText: String,
  confirmButtonText: String
};
var pickerProps = extend({}, pickerSharedProps, {
  columns: makeArrayProp(),
  valueKey: String,
  defaultIndex: makeNumericProp(0),
  toolbarPosition: makeStringProp("top"),
  columnsFieldNames: Object
});
var stdin_default15 = defineComponent13({
  name: name13,
  props: pickerProps,
  emits: ["confirm", "cancel", "change"],
  setup(props, {
    emit,
    slots
  }) {
    if (true) {
      if (slots.default) {
        console.warn('[Vant] Picker: "default" slot is deprecated, please use "toolbar" slot instead.');
      }
      if (props.valueKey) {
        console.warn('[Vant] Picker: "valueKey" prop is deprecated, please use "columnsFieldNames" prop instead.');
      }
    }
    const hasOptions = ref15(false);
    const columnsRef = ref15();
    const formattedColumns = ref15([]);
    const columnsFieldNames = computed9(() => {
      const {
        columnsFieldNames: columnsFieldNames2
      } = props;
      return {
        text: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.text) || props.valueKey || "text",
        values: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.values) || "values",
        children: (columnsFieldNames2 == null ? void 0 : columnsFieldNames2.children) || "children"
      };
    });
    const {
      children,
      linkChildren
    } = useChildren(PICKER_KEY);
    linkChildren();
    const itemHeight = computed9(() => unitToPx(props.itemHeight));
    const dataType = computed9(() => {
      const firstColumn = props.columns[0];
      if (typeof firstColumn === "object") {
        if (columnsFieldNames.value.children in firstColumn) {
          return "cascade";
        }
        if (columnsFieldNames.value.values in firstColumn) {
          return "object";
        }
      }
      return "plain";
    });
    const formatCascade = () => {
      var _a;
      const formatted = [];
      let cursor = {
        [columnsFieldNames.value.children]: props.columns
      };
      while (cursor && cursor[columnsFieldNames.value.children]) {
        const children2 = cursor[columnsFieldNames.value.children];
        let defaultIndex = (_a = cursor.defaultIndex) != null ? _a : +props.defaultIndex;
        while (children2[defaultIndex] && children2[defaultIndex].disabled) {
          if (defaultIndex < children2.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }
        formatted.push({
          [columnsFieldNames.value.values]: cursor[columnsFieldNames.value.children],
          className: cursor.className,
          defaultIndex
        });
        cursor = children2[defaultIndex];
      }
      formattedColumns.value = formatted;
    };
    const format3 = () => {
      const {
        columns
      } = props;
      if (dataType.value === "plain") {
        formattedColumns.value = [{
          [columnsFieldNames.value.values]: columns
        }];
      } else if (dataType.value === "cascade") {
        formatCascade();
      } else {
        formattedColumns.value = columns;
      }
      hasOptions.value = formattedColumns.value.some((item) => item[columnsFieldNames.value.values] && item[columnsFieldNames.value.values].length !== 0) || children.some((item) => item.hasOptions);
    };
    const getIndexes = () => children.map((child) => child.state.index);
    const setColumnValues = (index, options) => {
      const column = children[index];
      if (column) {
        column.setOptions(options);
        hasOptions.value = true;
      }
    };
    const onCascadeChange = (columnIndex) => {
      let cursor = {
        [columnsFieldNames.value.children]: props.columns
      };
      const indexes = getIndexes();
      for (let i = 0; i <= columnIndex; i++) {
        cursor = cursor[columnsFieldNames.value.children][indexes[i]];
      }
      while (cursor && cursor[columnsFieldNames.value.children]) {
        columnIndex++;
        setColumnValues(columnIndex, cursor[columnsFieldNames.value.children]);
        cursor = cursor[columnsFieldNames.value.children][cursor.defaultIndex || 0];
      }
    };
    const getChild = (index) => children[index];
    const getColumnValue = (index) => {
      const column = getChild(index);
      if (column) {
        return column.getValue();
      }
    };
    const setColumnValue = (index, value) => {
      const column = getChild(index);
      if (column) {
        column.setValue(value);
        if (dataType.value === "cascade") {
          onCascadeChange(index);
        }
      }
    };
    const getColumnIndex = (index) => {
      const column = getChild(index);
      if (column) {
        return column.state.index;
      }
    };
    const setColumnIndex = (columnIndex, optionIndex) => {
      const column = getChild(columnIndex);
      if (column) {
        column.setIndex(optionIndex);
        if (dataType.value === "cascade") {
          onCascadeChange(columnIndex);
        }
      }
    };
    const getColumnValues = (index) => {
      const column = getChild(index);
      if (column) {
        return column.state.options;
      }
    };
    const getValues = () => children.map((child) => child.getValue());
    const setValues = (values) => {
      values.forEach((value, index) => {
        setColumnValue(index, value);
      });
    };
    const setIndexes = (indexes) => {
      indexes.forEach((optionIndex, columnIndex) => {
        setColumnIndex(columnIndex, optionIndex);
      });
    };
    const emitAction = (event) => {
      if (dataType.value === "plain") {
        emit(event, getColumnValue(0), getColumnIndex(0));
      } else {
        emit(event, getValues(), getIndexes());
      }
    };
    const onChange = (columnIndex) => {
      if (dataType.value === "cascade") {
        onCascadeChange(columnIndex);
      }
      if (dataType.value === "plain") {
        emit("change", getColumnValue(0), getColumnIndex(0));
      } else {
        emit("change", getValues(), columnIndex);
      }
    };
    const confirm = () => {
      children.forEach((child) => child.stopMomentum());
      emitAction("confirm");
    };
    const cancel = () => emitAction("cancel");
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return _createVNode14("div", {
          "class": [bem13("title"), "van-ellipsis"]
        }, [props.title]);
      }
    };
    const renderCancel = () => {
      const text = props.cancelButtonText || t("cancel");
      return _createVNode14("button", {
        "type": "button",
        "class": [bem13("cancel"), HAPTICS_FEEDBACK],
        "onClick": cancel
      }, [slots.cancel ? slots.cancel() : text]);
    };
    const renderConfirm = () => {
      const text = props.confirmButtonText || t("confirm");
      return _createVNode14("button", {
        "type": "button",
        "class": [bem13("confirm"), HAPTICS_FEEDBACK],
        "onClick": confirm
      }, [slots.confirm ? slots.confirm() : text]);
    };
    const renderToolbar = () => {
      if (props.showToolbar) {
        const slot = slots.toolbar || slots.default;
        return _createVNode14("div", {
          "class": bem13("toolbar")
        }, [slot ? slot() : [renderCancel(), renderTitle(), renderConfirm()]]);
      }
    };
    const renderColumnItems = () => formattedColumns.value.map((item, columnIndex) => {
      var _a;
      return _createVNode14(stdin_default14, {
        "textKey": columnsFieldNames.value.text,
        "readonly": props.readonly,
        "allowHtml": props.allowHtml,
        "className": item.className,
        "itemHeight": itemHeight.value,
        "defaultIndex": (_a = item.defaultIndex) != null ? _a : +props.defaultIndex,
        "swipeDuration": props.swipeDuration,
        "initialOptions": item[columnsFieldNames.value.values],
        "visibleItemCount": props.visibleItemCount,
        "onChange": () => onChange(columnIndex)
      }, {
        option: slots.option
      });
    });
    const renderMask = (wrapHeight) => {
      if (hasOptions.value) {
        const frameStyle = {
          height: `${itemHeight.value}px`
        };
        const maskStyle = {
          backgroundSize: `100% ${(wrapHeight - itemHeight.value) / 2}px`
        };
        return [_createVNode14("div", {
          "class": bem13("mask"),
          "style": maskStyle
        }, null), _createVNode14("div", {
          "class": [BORDER_UNSET_TOP_BOTTOM, bem13("frame")],
          "style": frameStyle
        }, null)];
      }
    };
    const renderColumns = () => {
      const wrapHeight = itemHeight.value * +props.visibleItemCount;
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      return _createVNode14("div", {
        "ref": columnsRef,
        "class": bem13("columns"),
        "style": columnsStyle
      }, [renderColumnItems(), renderMask(wrapHeight)]);
    };
    watch8(() => props.columns, format3, {
      immediate: true
    });
    useEventListener("touchmove", preventDefault, {
      target: columnsRef
    });
    useExpose({
      confirm,
      getValues,
      setValues,
      getIndexes,
      setIndexes,
      getColumnIndex,
      setColumnIndex,
      getColumnValue,
      setColumnValue,
      getColumnValues,
      setColumnValues
    });
    return () => {
      var _a, _b;
      return _createVNode14("div", {
        "class": bem13()
      }, [props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? _createVNode14(Loading, {
        "class": bem13("loading")
      }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props.toolbarPosition === "bottom" ? renderToolbar() : null]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/picker/index.mjs
var Picker = withInstall(stdin_default15);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/area/Area.mjs
var [name14, bem14] = createNamespace("area");
var EMPTY_CODE = "000000";
var INHERIT_SLOTS = ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
var INHERIT_PROPS = ["title", "loading", "readonly", "itemHeight", "swipeDuration", "visibleItemCount", "cancelButtonText", "confirmButtonText"];
var isOverseaCode = (code) => code[0] === "9";
var areaProps = extend({}, pickerSharedProps, {
  value: String,
  columnsNum: makeNumericProp(3),
  columnsPlaceholder: makeArrayProp(),
  areaList: {
    type: Object,
    default: () => ({})
  },
  isOverseaCode: {
    type: Function,
    default: isOverseaCode
  }
});
var stdin_default16 = defineComponent14({
  name: name14,
  props: areaProps,
  emits: ["change", "confirm", "cancel"],
  setup(props, {
    emit,
    slots
  }) {
    const pickerRef = ref16();
    const state = reactive4({
      code: props.value,
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    });
    const areaList = computed10(() => {
      const {
        areaList: areaList2
      } = props;
      return {
        province: areaList2.province_list || {},
        city: areaList2.city_list || {},
        county: areaList2.county_list || {}
      };
    });
    const placeholderMap = computed10(() => {
      const {
        columnsPlaceholder
      } = props;
      return {
        province: columnsPlaceholder[0] || "",
        city: columnsPlaceholder[1] || "",
        county: columnsPlaceholder[2] || ""
      };
    });
    const getDefaultCode = () => {
      if (props.columnsPlaceholder.length) {
        return EMPTY_CODE;
      }
      const {
        county,
        city
      } = areaList.value;
      const countyCodes = Object.keys(county);
      if (countyCodes[0]) {
        return countyCodes[0];
      }
      const cityCodes = Object.keys(city);
      if (cityCodes[0]) {
        return cityCodes[0];
      }
      return "";
    };
    const getColumnValues = (type, code) => {
      let column = [];
      if (type !== "province" && !code) {
        return column;
      }
      const list = areaList.value[type];
      column = Object.keys(list).map((listCode) => ({
        code: listCode,
        name: list[listCode]
      }));
      if (code) {
        if (type === "city" && props.isOverseaCode(code)) {
          code = "9";
        }
        column = column.filter((item) => item.code.indexOf(code) === 0);
      }
      if (placeholderMap.value[type] && column.length) {
        let codeFill = "";
        if (type === "city") {
          codeFill = EMPTY_CODE.slice(2, 4);
        } else if (type === "county") {
          codeFill = EMPTY_CODE.slice(4, 6);
        }
        column.unshift({
          code: code + codeFill,
          name: placeholderMap.value[type]
        });
      }
      return column;
    };
    const getIndex = (type, code) => {
      let compareNum = code.length;
      if (type === "province") {
        compareNum = props.isOverseaCode(code) ? 1 : 2;
      }
      if (type === "city") {
        compareNum = 4;
      }
      code = code.slice(0, compareNum);
      const list = getColumnValues(type, compareNum > 2 ? code.slice(0, compareNum - 2) : "");
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }
      return 0;
    };
    const setValues = () => {
      const picker = pickerRef.value;
      if (!picker) {
        return;
      }
      let code = state.code || getDefaultCode();
      const province = getColumnValues("province");
      const city = getColumnValues("city", code.slice(0, 2));
      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);
      if (city.length && code.slice(2, 4) === "00" && !props.isOverseaCode(code)) {
        [{
          code
        }] = city;
      }
      picker.setColumnValues(2, getColumnValues("county", code.slice(0, 4)));
      picker.setIndexes([getIndex("province", code), getIndex("city", code), getIndex("county", code)]);
    };
    const parseValues = (values) => values.map((value, index) => {
      if (value) {
        value = deepClone(value);
        if (!value.code || value.name === props.columnsPlaceholder[index]) {
          value.code = "";
          value.name = "";
        }
      }
      return value;
    });
    const getValues = () => {
      if (pickerRef.value) {
        const values = pickerRef.value.getValues().filter(Boolean);
        return parseValues(values);
      }
      return [];
    };
    const getArea = () => {
      const values = getValues();
      const area = {
        code: "",
        country: "",
        province: "",
        city: "",
        county: ""
      };
      if (!values.length) {
        return area;
      }
      const names = values.map((item) => item.name);
      const validValues = values.filter((value) => value.code);
      area.code = validValues.length ? validValues[validValues.length - 1].code : "";
      if (props.isOverseaCode(area.code)) {
        area.country = names[1] || "";
        area.province = names[2] || "";
      } else {
        area.province = names[0] || "";
        area.city = names[1] || "";
        area.county = names[2] || "";
      }
      return area;
    };
    const reset = (newCode = "") => {
      state.code = newCode;
      setValues();
    };
    const onChange = (values, index) => {
      state.code = values[index].code;
      setValues();
      if (pickerRef.value) {
        const parsedValues = parseValues(pickerRef.value.getValues());
        emit("change", parsedValues, index);
      }
    };
    const onConfirm = (values, index) => {
      setValues();
      emit("confirm", parseValues(values), index);
    };
    const onCancel = (...args) => emit("cancel", ...args);
    onMounted5(setValues);
    watch9(() => props.value, (value) => {
      state.code = value;
      setValues();
    });
    watch9(() => props.areaList, setValues, {
      deep: true
    });
    watch9(() => props.columnsNum, () => {
      nextTick5(setValues);
    });
    useExpose({
      reset,
      getArea,
      getValues
    });
    return () => {
      const columns = state.columns.slice(0, +props.columnsNum);
      return _createVNode15(Picker, _mergeProps5({
        "ref": pickerRef,
        "class": bem14(),
        "columns": columns,
        "columnsFieldNames": {
          text: "name"
        },
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/area/index.mjs
var Area = withInstall(stdin_default16);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cell/Cell.mjs
import { createVNode as _createVNode16 } from "vue";
import { defineComponent as defineComponent15 } from "vue";
var [name15, bem15] = createNamespace("cell");
var cellSharedProps = {
  icon: String,
  size: String,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  required: Boolean,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null,
  arrowDirection: String,
  clickable: {
    type: Boolean,
    default: null
  }
};
var cellProps = extend({}, cellSharedProps, routeProps);
var stdin_default17 = defineComponent15({
  name: name15,
  props: cellProps,
  setup(props, {
    slots
  }) {
    const route2 = useRoute();
    const renderLabel = () => {
      const showLabel = slots.label || isDef(props.label);
      if (showLabel) {
        return _createVNode16("div", {
          "class": [bem15("label"), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };
    const renderTitle = () => {
      if (slots.title || isDef(props.title)) {
        return _createVNode16("div", {
          "class": [bem15("title"), props.titleClass],
          "style": props.titleStyle
        }, [slots.title ? slots.title() : _createVNode16("span", null, [props.title]), renderLabel()]);
      }
    };
    const renderValue = () => {
      const slot = slots.value || slots.default;
      const hasValue = slot || isDef(props.value);
      if (hasValue) {
        const hasTitle = slots.title || isDef(props.title);
        return _createVNode16("div", {
          "class": [bem15("value", {
            alone: !hasTitle
          }), props.valueClass]
        }, [slot ? slot() : _createVNode16("span", null, [props.value])]);
      }
    };
    const renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }
      if (props.icon) {
        return _createVNode16(Icon, {
          "name": props.icon,
          "class": bem15("left-icon"),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      if (props.isLink) {
        const name210 = props.arrowDirection && props.arrowDirection !== "right" ? `arrow-${props.arrowDirection}` : "arrow";
        return _createVNode16(Icon, {
          "name": name210,
          "class": bem15("right-icon")
        }, null);
      }
    };
    return () => {
      var _a, _b;
      const {
        size,
        center,
        border,
        isLink,
        required
      } = props;
      const clickable = (_a = props.clickable) != null ? _a : isLink;
      const classes = {
        center,
        required,
        clickable,
        borderless: !border
      };
      if (size) {
        classes[size] = !!size;
      }
      return _createVNode16("div", {
        "class": bem15(classes),
        "role": clickable ? "button" : void 0,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route2
      }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_b = slots.extra) == null ? void 0 : _b.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cell/index.mjs
var Cell = withInstall(stdin_default17);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/form/Form.mjs
import { createVNode as _createVNode17 } from "vue";
import { defineComponent as defineComponent16 } from "vue";
var [name16, bem16] = createNamespace("form");
var formProps = {
  colon: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  showError: Boolean,
  labelWidth: numericProp,
  labelAlign: String,
  inputAlign: String,
  scrollToError: Boolean,
  validateFirst: Boolean,
  submitOnEnter: truthProp,
  showErrorMessage: truthProp,
  errorMessageAlign: String,
  validateTrigger: {
    type: [String, Array],
    default: "onBlur"
  }
};
var stdin_default18 = defineComponent16({
  name: name16,
  props: formProps,
  emits: ["submit", "failed"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(FORM_KEY);
    const getFieldsByNames = (names) => {
      if (names) {
        return children.filter((field) => names.includes(field.name));
      }
      return children;
    };
    const validateSeq = (names) => new Promise((resolve, reject) => {
      const errors = [];
      const fields = getFieldsByNames(names);
      fields.reduce((promise, field) => promise.then(() => {
        if (!errors.length) {
          return field.validate().then((error) => {
            if (error) {
              errors.push(error);
            }
          });
        }
      }), Promise.resolve()).then(() => {
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
    const validateAll = (names) => new Promise((resolve, reject) => {
      const fields = getFieldsByNames(names);
      Promise.all(fields.map((item) => item.validate())).then((errors) => {
        errors = errors.filter(Boolean);
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
    const validateField = (name210) => {
      const matched = children.find((item) => item.name === name210);
      if (matched) {
        return new Promise((resolve, reject) => {
          matched.validate().then((error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }
      return Promise.reject();
    };
    const validate = (name210) => {
      if (typeof name210 === "string") {
        return validateField(name210);
      }
      return props.validateFirst ? validateSeq(name210) : validateAll(name210);
    };
    const resetValidation = (name210) => {
      if (typeof name210 === "string") {
        name210 = [name210];
      }
      const fields = getFieldsByNames(name210);
      fields.forEach((item) => {
        item.resetValidation();
      });
    };
    const getValidationStatus = () => children.reduce((form, field) => {
      form[field.name] = field.getValidationStatus();
      return form;
    }, {});
    const scrollToField = (name210, options) => {
      children.some((item) => {
        if (item.name === name210) {
          item.$el.scrollIntoView(options);
          return true;
        }
        return false;
      });
    };
    const getValues = () => children.reduce((form, field) => {
      form[field.name] = field.formValue.value;
      return form;
    }, {});
    const submit = () => {
      const values = getValues();
      validate().then(() => emit("submit", values)).catch((errors) => {
        emit("failed", {
          values,
          errors
        });
        if (props.scrollToError && errors[0].name) {
          scrollToField(errors[0].name);
        }
      });
    };
    const onSubmit = (event) => {
      preventDefault(event);
      submit();
    };
    linkChildren({
      props
    });
    useExpose({
      submit,
      validate,
      getValues,
      scrollToField,
      resetValidation,
      getValidationStatus
    });
    return () => {
      var _a;
      return _createVNode17("form", {
        "class": bem16(),
        "onSubmit": onSubmit
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/form/index.mjs
var Form = withInstall(stdin_default18);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/field/Field.mjs
import { createTextVNode as _createTextVNode, mergeProps as _mergeProps6, createVNode as _createVNode18 } from "vue";
import { ref as ref17, watch as watch10, provide as provide4, computed as computed11, nextTick as nextTick6, reactive as reactive5, onMounted as onMounted6, defineComponent as defineComponent17 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/field/utils.mjs
function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
}
function runSyncRule(value, rule) {
  if (isEmptyValue(value)) {
    if (rule.required) {
      return false;
    }
    if (rule.validateEmpty === false) {
      return true;
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}
function runRuleValidator(value, rule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator(value, rule);
    if (isPromise(returnVal)) {
      returnVal.then(resolve);
      return;
    }
    resolve(returnVal);
  });
}
function getRuleMessage(value, rule) {
  const { message } = rule;
  if (isFunction(message)) {
    return message(value, rule);
  }
  return message || "";
}
function startComposing({ target }) {
  target.composing = true;
}
function endComposing({ target }) {
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
function resizeTextarea(input, autosize) {
  const scrollTop = getRootScrollTop();
  input.style.height = "auto";
  let height2 = input.scrollHeight;
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize;
    if (maxHeight !== void 0) {
      height2 = Math.min(height2, maxHeight);
    }
    if (minHeight !== void 0) {
      height2 = Math.max(height2, minHeight);
    }
  }
  if (height2) {
    input.style.height = `${height2}px`;
    setRootScrollTop(scrollTop);
  }
}
function mapInputType(type) {
  if (type === "number") {
    return {
      type: "text",
      inputmode: "decimal"
    };
  }
  if (type === "digit") {
    return {
      type: "tel",
      inputmode: "numeric"
    };
  }
  return { type };
}
function getStringLength(str) {
  return [...str].length;
}
function cutString(str, maxlength) {
  return [...str].slice(0, maxlength).join("");
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-id.mjs
import { getCurrentInstance as getCurrentInstance5 } from "vue";
var current = 0;
function useId() {
  const vm = getCurrentInstance5();
  const { name: name97 = "unknown" } = (vm == null ? void 0 : vm.type) || {};
  if (false) {
    return name97;
  }
  return `${name97}-${++current}`;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/field/Field.mjs
var [name17, bem17] = createNamespace("field");
var fieldSharedProps = {
  id: String,
  name: String,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: numericProp,
  formatter: Function,
  clearIcon: makeStringProp("clear"),
  modelValue: makeNumericProp(""),
  inputAlign: String,
  placeholder: String,
  autocomplete: String,
  errorMessage: String,
  enterkeyhint: String,
  clearTrigger: makeStringProp("focus"),
  formatTrigger: makeStringProp("onChange"),
  error: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  }
};
var fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
  rows: numericProp,
  type: makeStringProp("text"),
  rules: Array,
  autosize: [Boolean, Object],
  labelWidth: numericProp,
  labelClass: unknownProp,
  labelAlign: String,
  showWordLimit: Boolean,
  errorMessageAlign: String,
  colon: {
    type: Boolean,
    default: null
  }
});
var stdin_default19 = defineComponent17({
  name: name17,
  props: fieldProps,
  emits: ["blur", "focus", "clear", "keypress", "click-input", "end-validate", "start-validate", "click-left-icon", "click-right-icon", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const id = useId();
    const state = reactive5({
      status: "unvalidated",
      focused: false,
      validateMessage: ""
    });
    const inputRef = ref17();
    const clearIconRef = ref17();
    const customValue = ref17();
    const {
      parent: form
    } = useParent(FORM_KEY);
    const getModelValue = () => {
      var _a;
      return String((_a = props.modelValue) != null ? _a : "");
    };
    const getProp = (key) => {
      if (isDef(props[key])) {
        return props[key];
      }
      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };
    const showClear = computed11(() => {
      const readonly = getProp("readonly");
      if (props.clearable && !readonly) {
        const hasValue = getModelValue() !== "";
        const trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && state.focused;
        return hasValue && trigger;
      }
      return false;
    });
    const formValue = computed11(() => {
      if (customValue.value && slots.input) {
        return customValue.value();
      }
      return props.modelValue;
    });
    const runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
      if (state.status === "failed") {
        return;
      }
      let {
        value
      } = formValue;
      if (rule.formatter) {
        value = rule.formatter(value, rule);
      }
      if (!runSyncRule(value, rule)) {
        state.status = "failed";
        state.validateMessage = getRuleMessage(value, rule);
        return;
      }
      if (rule.validator) {
        if (isEmptyValue(value) && rule.validateEmpty === false) {
          return;
        }
        return runRuleValidator(value, rule).then((result) => {
          if (result && typeof result === "string") {
            state.status = "failed";
            state.validateMessage = result;
          } else if (result === false) {
            state.status = "failed";
            state.validateMessage = getRuleMessage(value, rule);
          }
        });
      }
    }), Promise.resolve());
    const resetValidation = () => {
      state.status = "unvalidated";
      state.validateMessage = "";
    };
    const endValidate = () => emit("end-validate", {
      status: state.status
    });
    const validate = (rules = props.rules) => new Promise((resolve) => {
      resetValidation();
      if (rules) {
        emit("start-validate");
        runRules(rules).then(() => {
          if (state.status === "failed") {
            resolve({
              name: props.name,
              message: state.validateMessage
            });
            endValidate();
          } else {
            state.status = "passed";
            resolve();
            endValidate();
          }
        });
      } else {
        resolve();
      }
    });
    const validateWithTrigger = (trigger) => {
      if (form && props.rules) {
        const {
          validateTrigger
        } = form.props;
        const defaultTrigger = toArray(validateTrigger).includes(trigger);
        const rules = props.rules.filter((rule) => {
          if (rule.trigger) {
            return toArray(rule.trigger).includes(trigger);
          }
          return defaultTrigger;
        });
        if (rules.length) {
          validate(rules);
        }
      }
    };
    const limitValueLength = (value) => {
      var _a;
      const {
        maxlength
      } = props;
      if (isDef(maxlength) && getStringLength(value) > maxlength) {
        const modelValue = getModelValue();
        if (modelValue && getStringLength(modelValue) === +maxlength) {
          return modelValue;
        }
        const selectionEnd = (_a = inputRef.value) == null ? void 0 : _a.selectionEnd;
        if (state.focused && selectionEnd) {
          const valueArr = [...value];
          const exceededLength = valueArr.length - +maxlength;
          valueArr.splice(selectionEnd - exceededLength, exceededLength);
          return valueArr.join("");
        }
        return cutString(value, +maxlength);
      }
      return value;
    };
    const updateValue = (value, trigger = "onChange") => {
      const originalValue = value;
      value = limitValueLength(value);
      const limitDiffLen = getStringLength(originalValue) - getStringLength(value);
      if (props.type === "number" || props.type === "digit") {
        const isNumber = props.type === "number";
        value = formatNumber(value, isNumber, isNumber);
      }
      let formatterDiffLen = 0;
      if (props.formatter && trigger === props.formatTrigger) {
        const {
          formatter,
          maxlength
        } = props;
        value = formatter(value);
        if (isDef(maxlength) && getStringLength(value) > maxlength) {
          value = cutString(value, +maxlength);
        }
        if (inputRef.value && state.focused) {
          const {
            selectionEnd
          } = inputRef.value;
          const bcoVal = cutString(originalValue, selectionEnd);
          formatterDiffLen = getStringLength(formatter(bcoVal)) - getStringLength(bcoVal);
        }
      }
      if (inputRef.value && inputRef.value.value !== value) {
        if (state.focused) {
          let {
            selectionStart,
            selectionEnd
          } = inputRef.value;
          inputRef.value.value = value;
          if (isDef(selectionStart) && isDef(selectionEnd)) {
            const valueLen = getStringLength(value);
            if (limitDiffLen) {
              selectionStart -= limitDiffLen;
              selectionEnd -= limitDiffLen;
            } else if (formatterDiffLen) {
              selectionStart += formatterDiffLen;
              selectionEnd += formatterDiffLen;
            }
            inputRef.value.setSelectionRange(Math.min(selectionStart, valueLen), Math.min(selectionEnd, valueLen));
          }
        } else {
          inputRef.value.value = value;
        }
      }
      if (value !== props.modelValue) {
        emit("update:modelValue", value);
      }
    };
    const onInput = (event) => {
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };
    const blur = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const adjustTextareaSize = () => {
      const input = inputRef.value;
      if (props.type === "textarea" && props.autosize && input) {
        resizeTextarea(input, props.autosize);
      }
    };
    const onFocus = (event) => {
      state.focused = true;
      emit("focus", event);
      nextTick6(adjustTextareaSize);
      if (getProp("readonly")) {
        blur();
      }
    };
    const onBlur = (event) => {
      if (getProp("readonly")) {
        return;
      }
      state.focused = false;
      updateValue(getModelValue(), "onBlur");
      emit("blur", event);
      validateWithTrigger("onBlur");
      nextTick6(adjustTextareaSize);
      resetScroll();
    };
    const onClickInput = (event) => emit("click-input", event);
    const onClickLeftIcon = (event) => emit("click-left-icon", event);
    const onClickRightIcon = (event) => emit("click-right-icon", event);
    const onClear = (event) => {
      preventDefault(event);
      emit("update:modelValue", "");
      emit("clear", event);
    };
    const showError = computed11(() => {
      if (typeof props.error === "boolean") {
        return props.error;
      }
      if (form && form.props.showError && state.status === "failed") {
        return true;
      }
    });
    const labelStyle = computed11(() => {
      const labelWidth = getProp("labelWidth");
      if (labelWidth) {
        return {
          width: addUnit(labelWidth)
        };
      }
    });
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        const submitOnEnter = form && form.props.submitOnEnter;
        if (!submitOnEnter && props.type !== "textarea") {
          preventDefault(event);
        }
        if (props.type === "search") {
          blur();
        }
      }
      emit("keypress", event);
    };
    const getInputId = () => props.id || `${id}-input`;
    const getValidationStatus = () => state.status;
    const renderInput = () => {
      const controlClass = bem17("control", [getProp("inputAlign"), {
        error: showError.value,
        custom: !!slots.input,
        "min-height": props.type === "textarea" && !props.autosize
      }]);
      if (slots.input) {
        return _createVNode18("div", {
          "class": controlClass,
          "onClick": onClickInput
        }, [slots.input()]);
      }
      const inputAttrs = {
        id: getInputId(),
        ref: inputRef,
        name: props.name,
        rows: props.rows !== void 0 ? +props.rows : void 0,
        class: controlClass,
        disabled: getProp("disabled"),
        readonly: getProp("readonly"),
        autofocus: props.autofocus,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        enterkeyhint: props.enterkeyhint,
        "aria-labelledby": props.label ? `${id}-label` : void 0,
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onChange: endComposing,
        onKeypress,
        onCompositionend: endComposing,
        onCompositionstart: startComposing
      };
      if (props.type === "textarea") {
        return _createVNode18("textarea", inputAttrs, null);
      }
      return _createVNode18("input", _mergeProps6(mapInputType(props.type), inputAttrs), null);
    };
    const renderLeftIcon = () => {
      const leftIconSlot = slots["left-icon"];
      if (props.leftIcon || leftIconSlot) {
        return _createVNode18("div", {
          "class": bem17("left-icon"),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : _createVNode18(Icon, {
          "name": props.leftIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };
    const renderRightIcon = () => {
      const rightIconSlot = slots["right-icon"];
      if (props.rightIcon || rightIconSlot) {
        return _createVNode18("div", {
          "class": bem17("right-icon"),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : _createVNode18(Icon, {
          "name": props.rightIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };
    const renderWordLimit = () => {
      if (props.showWordLimit && props.maxlength) {
        const count = getStringLength(getModelValue());
        return _createVNode18("div", {
          "class": bem17("word-limit")
        }, [_createVNode18("span", {
          "class": bem17("word-num")
        }, [count]), _createTextVNode("/"), props.maxlength]);
      }
    };
    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return;
      }
      const message = props.errorMessage || state.validateMessage;
      if (message) {
        const slot = slots["error-message"];
        const errorMessageAlign = getProp("errorMessageAlign");
        return _createVNode18("div", {
          "class": bem17("error-message", errorMessageAlign)
        }, [slot ? slot({
          message
        }) : message]);
      }
    };
    const renderLabel = () => {
      const colon = getProp("colon") ? ":" : "";
      if (slots.label) {
        return [slots.label(), colon];
      }
      if (props.label) {
        return _createVNode18("label", {
          "id": `${id}-label`,
          "for": getInputId()
        }, [props.label + colon]);
      }
    };
    const renderFieldBody = () => [_createVNode18("div", {
      "class": bem17("body")
    }, [renderInput(), showClear.value && _createVNode18(Icon, {
      "ref": clearIconRef,
      "name": props.clearIcon,
      "class": bem17("clear")
    }, null), renderRightIcon(), slots.button && _createVNode18("div", {
      "class": bem17("button")
    }, [slots.button()])]), renderWordLimit(), renderMessage()];
    useExpose({
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus
    });
    provide4(CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger
    });
    watch10(() => props.modelValue, () => {
      updateValue(getModelValue());
      resetValidation();
      validateWithTrigger("onChange");
      nextTick6(adjustTextareaSize);
    });
    onMounted6(() => {
      updateValue(getModelValue(), props.formatTrigger);
      nextTick6(adjustTextareaSize);
    });
    useEventListener("touchstart", onClear, {
      target: computed11(() => {
        var _a;
        return (_a = clearIconRef.value) == null ? void 0 : _a.$el;
      })
    });
    return () => {
      const disabled = getProp("disabled");
      const labelAlign = getProp("labelAlign");
      const Label = renderLabel();
      const LeftIcon = renderLeftIcon();
      return _createVNode18(Cell, {
        "size": props.size,
        "icon": props.leftIcon,
        "class": bem17({
          error: showError.value,
          disabled,
          [`label-${labelAlign}`]: labelAlign
        }),
        "center": props.center,
        "border": props.border,
        "isLink": props.isLink,
        "clickable": props.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": bem17("value"),
        "titleClass": [bem17("label", [labelAlign, {
          required: props.required
        }]), props.labelClass],
        "arrowDirection": props.arrowDirection
      }, {
        icon: LeftIcon ? () => LeftIcon : null,
        title: Label ? () => Label : null,
        value: renderFieldBody,
        extra: slots.extra
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/field/index.mjs
var Field = withInstall(stdin_default19);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/toast/function-call.mjs
import { createVNode as _createVNode20, mergeProps as _mergeProps8 } from "vue";
import { ref as ref18, watch as watch12, getCurrentInstance as getCurrentInstance6 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/utils/mount-component.mjs
import { createApp, reactive as reactive6 } from "vue";
function usePopupState() {
  const state = reactive6({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props) => {
    extend(state, props, { transitionAppear: true });
    toggle(true);
  };
  const close = () => toggle(false);
  useExpose({ open, close, toggle });
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  const app = createApp(RootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/toast/Toast.mjs
import { mergeProps as _mergeProps7, createVNode as _createVNode19 } from "vue";
import { watch as watch11, onMounted as onMounted7, onUnmounted as onUnmounted3, defineComponent as defineComponent18 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/toast/lock-click.mjs
var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add("van-toast--unclickable");
    }
    lockCount++;
  } else if (lockCount) {
    lockCount--;
    if (!lockCount) {
      document.body.classList.remove("van-toast--unclickable");
    }
  }
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/toast/Toast.mjs
var [name18, bem18] = createNamespace("toast");
var popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
var toastProps = {
  icon: String,
  show: Boolean,
  type: makeStringProp("text"),
  overlay: Boolean,
  message: numericProp,
  iconSize: numericProp,
  duration: makeNumberProp(2e3),
  position: makeStringProp("middle"),
  teleport: [String, Object],
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp("van-fade"),
  loadingType: String,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean
};
var stdin_default20 = defineComponent18({
  name: name18,
  props: toastProps,
  emits: ["update:show"],
  setup(props, {
    emit
  }) {
    let timer2;
    let clickable = false;
    const toggleClickable = () => {
      const newValue = props.show && props.forbidClick;
      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };
    const updateShow = (show) => emit("update:show", show);
    const onClick = () => {
      if (props.closeOnClick) {
        updateShow(false);
      }
    };
    const clearTimer = () => clearTimeout(timer2);
    const renderIcon = () => {
      const {
        icon,
        type,
        iconSize,
        iconPrefix,
        loadingType
      } = props;
      const hasIcon = icon || type === "success" || type === "fail";
      if (hasIcon) {
        return _createVNode19(Icon, {
          "name": icon || type,
          "size": iconSize,
          "class": bem18("icon"),
          "classPrefix": iconPrefix
        }, null);
      }
      if (type === "loading") {
        return _createVNode19(Loading, {
          "class": bem18("loading"),
          "size": iconSize,
          "type": loadingType
        }, null);
      }
    };
    const renderMessage = () => {
      const {
        type,
        message
      } = props;
      if (isDef(message) && message !== "") {
        return type === "html" ? _createVNode19("div", {
          "key": 0,
          "class": bem18("text"),
          "innerHTML": String(message)
        }, null) : _createVNode19("div", {
          "class": bem18("text")
        }, [message]);
      }
    };
    watch11(() => [props.show, props.forbidClick], toggleClickable);
    watch11(() => [props.show, props.type, props.message, props.duration], () => {
      clearTimer();
      if (props.show && props.duration > 0) {
        timer2 = setTimeout(() => {
          updateShow(false);
        }, props.duration);
      }
    });
    onMounted7(toggleClickable);
    onUnmounted3(toggleClickable);
    return () => _createVNode19(Popup, _mergeProps7({
      "class": [bem18([props.position, {
        [props.type]: !props.icon
      }]), props.className],
      "lockScroll": false,
      "onClick": onClick,
      "onClosed": clearTimer,
      "onUpdate:show": updateShow
    }, pick(props, popupInheritProps)), {
      default: () => [renderIcon(), renderMessage()]
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/toast/function-call.mjs
var defaultOptions = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: false,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: false,
  closeOnClickOverlay: false
};
var queue = [];
var allowMultiple = false;
var currentOptions = extend({}, defaultOptions);
var defaultOptionsMap = /* @__PURE__ */ new Map();
function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }
  return {
    message
  };
}
function createInstance() {
  const {
    instance: instance4,
    unmount
  } = mountComponent({
    setup() {
      const message = ref18("");
      const {
        open,
        state,
        close,
        toggle
      } = usePopupState();
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter((item) => item !== instance4);
          unmount();
        }
      };
      const render = () => {
        const attrs = {
          onClosed,
          "onUpdate:show": toggle
        };
        return _createVNode20(stdin_default20, _mergeProps8(state, attrs), null);
      };
      watch12(message, (val) => {
        state.message = val;
      });
      getCurrentInstance6().render = render;
      return {
        open,
        clear: close,
        message
      };
    }
  });
  return instance4;
}
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance4 = createInstance();
    queue.push(instance4);
  }
  return queue[queue.length - 1];
}
function Toast(options = {}) {
  if (!inBrowser) {
    return {};
  }
  const toast = getInstance();
  const parsedOptions = parseOptions(options);
  toast.open(extend({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type), parsedOptions));
  return toast;
}
var createMethod = (type) => (options) => Toast(extend({
  type
}, parseOptions(options)));
Toast.loading = createMethod("loading");
Toast.success = createMethod("success");
Toast.fail = createMethod("fail");
Toast.clear = (all) => {
  var _a;
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.clear();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].clear();
    } else {
      (_a = queue.shift()) == null ? void 0 : _a.clear();
    }
  }
};
function setDefaultOptions(type, options) {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions, type);
  }
}
Toast.setDefaultOptions = setDefaultOptions;
Toast.resetDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};
Toast.allowMultiple = (value = true) => {
  allowMultiple = value;
};
Toast.install = (app) => {
  app.use(withInstall(stdin_default20));
  app.config.globalProperties.$toast = Toast;
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/switch/Switch.mjs
import { createVNode as _createVNode21 } from "vue";
import { defineComponent as defineComponent19 } from "vue";
var [name19, bem19] = createNamespace("switch");
var switchProps = {
  size: numericProp,
  loading: Boolean,
  disabled: Boolean,
  modelValue: unknownProp,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: unknownProp,
    default: true
  },
  inactiveValue: {
    type: unknownProp,
    default: false
  }
};
var stdin_default21 = defineComponent19({
  name: name19,
  props: switchProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const isChecked = () => props.modelValue === props.activeValue;
    const onClick = () => {
      if (!props.disabled && !props.loading) {
        const newValue = isChecked() ? props.inactiveValue : props.activeValue;
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    };
    const renderLoading = () => {
      if (props.loading) {
        const color = isChecked() ? props.activeColor : props.inactiveColor;
        return _createVNode21(Loading, {
          "class": bem19("loading"),
          "color": color
        }, null);
      }
      if (slots.node) {
        return slots.node();
      }
    };
    useCustomFieldValue(() => props.modelValue);
    return () => {
      var _a;
      const {
        size,
        loading,
        disabled,
        activeColor,
        inactiveColor
      } = props;
      const checked = isChecked();
      const style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor
      };
      return _createVNode21("div", {
        "role": "switch",
        "class": bem19({
          on: checked,
          loading,
          disabled
        }),
        "style": style,
        "tabindex": disabled ? void 0 : 0,
        "aria-checked": checked,
        "onClick": onClick
      }, [_createVNode21("div", {
        "class": bem19("node")
      }, [renderLoading()]), (_a = slots.background) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/switch/index.mjs
var Switch = withInstall(stdin_default21);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-edit/AddressEditDetail.mjs
import { Fragment as _Fragment2, createVNode as _createVNode22 } from "vue";
import { ref as ref19, defineComponent as defineComponent20 } from "vue";
var [name20, bem20] = createNamespace("address-edit-detail");
var t2 = createNamespace("address-edit")[2];
var stdin_default22 = defineComponent20({
  name: name20,
  props: {
    show: Boolean,
    rows: numericProp,
    value: String,
    rules: Array,
    focused: Boolean,
    maxlength: numericProp,
    searchResult: Array,
    showSearchResult: Boolean
  },
  emits: ["blur", "focus", "input", "select-search"],
  setup(props, {
    emit
  }) {
    const field = ref19();
    const showSearchResult = () => props.focused && props.searchResult && props.showSearchResult;
    const onSelect = (express) => {
      emit("select-search", express);
      emit("input", `${express.address || ""} ${express.name || ""}`.trim());
    };
    const renderSearchTitle = (express) => {
      if (express.name) {
        const text = express.name.replace(props.value, `<span class=${bem20("keyword")}>${props.value}</span>`);
        return _createVNode22("div", {
          "innerHTML": text
        }, null);
      }
    };
    const renderSearchResult = () => {
      if (!showSearchResult()) {
        return;
      }
      const {
        searchResult
      } = props;
      return searchResult.map((express) => _createVNode22(Cell, {
        "clickable": true,
        "key": express.name + express.address,
        "icon": "location-o",
        "label": express.address,
        "class": bem20("search-item"),
        "border": false,
        "onClick": () => onSelect(express)
      }, {
        title: () => renderSearchTitle(express)
      }));
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onInput = (value) => emit("input", value);
    return () => {
      if (props.show) {
        return _createVNode22(_Fragment2, null, [_createVNode22(Field, {
          "autosize": true,
          "clearable": true,
          "ref": field,
          "class": bem20(),
          "rows": props.rows,
          "type": "textarea",
          "rules": props.rules,
          "label": t2("addressDetail"),
          "border": !showSearchResult(),
          "maxlength": props.maxlength,
          "modelValue": props.value,
          "placeholder": t2("addressDetail"),
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onUpdate:modelValue": onInput
        }, null), renderSearchResult()]);
      }
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-edit/AddressEdit.mjs
var [name21, bem21, t3] = createNamespace("address-edit");
var DEFAULT_DATA = {
  name: "",
  tel: "",
  city: "",
  county: "",
  country: "",
  province: "",
  areaCode: "",
  isDefault: false,
  postalCode: "",
  addressDetail: ""
};
var isPostal = (value) => /^\d{6}$/.test(value);
var addressEditProps = {
  areaList: Object,
  isSaving: Boolean,
  isDeleting: Boolean,
  validator: Function,
  showArea: truthProp,
  showDetail: truthProp,
  showDelete: Boolean,
  showPostal: Boolean,
  disableArea: Boolean,
  searchResult: Array,
  telMaxlength: numericProp,
  showSetDefault: Boolean,
  saveButtonText: String,
  areaPlaceholder: String,
  deleteButtonText: String,
  showSearchResult: Boolean,
  detailRows: makeNumericProp(1),
  detailMaxlength: makeNumericProp(200),
  areaColumnsPlaceholder: makeArrayProp(),
  addressInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_DATA)
  },
  telValidator: {
    type: Function,
    default: isMobile
  },
  postalValidator: {
    type: Function,
    default: isPostal
  }
};
var stdin_default23 = defineComponent21({
  name: name21,
  props: addressEditProps,
  emits: ["save", "focus", "delete", "click-area", "change-area", "change-detail", "select-search", "change-default"],
  setup(props, {
    emit,
    slots
  }) {
    const areaRef = ref20();
    const data = reactive7({});
    const showAreaPopup = ref20(false);
    const detailFocused = ref20(false);
    const areaListLoaded = computed12(() => isObject(props.areaList) && Object.keys(props.areaList).length);
    const areaText = computed12(() => {
      const {
        country,
        province,
        city,
        county,
        areaCode
      } = data;
      if (areaCode) {
        const arr = [country, province, city, county];
        if (province && province === city) {
          arr.splice(1, 1);
        }
        return arr.filter(Boolean).join("/");
      }
      return "";
    });
    const hideBottomFields = computed12(() => {
      var _a;
      return ((_a = props.searchResult) == null ? void 0 : _a.length) && detailFocused.value;
    });
    const assignAreaValues = () => {
      if (areaRef.value) {
        const detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        extend(data, detail);
      }
    };
    const onFocus = (key) => {
      detailFocused.value = key === "addressDetail";
      emit("focus", key);
    };
    const rules = computed12(() => {
      const {
        validator,
        telValidator,
        postalValidator
      } = props;
      const makeRule = (name210, emptyMessage) => ({
        validator: (value) => {
          if (validator) {
            const message = validator(name210, value);
            if (message) {
              return message;
            }
          }
          if (!value) {
            return emptyMessage;
          }
          return true;
        }
      });
      return {
        name: [makeRule("name", t3("nameEmpty"))],
        tel: [makeRule("tel", t3("telInvalid")), {
          validator: telValidator,
          message: t3("telInvalid")
        }],
        areaCode: [makeRule("areaCode", t3("areaEmpty"))],
        addressDetail: [makeRule("addressDetail", t3("addressEmpty"))],
        postalCode: [makeRule("addressDetail", t3("postalEmpty")), {
          validator: postalValidator,
          message: t3("postalEmpty")
        }]
      };
    });
    const onSave = () => emit("save", data);
    const onChangeDetail = (val) => {
      data.addressDetail = val;
      emit("change-detail", val);
    };
    const onAreaConfirm = (values) => {
      values = values.filter(Boolean);
      if (values.some((value) => !value.code)) {
        Toast(t3("areaEmpty"));
      } else {
        showAreaPopup.value = false;
        assignAreaValues();
        emit("change-area", values);
      }
    };
    const onDelete = () => emit("delete", data);
    const getArea = () => {
      var _a;
      return ((_a = areaRef.value) == null ? void 0 : _a.getValues()) || [];
    };
    const setAreaCode = (code) => {
      data.areaCode = code || "";
      if (code) {
        nextTick7(assignAreaValues);
      }
    };
    const onDetailBlur = () => {
      setTimeout(() => {
        detailFocused.value = false;
      });
    };
    const setAddressDetail = (value) => {
      data.addressDetail = value;
    };
    const renderSetDefaultCell = () => {
      if (props.showSetDefault) {
        const slots2 = {
          "right-icon": () => _createVNode23(Switch, {
            "modelValue": data.isDefault,
            "onUpdate:modelValue": ($event) => data.isDefault = $event,
            "size": "24",
            "onChange": (event) => emit("change-default", event)
          }, null)
        };
        return _withDirectives3(_createVNode23(Cell, {
          "center": true,
          "title": t3("defaultAddress"),
          "class": bem21("default")
        }, slots2), [[_vShow3, !hideBottomFields.value]]);
      }
    };
    useExpose({
      getArea,
      setAreaCode,
      setAddressDetail
    });
    watch13(() => props.areaList, () => setAreaCode(data.areaCode));
    watch13(() => props.addressInfo, (value) => {
      extend(data, DEFAULT_DATA, value);
      setAreaCode(value.areaCode);
    }, {
      deep: true,
      immediate: true
    });
    return () => {
      const {
        disableArea
      } = props;
      return _createVNode23(Form, {
        "class": bem21(),
        "onSubmit": onSave
      }, {
        default: () => {
          var _a;
          return [_createVNode23("div", {
            "class": bem21("fields")
          }, [_createVNode23(Field, {
            "modelValue": data.name,
            "onUpdate:modelValue": ($event) => data.name = $event,
            "clearable": true,
            "label": t3("name"),
            "rules": rules.value.name,
            "placeholder": t3("name"),
            "onFocus": () => onFocus("name")
          }, null), _createVNode23(Field, {
            "modelValue": data.tel,
            "onUpdate:modelValue": ($event) => data.tel = $event,
            "clearable": true,
            "type": "tel",
            "label": t3("tel"),
            "rules": rules.value.tel,
            "maxlength": props.telMaxlength,
            "placeholder": t3("tel"),
            "onFocus": () => onFocus("tel")
          }, null), _withDirectives3(_createVNode23(Field, {
            "readonly": true,
            "label": t3("area"),
            "is-link": !disableArea,
            "modelValue": areaText.value,
            "rules": rules.value.areaCode,
            "placeholder": props.areaPlaceholder || t3("area"),
            "onFocus": () => onFocus("areaCode"),
            "onClick": () => {
              emit("click-area");
              showAreaPopup.value = !disableArea;
            }
          }, null), [[_vShow3, props.showArea]]), _createVNode23(stdin_default22, {
            "show": props.showDetail,
            "rows": props.detailRows,
            "rules": rules.value.addressDetail,
            "value": data.addressDetail,
            "focused": detailFocused.value,
            "maxlength": props.detailMaxlength,
            "searchResult": props.searchResult,
            "showSearchResult": props.showSearchResult,
            "onBlur": onDetailBlur,
            "onFocus": () => onFocus("addressDetail"),
            "onInput": onChangeDetail,
            "onSelect-search": (event) => emit("select-search", event)
          }, null), props.showPostal && _withDirectives3(_createVNode23(Field, {
            "modelValue": data.postalCode,
            "onUpdate:modelValue": ($event) => data.postalCode = $event,
            "type": "tel",
            "rules": rules.value.postalCode,
            "label": t3("postal"),
            "maxlength": "6",
            "placeholder": t3("postal"),
            "onFocus": () => onFocus("postalCode")
          }, null), [[_vShow3, !hideBottomFields.value]]), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderSetDefaultCell(), _withDirectives3(_createVNode23("div", {
            "class": bem21("buttons")
          }, [_createVNode23(Button, {
            "block": true,
            "round": true,
            "type": "danger",
            "text": props.saveButtonText || t3("save"),
            "class": bem21("button"),
            "loading": props.isSaving,
            "nativeType": "submit"
          }, null), props.showDelete && _createVNode23(Button, {
            "block": true,
            "round": true,
            "class": bem21("button"),
            "loading": props.isDeleting,
            "text": props.deleteButtonText || t3("delete"),
            "onClick": onDelete
          }, null)]), [[_vShow3, !hideBottomFields.value]]), _createVNode23(Popup, {
            "show": showAreaPopup.value,
            "onUpdate:show": ($event) => showAreaPopup.value = $event,
            "round": true,
            "teleport": "body",
            "position": "bottom",
            "lazyRender": false
          }, {
            default: () => [_createVNode23(Area, {
              "ref": areaRef,
              "value": data.areaCode,
              "loading": !areaListLoaded.value,
              "areaList": props.areaList,
              "columnsPlaceholder": props.areaColumnsPlaceholder,
              "onConfirm": onAreaConfirm,
              "onCancel": () => {
                showAreaPopup.value = false;
              }
            }, null)]
          })];
        }
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-edit/index.mjs
var AddressEdit = withInstall(stdin_default23);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-list/AddressList.mjs
import { createVNode as _createVNode29 } from "vue";
import { defineComponent as defineComponent27 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/radio-group/RadioGroup.mjs
import { createVNode as _createVNode24 } from "vue";
import { watch as watch14, defineComponent as defineComponent22 } from "vue";
var [name22, bem22] = createNamespace("radio-group");
var radioGroupProps = {
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: unknownProp,
  checkedColor: String
};
var RADIO_KEY = Symbol(name22);
var stdin_default24 = defineComponent22({
  name: name22,
  props: radioGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(RADIO_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    watch14(() => props.modelValue, (value) => emit("change", value));
    linkChildren({
      props,
      updateValue
    });
    useCustomFieldValue(() => props.modelValue);
    return () => {
      var _a;
      return _createVNode24("div", {
        "class": bem22([props.direction]),
        "role": "radiogroup"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/radio-group/index.mjs
var RadioGroup = withInstall(stdin_default24);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-list/AddressListItem.mjs
import { createVNode as _createVNode28 } from "vue";
import { defineComponent as defineComponent26 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tag/Tag.mjs
import { createVNode as _createVNode25 } from "vue";
import { Transition as Transition3, defineComponent as defineComponent23 } from "vue";
var [name23, bem23] = createNamespace("tag");
var tagProps = {
  size: String,
  mark: Boolean,
  show: truthProp,
  type: makeStringProp("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var stdin_default25 = defineComponent23({
  name: name23,
  props: tagProps,
  emits: ["close"],
  setup(props, {
    slots,
    emit
  }) {
    const onClose = (event) => {
      event.stopPropagation();
      emit("close", event);
    };
    const getStyle = () => {
      if (props.plain) {
        return {
          color: props.textColor || props.color,
          borderColor: props.color
        };
      }
      return {
        color: props.textColor,
        background: props.color
      };
    };
    const renderTag = () => {
      var _a;
      const {
        type,
        mark,
        plain,
        round: round2,
        size,
        closeable
      } = props;
      const classes = {
        mark,
        plain,
        round: round2
      };
      if (size) {
        classes[size] = size;
      }
      const CloseIcon = closeable && _createVNode25(Icon, {
        "name": "cross",
        "class": [bem23("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, null);
      return _createVNode25("span", {
        "style": getStyle(),
        "class": bem23([classes, type])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots), CloseIcon]);
    };
    return () => _createVNode25(Transition3, {
      "name": props.closeable ? "van-fade" : void 0
    }, {
      default: () => [props.show ? renderTag() : null]
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tag/index.mjs
var Tag = withInstall(stdin_default25);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/radio/Radio.mjs
import { createVNode as _createVNode27, mergeProps as _mergeProps9 } from "vue";
import { defineComponent as defineComponent25 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/checkbox/Checker.mjs
import { createVNode as _createVNode26 } from "vue";
import { ref as ref21, computed as computed13, defineComponent as defineComponent24 } from "vue";
var checkerProps = {
  name: unknownProp,
  shape: makeStringProp("round"),
  disabled: Boolean,
  iconSize: numericProp,
  modelValue: unknownProp,
  checkedColor: String,
  labelPosition: String,
  labelDisabled: Boolean
};
var stdin_default26 = defineComponent24({
  props: extend({}, checkerProps, {
    bem: makeRequiredProp(Function),
    role: String,
    parent: Object,
    checked: Boolean,
    bindGroup: truthProp
  }),
  emits: ["click", "toggle"],
  setup(props, {
    emit,
    slots
  }) {
    const iconRef = ref21();
    const getParentProp = (name97) => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name97];
      }
    };
    const disabled = computed13(() => getParentProp("disabled") || props.disabled);
    const direction = computed13(() => getParentProp("direction"));
    const iconStyle = computed13(() => {
      const checkedColor = props.checkedColor || getParentProp("checkedColor");
      if (checkedColor && props.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    });
    const onClick = (event) => {
      const {
        target
      } = event;
      const icon = iconRef.value;
      const iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
      if (!disabled.value && (iconClicked || !props.labelDisabled)) {
        emit("toggle");
      }
      emit("click", event);
    };
    const renderIcon = () => {
      const {
        bem: bem93,
        shape,
        checked
      } = props;
      const iconSize = props.iconSize || getParentProp("iconSize");
      return _createVNode26("div", {
        "ref": iconRef,
        "class": bem93("icon", [shape, {
          disabled: disabled.value,
          checked
        }]),
        "style": {
          fontSize: addUnit(iconSize)
        }
      }, [slots.icon ? slots.icon({
        checked,
        disabled: disabled.value
      }) : _createVNode26(Icon, {
        "name": "success",
        "style": iconStyle.value
      }, null)]);
    };
    const renderLabel = () => {
      if (slots.default) {
        return _createVNode26("span", {
          "class": props.bem("label", [props.labelPosition, {
            disabled: disabled.value
          }])
        }, [slots.default()]);
      }
    };
    return () => {
      const nodes = props.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
      return _createVNode26("div", {
        "role": props.role,
        "class": props.bem([{
          disabled: disabled.value,
          "label-disabled": props.labelDisabled
        }, direction.value]),
        "tabindex": disabled.value ? void 0 : 0,
        "aria-checked": props.checked,
        "onClick": onClick
      }, [nodes]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/radio/Radio.mjs
var [name24, bem24] = createNamespace("radio");
var stdin_default27 = defineComponent25({
  name: name24,
  props: checkerProps,
  emits: ["update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(RADIO_KEY);
    const checked = () => {
      const value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    };
    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name);
      } else {
        emit("update:modelValue", props.name);
      }
    };
    return () => _createVNode27(stdin_default26, _mergeProps9({
      "bem": bem24,
      "role": "radio",
      "parent": parent,
      "checked": checked(),
      "onToggle": toggle
    }, props), pick(slots, ["default", "icon"]));
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/radio/index.mjs
var Radio = withInstall(stdin_default27);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-list/AddressListItem.mjs
var [name25, bem25] = createNamespace("address-item");
var stdin_default28 = defineComponent26({
  name: name25,
  props: {
    address: makeRequiredProp(Object),
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String
  },
  emits: ["edit", "click", "select"],
  setup(props, {
    slots,
    emit
  }) {
    const onClick = () => {
      if (props.switchable) {
        emit("select");
      }
      emit("click");
    };
    const renderRightIcon = () => _createVNode28(Icon, {
      "name": "edit",
      "class": bem25("edit"),
      "onClick": (event) => {
        event.stopPropagation();
        emit("edit");
        emit("click");
      }
    }, null);
    const renderTag = () => {
      if (slots.tag) {
        return slots.tag(props.address);
      }
      if (props.address.isDefault && props.defaultTagText) {
        return _createVNode28(Tag, {
          "type": "danger",
          "round": true,
          "class": bem25("tag")
        }, {
          default: () => [props.defaultTagText]
        });
      }
    };
    const renderContent = () => {
      const {
        address,
        disabled,
        switchable
      } = props;
      const Info = [_createVNode28("div", {
        "class": bem25("name")
      }, [`${address.name} ${address.tel}`, renderTag()]), _createVNode28("div", {
        "class": bem25("address")
      }, [address.address])];
      if (switchable && !disabled) {
        return _createVNode28(Radio, {
          "name": address.id,
          "iconSize": 18
        }, {
          default: () => [Info]
        });
      }
      return Info;
    };
    return () => {
      var _a;
      const {
        disabled
      } = props;
      return _createVNode28("div", {
        "class": bem25({
          disabled
        }),
        "onClick": onClick
      }, [_createVNode28(Cell, {
        "border": false,
        "valueClass": bem25("value")
      }, {
        value: renderContent,
        "right-icon": renderRightIcon
      }), (_a = slots.bottom) == null ? void 0 : _a.call(slots, extend({}, props.address, {
        disabled
      }))]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-list/AddressList.mjs
var [name26, bem26, t4] = createNamespace("address-list");
var addressListProps = {
  list: makeArrayProp(),
  modelValue: numericProp,
  switchable: truthProp,
  disabledText: String,
  disabledList: makeArrayProp(),
  addButtonText: String,
  defaultTagText: String
};
var stdin_default29 = defineComponent27({
  name: name26,
  props: addressListProps,
  emits: ["add", "edit", "select", "click-item", "edit-disabled", "select-disabled", "update:modelValue"],
  setup(props, {
    slots,
    emit
  }) {
    const renderItem = (item, index, disabled) => {
      const onEdit = () => emit(disabled ? "edit-disabled" : "edit", item, index);
      const onClick = () => emit("click-item", item, index);
      const onSelect = () => {
        emit(disabled ? "select-disabled" : "select", item, index);
        if (!disabled) {
          emit("update:modelValue", item.id);
        }
      };
      return _createVNode29(stdin_default28, {
        "key": item.id,
        "address": item,
        "disabled": disabled,
        "switchable": props.switchable,
        "defaultTagText": props.defaultTagText,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots["item-bottom"],
        tag: slots.tag
      });
    };
    const renderList = (list, disabled) => {
      if (list) {
        return list.map((item, index) => renderItem(item, index, disabled));
      }
    };
    const renderBottom = () => _createVNode29("div", {
      "class": [bem26("bottom"), "van-safe-area-bottom"]
    }, [_createVNode29(Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props.addButtonText || t4("add"),
      "class": bem26("add"),
      "onClick": () => emit("add")
    }, null)]);
    return () => {
      var _a, _b;
      const List2 = renderList(props.list);
      const DisabledList = renderList(props.disabledList, true);
      const DisabledText = props.disabledText && _createVNode29("div", {
        "class": bem26("disabled-text")
      }, [props.disabledText]);
      return _createVNode29("div", {
        "class": bem26()
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), _createVNode29(RadioGroup, {
        "modelValue": props.modelValue
      }, {
        default: () => [List2]
      }), DisabledText, DisabledList, (_b = slots.default) == null ? void 0 : _b.call(slots), renderBottom()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/address-list/index.mjs
var AddressList = withInstall(stdin_default29);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/Calendar.mjs
import { createVNode as _createVNode33, mergeProps as _mergeProps10 } from "vue";
import { ref as ref24, watch as watch15, computed as computed16, defineComponent as defineComponent31 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/utils.mjs
var [name27, bem27, t5] = createNamespace("calendar");
var formatMonthTitle = (date) => t5("monthTitle", date.getFullYear(), date.getMonth() + 1);
function compareMonth(date1, date2) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  const compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }
  return compareMonthResult;
}
var cloneDate = (date) => new Date(date);
var cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
function getDayByOffset(date, offset2) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset2);
  return cloned;
}
var getPrevDay = (date) => getDayByOffset(date, -1);
var getNextDay = (date) => getDayByOffset(date, 1);
var getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function calcDateNum(date) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-refs.mjs
import { ref as ref22, onBeforeUpdate } from "vue";
function useRefs() {
  const refs = ref22([]);
  const cache = [];
  onBeforeUpdate(() => {
    refs.value = [];
  });
  const setRefs = (index) => {
    if (!cache[index]) {
      cache[index] = (el) => {
        refs.value[index] = el;
      };
    }
    return cache[index];
  };
  return [refs, setRefs];
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/CalendarMonth.mjs
import { createVNode as _createVNode31 } from "vue";
import { ref as ref23, computed as computed15, defineComponent as defineComponent29 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/datetime-picker/utils.mjs
var sharedProps = extend({}, pickerSharedProps, {
  filter: Function,
  columnsOrder: Array,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
});
var pickerInheritKeys = Object.keys(pickerSharedProps);
function times(n, iteratee) {
  if (n < 0) {
    return [];
  }
  const result = Array(n);
  let index = -1;
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
function getTrueValue(value) {
  if (!value) {
    return 0;
  }
  while (Number.isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }
  return parseInt(value, 10);
}
var getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
var proxyPickerMethods = (picker, callback) => {
  const methods = [
    "setValues",
    "setIndexes",
    "setColumnIndex",
    "setColumnValue"
  ];
  return new Proxy(picker, {
    get: (target, prop) => {
      if (methods.includes(prop)) {
        return (...args) => {
          target[prop](...args);
          callback();
        };
      }
      return target[prop];
    }
  });
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/CalendarDay.mjs
import { createVNode as _createVNode30 } from "vue";
import { computed as computed14, defineComponent as defineComponent28 } from "vue";
var [name28] = createNamespace("calendar-day");
var stdin_default30 = defineComponent28({
  name: name28,
  props: {
    item: makeRequiredProp(Object),
    color: String,
    index: Number,
    offset: makeNumberProp(0),
    rowHeight: String
  },
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const style = computed14(() => {
      var _a;
      const {
        item,
        index,
        color,
        offset: offset2,
        rowHeight
      } = props;
      const style2 = {
        height: rowHeight
      };
      if (item.type === "placeholder") {
        style2.width = "100%";
        return style2;
      }
      if (index === 0) {
        style2.marginLeft = `${100 * offset2 / 7}%`;
      }
      if (color) {
        switch (item.type) {
          case "end":
          case "start":
          case "start-end":
          case "multiple-middle":
          case "multiple-selected":
            style2.background = color;
            break;
          case "middle":
            style2.color = color;
            break;
        }
      }
      if (offset2 + (((_a = item.date) == null ? void 0 : _a.getDate()) || 1) > 28) {
        style2.marginBottom = 0;
      }
      return style2;
    });
    const onClick = () => {
      if (props.item.type !== "disabled") {
        emit("click", props.item);
      }
    };
    const renderTopInfo = () => {
      const {
        topInfo
      } = props.item;
      if (topInfo || slots["top-info"]) {
        return _createVNode30("div", {
          "class": bem27("top-info")
        }, [slots["top-info"] ? slots["top-info"](props.item) : topInfo]);
      }
    };
    const renderBottomInfo = () => {
      const {
        bottomInfo
      } = props.item;
      if (bottomInfo || slots["bottom-info"]) {
        return _createVNode30("div", {
          "class": bem27("bottom-info")
        }, [slots["bottom-info"] ? slots["bottom-info"](props.item) : bottomInfo]);
      }
    };
    const renderContent = () => {
      const {
        item,
        color,
        rowHeight
      } = props;
      const {
        type,
        text
      } = item;
      const Nodes = [renderTopInfo(), text, renderBottomInfo()];
      if (type === "selected") {
        return _createVNode30("div", {
          "class": bem27("selected-day"),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, [Nodes]);
      }
      return Nodes;
    };
    return () => {
      const {
        type,
        className
      } = props.item;
      if (type === "placeholder") {
        return _createVNode30("div", {
          "class": bem27("day"),
          "style": style.value
        }, null);
      }
      return _createVNode30("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [bem27("day", type), className],
        "tabindex": type === "disabled" ? void 0 : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/CalendarMonth.mjs
var [name29] = createNamespace("calendar-month");
var calendarMonthProps = {
  date: makeRequiredProp(Date),
  type: String,
  color: String,
  minDate: makeRequiredProp(Date),
  maxDate: makeRequiredProp(Date),
  showMark: Boolean,
  rowHeight: numericProp,
  formatter: Function,
  lazyRender: Boolean,
  currentDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: Boolean,
  showMonthTitle: Boolean,
  firstDayOfWeek: Number
};
var stdin_default31 = defineComponent29({
  name: name29,
  props: calendarMonthProps,
  emits: ["click", "update-height"],
  setup(props, {
    emit,
    slots
  }) {
    const [visible, setVisible] = useToggle();
    const daysRef = ref23();
    const monthRef = ref23();
    const height2 = useHeight(monthRef);
    const title = computed15(() => formatMonthTitle(props.date));
    const rowHeight = computed15(() => addUnit(props.rowHeight));
    const offset2 = computed15(() => {
      const realDay = props.date.getDay();
      if (props.firstDayOfWeek) {
        return (realDay + 7 - props.firstDayOfWeek) % 7;
      }
      return realDay;
    });
    const totalDay = computed15(() => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1));
    const shouldRender = computed15(() => visible.value || !props.lazyRender);
    const getTitle = () => title.value;
    const getMultipleDayType = (day) => {
      const isSelected = (date) => props.currentDate.some((item) => compareDay(item, date) === 0);
      if (isSelected(day)) {
        const prevDay = getPrevDay(day);
        const nextDay = getNextDay(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }
        if (prevSelected) {
          return "end";
        }
        if (nextSelected) {
          return "start";
        }
        return "multiple-selected";
      }
      return "";
    };
    const getRangeDayType = (day) => {
      const [startDay, endDay] = props.currentDate;
      if (!startDay) {
        return "";
      }
      const compareToStart = compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }
      const compareToEnd = compareDay(day, endDay);
      if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return "start-end";
      }
      if (compareToStart === 0) {
        return "start";
      }
      if (compareToEnd === 0) {
        return "end";
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
      return "";
    };
    const getDayType = (day) => {
      const {
        type,
        minDate,
        maxDate,
        currentDate
      } = props;
      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return "disabled";
      }
      if (currentDate === null) {
        return "";
      }
      if (Array.isArray(currentDate)) {
        if (type === "multiple") {
          return getMultipleDayType(day);
        }
        if (type === "range") {
          return getRangeDayType(day);
        }
      } else if (type === "single") {
        return compareDay(day, currentDate) === 0 ? "selected" : "";
      }
      return "";
    };
    const getBottomInfo = (dayType) => {
      if (props.type === "range") {
        if (dayType === "start" || dayType === "end") {
          return t5(dayType);
        }
        if (dayType === "start-end") {
          return `${t5("start")}/${t5("end")}`;
        }
      }
    };
    const renderTitle = () => {
      if (props.showMonthTitle) {
        return _createVNode31("div", {
          "class": bem27("month-title")
        }, [title.value]);
      }
    };
    const renderMark = () => {
      if (props.showMark && shouldRender.value) {
        return _createVNode31("div", {
          "class": bem27("month-mark")
        }, [props.date.getMonth() + 1]);
      }
    };
    const placeholders = computed15(() => {
      const count = Math.ceil((totalDay.value + offset2.value) / 7);
      return Array(count).fill({
        type: "placeholder"
      });
    });
    const days = computed15(() => {
      const days2 = [];
      const year = props.date.getFullYear();
      const month = props.date.getMonth();
      for (let day = 1; day <= totalDay.value; day++) {
        const date = new Date(year, month, day);
        const type = getDayType(date);
        let config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };
        if (props.formatter) {
          config = props.formatter(config);
        }
        days2.push(config);
      }
      return days2;
    });
    const disabledDays = computed15(() => days.value.filter((day) => day.type === "disabled"));
    const scrollToDate = (body, targetDate) => {
      if (daysRef.value) {
        const daysRect = useRect(daysRef.value);
        const totalRows = placeholders.value.length;
        const currentRow = Math.ceil((targetDate.getDate() + offset2.value) / 7);
        const rowOffset = (currentRow - 1) * daysRect.height / totalRows;
        setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - useRect(body).top);
      }
    };
    const renderDay = (item, index) => _createVNode31(stdin_default30, {
      "item": item,
      "index": index,
      "color": props.color,
      "offset": offset2.value,
      "rowHeight": rowHeight.value,
      "onClick": (item2) => emit("click", item2)
    }, pick(slots, ["top-info", "bottom-info"]));
    const renderDays = () => _createVNode31("div", {
      "ref": daysRef,
      "role": "grid",
      "class": bem27("days")
    }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    useExpose({
      getTitle,
      getHeight: () => height2.value,
      setVisible,
      scrollToDate,
      disabledDays
    });
    return () => _createVNode31("div", {
      "class": bem27("month"),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/CalendarHeader.mjs
import { createVNode as _createVNode32 } from "vue";
import { defineComponent as defineComponent30 } from "vue";
var [name30] = createNamespace("calendar-header");
var stdin_default32 = defineComponent30({
  name: name30,
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  emits: ["click-subtitle"],
  setup(props, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (props.showTitle) {
        const text = props.title || t5("title");
        const title = slots.title ? slots.title() : text;
        return _createVNode32("div", {
          "class": bem27("header-title")
        }, [title]);
      }
    };
    const onClickSubtitle = (event) => emit("click-subtitle", event);
    const renderSubtitle = () => {
      if (props.showSubtitle) {
        const title = slots.subtitle ? slots.subtitle() : props.subtitle;
        return _createVNode32("div", {
          "class": bem27("header-subtitle"),
          "onClick": onClickSubtitle
        }, [title]);
      }
    };
    const renderWeekDays = () => {
      const {
        firstDayOfWeek
      } = props;
      const weekdays = t5("weekdays");
      const renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return _createVNode32("div", {
        "class": bem27("weekdays")
      }, [renderWeekDays2.map((text) => _createVNode32("span", {
        "class": bem27("weekday")
      }, [text]))]);
    };
    return () => _createVNode32("div", {
      "class": bem27("header")
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/Calendar.mjs
var calendarProps = {
  show: Boolean,
  type: makeStringProp("single"),
  title: String,
  color: String,
  round: truthProp,
  readonly: Boolean,
  poppable: truthProp,
  maxRange: makeNumericProp(null),
  position: makeStringProp("bottom"),
  teleport: [String, Object],
  showMark: truthProp,
  showTitle: truthProp,
  formatter: Function,
  rowHeight: numericProp,
  confirmText: String,
  rangePrompt: String,
  lazyRender: truthProp,
  showConfirm: truthProp,
  defaultDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: truthProp,
  closeOnPopstate: truthProp,
  showRangePrompt: truthProp,
  confirmDisabledText: String,
  closeOnClickOverlay: truthProp,
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: truthProp,
  minDate: {
    type: Date,
    validator: isDate,
    default: getToday
  },
  maxDate: {
    type: Date,
    validator: isDate,
    default: () => {
      const now = getToday();
      return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    }
  },
  firstDayOfWeek: {
    type: numericProp,
    default: 0,
    validator: (val) => val >= 0 && val <= 6
  }
};
var stdin_default33 = defineComponent31({
  name: name27,
  props: calendarProps,
  emits: ["select", "confirm", "unselect", "month-show", "over-range", "update:show", "click-subtitle"],
  setup(props, {
    emit,
    slots
  }) {
    const limitDateRange = (date, minDate = props.minDate, maxDate = props.maxDate) => {
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    };
    const getInitialDate = (defaultDate = props.defaultDate) => {
      const {
        type,
        minDate,
        maxDate,
        allowSameDay
      } = props;
      if (defaultDate === null) {
        return defaultDate;
      }
      const now = getToday();
      if (type === "range") {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const start2 = limitDateRange(defaultDate[0] || now, minDate, allowSameDay ? maxDate : getPrevDay(maxDate));
        const end2 = limitDateRange(defaultDate[1] || now, allowSameDay ? minDate : getNextDay(minDate));
        return [start2, end2];
      }
      if (type === "multiple") {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => limitDateRange(date));
        }
        return [limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return limitDateRange(defaultDate);
    };
    let bodyHeight;
    const bodyRef = ref24();
    const subtitle = ref24("");
    const currentDate = ref24(getInitialDate());
    const [monthRefs, setMonthRefs] = useRefs();
    const dayOffset = computed16(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0);
    const months = computed16(() => {
      const months2 = [];
      const cursor = new Date(props.minDate);
      cursor.setDate(1);
      do {
        months2.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, props.maxDate) !== 1);
      return months2;
    });
    const buttonDisabled = computed16(() => {
      if (currentDate.value) {
        if (props.type === "range") {
          return !currentDate.value[0] || !currentDate.value[1];
        }
        if (props.type === "multiple") {
          return !currentDate.value.length;
        }
      }
      return !currentDate.value;
    });
    const getSelectedDate = () => currentDate.value;
    const onScroll = () => {
      const top2 = getScrollTop(bodyRef.value);
      const bottom2 = top2 + bodyHeight;
      const heights = months.value.map((item, index) => monthRefs.value[index].getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);
      if (bottom2 > heightSum && top2 > 0) {
        return;
      }
      let height2 = 0;
      let currentMonth;
      const visibleRange = [-1, -1];
      for (let i = 0; i < months.value.length; i++) {
        const month = monthRefs.value[i];
        const visible = height2 <= bottom2 && height2 + heights[i] >= top2;
        if (visible) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }
          if (!monthRefs.value[i].showed) {
            monthRefs.value[i].showed = true;
            emit("month-show", {
              date: month.date,
              title: month.getTitle()
            });
          }
        }
        height2 += heights[i];
      }
      months.value.forEach((month, index) => {
        const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
        monthRefs.value[index].setVisible(visible);
      });
      if (currentMonth) {
        subtitle.value = currentMonth.getTitle();
      }
    };
    const scrollToDate = (targetDate) => {
      raf(() => {
        months.value.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            if (bodyRef.value) {
              monthRefs.value[index].scrollToDate(bodyRef.value, targetDate);
            }
            return true;
          }
          return false;
        });
        onScroll();
      });
    };
    const scrollToCurrentDate = () => {
      if (props.poppable && !props.show) {
        return;
      }
      if (currentDate.value) {
        const targetDate = props.type === "single" ? currentDate.value : currentDate.value[0];
        if (isDate(targetDate)) {
          scrollToDate(targetDate);
        }
      } else {
        raf(onScroll);
      }
    };
    const init = () => {
      if (props.poppable && !props.show) {
        return;
      }
      raf(() => {
        bodyHeight = Math.floor(useRect(bodyRef).height);
      });
      scrollToCurrentDate();
    };
    const reset = (date = getInitialDate()) => {
      currentDate.value = date;
      scrollToCurrentDate();
    };
    const checkRange = (date) => {
      const {
        maxRange,
        rangePrompt,
        showRangePrompt
      } = props;
      if (maxRange && calcDateNum(date) > maxRange) {
        if (showRangePrompt) {
          Toast(rangePrompt || t5("rangePrompt", maxRange));
        }
        emit("over-range");
        return false;
      }
      return true;
    };
    const onConfirm = () => {
      var _a;
      return emit("confirm", (_a = currentDate.value) != null ? _a : cloneDates(currentDate.value));
    };
    const select = (date, complete) => {
      const setCurrentDate = (date2) => {
        currentDate.value = date2;
        emit("select", cloneDates(date2));
      };
      if (complete && props.type === "range") {
        const valid = checkRange(date);
        if (!valid) {
          setCurrentDate([date[0], getDayByOffset(date[0], +props.maxRange - 1)]);
          return;
        }
      }
      setCurrentDate(date);
      if (complete && !props.showConfirm) {
        onConfirm();
      }
    };
    const getDisabledDate = (disabledDays2, startDay, date) => {
      var _a;
      return (_a = disabledDays2.find((day) => compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1)) == null ? void 0 : _a.date;
    };
    const disabledDays = computed16(() => monthRefs.value.reduce((arr, ref210) => {
      var _a, _b;
      arr.push(...(_b = (_a = ref210.disabledDays) == null ? void 0 : _a.value) != null ? _b : []);
      return arr;
    }, []));
    const onClickDay = (item) => {
      if (props.readonly || !item.date) {
        return;
      }
      const {
        date
      } = item;
      const {
        type
      } = props;
      if (type === "range") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const [startDay, endDay] = currentDate.value;
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            const disabledDay = getDisabledDate(disabledDays.value, startDay, date);
            if (disabledDay) {
              const endDay2 = getPrevDay(disabledDay);
              if (compareDay(startDay, endDay2) === -1) {
                select([startDay, endDay2]);
              } else {
                select([date]);
              }
            } else {
              select([startDay, date], true);
            }
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === "multiple") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const dates = currentDate.value;
        const selectedIndex = dates.findIndex((dateItem) => compareDay(dateItem, date) === 0);
        if (selectedIndex !== -1) {
          const [unselectedDate] = dates.splice(selectedIndex, 1);
          emit("unselect", cloneDate(unselectedDate));
        } else if (props.maxRange && dates.length >= props.maxRange) {
          Toast(props.rangePrompt || t5("rangePrompt", props.maxRange));
        } else {
          select([...dates, date]);
        }
      } else {
        select(date, true);
      }
    };
    const updateShow = (value) => emit("update:show", value);
    const renderMonth = (date, index) => {
      const showMonthTitle = index !== 0 || !props.showSubtitle;
      return _createVNode33(stdin_default31, _mergeProps10({
        "ref": setMonthRefs(index),
        "date": date,
        "currentDate": currentDate.value,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value
      }, pick(props, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
        "onClick": onClickDay
      }), pick(slots, ["top-info", "bottom-info"]));
    };
    const renderFooterButton = () => {
      if (slots.footer) {
        return slots.footer();
      }
      if (props.showConfirm) {
        const slot = slots["confirm-text"];
        const disabled = buttonDisabled.value;
        const text = disabled ? props.confirmDisabledText : props.confirmText;
        return _createVNode33(Button, {
          "round": true,
          "block": true,
          "type": "danger",
          "color": props.color,
          "class": bem27("confirm"),
          "disabled": disabled,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: () => [slot ? slot({
            disabled
          }) : text || t5("confirm")]
        });
      }
    };
    const renderFooter = () => _createVNode33("div", {
      "class": [bem27("footer"), {
        "van-safe-area-bottom": props.safeAreaInsetBottom
      }]
    }, [renderFooterButton()]);
    const renderCalendar = () => _createVNode33("div", {
      "class": bem27()
    }, [_createVNode33(stdin_default32, {
      "title": props.title,
      "subtitle": subtitle.value,
      "showTitle": props.showTitle,
      "showSubtitle": props.showSubtitle,
      "firstDayOfWeek": dayOffset.value,
      "onClick-subtitle": (event) => emit("click-subtitle", event)
    }, pick(slots, ["title", "subtitle"])), _createVNode33("div", {
      "ref": bodyRef,
      "class": bem27("body"),
      "onScroll": onScroll
    }, [months.value.map(renderMonth)]), renderFooter()]);
    watch15(() => props.show, init);
    watch15(() => [props.type, props.minDate, props.maxDate], () => reset(getInitialDate(currentDate.value)));
    watch15(() => props.defaultDate, (value = null) => {
      currentDate.value = value;
      scrollToCurrentDate();
    });
    useExpose({
      reset,
      scrollToDate,
      getSelectedDate
    });
    onMountedOrActivated(init);
    return () => {
      if (props.poppable) {
        return _createVNode33(Popup, {
          "show": props.show,
          "class": bem27("popup"),
          "round": props.round,
          "position": props.position,
          "closeable": props.showTitle || props.showSubtitle,
          "teleport": props.teleport,
          "closeOnPopstate": props.closeOnPopstate,
          "safeAreaInsetTop": props.safeAreaInsetTop,
          "closeOnClickOverlay": props.closeOnClickOverlay,
          "onUpdate:show": updateShow
        }, {
          default: renderCalendar
        });
      }
      return renderCalendar();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/calendar/index.mjs
var Calendar = withInstall(stdin_default33);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/card/Card.mjs
import { createTextVNode as _createTextVNode2, createVNode as _createVNode35 } from "vue";
import { defineComponent as defineComponent33 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image/Image.mjs
import { withDirectives as _withDirectives4, mergeProps as _mergeProps11, resolveDirective as _resolveDirective, createVNode as _createVNode34 } from "vue";
import { ref as ref25, watch as watch16, computed as computed17, nextTick as nextTick8, onBeforeUnmount as onBeforeUnmount3, defineComponent as defineComponent32, getCurrentInstance as getCurrentInstance7 } from "vue";
var [name31, bem28] = createNamespace("image");
var imageProps = {
  src: String,
  alt: String,
  fit: String,
  position: String,
  round: Boolean,
  block: Boolean,
  width: numericProp,
  height: numericProp,
  radius: numericProp,
  lazyLoad: Boolean,
  iconSize: numericProp,
  showError: truthProp,
  errorIcon: makeStringProp("photo-fail"),
  iconPrefix: String,
  showLoading: truthProp,
  loadingIcon: makeStringProp("photo")
};
var stdin_default34 = defineComponent32({
  name: name31,
  props: imageProps,
  emits: ["load", "error"],
  setup(props, {
    emit,
    slots
  }) {
    const error = ref25(false);
    const loading = ref25(true);
    const imageRef = ref25();
    const {
      $Lazyload
    } = getCurrentInstance7().proxy;
    const style = computed17(() => {
      const style2 = {
        width: addUnit(props.width),
        height: addUnit(props.height)
      };
      if (isDef(props.radius)) {
        style2.overflow = "hidden";
        style2.borderRadius = addUnit(props.radius);
      }
      return style2;
    });
    watch16(() => props.src, () => {
      error.value = false;
      loading.value = true;
    });
    const onLoad = (event) => {
      loading.value = false;
      emit("load", event);
    };
    const onError = (event) => {
      error.value = true;
      loading.value = false;
      emit("error", event);
    };
    const renderIcon = (name210, className, slot) => {
      if (slot) {
        return slot();
      }
      return _createVNode34(Icon, {
        "name": name210,
        "size": props.iconSize,
        "class": className,
        "classPrefix": props.iconPrefix
      }, null);
    };
    const renderPlaceholder = () => {
      if (loading.value && props.showLoading) {
        return _createVNode34("div", {
          "class": bem28("loading")
        }, [renderIcon(props.loadingIcon, bem28("loading-icon"), slots.loading)]);
      }
      if (error.value && props.showError) {
        return _createVNode34("div", {
          "class": bem28("error")
        }, [renderIcon(props.errorIcon, bem28("error-icon"), slots.error)]);
      }
    };
    const renderImage = () => {
      if (error.value || !props.src) {
        return;
      }
      const attrs = {
        alt: props.alt,
        class: bem28("img"),
        style: {
          objectFit: props.fit,
          objectPosition: props.position
        }
      };
      if (props.lazyLoad) {
        return _withDirectives4(_createVNode34("img", _mergeProps11({
          "ref": imageRef
        }, attrs), null), [[_resolveDirective("lazy"), props.src]]);
      }
      return _createVNode34("img", _mergeProps11({
        "src": props.src,
        "onLoad": onLoad,
        "onError": onError
      }, attrs), null);
    };
    const onLazyLoaded = ({
      el
    }) => {
      const check = () => {
        if (el === imageRef.value && loading.value) {
          onLoad();
        }
      };
      if (imageRef.value) {
        check();
      } else {
        nextTick8(check);
      }
    };
    const onLazyLoadError = ({
      el
    }) => {
      if (el === imageRef.value && !error.value) {
        onError();
      }
    };
    if ($Lazyload && inBrowser) {
      $Lazyload.$on("loaded", onLazyLoaded);
      $Lazyload.$on("error", onLazyLoadError);
      onBeforeUnmount3(() => {
        $Lazyload.$off("loaded", onLazyLoaded);
        $Lazyload.$off("error", onLazyLoadError);
      });
    }
    return () => {
      var _a;
      return _createVNode34("div", {
        "class": bem28({
          round: props.round,
          block: props.block
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image/index.mjs
var Image2 = withInstall(stdin_default34);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/card/Card.mjs
var [name32, bem29] = createNamespace("card");
var cardProps = {
  tag: String,
  num: numericProp,
  desc: String,
  thumb: String,
  title: String,
  price: numericProp,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: makeStringProp("¥"),
  thumbLink: String,
  originPrice: numericProp
};
var stdin_default35 = defineComponent33({
  name: name32,
  props: cardProps,
  emits: ["click-thumb"],
  setup(props, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return _createVNode35("div", {
          "class": [bem29("title"), "van-multi-ellipsis--l2"]
        }, [props.title]);
      }
    };
    const renderThumbTag = () => {
      if (slots.tag || props.tag) {
        return _createVNode35("div", {
          "class": bem29("tag")
        }, [slots.tag ? slots.tag() : _createVNode35(Tag, {
          "mark": true,
          "type": "danger"
        }, {
          default: () => [props.tag]
        })]);
      }
    };
    const renderThumbImage = () => {
      if (slots.thumb) {
        return slots.thumb();
      }
      return _createVNode35(Image2, {
        "src": props.thumb,
        "fit": "cover",
        "width": "100%",
        "height": "100%",
        "lazyLoad": props.lazyLoad
      }, null);
    };
    const renderThumb = () => {
      if (slots.thumb || props.thumb) {
        return _createVNode35("a", {
          "href": props.thumbLink,
          "class": bem29("thumb"),
          "onClick": (event) => emit("click-thumb", event)
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };
    const renderDesc = () => {
      if (slots.desc) {
        return slots.desc();
      }
      if (props.desc) {
        return _createVNode35("div", {
          "class": [bem29("desc"), "van-ellipsis"]
        }, [props.desc]);
      }
    };
    const renderPriceText = () => {
      const priceArr = props.price.toString().split(".");
      return _createVNode35("div", null, [_createVNode35("span", {
        "class": bem29("price-currency")
      }, [props.currency]), _createVNode35("span", {
        "class": bem29("price-integer")
      }, [priceArr[0]]), _createTextVNode2("."), _createVNode35("span", {
        "class": bem29("price-decimal")
      }, [priceArr[1]])]);
    };
    return () => {
      var _a, _b, _c;
      const showNum = slots.num || isDef(props.num);
      const showPrice = slots.price || isDef(props.price);
      const showOriginPrice = slots["origin-price"] || isDef(props.originPrice);
      const showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
      const Price = showPrice && _createVNode35("div", {
        "class": bem29("price")
      }, [slots.price ? slots.price() : renderPriceText()]);
      const OriginPrice = showOriginPrice && _createVNode35("div", {
        "class": bem29("origin-price")
      }, [slots["origin-price"] ? slots["origin-price"]() : `${props.currency} ${props.originPrice}`]);
      const Num = showNum && _createVNode35("div", {
        "class": bem29("num")
      }, [slots.num ? slots.num() : `x${props.num}`]);
      const Footer = slots.footer && _createVNode35("div", {
        "class": bem29("footer")
      }, [slots.footer()]);
      const Bottom = showBottom && _createVNode35("div", {
        "class": bem29("bottom")
      }, [(_a = slots["price-top"]) == null ? void 0 : _a.call(slots), Price, OriginPrice, Num, (_b = slots.bottom) == null ? void 0 : _b.call(slots)]);
      return _createVNode35("div", {
        "class": bem29()
      }, [_createVNode35("div", {
        "class": bem29("header")
      }, [renderThumb(), _createVNode35("div", {
        "class": bem29("content", {
          centered: props.centered
        })
      }, [_createVNode35("div", null, [renderTitle(), renderDesc(), (_c = slots.tags) == null ? void 0 : _c.call(slots)]), Bottom])]), Footer]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/card/index.mjs
var Card = withInstall(stdin_default35);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cascader/Cascader.mjs
import { createVNode as _createVNode43 } from "vue";
import { ref as ref31, watch as watch22, nextTick as nextTick13, defineComponent as defineComponent41 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tab/Tab.mjs
import { withDirectives as _withDirectives5, vShow as _vShow4, createVNode as _createVNode42 } from "vue";
import { ref as ref30, watch as watch21, provide as provide5, computed as computed23, nextTick as nextTick12, defineComponent as defineComponent40 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/Tabs.mjs
import { createVNode as _createVNode40, mergeProps as _mergeProps12 } from "vue";
import { ref as ref29, watch as watch20, computed as computed21, reactive as reactive10, nextTick as nextTick10, onActivated as onActivated5, defineComponent as defineComponent38, getCurrentInstance as getCurrentInstance8 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/utils.mjs
function scrollLeftTo(scroller, to, duration) {
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  function animate() {
    scroller.scrollLeft += (to - from) / frames;
    if (++count < frames) {
      raf(animate);
    }
  }
  animate();
}
function scrollTopTo(scroller, to, duration, callback) {
  let current2 = getScrollTop(scroller);
  const isDown = current2 < to;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  const step = (to - current2) / frames;
  function animate() {
    current2 += step;
    if (isDown && current2 > to || !isDown && current2 < to) {
      current2 = to;
    }
    setScrollTop(scroller, current2);
    if (isDown && current2 < to || !isDown && current2 > to) {
      raf(animate);
    } else if (callback) {
      raf(callback);
    }
  }
  animate();
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sticky/Sticky.mjs
import { createVNode as _createVNode36 } from "vue";
import { ref as ref26, watch as watch17, computed as computed18, reactive as reactive8, defineComponent as defineComponent34 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-visibility-change.mjs
import { onDeactivated as onDeactivated5, onBeforeUnmount as onBeforeUnmount4 } from "vue";
function useVisibilityChange(target, onChange) {
  if (!inBrowser || !window.IntersectionObserver) {
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      onChange(entries[0].intersectionRatio > 0);
    },
    { root: document.body }
  );
  const observe = () => {
    if (target.value) {
      observer.observe(target.value);
    }
  };
  const unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };
  onDeactivated5(unobserve);
  onBeforeUnmount4(unobserve);
  onMountedOrActivated(observe);
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sticky/Sticky.mjs
var [name33, bem30] = createNamespace("sticky");
var stickyProps = {
  zIndex: numericProp,
  position: makeStringProp("top"),
  container: Object,
  offsetTop: makeNumericProp(0),
  offsetBottom: makeNumericProp(0)
};
var stdin_default36 = defineComponent34({
  name: name33,
  props: stickyProps,
  emits: ["scroll", "change"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref26();
    const scrollParent = useScrollParent(root);
    const state = reactive8({
      fixed: false,
      width: 0,
      height: 0,
      transform: 0
    });
    const offset2 = computed18(() => unitToPx(props.position === "top" ? props.offsetTop : props.offsetBottom));
    const rootStyle = computed18(() => {
      const {
        fixed,
        height: height2,
        width: width2
      } = state;
      if (fixed) {
        return {
          width: `${width2}px`,
          height: `${height2}px`
        };
      }
    });
    const stickyStyle = computed18(() => {
      if (!state.fixed) {
        return;
      }
      const style = extend(getZIndexStyle(props.zIndex), {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props.position]: `${offset2.value}px`
      });
      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`;
      }
      return style;
    });
    const emitScroll = (scrollTop) => emit("scroll", {
      scrollTop,
      isFixed: state.fixed
    });
    const onScroll = () => {
      if (!root.value || isHidden(root)) {
        return;
      }
      const {
        container,
        position
      } = props;
      const rootRect = useRect(root);
      const scrollTop = getScrollTop(window);
      state.width = rootRect.width;
      state.height = rootRect.height;
      if (position === "top") {
        if (container) {
          const containerRect = useRect(container);
          const difference = containerRect.bottom - offset2.value - state.height;
          state.fixed = offset2.value > rootRect.top && containerRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offset2.value > rootRect.top;
        }
      } else {
        const {
          clientHeight
        } = document.documentElement;
        if (container) {
          const containerRect = useRect(container);
          const difference = clientHeight - containerRect.top - offset2.value - state.height;
          state.fixed = clientHeight - offset2.value < rootRect.bottom && clientHeight > containerRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          state.fixed = clientHeight - offset2.value < rootRect.bottom;
        }
      }
      emitScroll(scrollTop);
    };
    watch17(() => state.fixed, (value) => emit("change", value));
    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    useVisibilityChange(root, onScroll);
    return () => {
      var _a;
      return _createVNode36("div", {
        "ref": root,
        "style": rootStyle.value
      }, [_createVNode36("div", {
        "class": bem30({
          fixed: state.fixed
        }),
        "style": stickyStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sticky/index.mjs
var Sticky = withInstall(stdin_default36);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/TabsTitle.mjs
import { createVNode as _createVNode37 } from "vue";
import { computed as computed19, defineComponent as defineComponent35 } from "vue";
var [name34, bem31] = createNamespace("tab");
var stdin_default37 = defineComponent35({
  name: name34,
  props: {
    id: String,
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: numericProp,
    shrink: Boolean,
    isActive: Boolean,
    disabled: Boolean,
    controls: String,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    showZeroBadge: truthProp
  },
  setup(props, {
    slots
  }) {
    const style = computed19(() => {
      const style2 = {};
      const {
        type,
        color,
        disabled,
        isActive,
        activeColor,
        inactiveColor
      } = props;
      const isCard = type === "card";
      if (color && isCard) {
        style2.borderColor = color;
        if (!disabled) {
          if (isActive) {
            style2.backgroundColor = color;
          } else {
            style2.color = color;
          }
        }
      }
      const titleColor = isActive ? activeColor : inactiveColor;
      if (titleColor) {
        style2.color = titleColor;
      }
      return style2;
    });
    const renderText = () => {
      const Text2 = _createVNode37("span", {
        "class": bem31("text", {
          ellipsis: !props.scrollable
        })
      }, [slots.title ? slots.title() : props.title]);
      if (props.dot || isDef(props.badge) && props.badge !== "") {
        return _createVNode37(Badge, {
          "dot": props.dot,
          "content": props.badge,
          "showZero": props.showZeroBadge
        }, {
          default: () => [Text2]
        });
      }
      return Text2;
    };
    return () => _createVNode37("div", {
      "id": props.id,
      "role": "tab",
      "class": [bem31([props.type, {
        grow: props.scrollable && !props.shrink,
        shrink: props.shrink,
        active: props.isActive,
        disabled: props.disabled
      }])],
      "style": style.value,
      "tabindex": props.disabled ? void 0 : props.isActive ? 0 : -1,
      "aria-selected": props.isActive,
      "aria-disabled": props.disabled || void 0,
      "aria-controls": props.controls
    }, [renderText()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/TabsContent.mjs
import { createVNode as _createVNode39 } from "vue";
import { ref as ref28, watch as watch19, onMounted as onMounted9, defineComponent as defineComponent37 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/swipe/Swipe.mjs
import { createVNode as _createVNode38 } from "vue";
import { ref as ref27, watch as watch18, reactive as reactive9, computed as computed20, onMounted as onMounted8, onActivated as onActivated4, onDeactivated as onDeactivated6, onBeforeUnmount as onBeforeUnmount5, defineComponent as defineComponent36, nextTick as nextTick9 } from "vue";
var [name35, bem32] = createNamespace("swipe");
var swipeProps = {
  loop: truthProp,
  width: numericProp,
  height: numericProp,
  vertical: Boolean,
  autoplay: makeNumericProp(0),
  duration: makeNumericProp(500),
  touchable: truthProp,
  lazyRender: Boolean,
  initialSwipe: makeNumericProp(0),
  indicatorColor: String,
  showIndicators: truthProp,
  stopPropagation: truthProp
};
var SWIPE_KEY = Symbol(name35);
var stdin_default38 = defineComponent36({
  name: name35,
  props: swipeProps,
  emits: ["change"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref27();
    const track = ref27();
    const state = reactive9({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false
    });
    const touch = useTouch();
    const {
      children,
      linkChildren
    } = useChildren(SWIPE_KEY);
    const count = computed20(() => children.length);
    const size = computed20(() => state[props.vertical ? "height" : "width"]);
    const delta = computed20(() => props.vertical ? touch.deltaY.value : touch.deltaX.value);
    const minOffset = computed20(() => {
      if (state.rect) {
        const base = props.vertical ? state.rect.height : state.rect.width;
        return base - size.value * count.value;
      }
      return 0;
    });
    const maxCount = computed20(() => Math.ceil(Math.abs(minOffset.value) / size.value));
    const trackSize = computed20(() => count.value * size.value);
    const activeIndicator = computed20(() => (state.active + count.value) % count.value);
    const isCorrectDirection = computed20(() => {
      const expect = props.vertical ? "vertical" : "horizontal";
      return touch.direction.value === expect;
    });
    const trackStyle = computed20(() => {
      const style = {
        transitionDuration: `${state.swiping ? 0 : props.duration}ms`,
        transform: `translate${props.vertical ? "Y" : "X"}(${state.offset}px)`
      };
      if (size.value) {
        const mainAxis = props.vertical ? "height" : "width";
        const crossAxis = props.vertical ? "width" : "height";
        style[mainAxis] = `${trackSize.value}px`;
        style[crossAxis] = props[crossAxis] ? `${props[crossAxis]}px` : "";
      }
      return style;
    });
    const getTargetActive = (pace) => {
      const {
        active
      } = state;
      if (pace) {
        if (props.loop) {
          return clamp(active + pace, -1, count.value);
        }
        return clamp(active + pace, 0, maxCount.value);
      }
      return active;
    };
    const getTargetOffset = (targetActive, offset2 = 0) => {
      let currentPosition = targetActive * size.value;
      if (!props.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value);
      }
      let targetOffset = offset2 - currentPosition;
      if (!props.loop) {
        targetOffset = clamp(targetOffset, minOffset.value, 0);
      }
      return targetOffset;
    };
    const move = ({
      pace = 0,
      offset: offset2 = 0,
      emitChange
    }) => {
      if (count.value <= 1) {
        return;
      }
      const {
        active
      } = state;
      const targetActive = getTargetActive(pace);
      const targetOffset = getTargetOffset(targetActive, offset2);
      if (props.loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          const outRightBound = targetOffset < minOffset.value;
          children[0].setOffset(outRightBound ? trackSize.value : 0);
        }
        if (children[count.value - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0;
          children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
        }
      }
      state.active = targetActive;
      state.offset = targetOffset;
      if (emitChange && targetActive !== active) {
        emit("change", activeIndicator.value);
      }
    };
    const correctPosition = () => {
      state.swiping = true;
      if (state.active <= -1) {
        move({
          pace: count.value
        });
      } else if (state.active >= count.value) {
        move({
          pace: -count.value
        });
      }
    };
    const prev = () => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true
        });
      });
    };
    const next = () => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true
        });
      });
    };
    let autoplayTimer;
    const stopAutoplay = () => clearTimeout(autoplayTimer);
    const autoplay = () => {
      stopAutoplay();
      if (props.autoplay > 0 && count.value > 1) {
        autoplayTimer = setTimeout(() => {
          next();
          autoplay();
        }, +props.autoplay);
      }
    };
    const initialize = (active = +props.initialSwipe) => {
      if (!root.value) {
        return;
      }
      const cb = () => {
        var _a, _b;
        if (!isHidden(root)) {
          const rect = {
            width: root.value.offsetWidth,
            height: root.value.offsetHeight
          };
          state.rect = rect;
          state.width = +((_a = props.width) != null ? _a : rect.width);
          state.height = +((_b = props.height) != null ? _b : rect.height);
        }
        if (count.value) {
          active = Math.min(count.value - 1, active);
        }
        state.active = active;
        state.swiping = true;
        state.offset = getTargetOffset(active);
        children.forEach((swipe) => {
          swipe.setOffset(0);
        });
        autoplay();
      };
      if (isHidden(root)) {
        nextTick9().then(cb);
      } else {
        cb();
      }
    };
    const resize = () => initialize(state.active);
    let touchStartTime;
    const onTouchStart = (event) => {
      if (!props.touchable)
        return;
      touch.start(event);
      touchStartTime = Date.now();
      stopAutoplay();
      correctPosition();
    };
    const onTouchMove = (event) => {
      if (props.touchable && state.swiping) {
        touch.move(event);
        if (isCorrectDirection.value) {
          const isEdgeTouch = !props.loop && (state.active === 0 && delta.value > 0 || state.active === count.value - 1 && delta.value < 0);
          if (!isEdgeTouch) {
            preventDefault(event, props.stopPropagation);
            move({
              offset: delta.value
            });
          }
        }
      }
    };
    const onTouchEnd = () => {
      if (!props.touchable || !state.swiping) {
        return;
      }
      const duration = Date.now() - touchStartTime;
      const speed = delta.value / duration;
      const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;
      if (shouldSwipe && isCorrectDirection.value) {
        const offset2 = props.vertical ? touch.offsetY.value : touch.offsetX.value;
        let pace = 0;
        if (props.loop) {
          pace = offset2 > 0 ? delta.value > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta.value > 0 ? "ceil" : "floor"](delta.value / size.value);
        }
        move({
          pace,
          emitChange: true
        });
      } else if (delta.value) {
        move({
          pace: 0
        });
      }
      state.swiping = false;
      autoplay();
    };
    const swipeTo = (index, options = {}) => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        let targetIndex;
        if (props.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }
        if (options.immediate) {
          doubleRaf(() => {
            state.swiping = false;
          });
        } else {
          state.swiping = false;
        }
        move({
          pace: targetIndex - state.active,
          emitChange: true
        });
      });
    };
    const renderDot = (_, index) => {
      const active = index === activeIndicator.value;
      const style = active ? {
        backgroundColor: props.indicatorColor
      } : void 0;
      return _createVNode38("i", {
        "style": style,
        "class": bem32("indicator", {
          active
        })
      }, null);
    };
    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator({
          active: activeIndicator.value,
          total: count.value
        });
      }
      if (props.showIndicators && count.value > 1) {
        return _createVNode38("div", {
          "class": bem32("indicators", {
            vertical: props.vertical
          })
        }, [Array(count.value).fill("").map(renderDot)]);
      }
    };
    useExpose({
      prev,
      next,
      state,
      resize,
      swipeTo
    });
    linkChildren({
      size,
      props,
      count,
      activeIndicator
    });
    watch18(() => props.initialSwipe, (value) => initialize(+value));
    watch18(count, () => initialize(state.active));
    watch18(() => props.autoplay, autoplay);
    watch18([windowWidth, windowHeight], resize);
    watch18(usePageVisibility(), (visible) => {
      if (visible === "visible") {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    onMounted8(initialize);
    onActivated4(() => initialize(state.active));
    onPopupReopen(() => initialize(state.active));
    onDeactivated6(stopAutoplay);
    onBeforeUnmount5(stopAutoplay);
    useEventListener("touchmove", onTouchMove, {
      target: track
    });
    return () => {
      var _a;
      return _createVNode38("div", {
        "ref": root,
        "class": bem32()
      }, [_createVNode38("div", {
        "ref": track,
        "style": trackStyle.value,
        "class": bem32("track", {
          vertical: props.vertical
        }),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), renderIndicator()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/swipe/index.mjs
var Swipe = withInstall(stdin_default38);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/TabsContent.mjs
var [name36, bem33] = createNamespace("tabs");
var stdin_default39 = defineComponent37({
  name: name36,
  props: {
    count: makeRequiredProp(Number),
    inited: Boolean,
    animated: Boolean,
    duration: makeRequiredProp(numericProp),
    swipeable: Boolean,
    lazyRender: Boolean,
    currentIndex: makeRequiredProp(Number)
  },
  emits: ["change"],
  setup(props, {
    emit,
    slots
  }) {
    const swipeRef = ref28();
    const onChange = (index) => emit("change", index);
    const renderChildren = () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (props.animated || props.swipeable) {
        return _createVNode39(Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": bem33("track"),
          "duration": +props.duration * 1e3,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
    const swipeToCurrentTab = (index) => {
      const swipe = swipeRef.value;
      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };
    watch19(() => props.currentIndex, swipeToCurrentTab);
    onMounted9(() => {
      swipeToCurrentTab(props.currentIndex);
    });
    useExpose({
      swipeRef
    });
    return () => _createVNode39("div", {
      "class": bem33("content", {
        animated: props.animated || props.swipeable
      })
    }, [renderChildren()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/Tabs.mjs
var [name37, bem34] = createNamespace("tabs");
var tabsProps = {
  type: makeStringProp("line"),
  color: String,
  border: Boolean,
  sticky: Boolean,
  shrink: Boolean,
  active: makeNumericProp(0),
  duration: makeNumericProp(0.3),
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  background: String,
  lazyRender: truthProp,
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String
};
var TABS_KEY = Symbol(name37);
var stdin_default40 = defineComponent38({
  name: name37,
  props: tabsProps,
  emits: ["click", "change", "scroll", "disabled", "rendered", "click-tab", "update:active"],
  setup(props, {
    emit,
    slots
  }) {
    var _a, _b;
    if (true) {
      const props2 = (_b = (_a = getCurrentInstance8()) == null ? void 0 : _a.vnode) == null ? void 0 : _b.props;
      if (props2 && "onClick" in props2) {
        console.warn('[Vant] Tabs: "click" event is deprecated, using "click-tab" instead.');
      }
      if (props2 && "onDisabled" in props2) {
        console.warn('[Vant] Tabs: "disabled" event is deprecated, using "click-tab" instead.');
      }
    }
    let tabHeight;
    let lockScroll;
    let stickyFixed;
    const root = ref29();
    const navRef = ref29();
    const wrapRef = ref29();
    const contentRef = ref29();
    const id = useId();
    const scroller = useScrollParent(root);
    const [titleRefs, setTitleRefs] = useRefs();
    const {
      children,
      linkChildren
    } = useChildren(TABS_KEY);
    const state = reactive10({
      inited: false,
      position: "",
      lineStyle: {},
      currentIndex: -1
    });
    const scrollable = computed21(() => children.length > props.swipeThreshold || !props.ellipsis || props.shrink);
    const navStyle = computed21(() => ({
      borderColor: props.color,
      background: props.background
    }));
    const getTabName = (tab, index) => {
      var _a2;
      return (_a2 = tab.name) != null ? _a2 : index;
    };
    const currentName = computed21(() => {
      const activeTab = children[state.currentIndex];
      if (activeTab) {
        return getTabName(activeTab, state.currentIndex);
      }
    });
    const offsetTopPx = computed21(() => unitToPx(props.offsetTop));
    const scrollOffset = computed21(() => {
      if (props.sticky) {
        return offsetTopPx.value + tabHeight;
      }
      return 0;
    });
    const scrollIntoView = (immediate) => {
      const nav = navRef.value;
      const titles = titleRefs.value;
      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return;
      }
      const title = titles[state.currentIndex].$el;
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
    };
    const setLine = () => {
      const shouldAnimate = state.inited;
      nextTick10(() => {
        const titles = titleRefs.value;
        if (!titles || !titles[state.currentIndex] || props.type !== "line" || isHidden(root.value)) {
          return;
        }
        const title = titles[state.currentIndex].$el;
        const {
          lineWidth,
          lineHeight
        } = props;
        const left2 = title.offsetLeft + title.offsetWidth / 2;
        const lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: props.color,
          transform: `translateX(${left2}px) translateX(-50%)`
        };
        if (shouldAnimate) {
          lineStyle.transitionDuration = `${props.duration}s`;
        }
        if (isDef(lineHeight)) {
          const height2 = addUnit(lineHeight);
          lineStyle.height = height2;
          lineStyle.borderRadius = height2;
        }
        state.lineStyle = lineStyle;
      });
    };
    const findAvailableTab = (index) => {
      const diff = index < state.currentIndex ? -1 : 1;
      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index;
        }
        index += diff;
      }
    };
    const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
      const newIndex = findAvailableTab(currentIndex);
      if (!isDef(newIndex)) {
        return;
      }
      const newTab = children[newIndex];
      const newName = getTabName(newTab, newIndex);
      const shouldEmitChange = state.currentIndex !== null;
      if (state.currentIndex !== newIndex) {
        state.currentIndex = newIndex;
        if (!skipScrollIntoView) {
          scrollIntoView();
        }
        setLine();
      }
      if (newName !== props.active) {
        emit("update:active", newName);
        if (shouldEmitChange) {
          emit("change", newName, newTab.title);
        }
      }
      if (stickyFixed && !props.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
      }
    };
    const setCurrentIndexByName = (name210, skipScrollIntoView) => {
      const matched = children.find((tab, index2) => getTabName(tab, index2) === name210);
      const index = matched ? children.indexOf(matched) : 0;
      setCurrentIndex(index, skipScrollIntoView);
    };
    const scrollToCurrentContent = (immediate = false) => {
      if (props.scrollspy) {
        const target = children[state.currentIndex].$el;
        if (target && scroller.value) {
          const to = getElementTop(target, scroller.value) - scrollOffset.value;
          lockScroll = true;
          scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, () => {
            lockScroll = false;
          });
        }
      }
    };
    const onClickTab = (item, index, event) => {
      const {
        title,
        disabled
      } = children[index];
      const name210 = getTabName(children[index], index);
      if (disabled) {
        emit("disabled", name210, title);
      } else {
        callInterceptor(props.beforeChange, {
          args: [name210],
          done: () => {
            setCurrentIndex(index);
            scrollToCurrentContent();
          }
        });
        emit("click", name210, title);
        route(item);
      }
      emit("click-tab", {
        name: name210,
        title,
        event,
        disabled
      });
    };
    const onStickyScroll = (params) => {
      stickyFixed = params.isFixed;
      emit("scroll", params);
    };
    const scrollTo = (name210) => {
      nextTick10(() => {
        setCurrentIndexByName(name210);
        scrollToCurrentContent(true);
      });
    };
    const getCurrentIndexOnScroll = () => {
      for (let index = 0; index < children.length; index++) {
        const {
          top: top2
        } = useRect(children[index].$el);
        if (top2 > scrollOffset.value) {
          return index === 0 ? 0 : index - 1;
        }
      }
      return children.length - 1;
    };
    const onScroll = () => {
      if (props.scrollspy && !lockScroll) {
        const index = getCurrentIndexOnScroll();
        setCurrentIndex(index);
      }
    };
    const renderNav = () => children.map((item, index) => _createVNode40(stdin_default37, _mergeProps12({
      "key": item.id,
      "id": `${id}-${index}`,
      "ref": setTitleRefs(index),
      "type": props.type,
      "color": props.color,
      "style": item.titleStyle,
      "class": item.titleClass,
      "shrink": props.shrink,
      "isActive": index === state.currentIndex,
      "controls": item.id,
      "scrollable": scrollable.value,
      "activeColor": props.titleActiveColor,
      "inactiveColor": props.titleInactiveColor,
      "onClick": (event) => onClickTab(item, index, event)
    }, pick(item, ["dot", "badge", "title", "disabled", "showZeroBadge"])), {
      title: item.$slots.title
    }));
    const renderLine = () => {
      if (props.type === "line" && children.length) {
        return _createVNode40("div", {
          "class": bem34("line"),
          "style": state.lineStyle
        }, null);
      }
    };
    const renderHeader = () => {
      var _a2, _b2, _c;
      const {
        type,
        border,
        sticky
      } = props;
      const Header = [_createVNode40("div", {
        "ref": sticky ? void 0 : wrapRef,
        "class": [bem34("wrap"), {
          [BORDER_TOP_BOTTOM]: type === "line" && border
        }]
      }, [_createVNode40("div", {
        "ref": navRef,
        "role": "tablist",
        "class": bem34("nav", [type, {
          shrink: props.shrink,
          complete: scrollable.value
        }]),
        "style": navStyle.value,
        "aria-orientation": "horizontal"
      }, [(_a2 = slots["nav-left"]) == null ? void 0 : _a2.call(slots), renderNav(), renderLine(), (_b2 = slots["nav-right"]) == null ? void 0 : _b2.call(slots)])]), (_c = slots["nav-bottom"]) == null ? void 0 : _c.call(slots)];
      if (sticky) {
        return _createVNode40("div", {
          "ref": wrapRef
        }, [Header]);
      }
      return Header;
    };
    watch20([() => props.color, windowWidth], setLine);
    watch20(() => props.active, (value) => {
      if (value !== currentName.value) {
        setCurrentIndexByName(value);
      }
    });
    watch20(() => children.length, () => {
      if (state.inited) {
        setCurrentIndexByName(props.active);
        setLine();
        nextTick10(() => {
          scrollIntoView(true);
        });
      }
    });
    const init = () => {
      setCurrentIndexByName(props.active, true);
      nextTick10(() => {
        state.inited = true;
        if (wrapRef.value) {
          tabHeight = useRect(wrapRef.value).height;
        }
        scrollIntoView(true);
      });
    };
    const onRendered = (name210, title) => emit("rendered", name210, title);
    const resize = () => {
      setLine();
      nextTick10(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = contentRef.value) == null ? void 0 : _a2.swipeRef.value) == null ? void 0 : _b2.resize();
      });
    };
    useExpose({
      resize,
      scrollTo
    });
    onActivated5(setLine);
    onPopupReopen(setLine);
    onMountedOrActivated(init);
    useEventListener("scroll", onScroll, {
      target: scroller,
      passive: true
    });
    linkChildren({
      id,
      props,
      setLine,
      onRendered,
      currentName,
      scrollIntoView
    });
    return () => _createVNode40("div", {
      "ref": root,
      "class": bem34([props.type])
    }, [props.sticky ? _createVNode40(Sticky, {
      "container": root.value,
      "offsetTop": offsetTopPx.value,
      "onScroll": onStickyScroll
    }, {
      default: () => [renderHeader()]
    }) : renderHeader(), _createVNode40(stdin_default39, {
      "ref": contentRef,
      "count": children.length,
      "inited": state.inited,
      "animated": props.animated,
      "duration": props.duration,
      "swipeable": props.swipeable,
      "lazyRender": props.lazyRender,
      "currentIndex": state.currentIndex,
      "onChange": setCurrentIndex
    }, {
      default: () => {
        var _a2;
        return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
      }
    })]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/composables/use-tab-status.mjs
import { inject as inject5 } from "vue";
var TAB_STATUS_KEY = Symbol();
var useTabStatus = () => inject5(TAB_STATUS_KEY, null);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/swipe-item/SwipeItem.mjs
import { createVNode as _createVNode41 } from "vue";
import { computed as computed22, nextTick as nextTick11, reactive as reactive11, onMounted as onMounted10, defineComponent as defineComponent39 } from "vue";
var [name38, bem35] = createNamespace("swipe-item");
var stdin_default41 = defineComponent39({
  name: name38,
  setup(props, {
    slots
  }) {
    let rendered;
    const state = reactive11({
      offset: 0,
      inited: false,
      mounted: false
    });
    const {
      parent,
      index
    } = useParent(SWIPE_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <SwipeItem> must be a child component of <Swipe>.");
      }
      return;
    }
    const style = computed22(() => {
      const style2 = {};
      const {
        vertical
      } = parent.props;
      if (parent.size.value) {
        style2[vertical ? "height" : "width"] = `${parent.size.value}px`;
      }
      if (state.offset) {
        style2.transform = `translate${vertical ? "Y" : "X"}(${state.offset}px)`;
      }
      return style2;
    });
    const shouldRender = computed22(() => {
      const {
        loop,
        lazyRender
      } = parent.props;
      if (!lazyRender || rendered) {
        return true;
      }
      if (!state.mounted) {
        return false;
      }
      const active = parent.activeIndicator.value;
      const maxActive = parent.count.value - 1;
      const prevActive = active === 0 && loop ? maxActive : active - 1;
      const nextActive = active === maxActive && loop ? 0 : active + 1;
      rendered = index.value === active || index.value === prevActive || index.value === nextActive;
      return rendered;
    });
    const setOffset = (offset2) => {
      state.offset = offset2;
    };
    onMounted10(() => {
      nextTick11(() => {
        state.mounted = true;
      });
    });
    useExpose({
      setOffset
    });
    return () => {
      var _a;
      return _createVNode41("div", {
        "class": bem35(),
        "style": style.value
      }, [shouldRender.value ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/swipe-item/index.mjs
var SwipeItem = withInstall(stdin_default41);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tab/Tab.mjs
var [name39, bem36] = createNamespace("tab");
var tabProps = extend({}, routeProps, {
  dot: Boolean,
  name: numericProp,
  badge: numericProp,
  title: String,
  disabled: Boolean,
  titleClass: unknownProp,
  titleStyle: [String, Object],
  showZeroBadge: truthProp
});
var stdin_default42 = defineComponent40({
  name: name39,
  props: tabProps,
  setup(props, {
    slots
  }) {
    const id = useId();
    const inited = ref30(false);
    const {
      parent,
      index
    } = useParent(TABS_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <Tab> must be a child component of <Tabs>.");
      }
      return;
    }
    const getName = () => {
      var _a;
      return (_a = props.name) != null ? _a : index.value;
    };
    const init = () => {
      inited.value = true;
      if (parent.props.lazyRender) {
        nextTick12(() => {
          parent.onRendered(getName(), props.title);
        });
      }
    };
    const active = computed23(() => {
      const isActive = getName() === parent.currentName.value;
      if (isActive && !inited.value) {
        init();
      }
      return isActive;
    });
    const hasInactiveClass = ref30(!active.value);
    watch21(active, (val) => {
      if (val) {
        hasInactiveClass.value = false;
      } else {
        doubleRaf(() => {
          hasInactiveClass.value = true;
        });
      }
    });
    watch21(() => props.title, () => {
      parent.setLine();
      parent.scrollIntoView();
    });
    provide5(TAB_STATUS_KEY, active);
    return () => {
      var _a;
      const label = `${parent.id}-${index.value}`;
      const {
        animated,
        swipeable,
        scrollspy,
        lazyRender
      } = parent.props;
      if (!slots.default && !animated) {
        return;
      }
      const show = scrollspy || active.value;
      if (animated || swipeable) {
        return _createVNode42(SwipeItem, {
          "id": id,
          "role": "tabpanel",
          "class": bem36("panel-wrapper", {
            inactive: hasInactiveClass.value
          }),
          "tabindex": active.value ? 0 : -1,
          "aria-hidden": !active.value,
          "aria-labelledby": label
        }, {
          default: () => {
            var _a2;
            return [_createVNode42("div", {
              "class": bem36("panel")
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
          }
        });
      }
      const shouldRender = inited.value || scrollspy || !lazyRender;
      const Content = shouldRender ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null;
      useExpose({
        id
      });
      return _withDirectives5(_createVNode42("div", {
        "id": id,
        "role": "tabpanel",
        "class": bem36("panel"),
        "tabindex": show ? 0 : -1,
        "aria-labelledby": label
      }, [Content]), [[_vShow4, show]]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tab/index.mjs
var Tab = withInstall(stdin_default42);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabs/index.mjs
var Tabs = withInstall(stdin_default40);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cascader/Cascader.mjs
var [name40, bem37, t6] = createNamespace("cascader");
var cascaderProps = {
  title: String,
  options: makeArrayProp(),
  closeable: truthProp,
  swipeable: truthProp,
  closeIcon: makeStringProp("cross"),
  showHeader: truthProp,
  modelValue: numericProp,
  fieldNames: Object,
  placeholder: String,
  activeColor: String
};
var stdin_default43 = defineComponent41({
  name: name40,
  props: cascaderProps,
  emits: ["close", "change", "finish", "click-tab", "update:modelValue"],
  setup(props, {
    slots,
    emit
  }) {
    const tabs = ref31([]);
    const activeTab = ref31(0);
    const {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = extend({
      text: "text",
      value: "value",
      children: "children"
    }, props.fieldNames);
    const getSelectedOptionsByValue = (options, value) => {
      for (const option of options) {
        if (option[valueKey] === value) {
          return [option];
        }
        if (option[childrenKey]) {
          const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    };
    const updateTabs = () => {
      const {
        options,
        modelValue
      } = props;
      if (modelValue !== void 0) {
        const selectedOptions = getSelectedOptionsByValue(options, modelValue);
        if (selectedOptions) {
          let optionsCursor = options;
          tabs.value = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selected: option
            };
            const next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
            if (next) {
              optionsCursor = next[childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            tabs.value.push({
              options: optionsCursor,
              selected: null
            });
          }
          nextTick13(() => {
            activeTab.value = tabs.value.length - 1;
          });
          return;
        }
      }
      tabs.value = [{
        options,
        selected: null
      }];
    };
    const onSelect = (option, tabIndex) => {
      if (option.disabled) {
        return;
      }
      tabs.value[tabIndex].selected = option;
      if (tabs.value.length > tabIndex + 1) {
        tabs.value = tabs.value.slice(0, tabIndex + 1);
      }
      if (option[childrenKey]) {
        const nextTab = {
          options: option[childrenKey],
          selected: null
        };
        if (tabs.value[tabIndex + 1]) {
          tabs.value[tabIndex + 1] = nextTab;
        } else {
          tabs.value.push(nextTab);
        }
        nextTick13(() => {
          activeTab.value++;
        });
      }
      const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);
      emit("update:modelValue", option[valueKey]);
      const params = {
        value: option[valueKey],
        tabIndex,
        selectedOptions
      };
      emit("change", params);
      if (!option[childrenKey]) {
        emit("finish", params);
      }
    };
    const onClose = () => emit("close");
    const onClickTab = ({
      name: name210,
      title
    }) => emit("click-tab", name210, title);
    const renderHeader = () => props.showHeader ? _createVNode43("div", {
      "class": bem37("header")
    }, [_createVNode43("h2", {
      "class": bem37("title")
    }, [slots.title ? slots.title() : props.title]), props.closeable ? _createVNode43(Icon, {
      "name": props.closeIcon,
      "class": [bem37("close-icon"), HAPTICS_FEEDBACK],
      "onClick": onClose
    }, null) : null]) : null;
    const renderOption = (option, selectedOption, tabIndex) => {
      const {
        disabled
      } = option;
      const selected = !!(selectedOption && option[valueKey] === selectedOption[valueKey]);
      const color = option.color || (selected ? props.activeColor : void 0);
      const Text2 = slots.option ? slots.option({
        option,
        selected
      }) : _createVNode43("span", null, [option[textKey]]);
      return _createVNode43("li", {
        "role": "menuitemradio",
        "class": [bem37("option", {
          selected,
          disabled
        }), option.className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : selected ? 0 : -1,
        "aria-checked": selected,
        "aria-disabled": disabled || void 0,
        "onClick": () => onSelect(option, tabIndex)
      }, [Text2, selected ? _createVNode43(Icon, {
        "name": "success",
        "class": bem37("selected-icon")
      }, null) : null]);
    };
    const renderOptions = (options, selectedOption, tabIndex) => _createVNode43("ul", {
      "role": "menu",
      "class": bem37("options")
    }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
    const renderTab = (tab, tabIndex) => {
      const {
        options,
        selected
      } = tab;
      const placeholder = props.placeholder || t6("select");
      const title = selected ? selected[textKey] : placeholder;
      return _createVNode43(Tab, {
        "title": title,
        "titleClass": bem37("tab", {
          unselected: !selected
        })
      }, {
        default: () => {
          var _a, _b;
          return [(_a = slots["options-top"]) == null ? void 0 : _a.call(slots, {
            tabIndex
          }), renderOptions(options, selected, tabIndex), (_b = slots["options-bottom"]) == null ? void 0 : _b.call(slots, {
            tabIndex
          })];
        }
      });
    };
    const renderTabs = () => _createVNode43(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "shrink": true,
      "animated": true,
      "class": bem37("tabs"),
      "color": props.activeColor,
      "swipeable": props.swipeable,
      "onClick-tab": onClickTab
    }, {
      default: () => [tabs.value.map(renderTab)]
    });
    updateTabs();
    watch22(() => props.options, updateTabs, {
      deep: true
    });
    watch22(() => props.modelValue, (value) => {
      if (value !== void 0) {
        const values = tabs.value.map((tab) => {
          var _a;
          return (_a = tab.selected) == null ? void 0 : _a[valueKey];
        });
        if (values.includes(value)) {
          return;
        }
      }
      updateTabs();
    });
    return () => _createVNode43("div", {
      "class": bem37()
    }, [renderHeader(), renderTabs()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cascader/index.mjs
var Cascader = withInstall(stdin_default43);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cell-group/CellGroup.mjs
import { Fragment as _Fragment3, createVNode as _createVNode44, mergeProps as _mergeProps13 } from "vue";
import { defineComponent as defineComponent42 } from "vue";
var [name41, bem38] = createNamespace("cell-group");
var cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp
};
var stdin_default44 = defineComponent42({
  name: name41,
  inheritAttrs: false,
  props: cellGroupProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderGroup = () => {
      var _a;
      return _createVNode44("div", _mergeProps13({
        "class": [bem38({
          inset: props.inset
        }), {
          [BORDER_TOP_BOTTOM]: props.border && !props.inset
        }]
      }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const renderTitle = () => _createVNode44("div", {
      "class": bem38("title", {
        inset: props.inset
      })
    }, [slots.title ? slots.title() : props.title]);
    return () => {
      if (props.title || slots.title) {
        return _createVNode44(_Fragment3, null, [renderTitle(), renderGroup()]);
      }
      return renderGroup();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/cell-group/index.mjs
var CellGroup = withInstall(stdin_default44);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/checkbox/Checkbox.mjs
import { createVNode as _createVNode46, mergeProps as _mergeProps14 } from "vue";
import { watch as watch24, computed as computed24, defineComponent as defineComponent44 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/checkbox-group/CheckboxGroup.mjs
import { createVNode as _createVNode45 } from "vue";
import { watch as watch23, defineComponent as defineComponent43 } from "vue";
var [name42, bem39] = createNamespace("checkbox-group");
var checkboxGroupProps = {
  max: numericProp,
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: makeArrayProp(),
  checkedColor: String
};
var CHECKBOX_GROUP_KEY = Symbol(name42);
var stdin_default45 = defineComponent43({
  name: name42,
  props: checkboxGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(CHECKBOX_GROUP_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    const toggleAll = (options = {}) => {
      if (typeof options === "boolean") {
        options = {
          checked: options
        };
      }
      const {
        checked,
        skipDisabled
      } = options;
      const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }
        return checked != null ? checked : !item.checked.value;
      });
      const names = checkedChildren.map((item) => item.name);
      updateValue(names);
    };
    watch23(() => props.modelValue, (value) => emit("change", value));
    useExpose({
      toggleAll
    });
    useCustomFieldValue(() => props.modelValue);
    linkChildren({
      props,
      updateValue
    });
    return () => {
      var _a;
      return _createVNode45("div", {
        "class": bem39([props.direction])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/checkbox/Checkbox.mjs
var [name43, bem40] = createNamespace("checkbox");
var checkboxProps = extend({}, checkerProps, {
  bindGroup: truthProp
});
var stdin_default46 = defineComponent44({
  name: name43,
  props: checkboxProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(CHECKBOX_GROUP_KEY);
    const setParentValue = (checked2) => {
      const {
        name: name210
      } = props;
      const {
        max,
        modelValue
      } = parent.props;
      const value = modelValue.slice();
      if (checked2) {
        const overlimit = max && value.length >= max;
        if (!overlimit && !value.includes(name210)) {
          value.push(name210);
          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      } else {
        const index = value.indexOf(name210);
        if (index !== -1) {
          value.splice(index, 1);
          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      }
    };
    const checked = computed24(() => {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }
      return !!props.modelValue;
    });
    const toggle = (newValue = !checked.value) => {
      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit("update:modelValue", newValue);
      }
    };
    watch24(() => props.modelValue, (value) => emit("change", value));
    useExpose({
      toggle,
      props,
      checked
    });
    useCustomFieldValue(() => props.modelValue);
    return () => _createVNode46(stdin_default26, _mergeProps14({
      "bem": bem40,
      "role": "checkbox",
      "parent": parent,
      "checked": checked.value,
      "onToggle": toggle
    }, props), pick(slots, ["default", "icon"]));
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/checkbox/index.mjs
var Checkbox = withInstall(stdin_default46);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/checkbox-group/index.mjs
var CheckboxGroup = withInstall(stdin_default45);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/circle/Circle.mjs
import { createVNode as _createVNode47 } from "vue";
import { watch as watch25, computed as computed25, defineComponent as defineComponent45 } from "vue";
var [name44, bem41] = createNamespace("circle");
var uid = 0;
var format = (rate) => Math.min(Math.max(+rate, 0), 100);
function getPath(clockwise, viewBoxSize) {
  const sweepFlag = clockwise ? 1 : 0;
  return `M ${viewBoxSize / 2} ${viewBoxSize / 2} m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
}
var circleProps = {
  text: String,
  size: numericProp,
  fill: makeStringProp("none"),
  rate: makeNumericProp(100),
  speed: makeNumericProp(0),
  color: [String, Object],
  clockwise: truthProp,
  layerColor: String,
  currentRate: makeNumberProp(0),
  strokeWidth: makeNumericProp(40),
  strokeLinecap: String,
  startPosition: makeStringProp("top")
};
var stdin_default47 = defineComponent45({
  name: name44,
  props: circleProps,
  emits: ["update:currentRate"],
  setup(props, {
    emit,
    slots
  }) {
    const id = `van-circle-${uid++}`;
    const viewBoxSize = computed25(() => +props.strokeWidth + 1e3);
    const path = computed25(() => getPath(props.clockwise, viewBoxSize.value));
    const svgStyle = computed25(() => {
      const ROTATE_ANGLE_MAP = {
        top: 0,
        right: 90,
        bottom: 180,
        left: 270
      };
      const angleValue = ROTATE_ANGLE_MAP[props.startPosition];
      if (angleValue) {
        return {
          transform: `rotate(${angleValue}deg)`
        };
      }
    });
    watch25(() => props.rate, (rate) => {
      let rafId;
      const startTime = Date.now();
      const startRate = props.currentRate;
      const endRate = format(rate);
      const duration = Math.abs((startRate - endRate) * 1e3 / +props.speed);
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const rate2 = progress * (endRate - startRate) + startRate;
        emit("update:currentRate", format(parseFloat(rate2.toFixed(1))));
        if (endRate > startRate ? rate2 < endRate : rate2 > endRate) {
          rafId = raf(animate);
        }
      };
      if (props.speed) {
        if (rafId) {
          cancelRaf(rafId);
        }
        rafId = raf(animate);
      } else {
        emit("update:currentRate", endRate);
      }
    }, {
      immediate: true
    });
    const renderHover = () => {
      const PERIMETER = 3140;
      const {
        strokeWidth,
        currentRate,
        strokeLinecap
      } = props;
      const offset2 = PERIMETER * currentRate / 100;
      const color = isObject(props.color) ? `url(#${id})` : props.color;
      const style = {
        stroke: color,
        strokeWidth: `${+strokeWidth + 1}px`,
        strokeLinecap,
        strokeDasharray: `${offset2}px ${PERIMETER}px`
      };
      return _createVNode47("path", {
        "d": path.value,
        "style": style,
        "class": bem41("hover"),
        "stroke": color
      }, null);
    };
    const renderLayer = () => {
      const style = {
        fill: props.fill,
        stroke: props.layerColor,
        strokeWidth: `${props.strokeWidth}px`
      };
      return _createVNode47("path", {
        "class": bem41("layer"),
        "style": style,
        "d": path.value
      }, null);
    };
    const renderGradient = () => {
      const {
        color
      } = props;
      if (!isObject(color)) {
        return;
      }
      const Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => _createVNode47("stop", {
        "key": index,
        "offset": key,
        "stop-color": color[key]
      }, null));
      return _createVNode47("defs", null, [_createVNode47("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };
    const renderText = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props.text) {
        return _createVNode47("div", {
          "class": bem41("text")
        }, [props.text]);
      }
    };
    return () => _createVNode47("div", {
      "class": bem41(),
      "style": getSizeStyle(props.size)
    }, [_createVNode47("svg", {
      "viewBox": `0 0 ${viewBoxSize.value} ${viewBoxSize.value}`,
      "style": svgStyle.value
    }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/circle/index.mjs
var Circle = withInstall(stdin_default47);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/col/Col.mjs
import { createVNode as _createVNode49 } from "vue";
import { computed as computed27, defineComponent as defineComponent47 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/row/Row.mjs
import { createVNode as _createVNode48 } from "vue";
import { computed as computed26, defineComponent as defineComponent46 } from "vue";
var [name45, bem42] = createNamespace("row");
var ROW_KEY = Symbol(name45);
var rowProps = {
  tag: makeStringProp("div"),
  wrap: truthProp,
  align: String,
  gutter: makeNumericProp(0),
  justify: String
};
var stdin_default48 = defineComponent46({
  name: name45,
  props: rowProps,
  setup(props, {
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(ROW_KEY);
    const groups = computed26(() => {
      const groups2 = [[]];
      let totalSpan = 0;
      children.forEach((child, index) => {
        totalSpan += Number(child.span);
        if (totalSpan > 24) {
          groups2.push([index]);
          totalSpan -= 24;
        } else {
          groups2[groups2.length - 1].push(index);
        }
      });
      return groups2;
    });
    const spaces = computed26(() => {
      const gutter = Number(props.gutter);
      const spaces2 = [];
      if (!gutter) {
        return spaces2;
      }
      groups.value.forEach((group) => {
        const averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach((item, index) => {
          if (index === 0) {
            spaces2.push({
              right: averagePadding
            });
          } else {
            const left2 = gutter - spaces2[item - 1].right;
            const right2 = averagePadding - left2;
            spaces2.push({
              left: left2,
              right: right2
            });
          }
        });
      });
      return spaces2;
    });
    linkChildren({
      spaces
    });
    return () => {
      const {
        tag,
        wrap,
        align,
        justify
      } = props;
      return _createVNode48(tag, {
        "class": bem42({
          [`align-${align}`]: align,
          [`justify-${justify}`]: justify,
          nowrap: !wrap
        })
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/col/Col.mjs
var [name46, bem43] = createNamespace("col");
var colProps = {
  tag: makeStringProp("div"),
  span: makeNumericProp(0),
  offset: numericProp
};
var stdin_default49 = defineComponent47({
  name: name46,
  props: colProps,
  setup(props, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(ROW_KEY);
    const style = computed27(() => {
      if (!parent) {
        return;
      }
      const {
        spaces
      } = parent;
      if (spaces && spaces.value && spaces.value[index.value]) {
        const {
          left: left2,
          right: right2
        } = spaces.value[index.value];
        return {
          paddingLeft: left2 ? `${left2}px` : null,
          paddingRight: right2 ? `${right2}px` : null
        };
      }
    });
    return () => {
      const {
        tag,
        span,
        offset: offset2
      } = props;
      return _createVNode49(tag, {
        "style": style.value,
        "class": bem43({
          [span]: span,
          [`offset-${offset2}`]: offset2
        })
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/col/index.mjs
var Col = withInstall(stdin_default49);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/collapse/Collapse.mjs
import { createVNode as _createVNode50 } from "vue";
import { defineComponent as defineComponent48 } from "vue";
var [name47, bem44] = createNamespace("collapse");
var COLLAPSE_KEY = Symbol(name47);
var collapseProps = {
  border: truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array],
    default: ""
  }
};
function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should not be Array in accordion mode');
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should be Array in non-accordion mode');
    return false;
  }
  return true;
}
var stdin_default50 = defineComponent48({
  name: name47,
  props: collapseProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren,
      children
    } = useChildren(COLLAPSE_KEY);
    const updateName = (name210) => {
      emit("change", name210);
      emit("update:modelValue", name210);
    };
    const toggle = (name210, expanded) => {
      const {
        accordion,
        modelValue
      } = props;
      if (accordion) {
        updateName(name210 === modelValue ? "" : name210);
      } else if (expanded) {
        updateName(modelValue.concat(name210));
      } else {
        updateName(modelValue.filter((activeName) => activeName !== name210));
      }
    };
    const toggleAll = (options = {}) => {
      if (props.accordion) {
        return;
      }
      if (typeof options === "boolean") {
        options = {
          expanded: options
        };
      }
      const {
        expanded,
        skipDisabled
      } = options;
      const expandedChildren = children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.expanded.value;
        }
        return expanded != null ? expanded : !item.expanded.value;
      });
      const names = expandedChildren.map((item) => item.itemName.value);
      updateName(names);
    };
    const isExpanded = (name210) => {
      const {
        accordion,
        modelValue
      } = props;
      if (!validateModelValue(modelValue, accordion)) {
        return false;
      }
      return accordion ? modelValue === name210 : modelValue.includes(name210);
    };
    useExpose({
      toggleAll
    });
    linkChildren({
      toggle,
      isExpanded
    });
    return () => {
      var _a;
      return _createVNode50("div", {
        "class": [bem44(), {
          [BORDER_TOP_BOTTOM]: props.border
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/collapse/index.mjs
var Collapse = withInstall(stdin_default50);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/collapse-item/CollapseItem.mjs
import { withDirectives as _withDirectives6, vShow as _vShow5, createVNode as _createVNode51, mergeProps as _mergeProps15 } from "vue";
import { ref as ref32, watch as watch26, computed as computed28, nextTick as nextTick14, defineComponent as defineComponent49 } from "vue";
var [name48, bem45] = createNamespace("collapse-item");
var CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
var collapseItemProps = extend({}, cellSharedProps, {
  name: numericProp,
  isLink: truthProp,
  disabled: Boolean,
  readonly: Boolean,
  lazyRender: truthProp
});
var stdin_default51 = defineComponent49({
  name: name48,
  props: collapseItemProps,
  setup(props, {
    slots
  }) {
    const wrapperRef = ref32();
    const contentRef = ref32();
    const {
      parent,
      index
    } = useParent(COLLAPSE_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <CollapseItem> must be a child component of <Collapse>.");
      }
      return;
    }
    const name210 = computed28(() => {
      var _a;
      return (_a = props.name) != null ? _a : index.value;
    });
    const expanded = computed28(() => parent.isExpanded(name210.value));
    const show = ref32(expanded.value);
    const lazyRender = useLazyRender(() => show.value || !props.lazyRender);
    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else if (wrapperRef.value) {
        wrapperRef.value.style.height = "";
      }
    };
    watch26(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }
      if (value) {
        show.value = true;
      }
      const tick = value ? nextTick14 : raf;
      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }
        const {
          offsetHeight
        } = contentRef.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? "0" : contentHeight;
          doubleRaf(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.height = value ? contentHeight : "0";
            }
          });
        } else {
          onTransitionEnd();
        }
      });
    });
    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name210.value, newValue);
    };
    const onClickTitle = () => {
      if (!props.disabled && !props.readonly) {
        toggle();
      }
    };
    const renderTitle = () => {
      const {
        border,
        disabled,
        readonly
      } = props;
      const attrs = pick(props, Object.keys(cellSharedProps));
      if (readonly) {
        attrs.isLink = false;
      }
      if (disabled || readonly) {
        attrs.clickable = false;
      }
      return _createVNode51(Cell, _mergeProps15({
        "role": "button",
        "class": bem45("title", {
          disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, attrs), pick(slots, CELL_SLOTS));
    };
    const renderContent = lazyRender(() => {
      var _a;
      return _withDirectives6(_createVNode51("div", {
        "ref": wrapperRef,
        "class": bem45("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [_createVNode51("div", {
        "ref": contentRef,
        "class": bem45("content")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[_vShow5, show.value]]);
    });
    useExpose({
      toggle,
      expanded,
      itemName: name210
    });
    return () => _createVNode51("div", {
      "class": [bem45({
        border: index.value && props.border
      })]
    }, [renderTitle(), renderContent()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/collapse-item/index.mjs
var CollapseItem = withInstall(stdin_default51);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/config-provider/index.mjs
var ConfigProvider = withInstall(stdin_default5);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/contact-card/ContactCard.mjs
import { createVNode as _createVNode52 } from "vue";
import { defineComponent as defineComponent50 } from "vue";
var [name49, bem46, t7] = createNamespace("contact-card");
var contactCardProps = {
  tel: String,
  name: String,
  type: makeStringProp("add"),
  addText: String,
  editable: truthProp
};
var stdin_default52 = defineComponent50({
  name: name49,
  props: contactCardProps,
  emits: ["click"],
  setup(props, {
    emit
  }) {
    const onClick = (event) => {
      if (props.editable) {
        emit("click", event);
      }
    };
    const renderContent = () => {
      if (props.type === "add") {
        return props.addText || t7("addContact");
      }
      return [_createVNode52("div", null, [`${t7("name")}：${props.name}`]), _createVNode52("div", null, [`${t7("tel")}：${props.tel}`])];
    };
    return () => _createVNode52(Cell, {
      "center": true,
      "icon": props.type === "edit" ? "contact" : "add-square",
      "class": bem46([props.type]),
      "border": false,
      "isLink": props.editable,
      "valueClass": bem46("value"),
      "onClick": onClick
    }, {
      value: renderContent
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/contact-card/index.mjs
var ContactCard = withInstall(stdin_default52);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/contact-edit/ContactEdit.mjs
import { createVNode as _createVNode53 } from "vue";
import { watch as watch27, reactive as reactive12, defineComponent as defineComponent51 } from "vue";
var [name50, bem47, t8] = createNamespace("contact-edit");
var DEFAULT_CONTACT = {
  tel: "",
  name: ""
};
var contactEditProps = {
  isEdit: Boolean,
  isSaving: Boolean,
  isDeleting: Boolean,
  showSetDefault: Boolean,
  setDefaultLabel: String,
  contactInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_CONTACT)
  },
  telValidator: {
    type: Function,
    default: isMobile
  }
};
var stdin_default53 = defineComponent51({
  name: name50,
  props: contactEditProps,
  emits: ["save", "delete", "change-default"],
  setup(props, {
    emit
  }) {
    const contact = reactive12(extend({}, DEFAULT_CONTACT, props.contactInfo));
    const onSave = () => {
      if (!props.isSaving) {
        emit("save", contact);
      }
    };
    const onDelete = () => emit("delete", contact);
    const renderButtons = () => _createVNode53("div", {
      "class": bem47("buttons")
    }, [_createVNode53(Button, {
      "block": true,
      "round": true,
      "type": "danger",
      "text": t8("save"),
      "class": bem47("button"),
      "loading": props.isSaving,
      "nativeType": "submit"
    }, null), props.isEdit && _createVNode53(Button, {
      "block": true,
      "round": true,
      "text": t8("delete"),
      "class": bem47("button"),
      "loading": props.isDeleting,
      "onClick": onDelete
    }, null)]);
    const renderSwitch = () => _createVNode53(Switch, {
      "modelValue": contact.isDefault,
      "onUpdate:modelValue": ($event) => contact.isDefault = $event,
      "size": 24,
      "onChange": (checked) => emit("change-default", checked)
    }, null);
    const renderSetDefault = () => {
      if (props.showSetDefault) {
        return _createVNode53(Cell, {
          "title": props.setDefaultLabel,
          "class": bem47("switch-cell"),
          "border": false
        }, {
          "right-icon": renderSwitch
        });
      }
    };
    watch27(() => props.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
    return () => _createVNode53(Form, {
      "class": bem47(),
      "onSubmit": onSave
    }, {
      default: () => [_createVNode53("div", {
        "class": bem47("fields")
      }, [_createVNode53(Field, {
        "modelValue": contact.name,
        "onUpdate:modelValue": ($event) => contact.name = $event,
        "clearable": true,
        "label": t8("name"),
        "rules": [{
          required: true,
          message: t8("nameEmpty")
        }],
        "maxlength": "30",
        "placeholder": t8("name")
      }, null), _createVNode53(Field, {
        "modelValue": contact.tel,
        "onUpdate:modelValue": ($event) => contact.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": t8("tel"),
        "rules": [{
          validator: props.telValidator,
          message: t8("telInvalid")
        }],
        "placeholder": t8("tel")
      }, null)]), renderSetDefault(), renderButtons()]
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/contact-edit/index.mjs
var ContactEdit = withInstall(stdin_default53);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/contact-list/ContactList.mjs
import { createVNode as _createVNode54 } from "vue";
import { defineComponent as defineComponent52 } from "vue";
var [name51, bem48, t9] = createNamespace("contact-list");
var contactListProps = {
  list: Array,
  addText: String,
  modelValue: unknownProp,
  defaultTagText: String
};
var stdin_default54 = defineComponent52({
  name: name51,
  props: contactListProps,
  emits: ["add", "edit", "select", "update:modelValue"],
  setup(props, {
    emit
  }) {
    const renderItem = (item, index) => {
      const onClick = () => {
        emit("update:modelValue", item.id);
        emit("select", item, index);
      };
      const renderRightIcon = () => _createVNode54(Radio, {
        "class": bem48("radio"),
        "name": item.id,
        "iconSize": 16
      }, null);
      const renderEditIcon = () => _createVNode54(Icon, {
        "name": "edit",
        "class": bem48("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit", item, index);
        }
      }, null);
      const renderContent = () => {
        const nodes = [`${item.name}，${item.tel}`];
        if (item.isDefault && props.defaultTagText) {
          nodes.push(_createVNode54(Tag, {
            "type": "danger",
            "round": true,
            "class": bem48("item-tag")
          }, {
            default: () => [props.defaultTagText]
          }));
        }
        return nodes;
      };
      return _createVNode54(Cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": bem48("item"),
        "valueClass": bem48("item-value"),
        "onClick": onClick
      }, {
        icon: renderEditIcon,
        value: renderContent,
        "right-icon": renderRightIcon
      });
    };
    return () => _createVNode54("div", {
      "class": bem48()
    }, [_createVNode54(RadioGroup, {
      "modelValue": props.modelValue,
      "class": bem48("group")
    }, {
      default: () => [props.list && props.list.map(renderItem)]
    }), _createVNode54("div", {
      "class": [bem48("bottom"), "van-safe-area-bottom"]
    }, [_createVNode54(Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "class": bem48("add"),
      "text": props.addText || t9("addContact"),
      "onClick": () => emit("add")
    }, null)])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/contact-list/index.mjs
var ContactList = withInstall(stdin_default54);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/count-down/CountDown.mjs
import { createVNode as _createVNode55 } from "vue";
import { watch as watch28, computed as computed29, defineComponent as defineComponent53 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/count-down/utils.mjs
function parseFormat(format3, currentTime) {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;
  if (format3.includes("DD")) {
    format3 = format3.replace("DD", padZero(days));
  } else {
    hours += days * 24;
  }
  if (format3.includes("HH")) {
    format3 = format3.replace("HH", padZero(hours));
  } else {
    minutes += hours * 60;
  }
  if (format3.includes("mm")) {
    format3 = format3.replace("mm", padZero(minutes));
  } else {
    seconds += minutes * 60;
  }
  if (format3.includes("ss")) {
    format3 = format3.replace("ss", padZero(seconds));
  } else {
    milliseconds += seconds * 1e3;
  }
  if (format3.includes("S")) {
    const ms = padZero(milliseconds, 3);
    if (format3.includes("SSS")) {
      format3 = format3.replace("SSS", ms);
    } else if (format3.includes("SS")) {
      format3 = format3.replace("SS", ms.slice(0, 2));
    } else {
      format3 = format3.replace("S", ms.charAt(0));
    }
  }
  return format3;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/count-down/CountDown.mjs
var [name52, bem49] = createNamespace("count-down");
var countDownProps = {
  time: makeNumericProp(0),
  format: makeStringProp("HH:mm:ss"),
  autoStart: truthProp,
  millisecond: Boolean
};
var stdin_default55 = defineComponent53({
  name: name52,
  props: countDownProps,
  emits: ["change", "finish"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      start: start2,
      pause,
      reset,
      current: current2
    } = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: (current22) => emit("change", current22),
      onFinish: () => emit("finish")
    });
    const timeText = computed29(() => parseFormat(props.format, current2.value));
    const resetTime = () => {
      reset(+props.time);
      if (props.autoStart) {
        start2();
      }
    };
    watch28(() => props.time, resetTime, {
      immediate: true
    });
    useExpose({
      start: start2,
      pause,
      reset: resetTime
    });
    return () => _createVNode55("div", {
      "role": "timer",
      "class": bem49()
    }, [slots.default ? slots.default(current2.value) : timeText.value]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/count-down/index.mjs
var CountDown = withInstall(stdin_default55);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon/Coupon.mjs
import { createVNode as _createVNode56 } from "vue";
import { computed as computed30, defineComponent as defineComponent54 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon/utils.mjs
function getDate(timeStamp) {
  const date = new Date(timeStamp * 1e3);
  return `${date.getFullYear()}.${padZero(date.getMonth() + 1)}.${padZero(
    date.getDate()
  )}`;
}
var formatDiscount = (discount) => (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
var formatAmount = (amount) => (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon/Coupon.mjs
var [name53, bem50, t10] = createNamespace("coupon");
var stdin_default56 = defineComponent54({
  name: name53,
  props: {
    chosen: Boolean,
    coupon: makeRequiredProp(Object),
    disabled: Boolean,
    currency: makeStringProp("¥")
  },
  setup(props) {
    const validPeriod = computed30(() => {
      const {
        startAt,
        endAt
      } = props.coupon;
      return `${getDate(startAt)} - ${getDate(endAt)}`;
    });
    const faceAmount = computed30(() => {
      const {
        coupon,
        currency
      } = props;
      if (coupon.valueDesc) {
        return [coupon.valueDesc, _createVNode56("span", null, [coupon.unitDesc || ""])];
      }
      if (coupon.denominations) {
        const denominations = formatAmount(coupon.denominations);
        return [_createVNode56("span", null, [currency]), ` ${denominations}`];
      }
      if (coupon.discount) {
        return t10("discount", formatDiscount(coupon.discount));
      }
      return "";
    });
    const conditionMessage = computed30(() => {
      const condition = formatAmount(props.coupon.originCondition || 0);
      return condition === "0" ? t10("unlimited") : t10("condition", condition);
    });
    return () => {
      const {
        chosen,
        coupon,
        disabled
      } = props;
      const description = disabled && coupon.reason || coupon.description;
      return _createVNode56("div", {
        "class": bem50({
          disabled
        })
      }, [_createVNode56("div", {
        "class": bem50("content")
      }, [_createVNode56("div", {
        "class": bem50("head")
      }, [_createVNode56("h2", {
        "class": bem50("amount")
      }, [faceAmount.value]), _createVNode56("p", {
        "class": bem50("condition")
      }, [coupon.condition || conditionMessage.value])]), _createVNode56("div", {
        "class": bem50("body")
      }, [_createVNode56("p", {
        "class": bem50("name")
      }, [coupon.name]), _createVNode56("p", {
        "class": bem50("valid")
      }, [validPeriod.value]), !disabled && _createVNode56(Checkbox, {
        "class": bem50("corner"),
        "modelValue": chosen
      }, null)])]), description && _createVNode56("p", {
        "class": bem50("description")
      }, [description])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon/index.mjs
var Coupon = withInstall(stdin_default56);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon-cell/CouponCell.mjs
import { createVNode as _createVNode57 } from "vue";
import { defineComponent as defineComponent55 } from "vue";
var [name54, bem51, t11] = createNamespace("coupon-cell");
var couponCellProps = {
  title: String,
  border: truthProp,
  editable: truthProp,
  coupons: makeArrayProp(),
  currency: makeStringProp("¥"),
  chosenCoupon: makeNumericProp(-1)
};
function formatValue({
  coupons,
  chosenCoupon,
  currency
}) {
  const coupon = coupons[+chosenCoupon];
  if (coupon) {
    let value = 0;
    if (isDef(coupon.value)) {
      ({
        value
      } = coupon);
    } else if (isDef(coupon.denominations)) {
      value = coupon.denominations;
    }
    return `-${currency} ${(value / 100).toFixed(2)}`;
  }
  return coupons.length === 0 ? t11("noCoupon") : t11("count", coupons.length);
}
var stdin_default57 = defineComponent55({
  name: name54,
  props: couponCellProps,
  setup(props) {
    return () => {
      const selected = props.coupons[+props.chosenCoupon];
      return _createVNode57(Cell, {
        "class": bem51(),
        "value": formatValue(props),
        "title": props.title || t11("title"),
        "border": props.border,
        "isLink": props.editable,
        "valueClass": bem51("value", {
          selected
        })
      }, null);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon-cell/index.mjs
var CouponCell = withInstall(stdin_default57);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon-list/CouponList.mjs
import { withDirectives as _withDirectives7, vShow as _vShow6, createVNode as _createVNode59 } from "vue";
import { ref as ref33, watch as watch29, computed as computed31, nextTick as nextTick15, onMounted as onMounted11, defineComponent as defineComponent57 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/empty/Empty.mjs
import { createVNode as _createVNode58 } from "vue";
import { defineComponent as defineComponent56 } from "vue";
var [name55, bem52] = createNamespace("empty");
var emptyProps = {
  image: makeStringProp("default"),
  imageSize: [Number, String, Array],
  description: String
};
var stdin_default58 = defineComponent56({
  name: name55,
  props: emptyProps,
  setup(props, {
    slots
  }) {
    const renderDescription = () => {
      const description = slots.description ? slots.description() : props.description;
      if (description) {
        return _createVNode58("p", {
          "class": bem52("description")
        }, [description]);
      }
    };
    const renderBottom = () => {
      if (slots.default) {
        return _createVNode58("div", {
          "class": bem52("bottom")
        }, [slots.default()]);
      }
    };
    const baseId = useId();
    const getId = (num) => `${baseId}-${num}`;
    const getUrlById = (num) => `url(#${getId(num)})`;
    const renderStop = (color, offset2, opacity) => _createVNode58("stop", {
      "stop-color": color,
      "offset": `${offset2}%`,
      "stop-opacity": opacity
    }, null);
    const renderStops = (fromColor, toColor) => [renderStop(fromColor, 0), renderStop(toColor, 100)];
    const renderShadow = (id) => [_createVNode58("defs", null, [_createVNode58("radialGradient", {
      "id": getId(id),
      "cx": "50%",
      "cy": "54%",
      "fx": "50%",
      "fy": "54%",
      "r": "297%",
      "gradientTransform": "matrix(-.16 0 0 -.33 .58 .72)"
    }, [renderStop("#EBEDF0", 0), renderStop("#F2F3F5", 100, 0.3)])]), _createVNode58("ellipse", {
      "fill": getUrlById(id),
      "opacity": ".8",
      "cx": "80",
      "cy": "140",
      "rx": "46",
      "ry": "8"
    }, null)];
    const renderBuilding = () => [_createVNode58("defs", null, [_createVNode58("linearGradient", {
      "id": getId("a"),
      "x1": "64%",
      "y1": "100%",
      "x2": "64%"
    }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)])]), _createVNode58("g", {
      "opacity": ".8"
    }, [_createVNode58("path", {
      "d": "M36 131V53H16v20H2v58h34z",
      "fill": getUrlById("a")
    }, null), _createVNode58("path", {
      "d": "M123 15h22v14h9v77h-31V15z",
      "fill": getUrlById("a")
    }, null)])];
    const renderCloud = () => [_createVNode58("defs", null, [_createVNode58("linearGradient", {
      "id": getId("b"),
      "x1": "64%",
      "y1": "97%",
      "x2": "64%",
      "y2": "0%"
    }, [renderStop("#F2F3F5", 0, 0.3), renderStop("#F2F3F5", 100)])]), _createVNode58("g", {
      "opacity": ".8"
    }, [_createVNode58("path", {
      "d": "M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z",
      "fill": getUrlById("b")
    }, null), _createVNode58("path", {
      "d": "M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z",
      "fill": getUrlById("b")
    }, null)])];
    const renderNetwork = () => _createVNode58("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode58("defs", null, [_createVNode58("linearGradient", {
      "id": getId(1),
      "x1": "64%",
      "y1": "100%",
      "x2": "64%"
    }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)]), _createVNode58("linearGradient", {
      "id": getId(2),
      "x1": "50%",
      "x2": "50%",
      "y2": "84%"
    }, [renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)]), _createVNode58("linearGradient", {
      "id": getId(3),
      "x1": "100%",
      "x2": "100%",
      "y2": "100%"
    }, [renderStops("#EAEDF0", "#DCDEE0")]), _createVNode58("radialGradient", {
      "id": getId(4),
      "cx": "50%",
      "cy": "0%",
      "fx": "50%",
      "fy": "0%",
      "r": "100%",
      "gradientTransform": "matrix(0 1 -.54 0 .5 -.5)"
    }, [renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0)])]), _createVNode58("g", {
      "fill": "none"
    }, [renderBuilding(), _createVNode58("path", {
      "fill": getUrlById(4),
      "d": "M0 139h160v21H0z"
    }, null), _createVNode58("path", {
      "d": "M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",
      "fill": getUrlById(2)
    }, null), _createVNode58("g", {
      "opacity": ".6",
      "stroke-linecap": "round",
      "stroke-width": "7"
    }, [_createVNode58("path", {
      "d": "M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",
      "stroke": getUrlById(3)
    }, null), _createVNode58("path", {
      "d": "M53 36a34 34 0 0 0 0 48",
      "stroke": getUrlById(3)
    }, null), _createVNode58("path", {
      "d": "M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",
      "stroke": getUrlById(3)
    }, null), _createVNode58("path", {
      "d": "M106 84a34 34 0 0 0 0-48",
      "stroke": getUrlById(3)
    }, null)]), _createVNode58("g", {
      "transform": "translate(31 105)"
    }, [_createVNode58("rect", {
      "fill": "#EBEDF0",
      "width": "98",
      "height": "34",
      "rx": "2"
    }, null), _createVNode58("rect", {
      "fill": "#FFF",
      "x": "9",
      "y": "8",
      "width": "80",
      "height": "18",
      "rx": "1.1"
    }, null), _createVNode58("rect", {
      "fill": "#EBEDF0",
      "x": "15",
      "y": "12",
      "width": "18",
      "height": "6",
      "rx": "1.1"
    }, null)])])]);
    const renderMaterial = () => _createVNode58("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode58("defs", null, [_createVNode58("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(5)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), _createVNode58("linearGradient", {
      "x1": "95%",
      "y1": "48%",
      "x2": "5.5%",
      "y2": "51%",
      "id": getId(6)
    }, [renderStops("#EAEDF1", "#DCDEE0")]), _createVNode58("linearGradient", {
      "y1": "45%",
      "x2": "100%",
      "y2": "54%",
      "id": getId(7)
    }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), _createVNode58("g", {
      "transform": "translate(36 50)",
      "fill": "none"
    }, [_createVNode58("g", {
      "transform": "translate(8)"
    }, [_createVNode58("rect", {
      "fill": "#EBEDF0",
      "opacity": ".6",
      "x": "38",
      "y": "13",
      "width": "36",
      "height": "53",
      "rx": "2"
    }, null), _createVNode58("rect", {
      "fill": getUrlById(5),
      "width": "64",
      "height": "66",
      "rx": "2"
    }, null), _createVNode58("rect", {
      "fill": "#FFF",
      "x": "6",
      "y": "6",
      "width": "52",
      "height": "55",
      "rx": "1"
    }, null), _createVNode58("g", {
      "transform": "translate(15 17)",
      "fill": getUrlById(6)
    }, [_createVNode58("rect", {
      "width": "34",
      "height": "6",
      "rx": "1"
    }, null), _createVNode58("path", {
      "d": "M0 14h34v6H0z"
    }, null), _createVNode58("rect", {
      "y": "28",
      "width": "34",
      "height": "6",
      "rx": "1"
    }, null)])]), _createVNode58("rect", {
      "fill": getUrlById(7),
      "y": "61",
      "width": "88",
      "height": "28",
      "rx": "1"
    }, null), _createVNode58("rect", {
      "fill": "#F7F8FA",
      "x": "29",
      "y": "72",
      "width": "30",
      "height": "6",
      "rx": "1"
    }, null)])]);
    const renderError = () => _createVNode58("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode58("defs", null, [_createVNode58("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(8)
    }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), renderShadow("c"), _createVNode58("path", {
      "d": "m59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z",
      "fill": getUrlById(8)
    }, null)]);
    const renderSearch = () => _createVNode58("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode58("defs", null, [_createVNode58("linearGradient", {
      "x1": "50%",
      "y1": "100%",
      "x2": "50%",
      "id": getId(9)
    }, [renderStops("#EEE", "#D8D8D8")]), _createVNode58("linearGradient", {
      "x1": "100%",
      "y1": "50%",
      "y2": "50%",
      "id": getId(10)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), _createVNode58("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(11)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), _createVNode58("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(12)
    }, [renderStops("#FFF", "#F7F8FA")])]), renderBuilding(), renderCloud(), renderShadow("d"), _createVNode58("g", {
      "transform": "rotate(-45 113 -4)",
      "fill": "none"
    }, [_createVNode58("rect", {
      "fill": getUrlById(9),
      "x": "24",
      "y": "52.8",
      "width": "5.8",
      "height": "19",
      "rx": "1"
    }, null), _createVNode58("rect", {
      "fill": getUrlById(10),
      "x": "22.1",
      "y": "67.3",
      "width": "9.9",
      "height": "28",
      "rx": "1"
    }, null), _createVNode58("circle", {
      "stroke": getUrlById(11),
      "stroke-width": "8",
      "cx": "27",
      "cy": "27",
      "r": "27"
    }, null), _createVNode58("circle", {
      "fill": getUrlById(12),
      "cx": "27",
      "cy": "27",
      "r": "16"
    }, null), _createVNode58("path", {
      "d": "M37 7c-8 0-15 5-16 12",
      "stroke": getUrlById(11),
      "stroke-width": "3",
      "opacity": ".5",
      "stroke-linecap": "round",
      "transform": "rotate(45 29 13)"
    }, null)])]);
    const renderImage = () => {
      var _a;
      if (slots.image) {
        return slots.image();
      }
      const PRESET_IMAGES = {
        error: renderError,
        search: renderSearch,
        network: renderNetwork,
        default: renderMaterial
      };
      return ((_a = PRESET_IMAGES[props.image]) == null ? void 0 : _a.call(PRESET_IMAGES)) || _createVNode58("img", {
        "src": props.image
      }, null);
    };
    return () => _createVNode58("div", {
      "class": bem52()
    }, [_createVNode58("div", {
      "class": bem52("image"),
      "style": getSizeStyle(props.imageSize)
    }, [renderImage()]), renderDescription(), renderBottom()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/empty/index.mjs
var Empty = withInstall(stdin_default58);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon-list/CouponList.mjs
var [name56, bem53, t12] = createNamespace("coupon-list");
var couponListProps = {
  code: makeStringProp(""),
  coupons: makeArrayProp(),
  currency: makeStringProp("¥"),
  showCount: truthProp,
  emptyImage: String,
  chosenCoupon: makeNumberProp(-1),
  enabledTitle: String,
  disabledTitle: String,
  disabledCoupons: makeArrayProp(),
  showExchangeBar: truthProp,
  showCloseButton: truthProp,
  closeButtonText: String,
  inputPlaceholder: String,
  exchangeMinLength: makeNumberProp(1),
  exchangeButtonText: String,
  displayedCouponIndex: makeNumberProp(-1),
  exchangeButtonLoading: Boolean,
  exchangeButtonDisabled: Boolean
};
var stdin_default59 = defineComponent57({
  name: name56,
  props: couponListProps,
  emits: ["change", "exchange", "update:code"],
  setup(props, {
    emit,
    slots
  }) {
    const [couponRefs, setCouponRefs] = useRefs();
    const root = ref33();
    const barRef = ref33();
    const activeTab = ref33(0);
    const listHeight = ref33(0);
    const currentCode = ref33(props.code);
    const buttonDisabled = computed31(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props.exchangeMinLength));
    const updateListHeight = () => {
      const TABS_HEIGHT = 44;
      const rootHeight = useRect(root).height;
      const headerHeight = useRect(barRef).height + TABS_HEIGHT;
      listHeight.value = (rootHeight > headerHeight ? rootHeight : windowHeight.value) - headerHeight;
    };
    const onExchange = () => {
      emit("exchange", currentCode.value);
      if (!props.code) {
        currentCode.value = "";
      }
    };
    const scrollToCoupon = (index) => {
      nextTick15(() => {
        var _a;
        return (_a = couponRefs.value[index]) == null ? void 0 : _a.scrollIntoView();
      });
    };
    const renderEmpty = () => _createVNode59(Empty, {
      "image": props.emptyImage
    }, {
      default: () => [_createVNode59("p", {
        "class": bem53("empty-tip")
      }, [t12("noCoupon")])]
    });
    const renderExchangeBar = () => {
      if (props.showExchangeBar) {
        return _createVNode59("div", {
          "ref": barRef,
          "class": bem53("exchange-bar")
        }, [_createVNode59(Field, {
          "modelValue": currentCode.value,
          "onUpdate:modelValue": ($event) => currentCode.value = $event,
          "clearable": true,
          "border": false,
          "class": bem53("field"),
          "placeholder": props.inputPlaceholder || t12("placeholder"),
          "maxlength": "20"
        }, null), _createVNode59(Button, {
          "plain": true,
          "type": "danger",
          "class": bem53("exchange"),
          "text": props.exchangeButtonText || t12("exchange"),
          "loading": props.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };
    const renderCouponTab = () => {
      const {
        coupons
      } = props;
      const count = props.showCount ? ` (${coupons.length})` : "";
      const title = (props.enabledTitle || t12("enable")) + count;
      return _createVNode59(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [_createVNode59("div", {
            "class": bem53("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [coupons.map((coupon, index) => _createVNode59(Coupon, {
            "key": coupon.id,
            "ref": setCouponRefs(index),
            "coupon": coupon,
            "chosen": index === props.chosenCoupon,
            "currency": props.currency,
            "onClick": () => emit("change", index)
          }, null)), !coupons.length && renderEmpty(), (_a = slots["list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    const renderDisabledTab = () => {
      const {
        disabledCoupons
      } = props;
      const count = props.showCount ? ` (${disabledCoupons.length})` : "";
      const title = (props.disabledTitle || t12("disabled")) + count;
      return _createVNode59(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [_createVNode59("div", {
            "class": bem53("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [disabledCoupons.map((coupon) => _createVNode59(Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_a = slots["disabled-list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    watch29(() => props.code, (value) => {
      currentCode.value = value;
    });
    watch29(windowHeight, updateListHeight);
    watch29(currentCode, (value) => emit("update:code", value));
    watch29(() => props.displayedCouponIndex, scrollToCoupon);
    onMounted11(() => {
      updateListHeight();
      scrollToCoupon(props.displayedCouponIndex);
    });
    return () => _createVNode59("div", {
      "ref": root,
      "class": bem53()
    }, [renderExchangeBar(), _createVNode59(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "class": bem53("tab")
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), _createVNode59("div", {
      "class": bem53("bottom")
    }, [_withDirectives7(_createVNode59(Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "class": bem53("close"),
      "text": props.closeButtonText || t12("close"),
      "onClick": () => emit("change", -1)
    }, null), [[_vShow6, props.showCloseButton]])])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/coupon-list/index.mjs
var CouponList = withInstall(stdin_default59);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/datetime-picker/DatetimePicker.mjs
import { createVNode as _createVNode62, mergeProps as _mergeProps18 } from "vue";
import { ref as ref36, defineComponent as defineComponent60 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/datetime-picker/TimePicker.mjs
import { createVNode as _createVNode60, mergeProps as _mergeProps16 } from "vue";
import { ref as ref34, watch as watch30, computed as computed32, nextTick as nextTick16, onMounted as onMounted12, defineComponent as defineComponent58 } from "vue";
var [name57] = createNamespace("time-picker");
var stdin_default60 = defineComponent58({
  name: name57,
  props: extend({}, sharedProps, {
    minHour: makeNumericProp(0),
    maxHour: makeNumericProp(23),
    minMinute: makeNumericProp(0),
    maxMinute: makeNumericProp(59),
    modelValue: String
  }),
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const formatValue2 = (value) => {
      const {
        minHour,
        maxHour,
        maxMinute,
        minMinute
      } = props;
      if (!value) {
        value = `${padZero(minHour)}:${padZero(minMinute)}`;
      }
      let [hour, minute] = value.split(":");
      hour = padZero(clamp(+hour, +minHour, +maxHour));
      minute = padZero(clamp(+minute, +minMinute, +maxMinute));
      return `${hour}:${minute}`;
    };
    const picker = ref34();
    const currentDate = ref34(formatValue2(props.modelValue));
    const ranges = computed32(() => [{
      type: "hour",
      range: [+props.minHour, +props.maxHour]
    }, {
      type: "minute",
      range: [+props.minMinute, +props.maxMinute]
    }]);
    const originColumns = computed32(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => padZero(rangeArr[0] + index));
      if (props.filter) {
        values = props.filter(type, values);
      }
      return {
        type,
        values
      };
    }));
    const columns = computed32(() => originColumns.value.map((column) => ({
      values: column.values.map((value) => props.formatter(column.type, value))
    })));
    const updateColumnValue = () => {
      const pair = currentDate.value.split(":");
      const values = [props.formatter("hour", pair[0]), props.formatter("minute", pair[1])];
      nextTick16(() => {
        var _a;
        (_a = picker.value) == null ? void 0 : _a.setValues(values);
      });
    };
    const updateInnerValue = () => {
      const [hourIndex, minuteIndex] = picker.value.getIndexes();
      const [hourColumn, minuteColumn] = originColumns.value;
      const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      currentDate.value = formatValue2(`${hour}:${minute}`);
      updateColumnValue();
    };
    const onConfirm = () => emit("confirm", currentDate.value);
    const onCancel = () => emit("cancel");
    const onChange = () => {
      updateInnerValue();
      nextTick16(() => {
        nextTick16(() => emit("change", currentDate.value));
      });
    };
    onMounted12(() => {
      updateColumnValue();
      nextTick16(updateInnerValue);
    });
    watch30(columns, updateColumnValue);
    watch30(() => [props.filter, props.maxHour, props.minMinute, props.maxMinute], updateInnerValue);
    watch30(() => props.minHour, () => {
      nextTick16(updateInnerValue);
    });
    watch30(currentDate, (value) => emit("update:modelValue", value));
    watch30(() => props.modelValue, (value) => {
      value = formatValue2(value);
      if (value !== currentDate.value) {
        currentDate.value = value;
        updateColumnValue();
      }
    });
    useExpose({
      getPicker: () => picker.value && proxyPickerMethods(picker.value, updateInnerValue)
    });
    return () => _createVNode60(Picker, _mergeProps16({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerInheritKeys)), slots);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/datetime-picker/DatePicker.mjs
import { createVNode as _createVNode61, mergeProps as _mergeProps17 } from "vue";
import { ref as ref35, watch as watch31, computed as computed33, nextTick as nextTick17, onMounted as onMounted13, defineComponent as defineComponent59 } from "vue";
var currentYear = new Date().getFullYear();
var [name58] = createNamespace("date-picker");
var stdin_default61 = defineComponent59({
  name: name58,
  props: extend({}, sharedProps, {
    type: makeStringProp("datetime"),
    modelValue: Date,
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: isDate
    }
  }),
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const formatValue2 = (value) => {
      if (isDate(value)) {
        const timestamp = clamp(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
        return new Date(timestamp);
      }
      return void 0;
    };
    const picker = ref35();
    const currentDate = ref35(formatValue2(props.modelValue));
    const getBoundary = (type, value) => {
      const boundary = props[`${type}Date`];
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }
      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    };
    const ranges = computed33(() => {
      const {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = getBoundary("max", currentDate.value || props.minDate);
      const {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = getBoundary("min", currentDate.value || props.minDate);
      let result = [{
        type: "year",
        range: [minYear, maxYear]
      }, {
        type: "month",
        range: [minMonth, maxMonth]
      }, {
        type: "day",
        range: [minDate, maxDate]
      }, {
        type: "hour",
        range: [minHour, maxHour]
      }, {
        type: "minute",
        range: [minMinute, maxMinute]
      }];
      switch (props.type) {
        case "date":
          result = result.slice(0, 3);
          break;
        case "year-month":
          result = result.slice(0, 2);
          break;
        case "month-day":
          result = result.slice(1, 3);
          break;
        case "datehour":
          result = result.slice(0, 4);
          break;
      }
      if (props.columnsOrder) {
        const columnsOrder = props.columnsOrder.concat(result.map((column) => column.type));
        result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
      }
      return result;
    });
    const originColumns = computed33(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => padZero(rangeArr[0] + index));
      if (props.filter) {
        values = props.filter(type, values);
      }
      return {
        type,
        values
      };
    }));
    const columns = computed33(() => originColumns.value.map((column) => ({
      values: column.values.map((value) => props.formatter(column.type, value))
    })));
    const updateColumnValue = () => {
      const value = currentDate.value || props.minDate;
      const {
        formatter
      } = props;
      const values = originColumns.value.map((column) => {
        switch (column.type) {
          case "year":
            return formatter("year", `${value.getFullYear()}`);
          case "month":
            return formatter("month", padZero(value.getMonth() + 1));
          case "day":
            return formatter("day", padZero(value.getDate()));
          case "hour":
            return formatter("hour", padZero(value.getHours()));
          case "minute":
            return formatter("minute", padZero(value.getMinutes()));
          default:
            return "";
        }
      });
      nextTick17(() => {
        var _a;
        (_a = picker.value) == null ? void 0 : _a.setValues(values);
      });
    };
    const updateInnerValue = () => {
      const {
        type
      } = props;
      const indexes = picker.value.getIndexes();
      const getValue = (type2) => {
        let index = 0;
        originColumns.value.forEach((column, columnIndex) => {
          if (type2 === column.type) {
            index = columnIndex;
          }
        });
        const {
          values
        } = originColumns.value[index];
        return getTrueValue(values[indexes[index]]);
      };
      let year;
      let month;
      let day;
      if (type === "month-day") {
        year = (currentDate.value || props.minDate).getFullYear();
        month = getValue("month");
        day = getValue("day");
      } else {
        year = getValue("year");
        month = getValue("month");
        day = type === "year-month" ? 1 : getValue("day");
      }
      const maxDay = getMonthEndDay(year, month);
      day = day > maxDay ? maxDay : day;
      let hour = 0;
      let minute = 0;
      if (type === "datehour") {
        hour = getValue("hour");
      }
      if (type === "datetime") {
        hour = getValue("hour");
        minute = getValue("minute");
      }
      const value = new Date(year, month - 1, day, hour, minute);
      currentDate.value = formatValue2(value);
    };
    const onConfirm = () => {
      emit("update:modelValue", currentDate.value);
      emit("confirm", currentDate.value);
    };
    const onCancel = () => emit("cancel");
    const onChange = () => {
      updateInnerValue();
      nextTick17(() => {
        updateInnerValue();
        nextTick17(() => emit("change", currentDate.value));
      });
    };
    onMounted13(() => {
      updateColumnValue();
      nextTick17(updateInnerValue);
    });
    watch31(columns, updateColumnValue);
    watch31(currentDate, (value, oldValue) => emit("update:modelValue", oldValue ? value : null));
    watch31(() => [props.filter, props.minDate, props.maxDate], () => {
      nextTick17(updateInnerValue);
    });
    watch31(() => props.modelValue, (value) => {
      var _a;
      value = formatValue2(value);
      if (value && value.valueOf() !== ((_a = currentDate.value) == null ? void 0 : _a.valueOf())) {
        currentDate.value = value;
      }
    });
    useExpose({
      getPicker: () => picker.value && proxyPickerMethods(picker.value, updateInnerValue)
    });
    return () => _createVNode61(Picker, _mergeProps17({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerInheritKeys)), slots);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/datetime-picker/DatetimePicker.mjs
var [name59, bem54] = createNamespace("datetime-picker");
var timePickerPropKeys = Object.keys(stdin_default60.props);
var datePickerPropKeys = Object.keys(stdin_default61.props);
var datetimePickerProps = extend({}, stdin_default60.props, stdin_default61.props, {
  modelValue: [String, Date]
});
var stdin_default62 = defineComponent60({
  name: name59,
  props: datetimePickerProps,
  setup(props, {
    attrs,
    slots
  }) {
    const root = ref36();
    useExpose({
      getPicker: () => {
        var _a;
        return (_a = root.value) == null ? void 0 : _a.getPicker();
      }
    });
    return () => {
      const isTimePicker = props.type === "time";
      const Component = isTimePicker ? stdin_default60 : stdin_default61;
      const inheritProps = pick(props, isTimePicker ? timePickerPropKeys : datePickerPropKeys);
      return _createVNode62(Component, _mergeProps18({
        "ref": root,
        "class": bem54()
      }, inheritProps, attrs), slots);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/datetime-picker/index.mjs
var DatetimePicker = withInstall(stdin_default62);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dialog/function-call.mjs
import { createVNode as _createVNode64, mergeProps as _mergeProps20 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dialog/Dialog.mjs
import { mergeProps as _mergeProps19, createVNode as _createVNode63 } from "vue";
import { ref as ref37, reactive as reactive13, withKeys, defineComponent as defineComponent61 } from "vue";
var [name60, bem55, t13] = createNamespace("dialog");
var dialogProps = extend({}, popupSharedProps, {
  title: String,
  theme: String,
  width: numericProp,
  message: [String, Function],
  callback: Function,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp("van-dialog-bounce"),
  messageAlign: String,
  closeOnPopstate: truthProp,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showConfirmButton: truthProp,
  closeOnClickOverlay: Boolean
});
var popupInheritKeys2 = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
var stdin_default63 = defineComponent61({
  name: name60,
  props: dialogProps,
  emits: ["confirm", "cancel", "keydown", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref37();
    const loading = reactive13({
      confirm: false,
      cancel: false
    });
    const updateShow = (value) => emit("update:show", value);
    const close = (action) => {
      var _a;
      updateShow(false);
      (_a = props.callback) == null ? void 0 : _a.call(props, action);
    };
    const getActionHandler = (action) => () => {
      if (!props.show) {
        return;
      }
      emit(action);
      if (props.beforeClose) {
        loading[action] = true;
        callInterceptor(props.beforeClose, {
          args: [action],
          done() {
            close(action);
            loading[action] = false;
          },
          canceled() {
            loading[action] = false;
          }
        });
      } else {
        close(action);
      }
    };
    const onCancel = getActionHandler("cancel");
    const onConfirm = getActionHandler("confirm");
    const onKeydown = withKeys((event) => {
      var _a, _b;
      if (event.target !== ((_b = (_a = root.value) == null ? void 0 : _a.popupRef) == null ? void 0 : _b.value)) {
        return;
      }
      const onEventType = {
        Enter: props.showConfirmButton ? onConfirm : noop,
        Escape: props.showCancelButton ? onCancel : noop
      };
      onEventType[event.key]();
      emit("keydown", event);
    }, ["enter", "esc"]);
    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;
      if (title) {
        return _createVNode63("div", {
          "class": bem55("header", {
            isolated: !props.message && !slots.default
          })
        }, [title]);
      }
    };
    const renderMessage = (hasTitle) => {
      const {
        message,
        allowHtml,
        messageAlign
      } = props;
      const classNames = bem55("message", {
        "has-title": hasTitle,
        [messageAlign]: messageAlign
      });
      const content = isFunction(message) ? message() : message;
      if (allowHtml && typeof content === "string") {
        return _createVNode63("div", {
          "class": classNames,
          "innerHTML": content
        }, null);
      }
      return _createVNode63("div", {
        "class": classNames
      }, [content]);
    };
    const renderContent = () => {
      if (slots.default) {
        return _createVNode63("div", {
          "class": bem55("content")
        }, [slots.default()]);
      }
      const {
        title,
        message,
        allowHtml
      } = props;
      if (message) {
        const hasTitle = !!(title || slots.title);
        return _createVNode63("div", {
          "key": allowHtml ? 1 : 0,
          "class": bem55("content", {
            isolated: !hasTitle
          })
        }, [renderMessage(hasTitle)]);
      }
    };
    const renderButtons = () => _createVNode63("div", {
      "class": [BORDER_TOP, bem55("footer")]
    }, [props.showCancelButton && _createVNode63(Button, {
      "size": "large",
      "text": props.cancelButtonText || t13("cancel"),
      "class": bem55("cancel"),
      "style": {
        color: props.cancelButtonColor
      },
      "loading": loading.cancel,
      "disabled": props.cancelButtonDisabled,
      "onClick": onCancel
    }, null), props.showConfirmButton && _createVNode63(Button, {
      "size": "large",
      "text": props.confirmButtonText || t13("confirm"),
      "class": [bem55("confirm"), {
        [BORDER_LEFT]: props.showCancelButton
      }],
      "style": {
        color: props.confirmButtonColor
      },
      "loading": loading.confirm,
      "disabled": props.confirmButtonDisabled,
      "onClick": onConfirm
    }, null)]);
    const renderRoundButtons = () => _createVNode63(ActionBar, {
      "class": bem55("footer")
    }, {
      default: () => [props.showCancelButton && _createVNode63(ActionBarButton, {
        "type": "warning",
        "text": props.cancelButtonText || t13("cancel"),
        "class": bem55("cancel"),
        "color": props.cancelButtonColor,
        "loading": loading.cancel,
        "disabled": props.cancelButtonDisabled,
        "onClick": onCancel
      }, null), props.showConfirmButton && _createVNode63(ActionBarButton, {
        "type": "danger",
        "text": props.confirmButtonText || t13("confirm"),
        "class": bem55("confirm"),
        "color": props.confirmButtonColor,
        "loading": loading.confirm,
        "disabled": props.confirmButtonDisabled,
        "onClick": onConfirm
      }, null)]
    });
    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer();
      }
      return props.theme === "round-button" ? renderRoundButtons() : renderButtons();
    };
    return () => {
      const {
        width: width2,
        title,
        theme,
        message,
        className
      } = props;
      return _createVNode63(Popup, _mergeProps19({
        "ref": root,
        "role": "dialog",
        "class": [bem55([theme]), className],
        "style": {
          width: addUnit(width2)
        },
        "tabindex": 0,
        "aria-labelledby": title || message,
        "onKeydown": onKeydown,
        "onUpdate:show": updateShow
      }, pick(props, popupInheritKeys2)), {
        default: () => [renderTitle(), renderContent(), renderFooter()]
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dialog/function-call.mjs
var instance;
function initInstance() {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode64(stdin_default63, _mergeProps20(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = mountComponent(Wrapper));
}
function Dialog(options) {
  if (!inBrowser) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    instance.open(extend({}, Dialog.currentOptions, options, {
      callback: (action) => {
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
}
Dialog.defaultOptions = {
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  callback: null,
  teleport: "body",
  className: "",
  allowHtml: false,
  lockScroll: true,
  transition: void 0,
  beforeClose: null,
  overlayClass: "",
  overlayStyle: void 0,
  messageAlign: "",
  cancelButtonText: "",
  cancelButtonColor: null,
  cancelButtonDisabled: false,
  confirmButtonText: "",
  confirmButtonColor: null,
  confirmButtonDisabled: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
Dialog.currentOptions = extend({}, Dialog.defaultOptions);
Dialog.alert = Dialog;
Dialog.confirm = (options) => Dialog(extend({
  showCancelButton: true
}, options));
Dialog.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};
Dialog.setDefaultOptions = (options) => {
  extend(Dialog.currentOptions, options);
};
Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = extend({}, Dialog.defaultOptions);
};
Dialog.Component = withInstall(stdin_default63);
Dialog.install = (app) => {
  app.use(Dialog.Component);
  app.config.globalProperties.$dialog = Dialog;
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/divider/Divider.mjs
import { createVNode as _createVNode65 } from "vue";
import { defineComponent as defineComponent62 } from "vue";
var [name61, bem56] = createNamespace("divider");
var dividerProps = {
  dashed: Boolean,
  hairline: truthProp,
  contentPosition: makeStringProp("center")
};
var stdin_default64 = defineComponent62({
  name: name61,
  props: dividerProps,
  setup(props, {
    slots
  }) {
    return () => {
      var _a;
      return _createVNode65("div", {
        "role": "separator",
        "class": bem56({
          dashed: props.dashed,
          hairline: props.hairline,
          [`content-${props.contentPosition}`]: !!slots.default
        })
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/divider/index.mjs
var Divider = withInstall(stdin_default64);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dropdown-item/DropdownItem.mjs
import { withDirectives as _withDirectives8, vShow as _vShow7, createVNode as _createVNode67 } from "vue";
import { reactive as reactive14, Teleport as Teleport2, defineComponent as defineComponent64 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dropdown-menu/DropdownMenu.mjs
import { createVNode as _createVNode66 } from "vue";
import { ref as ref38, computed as computed34, defineComponent as defineComponent63 } from "vue";
var [name62, bem57] = createNamespace("dropdown-menu");
var dropdownMenuProps = {
  overlay: truthProp,
  zIndex: numericProp,
  duration: makeNumericProp(0.2),
  direction: makeStringProp("down"),
  activeColor: String,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp
};
var DROPDOWN_KEY = Symbol(name62);
var stdin_default65 = defineComponent63({
  name: name62,
  props: dropdownMenuProps,
  setup(props, {
    slots
  }) {
    const id = useId();
    const root = ref38();
    const barRef = ref38();
    const offset2 = ref38(0);
    const {
      children,
      linkChildren
    } = useChildren(DROPDOWN_KEY);
    const scrollParent = useScrollParent(root);
    const opened = computed34(() => children.some((item) => item.state.showWrapper));
    const barStyle = computed34(() => {
      if (opened.value && isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });
    const onClickAway = () => {
      if (props.closeOnClickOutside) {
        children.forEach((item) => {
          item.toggle(false);
        });
      }
    };
    const updateOffset = () => {
      if (barRef.value) {
        const rect = useRect(barRef);
        if (props.direction === "down") {
          offset2.value = rect.bottom;
        } else {
          offset2.value = windowHeight.value - rect.top;
        }
      }
    };
    const onScroll = () => {
      if (opened.value) {
        updateOffset();
      }
    };
    const toggleItem = (active) => {
      children.forEach((item, index) => {
        if (index === active) {
          updateOffset();
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    };
    const renderTitle = (item, index) => {
      const {
        showPopup
      } = item.state;
      const {
        disabled,
        titleClass
      } = item;
      return _createVNode66("div", {
        "id": `${id}-${index}`,
        "role": "button",
        "tabindex": disabled ? void 0 : 0,
        "class": [bem57("item", {
          disabled
        }), {
          [HAPTICS_FEEDBACK]: !disabled
        }],
        "onClick": () => {
          if (!disabled) {
            toggleItem(index);
          }
        }
      }, [_createVNode66("span", {
        "class": [bem57("title", {
          down: showPopup === (props.direction === "down"),
          active: showPopup
        }), titleClass],
        "style": {
          color: showPopup ? props.activeColor : ""
        }
      }, [_createVNode66("div", {
        "class": "van-ellipsis"
      }, [item.renderTitle()])])]);
    };
    linkChildren({
      id,
      props,
      offset: offset2
    });
    useClickAway(root, onClickAway);
    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      return _createVNode66("div", {
        "ref": root,
        "class": bem57()
      }, [_createVNode66("div", {
        "ref": barRef,
        "style": barStyle.value,
        "class": bem57("bar", {
          opened: opened.value
        })
      }, [children.map(renderTitle)]), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dropdown-item/DropdownItem.mjs
var [name63, bem58] = createNamespace("dropdown-item");
var dropdownItemProps = {
  title: String,
  options: makeArrayProp(),
  disabled: Boolean,
  teleport: [String, Object],
  lazyRender: truthProp,
  modelValue: unknownProp,
  titleClass: unknownProp
};
var stdin_default66 = defineComponent64({
  name: name63,
  props: dropdownItemProps,
  emits: ["open", "opened", "close", "closed", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const state = reactive14({
      showPopup: false,
      transition: true,
      showWrapper: false
    });
    const {
      parent,
      index
    } = useParent(DROPDOWN_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <DropdownItem> must be a child component of <DropdownMenu>.");
      }
      return;
    }
    const getEmitter = (name210) => () => emit(name210);
    const onOpen = getEmitter("open");
    const onClose = getEmitter("close");
    const onOpened = getEmitter("opened");
    const onClosed = () => {
      state.showWrapper = false;
      emit("closed");
    };
    const onClickWrapper = (event) => {
      if (props.teleport) {
        event.stopPropagation();
      }
    };
    const toggle = (show = !state.showPopup, options = {}) => {
      if (show === state.showPopup) {
        return;
      }
      state.showPopup = show;
      state.transition = !options.immediate;
      if (show) {
        state.showWrapper = true;
      }
    };
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return props.title;
      }
      const match = props.options.find((option) => option.value === props.modelValue);
      return match ? match.text : "";
    };
    const renderOption = (option) => {
      const {
        activeColor
      } = parent.props;
      const active = option.value === props.modelValue;
      const onClick = () => {
        state.showPopup = false;
        if (option.value !== props.modelValue) {
          emit("update:modelValue", option.value);
          emit("change", option.value);
        }
      };
      const renderIcon = () => {
        if (active) {
          return _createVNode67(Icon, {
            "class": bem58("icon"),
            "color": activeColor,
            "name": "success"
          }, null);
        }
      };
      return _createVNode67(Cell, {
        "role": "menuitem",
        "key": option.value,
        "icon": option.icon,
        "title": option.text,
        "class": bem58("option", {
          active
        }),
        "style": {
          color: active ? activeColor : ""
        },
        "tabindex": active ? 0 : -1,
        "clickable": true,
        "onClick": onClick
      }, {
        value: renderIcon
      });
    };
    const renderContent = () => {
      const {
        offset: offset2
      } = parent;
      const {
        zIndex,
        overlay,
        duration,
        direction,
        closeOnClickOverlay
      } = parent.props;
      const style = getZIndexStyle(zIndex);
      if (direction === "down") {
        style.top = `${offset2.value}px`;
      } else {
        style.bottom = `${offset2.value}px`;
      }
      return _withDirectives8(_createVNode67("div", {
        "style": style,
        "class": bem58([direction]),
        "onClick": onClickWrapper
      }, [_createVNode67(Popup, {
        "show": state.showPopup,
        "onUpdate:show": ($event) => state.showPopup = $event,
        "role": "menu",
        "class": bem58("content"),
        "overlay": overlay,
        "position": direction === "down" ? "top" : "bottom",
        "duration": state.transition ? duration : 0,
        "lazyRender": props.lazyRender,
        "overlayStyle": {
          position: "absolute"
        },
        "aria-labelledby": `${parent.id}-${index.value}`,
        "closeOnClickOverlay": closeOnClickOverlay,
        "onOpen": onOpen,
        "onClose": onClose,
        "onOpened": onOpened,
        "onClosed": onClosed
      }, {
        default: () => {
          var _a;
          return [props.options.map(renderOption), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      })]), [[_vShow7, state.showWrapper]]);
    };
    useExpose({
      state,
      toggle,
      renderTitle
    });
    return () => {
      if (props.teleport) {
        return _createVNode67(Teleport2, {
          "to": props.teleport
        }, {
          default: () => [renderContent()]
        });
      }
      return renderContent();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dropdown-item/index.mjs
var DropdownItem = withInstall(stdin_default66);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/dropdown-menu/index.mjs
var DropdownMenu = withInstall(stdin_default65);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/grid/Grid.mjs
import { createVNode as _createVNode68 } from "vue";
import { defineComponent as defineComponent65 } from "vue";
var [name64, bem59] = createNamespace("grid");
var gridProps = {
  square: Boolean,
  center: truthProp,
  border: truthProp,
  gutter: numericProp,
  reverse: Boolean,
  iconSize: numericProp,
  direction: String,
  clickable: Boolean,
  columnNum: makeNumericProp(4)
};
var GRID_KEY = Symbol(name64);
var stdin_default67 = defineComponent65({
  name: name64,
  props: gridProps,
  setup(props, {
    slots
  }) {
    const {
      linkChildren
    } = useChildren(GRID_KEY);
    linkChildren({
      props
    });
    return () => {
      var _a;
      return _createVNode68("div", {
        "style": {
          paddingLeft: addUnit(props.gutter)
        },
        "class": [bem59(), {
          [BORDER_TOP]: props.border && !props.gutter
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/grid/index.mjs
var Grid = withInstall(stdin_default67);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/grid-item/GridItem.mjs
import { createVNode as _createVNode69, mergeProps as _mergeProps21 } from "vue";
import { computed as computed35, defineComponent as defineComponent66 } from "vue";
var [name65, bem60] = createNamespace("grid-item");
var gridItemProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  badge: numericProp,
  iconColor: String,
  iconPrefix: String,
  badgeProps: Object
});
var stdin_default68 = defineComponent66({
  name: name65,
  props: gridItemProps,
  setup(props, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(GRID_KEY);
    const route2 = useRoute();
    if (!parent) {
      if (true) {
        console.error("[Vant] <GridItem> must be a child component of <Grid>.");
      }
      return;
    }
    const rootStyle = computed35(() => {
      const {
        square,
        gutter,
        columnNum
      } = parent.props;
      const percent = `${100 / +columnNum}%`;
      const style = {
        flexBasis: percent
      };
      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        const gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;
        if (index.value >= columnNum) {
          style.marginTop = gutterValue;
        }
      }
      return style;
    });
    const contentStyle = computed35(() => {
      const {
        square,
        gutter
      } = parent.props;
      if (square && gutter) {
        const gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    });
    const renderIcon = () => {
      if (slots.icon) {
        return _createVNode69(Badge, _mergeProps21({
          "dot": props.dot,
          "content": props.badge
        }, props.badgeProps), {
          default: slots.icon
        });
      }
      if (props.icon) {
        return _createVNode69(Icon, {
          "dot": props.dot,
          "name": props.icon,
          "size": parent.props.iconSize,
          "badge": props.badge,
          "class": bem60("icon"),
          "color": props.iconColor,
          "badgeProps": props.badgeProps,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      if (slots.text) {
        return slots.text();
      }
      if (props.text) {
        return _createVNode69("span", {
          "class": bem60("text")
        }, [props.text]);
      }
    };
    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      return [renderIcon(), renderText()];
    };
    return () => {
      const {
        center,
        border,
        square,
        gutter,
        reverse,
        direction,
        clickable
      } = parent.props;
      const classes = [bem60("content", [direction, {
        center,
        square,
        reverse,
        clickable,
        surround: border && gutter
      }]), {
        [BORDER]: border
      }];
      return _createVNode69("div", {
        "class": [bem60({
          square
        })],
        "style": rootStyle.value
      }, [_createVNode69("div", {
        "role": clickable ? "button" : void 0,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route2
      }, [renderContent()])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/grid-item/index.mjs
var GridItem = withInstall(stdin_default68);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image-preview/function-call.mjs
import { createVNode as _createVNode72, mergeProps as _mergeProps23 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image-preview/ImagePreview.mjs
import { mergeProps as _mergeProps22, createVNode as _createVNode71 } from "vue";
import { ref as ref40, watch as watch33, nextTick as nextTick18, reactive as reactive16, onMounted as onMounted14, defineComponent as defineComponent68 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image-preview/ImagePreviewItem.mjs
import { createVNode as _createVNode70 } from "vue";
import { ref as ref39, watch as watch32, computed as computed36, reactive as reactive15, defineComponent as defineComponent67 } from "vue";
var getDistance = (touches) => Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);
var bem61 = createNamespace("image-preview")[1];
var stdin_default69 = defineComponent67({
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: makeRequiredProp(numericProp),
    maxZoom: makeRequiredProp(numericProp),
    rootWidth: makeRequiredProp(Number),
    rootHeight: makeRequiredProp(Number)
  },
  emits: ["scale", "close"],
  setup(props, {
    emit,
    slots
  }) {
    const state = reactive15({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    });
    const touch = useTouch();
    const swipeItem = ref39();
    const vertical = computed36(() => {
      const {
        rootWidth,
        rootHeight
      } = props;
      const rootRatio = rootHeight / rootWidth;
      return state.imageRatio > rootRatio;
    });
    const imageStyle = computed36(() => {
      const {
        scale,
        moveX,
        moveY,
        moving,
        zooming
      } = state;
      const style = {
        transitionDuration: zooming || moving ? "0s" : ".3s"
      };
      if (scale !== 1) {
        const offsetX = moveX / scale;
        const offsetY = moveY / scale;
        style.transform = `scale(${scale}, ${scale}) translate(${offsetX}px, ${offsetY}px)`;
      }
      return style;
    });
    const maxMoveX = computed36(() => {
      if (state.imageRatio) {
        const {
          rootWidth,
          rootHeight
        } = props;
        const displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }
      return 0;
    });
    const maxMoveY = computed36(() => {
      if (state.imageRatio) {
        const {
          rootWidth,
          rootHeight
        } = props;
        const displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }
      return 0;
    });
    const setScale = (scale) => {
      scale = clamp(scale, +props.minZoom, +props.maxZoom + 1);
      if (scale !== state.scale) {
        state.scale = scale;
        emit("scale", {
          scale,
          index: props.active
        });
      }
    };
    const resetScale = () => {
      setScale(1);
      state.moveX = 0;
      state.moveY = 0;
    };
    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;
      setScale(scale);
      state.moveX = 0;
      state.moveY = 0;
    };
    let fingerNum;
    let startMoveX;
    let startMoveY;
    let startScale;
    let startDistance;
    let doubleTapTimer;
    let touchStartTime;
    const onTouchStart = (event) => {
      const {
        touches
      } = event;
      const {
        offsetX
      } = touch;
      touch.start(event);
      fingerNum = touches.length;
      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = Date.now();
      state.moving = fingerNum === 1 && state.scale !== 1;
      state.zooming = fingerNum === 2 && !offsetX.value;
      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(event.touches);
      }
    };
    const onTouchMove = (event) => {
      const {
        touches
      } = event;
      touch.move(event);
      if (state.moving || state.zooming) {
        preventDefault(event, true);
      }
      if (state.moving) {
        const {
          deltaX,
          deltaY
        } = touch;
        const moveX = deltaX.value + startMoveX;
        const moveY = deltaY.value + startMoveY;
        state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
      }
      if (state.zooming && touches.length === 2) {
        const distance = getDistance(touches);
        const scale = startScale * distance / startDistance;
        setScale(scale);
      }
    };
    const checkTap = () => {
      if (fingerNum > 1) {
        return;
      }
      const {
        offsetX,
        offsetY
      } = touch;
      const deltaTime = Date.now() - touchStartTime;
      const TAP_TIME = 250;
      const TAP_OFFSET = 5;
      if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (doubleTapTimer) {
          clearTimeout(doubleTapTimer);
          doubleTapTimer = null;
          toggleScale();
        } else {
          doubleTapTimer = setTimeout(() => {
            emit("close");
            doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    };
    const onTouchEnd = (event) => {
      let stopPropagation2 = false;
      if (state.moving || state.zooming) {
        stopPropagation2 = true;
        if (state.moving && startMoveX === state.moveX && startMoveY === state.moveY) {
          stopPropagation2 = false;
        }
        if (!event.touches.length) {
          if (state.zooming) {
            state.moveX = clamp(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = clamp(state.moveY, -maxMoveY.value, maxMoveY.value);
            state.zooming = false;
          }
          state.moving = false;
          startMoveX = 0;
          startMoveY = 0;
          startScale = 1;
          if (state.scale < 1) {
            resetScale();
          }
          if (state.scale > props.maxZoom) {
            state.scale = +props.maxZoom;
          }
        }
      }
      preventDefault(event, stopPropagation2);
      checkTap();
      touch.reset();
    };
    const onLoad = (event) => {
      const {
        naturalWidth,
        naturalHeight
      } = event.target;
      state.imageRatio = naturalHeight / naturalWidth;
    };
    watch32(() => props.active, resetScale);
    watch32(() => props.show, (value) => {
      if (!value) {
        resetScale();
      }
    });
    useEventListener("touchmove", onTouchMove, {
      target: computed36(() => {
        var _a;
        return (_a = swipeItem.value) == null ? void 0 : _a.$el;
      })
    });
    return () => {
      const imageSlots = {
        loading: () => _createVNode70(Loading, {
          "type": "spinner"
        }, null)
      };
      return _createVNode70(SwipeItem, {
        "ref": swipeItem,
        "class": bem61("swipe-item"),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, {
        default: () => [slots.image ? _createVNode70("div", {
          "class": bem61("image-wrap")
        }, [slots.image({
          src: props.src
        })]) : _createVNode70(Image2, {
          "src": props.src,
          "fit": "contain",
          "class": bem61("image", {
            vertical: vertical.value
          }),
          "style": imageStyle.value,
          "onLoad": onLoad
        }, imageSlots)]
      });
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image-preview/ImagePreview.mjs
var [name66, bem62] = createNamespace("image-preview");
var popupProps2 = ["show", "transition", "overlayStyle", "closeOnPopstate"];
var imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp("clear"),
  transition: String,
  beforeClose: Function,
  overlayClass: unknownProp,
  overlayStyle: Object,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeIconPosition: makeStringProp("top-right")
};
var stdin_default70 = defineComponent68({
  name: name66,
  props: imagePreviewProps,
  emits: ["scale", "close", "closed", "change", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const swipeRef = ref40();
    const state = reactive16({
      active: 0,
      rootWidth: 0,
      rootHeight: 0
    });
    const resize = () => {
      if (swipeRef.value) {
        const rect = useRect(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };
    const emitScale = (args) => emit("scale", args);
    const updateShow = (show) => emit("update:show", show);
    const emitClose = () => {
      callInterceptor(props.beforeClose, {
        args: [state.active],
        done: () => updateShow(false)
      });
    };
    const setActive = (active) => {
      if (active !== state.active) {
        state.active = active;
        emit("change", active);
      }
    };
    const renderIndex = () => {
      if (props.showIndex) {
        return _createVNode71("div", {
          "class": bem62("index")
        }, [slots.index ? slots.index({
          index: state.active
        }) : `${state.active + 1} / ${props.images.length}`]);
      }
    };
    const renderCover = () => {
      if (slots.cover) {
        return _createVNode71("div", {
          "class": bem62("cover")
        }, [slots.cover()]);
      }
    };
    const renderImages = () => _createVNode71(Swipe, {
      "ref": swipeRef,
      "lazyRender": true,
      "loop": props.loop,
      "class": bem62("swipe"),
      "duration": props.swipeDuration,
      "initialSwipe": props.startPosition,
      "showIndicators": props.showIndicators,
      "indicatorColor": "white",
      "onChange": setActive
    }, {
      default: () => [props.images.map((image) => _createVNode71(stdin_default69, {
        "src": image,
        "show": props.show,
        "active": state.active,
        "maxZoom": props.maxZoom,
        "minZoom": props.minZoom,
        "rootWidth": state.rootWidth,
        "rootHeight": state.rootHeight,
        "onScale": emitScale,
        "onClose": emitClose
      }, {
        image: slots.image
      }))]
    });
    const renderClose = () => {
      if (props.closeable) {
        return _createVNode71(Icon, {
          "role": "button",
          "name": props.closeIcon,
          "class": [bem62("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
          "onClick": emitClose
        }, null);
      }
    };
    const onClosed = () => emit("closed");
    const swipeTo = (index, options) => {
      var _a;
      return (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(index, options);
    };
    useExpose({
      swipeTo
    });
    onMounted14(resize);
    watch33([windowWidth, windowHeight], resize);
    watch33(() => props.startPosition, (value) => setActive(+value));
    watch33(() => props.show, (value) => {
      const {
        images,
        startPosition
      } = props;
      if (value) {
        setActive(+startPosition);
        nextTick18(() => {
          resize();
          swipeTo(+startPosition, {
            immediate: true
          });
        });
      } else {
        emit("close", {
          index: state.active,
          url: images[state.active]
        });
      }
    });
    return () => _createVNode71(Popup, _mergeProps22({
      "class": [bem62(), props.className],
      "overlayClass": [bem62("overlay"), props.overlayClass],
      "onClosed": onClosed,
      "onUpdate:show": updateShow
    }, pick(props, popupProps2)), {
      default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/image-preview/function-call.mjs
var instance2;
var defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: void 0,
  onClose: void 0,
  onChange: void 0,
  teleport: "body",
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: "clear",
  transition: void 0,
  beforeClose: void 0,
  overlayStyle: void 0,
  overlayClass: void 0,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: "top-right"
};
function initInstance2() {
  ({
    instance: instance2
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      const onClosed = () => {
        state.images = [];
      };
      return () => _createVNode72(stdin_default70, _mergeProps23(state, {
        "onClosed": onClosed,
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
var ImagePreview = (options, startPosition = 0) => {
  if (!inBrowser) {
    return;
  }
  if (!instance2) {
    initInstance2();
  }
  options = Array.isArray(options) ? {
    images: options,
    startPosition
  } : options;
  instance2.open(extend({}, defaultConfig, options));
  return instance2;
};
ImagePreview.Component = withInstall(stdin_default70);
ImagePreview.install = (app) => {
  app.use(ImagePreview.Component);
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/index-anchor/IndexAnchor.mjs
import { createVNode as _createVNode74 } from "vue";
import { ref as ref42, reactive as reactive17, computed as computed38, defineComponent as defineComponent70 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/index-bar/IndexBar.mjs
import { createVNode as _createVNode73 } from "vue";
import { ref as ref41, watch as watch34, computed as computed37, nextTick as nextTick19, Teleport as Teleport3, onMounted as onMounted15, defineComponent as defineComponent69 } from "vue";
function genAlphabet() {
  const charCodeOfA = "A".charCodeAt(0);
  const indexList = Array(26).fill("").map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}
var [name67, bem63] = createNamespace("index-bar");
var indexBarProps = {
  sticky: truthProp,
  zIndex: numericProp,
  teleport: [String, Object],
  highlightColor: String,
  stickyOffsetTop: makeNumberProp(0),
  indexList: {
    type: Array,
    default: genAlphabet
  }
};
var INDEX_BAR_KEY = Symbol(name67);
var stdin_default71 = defineComponent69({
  name: name67,
  props: indexBarProps,
  emits: ["select", "change"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref41();
    const sidebar = ref41();
    const activeAnchor = ref41("");
    const touch = useTouch();
    const scrollParent = useScrollParent(root);
    const {
      children,
      linkChildren
    } = useChildren(INDEX_BAR_KEY);
    let selectActiveIndex;
    linkChildren({
      props
    });
    const sidebarStyle = computed37(() => {
      if (isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });
    const highlightStyle = computed37(() => {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });
    const getActiveAnchor = (scrollTop, rects) => {
      for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;
        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    };
    const getMatchAnchor = (index) => children.find((item) => String(item.index) === index);
    const onScroll = () => {
      if (isHidden(root)) {
        return;
      }
      const {
        sticky,
        indexList
      } = props;
      const scrollTop = getScrollTop(scrollParent.value);
      const scrollParentRect = useRect(scrollParent);
      const rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));
      let active = -1;
      if (selectActiveIndex) {
        const match = getMatchAnchor(selectActiveIndex);
        if (match) {
          const rect = match.getRect(scrollParent.value, scrollParentRect);
          active = getActiveAnchor(rect.top, rects);
        }
      } else {
        active = getActiveAnchor(scrollTop, rects);
      }
      activeAnchor.value = indexList[active];
      if (sticky) {
        children.forEach((item, index) => {
          const {
            state,
            $el
          } = item;
          if (index === active || index === active - 1) {
            const rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }
          if (index === active) {
            state.active = true;
            state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1 && selectActiveIndex === "") {
            const activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
      selectActiveIndex = "";
    };
    const init = () => {
      nextTick19(onScroll);
    };
    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    onMounted15(init);
    watch34(() => props.indexList, init);
    watch34(activeAnchor, (value) => {
      if (value) {
        emit("change", value);
      }
    });
    const renderIndexes = () => props.indexList.map((index) => {
      const active = index === activeAnchor.value;
      return _createVNode73("span", {
        "class": bem63("index", {
          active
        }),
        "style": active ? highlightStyle.value : void 0,
        "data-index": index
      }, [index]);
    });
    const scrollTo = (index) => {
      selectActiveIndex = String(index);
      const match = getMatchAnchor(selectActiveIndex);
      if (match) {
        const scrollTop = getScrollTop(scrollParent.value);
        const scrollParentRect = useRect(scrollParent);
        const {
          offsetHeight
        } = document.documentElement;
        match.$el.scrollIntoView();
        if (scrollTop === offsetHeight - scrollParentRect.height) {
          onScroll();
          return;
        }
        if (props.sticky && props.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }
        emit("select", match.index);
      }
    };
    const scrollToElement = (element) => {
      const {
        index
      } = element.dataset;
      if (index) {
        scrollTo(index);
      }
    };
    const onClickSidebar = (event) => {
      scrollToElement(event.target);
    };
    let touchActiveIndex;
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.isVertical()) {
        preventDefault(event);
        const {
          clientX,
          clientY
        } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const {
            index
          } = target.dataset;
          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };
    const renderSidebar = () => _createVNode73("div", {
      "ref": sidebar,
      "class": bem63("sidebar"),
      "style": sidebarStyle.value,
      "onClick": onClickSidebar,
      "onTouchstartPassive": touch.start
    }, [renderIndexes()]);
    useExpose({
      scrollTo
    });
    useEventListener("touchmove", onTouchMove, {
      target: sidebar
    });
    return () => {
      var _a;
      return _createVNode73("div", {
        "ref": root,
        "class": bem63()
      }, [props.teleport ? _createVNode73(Teleport3, {
        "to": props.teleport
      }, {
        default: () => [renderSidebar()]
      }) : renderSidebar(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/index-anchor/IndexAnchor.mjs
var [name68, bem64] = createNamespace("index-anchor");
var indexAnchorProps = {
  index: numericProp
};
var stdin_default72 = defineComponent70({
  name: name68,
  props: indexAnchorProps,
  setup(props, {
    slots
  }) {
    const state = reactive17({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    const root = ref42();
    const {
      parent
    } = useParent(INDEX_BAR_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <IndexAnchor> must be a child component of <IndexBar>.");
      }
      return;
    }
    const isSticky = () => state.active && parent.props.sticky;
    const anchorStyle = computed38(() => {
      const {
        zIndex,
        highlightColor
      } = parent.props;
      if (isSticky()) {
        return extend(getZIndexStyle(zIndex), {
          left: state.left ? `${state.left}px` : void 0,
          width: state.width ? `${state.width}px` : void 0,
          transform: state.top ? `translate3d(0, ${state.top}px, 0)` : void 0,
          color: highlightColor
        });
      }
    });
    const getRect = (scrollParent, scrollParentRect) => {
      const rootRect = useRect(root);
      state.rect.height = rootRect.height;
      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }
      return state.rect;
    };
    useExpose({
      state,
      getRect
    });
    return () => {
      const sticky = isSticky();
      return _createVNode74("div", {
        "ref": root,
        "style": {
          height: sticky ? `${state.rect.height}px` : void 0
        }
      }, [_createVNode74("div", {
        "style": anchorStyle.value,
        "class": [bem64({
          sticky
        }), {
          [BORDER_BOTTOM]: sticky
        }]
      }, [slots.default ? slots.default() : props.index])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/index-anchor/index.mjs
var IndexAnchor = withInstall(stdin_default72);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/index-bar/index.mjs
var IndexBar = withInstall(stdin_default71);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/list/List.mjs
import { createVNode as _createVNode75 } from "vue";
import { ref as ref43, watch as watch35, nextTick as nextTick20, onUpdated, onMounted as onMounted16, defineComponent as defineComponent71 } from "vue";
var [name69, bem65, t14] = createNamespace("list");
var listProps = {
  error: Boolean,
  offset: makeNumericProp(300),
  loading: Boolean,
  finished: Boolean,
  errorText: String,
  direction: makeStringProp("down"),
  loadingText: String,
  finishedText: String,
  immediateCheck: truthProp
};
var stdin_default73 = defineComponent71({
  name: name69,
  props: listProps,
  emits: ["load", "update:error", "update:loading"],
  setup(props, {
    emit,
    slots
  }) {
    const loading = ref43(props.loading);
    const root = ref43();
    const placeholder = ref43();
    const tabStatus = useTabStatus();
    const scrollParent = useScrollParent(root);
    const check = () => {
      nextTick20(() => {
        if (loading.value || props.finished || props.error || (tabStatus == null ? void 0 : tabStatus.value) === false) {
          return;
        }
        const {
          offset: offset2,
          direction
        } = props;
        const scrollParentRect = useRect(scrollParent);
        if (!scrollParentRect.height || isHidden(root)) {
          return;
        }
        let isReachEdge = false;
        const placeholderRect = useRect(placeholder);
        if (direction === "up") {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset2;
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset2;
        }
        if (isReachEdge) {
          loading.value = true;
          emit("update:loading", true);
          emit("load");
        }
      });
    };
    const renderFinishedText = () => {
      if (props.finished) {
        const text = slots.finished ? slots.finished() : props.finishedText;
        if (text) {
          return _createVNode75("div", {
            "class": bem65("finished-text")
          }, [text]);
        }
      }
    };
    const clickErrorText = () => {
      emit("update:error", false);
      check();
    };
    const renderErrorText = () => {
      if (props.error) {
        const text = slots.error ? slots.error() : props.errorText;
        if (text) {
          return _createVNode75("div", {
            "role": "button",
            "class": bem65("error-text"),
            "tabindex": 0,
            "onClick": clickErrorText
          }, [text]);
        }
      }
    };
    const renderLoading = () => {
      if (loading.value && !props.finished) {
        return _createVNode75("div", {
          "class": bem65("loading")
        }, [slots.loading ? slots.loading() : _createVNode75(Loading, {
          "class": bem65("loading-icon")
        }, {
          default: () => [props.loadingText || t14("loading")]
        })]);
      }
    };
    watch35(() => [props.loading, props.finished, props.error], check);
    if (tabStatus) {
      watch35(tabStatus, (tabActive) => {
        if (tabActive) {
          check();
        }
      });
    }
    onUpdated(() => {
      loading.value = props.loading;
    });
    onMounted16(() => {
      if (props.immediateCheck) {
        check();
      }
    });
    useExpose({
      check
    });
    useEventListener("scroll", check, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const Placeholder = _createVNode75("div", {
        "ref": placeholder,
        "class": bem65("placeholder")
      }, null);
      return _createVNode75("div", {
        "ref": root,
        "role": "feed",
        "class": bem65(),
        "aria-busy": loading.value
      }, [props.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === "up" ? Content : Placeholder]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/list/index.mjs
var List = withInstall(stdin_default73);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/nav-bar/NavBar.mjs
import { createVNode as _createVNode76 } from "vue";
import { ref as ref44, defineComponent as defineComponent72 } from "vue";
var [name70, bem66] = createNamespace("nav-bar");
var navBarProps = {
  title: String,
  fixed: Boolean,
  zIndex: numericProp,
  border: truthProp,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean
};
var stdin_default74 = defineComponent72({
  name: name70,
  props: navBarProps,
  emits: ["click-left", "click-right"],
  setup(props, {
    emit,
    slots
  }) {
    const navBarRef = ref44();
    const renderPlaceholder = usePlaceholder(navBarRef, bem66);
    const onClickLeft = (event) => emit("click-left", event);
    const onClickRight = (event) => emit("click-right", event);
    const renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }
      return [props.leftArrow && _createVNode76(Icon, {
        "class": bem66("arrow"),
        "name": "arrow-left"
      }, null), props.leftText && _createVNode76("span", {
        "class": bem66("text")
      }, [props.leftText])];
    };
    const renderRight = () => {
      if (slots.right) {
        return slots.right();
      }
      return _createVNode76("span", {
        "class": bem66("text")
      }, [props.rightText]);
    };
    const renderNavBar = () => {
      const {
        title,
        fixed,
        border,
        zIndex
      } = props;
      const style = getZIndexStyle(zIndex);
      const hasLeft = props.leftArrow || props.leftText || slots.left;
      const hasRight = props.rightText || slots.right;
      return _createVNode76("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem66({
          fixed
        }), {
          [BORDER_BOTTOM]: border,
          "van-safe-area-top": props.safeAreaInsetTop
        }]
      }, [_createVNode76("div", {
        "class": bem66("content")
      }, [hasLeft && _createVNode76("div", {
        "class": [bem66("left"), HAPTICS_FEEDBACK],
        "onClick": onClickLeft
      }, [renderLeft()]), _createVNode76("div", {
        "class": [bem66("title"), "van-ellipsis"]
      }, [slots.title ? slots.title() : title]), hasRight && _createVNode76("div", {
        "class": [bem66("right"), HAPTICS_FEEDBACK],
        "onClick": onClickRight
      }, [renderRight()])])]);
    };
    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }
      return renderNavBar();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/nav-bar/index.mjs
var NavBar = withInstall(stdin_default74);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/notice-bar/NoticeBar.mjs
import { withDirectives as _withDirectives9, vShow as _vShow8, createVNode as _createVNode77 } from "vue";
import { ref as ref45, watch as watch36, reactive as reactive18, defineComponent as defineComponent73 } from "vue";
var [name71, bem67] = createNamespace("notice-bar");
var noticeBarProps = {
  text: String,
  mode: String,
  color: String,
  delay: makeNumericProp(1),
  speed: makeNumericProp(60),
  leftIcon: String,
  wrapable: Boolean,
  background: String,
  scrollable: {
    type: Boolean,
    default: null
  }
};
var stdin_default75 = defineComponent73({
  name: name71,
  props: noticeBarProps,
  emits: ["close", "replay"],
  setup(props, {
    emit,
    slots
  }) {
    let wrapWidth = 0;
    let contentWidth = 0;
    let startTimer;
    const wrapRef = ref45();
    const contentRef = ref45();
    const state = reactive18({
      show: true,
      offset: 0,
      duration: 0
    });
    const renderLeftIcon = () => {
      if (slots["left-icon"]) {
        return slots["left-icon"]();
      }
      if (props.leftIcon) {
        return _createVNode77(Icon, {
          "class": bem67("left-icon"),
          "name": props.leftIcon
        }, null);
      }
    };
    const getRightIconName = () => {
      if (props.mode === "closeable") {
        return "cross";
      }
      if (props.mode === "link") {
        return "arrow";
      }
    };
    const onClickRightIcon = (event) => {
      if (props.mode === "closeable") {
        state.show = false;
        emit("close", event);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      const name210 = getRightIconName();
      if (name210) {
        return _createVNode77(Icon, {
          "name": name210,
          "class": bem67("right-icon"),
          "onClick": onClickRightIcon
        }, null);
      }
    };
    const onTransitionEnd = () => {
      state.offset = wrapWidth;
      state.duration = 0;
      raf(() => {
        doubleRaf(() => {
          state.offset = -contentWidth;
          state.duration = (contentWidth + wrapWidth) / +props.speed;
          emit("replay");
        });
      });
    };
    const renderMarquee = () => {
      const ellipsis = props.scrollable === false && !props.wrapable;
      const style = {
        transform: state.offset ? `translateX(${state.offset}px)` : "",
        transitionDuration: `${state.duration}s`
      };
      return _createVNode77("div", {
        "ref": wrapRef,
        "role": "marquee",
        "class": bem67("wrap")
      }, [_createVNode77("div", {
        "ref": contentRef,
        "style": style,
        "class": [bem67("content"), {
          "van-ellipsis": ellipsis
        }],
        "onTransitionend": onTransitionEnd
      }, [slots.default ? slots.default() : props.text])]);
    };
    const reset = () => {
      const {
        delay,
        speed,
        scrollable
      } = props;
      const ms = isDef(delay) ? +delay * 1e3 : 0;
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
      clearTimeout(startTimer);
      startTimer = setTimeout(() => {
        if (!wrapRef.value || !contentRef.value || scrollable === false) {
          return;
        }
        const wrapRefWidth = useRect(wrapRef).width;
        const contentRefWidth = useRect(contentRef).width;
        if (scrollable || contentRefWidth > wrapRefWidth) {
          doubleRaf(() => {
            wrapWidth = wrapRefWidth;
            contentWidth = contentRefWidth;
            state.offset = -contentWidth;
            state.duration = contentWidth / +speed;
          });
        }
      }, ms);
    };
    onPopupReopen(reset);
    onMountedOrActivated(reset);
    useEventListener("pageshow", reset);
    useExpose({
      reset
    });
    watch36(() => [props.text, props.scrollable], reset);
    return () => {
      const {
        color,
        wrapable,
        background
      } = props;
      return _withDirectives9(_createVNode77("div", {
        "role": "alert",
        "class": bem67({
          wrapable
        }),
        "style": {
          color,
          background
        }
      }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[_vShow8, state.show]]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/notice-bar/index.mjs
var NoticeBar = withInstall(stdin_default75);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/notify/function-call.mjs
import { createVNode as _createVNode79, mergeProps as _mergeProps24 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/notify/Notify.mjs
import { createVNode as _createVNode78 } from "vue";
import { defineComponent as defineComponent74 } from "vue";
var [name72, bem68] = createNamespace("notify");
var notifyProps = extend({}, popupSharedProps, {
  type: makeStringProp("danger"),
  color: String,
  message: numericProp,
  position: makeStringProp("top"),
  className: unknownProp,
  background: String,
  lockScroll: Boolean
});
var stdin_default76 = defineComponent74({
  name: name72,
  props: notifyProps,
  emits: ["update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const updateShow = (show) => emit("update:show", show);
    return () => _createVNode78(Popup, {
      "show": props.show,
      "class": [bem68([props.type]), props.className],
      "style": {
        color: props.color,
        background: props.background
      },
      "overlay": false,
      "position": props.position,
      "duration": 0.2,
      "lockScroll": props.lockScroll,
      "onUpdate:show": updateShow
    }, {
      default: () => [slots.default ? slots.default() : props.message]
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/notify/function-call.mjs
var timer;
var instance3;
var parseOptions2 = (message) => isObject(message) ? message : {
  message
};
function initInstance3() {
  ({
    instance: instance3
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode79(stdin_default76, _mergeProps24(state, {
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
function Notify(options) {
  if (!inBrowser) {
    return;
  }
  if (!instance3) {
    initInstance3();
  }
  options = extend({}, Notify.currentOptions, parseOptions2(options));
  instance3.open(options);
  clearTimeout(timer);
  if (options.duration > 0) {
    timer = window.setTimeout(Notify.clear, options.duration);
  }
  return instance3;
}
var getDefaultOptions = () => ({
  type: "danger",
  color: void 0,
  message: "",
  onClose: void 0,
  onClick: void 0,
  onOpened: void 0,
  duration: 3e3,
  position: void 0,
  className: "",
  lockScroll: false,
  background: void 0
});
Notify.clear = () => {
  if (instance3) {
    instance3.toggle(false);
  }
};
Notify.currentOptions = getDefaultOptions();
Notify.setDefaultOptions = (options) => {
  extend(Notify.currentOptions, options);
};
Notify.resetDefaultOptions = () => {
  Notify.currentOptions = getDefaultOptions();
};
Notify.Component = withInstall(stdin_default76);
Notify.install = (app) => {
  app.use(Notify.Component);
  app.config.globalProperties.$notify = Notify;
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/number-keyboard/NumberKeyboard.mjs
import { withDirectives as _withDirectives10, mergeProps as _mergeProps25, vShow as _vShow9, createVNode as _createVNode81 } from "vue";
import { ref as ref47, watch as watch37, computed as computed39, Teleport as Teleport4, Transition as Transition4, defineComponent as defineComponent76 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/number-keyboard/NumberKeyboardKey.mjs
import { createVNode as _createVNode80 } from "vue";
import { ref as ref46, defineComponent as defineComponent75 } from "vue";
var [name73, bem69] = createNamespace("key");
var CollapseIcon = _createVNode80("svg", {
  "class": bem69("collapse-icon"),
  "viewBox": "0 0 30 24"
}, [_createVNode80("path", {
  "d": "M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",
  "fill": "currentColor"
}, null)]);
var DeleteIcon = _createVNode80("svg", {
  "class": bem69("delete-icon"),
  "viewBox": "0 0 32 22"
}, [_createVNode80("path", {
  "d": "M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",
  "fill": "currentColor"
}, null)]);
var stdin_default77 = defineComponent75({
  name: name73,
  props: {
    type: String,
    text: numericProp,
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  emits: ["press"],
  setup(props, {
    emit,
    slots
  }) {
    const active = ref46(false);
    const touch = useTouch();
    const onTouchStart = (event) => {
      touch.start(event);
      active.value = true;
    };
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.direction.value) {
        active.value = false;
      }
    };
    const onTouchEnd = (event) => {
      if (active.value) {
        if (!slots.default) {
          preventDefault(event);
        }
        active.value = false;
        emit("press", props.text, props.type);
      }
    };
    const renderContent = () => {
      if (props.loading) {
        return _createVNode80(Loading, {
          "class": bem69("loading-icon")
        }, null);
      }
      const text = slots.default ? slots.default() : props.text;
      switch (props.type) {
        case "delete":
          return text || DeleteIcon;
        case "extra":
          return text || CollapseIcon;
        default:
          return text;
      }
    };
    return () => _createVNode80("div", {
      "class": bem69("wrapper", {
        wider: props.wider
      }),
      "onTouchstartPassive": onTouchStart,
      "onTouchmovePassive": onTouchMove,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [_createVNode80("div", {
      "role": "button",
      "tabindex": 0,
      "class": bem69([props.color, {
        large: props.large,
        active: active.value,
        delete: props.type === "delete"
      }])
    }, [renderContent()])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/number-keyboard/NumberKeyboard.mjs
var [name74, bem70] = createNamespace("number-keyboard");
var numberKeyboardProps = {
  show: Boolean,
  title: String,
  theme: makeStringProp("default"),
  zIndex: numericProp,
  teleport: [String, Object],
  maxlength: makeNumericProp(Infinity),
  modelValue: makeStringProp(""),
  transition: truthProp,
  blurOnClose: truthProp,
  showDeleteKey: truthProp,
  randomKeyOrder: Boolean,
  closeButtonText: String,
  deleteButtonText: String,
  closeButtonLoading: Boolean,
  hideOnClickOutside: truthProp,
  safeAreaInsetBottom: truthProp,
  extraKey: {
    type: [String, Array],
    default: ""
  }
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var stdin_default78 = defineComponent76({
  name: name74,
  inheritAttrs: false,
  props: numberKeyboardProps,
  emits: ["show", "hide", "blur", "input", "close", "delete", "update:modelValue"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    const root = ref47();
    const genBasicKeys = () => {
      const keys2 = Array(9).fill("").map((_, i) => ({
        text: i + 1
      }));
      if (props.randomKeyOrder) {
        shuffle(keys2);
      }
      return keys2;
    };
    const genDefaultKeys = () => [...genBasicKeys(), {
      text: props.extraKey,
      type: "extra"
    }, {
      text: 0
    }, {
      text: props.showDeleteKey ? props.deleteButtonText : "",
      type: props.showDeleteKey ? "delete" : ""
    }];
    const genCustomKeys = () => {
      const keys2 = genBasicKeys();
      const {
        extraKey
      } = props;
      const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
      if (extraKeys.length === 1) {
        keys2.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: "extra"
        });
      } else if (extraKeys.length === 2) {
        keys2.push({
          text: extraKeys[0],
          type: "extra"
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: "extra"
        });
      }
      return keys2;
    };
    const keys = computed39(() => props.theme === "custom" ? genCustomKeys() : genDefaultKeys());
    const onBlur = () => {
      if (props.show) {
        emit("blur");
      }
    };
    const onClose = () => {
      emit("close");
      if (props.blurOnClose) {
        onBlur();
      }
    };
    const onAnimationEnd = () => emit(props.show ? "show" : "hide");
    const onPress = (text, type) => {
      if (text === "") {
        if (type === "extra") {
          onBlur();
        }
        return;
      }
      const value = props.modelValue;
      if (type === "delete") {
        emit("delete");
        emit("update:modelValue", value.slice(0, value.length - 1));
      } else if (type === "close") {
        onClose();
      } else if (value.length < props.maxlength) {
        emit("input", text);
        emit("update:modelValue", value + text);
      }
    };
    const renderTitle = () => {
      const {
        title,
        theme,
        closeButtonText
      } = props;
      const leftSlot = slots["title-left"];
      const showClose = closeButtonText && theme === "default";
      const showTitle = title || showClose || leftSlot;
      if (!showTitle) {
        return;
      }
      return _createVNode81("div", {
        "class": bem70("header")
      }, [leftSlot && _createVNode81("span", {
        "class": bem70("title-left")
      }, [leftSlot()]), title && _createVNode81("h2", {
        "class": bem70("title")
      }, [title]), showClose && _createVNode81("button", {
        "type": "button",
        "class": [bem70("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, [closeButtonText])]);
    };
    const renderKeys = () => keys.value.map((key) => {
      const keySlots = {};
      if (key.type === "delete") {
        keySlots.default = slots.delete;
      }
      if (key.type === "extra") {
        keySlots.default = slots["extra-key"];
      }
      return _createVNode81(stdin_default77, {
        "key": key.text,
        "text": key.text,
        "type": key.type,
        "wider": key.wider,
        "color": key.color,
        "onPress": onPress
      }, keySlots);
    });
    const renderSidebar = () => {
      if (props.theme === "custom") {
        return _createVNode81("div", {
          "class": bem70("sidebar")
        }, [props.showDeleteKey && _createVNode81(stdin_default77, {
          "large": true,
          "text": props.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          delete: slots.delete
        }), _createVNode81(stdin_default77, {
          "large": true,
          "text": props.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };
    watch37(() => props.show, (value) => {
      if (!props.transition) {
        emit(value ? "show" : "hide");
      }
    });
    if (props.hideOnClickOutside) {
      useClickAway(root, onBlur, {
        eventName: "touchstart"
      });
    }
    return () => {
      const Title = renderTitle();
      const Content = _createVNode81(Transition4, {
        "name": props.transition ? "van-slide-up" : ""
      }, {
        default: () => [_withDirectives10(_createVNode81("div", _mergeProps25({
          "ref": root,
          "style": getZIndexStyle(props.zIndex),
          "class": bem70({
            unfit: !props.safeAreaInsetBottom,
            "with-title": !!Title
          }),
          "onAnimationend": onAnimationEnd,
          "onTouchstartPassive": stopPropagation
        }, attrs), [Title, _createVNode81("div", {
          "class": bem70("body")
        }, [_createVNode81("div", {
          "class": bem70("keys")
        }, [renderKeys()]), renderSidebar()])]), [[_vShow9, props.show]])]
      });
      if (props.teleport) {
        return _createVNode81(Teleport4, {
          "to": props.teleport
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/number-keyboard/index.mjs
var NumberKeyboard = withInstall(stdin_default78);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/pagination/Pagination.mjs
import { createVNode as _createVNode82 } from "vue";
import { computed as computed40, watchEffect as watchEffect2, defineComponent as defineComponent77 } from "vue";
var [name75, bem71, t15] = createNamespace("pagination");
var makePage = (number, text, active) => ({
  number,
  text,
  active
});
var paginationProps = {
  mode: makeStringProp("multi"),
  prevText: String,
  nextText: String,
  pageCount: makeNumericProp(0),
  modelValue: makeNumberProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: makeNumericProp(10),
  forceEllipses: Boolean
};
var stdin_default79 = defineComponent77({
  name: name75,
  props: paginationProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const count = computed40(() => {
      const {
        pageCount,
        totalItems,
        itemsPerPage
      } = props;
      const count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count2);
    });
    const pages = computed40(() => {
      const items = [];
      const pageCount = count.value;
      const showPageSize = +props.showPageSize;
      const {
        modelValue,
        forceEllipses
      } = props;
      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize < pageCount;
      if (isMaxSized) {
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === modelValue);
        items.push(page);
      }
      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          const prevPages = makePage(startPage - 1, "...");
          items.unshift(prevPages);
        }
        if (endPage < pageCount) {
          const nextPages = makePage(endPage + 1, "...");
          items.push(nextPages);
        }
      }
      return items;
    });
    const updateModelValue = (value, emitChange) => {
      value = clamp(value, 1, count.value);
      if (props.modelValue !== value) {
        emit("update:modelValue", value);
        if (emitChange) {
          emit("change", value);
        }
      }
    };
    watchEffect2(() => updateModelValue(props.modelValue));
    const renderDesc = () => _createVNode82("li", {
      "class": bem71("page-desc")
    }, [slots.pageDesc ? slots.pageDesc() : `${props.modelValue}/${count.value}`]);
    const renderPrevButton = () => {
      const {
        mode,
        modelValue
      } = props;
      const slot = slots["prev-text"];
      const disabled = modelValue === 1;
      return _createVNode82("li", {
        "class": [bem71("item", {
          disabled,
          border: mode === "simple",
          prev: true
        }), BORDER_SURROUND]
      }, [_createVNode82("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue - 1, true)
      }, [slot ? slot() : props.prevText || t15("prev")])]);
    };
    const renderNextButton = () => {
      const {
        mode,
        modelValue
      } = props;
      const slot = slots["next-text"];
      const disabled = modelValue === count.value;
      return _createVNode82("li", {
        "class": [bem71("item", {
          disabled,
          border: mode === "simple",
          next: true
        }), BORDER_SURROUND]
      }, [_createVNode82("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue + 1, true)
      }, [slot ? slot() : props.nextText || t15("next")])]);
    };
    const renderPages = () => pages.value.map((page) => _createVNode82("li", {
      "class": [bem71("item", {
        active: page.active,
        page: true
      }), BORDER_SURROUND]
    }, [_createVNode82("button", {
      "type": "button",
      "aria-current": page.active || void 0,
      "onClick": () => updateModelValue(page.number, true)
    }, [slots.page ? slots.page(page) : page.text])]));
    return () => _createVNode82("nav", {
      "role": "navigation",
      "class": bem71()
    }, [_createVNode82("ul", {
      "class": bem71("items")
    }, [renderPrevButton(), props.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/pagination/index.mjs
var Pagination = withInstall(stdin_default79);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/password-input/PasswordInput.mjs
import { createVNode as _createVNode83 } from "vue";
import { defineComponent as defineComponent78 } from "vue";
var [name76, bem72] = createNamespace("password-input");
var passwordInputProps = {
  info: String,
  mask: truthProp,
  value: makeStringProp(""),
  gutter: numericProp,
  length: makeNumericProp(6),
  focused: Boolean,
  errorInfo: String
};
var stdin_default80 = defineComponent78({
  name: name76,
  props: passwordInputProps,
  emits: ["focus"],
  setup(props, {
    emit
  }) {
    const onTouchStart = (event) => {
      event.stopPropagation();
      emit("focus", event);
    };
    const renderPoints = () => {
      const Points = [];
      const {
        mask,
        value,
        length,
        gutter,
        focused
      } = props;
      for (let i = 0; i < length; i++) {
        const char = value[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = focused && i === value.length;
        let style;
        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }
        Points.push(_createVNode83("li", {
          "class": [{
            [BORDER_LEFT]: showBorder
          }, bem72("item", {
            focus: showCursor
          })],
          "style": style
        }, [mask ? _createVNode83("i", {
          "style": {
            visibility: char ? "visible" : "hidden"
          }
        }, null) : char, showCursor && _createVNode83("div", {
          "class": bem72("cursor")
        }, null)]));
      }
      return Points;
    };
    return () => {
      const info = props.errorInfo || props.info;
      return _createVNode83("div", {
        "class": bem72()
      }, [_createVNode83("ul", {
        "class": [bem72("security"), {
          [BORDER_SURROUND]: !props.gutter
        }],
        "onTouchstartPassive": onTouchStart
      }, [renderPoints()]), info && _createVNode83("div", {
        "class": bem72(props.errorInfo ? "error-info" : "info")
      }, [info])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/password-input/index.mjs
var PasswordInput = withInstall(stdin_default80);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popover/Popover.mjs
import { mergeProps as _mergeProps26, Fragment as _Fragment4, createVNode as _createVNode84 } from "vue";
import { ref as ref48, watch as watch38, nextTick as nextTick21, onMounted as onMounted17, watchEffect as watchEffect3, onBeforeUnmount as onBeforeUnmount6, defineComponent as defineComponent79 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/@vant/popperjs/dist/index.esm.mjs
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement2(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement2(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width2 = clientRect.width / scaleX;
  var height2 = clientRect.height / scaleY;
  return {
    width: width2,
    height: height2,
    top: y,
    right: x + width2,
    bottom: y + height2,
    left: x,
    x,
    y
  };
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getDocumentElement(element) {
  return ((isElement2(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getScrollParent2(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent2(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent2(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function format2(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format2(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format2(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current2) {
    var existing = merged2[current2.name];
    merged2[current2.name] = existing ? Object.assign({}, existing, current2, {
      options: Object.assign({}, existing.options, current2.options),
      data: Object.assign({}, existing.data, current2.data)
    }) : current2;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
function getVariation(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function computeOffsets(_ref) {
  var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions3 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions3;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions3),
      modifiersData: {},
      elements: {
        reference,
        popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance4 = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions3, state.options, options2);
        state.scrollParents = {
          reference: isElement2(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name97 = _ref.name;
            return name97;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name97 = _ref2.name;
              return name97 === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance4.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
        if (!areValidElements(reference2, popper2)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference2, getOffsetParent(popper2), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper2)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name97 = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name: name97,
              instance: instance4
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance4.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance4;
    }
    instance4.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name97 = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
        if (typeof effect3 === "function") {
          var cleanupFn = effect3({
            state,
            name: name97,
            instance: instance4,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance4;
  };
}
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance4 = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance4.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance4.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance4.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance4.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
function popperOffsets(_ref) {
  var state = _ref.state, name97 = _ref.name;
  state.modifiersData[name97] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name97) {
    var style = state.styles[name97] || {};
    var attributes = state.attributes[name97] || {};
    var element = state.elements[name97];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name210) {
      var value = attributes[name210];
      if (value === false) {
        element.removeAttribute(name210);
      } else {
        element.setAttribute(name210, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name97) {
      var element = state.elements[name97];
      var attributes = state.attributes[name97] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name97) ? state.styles[name97] : initialStyles[name97]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper = popperGenerator({
  defaultModifiers
});
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name97 = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name97] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popover/Popover.mjs
var [name77, bem73] = createNamespace("popover");
var popupProps3 = ["show", "overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
var popoverProps = {
  show: Boolean,
  theme: makeStringProp("light"),
  overlay: Boolean,
  actions: makeArrayProp(),
  trigger: makeStringProp("click"),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp("bottom"),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default81 = defineComponent79({
  name: name77,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    const popupRef = ref48();
    const wrapperRef = ref48();
    const popoverRef = ref48();
    const getPopoverOptions = () => ({
      placement: props.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, extend({}, offset_default, {
        options: {
          offset: props.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      nextTick21(() => {
        if (!props.show) {
          return;
        }
        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions(getPopoverOptions());
        }
      });
    };
    const updateShow = (value) => emit("update:show", value);
    const onClickWrapper = () => {
      if (props.trigger === "click") {
        updateShow(!props.show);
      }
    };
    const onClickAction = (action, index) => {
      if (action.disabled) {
        return;
      }
      emit("select", action, index);
      if (props.closeOnClickAction) {
        updateShow(false);
      }
    };
    const onClickAway = () => {
      if (props.show && props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
        updateShow(false);
      }
    };
    const renderActionContent = (action, index) => {
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [action.icon && _createVNode84(Icon, {
        "name": action.icon,
        "classPrefix": props.iconPrefix,
        "class": bem73("action-icon")
      }, null), _createVNode84("div", {
        "class": [bem73("action-text"), BORDER_BOTTOM]
      }, [action.text])];
    };
    const renderAction = (action, index) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return _createVNode84("div", {
        "role": "menuitem",
        "class": [bem73("action", {
          disabled,
          "with-icon": icon
        }), className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : 0,
        "aria-disabled": disabled || void 0,
        "onClick": () => onClickAction(action, index)
      }, [renderActionContent(action, index)]);
    };
    onMounted17(() => {
      updateLocation();
      watchEffect3(() => {
        var _a;
        popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
      });
    });
    onBeforeUnmount6(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    watch38(() => [props.show, props.offset, props.placement], updateLocation);
    useClickAway([wrapperRef, popupRef], onClickAway, {
      eventName: "touchstart"
    });
    return () => {
      var _a;
      return _createVNode84(_Fragment4, null, [_createVNode84("span", {
        "ref": wrapperRef,
        "class": bem73("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), _createVNode84(Popup, _mergeProps26({
        "ref": popoverRef,
        "class": bem73([props.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, pick(props, popupProps3)), {
        default: () => [props.showArrow && _createVNode84("div", {
          "class": bem73("arrow")
        }, null), _createVNode84("div", {
          "role": "menu",
          "class": bem73("content")
        }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
      })]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/popover/index.mjs
var Popover = withInstall(stdin_default81);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/progress/Progress.mjs
import { createVNode as _createVNode85 } from "vue";
import { computed as computed41, defineComponent as defineComponent80 } from "vue";
var [name78, bem74] = createNamespace("progress");
var progressProps = {
  color: String,
  inactive: Boolean,
  pivotText: String,
  textColor: String,
  showPivot: truthProp,
  pivotColor: String,
  trackColor: String,
  strokeWidth: numericProp,
  percentage: {
    type: numericProp,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  }
};
var stdin_default82 = defineComponent80({
  name: name78,
  props: progressProps,
  setup(props) {
    const background = computed41(() => props.inactive ? void 0 : props.color);
    const renderPivot = () => {
      const {
        textColor,
        pivotText,
        pivotColor,
        percentage
      } = props;
      const text = pivotText != null ? pivotText : `${percentage}%`;
      if (props.showPivot && text) {
        const style = {
          color: textColor,
          left: `${+percentage}%`,
          transform: `translate(-${+percentage}%,-50%)`,
          background: pivotColor || background.value
        };
        return _createVNode85("span", {
          "style": style,
          "class": bem74("pivot", {
            inactive: props.inactive
          })
        }, [text]);
      }
    };
    return () => {
      const {
        trackColor,
        percentage,
        strokeWidth
      } = props;
      const rootStyle = {
        background: trackColor,
        height: addUnit(strokeWidth)
      };
      const portionStyle = {
        width: `${percentage}%`,
        background: background.value
      };
      return _createVNode85("div", {
        "class": bem74(),
        "style": rootStyle
      }, [_createVNode85("span", {
        "class": bem74("portion", {
          inactive: props.inactive
        }),
        "style": portionStyle
      }, null), renderPivot()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/progress/index.mjs
var Progress = withInstall(stdin_default82);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/pull-refresh/PullRefresh.mjs
import { createVNode as _createVNode86 } from "vue";
import { ref as ref49, watch as watch39, reactive as reactive19, nextTick as nextTick22, defineComponent as defineComponent81 } from "vue";
var [name79, bem75, t16] = createNamespace("pull-refresh");
var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ["pulling", "loosing", "success"];
var pullRefreshProps = {
  disabled: Boolean,
  modelValue: Boolean,
  headHeight: makeNumericProp(DEFAULT_HEAD_HEIGHT),
  successText: String,
  pullingText: String,
  loosingText: String,
  loadingText: String,
  pullDistance: numericProp,
  successDuration: makeNumericProp(500),
  animationDuration: makeNumericProp(300)
};
var stdin_default83 = defineComponent81({
  name: name79,
  props: pullRefreshProps,
  emits: ["change", "refresh", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    let reachTop;
    const root = ref49();
    const track = ref49();
    const scrollParent = useScrollParent(root);
    const state = reactive19({
      status: "normal",
      distance: 0,
      duration: 0
    });
    const touch = useTouch();
    const getHeadStyle = () => {
      if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: `${props.headHeight}px`
        };
      }
    };
    const isTouchable = () => state.status !== "loading" && state.status !== "success" && !props.disabled;
    const ease = (distance) => {
      const pullDistance = +(props.pullDistance || props.headHeight);
      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }
      return Math.round(distance);
    };
    const setStatus = (distance, isLoading) => {
      const pullDistance = +(props.pullDistance || props.headHeight);
      state.distance = distance;
      if (isLoading) {
        state.status = "loading";
      } else if (distance === 0) {
        state.status = "normal";
      } else if (distance < pullDistance) {
        state.status = "pulling";
      } else {
        state.status = "loosing";
      }
      emit("change", {
        status: state.status,
        distance
      });
    };
    const getStatusText = () => {
      const {
        status
      } = state;
      if (status === "normal") {
        return "";
      }
      return props[`${status}Text`] || t16(status);
    };
    const renderStatus = () => {
      const {
        status,
        distance
      } = state;
      if (slots[status]) {
        return slots[status]({
          distance
        });
      }
      const nodes = [];
      if (TEXT_STATUS.includes(status)) {
        nodes.push(_createVNode86("div", {
          "class": bem75("text")
        }, [getStatusText()]));
      }
      if (status === "loading") {
        nodes.push(_createVNode86(Loading, {
          "class": bem75("loading")
        }, {
          default: getStatusText
        }));
      }
      return nodes;
    };
    const showSuccessTip = () => {
      state.status = "success";
      setTimeout(() => {
        setStatus(0);
      }, +props.successDuration);
    };
    const checkPosition = (event) => {
      reachTop = getScrollTop(scrollParent.value) === 0;
      if (reachTop) {
        state.duration = 0;
        touch.start(event);
      }
    };
    const onTouchStart = (event) => {
      if (isTouchable()) {
        checkPosition(event);
      }
    };
    const onTouchMove = (event) => {
      if (isTouchable()) {
        if (!reachTop) {
          checkPosition(event);
        }
        const {
          deltaY
        } = touch;
        touch.move(event);
        if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
          preventDefault(event);
          setStatus(ease(deltaY.value));
        }
      }
    };
    const onTouchEnd = () => {
      if (reachTop && touch.deltaY.value && isTouchable()) {
        state.duration = +props.animationDuration;
        if (state.status === "loosing") {
          setStatus(+props.headHeight, true);
          emit("update:modelValue", true);
          nextTick22(() => emit("refresh"));
        } else {
          setStatus(0);
        }
      }
    };
    watch39(() => props.modelValue, (value) => {
      state.duration = +props.animationDuration;
      if (value) {
        setStatus(+props.headHeight, true);
      } else if (slots.success || props.successText) {
        showSuccessTip();
      } else {
        setStatus(0, false);
      }
    });
    useEventListener("touchmove", onTouchMove, {
      target: track
    });
    return () => {
      var _a;
      const trackStyle = {
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ""
      };
      return _createVNode86("div", {
        "ref": root,
        "class": bem75()
      }, [_createVNode86("div", {
        "ref": track,
        "class": bem75("track"),
        "style": trackStyle,
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [_createVNode86("div", {
        "class": bem75("head"),
        "style": getHeadStyle()
      }, [renderStatus()]), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/pull-refresh/index.mjs
var PullRefresh = withInstall(stdin_default83);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/rate/Rate.mjs
import { createVNode as _createVNode87 } from "vue";
import { computed as computed42, defineComponent as defineComponent82, ref as ref50 } from "vue";
var [name80, bem76] = createNamespace("rate");
function getRateStatus(value, index, allowHalf, readonly) {
  if (value >= index) {
    return {
      status: "full",
      value: 1
    };
  }
  if (value + 0.5 >= index && allowHalf && !readonly) {
    return {
      status: "half",
      value: 0.5
    };
  }
  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10;
    return {
      status: "half",
      value: Math.round((value - index + 1) * cardinal) / cardinal
    };
  }
  return {
    status: "void",
    value: 0
  };
}
var rateProps = {
  size: numericProp,
  icon: makeStringProp("star"),
  color: String,
  count: makeNumericProp(5),
  gutter: numericProp,
  readonly: Boolean,
  disabled: Boolean,
  voidIcon: makeStringProp("star-o"),
  allowHalf: Boolean,
  voidColor: String,
  touchable: truthProp,
  iconPrefix: String,
  modelValue: makeNumberProp(0),
  disabledColor: String
};
var stdin_default84 = defineComponent82({
  name: name80,
  props: rateProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit
  }) {
    const touch = useTouch();
    const [itemRefs, setItemRefs] = useRefs();
    const groupRef = ref50();
    const untouchable = () => props.readonly || props.disabled || !props.touchable;
    const list = computed42(() => Array(+props.count).fill("").map((_, i) => getRateStatus(props.modelValue, i + 1, props.allowHalf, props.readonly)));
    let ranges;
    let groupRefRect;
    let minRectTop = Number.MAX_SAFE_INTEGER;
    let maxRectTop = Number.MIN_SAFE_INTEGER;
    const updateRanges = () => {
      groupRefRect = useRect(groupRef);
      const rects = itemRefs.value.map(useRect);
      ranges = [];
      rects.forEach((rect, index) => {
        minRectTop = Math.min(rect.top, minRectTop);
        maxRectTop = Math.max(rect.top, maxRectTop);
        if (props.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left,
            top: rect.top,
            height: rect.height
          }, {
            score: index + 1,
            left: rect.left + rect.width / 2,
            top: rect.top,
            height: rect.height
          });
        } else {
          ranges.push({
            score: index + 1,
            left: rect.left,
            top: rect.top,
            height: rect.height
          });
        }
      });
    };
    const getScoreByPosition = (x, y) => {
      for (let i = ranges.length - 1; i > 0; i--) {
        if (y >= groupRefRect.top && y <= groupRefRect.bottom) {
          if (x > ranges[i].left && y >= ranges[i].top && y <= ranges[i].top + ranges[i].height) {
            return ranges[i].score;
          }
        } else {
          const curTop = y < groupRefRect.top ? minRectTop : maxRectTop;
          if (x > ranges[i].left && ranges[i].top === curTop) {
            return ranges[i].score;
          }
        }
      }
      return props.allowHalf ? 0.5 : 1;
    };
    const select = (index) => {
      if (!props.disabled && !props.readonly && index !== props.modelValue) {
        emit("update:modelValue", index);
        emit("change", index);
      }
    };
    const onTouchStart = (event) => {
      if (untouchable()) {
        return;
      }
      touch.start(event);
      updateRanges();
    };
    const onTouchMove = (event) => {
      if (untouchable()) {
        return;
      }
      touch.move(event);
      if (touch.isHorizontal()) {
        const {
          clientX,
          clientY
        } = event.touches[0];
        preventDefault(event);
        select(getScoreByPosition(clientX, clientY));
      }
    };
    const renderStar = (item, index) => {
      const {
        icon,
        size,
        color,
        count,
        gutter,
        voidIcon,
        disabled,
        voidColor,
        allowHalf,
        iconPrefix,
        disabledColor
      } = props;
      const score = index + 1;
      const isFull = item.status === "full";
      const isVoid = item.status === "void";
      const renderHalf = allowHalf && item.value > 0 && item.value < 1;
      let style;
      if (gutter && score !== +count) {
        style = {
          paddingRight: addUnit(gutter)
        };
      }
      const onClickItem = (event) => {
        updateRanges();
        select(allowHalf ? getScoreByPosition(event.clientX, event.clientY) : score);
      };
      return _createVNode87("div", {
        "key": index,
        "ref": setItemRefs(index),
        "role": "radio",
        "style": style,
        "class": bem76("item"),
        "tabindex": disabled ? void 0 : 0,
        "aria-setsize": count,
        "aria-posinset": score,
        "aria-checked": !isVoid,
        "onClick": onClickItem
      }, [_createVNode87(Icon, {
        "size": size,
        "name": isFull ? icon : voidIcon,
        "class": bem76("icon", {
          disabled,
          full: isFull
        }),
        "color": disabled ? disabledColor : isFull ? color : voidColor,
        "classPrefix": iconPrefix
      }, null), renderHalf && _createVNode87(Icon, {
        "size": size,
        "style": {
          width: item.value + "em"
        },
        "name": isVoid ? voidIcon : icon,
        "class": bem76("icon", ["half", {
          disabled,
          full: !isVoid
        }]),
        "color": disabled ? disabledColor : isVoid ? voidColor : color,
        "classPrefix": iconPrefix
      }, null)]);
    };
    useCustomFieldValue(() => props.modelValue);
    useEventListener("touchmove", onTouchMove, {
      target: groupRef
    });
    return () => _createVNode87("div", {
      "ref": groupRef,
      "role": "radiogroup",
      "class": bem76({
        readonly: props.readonly,
        disabled: props.disabled
      }),
      "tabindex": props.disabled ? void 0 : 0,
      "aria-disabled": props.disabled,
      "aria-readonly": props.readonly,
      "onTouchstartPassive": onTouchStart
    }, [list.value.map(renderStar)]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/rate/index.mjs
var Rate = withInstall(stdin_default84);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/row/index.mjs
var Row = withInstall(stdin_default48);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/search/Search.mjs
import { mergeProps as _mergeProps27, createVNode as _createVNode88 } from "vue";
import { ref as ref51, defineComponent as defineComponent83 } from "vue";
var [name81, bem77, t17] = createNamespace("search");
var searchProps = extend({}, fieldSharedProps, {
  label: String,
  shape: makeStringProp("square"),
  leftIcon: makeStringProp("search"),
  clearable: truthProp,
  actionText: String,
  background: String,
  showAction: Boolean
});
var stdin_default85 = defineComponent83({
  name: name81,
  props: searchProps,
  emits: ["blur", "focus", "clear", "search", "cancel", "click-input", "click-left-icon", "click-right-icon", "update:modelValue"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    const id = useId();
    const filedRef = ref51();
    const onCancel = () => {
      if (!slots.action) {
        emit("update:modelValue", "");
        emit("cancel");
      }
    };
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        preventDefault(event);
        emit("search", props.modelValue);
      }
    };
    const getInputId = () => props.id || `${id}-input`;
    const renderLabel = () => {
      if (slots.label || props.label) {
        return _createVNode88("label", {
          "class": bem77("label"),
          "for": getInputId()
        }, [slots.label ? slots.label() : props.label]);
      }
    };
    const renderAction = () => {
      if (props.showAction) {
        const text = props.actionText || t17("cancel");
        return _createVNode88("div", {
          "class": bem77("action"),
          "role": "button",
          "tabindex": 0,
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };
    const blur = () => {
      var _a;
      return (_a = filedRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = filedRef.value) == null ? void 0 : _a.focus();
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onClear = (event) => emit("clear", event);
    const onClickInput = (event) => emit("click-input", event);
    const onClickLeftIcon = (event) => emit("click-left-icon", event);
    const onClickRightIcon = (event) => emit("click-right-icon", event);
    const fieldPropNames = Object.keys(fieldSharedProps);
    const renderField = () => {
      const fieldAttrs = extend({}, attrs, pick(props, fieldPropNames), {
        id: getInputId()
      });
      const onInput = (value) => emit("update:modelValue", value);
      return _createVNode88(Field, _mergeProps27({
        "ref": filedRef,
        "type": "search",
        "class": bem77("field"),
        "border": false,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onClear": onClear,
        "onKeypress": onKeypress,
        "onClick-input": onClickInput,
        "onClick-left-icon": onClickLeftIcon,
        "onClick-right-icon": onClickRightIcon,
        "onUpdate:modelValue": onInput
      }, fieldAttrs), pick(slots, ["left-icon", "right-icon"]));
    };
    useExpose({
      focus,
      blur
    });
    return () => {
      var _a;
      return _createVNode88("div", {
        "class": bem77({
          "show-action": props.showAction
        }),
        "style": {
          background: props.background
        }
      }, [(_a = slots.left) == null ? void 0 : _a.call(slots), _createVNode88("div", {
        "class": bem77("content", props.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/search/index.mjs
var Search = withInstall(stdin_default85);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/share-sheet/ShareSheet.mjs
import { mergeProps as _mergeProps28, createVNode as _createVNode89 } from "vue";
import { defineComponent as defineComponent84 } from "vue";
var popupInheritKeys3 = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var iconMap = {
  qq: "qq",
  link: "link-o",
  weibo: "weibo",
  qrcode: "qr",
  poster: "photo-o",
  wechat: "wechat",
  "weapp-qrcode": "miniprogram-o",
  "wechat-moments": "wechat-moments"
};
var [name82, bem78, t18] = createNamespace("share-sheet");
var shareSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  options: makeArrayProp(),
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  safeAreaInsetBottom: truthProp
});
var stdin_default86 = defineComponent84({
  name: name82,
  props: shareSheetProps,
  emits: ["cancel", "select", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const updateShow = (value) => emit("update:show", value);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const onSelect = (option, index) => emit("select", option, index);
    const renderHeader = () => {
      const title = slots.title ? slots.title() : props.title;
      const description = slots.description ? slots.description() : props.description;
      if (title || description) {
        return _createVNode89("div", {
          "class": bem78("header")
        }, [title && _createVNode89("h2", {
          "class": bem78("title")
        }, [title]), description && _createVNode89("span", {
          "class": bem78("description")
        }, [description])]);
      }
    };
    const renderIcon = (icon) => {
      if (iconMap[icon]) {
        return _createVNode89("div", {
          "class": bem78("icon", [icon])
        }, [_createVNode89(Icon, {
          "name": iconMap[icon] || icon
        }, null)]);
      }
      return _createVNode89("img", {
        "src": icon,
        "class": bem78("image-icon")
      }, null);
    };
    const renderOption = (option, index) => {
      const {
        name: name210,
        icon,
        className,
        description
      } = option;
      return _createVNode89("div", {
        "role": "button",
        "tabindex": 0,
        "class": [bem78("option"), className, HAPTICS_FEEDBACK],
        "onClick": () => onSelect(option, index)
      }, [renderIcon(icon), name210 && _createVNode89("span", {
        "class": bem78("name")
      }, [name210]), description && _createVNode89("span", {
        "class": bem78("option-description")
      }, [description])]);
    };
    const renderOptions = (options, border) => _createVNode89("div", {
      "class": bem78("options", {
        border
      })
    }, [options.map(renderOption)]);
    const renderRows = () => {
      const {
        options
      } = props;
      if (Array.isArray(options[0])) {
        return options.map((item, index) => renderOptions(item, index !== 0));
      }
      return renderOptions(options);
    };
    const renderCancelButton = () => {
      var _a;
      const cancelText = (_a = props.cancelText) != null ? _a : t18("cancel");
      if (slots.cancel || cancelText) {
        return _createVNode89("button", {
          "type": "button",
          "class": bem78("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : cancelText]);
      }
    };
    return () => _createVNode89(Popup, _mergeProps28({
      "class": bem78(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props, popupInheritKeys3)), {
      default: () => [renderHeader(), renderRows(), renderCancelButton()]
    });
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/share-sheet/index.mjs
var ShareSheet = withInstall(stdin_default86);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sidebar/Sidebar.mjs
import { createVNode as _createVNode90 } from "vue";
import { defineComponent as defineComponent85 } from "vue";
var [name83, bem79] = createNamespace("sidebar");
var SIDEBAR_KEY = Symbol(name83);
var sidebarProps = {
  modelValue: makeNumericProp(0)
};
var stdin_default87 = defineComponent85({
  name: name83,
  props: sidebarProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(SIDEBAR_KEY);
    const getActive = () => +props.modelValue;
    const setActive = (value) => {
      if (value !== getActive()) {
        emit("update:modelValue", value);
        emit("change", value);
      }
    };
    linkChildren({
      getActive,
      setActive
    });
    return () => {
      var _a;
      return _createVNode90("div", {
        "role": "tablist",
        "class": bem79()
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sidebar/index.mjs
var Sidebar = withInstall(stdin_default87);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sidebar-item/SidebarItem.mjs
import { createVNode as _createVNode91, mergeProps as _mergeProps29 } from "vue";
import { defineComponent as defineComponent86 } from "vue";
var [name84, bem80] = createNamespace("sidebar-item");
var sidebarItemProps = extend({}, routeProps, {
  dot: Boolean,
  title: String,
  badge: numericProp,
  disabled: Boolean,
  badgeProps: Object
});
var stdin_default88 = defineComponent86({
  name: name84,
  props: sidebarItemProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const {
      parent,
      index
    } = useParent(SIDEBAR_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <SidebarItem> must be a child component of <Sidebar>.");
      }
      return;
    }
    const onClick = () => {
      if (props.disabled) {
        return;
      }
      emit("click", index.value);
      parent.setActive(index.value);
      route2();
    };
    return () => {
      const {
        dot,
        badge,
        title,
        disabled
      } = props;
      const selected = index.value === parent.getActive();
      return _createVNode91("div", {
        "role": "tab",
        "class": bem80({
          select: selected,
          disabled
        }),
        "tabindex": disabled ? void 0 : 0,
        "aria-selected": selected,
        "onClick": onClick
      }, [_createVNode91(Badge, _mergeProps29({
        "dot": dot,
        "class": bem80("text"),
        "content": badge
      }, props.badgeProps), {
        default: () => [slots.title ? slots.title() : title]
      })]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/sidebar-item/index.mjs
var SidebarItem = withInstall(stdin_default88);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/skeleton/Skeleton.mjs
import { mergeProps as _mergeProps30, createVNode as _createVNode92 } from "vue";
import { defineComponent as defineComponent87 } from "vue";
var [name85, bem81] = createNamespace("skeleton");
var DEFAULT_ROW_WIDTH = "100%";
var DEFAULT_LAST_ROW_WIDTH = "60%";
var skeletonProps = {
  row: makeNumericProp(0),
  title: Boolean,
  round: Boolean,
  avatar: Boolean,
  loading: truthProp,
  animate: truthProp,
  avatarSize: numericProp,
  titleWidth: numericProp,
  avatarShape: makeStringProp("round"),
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var stdin_default89 = defineComponent87({
  name: name85,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return _createVNode92("div", {
          "class": bem81("avatar", props.avatarShape),
          "style": getSizeStyle(props.avatarSize)
        }, null);
      }
    };
    const renderTitle = () => {
      if (props.title) {
        return _createVNode92("h3", {
          "class": bem81("title"),
          "style": {
            width: addUnit(props.titleWidth)
          }
        }, null);
      }
    };
    const getRowWidth = (index) => {
      const {
        rowWidth
      } = props;
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }
      return rowWidth;
    };
    const renderRows = () => Array(+props.row).fill("").map((_, i) => _createVNode92("div", {
      "class": bem81("row"),
      "style": {
        width: addUnit(getRowWidth(i))
      }
    }, null));
    return () => {
      var _a;
      if (!props.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return _createVNode92("div", _mergeProps30({
        "class": bem81({
          animate: props.animate,
          round: props.round
        })
      }, attrs), [renderAvatar(), _createVNode92("div", {
        "class": bem81("content")
      }, [renderTitle(), renderRows()])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/skeleton/index.mjs
var Skeleton = withInstall(stdin_default89);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/slider/Slider.mjs
import { createVNode as _createVNode93 } from "vue";
import { ref as ref52, computed as computed43, defineComponent as defineComponent88 } from "vue";
var [name86, bem82] = createNamespace("slider");
var sliderProps = {
  min: makeNumericProp(0),
  max: makeNumericProp(100),
  step: makeNumericProp(1),
  range: Boolean,
  reverse: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  vertical: Boolean,
  barHeight: numericProp,
  buttonSize: numericProp,
  activeColor: String,
  inactiveColor: String,
  modelValue: {
    type: [Number, Array],
    default: 0
  }
};
var stdin_default90 = defineComponent88({
  name: name86,
  props: sliderProps,
  emits: ["change", "drag-end", "drag-start", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    let buttonIndex;
    let current2;
    let startValue;
    const root = ref52();
    const slider = ref52();
    const dragStatus = ref52();
    const touch = useTouch();
    const scope = computed43(() => Number(props.max) - Number(props.min));
    const wrapperStyle = computed43(() => {
      const crossAxis = props.vertical ? "width" : "height";
      return {
        background: props.inactiveColor,
        [crossAxis]: addUnit(props.barHeight)
      };
    });
    const isRange = (val) => props.range && Array.isArray(val);
    const calcMainAxis = () => {
      const {
        modelValue,
        min
      } = props;
      if (isRange(modelValue)) {
        return `${(modelValue[1] - modelValue[0]) * 100 / scope.value}%`;
      }
      return `${(modelValue - Number(min)) * 100 / scope.value}%`;
    };
    const calcOffset = () => {
      const {
        modelValue,
        min
      } = props;
      if (isRange(modelValue)) {
        return `${(modelValue[0] - Number(min)) * 100 / scope.value}%`;
      }
      return "0%";
    };
    const barStyle = computed43(() => {
      const mainAxis = props.vertical ? "height" : "width";
      const style = {
        [mainAxis]: calcMainAxis(),
        background: props.activeColor
      };
      if (dragStatus.value) {
        style.transition = "none";
      }
      const getPositionKey = () => {
        if (props.vertical) {
          return props.reverse ? "bottom" : "top";
        }
        return props.reverse ? "right" : "left";
      };
      style[getPositionKey()] = calcOffset();
      return style;
    });
    const format3 = (value) => {
      const min = +props.min;
      const max = +props.max;
      const step = +props.step;
      value = clamp(value, min, max);
      const diff = Math.round((value - min) / step) * step;
      return addNumber(min, diff);
    };
    const isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
    const handleRangeValue = (value) => {
      var _a, _b;
      const left2 = (_a = value[0]) != null ? _a : Number(props.min);
      const right2 = (_b = value[1]) != null ? _b : Number(props.max);
      return left2 > right2 ? [right2, left2] : [left2, right2];
    };
    const updateValue = (value, end2) => {
      if (isRange(value)) {
        value = handleRangeValue(value).map(format3);
      } else {
        value = format3(value);
      }
      if (!isSameValue(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end2 && !isSameValue(value, startValue)) {
        emit("change", value);
      }
    };
    const onClick = (event) => {
      event.stopPropagation();
      if (props.disabled || props.readonly) {
        return;
      }
      const {
        min,
        reverse,
        vertical,
        modelValue
      } = props;
      const rect = useRect(root);
      const getDelta = () => {
        if (vertical) {
          if (reverse) {
            return rect.bottom - event.clientY;
          }
          return event.clientY - rect.top;
        }
        if (reverse) {
          return rect.right - event.clientX;
        }
        return event.clientX - rect.left;
      };
      const total = vertical ? rect.height : rect.width;
      const value = Number(min) + getDelta() / total * scope.value;
      if (isRange(modelValue)) {
        const [left2, right2] = modelValue;
        const middle = (left2 + right2) / 2;
        if (value <= middle) {
          updateValue([value, right2], true);
        } else {
          updateValue([left2, value], true);
        }
      } else {
        updateValue(value, true);
      }
    };
    const onTouchStart = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      touch.start(event);
      current2 = props.modelValue;
      if (isRange(current2)) {
        startValue = current2.map(format3);
      } else {
        startValue = format3(current2);
      }
      dragStatus.value = "start";
    };
    const onTouchMove = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (dragStatus.value === "start") {
        emit("drag-start", event);
      }
      preventDefault(event, true);
      touch.move(event);
      dragStatus.value = "dragging";
      const rect = useRect(root);
      const delta = props.vertical ? touch.deltaY.value : touch.deltaX.value;
      const total = props.vertical ? rect.height : rect.width;
      let diff = delta / total * scope.value;
      if (props.reverse) {
        diff = -diff;
      }
      if (isRange(startValue)) {
        const index = props.reverse ? 1 - buttonIndex : buttonIndex;
        current2[index] = startValue[index] + diff;
      } else {
        current2 = startValue + diff;
      }
      updateValue(current2);
    };
    const onTouchEnd = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (dragStatus.value === "dragging") {
        updateValue(current2, true);
        emit("drag-end", event);
      }
      dragStatus.value = "";
    };
    const getButtonClassName = (index) => {
      if (typeof index === "number") {
        const position = ["left", "right"];
        return bem82(`button-wrapper`, position[index]);
      }
      return bem82("button-wrapper", props.reverse ? "left" : "right");
    };
    const renderButtonContent = (value, index) => {
      if (typeof index === "number") {
        const slot = slots[index === 0 ? "left-button" : "right-button"];
        if (slot) {
          return slot({
            value
          });
        }
      }
      if (slots.button) {
        return slots.button({
          value
        });
      }
      return _createVNode93("div", {
        "class": bem82("button"),
        "style": getSizeStyle(props.buttonSize)
      }, null);
    };
    const renderButton = (index) => {
      const current22 = typeof index === "number" ? props.modelValue[index] : props.modelValue;
      return _createVNode93("div", {
        "ref": slider,
        "role": "slider",
        "class": getButtonClassName(index),
        "tabindex": props.disabled ? void 0 : 0,
        "aria-valuemin": props.min,
        "aria-valuenow": current22,
        "aria-valuemax": props.max,
        "aria-disabled": props.disabled || void 0,
        "aria-readonly": props.readonly || void 0,
        "aria-orientation": props.vertical ? "vertical" : "horizontal",
        "onTouchstartPassive": (event) => {
          if (typeof index === "number") {
            buttonIndex = index;
          }
          onTouchStart(event);
        },
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClick": stopPropagation
      }, [renderButtonContent(current22, index)]);
    };
    updateValue(props.modelValue);
    useCustomFieldValue(() => props.modelValue);
    useEventListener("touchmove", onTouchMove, {
      target: slider
    });
    return () => _createVNode93("div", {
      "ref": root,
      "style": wrapperStyle.value,
      "class": bem82({
        vertical: props.vertical,
        disabled: props.disabled
      }),
      "onClick": onClick
    }, [_createVNode93("div", {
      "class": bem82("bar"),
      "style": barStyle.value
    }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/slider/index.mjs
var Slider = withInstall(stdin_default90);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/space/Space.mjs
import { createVNode as _createVNode94 } from "vue";
import { computed as computed44, defineComponent as defineComponent89, Fragment } from "vue";
var [name87, bem83] = createNamespace("space");
var spaceProps = {
  align: String,
  direction: {
    type: String,
    default: "horizontal"
  },
  size: {
    type: [Number, String, Array],
    default: 8
  },
  wrap: Boolean,
  fill: Boolean
};
function filterEmpty(children = []) {
  const nodes = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      nodes.push(...child);
    } else if (child.type === Fragment) {
      nodes.push(...filterEmpty(child.children));
    } else {
      nodes.push(child);
    }
  });
  return nodes.filter((c) => {
    var _a;
    return !(c && (typeof Comment !== "undefined" && c.type === Comment || c.type === Fragment && ((_a = c.children) == null ? void 0 : _a.length) === 0 || c.type === Text && c.children.trim() === ""));
  });
}
var stdin_default91 = defineComponent89({
  name: name87,
  props: spaceProps,
  setup(props, {
    slots
  }) {
    const mergedAlign = computed44(() => {
      var _a;
      return (_a = props.align) != null ? _a : props.direction === "horizontal" ? "center" : "";
    });
    const getMargin = (size) => {
      if (typeof size === "number") {
        return size + "px";
      }
      return size;
    };
    const getMarginStyle = (isLast) => {
      const style = {};
      const marginRight = `${getMargin(Array.isArray(props.size) ? props.size[0] : props.size)}`;
      const marginBottom = `${getMargin(Array.isArray(props.size) ? props.size[1] : props.size)}`;
      if (isLast) {
        return props.wrap ? {
          marginBottom
        } : {};
      }
      if (props.direction === "horizontal") {
        style.marginRight = marginRight;
      }
      if (props.direction === "vertical" || props.wrap) {
        style.marginBottom = marginBottom;
      }
      return style;
    };
    return () => {
      var _a;
      const children = filterEmpty((_a = slots.default) == null ? void 0 : _a.call(slots));
      return _createVNode94("div", {
        "class": [bem83({
          [props.direction]: props.direction,
          [`align-${mergedAlign.value}`]: mergedAlign.value,
          wrap: props.wrap,
          fill: props.fill
        })]
      }, [children.map((c, i) => _createVNode94("div", {
        "key": `item-${i}`,
        "class": `${name87}-item`,
        "style": getMarginStyle(i === children.length - 1)
      }, [c]))]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/space/index.mjs
var Space = withInstall(stdin_default91);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/step/Step.mjs
import { createVNode as _createVNode96 } from "vue";
import { computed as computed45, defineComponent as defineComponent91 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/steps/Steps.mjs
import { createVNode as _createVNode95 } from "vue";
import { defineComponent as defineComponent90 } from "vue";
var [name88, bem84] = createNamespace("steps");
var stepsProps = {
  active: makeNumericProp(0),
  direction: makeStringProp("horizontal"),
  activeIcon: makeStringProp("checked"),
  iconPrefix: String,
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String
};
var STEPS_KEY = Symbol(name88);
var stdin_default92 = defineComponent90({
  name: name88,
  props: stepsProps,
  emits: ["click-step"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(STEPS_KEY);
    const onClickStep = (index) => emit("click-step", index);
    linkChildren({
      props,
      onClickStep
    });
    return () => {
      var _a;
      return _createVNode95("div", {
        "class": bem84([props.direction])
      }, [_createVNode95("div", {
        "class": bem84("items")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/step/Step.mjs
var [name89, bem85] = createNamespace("step");
var stdin_default93 = defineComponent91({
  name: name89,
  setup(props, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(STEPS_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <Step> must be a child component of <Steps>.");
      }
      return;
    }
    const parentProps = parent.props;
    const getStatus = () => {
      const active = +parentProps.active;
      if (index.value < active) {
        return "finish";
      }
      return index.value === active ? "process" : "waiting";
    };
    const isActive = () => getStatus() === "process";
    const lineStyle = computed45(() => ({
      background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
    }));
    const titleStyle = computed45(() => {
      if (isActive()) {
        return {
          color: parentProps.activeColor
        };
      }
      if (getStatus() === "waiting") {
        return {
          color: parentProps.inactiveColor
        };
      }
    });
    const onClickStep = () => parent.onClickStep(index.value);
    const renderCircle = () => {
      const {
        iconPrefix,
        finishIcon,
        activeIcon,
        activeColor,
        inactiveIcon
      } = parentProps;
      if (isActive()) {
        if (slots["active-icon"]) {
          return slots["active-icon"]();
        }
        return _createVNode96(Icon, {
          "class": bem85("icon", "active"),
          "name": activeIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (getStatus() === "finish" && (finishIcon || slots["finish-icon"])) {
        if (slots["finish-icon"]) {
          return slots["finish-icon"]();
        }
        return _createVNode96(Icon, {
          "class": bem85("icon", "finish"),
          "name": finishIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (slots["inactive-icon"]) {
        return slots["inactive-icon"]();
      }
      if (inactiveIcon) {
        return _createVNode96(Icon, {
          "class": bem85("icon"),
          "name": inactiveIcon,
          "classPrefix": iconPrefix
        }, null);
      }
      return _createVNode96("i", {
        "class": bem85("circle"),
        "style": lineStyle.value
      }, null);
    };
    return () => {
      var _a;
      const status = getStatus();
      return _createVNode96("div", {
        "class": [BORDER, bem85([parentProps.direction, {
          [status]: status
        }])]
      }, [_createVNode96("div", {
        "class": bem85("title", {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), _createVNode96("div", {
        "class": bem85("circle-container"),
        "onClick": onClickStep
      }, [renderCircle()]), _createVNode96("div", {
        "class": bem85("line"),
        "style": lineStyle.value
      }, null)]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/step/index.mjs
var Step = withInstall(stdin_default93);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/stepper/Stepper.mjs
import { withDirectives as _withDirectives11, createVNode as _createVNode97, mergeProps as _mergeProps31, vShow as _vShow10 } from "vue";
import { ref as ref53, watch as watch40, computed as computed46, nextTick as nextTick23, defineComponent as defineComponent92 } from "vue";
var [name90, bem86] = createNamespace("stepper");
var LONG_PRESS_INTERVAL = 200;
var LONG_PRESS_START_TIME = 600;
var isEqual = (value1, value2) => String(value1) === String(value2);
var stepperProps = {
  min: makeNumericProp(1),
  max: makeNumericProp(Infinity),
  name: makeNumericProp(""),
  step: makeNumericProp(1),
  theme: String,
  integer: Boolean,
  disabled: Boolean,
  showPlus: truthProp,
  showMinus: truthProp,
  showInput: truthProp,
  longPress: truthProp,
  allowEmpty: Boolean,
  modelValue: numericProp,
  inputWidth: numericProp,
  buttonSize: numericProp,
  placeholder: String,
  disablePlus: Boolean,
  disableMinus: Boolean,
  disableInput: Boolean,
  beforeChange: Function,
  defaultValue: makeNumericProp(1),
  decimalLength: numericProp
};
var stdin_default94 = defineComponent92({
  name: name90,
  props: stepperProps,
  emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
  setup(props, {
    emit
  }) {
    const format3 = (value) => {
      const {
        min,
        max,
        allowEmpty,
        decimalLength
      } = props;
      if (allowEmpty && value === "") {
        return value;
      }
      value = formatNumber(String(value), !props.integer);
      value = value === "" ? 0 : +value;
      value = Number.isNaN(value) ? +min : value;
      value = Math.max(Math.min(+max, value), +min);
      if (isDef(decimalLength)) {
        value = value.toFixed(+decimalLength);
      }
      return value;
    };
    const getInitialValue = () => {
      var _a;
      const defaultValue = (_a = props.modelValue) != null ? _a : props.defaultValue;
      const value = format3(defaultValue);
      if (!isEqual(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      return value;
    };
    let actionType;
    const inputRef = ref53();
    const current2 = ref53(getInitialValue());
    const minusDisabled = computed46(() => props.disabled || props.disableMinus || current2.value <= +props.min);
    const plusDisabled = computed46(() => props.disabled || props.disablePlus || current2.value >= +props.max);
    const inputStyle = computed46(() => ({
      width: addUnit(props.inputWidth),
      height: addUnit(props.buttonSize)
    }));
    const buttonStyle = computed46(() => getSizeStyle(props.buttonSize));
    const check = () => {
      const value = format3(current2.value);
      if (!isEqual(value, current2.value)) {
        current2.value = value;
      }
    };
    const setValue = (value) => {
      if (props.beforeChange) {
        callInterceptor(props.beforeChange, {
          args: [value],
          done() {
            current2.value = value;
          }
        });
      } else {
        current2.value = value;
      }
    };
    const onChange = () => {
      if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
        emit("overlimit", actionType);
        return;
      }
      const diff = actionType === "minus" ? -props.step : +props.step;
      const value = format3(addNumber(+current2.value, diff));
      setValue(value);
      emit(actionType);
    };
    const onInput = (event) => {
      const input = event.target;
      const {
        value
      } = input;
      const {
        decimalLength
      } = props;
      let formatted = formatNumber(String(value), !props.integer);
      if (isDef(decimalLength) && formatted.includes(".")) {
        const pair = formatted.split(".");
        formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`;
      }
      if (props.beforeChange) {
        input.value = String(current2.value);
      } else if (!isEqual(value, formatted)) {
        input.value = formatted;
      }
      const isNumeric2 = formatted === String(+formatted);
      setValue(isNumeric2 ? +formatted : formatted);
    };
    const onFocus = (event) => {
      var _a;
      if (props.disableInput) {
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      } else {
        emit("focus", event);
      }
    };
    const onBlur = (event) => {
      const input = event.target;
      const value = format3(input.value);
      input.value = String(value);
      current2.value = value;
      nextTick23(() => {
        emit("blur", event);
        resetScroll();
      });
    };
    let isLongPress;
    let longPressTimer;
    const longPressStep = () => {
      longPressTimer = setTimeout(() => {
        onChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };
    const onTouchStart = () => {
      if (props.longPress) {
        isLongPress = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          onChange();
          longPressStep();
        }, LONG_PRESS_START_TIME);
      }
    };
    const onTouchEnd = (event) => {
      if (props.longPress) {
        clearTimeout(longPressTimer);
        if (isLongPress) {
          preventDefault(event);
        }
      }
    };
    const onMousedown = (event) => {
      if (props.disableInput) {
        preventDefault(event);
      }
    };
    const createListeners = (type) => ({
      onClick: (event) => {
        preventDefault(event);
        actionType = type;
        onChange();
      },
      onTouchstartPassive: () => {
        actionType = type;
        onTouchStart();
      },
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    });
    watch40(() => [props.max, props.min, props.integer, props.decimalLength], check);
    watch40(() => props.modelValue, (value) => {
      if (!isEqual(value, current2.value)) {
        current2.value = format3(value);
      }
    });
    watch40(current2, (value) => {
      emit("update:modelValue", value);
      emit("change", value, {
        name: props.name
      });
    });
    useCustomFieldValue(() => props.modelValue);
    return () => _createVNode97("div", {
      "role": "group",
      "class": bem86([props.theme])
    }, [_withDirectives11(_createVNode97("button", _mergeProps31({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem86("minus", {
        disabled: minusDisabled.value
      }), {
        [HAPTICS_FEEDBACK]: !minusDisabled.value
      }],
      "aria-disabled": minusDisabled.value || void 0
    }, createListeners("minus")), null), [[_vShow10, props.showMinus]]), _withDirectives11(_createVNode97("input", {
      "ref": inputRef,
      "type": props.integer ? "tel" : "text",
      "role": "spinbutton",
      "class": bem86("input"),
      "value": current2.value,
      "style": inputStyle.value,
      "disabled": props.disabled,
      "readonly": props.disableInput,
      "inputmode": props.integer ? "numeric" : "decimal",
      "placeholder": props.placeholder,
      "aria-valuemax": props.max,
      "aria-valuemin": props.min,
      "aria-valuenow": current2.value,
      "onBlur": onBlur,
      "onInput": onInput,
      "onFocus": onFocus,
      "onMousedown": onMousedown
    }, null), [[_vShow10, props.showInput]]), _withDirectives11(_createVNode97("button", _mergeProps31({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem86("plus", {
        disabled: plusDisabled.value
      }), {
        [HAPTICS_FEEDBACK]: !plusDisabled.value
      }],
      "aria-disabled": plusDisabled.value || void 0
    }, createListeners("plus")), null), [[_vShow10, props.showPlus]])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/stepper/index.mjs
var Stepper = withInstall(stdin_default94);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/steps/index.mjs
var Steps = withInstall(stdin_default92);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/submit-bar/SubmitBar.mjs
import { createVNode as _createVNode98 } from "vue";
import { ref as ref54, defineComponent as defineComponent93 } from "vue";
var [name91, bem87, t19] = createNamespace("submit-bar");
var submitBarProps = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  currency: makeStringProp("¥"),
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonType: makeStringProp("danger"),
  buttonColor: String,
  suffixLabel: String,
  placeholder: Boolean,
  decimalLength: makeNumericProp(2),
  safeAreaInsetBottom: truthProp
};
var stdin_default95 = defineComponent93({
  name: name91,
  props: submitBarProps,
  emits: ["submit"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref54();
    const renderPlaceholder = usePlaceholder(root, bem87);
    const renderText = () => {
      const {
        price,
        label,
        currency,
        textAlign,
        suffixLabel,
        decimalLength
      } = props;
      if (typeof price === "number") {
        const pricePair = (price / 100).toFixed(+decimalLength).split(".");
        const decimal = decimalLength ? `.${pricePair[1]}` : "";
        return _createVNode98("div", {
          "class": bem87("text"),
          "style": {
            textAlign
          }
        }, [_createVNode98("span", null, [label || t19("label")]), _createVNode98("span", {
          "class": bem87("price")
        }, [currency, _createVNode98("span", {
          "class": bem87("price-integer")
        }, [pricePair[0]]), decimal]), suffixLabel && _createVNode98("span", {
          "class": bem87("suffix-label")
        }, [suffixLabel])]);
      }
    };
    const renderTip = () => {
      var _a;
      const {
        tip,
        tipIcon
      } = props;
      if (slots.tip || tip) {
        return _createVNode98("div", {
          "class": bem87("tip")
        }, [tipIcon && _createVNode98(Icon, {
          "class": bem87("tip-icon"),
          "name": tipIcon
        }, null), tip && _createVNode98("span", {
          "class": bem87("tip-text")
        }, [tip]), (_a = slots.tip) == null ? void 0 : _a.call(slots)]);
      }
    };
    const onClickButton = () => emit("submit");
    const renderButton = () => {
      if (slots.button) {
        return slots.button();
      }
      return _createVNode98(Button, {
        "round": true,
        "type": props.buttonType,
        "text": props.buttonText,
        "class": bem87("button", props.buttonType),
        "color": props.buttonColor,
        "loading": props.loading,
        "disabled": props.disabled,
        "onClick": onClickButton
      }, null);
    };
    const renderSubmitBar = () => {
      var _a, _b;
      return _createVNode98("div", {
        "ref": root,
        "class": [bem87(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), renderTip(), _createVNode98("div", {
        "class": bem87("bar")
      }, [(_b = slots.default) == null ? void 0 : _b.call(slots), renderText(), renderButton()])]);
    };
    return () => {
      if (props.placeholder) {
        return renderPlaceholder(renderSubmitBar);
      }
      return renderSubmitBar();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/submit-bar/index.mjs
var SubmitBar = withInstall(stdin_default95);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/swipe-cell/SwipeCell.mjs
import { createVNode as _createVNode99 } from "vue";
import { ref as ref55, reactive as reactive20, computed as computed47, defineComponent as defineComponent94 } from "vue";
var [name92, bem88] = createNamespace("swipe-cell");
var swipeCellProps = {
  name: makeNumericProp(""),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function,
  stopPropagation: Boolean
};
var stdin_default96 = defineComponent94({
  name: name92,
  props: swipeCellProps,
  emits: ["open", "close", "click"],
  setup(props, {
    emit,
    slots
  }) {
    let opened;
    let lockClick2;
    let startOffset;
    const root = ref55();
    const leftRef = ref55();
    const rightRef = ref55();
    const state = reactive20({
      offset: 0,
      dragging: false
    });
    const touch = useTouch();
    const getWidthByRef = (ref210) => ref210.value ? useRect(ref210).width : 0;
    const leftWidth = computed47(() => isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef));
    const rightWidth = computed47(() => isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef));
    const open = (side) => {
      state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
      if (!opened) {
        opened = true;
        emit("open", {
          name: props.name,
          position: side
        });
      }
    };
    const close = (position) => {
      state.offset = 0;
      if (opened) {
        opened = false;
        emit("close", {
          name: props.name,
          position
        });
      }
    };
    const toggle = (side) => {
      const offset2 = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width2 = side === "left" ? leftWidth.value : rightWidth.value;
      if (width2 && offset2 > width2 * threshold) {
        open(side);
      } else {
        close(side);
      }
    };
    const onTouchStart = (event) => {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };
    const onTouchMove = (event) => {
      if (props.disabled) {
        return;
      }
      const {
        deltaX
      } = touch;
      touch.move(event);
      if (touch.isHorizontal()) {
        lockClick2 = true;
        state.dragging = true;
        const isEdge = !opened || deltaX.value * startOffset < 0;
        if (isEdge) {
          preventDefault(event, props.stopPropagation);
        }
        state.offset = clamp(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
      }
    };
    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? "left" : "right");
        setTimeout(() => {
          lockClick2 = false;
        }, 0);
      }
    };
    const onClick = (position = "outside") => {
      emit("click", position);
      if (opened && !lockClick2) {
        callInterceptor(props.beforeClose, {
          args: [{
            name: props.name,
            position
          }],
          done: () => close(position)
        });
      }
    };
    const getClickHandler = (position, stop) => (event) => {
      if (stop) {
        event.stopPropagation();
      }
      onClick(position);
    };
    const renderSideContent = (side, ref210) => {
      const contentSlot = slots[side];
      if (contentSlot) {
        return _createVNode99("div", {
          "ref": ref210,
          "class": bem88(side),
          "onClick": getClickHandler(side, true)
        }, [contentSlot()]);
      }
    };
    useExpose({
      open,
      close
    });
    useClickAway(root, () => onClick("outside"), {
      eventName: "touchstart"
    });
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => {
      var _a;
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? "0s" : ".6s"
      };
      return _createVNode99("div", {
        "ref": root,
        "class": bem88(),
        "onClick": getClickHandler("cell", lockClick2),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [_createVNode99("div", {
        "class": bem88("wrapper"),
        "style": wrapperStyle
      }, [renderSideContent("left", leftRef), (_a = slots.default) == null ? void 0 : _a.call(slots), renderSideContent("right", rightRef)])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/swipe-cell/index.mjs
var SwipeCell = withInstall(stdin_default96);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabbar/Tabbar.mjs
import { createVNode as _createVNode100 } from "vue";
import { ref as ref56, defineComponent as defineComponent95 } from "vue";
var [name93, bem89] = createNamespace("tabbar");
var tabbarProps = {
  route: Boolean,
  fixed: truthProp,
  border: truthProp,
  zIndex: numericProp,
  placeholder: Boolean,
  activeColor: String,
  beforeChange: Function,
  inactiveColor: String,
  modelValue: makeNumericProp(0),
  safeAreaInsetBottom: {
    type: Boolean,
    default: null
  }
};
var TABBAR_KEY = Symbol(name93);
var stdin_default97 = defineComponent95({
  name: name93,
  props: tabbarProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref56();
    const {
      linkChildren
    } = useChildren(TABBAR_KEY);
    const renderPlaceholder = usePlaceholder(root, bem89);
    const enableSafeArea = () => {
      var _a;
      return (_a = props.safeAreaInsetBottom) != null ? _a : props.fixed;
    };
    const renderTabbar = () => {
      var _a;
      const {
        fixed,
        zIndex,
        border
      } = props;
      return _createVNode100("div", {
        "ref": root,
        "role": "tablist",
        "style": getZIndexStyle(zIndex),
        "class": [bem89({
          fixed
        }), {
          [BORDER_TOP_BOTTOM]: border,
          "van-safe-area-bottom": enableSafeArea()
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const setActive = (active, afterChange) => {
      callInterceptor(props.beforeChange, {
        args: [active],
        done() {
          emit("update:modelValue", active);
          emit("change", active);
          afterChange();
        }
      });
    };
    linkChildren({
      props,
      setActive
    });
    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderTabbar);
      }
      return renderTabbar();
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabbar/index.mjs
var Tabbar = withInstall(stdin_default97);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabbar-item/TabbarItem.mjs
import { mergeProps as _mergeProps32, createVNode as _createVNode101 } from "vue";
import { computed as computed48, defineComponent as defineComponent96, getCurrentInstance as getCurrentInstance9 } from "vue";
var [name94, bem90] = createNamespace("tabbar-item");
var tabbarItemProps = extend({}, routeProps, {
  dot: Boolean,
  icon: String,
  name: numericProp,
  badge: numericProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default98 = defineComponent96({
  name: name94,
  props: tabbarItemProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const vm = getCurrentInstance9().proxy;
    const {
      parent,
      index
    } = useParent(TABBAR_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <TabbarItem> must be a child component of <Tabbar>.");
      }
      return;
    }
    const active = computed48(() => {
      var _a;
      const {
        route: route22,
        modelValue
      } = parent.props;
      if (route22 && "$route" in vm) {
        const {
          $route
        } = vm;
        const {
          to
        } = props;
        const config = isObject(to) ? to : {
          path: to
        };
        return !!$route.matched.find((val) => {
          const pathMatched = "path" in config && config.path === val.path;
          const nameMatched = "name" in config && config.name === val.name;
          return pathMatched || nameMatched;
        });
      }
      return ((_a = props.name) != null ? _a : index.value) === modelValue;
    });
    const onClick = (event) => {
      var _a;
      if (!active.value) {
        parent.setActive((_a = props.name) != null ? _a : index.value, route2);
      }
      emit("click", event);
    };
    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }
      if (props.icon) {
        return _createVNode101(Icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        dot,
        badge
      } = props;
      const {
        activeColor,
        inactiveColor
      } = parent.props;
      const color = active.value ? activeColor : inactiveColor;
      return _createVNode101("div", {
        "role": "tab",
        "class": bem90({
          active: active.value
        }),
        "style": {
          color
        },
        "tabindex": 0,
        "aria-selected": active.value,
        "onClick": onClick
      }, [_createVNode101(Badge, _mergeProps32({
        "dot": dot,
        "class": bem90("icon"),
        "content": badge
      }, props.badgeProps), {
        default: renderIcon
      }), _createVNode101("div", {
        "class": bem90("text")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        active: active.value
      })])]);
    };
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tabbar-item/index.mjs
var TabbarItem = withInstall(stdin_default98);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tree-select/TreeSelect.mjs
import { createVNode as _createVNode102 } from "vue";
import { defineComponent as defineComponent97 } from "vue";
var [name95, bem91] = createNamespace("tree-select");
var treeSelectProps = {
  max: makeNumericProp(Infinity),
  items: makeArrayProp(),
  height: makeNumericProp(300),
  selectedIcon: makeStringProp("success"),
  mainActiveIndex: makeNumericProp(0),
  activeId: {
    type: [Number, String, Array],
    default: 0
  }
};
var stdin_default99 = defineComponent97({
  name: name95,
  props: treeSelectProps,
  emits: ["click-nav", "click-item", "update:activeId", "update:mainActiveIndex"],
  setup(props, {
    emit,
    slots
  }) {
    const isActiveItem = (id) => Array.isArray(props.activeId) ? props.activeId.includes(id) : props.activeId === id;
    const renderSubItem = (item) => {
      const onClick = () => {
        if (item.disabled) {
          return;
        }
        let activeId;
        if (Array.isArray(props.activeId)) {
          activeId = props.activeId.slice();
          const index = activeId.indexOf(item.id);
          if (index !== -1) {
            activeId.splice(index, 1);
          } else if (activeId.length < props.max) {
            activeId.push(item.id);
          }
        } else {
          activeId = item.id;
        }
        emit("update:activeId", activeId);
        emit("click-item", item);
      };
      return _createVNode102("div", {
        "key": item.id,
        "class": ["van-ellipsis", bem91("item", {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "onClick": onClick
      }, [item.text, isActiveItem(item.id) && _createVNode102(Icon, {
        "name": props.selectedIcon,
        "class": bem91("selected")
      }, null)]);
    };
    const onSidebarChange = (index) => {
      emit("update:mainActiveIndex", index);
    };
    const onClickSidebarItem = (index) => emit("click-nav", index);
    const renderSidebar = () => {
      const Items = props.items.map((item) => _createVNode102(SidebarItem, {
        "dot": item.dot,
        "title": item.text,
        "badge": item.badge,
        "class": [bem91("nav-item"), item.className],
        "disabled": item.disabled,
        "onClick": onClickSidebarItem
      }, null));
      return _createVNode102(Sidebar, {
        "class": bem91("nav"),
        "modelValue": props.mainActiveIndex,
        "onChange": onSidebarChange
      }, {
        default: () => [Items]
      });
    };
    const renderContent = () => {
      if (slots.content) {
        return slots.content();
      }
      const selected = props.items[+props.mainActiveIndex] || {};
      if (selected.children) {
        return selected.children.map(renderSubItem);
      }
    };
    return () => _createVNode102("div", {
      "class": bem91(),
      "style": {
        height: addUnit(props.height)
      }
    }, [renderSidebar(), _createVNode102("div", {
      "class": bem91("content")
    }, [renderContent()])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/tree-select/index.mjs
var TreeSelect = withInstall(stdin_default99);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/uploader/Uploader.mjs
import { createVNode as _createVNode104, mergeProps as _mergeProps33 } from "vue";
import { ref as ref57, reactive as reactive21, defineComponent as defineComponent99, onBeforeUnmount as onBeforeUnmount7 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/uploader/utils.mjs
var [name96, bem92, t20] = createNamespace("uploader");
function readFileContent(file, resultType) {
  return new Promise((resolve) => {
    if (resultType === "file") {
      resolve();
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    if (resultType === "dataUrl") {
      reader.readAsDataURL(file);
    } else if (resultType === "text") {
      reader.readAsText(file);
    }
  });
}
function isOversize(items, maxSize) {
  return toArray(items).some((item) => {
    if (item.file) {
      if (isFunction(maxSize)) {
        return maxSize(item.file);
      }
      return item.file.size > maxSize;
    }
    return false;
  });
}
function filterFiles(items, maxSize) {
  const valid = [];
  const invalid = [];
  items.forEach((item) => {
    if (isOversize(item, maxSize)) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });
  return { valid, invalid };
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
var isImageUrl = (url) => IMAGE_REGEXP.test(url);
function isImageFile(item) {
  if (item.isImage) {
    return true;
  }
  if (item.file && item.file.type) {
    return item.file.type.indexOf("image") === 0;
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  if (typeof item.content === "string") {
    return item.content.indexOf("data:image") === 0;
  }
  return false;
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/uploader/UploaderPreviewItem.mjs
import { createVNode as _createVNode103 } from "vue";
import { defineComponent as defineComponent98 } from "vue";
var stdin_default100 = defineComponent98({
  props: {
    name: numericProp,
    item: makeRequiredProp(Object),
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String, Array],
    beforeDelete: Function
  },
  emits: ["delete", "preview"],
  setup(props, {
    emit,
    slots
  }) {
    const renderMask = () => {
      const {
        status,
        message
      } = props.item;
      if (status === "uploading" || status === "failed") {
        const MaskIcon = status === "failed" ? _createVNode103(Icon, {
          "name": "close",
          "class": bem92("mask-icon")
        }, null) : _createVNode103(Loading, {
          "class": bem92("loading")
        }, null);
        const showMessage = isDef(message) && message !== "";
        return _createVNode103("div", {
          "class": bem92("mask")
        }, [MaskIcon, showMessage && _createVNode103("div", {
          "class": bem92("mask-message")
        }, [message])]);
      }
    };
    const onDelete = (event) => {
      const {
        name: name97,
        item,
        index,
        beforeDelete
      } = props;
      event.stopPropagation();
      callInterceptor(beforeDelete, {
        args: [item, {
          name: name97,
          index
        }],
        done: () => emit("delete")
      });
    };
    const onPreview = () => emit("preview");
    const renderDeleteIcon = () => {
      if (props.deletable && props.item.status !== "uploading") {
        const slot = slots["preview-delete"];
        return _createVNode103("div", {
          "role": "button",
          "class": bem92("preview-delete", {
            shadow: !slot
          }),
          "tabindex": 0,
          "aria-label": t20("delete"),
          "onClick": onDelete
        }, [slot ? slot() : _createVNode103(Icon, {
          "name": "cross",
          "class": bem92("preview-delete-icon")
        }, null)]);
      }
    };
    const renderCover = () => {
      if (slots["preview-cover"]) {
        const {
          index,
          item
        } = props;
        return _createVNode103("div", {
          "class": bem92("preview-cover")
        }, [slots["preview-cover"](extend({
          index
        }, item))]);
      }
    };
    const renderPreview = () => {
      const {
        item,
        lazyLoad,
        imageFit,
        previewSize
      } = props;
      if (isImageFile(item)) {
        return _createVNode103(Image2, {
          "fit": imageFit,
          "src": item.content || item.url,
          "class": bem92("preview-image"),
          "width": Array.isArray(previewSize) ? previewSize[0] : previewSize,
          "height": Array.isArray(previewSize) ? previewSize[1] : previewSize,
          "lazyLoad": lazyLoad,
          "onClick": onPreview
        }, {
          default: renderCover
        });
      }
      return _createVNode103("div", {
        "class": bem92("file"),
        "style": getSizeStyle(props.previewSize)
      }, [_createVNode103(Icon, {
        "class": bem92("file-icon"),
        "name": "description"
      }, null), _createVNode103("div", {
        "class": [bem92("file-name"), "van-ellipsis"]
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };
    return () => _createVNode103("div", {
      "class": bem92("preview")
    }, [renderPreview(), renderMask(), renderDeleteIcon()]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/uploader/Uploader.mjs
var uploaderProps = {
  name: makeNumericProp(""),
  accept: makeStringProp("image/*"),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: makeNumericProp(Infinity),
  imageFit: makeStringProp("cover"),
  resultType: makeStringProp("dataUrl"),
  uploadIcon: makeStringProp("photograph"),
  uploadText: String,
  deletable: truthProp,
  afterRead: Function,
  showUpload: truthProp,
  modelValue: makeArrayProp(),
  beforeRead: Function,
  beforeDelete: Function,
  previewSize: [Number, String, Array],
  previewImage: truthProp,
  previewOptions: Object,
  previewFullImage: truthProp,
  maxSize: {
    type: [Number, String, Function],
    default: Infinity
  }
};
var stdin_default101 = defineComponent99({
  name: name96,
  props: uploaderProps,
  emits: ["delete", "oversize", "click-upload", "close-preview", "click-preview", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const inputRef = ref57();
    const urls = [];
    const getDetail = (index = props.modelValue.length) => ({
      name: props.name,
      index
    });
    const resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = "";
      }
    };
    const onAfterRead = (items) => {
      resetInput();
      if (isOversize(items, props.maxSize)) {
        if (Array.isArray(items)) {
          const result = filterFiles(items, props.maxSize);
          items = result.valid;
          emit("oversize", result.invalid, getDetail());
          if (!items.length) {
            return;
          }
        } else {
          emit("oversize", items, getDetail());
          return;
        }
      }
      items = reactive21(items);
      emit("update:modelValue", [...props.modelValue, ...toArray(items)]);
      if (props.afterRead) {
        props.afterRead(items, getDetail());
      }
    };
    const readFile = (files) => {
      const {
        maxCount,
        modelValue,
        resultType
      } = props;
      if (Array.isArray(files)) {
        const remainCount = +maxCount - modelValue.length;
        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }
        Promise.all(files.map((file) => readFileContent(file, resultType))).then((contents) => {
          const fileList = files.map((file, index) => {
            const result = {
              file,
              status: "",
              message: ""
            };
            if (contents[index]) {
              result.content = contents[index];
            }
            return result;
          });
          onAfterRead(fileList);
        });
      } else {
        readFileContent(files, resultType).then((content) => {
          const result = {
            file: files,
            status: "",
            message: ""
          };
          if (content) {
            result.content = content;
          }
          onAfterRead(result);
        });
      }
    };
    const onChange = (event) => {
      const {
        files
      } = event.target;
      if (props.disabled || !files || !files.length) {
        return;
      }
      const file = files.length === 1 ? files[0] : [].slice.call(files);
      if (props.beforeRead) {
        const response = props.beforeRead(file, getDetail());
        if (!response) {
          resetInput();
          return;
        }
        if (isPromise(response)) {
          response.then((data) => {
            if (data) {
              readFile(data);
            } else {
              readFile(file);
            }
          }).catch(resetInput);
          return;
        }
      }
      readFile(file);
    };
    let imagePreview;
    const onClosePreview = () => emit("close-preview");
    const previewImage = (item) => {
      if (props.previewFullImage) {
        const imageFiles = props.modelValue.filter(isImageFile);
        const images = imageFiles.map((item2) => {
          if (item2.file && !item2.url && item2.status !== "failed") {
            item2.url = URL.createObjectURL(item2.file);
            urls.push(item2.url);
          }
          return item2.url;
        }).filter(Boolean);
        imagePreview = ImagePreview(extend({
          images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props.previewOptions));
      }
    };
    const closeImagePreview = () => {
      if (imagePreview) {
        imagePreview.close();
      }
    };
    const deleteFile = (item, index) => {
      const fileList = props.modelValue.slice(0);
      fileList.splice(index, 1);
      emit("update:modelValue", fileList);
      emit("delete", item, getDetail(index));
    };
    const renderPreviewItem = (item, index) => {
      const needPickData = ["imageFit", "deletable", "previewSize", "beforeDelete"];
      const previewData = extend(pick(props, needPickData), pick(item, needPickData, true));
      return _createVNode104(stdin_default100, _mergeProps33({
        "item": item,
        "index": index,
        "onClick": () => emit("click-preview", item, getDetail(index)),
        "onDelete": () => deleteFile(item, index),
        "onPreview": () => previewImage(item)
      }, pick(props, ["name", "lazyLoad"]), previewData), pick(slots, ["preview-cover", "preview-delete"]));
    };
    const renderPreviewList = () => {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem);
      }
    };
    const onClickUpload = (event) => emit("click-upload", event);
    const renderUpload = () => {
      if (props.modelValue.length >= props.maxCount || !props.showUpload) {
        return;
      }
      const Input = props.readonly ? null : _createVNode104("input", {
        "ref": inputRef,
        "type": "file",
        "class": bem92("input"),
        "accept": props.accept,
        "capture": props.capture,
        "multiple": props.multiple,
        "disabled": props.disabled,
        "onChange": onChange
      }, null);
      if (slots.default) {
        return _createVNode104("div", {
          "class": bem92("input-wrapper"),
          "onClick": onClickUpload
        }, [slots.default(), Input]);
      }
      return _createVNode104("div", {
        "class": bem92("upload", {
          readonly: props.readonly
        }),
        "style": getSizeStyle(props.previewSize),
        "onClick": onClickUpload
      }, [_createVNode104(Icon, {
        "name": props.uploadIcon,
        "class": bem92("upload-icon")
      }, null), props.uploadText && _createVNode104("span", {
        "class": bem92("upload-text")
      }, [props.uploadText]), Input]);
    };
    const chooseFile = () => {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click();
      }
    };
    onBeforeUnmount7(() => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    });
    useExpose({
      chooseFile,
      closeImagePreview
    });
    useCustomFieldValue(() => props.modelValue);
    return () => _createVNode104("div", {
      "class": bem92()
    }, [_createVNode104("div", {
      "class": bem92("wrapper", {
        disabled: props.disabled
      })
    }, [renderPreviewList(), renderUpload()])]);
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/uploader/index.mjs
var Uploader = withInstall(stdin_default101);

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/lazy.mjs
import { nextTick as nextTick24 } from "vue";

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/util.mjs
var hasIntersectionObserver = inBrowser2 && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;
var modeType = {
  event: "event",
  observer: "observer"
};
function remove(arr, item) {
  if (!arr.length)
    return;
  const index = arr.indexOf(item);
  if (index > -1)
    return arr.splice(index, 1);
}
function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== "IMG" || !el.getAttribute("data-srcset"))
    return;
  let options = el.getAttribute("data-srcset");
  const container = el.parentNode;
  const containerWidth = container.offsetWidth * scale;
  let spaceIndex;
  let tmpSrc;
  let tmpWidth;
  options = options.trim().split(",");
  const result = options.map((item) => {
    item = item.trim();
    spaceIndex = item.lastIndexOf(" ");
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(
        item.substr(spaceIndex + 1, item.length - spaceIndex - 2),
        10
      );
    }
    return [tmpWidth, tmpSrc];
  });
  result.sort((a, b) => {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf(".webp", b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf(".webp", a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  let bestSelectedSrc = "";
  let tmpOption;
  for (let i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    const next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }
  return bestSelectedSrc;
}
var getDPR = (scale = 1) => inBrowser2 ? window.devicePixelRatio || scale : scale;
function supportWebp() {
  if (!inBrowser2)
    return false;
  let support = true;
  try {
    const elem = document.createElement("canvas");
    if (elem.getContext && elem.getContext("2d")) {
      support = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }
  } catch (err) {
    support = false;
  }
  return support;
}
function throttle(action, delay) {
  let timeout = null;
  let lastRun = 0;
  return function(...args) {
    if (timeout) {
      return;
    }
    const elapsed = Date.now() - lastRun;
    const runCallback = () => {
      lastRun = Date.now();
      timeout = false;
      action.apply(this, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}
function on(el, type, func) {
  el.addEventListener(type, func, {
    capture: false,
    passive: true
  });
}
function off(el, type, func) {
  el.removeEventListener(type, func, false);
}
var loadImageAsync = (item, resolve, reject) => {
  const image = new Image();
  if (!item || !item.src) {
    return reject(new Error("image src is required"));
  }
  image.src = item.src;
  if (item.cors) {
    image.crossOrigin = item.cors;
  }
  image.onload = () => resolve({
    naturalHeight: image.naturalHeight,
    naturalWidth: image.naturalWidth,
    src: image.src
  });
  image.onerror = (e) => reject(e);
};
var ImageCache = class {
  constructor({ max }) {
    this.options = {
      max: max || 100
    };
    this.caches = [];
  }
  has(key) {
    return this.caches.indexOf(key) > -1;
  }
  add(key) {
    if (this.has(key))
      return;
    this.caches.push(key);
    if (this.caches.length > this.options.max) {
      this.free();
    }
  }
  free() {
    this.caches.shift();
  }
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/listener.mjs
var ReactiveListener = class {
  constructor({
    el,
    src,
    error,
    loading,
    bindType,
    $parent,
    options,
    cors,
    elRenderer,
    imageCache
  }) {
    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;
    this.cors = cors;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.options = options;
    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this.imageCache = imageCache;
    this.performanceData = {
      loadStart: 0,
      loadEnd: 0
    };
    this.filter();
    this.initState();
    this.render("loading", false);
  }
  initState() {
    if ("dataset" in this.el) {
      this.el.dataset.src = this.src;
    } else {
      this.el.setAttribute("data-src", this.src);
    }
    this.state = {
      loading: false,
      error: false,
      loaded: false,
      rendered: false
    };
  }
  record(event) {
    this.performanceData[event] = Date.now();
  }
  update({ src, loading, error }) {
    const oldSrc = this.src;
    this.src = src;
    this.loading = loading;
    this.error = error;
    this.filter();
    if (oldSrc !== this.src) {
      this.attempt = 0;
      this.initState();
    }
  }
  checkInView() {
    const rect = useRect(this.el);
    return rect.top < window.innerHeight * this.options.preLoad && rect.bottom > this.options.preLoadTop && rect.left < window.innerWidth * this.options.preLoad && rect.right > 0;
  }
  filter() {
    Object.keys(this.options.filter).forEach((key) => {
      this.options.filter[key](this, this.options);
    });
  }
  renderLoading(cb) {
    this.state.loading = true;
    loadImageAsync(
      {
        src: this.loading,
        cors: this.cors
      },
      () => {
        this.render("loading", false);
        this.state.loading = false;
        cb();
      },
      () => {
        cb();
        this.state.loading = false;
        if (!this.options.silent)
          console.warn(
            `[@vant/lazyload] load failed with loading image(${this.loading})`
          );
      }
    );
  }
  load(onFinish = noop) {
    if (this.attempt > this.options.attempt - 1 && this.state.error) {
      if (!this.options.silent) {
        console.log(
          `[@vant/lazyload] ${this.src} tried too more than ${this.options.attempt} times`
        );
      }
      onFinish();
      return;
    }
    if (this.state.rendered && this.state.loaded)
      return;
    if (this.imageCache.has(this.src)) {
      this.state.loaded = true;
      this.render("loaded", true);
      this.state.rendered = true;
      return onFinish();
    }
    this.renderLoading(() => {
      var _a, _b;
      this.attempt++;
      (_b = (_a = this.options.adapter).beforeLoad) == null ? void 0 : _b.call(_a, this, this.options);
      this.record("loadStart");
      loadImageAsync(
        {
          src: this.src,
          cors: this.cors
        },
        (data) => {
          this.naturalHeight = data.naturalHeight;
          this.naturalWidth = data.naturalWidth;
          this.state.loaded = true;
          this.state.error = false;
          this.record("loadEnd");
          this.render("loaded", false);
          this.state.rendered = true;
          this.imageCache.add(this.src);
          onFinish();
        },
        (err) => {
          !this.options.silent && console.error(err);
          this.state.error = true;
          this.state.loaded = false;
          this.render("error", false);
        }
      );
    });
  }
  render(state, cache) {
    this.elRenderer(this, state, cache);
  }
  performance() {
    let state = "loading";
    let time = 0;
    if (this.state.loaded) {
      state = "loaded";
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3;
    }
    if (this.state.error)
      state = "error";
    return {
      src: this.src,
      state,
      time
    };
  }
  $destroy() {
    this.el = null;
    this.src = null;
    this.error = null;
    this.loading = null;
    this.bindType = null;
    this.attempt = 0;
  }
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/lazy.mjs
var DEFAULT_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var DEFAULT_EVENTS = [
  "scroll",
  "wheel",
  "mousewheel",
  "resize",
  "animationend",
  "transitionend",
  "touchmove"
];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
function stdin_default102() {
  return class Lazy {
    constructor({
      preLoad,
      error,
      throttleWait,
      preLoadTop,
      dispatchEvent,
      loading,
      attempt,
      silent = true,
      scale,
      listenEvents,
      filter,
      adapter,
      observer,
      observerOptions
    }) {
      this.mode = modeType.event;
      this.listeners = [];
      this.targetIndex = 0;
      this.targets = [];
      this.options = {
        silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
      };
      this.initEvent();
      this.imageCache = new ImageCache({ max: 200 });
      this.lazyLoadHandler = throttle(
        this.lazyLoadHandler.bind(this),
        this.options.throttleWait
      );
      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }
    config(options = {}) {
      Object.assign(this.options, options);
    }
    performance() {
      return this.listeners.map((item) => item.performance());
    }
    addLazyBox(vm) {
      this.listeners.push(vm);
      if (inBrowser2) {
        this.addListenerTarget(window);
        this.observer && this.observer.observe(vm.el);
        if (vm.$el && vm.$el.parentNode) {
          this.addListenerTarget(vm.$el.parentNode);
        }
      }
    }
    add(el, binding, vnode) {
      if (this.listeners.some((item) => item.el === el)) {
        this.update(el, binding);
        return nextTick24(this.lazyLoadHandler);
      }
      const value = this.valueFormatter(binding.value);
      let { src } = value;
      nextTick24(() => {
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        this.observer && this.observer.observe(el);
        const container = Object.keys(binding.modifiers)[0];
        let $parent;
        if (container) {
          $parent = vnode.context.$refs[container];
          $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
        }
        if (!$parent) {
          $parent = getScrollParent(el);
        }
        const newListener = new ReactiveListener({
          bindType: binding.arg,
          $parent,
          el,
          src,
          loading: value.loading,
          error: value.error,
          cors: value.cors,
          elRenderer: this.elRenderer.bind(this),
          options: this.options,
          imageCache: this.imageCache
        });
        this.listeners.push(newListener);
        if (inBrowser2) {
          this.addListenerTarget(window);
          this.addListenerTarget($parent);
        }
        this.lazyLoadHandler();
        nextTick24(() => this.lazyLoadHandler());
      });
    }
    update(el, binding, vnode) {
      const value = this.valueFormatter(binding.value);
      let { src } = value;
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      const exist = this.listeners.find((item) => item.el === el);
      if (!exist) {
        this.add(el, binding, vnode);
      } else {
        exist.update({
          src,
          error: value.error,
          loading: value.loading
        });
      }
      if (this.observer) {
        this.observer.unobserve(el);
        this.observer.observe(el);
      }
      this.lazyLoadHandler();
      nextTick24(() => this.lazyLoadHandler());
    }
    remove(el) {
      if (!el)
        return;
      this.observer && this.observer.unobserve(el);
      const existItem = this.listeners.find((item) => item.el === el);
      if (existItem) {
        this.removeListenerTarget(existItem.$parent);
        this.removeListenerTarget(window);
        remove(this.listeners, existItem);
        existItem.$destroy();
      }
    }
    removeComponent(vm) {
      if (!vm)
        return;
      remove(this.listeners, vm);
      this.observer && this.observer.unobserve(vm.el);
      if (vm.$parent && vm.$el.parentNode) {
        this.removeListenerTarget(vm.$el.parentNode);
      }
      this.removeListenerTarget(window);
    }
    setMode(mode) {
      if (!hasIntersectionObserver && mode === modeType.observer) {
        mode = modeType.event;
      }
      this.mode = mode;
      if (mode === modeType.event) {
        if (this.observer) {
          this.listeners.forEach((listener) => {
            this.observer.unobserve(listener.el);
          });
          this.observer = null;
        }
        this.targets.forEach((target) => {
          this.initListen(target.el, true);
        });
      } else {
        this.targets.forEach((target) => {
          this.initListen(target.el, false);
        });
        this.initIntersectionObserver();
      }
    }
    addListenerTarget(el) {
      if (!el)
        return;
      let target = this.targets.find((target2) => target2.el === el);
      if (!target) {
        target = {
          el,
          id: ++this.targetIndex,
          childrenCount: 1,
          listened: true
        };
        this.mode === modeType.event && this.initListen(target.el, true);
        this.targets.push(target);
      } else {
        target.childrenCount++;
      }
      return this.targetIndex;
    }
    removeListenerTarget(el) {
      this.targets.forEach((target, index) => {
        if (target.el === el) {
          target.childrenCount--;
          if (!target.childrenCount) {
            this.initListen(target.el, false);
            this.targets.splice(index, 1);
            target = null;
          }
        }
      });
    }
    initListen(el, start2) {
      this.options.ListenEvents.forEach(
        (evt) => (start2 ? on : off)(el, evt, this.lazyLoadHandler)
      );
    }
    initEvent() {
      this.Event = {
        listeners: {
          loading: [],
          loaded: [],
          error: []
        }
      };
      this.$on = (event, func) => {
        if (!this.Event.listeners[event])
          this.Event.listeners[event] = [];
        this.Event.listeners[event].push(func);
      };
      this.$once = (event, func) => {
        const on2 = (...args) => {
          this.$off(event, on2);
          func.apply(this, args);
        };
        this.$on(event, on2);
      };
      this.$off = (event, func) => {
        if (!func) {
          if (!this.Event.listeners[event])
            return;
          this.Event.listeners[event].length = 0;
          return;
        }
        remove(this.Event.listeners[event], func);
      };
      this.$emit = (event, context, inCache) => {
        if (!this.Event.listeners[event])
          return;
        this.Event.listeners[event].forEach((func) => func(context, inCache));
      };
    }
    lazyLoadHandler() {
      const freeList = [];
      this.listeners.forEach((listener) => {
        if (!listener.el || !listener.el.parentNode) {
          freeList.push(listener);
        }
        const catIn = listener.checkInView();
        if (!catIn)
          return;
        listener.load();
      });
      freeList.forEach((item) => {
        remove(this.listeners, item);
        item.$destroy();
      });
    }
    initIntersectionObserver() {
      if (!hasIntersectionObserver) {
        return;
      }
      this.observer = new IntersectionObserver(
        this.observerHandler.bind(this),
        this.options.observerOptions
      );
      if (this.listeners.length) {
        this.listeners.forEach((listener) => {
          this.observer.observe(listener.el);
        });
      }
    }
    observerHandler(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.listeners.forEach((listener) => {
            if (listener.el === entry.target) {
              if (listener.state.loaded)
                return this.observer.unobserve(listener.el);
              listener.load();
            }
          });
        }
      });
    }
    elRenderer(listener, state, cache) {
      if (!listener.el)
        return;
      const { el, bindType } = listener;
      let src;
      switch (state) {
        case "loading":
          src = listener.loading;
          break;
        case "error":
          src = listener.error;
          break;
        default:
          ({ src } = listener);
          break;
      }
      if (bindType) {
        el.style[bindType] = 'url("' + src + '")';
      } else if (el.getAttribute("src") !== src) {
        el.setAttribute("src", src);
      }
      el.setAttribute("lazy", state);
      this.$emit(state, listener, cache);
      this.options.adapter[state] && this.options.adapter[state](listener, this.options);
      if (this.options.dispatchEvent) {
        const event = new CustomEvent(state, {
          detail: listener
        });
        el.dispatchEvent(event);
      }
    }
    valueFormatter(value) {
      let src = value;
      let { loading, error } = this.options;
      if (isObject(value)) {
        if (!value.src && !this.options.silent) {
          console.error("[@vant/lazyload] miss src with " + value);
        }
        ({ src } = value);
        loading = value.loading || this.options.loading;
        error = value.error || this.options.error;
      }
      return {
        src,
        loading,
        error
      };
    }
  };
}

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/lazy-component.mjs
import { h } from "vue";
var stdin_default103 = (lazy) => ({
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  emits: ["show"],
  render() {
    return h(
      this.tag,
      this.show && this.$slots.default ? this.$slots.default() : null
    );
  },
  data() {
    return {
      el: null,
      state: {
        loaded: false
      },
      show: false
    };
  },
  mounted() {
    this.el = this.$el;
    lazy.addLazyBox(this);
    lazy.lazyLoadHandler();
  },
  beforeUnmount() {
    lazy.removeComponent(this);
  },
  methods: {
    checkInView() {
      const rect = useRect(this.$el);
      return inBrowser2 && rect.top < window.innerHeight * lazy.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazy.options.preLoad && rect.right > 0;
    },
    load() {
      this.show = true;
      this.state.loaded = true;
      this.$emit("show", this);
    },
    destroy() {
      return this.$destroy;
    }
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/lazy-container.mjs
var defaultOptions2 = {
  selector: "img"
};
var LazyContainer = class {
  constructor({ el, binding, vnode, lazy }) {
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this.queue = [];
    this.update({ el, binding });
  }
  update({ el, binding }) {
    this.el = el;
    this.options = Object.assign({}, defaultOptions2, binding.value);
    const imgs = this.getImgs();
    imgs.forEach((el2) => {
      this.lazy.add(
        el2,
        Object.assign({}, this.binding, {
          value: {
            src: "dataset" in el2 ? el2.dataset.src : el2.getAttribute("data-src"),
            error: ("dataset" in el2 ? el2.dataset.error : el2.getAttribute("data-error")) || this.options.error,
            loading: ("dataset" in el2 ? el2.dataset.loading : el2.getAttribute("data-loading")) || this.options.loading
          }
        }),
        this.vnode
      );
    });
  }
  getImgs() {
    return Array.from(this.el.querySelectorAll(this.options.selector));
  }
  clear() {
    const imgs = this.getImgs();
    imgs.forEach((el) => this.lazy.remove(el));
    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  }
};
var LazyContainerManager = class {
  constructor({ lazy }) {
    this.lazy = lazy;
    this.queue = [];
  }
  bind(el, binding, vnode) {
    const container = new LazyContainer({
      el,
      binding,
      vnode,
      lazy: this.lazy
    });
    this.queue.push(container);
  }
  update(el, binding, vnode) {
    const container = this.queue.find((item) => item.el === el);
    if (!container)
      return;
    container.update({ el, binding, vnode });
  }
  unbind(el) {
    const container = this.queue.find((item) => item.el === el);
    if (!container)
      return;
    container.clear();
    remove(this.queue, container);
  }
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/lazy-image.mjs
import { h as h2 } from "vue";
var stdin_default104 = (lazyManager) => ({
  props: {
    src: [String, Object],
    tag: {
      type: String,
      default: "img"
    }
  },
  render() {
    var _a, _b;
    return h2(
      this.tag,
      {
        src: this.renderSrc
      },
      (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)
    );
  },
  data() {
    return {
      el: null,
      options: {
        src: "",
        error: "",
        loading: "",
        attempt: lazyManager.options.attempt
      },
      state: {
        loaded: false,
        error: false,
        attempt: 0
      },
      renderSrc: ""
    };
  },
  watch: {
    src() {
      this.init();
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    }
  },
  created() {
    this.init();
    this.renderSrc = this.options.loading;
  },
  mounted() {
    this.el = this.$el;
    lazyManager.addLazyBox(this);
    lazyManager.lazyLoadHandler();
  },
  beforeUnmount() {
    lazyManager.removeComponent(this);
  },
  methods: {
    init() {
      const { src, loading, error } = lazyManager.valueFormatter(this.src);
      this.state.loaded = false;
      this.options.src = src;
      this.options.error = error;
      this.options.loading = loading;
      this.renderSrc = this.options.loading;
    },
    checkInView() {
      const rect = useRect(this.$el);
      return rect.top < window.innerHeight * lazyManager.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazyManager.options.preLoad && rect.right > 0;
    },
    load(onFinish = noop) {
      if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
        if (!lazyManager.options.silent) {
          console.log(
            `[@vant/lazyload] ${this.options.src} tried too more than ${this.options.attempt} times`
          );
        }
        onFinish();
        return;
      }
      const { src } = this.options;
      loadImageAsync(
        { src },
        ({ src: src2 }) => {
          this.renderSrc = src2;
          this.state.loaded = true;
        },
        () => {
          this.state.attempt++;
          this.renderSrc = this.options.error;
          this.state.error = true;
        }
      );
    }
  }
});

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/lazyload/vue-lazyload/index.mjs
var Lazyload = {
  install(app, options = {}) {
    const LazyClass = stdin_default102();
    const lazy = new LazyClass(options);
    const lazyContainer = new LazyContainerManager({ lazy });
    app.config.globalProperties.$Lazyload = lazy;
    if (options.lazyComponent) {
      app.component("LazyComponent", stdin_default103(lazy));
    }
    if (options.lazyImage) {
      app.component("LazyImage", stdin_default104(lazy));
    }
    app.directive("lazy", {
      beforeMount: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.remove.bind(lazy)
    });
    app.directive("lazy-container", {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer)
    });
  }
};

// ../../../../../微信小程序/teaCulture/node_modules/vant/es/index.mjs
var version = "3.6.11";
function install(app) {
  const components = [
    ActionBar,
    ActionBarButton,
    ActionBarIcon,
    ActionSheet,
    AddressEdit,
    AddressList,
    Area,
    Badge,
    Button,
    Calendar,
    Card,
    Cascader,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Circle,
    Col,
    Collapse,
    CollapseItem,
    ConfigProvider,
    ContactCard,
    ContactEdit,
    ContactList,
    CountDown,
    Coupon,
    CouponCell,
    CouponList,
    DatetimePicker,
    Dialog,
    Divider,
    DropdownItem,
    DropdownMenu,
    Empty,
    Field,
    Form,
    Grid,
    GridItem,
    Icon,
    Image2,
    ImagePreview,
    IndexAnchor,
    IndexBar,
    List,
    Loading,
    Locale,
    NavBar,
    NoticeBar,
    Notify,
    NumberKeyboard,
    Overlay,
    Pagination,
    PasswordInput,
    Picker,
    Popover,
    Popup,
    Progress,
    PullRefresh,
    Radio,
    RadioGroup,
    Rate,
    Row,
    Search,
    ShareSheet,
    Sidebar,
    SidebarItem,
    Skeleton,
    Slider,
    Space,
    Step,
    Stepper,
    Steps,
    Sticky,
    SubmitBar,
    Swipe,
    SwipeCell,
    SwipeItem,
    Switch,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Tag,
    Toast,
    TreeSelect,
    Uploader
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default105 = {
  install,
  version
};
export {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  AddressEdit,
  AddressList,
  Area,
  Badge,
  Button,
  Calendar,
  Card,
  Cascader,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Circle,
  Col,
  Collapse,
  CollapseItem,
  ConfigProvider,
  ContactCard,
  ContactEdit,
  ContactList,
  CountDown,
  Coupon,
  CouponCell,
  CouponList,
  DatetimePicker,
  Dialog,
  Divider,
  DropdownItem,
  DropdownMenu,
  Empty,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  Image2 as Image,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  Lazyload,
  List,
  Loading,
  Locale,
  NavBar,
  NoticeBar,
  Notify,
  NumberKeyboard,
  Overlay,
  Pagination,
  PasswordInput,
  Picker,
  Popover,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Search,
  ShareSheet,
  Sidebar,
  SidebarItem,
  Skeleton,
  Slider,
  Space,
  Step,
  Stepper,
  Steps,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Switch,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  Toast,
  TreeSelect,
  Uploader,
  stdin_default105 as default,
  install,
  version
};
//# sourceMappingURL=vant.js.map
