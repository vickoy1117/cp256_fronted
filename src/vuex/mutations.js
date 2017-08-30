export default {
  addRealName: function (state, n) {
    state.realName = n;
  },
  changetitle: function (state, n) {
    state.documentTitle = n;
  },
  changeBack: function (state, n) {
    state.headBack = n;
  },
  changeTab: function (state, n) {
    state.tab = n;
  },
  changeTabwidth: function (state, n) {
    state.tabWidth = n;
  },
  addUserId: function (state, n) {
    state.userId = n;
  },
  addToken: function (state, n) {
    state.token = n;
  },
  buySetting: function (state, n) {
    state.buySetting = n;
  },
  // 是否固定赔率,如果为1，即固定赔率，如果为0，即可滑动调整
  isFixed: function (state, n) {
    state.isFixed = n;
  },
  // 保存被选中的数
  arr: function(state,n) {
    state.arr = n
  },
  // 保存被选中数字的赔率
  odds: function(state,n) {
    state.odds = n;
  },
  // 动态赔率（随着选号呈现不规则变化的赔率）
  changeOdds: function(state,n) {
    state.changeOdds = n;
  },
  // 动态注数
  total: function(state,n) {
    state.total = n;
  },
  // postCode时的数组
  arrList: function(state,n) {
    state.arrList = n;
  },
  // 保存显示在付款页的投注号码等记录
  betsDisplay: function(state,n) {
    state.betsDisplay = n;
  },
  buyCheck: function (state, n) {
    state.buyCheck = n;
  },
  //传递选中的数字
  addData: function (state, n) {
    state.addDateJson = n;
  },
  addData2: function (state, n) {
    state.addDateJson2 = n;
  },

  addData3: function (state, n) {
    state.payList.data.code[0].beiShu = n;
  },
  addData4: function (state, n) {
    state.payList.data.code[0].mode = n;
  },
  addDataTotal: function (state, n) {
    state.payList.data.code[0].actionNum = n;
  },
  addDataGroupId: function (state, n) {
    state.payList.data.code[0].playedGroup = n;
  },
  addDataPlayedId: function (state, n) {
    state.payList.data.code[0].playedId = n;
  },
  addDataAactionNo: function (state, n) {
    state.payList.data.para.actionNo = n;
  },
  addDataActionData: function (state, n) {
    state.payList.data.code[0].actionData = n;
  },
  sumMoney: function (state, n) {
    state.sumMoney = n;
  },

  hasCate: function (state, n) {
    state.hasCate = n;
  },
  noCate: function (state, n) {
    state.noCate = n;
  },
  changeRecharge: function (state, n) {
    state.recharge = n;
  },
  addMBankId: function (state, n) { //添加银行卡ID
    state.mBankId = n;
  }

}
