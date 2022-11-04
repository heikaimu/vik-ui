"use strict";
const vue = require("vue");
const index = require("../utils/index.js");
const _hoisted_1 = { class: "vk-button" };
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  name: "button",
  setup(__props) {
    console.log(1, index);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", _hoisted_1, "\u6D4B\u8BD5\u6309\u94AE");
    };
  }
});
module.exports = _sfc_main;
