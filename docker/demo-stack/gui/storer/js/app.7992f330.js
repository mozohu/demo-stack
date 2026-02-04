/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 8657:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(5130);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(6768);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(4232);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=template&id=87117114&scoped=true

const _hoisted_1 = {
  class: "main-layout"
};
const _hoisted_2 = {
  class: "upper-section"
};
const _hoisted_3 = {
  class: "content-area"
};
const _hoisted_4 = {
  class: "hint-area"
};
const _hoisted_5 = {
  class: "bottom-section"
};
const _hoisted_6 = {
  class: "log-area"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Modal = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("Modal");
  const _component_BannerPanel = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("BannerPanel");
  const _component_EbusListener = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("EbusListener");
  const _component_SettingsPanel = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("SettingsPanel");
  const _component_CabinSelector = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("CabinSelector");
  const _component_CtrlPanel = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("CtrlPanel");
  const _component_InfoPanel = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("InfoPanel");
  const _component_KeyPad = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("KeyPad");
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_Modal), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_BannerPanel, {
    connected: $data.ebusConnected
  }, null, 8, ["connected"]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_EbusListener, {
    modelValue: $data.ebusConnected,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.ebusConnected = $event),
    onEbusEvent: $options.debugEbusEvent,
    onEbusEventOrderAfterHint: $options.orderAfterHint,
    onEbusEventStoreEnterEND: $options.storeEnterEND,
    onEbusEventDisposeEnterEND: $options.disposeEnterEND,
    onEbusEventSysEnterINIT: $options.sysEnterINIT,
    onEbusEventSysAfterHint: $options.sysAfterHint,
    onEbusEventStoreEnterPROCESS: $options.storeEnterProcess,
    onEbusEventSessEnterIDLE: _cache[1] || (_cache[1] = $event => {
      $data.idle = true;
      $options.clearSelection();
    }),
    onEbusEventReaderAfterRead: _cache[2] || (_cache[2] = $event => $data.coded = true),
    onEbusEventSessEnterSESSION: _cache[3] || (_cache[3] = $event => $data.idle = false)
  }, null, 8, ["modelValue", "onEbusEvent", "onEbusEventOrderAfterHint", "onEbusEventStoreEnterEND", "onEbusEventDisposeEnterEND", "onEbusEventSysEnterINIT", "onEbusEventSysAfterHint", "onEbusEventStoreEnterPROCESS"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_3, [$data.showSettings ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_SettingsPanel, {
    key: 0,
    width: 4,
    height: 4,
    config: $data.config,
    isMultiselect: $data.isMultiselect,
    selectedId: $data.selectedId,
    gridStatus: $data.gridStatus,
    storeNetStatus: $data.netStatus.storer,
    pickupNetStatus: $data.netStatus.retriever,
    loading: $data.settingsLoading,
    initialIpMode: $data.settingsNet.mode,
    initialNet: {
      store_ip: $data.settingsNet.store_ip,
      store_mask: $data.settingsNet.store_mask,
      pickup_ip: $data.settingsNet.pickup_ip,
      pickup_mask: $data.settingsNet.pickup_mask,
      gw: $data.settingsNet.gw
    },
    onClose: $options.closeSettings,
    onSaveNetwork: $options.saveNetwork,
    onSelect: $options.handleSelect,
    onToggleMultiselect: $options.toggleMultiselect,
    onStoreOrder: $options.storeOrder,
    onClearOrder: $options.clearOrder,
    onClearSelection: $options.clearSelection
  }, null, 8, ["config", "isMultiselect", "selectedId", "gridStatus", "storeNetStatus", "pickupNetStatus", "loading", "initialIpMode", "initialNet", "onClose", "onSaveNetwork", "onSelect", "onToggleMultiselect", "onStoreOrder", "onClearOrder", "onClearSelection"])) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
    key: 1
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: "middle-section",
    onMousedown: _cache[4] || (_cache[4] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)((...args) => $options.clearSelection && $options.clearSelection(...args), ["self"]))
  }, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_CabinSelector, {
    width: 4,
    height: 4,
    config: $data.config,
    isMultiselect: $data.isMultiselect,
    selectedId: $data.selectedId,
    gridStatus: $data.gridStatus,
    onSelect: $options.handleSelect
  }, null, 8, ["config", "isMultiselect", "selectedId", "gridStatus", "onSelect"]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_CtrlPanel, {
    isMultiselect: $data.isMultiselect,
    onToggleMultiselect: $options.toggleMultiselect,
    onStoreOrder: $options.storeOrder,
    onClearOrder: $options.clearOrder,
    onSettings: $options.openSettings
  }, null, 8, ["isMultiselect", "onToggleMultiselect", "onStoreOrder", "onClearOrder", "onSettings"])], 32), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, (0,shared_esm_bundler/* toDisplayString */.v_)($data.hint), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_5, [$data.currentView === 'info' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_InfoPanel, {
    key: 0,
    status: $data.infoStatus,
    quantity: $data.infoQuantity,
    order_id: $data.infoOrderId,
    token: $data.infoToken,
    items: $data.infoItems,
    stored_time: $data.infoStoredTime,
    redeem_time: $data.infoRedeemTime,
    taken_time: $data.infoTakenTime
  }, null, 8, ["status", "quantity", "order_id", "token", "items", "stored_time", "redeem_time", "taken_time"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), $data.currentView === 'keypad' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_KeyPad, {
    key: 1,
    onSubmit: $options.handleSubmit
  }, null, 8, ["onSubmit"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, (0,shared_esm_bundler/* toDisplayString */.v_)($data.log), 1)])], 64))])]);
}
;// ./src/App.vue?vue&type=template&id=87117114&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__(8111);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.filter.js
var es_iterator_filter = __webpack_require__(2489);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__(1701);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BannerPanel.vue?vue&type=template&id=a5e67606&scoped=true

const BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_1 = {
  class: "banner-panel"
};
const BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_2 = {
  class: "banner-left"
};
const BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_3 = {
  class: "timer"
};
const BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_4 = {
  class: "banner-right"
};
const BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_5 = {
  class: "ebus-status"
};
function BannerPanelvue_type_template_id_a5e67606_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_3, (0,shared_esm_bundler/* toDisplayString */.v_)($options.formattedTime), 1)]), _cache[0] || (_cache[0] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: "banner-center"
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("h1", {
    class: "banner-text"
  }, "智慧置物櫃系統")], -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", BannerPanelvue_type_template_id_a5e67606_scoped_true_hoisted_5, "Ebus: " + (0,shared_esm_bundler/* toDisplayString */.v_)($props.connected ? '🟢' : '🔴'), 1)])]);
}
;// ./src/components/BannerPanel.vue?vue&type=template&id=a5e67606&scoped=true

;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BannerPanel.vue?vue&type=script&lang=js
/* harmony default export */ var BannerPanelvue_type_script_lang_js = ({
  name: 'BannerPanel',
  props: {
    connected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      now: new Date(),
      timerId: null
    };
  },
  computed: {
    formattedTime() {
      const year = this.now.getFullYear();
      const month = String(this.now.getMonth() + 1).padStart(2, '0');
      const date = String(this.now.getDate()).padStart(2, '0');
      const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
      const day = dayNames[this.now.getDay()];
      const hours = String(this.now.getHours()).padStart(2, '0');
      const minutes = String(this.now.getMinutes()).padStart(2, '0');
      const seconds = String(this.now.getSeconds()).padStart(2, '0');
      return `${year}/${month}/${date} (${day}) ${hours}:${minutes}:${seconds}`;
    }
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.now = new Date();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timerId);
  }
});
;// ./src/components/BannerPanel.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BannerPanel.vue?vue&type=style&index=0&id=a5e67606&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/BannerPanel.vue?vue&type=style&index=0&id=a5e67606&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(1241);
;// ./src/components/BannerPanel.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.A)(BannerPanelvue_type_script_lang_js, [['render',BannerPanelvue_type_template_id_a5e67606_scoped_true_render],['__scopeId',"data-v-a5e67606"]])

/* harmony default export */ var BannerPanel = (__exports__);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CtrlPanel.vue?vue&type=template&id=d299014a&scoped=true

