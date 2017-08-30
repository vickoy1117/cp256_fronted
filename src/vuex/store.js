import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
//使用vuex
Vue.use(Vuex);

const state = {
  userId: '',
  token: '',
  realName: '',
  documentTitle: '',
  headBack: false,
  toPlay: [],
  buySetting: false,
  buyCheck: false,
  addDateJson: {},
  addDateJson2: {},
  isFixed: '',          // 判断是否需要滑动条（倍率是否固定）
  arr: [],              // 保存被选中的数
  odds: [],             // 保存被选中数字的赔率
  changeOdds: 0,        // 动态赔率（随着选号呈现不规则变化的赔率）
  total: 0,             // 动态注数（某些特殊彩票、组合注数会随着选择数量不同而变动）
  sumMoney: '',
  hasCate: [],
  noCate: [],
  recharge: {},
  mBankId: '',
  isBack: false,
  isLogined: false,
  arrList: [],          // postCode时的数组
  betsDisplay: []       // 保存显示在付款页的投注号码等记录
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})
