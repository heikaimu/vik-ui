import { defineComponent, openBlock, createElementBlock } from "vue";
import utils from "../utils/index.js";
const _hoisted_1 = { class: "vk-button" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "button",
  setup(__props) {
    console.log(1, utils);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", _hoisted_1, "\u6D4B\u8BD5\u6309\u94AE");
    };
  }
});
export {
  _sfc_main as default
};