const CtrlPanelvue_type_template_id_d299014a_scoped_true_hoisted_1 = {
  class: "ctrl-panel"
};
function CtrlPanelvue_type_template_id_d299014a_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", CtrlPanelvue_type_template_id_d299014a_scoped_true_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "ctrl-button",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('toggle-multiselect'))
  }, (0,shared_esm_bundler/* toDisplayString */.v_)($props.isMultiselect ? '☑多選' : '☐多選'), 1), $props.mode === 'locker' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
    key: 0
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "ctrl-button",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('open-cabin'))
  }, "開啟"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "ctrl-button",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.$emit('close-cabin'))
  }, "關閉")], 64)) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
    key: 1
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "ctrl-button",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.$emit('store-order'))
  }, "存餐"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "ctrl-button",
    onClick: _cache[4] || (_cache[4] = $event => _ctx.$emit('clear-order'))
  }, "清除"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "ctrl-button",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.$emit('settings'))
  }, "設定")], 64))]);
}
;// ./src/components/CtrlPanel.vue?vue&type=template&id=d299014a&scoped=true

;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CtrlPanel.vue?vue&type=script&lang=js
/* harmony default export */ var CtrlPanelvue_type_script_lang_js = ({
  name: 'CtrlPanel',
  props: {
    isMultiselect: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'default' // 'default' | 'locker'
    }
  }
});
;// ./src/components/CtrlPanel.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CtrlPanel.vue?vue&type=style&index=0&id=d299014a&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/CtrlPanel.vue?vue&type=style&index=0&id=d299014a&scoped=true&lang=css

;// ./src/components/CtrlPanel.vue




;


const CtrlPanel_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(CtrlPanelvue_type_script_lang_js, [['render',CtrlPanelvue_type_template_id_d299014a_scoped_true_render],['__scopeId',"data-v-d299014a"]])

