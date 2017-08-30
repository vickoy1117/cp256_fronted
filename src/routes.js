// 首页组件
import home from './components/index/home'
import awardList from './components/index/awardList'
// 购买组件
import buyHall from './components/buyHall/buyHall'
// 购买组件详情
import buyHallDetail from './components/buyHall/buyHallDetail'
// 购买组件付款
import buyHallCheck from './components/buyHall/buyHallCheck'
// 开奖组件
import lotteryHall from './components/lotteryHall/lotteryHall'

import lotteryHallDetail from './components/lotteryHall/lotteryHallDetail'
// 趋势组件
import trend from './components/trend/trend'
// 个人中心
import member from './components/member/member'
// 个人中心充值记录
import rechargeRecord from './components/member/rechargeRecord'
// 个人中心充值
import recharge from './components/member/recharge'

import rechargeList from './components/member/rechargeList'
//个人中心提现
import cash from './components/member/cash'
//个人中心提款记录
import cashRecord from './components/member/cashRecord'
//个人中心投注记录
import pushRecord from './components/member/pushRecord'
import pushRecordDetail from './components/member/pushRecordDetail'
//个人中心账户明细
import accountDetail from './components/member/accountDetail'
//个人中心更多
import more from './components/member/more'
//个人中心个人消息
import information from './components/member/information'
// 个人中心个人消息详情
import informationDetail from './components/member/informationDetail'
//个人中心中奖记录
import winningRecord from './components/member/winningRecord'

import bundingBank from './components/member/bundingBank'

import feedback from './components/member/feedback'

import cashBank from './components/member/cashBank'

import aboutUs from './components/member/aboutUs'

import cashBankDetail from './components/member/cashBankDetail'
//登录
import login from './components/loginRegis/login'
//注册
import register from './components/loginRegis/register'
//忘记密码
import forgetPassword from './components/loginRegis/forgetPassword'
//修改取款密码
import editCoinPassword from './components/loginRegis/editCoinPassword.vue'
//优惠活动
import activity from './components/activity/activity'
import activityDetail from './components/activity/activityDetail'
// 试用登陆页
import trial from './components/loginRegis/trial'

export default
//路由配置
[{
    path: '/',
    redirect: '/index/home'
  },
  {
    path: '/index/home', //首页
    name: 'home',
    component: home
  },
  {
    path: '/index/awardList', //首页
    component: awardList
  },
  {
    path: '/buyHall/buyHall', //购买
    component: buyHall
  },
  {
    path: '/buyHall/buyHallDetail', //购买详情
    component: buyHallDetail
  },
  {
    path: '/buyHall/buyHallCheck', //购买付款页面
    name: 'buyHallCheck',
    component: buyHallCheck
  },
  {
    path: '/lotteryHall/lotteryHall', //开奖
    component: lotteryHall
  },
  {
    path: '/lotteryHall/lotteryHallDetail', //开奖详情
    name: 'lotteryHallDetail',
    component: lotteryHallDetail
  },
  {
    path: '/trend/trend', //趋势
    component: trend
  },
  {
    path: '/member/member', //个人中心
    name: 'member',
    component: member
  },
  {
    path: '/member/rechargeRecord', //个人中心充值记录
    component: rechargeRecord
  },
  {
    path: '/member/recharge', //个人中心充值
    component: recharge
  },
  {
    path: '/member/rechargeList', //个人中心充值
    component: rechargeList
  },
  {
    path: '/member/cash', //个人中心提现
    component: cash
  },
  {
    path: '/member/cashRecord', //个人中心提款记录
    component: cashRecord
  },
  {
    path: '/member/pushRecord', //个人中心投注记录
    component: pushRecord
  },
  {
    path: '/member/winningRecord',
    component: winningRecord
  },
  {
    path: '/member/aboutUs', //个人中心更多
    component: aboutUs
  },
  {
    path: '/member/pushRecordDetail', //个人中心投注详情
    component: pushRecordDetail
  },
  {
    path: '/member/accountDetail', //个人中心账户明细
    component: accountDetail
  },
  {
    path: '/member/more', //个人中心更多
    component: more
  },
  {
    path: '/member/information', //个人中心个人消息
    component: information
  },
  {
    path: '/member/informationDetail/:notifyId', //个人中心个人消息详情
    name: 'informationDetail',
    component: informationDetail
  },
  {
    path: '/member/bundingBank', //个人中心绑定银行卡
    name: 'bundingBank',
    component: bundingBank
  },
  {
    path: '/member/feedback', //个人中心意见反馈
    component: feedback
  },
  {
    path: '/member/cashBank', //
    component: cashBank
  },
  {
    path: '/member/cashBankDetail', //
    component: cashBankDetail
  },
  {
    path: '/loginRegis/login', //登录
    name: 'login',
    component: login
  },
  {
    path: '/loginRegis/register', //注册
    component: register
  },
  {
    path: '/loginRegis/trial', //试用
    component: trial
  },
  {
    path: '/loginRegis/forgetPassword', //忘记密码
    component: forgetPassword
  },
  {
    path: '/loginRegis/editCoinPassword',
    component: editCoinPassword
  },
  {
    path: '/activity/activity', //优惠活动
    component: activity
  },
  {
    path: '/activity/activityDetail', //优惠活动
    component: activityDetail
  }

];
