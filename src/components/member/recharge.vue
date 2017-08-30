<template>
    <div class="recharge">
        <headCom></headCom>
        <div class="rechargecon">
            <span>充值金额</span>
            <input type="text" placeholder="请输入充值金额" v-model="recharge">
            <em>元</em>
        </div>
        <div class="H10"></div>
        <div class="rechargeList">
            <div class="con">
                <router-link to="/member/cashBank">
                    <span class="icon-cash pic"></span>银行卡支付
                    <em class="icon-arrow-right"></em>
                    <div class="border_line_top H01"></div>
                </router-link>
            </div>
            <div class="con">
                <a href="javascript:" @click="weixinbtn1">
                    <span class="icon-weixin pic"></span>城宝微信支付
                    <em class="icon-arrow-right"></em>
                </a>
                <div class="border_line_top H01"></div>
            </div>
            <div class="con">
              <a href="javascript:" @click="weixinbtn2">
                <span class="icon-weixin pic"></span>梨涡微信支付
                <em class="icon-arrow-right"></em>
              </a>
              <div class="border_line_top H01"></div>
            </div>
            <div class="con">
                <a href="javascript:" @click="paybtn1">
                    <span class="icon-pay pic"></span>城宝支付宝支付
                    <em class="icon-arrow-right"></em>
                </a>
                <div class="border_line_top H01"></div>
            </div>
            <div class="con">
              <a href="javascript:" @click="paybtn2">
                <span class="icon-pay pic"></span>梨涡支付宝支付
                <em class="icon-arrow-right"></em>
              </a>
              <div class="border_line_top H01"></div>
            </div>
          <div class="con">
            <a href="javascript:" @click="wangyin" class="wangyin">
              <img src="../../../static/images/wangyin.png" class="wangyinimg">网银支付
              <em class="icon-arrow-right"></em>
            </a>
            <div class="border_line_top H01"></div>
          </div>
          <div class="con">
            <a href="javascript:" @click="qqzhifu" class="wangyin">
              <img src="../../../static/images/qqzhifu.png" class="qqimg">QQ支付
              <em class="icon-arrow-right"></em>
            </a>
            <div class="border_line_top H01"></div>
          </div>
            <!--<div class="con">-->
            <!--<a href="javascript:" @click="xbPayBtn">-->
            <!--<img class="pic" src="/static/images/xbpay.png" />新贝支付<em class="icon-arrow-right"></em>-->
            <!--</a>-->
            <!--<div class="border_line_top H01"></div>-->
            <!--</div>-->
            <!-- <div class="con">
                        <router-link to="/member/cashBank">
                            <span class="icon-bank pic"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span>
                           </span>银行卡转账<em class="icon-arrow-right"></em>
                        </router-link>
                    </div> -->
        </div>

    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'recharge',
    data() {
        return {
            recharge: '',
            accountList: []
        }
    },
    components: {
        headCom
    },
    methods: {
        //成宝 微信
        weixinbtn1: function () {
            if (this.$store.state.recharge == '') {
                return layer.open({
                    content: '支付金额不能为空',
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            }
            var _self = this;
            server.onlinePay(_self, {
                mBankId: 297,
                amount: this.$store.state.recharge
            });
        },
      //梨涡 微信
      weixinbtn2: function () {
        if (this.$store.state.recharge == '') {
          return layer.open({
            content: '支付金额不能为空',
            skin: 'msg',
            time: 3 //2秒后自动关闭
          });
        }
        var _self = this;
        server.onlinePay(_self, {
          mBankId: 302,
          amount: this.$store.state.recharge
        });
      },
        //成宝 支付宝
        paybtn1: function () {
            //var _self=this;

            //this.$router.push({ path: '/member/rechargeList?id=2'});
            if (this.$store.state.recharge == '') {
                return layer.open({
                    content: '支付金额不能为空',
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            }
            var _self = this;

            server.onlinePay(_self, {
                mBankId: 296,
                amount: this.$store.state.recharge
            });
        },
      //梨涡 支付宝
      paybtn2: function () {
        //var _self=this;

        //this.$router.push({ path: '/member/rechargeList?id=2'});
        if (this.$store.state.recharge == '') {
          return layer.open({
            content: '支付金额不能为空',
            skin: 'msg',
            time: 3 //2秒后自动关闭
          });
        }
        var _self = this;

        server.onlinePay(_self, {
          mBankId: 301,
          amount: this.$store.state.recharge
        });
      },
      //梨涡 网银
      wangyin: function () {
        //var _self=this;

        //this.$router.push({ path: '/member/rechargeList?id=2'});
        if (this.$store.state.recharge == '') {
          return layer.open({
            content: '支付金额不能为空',
            skin: 'msg',
            time: 3 //2秒后自动关闭
          });
        }
        var _self = this;

        server.onlinePay(_self, {
          mBankId: 300,
          amount: this.$store.state.recharge
        });
      },
      //梨涡 QQ
      qqzhifu: function () {
        //var _self=this;

        //this.$router.push({ path: '/member/rechargeList?id=2'});
        if (this.$store.state.recharge == '') {
          return layer.open({
            content: '支付金额不能为空',
            skin: 'msg',
            time: 3 //2秒后自动关闭
          });
        }
        var _self = this;

        server.onlinePay(_self, {
          mBankId: 303,
          amount: this.$store.state.recharge
        });
      },
        shouldShowWepay: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            }
        }
    },
    watch: {
        recharge: function (val) {
            this.$store.commit('changeRecharge', val);
        }
    },
    mounted: function () {
        //修改title
        this.$store.commit('changetitle', '充值');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rechargecon {
    height: 60px;
    background: #fff;
    position: relative;
    padding: 0 40px 0 80px;
}

.rechargecon span {
    position: absolute;
    left: 10px;
    top: 0;
    line-height: 60px;
    font-size: 14px;
}

.rechargecon em {
    position: absolute;
    right: 10px;
    top: 0;
    line-height: 60px;
    font-size: 14px;
}

.rechargecon input {
    width: 100%;
    line-height: 30px;
    font-size: 14px;
    border: solid 1px #cccccc;
    margin-top: 15px;
    text-indent: 10px;
}

.rechargeList {
    background: #fff;
}

.rechargeList .con a {
    display: block;
    margin: 0 10px;
    padding-left: 60px;
    position: relative;
    line-height: 60px;
    font-size: 15px;
}

.rechargeList .con .pic {
    position: absolute;
    left: 0;
    top: 10px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 40px;
}

.rechargeList .con span.icon-weixin {
    color: #42ae3c;
}

.rechargeList .con span.icon-pay {
    color: #009fe8;
    font-size: 36px;
}

.rechargeList .con em {
    position: absolute;
    right: 0;
    top: 20px;
    color: #cccccc;
    border: solid 1px #cccccc;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
}
  .wangyin{
    position: relative;
    padding-left: 0;
  }
  .wangyinimg{
    position: absolute;
    left: 0;
    width: 37px;
    height: 25px;
    top:17.5px;
  }
.qqimg{
  position: absolute;
  left: 0;
  width: 35px;
  height: 35px;
  top:11px;
}
</style>