/* harmony default export */ var CtrlPanel = (CtrlPanel_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CabinSelector.vue?vue&type=template&id=62abd32c&scoped=true

const CabinSelectorvue_type_template_id_62abd32c_scoped_true_hoisted_1 = ["onClick"];
const CabinSelectorvue_type_template_id_62abd32c_scoped_true_hoisted_2 = {
  class: "status"
};
function CabinSelectorvue_type_template_id_62abd32c_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
    class: "locker-grid",
    style: (0,shared_esm_bundler/* normalizeStyle */.Tr)({
      display: 'grid',
      gridTemplateColumns: `repeat(${$props.width}, 1fr)`,
      gridTemplateRows: `repeat(${$props.height}, 1fr)`,
      gap: '2px',
      width: '100%',
      aspectRatio: `${$props.width}/${$props.height}`
    })
  }, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)($data.layout, item => {
    return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
      key: item.id,
      class: (0,shared_esm_bundler/* normalizeClass */.C4)(["locker-cell", {
        selected: $options.isSelected(item.id)
      }]),
      style: (0,shared_esm_bundler/* normalizeStyle */.Tr)({
        gridColumn: `${item.x + 1} / span ${item.w}`,
        gridRow: `${item.y + 1} / span ${item.h}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: $options.getColor($props.gridStatus[item.id])
      }),
      onClick: $event => $options.handleClick(item.id)
    }, [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(item.id) + " ", 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", CabinSelectorvue_type_template_id_62abd32c_scoped_true_hoisted_2, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(Array.from($options.getStatusIndicator($props.gridStatus[item.id])), (ch, idx) => {
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", {
        key: idx,
        class: "status-char"
      }, (0,shared_esm_bundler/* toDisplayString */.v_)(ch), 1);
    }), 128))])], 14, CabinSelectorvue_type_template_id_62abd32c_scoped_true_hoisted_1);
  }), 128))], 4);
}
;// ./src/components/CabinSelector.vue?vue&type=template&id=62abd32c&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.for-each.js
var es_iterator_for_each = __webpack_require__(7588);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CabinSelector.vue?vue&type=script&lang=js



/* harmony default export */ var CabinSelectorvue_type_script_lang_js = ({
  name: 'CabinSelector',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    config: {
      type: Array,
      required: true
    },
    selectedId: {
      type: Array,
      default: () => []
    },
    isMultiselect: {
      type: Boolean
    },
    // status bit:
    // (1<<0): stored 是否存餐
    // (1<<1): expired 是否過期
    // (1<<2): opened 是否開門
    // (1<<3): occupied 是否感測到物品
    // (1<<7): failure 是否故障
    gridStatus: {
      type: Object
    }
  },
  data() {
    return {
      layout: []
    };
  },
  mounted() {
    this.generateLayout();
  },
  methods: {
    handleClick(id) {
      this.$emit('select', id);
    },
    isSelected(id) {
      return this.selectedId.includes(id);
    },
    generateLayout() {
      const grid = Array.from({
        length: this.height
      }, () => Array(this.width).fill(0));
      const layout = [];
      this.config.forEach(({
        id,
        w,
        h
      }) => {
        outer: for (let y = 0; y <= this.height - h; y++) {
          for (let x = 0; x <= this.width - w; x++) {
            let canPlace = true;
            for (let dy = 0; dy < h; dy++) {
              for (let dx = 0; dx < w; dx++) {
                if (grid[y + dy][x + dx] !== 0) {
                  canPlace = false;
                  break;
                }
              }
              if (!canPlace) break;
            }
            if (canPlace) {
              // 標記 grid 為已使用
              for (let dy = 0; dy < h; dy++) {
                for (let dx = 0; dx < w; dx++) {
                  grid[y + dy][x + dx] = id;
                }
              }
              layout.push({
                id,
                x,
                y,
                w,
                h
              });
              break outer;
            }
          }
        }
      });
      this.layout = layout;
    },
    getColor(status) {
      return status & 1 << 0 ? '#d0f0c0' : '#eeeeee'; // occupied
    },
    getStatusIndicator(status) {
      let s = '';
      if (status & 1 << 3) s = '🍔';
      if (status & 1 << 7) s = '🚫';else if (status & 1 << 1) s += '⚠';else if (status & 1 << 2) s += '⦥';else s += '═';
      return s;
    }
  }
});
;// ./src/components/CabinSelector.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CabinSelector.vue?vue&type=style&index=0&id=62abd32c&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/CabinSelector.vue?vue&type=style&index=0&id=62abd32c&scoped=true&lang=css

;// ./src/components/CabinSelector.vue




;


const CabinSelector_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(CabinSelectorvue_type_script_lang_js, [['render',CabinSelectorvue_type_template_id_62abd32c_scoped_true_render],['__scopeId',"data-v-62abd32c"]])

/* harmony default export */ var CabinSelector = (CabinSelector_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/InfoPanel.vue?vue&type=template&id=2644ba43&scoped=true

const InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_1 = {
  class: "info-panel"
};
const InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_2 = {
  class: "info-text"
};
const InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_3 = {
  class: "info-column"
};
const InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_4 = {
  class: "info-column"
};
function InfoPanelvue_type_template_id_2644ba43_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_3, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "狀態：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.status), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "存量：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.quantity), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "訂單編號：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.order_id), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "取餐碼：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.token), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", InfoPanelvue_type_template_id_2644ba43_scoped_true_hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "餐點內容：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.items), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "存入時間：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.stored_time), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "核銷時間：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.redeem_time), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("p", null, "取出時間：" + (0,shared_esm_bundler/* toDisplayString */.v_)($props.taken_time), 1)])])]);
}
;// ./src/components/InfoPanel.vue?vue&type=template&id=2644ba43&scoped=true

;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/InfoPanel.vue?vue&type=script&lang=js
/* harmony default export */ var InfoPanelvue_type_script_lang_js = ({
  name: 'InfoPanel',
  props: {
    status: {
      type: String,
      default: null
    },
    quantity: {
      type: Number,
      default: 0
    },
    order_id: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => []
    },
    stored_time: {
      type: String
    },
    redeem_time: {
      type: String
    },
    taken_time: {
      type: String
    }
  }
});
;// ./src/components/InfoPanel.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/InfoPanel.vue?vue&type=style&index=0&id=2644ba43&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/InfoPanel.vue?vue&type=style&index=0&id=2644ba43&scoped=true&lang=css

;// ./src/components/InfoPanel.vue




;


const InfoPanel_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(InfoPanelvue_type_script_lang_js, [['render',InfoPanelvue_type_template_id_2644ba43_scoped_true_render],['__scopeId',"data-v-2644ba43"]])

/* harmony default export */ var InfoPanel = (InfoPanel_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SettingsPanel.vue?vue&type=template&id=154bb793&scoped=true

const SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_1 = {
  class: "settings-root"
};
const SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_2 = {
  key: 0,
  class: "settings-loading"
};
const SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_3 = {
  class: "settings-topbar"
};
const SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_4 = {
  class: "net-left"
};
const SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_5 = {
  class: "net-section"
};
const SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_6 = {
  class: "radio-row"
};
const _hoisted_7 = {
  class: "radio"
};
const _hoisted_8 = {
  class: "radio"
};
const _hoisted_9 = {
  class: "net-section"
};
const _hoisted_10 = {
  class: "field-row"
};
const _hoisted_11 = {
  class: "field-label"
};
const _hoisted_12 = {
  class: "field-inputs"
};
const _hoisted_13 = {
  class: "ip-group"
};
const _hoisted_14 = ["tabindex", "value", "onInput", "onFocus", "onClick"];
const _hoisted_15 = {
  key: 0,
  class: "dot"
};
const _hoisted_16 = ["tabindex", "value"];
const _hoisted_17 = {
  class: "field-row"
};
const _hoisted_18 = {
  class: "field-label"
};
const _hoisted_19 = {
  class: "field-inputs"
};
const _hoisted_20 = {
  class: "ip-group"
};
const _hoisted_21 = ["tabindex", "value", "onInput", "onFocus", "onClick"];
const _hoisted_22 = {
  key: 0,
  class: "dot"
};
const _hoisted_23 = ["tabindex", "value"];
const _hoisted_24 = {
  class: "field-row"
};
const _hoisted_25 = {
  class: "field-inputs"
};
const _hoisted_26 = {
  class: "ip-group"
};
const _hoisted_27 = ["tabindex", "value", "onInput", "onFocus", "onClick"];
const _hoisted_28 = {
  key: 0,
  class: "dot"
};
const _hoisted_29 = {
  class: "net-hint"
};
const _hoisted_30 = {
  key: 0
};
const _hoisted_31 = {
  key: 1
};
const _hoisted_32 = {
  class: "net-right"
};
const _hoisted_33 = {
  class: "keypad"
};
const _hoisted_34 = {
  class: "locker-left"
};
const _hoisted_35 = {
  class: "locker-right"
};
function SettingsPanelvue_type_template_id_154bb793_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CabinSelector = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("CabinSelector");
  const _component_CtrlPanel = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("CtrlPanel");
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_1, [$props.loading ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_2, _cache[33] || (_cache[33] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: "loading-card"
  }, "讀取中...", -1)]))) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_3, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "topbtn",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('close'))
  }, "返回"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["topbtn", {
      active: $data.tab === 'net'
    }]),
    onClick: _cache[1] || (_cache[1] = $event => $data.tab = 'net')
  }, "網路設定", 2), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["topbtn", {
      active: $data.tab === 'locker'
    }]),
    onClick: _cache[2] || (_cache[2] = $event => $data.tab = 'locker')
  }, "格口控制", 2)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["settings-body", {
      locker: $data.tab === 'locker'
    }])
  }, [$data.tab === 'net' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
    key: 0,
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["net-wrap", {
      dhcp: $data.ipMode === 'dhcp'
    }])
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_5, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", SettingsPanelvue_type_template_id_154bb793_scoped_true_hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", _hoisted_7, [(0,runtime_core_esm_bundler/* withDirectives */.bo)((0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
    type: "radio",
    value: "dhcp",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.ipMode = $event)
  }, null, 512), [[runtime_dom_esm_bundler/* vModelRadio */.XL, $data.ipMode]]), _cache[34] || (_cache[34] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "DHCP", -1))]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("label", _hoisted_8, [(0,runtime_core_esm_bundler/* withDirectives */.bo)((0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
    type: "radio",
    value: "static",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.ipMode = $event)
  }, null, 512), [[runtime_dom_esm_bundler/* vModelRadio */.XL, $data.ipMode]]), _cache[35] || (_cache[35] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "固定 IP", -1))])])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_9, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_10, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_11, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["label-chip net-label", $options.netStatusClass($props.storeNetStatus)])
  }, "存餐機", 2)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_12, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_13, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)($data.form.store_ip, (seg, idx) => {
    return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
      key: 'store_ip_' + idx
    }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
      class: (0,shared_esm_bundler/* normalizeClass */.C4)(["field ip-seg", {
        focused: $options.isActiveIp('store_ip', idx)
      }]),
      inputmode: "numeric",
      pattern: "[0-9]*",
      tabindex: $data.ipMode === 'dhcp' ? -1 : 0,
      value: seg,
      onInput: $event => $options.onSegInput('store_ip', idx, $event),
      onFocus: $event => {
        $options.setActiveIp('store_ip', idx);
        $options.setCaretEnd($event);
      },
      onClick: $event => {
        $options.setActiveIp('store_ip', idx);
        $options.setCaretEnd($event);
      },
      onKeydown: _cache[5] || (_cache[5] = $event => $options.setCaretEnd($event)),
      ref_for: true,
      ref: el => $options.setSegRef('store_ip', idx, el),
      placeholder: "xxx"
    }, null, 42, _hoisted_14), idx < 3 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", _hoisted_15, ".")) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)], 64);
  }), 128))]), _cache[36] || (_cache[36] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
    class: "slash"
  }, "/", -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["field mask", {
      focused: $options.isActiveMask('store_mask')
    }]),
    inputmode: "numeric",
    pattern: "[0-9]*",
    tabindex: $data.ipMode === 'dhcp' ? -1 : 0,
    value: $data.form.store_mask,
    onInput: _cache[6] || (_cache[6] = $event => $options.onMaskInput('store_mask', $event)),
    onFocus: _cache[7] || (_cache[7] = $event => {
      $options.setActiveMask('store_mask');
      $options.setCaretEnd($event);
    }),
    onClick: _cache[8] || (_cache[8] = $event => {
      $options.setActiveMask('store_mask');
      $options.setCaretEnd($event);
    }),
    onKeydown: _cache[9] || (_cache[9] = $event => $options.setCaretEnd($event)),
    ref: el => $options.setMaskRef('store_mask', el),
    placeholder: "NN"
  }, null, 42, _hoisted_16)])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_17, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_18, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["label-chip net-label", $options.netStatusClass($props.pickupNetStatus)])
  }, "取餐機", 2)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_19, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_20, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)($data.form.pickup_ip, (seg, idx) => {
    return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
      key: 'pickup_ip_' + idx
    }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
      class: (0,shared_esm_bundler/* normalizeClass */.C4)(["field ip-seg", {
        focused: $options.isActiveIp('pickup_ip', idx)
      }]),
      inputmode: "numeric",
      pattern: "[0-9]*",
      tabindex: $data.ipMode === 'dhcp' ? -1 : 0,
      value: seg,
      onInput: $event => $options.onSegInput('pickup_ip', idx, $event),
      onFocus: $event => {
        $options.setActiveIp('pickup_ip', idx);
        $options.setCaretEnd($event);
      },
      onClick: $event => {
        $options.setActiveIp('pickup_ip', idx);
        $options.setCaretEnd($event);
      },
      onKeydown: _cache[10] || (_cache[10] = $event => $options.setCaretEnd($event)),
      ref_for: true,
      ref: el => $options.setSegRef('pickup_ip', idx, el),
      placeholder: "xxx"
    }, null, 42, _hoisted_21), idx < 3 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", _hoisted_22, ".")) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)], 64);
  }), 128))]), _cache[37] || (_cache[37] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
    class: "slash"
  }, "/", -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["field mask", {
      focused: $options.isActiveMask('pickup_mask')
    }]),
    inputmode: "numeric",
    pattern: "[0-9]*",
    tabindex: $data.ipMode === 'dhcp' ? -1 : 0,
    value: $data.form.pickup_mask,
    onInput: _cache[11] || (_cache[11] = $event => $options.onMaskInput('pickup_mask', $event)),
    onFocus: _cache[12] || (_cache[12] = $event => {
      $options.setActiveMask('pickup_mask');
      $options.setCaretEnd($event);
    }),
    onClick: _cache[13] || (_cache[13] = $event => {
      $options.setActiveMask('pickup_mask');
      $options.setCaretEnd($event);
    }),
    onKeydown: _cache[14] || (_cache[14] = $event => $options.setCaretEnd($event)),
    ref: el => $options.setMaskRef('pickup_mask', el),
    placeholder: "NN"
  }, null, 42, _hoisted_23)])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_24, [_cache[38] || (_cache[38] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: "field-label"
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
    class: "label-chip"
  }, "GW")], -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_25, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_26, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)($data.form.gw, (seg, idx) => {
    return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
      key: 'gw_' + idx
    }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
      class: (0,shared_esm_bundler/* normalizeClass */.C4)(["field ip-seg", {
        focused: $options.isActiveIp('gw', idx)
      }]),
      inputmode: "numeric",
      pattern: "[0-9]*",
      tabindex: $data.ipMode === 'dhcp' ? -1 : 0,
      value: seg,
      onInput: $event => $options.onSegInput('gw', idx, $event),
      onFocus: $event => {
        $options.setActiveIp('gw', idx);
        $options.setCaretEnd($event);
      },
      onClick: $event => {
        $options.setActiveIp('gw', idx);
        $options.setCaretEnd($event);
      },
      onKeydown: _cache[15] || (_cache[15] = $event => $options.setCaretEnd($event)),
      ref_for: true,
      ref: el => $options.setSegRef('gw', idx, el),
      placeholder: "xxx"
    }, null, 42, _hoisted_27), idx < 3 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", _hoisted_28, ".")) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)], 64);
  }), 128))])])])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_29, [$data.ipMode === 'dhcp' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", _hoisted_30, "DHCP模式：IP/MASK/GW為自動取得，不可更改")) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", _hoisted_31, "固定IP模式：點選欄位後，用下方鍵盤輸入，最後按「保存」。"))])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_32, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_33, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[16] || (_cache[16] = $event => $options.onKey('1'))
  }, "1"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[17] || (_cache[17] = $event => $options.onKey('2'))
  }, "2"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[18] || (_cache[18] = $event => $options.onKey('3'))
  }, "3"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[19] || (_cache[19] = $event => $options.onKey('4'))
  }, "4"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[20] || (_cache[20] = $event => $options.onKey('5'))
  }, "5"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[21] || (_cache[21] = $event => $options.onKey('6'))
  }, "6"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn",
    onClick: _cache[22] || (_cache[22] = $event => $options.onKey('0'))
  }, "0"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn back",
    onClick: _cache[23] || (_cache[23] = (...args) => $options.backspace && $options.backspace(...args))
  }, "←"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    class: "kbtn save",
    onClick: _cache[24] || (_cache[24] = (...args) => $options.save && $options.save(...args))
  }, "保存")])])], 2)) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
    key: 1,
    class: "locker-wrap",
    onMousedown: _cache[31] || (_cache[31] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)($event => _ctx.$emit('clear-selection'), ["self"])),
    onTouchstart: _cache[32] || (_cache[32] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)($event => _ctx.$emit('clear-selection'), ["self"]))
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: "locker-top",
    onMousedown: _cache[29] || (_cache[29] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)($event => _ctx.$emit('clear-selection'), ["self"])),
    onTouchstart: _cache[30] || (_cache[30] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)($event => _ctx.$emit('clear-selection'), ["self"]))
  }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_34, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_CabinSelector, {
    width: $props.width,
    height: $props.height,
    config: $props.config,
    isMultiselect: $props.isMultiselect,
    selectedId: $props.selectedId,
    gridStatus: $props.gridStatus,
    onSelect: _cache[25] || (_cache[25] = $event => _ctx.$emit('select', $event))
  }, null, 8, ["width", "height", "config", "isMultiselect", "selectedId", "gridStatus"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_35, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_CtrlPanel, {
    isMultiselect: $props.isMultiselect,
    mode: "locker",
    onToggleMultiselect: _cache[26] || (_cache[26] = $event => _ctx.$emit('toggle-multiselect')),
    onOpenCabin: _cache[27] || (_cache[27] = $event => _ctx.$emit('open-cabin')),
    onCloseCabin: _cache[28] || (_cache[28] = $event => _ctx.$emit('close-cabin'))
  }, null, 8, ["isMultiselect"])])], 32)], 32))], 2)]);
}
;// ./src/components/SettingsPanel.vue?vue&type=template&id=154bb793&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.every.js
var es_iterator_every = __webpack_require__(1148);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SettingsPanel.vue?vue&type=script&lang=js






const parseIp = ip => {
  if (!ip) return ['', '', '', ''];
  const parts = String(ip).split('.');
  return [0, 1, 2, 3].map(i => parts[i] || '');
};
/* harmony default export */ var SettingsPanelvue_type_script_lang_js = ({
  name: 'SettingsPanel',
  components: {
    CabinSelector: CabinSelector,
    CtrlPanel: CtrlPanel
  },
  props: {
    // for locker control page
    config: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: Number,
      default: 4
    },
    height: {
      type: Number,
      default: 4
    },
    isMultiselect: {
      type: Boolean,
      default: false
    },
    selectedId: {
      type: Array,
      default: () => []
    },
    gridStatus: {
      type: Object,
      default: () => ({})
    },
    // optional initial network config
    storeNetStatus: {
      type: String,
      default: 'offline'
    },
    // online | gateway | offline
    pickupNetStatus: {
      type: String,
      default: 'offline'
    },
    // online | gateway | offline
    loading: {
      type: Boolean,
      default: false
    },
    initialIpMode: {
      type: String,
      default: 'dhcp'
    },
    // 'dhcp' | 'static'
    initialNet: {
      type: Object,
      default: () => ({
        store_ip: '',
        store_mask: '',
        pickup_ip: '',
        pickup_mask: '',
        gw: ''
      })
    }
  },
  data() {
    return {
      tab: 'net',
      ipMode: this.initialIpMode,
      form: {
        store_ip: parseIp(this.initialNet.store_ip),
        store_mask: this.initialNet.store_mask || '',
        pickup_ip: parseIp(this.initialNet.pickup_ip),
        pickup_mask: this.initialNet.pickup_mask || '',
        gw: parseIp(this.initialNet.gw)
      },
      activeField: null,
      segRefs: {},
      maskRefs: {}
    };
  },
  watch: {
    ipMode(nv) {
      if (nv === 'dhcp') this.activeField = null;
    },
    initialIpMode(nv) {
      this.ipMode = nv || 'dhcp';
    },
    initialNet: {
      deep: true,
      handler(nv) {
        const next = nv || {};
        this.form = {
          store_ip: parseIp(next.store_ip),
          store_mask: next.store_mask || '',
          pickup_ip: parseIp(next.pickup_ip),
          pickup_mask: next.pickup_mask || '',
          gw: parseIp(next.gw)
        };
      }
    }
  },
  methods: {
    setSegRef(field, idx, el) {
      if (!el) return;
      if (!this.segRefs[field]) this.segRefs[field] = [];
      this.segRefs[field][idx] = el;
    },
    setMaskRef(field, el) {
      if (!el) return;
      this.maskRefs[field] = el;
    },
    isActiveIp(field, idx) {
      return this.activeField && this.activeField.type === 'ip' && this.activeField.field === field && this.activeField.index === idx;
    },
    isActiveMask(field) {
      return this.activeField && this.activeField.type === 'mask' && this.activeField.field === field;
    },
    netStatusClass(status) {
      const s = String(status || '').toLowerCase();
      if (s === 'online') return 'net-online';
      if (s === 'gateway') return 'net-gateway';
      return 'net-offline';
    },
    setActiveIp(field, idx) {
      if (this.ipMode === 'dhcp') return;
      this.activeField = {
        type: 'ip',
        field,
        index: idx
      };
      this.$nextTick(() => this.focusIp(field, idx));
    },
    setActiveMask(field) {
      if (this.ipMode === 'dhcp') return;
      this.activeField = {
        type: 'mask',
        field
      };
      this.$nextTick(() => this.focusMask(field));
    },
    blurAll() {
      Object.values(this.segRefs).forEach(list => {
        if (!list) return;
        list.forEach(el => el && el.blur && el.blur());
      });
      Object.values(this.maskRefs).forEach(el => el && el.blur && el.blur());
    },
    focusIp(field, idx) {
      const el = this.segRefs[field]?.[idx];
      if (el) {
        el.focus();
        this.activeField = {
          type: 'ip',
          field,
          index: idx
        };
      }
    },
    focusMask(field) {
      const el = this.maskRefs[field];
      if (el) {
        el.focus();
        this.activeField = {
          type: 'mask',
          field
        };
      }
    },
    onKey(k) {
      if (this.ipMode === 'dhcp') return;
      if (!this.activeField) return;
      if (this.activeField.type === 'ip') {
        const {
          field,
          index
        } = this.activeField;
        const cur = this.form[field][index] || '';
        if (cur.length >= 3) {
          this.pushOverflow(field, index, String(k));
          return;
        }
        const next = cur + String(k);
        this.form[field].splice(index, 1, next);
        this.maybeAutoAdvanceIp(field, index, next.length);
      } else if (this.activeField.type === 'mask') {
        const field = this.activeField.field;
        const cur = this.form[field] || '';
        if (cur.length >= 2) return;
        this.form[field] = cur + String(k);
      }
    },
    backspace() {
      if (this.ipMode === 'dhcp') return;
      if (!this.activeField) return;
      if (this.activeField.type === 'ip') {
        const {
          field,
          index
        } = this.activeField;
        const cur = this.form[field][index] || '';
        if (!cur && index > 0) {
          this.focusIp(field, index - 1);
          return;
        }
        this.form[field].splice(index, 1, cur.slice(0, -1));
      } else if (this.activeField.type === 'mask') {
        const field = this.activeField.field;
        const cur = this.form[field] || '';
        if (!cur) {
          if (field === 'store_mask') {
            this.focusIp('store_ip', 3);
          } else if (field === 'pickup_mask') {
            this.focusIp('pickup_ip', 3);
          }
          return;
        }
        this.form[field] = cur.slice(0, -1);
      }
    },
    onSegInput(field, idx, e) {
      const raw = e?.target?.value ?? '';
      const digits = String(raw).replace(/\D/g, '');
      const next = digits.slice(0, 3);
      const overflow = digits.slice(3);
      this.form[field].splice(idx, 1, next);
      if (e?.target) e.target.value = next;
      this.setCaretEnd(e);
      this.maybeAutoAdvanceIp(field, idx, next.length);
      if (overflow) this.pushOverflow(field, idx, overflow);
    },
    onMaskInput(field, e) {
      const raw = e?.target?.value ?? '';
      const digits = String(raw).replace(/\D/g, '');
      const next = digits.slice(0, 2);
      this.form[field] = next;
      if (e?.target) e.target.value = next;
      this.setCaretEnd(e);
    },
    maybeAutoAdvanceIp(field, index, len) {
      if (len < 3) return;
      if (index < 3) {
        this.focusIp(field, index + 1);
      } else if (field === 'store_ip') {
        this.focusMask('store_mask');
      } else if (field === 'pickup_ip') {
        this.focusMask('pickup_mask');
      }
    },
    pushOverflow(field, index, chars) {
      const queue = String(chars).split('');
      let curField = field;
      let curIndex = index;
      while (queue.length) {
        if (curIndex < 3) {
          const nextIndex = curIndex + 1;
          const curVal = this.form[curField][nextIndex] || '';
          if (curVal.length < 3) {
            const next = curVal + queue.shift();
            this.form[curField].splice(nextIndex, 1, next);
            this.focusIp(curField, nextIndex);
            if (next.length >= 3) {
              curIndex = nextIndex;
              continue;
            }
            return;
          }
          curIndex = nextIndex;
          continue;
        }
        if (curField === 'store_ip') {
          const cur = this.form.store_mask || '';
          if (cur.length < 2) {
            this.form.store_mask = cur + queue.shift();
            this.focusMask('store_mask');
          }
          return;
        }
        if (curField === 'pickup_ip') {
          const cur = this.form.pickup_mask || '';
          if (cur.length < 2) {
            this.form.pickup_mask = cur + queue.shift();
            this.focusMask('pickup_mask');
          }
          return;
        }
        return;
      }
    },
    setCaretEnd(e) {
      const el = e?.target;
      if (!el || typeof el.setSelectionRange !== 'function') return;
      const len = (el.value || '').length;
      el.setSelectionRange(len, len);
    },
    save() {
      const joinIp = parts => {
        if (!parts || parts.every(p => !p)) return '';
        return parts.map(p => p || '').join('.');
      };
      this.$emit('save-network', {
        mode: this.ipMode,
        store_ip: joinIp(this.form.store_ip),
        store_mask: this.form.store_mask || '',
        pickup_ip: joinIp(this.form.pickup_ip),
        pickup_mask: this.form.pickup_mask || '',
        gw: joinIp(this.form.gw)
      });
    }
  }
});
;// ./src/components/SettingsPanel.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SettingsPanel.vue?vue&type=style&index=0&id=154bb793&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/SettingsPanel.vue?vue&type=style&index=0&id=154bb793&scoped=true&lang=css

;// ./src/components/SettingsPanel.vue




;


const SettingsPanel_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(SettingsPanelvue_type_script_lang_js, [['render',SettingsPanelvue_type_template_id_154bb793_scoped_true_render],['__scopeId',"data-v-154bb793"]])

/* harmony default export */ var SettingsPanel = (SettingsPanel_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/EbusListener.vue?vue&type=template&id=1ad64b9e
function EbusListenervue_type_template_id_1ad64b9e_render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
// EXTERNAL MODULE: ./node_modules/mqtt/dist/mqtt.esm.js + 10 modules
var mqtt_esm = __webpack_require__(4430);
;// ../common/services/ebusService.js



// src/common/services/EbusService.js

class EbusService {
  constructor() {
    this.client = null;
    this.listeners = [];
    this.connected = false;
  }
  connect(customUrl = null) {
    if (this.client) return;
    const options = {
      connectTimeout: 4000,
      clientId: 'vue-ebus-' + Math.random().toString(16).substring(2, 8)
    };
    const defaultUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:9001/mqtt`;
    const url = customUrl || defaultUrl;
    console.log(`[EbusService] Connecting to ${url}`);
    this.client = mqtt_esm/* default */.A.connect(url, options);
    this.client.on('connect', () => {
      this.connected = true;
      this.client.subscribe('topic/app', err => {
        if (!err) {
          console.log('[EbusService] Subscribed topic/app');
        }
      });
    });
    this.client.on('message', (topic, message) => {
      try {
        const ev = JSON.parse(message.toString());
        if (ev && ev.e) {
          this.notifyAll(ev);
        }
      } catch (error) {
        console.error('MQTT parse error:', message.toString());
      }
    });
    this.client.on('error', err => {
      console.error('[EbusService] Error:', err);
    });
    this.client.on('close', () => {
      this.connected = false;
    });
  }
  onEvent(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }
  notifyAll(event) {
    this.listeners.forEach(cb => cb(event));
  }
  send(ev, arg) {
    if (this.client && this.connected) {
      const trig = 'queue/app';
      const e = {
        e: ev
      };
      if (arg) {
        e.arg = arg;
      }
      const msg = JSON.stringify(e);
      this.client.publish(trig, msg);
      console.log(`[EbusService] 發送至 ${trig}：`, msg);
    } else {
      console.warn('[EbusService] 無法發送：尚未連線');
    }
  }
}
/* harmony default export */ var ebusService = (new EbusService());
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/EbusListener.vue?vue&type=script&lang=js

/* harmony default export */ var EbusListenervue_type_script_lang_js = ({
  name: 'EbusListener',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    ebusUrl: {
      type: String,
      required: false
    }
  },
  mounted() {
    // 解析 URL ?ebus=xxx
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("ebus");

    // 優先順序：URL > prop > null
    const finalUrl = urlParam || this.ebusUrl || null;
    ebusService.connect(finalUrl);
    const emitConnected = mode => {
      this.$emit('update:modelValue', mode);
    };

    // 監聽ebusService的event，並用$emit往外發
    ebusService.onEvent(ev => {
      this.$emit('ebus-event', ev);
      if (ev.e) {
        const en = ev.e.replace(/[\/_]/g, '-');
        this.$emit(`ebus-event-${en}`, ev);
      }
    });
    if (ebusService.client) {
      ebusService.client.on('close', () => emitConnected(false));
      ebusService.client.on('connect', () => emitConnected(true));
    }
  }
});
;// ../common/components/EbusListener.vue?vue&type=script&lang=js
 
;// ../common/components/EbusListener.vue




;
const EbusListener_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(EbusListenervue_type_script_lang_js, [['render',EbusListenervue_type_template_id_1ad64b9e_render]])

/* harmony default export */ var EbusListener = (EbusListener_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/Modal.vue?vue&type=template&id=fb76a4b6&scoped=true

const Modalvue_type_template_id_fb76a4b6_scoped_true_hoisted_1 = {
  key: 0,
  class: "modal-content"
};
const Modalvue_type_template_id_fb76a4b6_scoped_true_hoisted_2 = {
  key: 4,
  class: "sign-buttons"
};
function Modalvue_type_template_id_fb76a4b6_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [$data.visible ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
    key: 0,
    class: "modal-overlay",
    onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleOverlayClick && $options.handleOverlayClick(...args))
  }, null, 32)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), $data.visible ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
    key: 1,
    class: (0,shared_esm_bundler/* normalizeClass */.C4)(["modal", {
      'sign-mode': $data.mode === 'sign'
    }]),
    onMousedown: _cache[13] || (_cache[13] = (...args) => $options.handleOverlayClick && $options.handleOverlayClick(...args))
  }, [(0,runtime_core_esm_bundler/* withDirectives */.bo)((0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", null, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("canvas", {
    ref: "canvas",
    width: "500",
    height: "300",
    style: {
      "background": "#eeeeee"
    },
    onMousedown: _cache[1] || (_cache[1] = (...args) => $options.start && $options.start(...args)),
    onMousemove: _cache[2] || (_cache[2] = (...args) => $options.draw && $options.draw(...args)),
    onMouseup: _cache[3] || (_cache[3] = (...args) => $options.stop && $options.stop(...args)),
    onMouseleave: _cache[4] || (_cache[4] = (...args) => $options.stop && $options.stop(...args)),
    onTouchstart: _cache[5] || (_cache[5] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)((...args) => $options.start && $options.start(...args), ["prevent"])),
    onTouchmove: _cache[6] || (_cache[6] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)((...args) => $options.draw && $options.draw(...args), ["prevent"])),
    onTouchend: _cache[7] || (_cache[7] = (0,runtime_dom_esm_bundler/* withModifiers */.D$)((...args) => $options.stop && $options.stop(...args), ["prevent"]))
  }, null, 544)], 512), [[runtime_dom_esm_bundler/* vShow */.aG, $data.mode === 'sign']]), $data.mode !== 'sign' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", Modalvue_type_template_id_fb76a4b6_scoped_true_hoisted_1, (0,shared_esm_bundler/* toDisplayString */.v_)($data.message), 1)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), $data.mode === 'info' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("button", {
    key: 1,
    class: "close-btn",
    onMousedown: _cache[8] || (_cache[8] = (...args) => $options.close && $options.close(...args))
  }, "關閉", 32)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), $data.mode === 'yesno' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("button", {
    key: 2,
    class: "yes-btn",
    onMousedown: _cache[9] || (_cache[9] = (...args) => $options.yes && $options.yes(...args))
  }, "是", 32)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), $data.mode === 'yesno' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("button", {
    key: 3,
    class: "no-btn",
    onMousedown: _cache[10] || (_cache[10] = (...args) => $options.no && $options.no(...args))
  }, "否", 32)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), $data.mode === 'sign' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", Modalvue_type_template_id_fb76a4b6_scoped_true_hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    onClick: _cache[11] || (_cache[11] = (...args) => $options.clearCanvas && $options.clearCanvas(...args))
  }, "清除"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("button", {
    onClick: _cache[12] || (_cache[12] = (...args) => $options.confirmSign && $options.confirmSign(...args))
  }, "確定")])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)], 34)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)]);
}
;// ../common/components/Modal.vue?vue&type=template&id=fb76a4b6&scoped=true

// EXTERNAL MODULE: ./node_modules/mitt/dist/mitt.mjs
var mitt = __webpack_require__(595);
;// ../common/services/modalService.js
// modalService.js


// 建立一個全局 event bus
const modalBus = (0,mitt/* default */.A)();
modalBus.once = function (ev, cb) {
  const handler = () => {
    cb();
    modalBus.off(ev, handler);
  };
  modalBus.on(ev, handler);
  return modalBus;
};

// 提供簡單介面供元件呼叫
const ModalService = {
  showLocked(message = '處理中，請稍候…') {
    modalBus.emit('showLocked', message);
    return modalBus;
  },
  showInfo({
    message = '',
    delay = 3000,
    callback = null
  } = {}) {
    modalBus.emit('showInfo', {
      message,
      delay
    });
    if (typeof callback === 'function') {
      modalBus.once('modalClosed', callback); // 確保只執行一次
    }
    return modalBus;
  },
  showYesNo(message = '再次確認…', yes, no) {
    modalBus.emit('showYesNo', {
      message,
      yes,
      no
    });
    return modalBus;
  },
  showSign(callback) {
    modalBus.emit('showSign', callback);
    return modalBus;
  },
  close() {
    modalBus.emit('modalClosed');
    return modalBus;
  }
};
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/Modal.vue?vue&type=script&lang=js

/* harmony default export */ var Modalvue_type_script_lang_js = ({
  data() {
    return {
      timer: null,
      visible: false,
      message: '',
      mode: 'info',
      // 'locked', 'info', 'yesno', 'sign'
      delay: 8000,
      yesCallback: null,
      noCallback: null,
      signCallback: null,
      ctx: null,
      isDrawing: false
    };
  },
  methods: {
    showInfo(message = '', delay = 8000) {
      this.mode = 'info';
      this.message = message;
      this.visible = true;
      this.delay = delay;
      // 開始新的計時
      this.timer = setTimeout(() => {
        this.close();
      }, delay);
    },
    showLocked(message = '') {
      this.mode = 'locked';
      this._clearTimer();
      this.message = message;
      this.visible = true;
    },
    showYesNo(message, yes, no) {
      this.mode = 'yesno';
      this.message = message;
      this.yesCallback = yes;
      this.noCallback = no;
      this.visible = true;
    },
    showSign(callback) {
      this.mode = 'sign';
      this.visible = true;
      this.signCallback = callback;
      this.$nextTick(() => {
        this.initCanvas();
      });
    },
    initCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const parent = canvas.parentElement;
      const maxWidth = parent.clientWidth - 20; // 留一點 padding
      const width = Math.min(maxWidth, 500); // 最大不超過 500
      const height = Math.floor(width * 0.6); // 500x300 → 5:3 比例
      // 設定繪圖座標系統
      canvas.width = width;
      canvas.height = height;

      // 同步顯示尺寸
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      this.ctx = canvas.getContext('2d');
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = '#000';
    },
    yes() {
      if (typeof this.yesCallback === 'function') this.yesCallback();
      this.visible = false;
    },
    no() {
      if (typeof this.noCallback === 'function') this.noCallback();
      this.visible = false;
    },
    close() {
      this._clearTimer();
      this.visible = false;
      modalBus.emit('modalClosed');
    },
    handleOverlayClick() {
      if (this.mode === 'info') {
        this.close();
      }
    },
    _clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    // === 簽名繪圖 ===
    getPos(e) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    },
    start(e) {
      const pos = this.getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      this.isDrawing = true;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const pos = this.getPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    },
    stop() {
      this.isDrawing = false;
      this.ctx.closePath();
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    confirmSign() {
      const canvas = this.$refs.canvas;
      const width = canvas.width;
      const height = canvas.height;
      const imageData = this.ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let top = null,
        bottom = null,
        left = null,
        right = null;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          if (data[i + 3] > 0) {
            if (top === null || y < top) top = y;
            if (bottom === null || y > bottom) bottom = y;
            if (left === null || x < left) left = x;
            if (right === null || x > right) right = x;
          }
        }
      }
      if (top === null) {
        return;
      }
      const padding = 10;
      top = Math.max(0, top - padding);
      bottom = Math.min(height - 1, bottom + padding);
      left = Math.max(0, left - padding);
      right = Math.min(width - 1, right + padding);
      const croppedWidth = right - left + 1;
      const croppedHeight = bottom - top + 1;
      const croppedImageData = this.ctx.getImageData(left, top, croppedWidth, croppedHeight);
      const newCanvas = document.createElement('canvas');
      newCanvas.width = croppedWidth;
      newCanvas.height = croppedHeight;
      const newCtx = newCanvas.getContext('2d');
      newCtx.fillStyle = 'white';
      newCtx.fillRect(0, 0, croppedWidth, croppedHeight);
      newCtx.putImageData(croppedImageData, 0, 0);
      const base64 = newCanvas.toDataURL('image/png');
      if (typeof this.signCallback === 'function') this.signCallback(base64);
      this.close();
    }
  },
  created() {
    modalBus.on('showLocked', this.showLocked);
    modalBus.on('showInfo', info => {
      this.showInfo(info.message, info.delay);
    });
    modalBus.on('showYesNo', msg => {
      this.showYesNo(msg.message, msg.yes, msg.no);
    });
    modalBus.on('showSign', this.showSign);
  },
  mounted() {
    // 在 mounted 時初始化 canvas
    if (this.$refs.canvas) {
      this.initCanvas();
    }
  }
});
;// ../common/components/Modal.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/Modal.vue?vue&type=style&index=0&id=fb76a4b6&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ../common/components/Modal.vue?vue&type=style&index=0&id=fb76a4b6&scoped=true&lang=css

;// ../common/components/Modal.vue




;


const Modal_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(Modalvue_type_script_lang_js, [['render',Modalvue_type_template_id_fb76a4b6_scoped_true_render],['__scopeId',"data-v-fb76a4b6"]])

/* harmony default export */ var Modal = (Modal_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/KeyPad.vue?vue&type=template&id=b6225b76&scoped=true

function KeyPadvue_type_template_id_b6225b76_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [(0,runtime_core_esm_bundler/* withDirectives */.bo)((0,runtime_core_esm_bundler/* createElementVNode */.Lk)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.inputValue = $event),
    onInput: _cache[1] || (_cache[1] = (...args) => $options.enforceMaxLength && $options.enforceMaxLength(...args)),
    type: "text",
    id: "inputField"
  }, null, 544), [[runtime_dom_esm_bundler/* vModelText */.Jo, $data.inputValue]]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
    class: "keyboard",
    onMousedown: _cache[2] || (_cache[2] = (...args) => $options.handleKeyClick && $options.handleKeyClick(...args))
  }, _cache[3] || (_cache[3] = [(0,runtime_core_esm_bundler/* createStaticVNode */.Fv)("<div class=\"keyboard-row\" data-v-b6225b76><button id=\"key-1\" data-v-b6225b76>1</button><button id=\"key-2\" data-v-b6225b76>2</button><button id=\"key-3\" data-v-b6225b76>3</button><button id=\"key-4\" data-v-b6225b76>4</button><button id=\"key-5\" data-v-b6225b76>5</button><button id=\"key-6\" data-v-b6225b76>6</button><button id=\"key-7\" data-v-b6225b76>7</button><button id=\"key-8\" data-v-b6225b76>8</button><button id=\"key-9\" data-v-b6225b76>9</button><button id=\"key-0\" data-v-b6225b76>0</button><button id=\"key-backspace\" class=\"ckey\" data-v-b6225b76>⌫ </button></div><div class=\"keyboard-row\" data-v-b6225b76><button id=\"key-Q\" data-v-b6225b76>Q</button><button id=\"key-W\" data-v-b6225b76>W</button><button id=\"key-E\" data-v-b6225b76>E</button><button id=\"key-R\" data-v-b6225b76>R</button><button id=\"key-T\" data-v-b6225b76>T</button><button id=\"key-Y\" data-v-b6225b76>Y</button><button id=\"key-U\" data-v-b6225b76>U</button><button id=\"key-I\" data-v-b6225b76>I</button><button id=\"key-O\" data-v-b6225b76>O</button><button id=\"key-P\" data-v-b6225b76>P</button></div><div class=\"keyboard-row\" data-v-b6225b76><button id=\"key-A\" data-v-b6225b76>A</button><button id=\"key-S\" data-v-b6225b76>S</button><button id=\"key-D\" data-v-b6225b76>D</button><button id=\"key-F\" data-v-b6225b76>F</button><button id=\"key-G\" data-v-b6225b76>G</button><button id=\"key-H\" data-v-b6225b76>H</button><button id=\"key-J\" data-v-b6225b76>J</button><button id=\"key-K\" data-v-b6225b76>K</button><button id=\"key-L\" data-v-b6225b76>L</button><button id=\"key-enter\" class=\"ckey\" data-v-b6225b76>⏎輸入</button></div><div class=\"keyboard-row\" data-v-b6225b76><button id=\"key-Z\" data-v-b6225b76>Z</button><button id=\"key-X\" data-v-b6225b76>X</button><button id=\"key-C\" data-v-b6225b76>C</button><button id=\"key-V\" data-v-b6225b76>V</button><button id=\"key-B\" data-v-b6225b76>B</button><button id=\"key-N\" data-v-b6225b76>N</button><button id=\"key-M\" data-v-b6225b76>M</button></div>", 4)]), 32)]);
}
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/KeyPad.vue?vue&type=script&lang=js
/* harmony default export */ var KeyPadvue_type_script_lang_js = ({
  emits: ['submit'],
  name: 'KeyPad',
  methods: {
    handleKeyClick(event) {
      const button = event.target.closest("button");
      if (!button) return;
      const id = button.id;
      if (!id.startsWith('key-')) return;
      const key = button.textContent;
      if (id === "key-backspace") {
        this.inputValue = this.inputValue.slice(0, -1);
      } else if (id === "key-enter") {
        this.$emit("submit", this.inputValue);
      } else {
        if (this.inputValue.length < 12) {
          this.inputValue += key;
        }
      }
    },
    enforceMaxLength() {
      if (this.inputValue.length > 12) {
        this.inputValue = this.inputValue.slice(0, 12);
      }
    }
  },
  data() {
    return {
      inputValue: ''
    };
  }
});
;// ../common/components/KeyPad.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!../common/components/KeyPad.vue?vue&type=style&index=0&id=b6225b76&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ../common/components/KeyPad.vue?vue&type=style&index=0&id=b6225b76&scoped=true&lang=css

;// ../common/components/KeyPad.vue




;


const KeyPad_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(KeyPadvue_type_script_lang_js, [['render',KeyPadvue_type_template_id_b6225b76_scoped_true_render],['__scopeId',"data-v-b6225b76"]])

/* harmony default export */ var KeyPad = (KeyPad_exports_);
;// ../common/mixins/init.js
/* harmony default export */ var init = ({
  data() {
    return {
      dev: false // 預設不顯示
    };
  },
  created() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('dev')) {
      this.dev = true;
      document.body.classList.add('dev-mode');
    }
  },
  mounted() {
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener('dragstart', function (event) {
      event.preventDefault();
    });
  }
});
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=script&lang=js















/* harmony default export */ var Appvue_type_script_lang_js = ({
  name: 'App',
  mixins: [init],
  components: {
    BannerPanel: BannerPanel,
    CtrlPanel: CtrlPanel,
    CabinSelector: CabinSelector,
    InfoPanel: InfoPanel,
    SettingsPanel: SettingsPanel,
    EbusListener: EbusListener,
    KeyPad: KeyPad,
    Modal: Modal
  },
  data() {
    return {
      showSettings: false,
      settingsNet: {
        mode: 'dhcp',
        store_ip: '',
        store_mask: '',
        pickup_ip: '',
        pickup_mask: '',
        gw: ''
      },
      coded: false,
      selected: false,
      /* BannerPanel */
      ebusConnected: false,
      /* CabinSelector */
      gridStatus: {},
      selectedId: [],
      config: [{
        "id": "9",
        "w": 2,
        "h": 1
      }, {
        "id": "5",
        "w": 1,
        "h": 1
      }, {
        "id": "1",
        "w": 1,
        "h": 1
      }, {
        "id": "10",
        "w": 2,
        "h": 1
      }, {
        "id": "6",
        "w": 1,
        "h": 1
      }, {
        "id": "2",
        "w": 1,
        "h": 1
      }, {
        "id": "11",
        "w": 2,
        "h": 1
      }, {
        "id": "7",
        "w": 1,
        "h": 1
      }, {
        "id": "3",
        "w": 1,
        "h": 1
      }, {
        "id": "12",
        "w": 2,
        "h": 1
      }, {
        "id": "8",
        "w": 1,
        "h": 1
      }, {
        "id": "4",
        "w": 1,
        "h": 1
      }],
      /* CtrlPanel */
      isMultiselect: false,
      /* KeyPad */
      deferredInput: null,
      /* InfoPanel */
      hint: "請點選格子及功能按鈕進行操作",
      currentView: "info",
      infoStatus: "空閒",
      infoQuantity: 0,
      infoOrderId: "",
      infoToken: "",
      infoItems: [],
      infoStoredTime: null,
      infoRedeemTime: null,
      infoTakenTime: null,
      log: "",
      /* ebusStatus */
      idle: true,
      // 是否閒置
      netStatus: {
        storer: 'offline',
        retriever: 'offline'
      },
      restUrl: '',
      settingsLoading: false
    };
  },
  methods: {
    getRestUrl() {
      const params = new URLSearchParams(window.location.search);
      const rest = params.get('rest');
      return rest || `${window.location.origin}/app/rest`;
    },
    async loadNetworkConfig() {
      if (!this.restUrl) this.restUrl = this.getRestUrl();
      try {
        const res = await fetch(`${this.restUrl}/sys.cgi`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        let data = null;
        try {
          data = JSON.parse(text);
        } catch (err) {
          data = null;
        }
        const cfg = data && typeof data === 'object' ? data.net_settings || data.net || data : null;
        if (!cfg) return;
        const mode = cfg.mode === 'fixed' ? 'static' : cfg.mode;
        this.settingsNet = {
          mode: mode || this.settingsNet.mode,
          store_ip: cfg.storer_ip || cfg.store_ip || this.settingsNet.store_ip,
          store_mask: cfg.storer_mask || cfg.store_mask || this.settingsNet.store_mask,
          pickup_ip: cfg.retriever_ip || cfg.pickup_ip || this.settingsNet.pickup_ip,
          pickup_mask: cfg.retriever_mask || cfg.pickup_mask || this.settingsNet.pickup_mask,
          gw: cfg.gw || this.settingsNet.gw
        };
      } catch (err) {
        console.log('loadNetworkConfig failed', err);
      }
    },
    async openSettings() {
      this.showSettings = true;
      this.settingsLoading = true;
      await this.loadNetworkConfig();
      this.settingsLoading = false;
    },
    closeSettings() {
      this.showSettings = false;
    },
    saveNetwork(cfg) {
      const set = {
        mode: cfg.mode,
        storer_ip: cfg.store_ip,
        storer_mask: cfg.store_mask,
        retriever_ip: cfg.pickup_ip,
        retriever_mask: cfg.pickup_mask,
        gw: cfg.gw
      };
      ebusService.send('sys/set', {
        act: 'net_setting',
        set
      });
      // 先把 UI 狀態存起來；後續要串後端(寫 /etc/netplan 或 ifconfig)再在這裡接。
      this.settingsNet = {
        mode: cfg.mode,
        store_ip: cfg.store_ip,
        store_mask: cfg.store_mask,
        pickup_ip: cfg.pickup_ip,
        pickup_mask: cfg.pickup_mask,
        gw: cfg.gw
      };
      this.log = `網路設定已保存(${cfg.mode === 'dhcp' ? 'DHCP' : '固定IP'})`;
    },
    handleChange(coded, selected) {
      if (!coded && !selected) {
        this.hint = "請點選格子及功能按鈕進行操作";
      } else if (!coded) {
        if (this.currentView == "info") {
          this.hint = "請直接掃碼進行存餐";
        } else if (this.currentView == "keypad") {
          this.hint = "請輸入取餐碼，進行存餐";
        }
      } else if (!selected) {
        this.hint = "已經完成掃碼，請點選格子進行存餐";
      }
    },
    handleSelect(id) {
      if (this.isMultiselect) {
        if (this.selectedId.includes(id)) {
          this.selectedId = this.selectedId.filter(item => item !== id);
        } else {
          this.selectedId.push(id);
        }
      } else {
        // 單選模式：直接設定為一個 id
        this.selectedId = [id];
      }
      this.log = "格子" + id + "被選取";
      ebusService.send('order/ordered', {
        "chid": this.selectedId
      });
      ebusService.send('store/goto_none');
      ebusService.send('store/start');
      ebusService.send('store/input', {
        "chid": this.selectedId
      });
      this.currentView = 'info';
      this.selected = true;
    },
    sysAfterHint(e) {
      const report = e?.arg?.net_status_report;
      if (report && report.status) {
        const status = String(report.status);
        const hid = String(report.hid || '');
        if (hid === 'storer') this.netStatus.storer = status;
        if (hid === 'retriever') this.netStatus.retriever = status;
        console.log(`net_status_report hid=${hid} status=${status}`);
      }
      if (!e.arg || !e.arg.gridStatus) return;
      const newStatus = e.arg.gridStatus;
      for (const [id, val] of Object.entries(newStatus)) {
        const current = this.gridStatus[id] || 0;

        // 保留低兩個 bit (0,1)
        const keepBits01 = current & (1 << 0 | 1 << 1);

        // 取出新值的 bit2 ~ bit8
        const newBits2to8 = val & 0b11111100;

        // 合併
        this.gridStatus[id] = keepBits01 | newBits2to8;
      }
    },
    debugEbusEvent(e) {
      try {
        const name = e?.e || 'unknown';
        console.log('ebus-event', name, e?.arg || {});
      } catch (err) {
        console.log('ebus-event [unserializable]');
      }
    },
    orderAfterHint(e) {
      if (!e.arg) return;
      try {
        for (const [id, data] of Object.entries(e.arg)) {
          const quantity = Number(data.quan);
          if (quantity > 0) {
            this.gridStatus[id] |= 1 << 0; // 設置佔用狀態
          } else {
            this.gridStatus[id] &= ~(1 << 0); // 清除佔用狀態
          }
          this.infoStatus = quantity ? '佔用' : '空閒';
          this.infoQuantity = data.quan;
          this.infoOrderId = data.oid;
          this.infoToken = data.token;
          this.infoItems = data.items;
          this.infoStoredTime = data.stored_time;
          this.infoRedeemTime = data.redeem_time;
          this.infoTakenTime = data.taken_time;
        }
      } catch (err) {
        console.log(err);
      }
      this.log = JSON.stringify(e);
    },
    storeEnterEND(e) {
      if (e.on === 'store_ok') {
        ModalService.showInfo({
          message: '存餐成功'
        });
      } else {
        ModalService.showInfo({
          message: '存餐失敗'
        });
      }
      ebusService.send('order/ordered', {
        "chid": this.selectedId
      });
      this.currentView = 'info';
      this.isMultiselect = false;
      this.clearSelection();
    },
    disposeEnterEND(e) {
      if (e.on === 'dispose_ok') {
        ModalService.showInfo({
          message: '清除成功'
        });
      } else {
        ModalService.showInfo({
          message: '清除失敗'
        });
      }
      ebusService.send('order/ordered', {
        "chid": this.selectedId
      });
      this.isMultiselect = false;
      this.clearSelection();
    },
    sysEnterINIT() {
      ebusService.send('order/goto_MENU');
      ebusService.send('order/ordered', {
        "chid": this.config.map(item => item.id)
      });
    },
    clearSelection() {
      this.selected = false;
      this.selectedId = [];
      this.coded = false;
      ebusService.send('store/goto_none');
      ebusService.send('store/start');
    },
    toggleMultiselect() {
      this.isMultiselect = !this.isMultiselect;
      // 切回單選時，取第一個選項作為目前選取
      if (!this.isMultiselect) {
        this.selectedId = [this.selectedId[0]];
      }
    },
    storeOrder() {
      this.currentView = 'keypad';
      if (this.selectedId.length != 0) {
        this.log = "存餐至" + this.selectedId.sort().join(',') + "格";
      } else {
        this.log = "沒有選取格子";
      }
    },
    clearOrder() {
      this.currentView = 'info';
      if (this.selectedId.length != 0) {
        this.log = "清除" + this.selectedId.sort().join(',') + "格";
        ModalService.showYesNo('確定清除餐點', () => {
          ModalService.showLocked();
          ebusService.send('dispose/goto_none');
          ebusService.send('dispose/start');
          ebusService.send('dispose/ready');
          ebusService.send('dispose/confirmed');
        }, () => {});
      } else {
        this.log = "沒有選取格子";
      }
    },
    handleSubmit(data) {
      ebusService.send('reader/read', {
        "type": "keypad",
        "data": data
      });
    },
    storeEnterProcess() {
      ModalService.showLocked();
    },
    refreshSession() {
      if (this.idle) {
        ebusService.send('sess/session_begin');
        this.idle = false;
      } else {
        ebusService.send('sess/refresh_timer');
      }
    }
  },
  watch: {
    ebusConnected(val) {
      if (val) {
        ebusService.send('order/goto_MENU');
        ebusService.send('order/ordered', {
          "chid": this.config.map(item => item.id)
        });
      }
    },
    coded(val) {
      this.handleChange(val, this.selected);
    },
    selected(val) {
      this.handleChange(this.coded, val);
    },
    currentView(nv, ov) {
      if (nv !== ov && nv === "info") {
        //this.hint="請點選格子及功能按鈕進行操作";
      } else if (nv === "keypad") {
        //this.hint="請掃描或輸入取餐碼";
      }
    }
  },
  mounted() {
    this.restUrl = this.getRestUrl();
    this.loadNetworkConfig();
    this.$nextTick(() => {
      if (!this.ebusConnected && ebusService.connected) {
        this.ebusConnected = true;
      }
    });
    document.addEventListener('mousedown', this.refreshSession);
    // 防止兩指縮放
    document.addEventListener('touchstart', function (e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, {
      passive: false
    });
  }
});
;// ./src/App.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=style&index=0&id=87117114&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/App.vue?vue&type=style&index=0&id=87117114&scoped=true&lang=css

;// ./src/App.vue




;


const App_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(Appvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-87117114"]])

/* harmony default export */ var App = (App_exports_);
;// ./src/main.js


(0,runtime_dom_esm_bundler/* createApp */.Ef)(App).mount('#app');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			524: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkstorer"] = self["webpackChunkstorer"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [504], function() { return __webpack_require__(8657); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.7992f330.js.map