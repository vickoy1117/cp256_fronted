<template>
  <div class="buyHallCheck" v-show="this.$store.state.buyCheck">
    <div class="H50">
      <header>
        <p class="back" @click="back">
          <span class="icon-back"></span>
        </p>
        <p>{{groupName}}</p>
        <div class="border_line"></div>
      </header>
    </div>
    <div class="buyCheck">
      <ul class="out">
        <li class="n" @click="optionalNumber">
          <p>
            <span>+</span>自选号码</p>
        </li>
        <!--<li class="n" @click="randomBtn">
            <p>
              <span>+</span>机选一注</p>
          </li>-->
        <li class="n" @click="deleteBtn">
          <p>
            <span>x</span>清空</p>
        </li>
      </ul>
      <div class="buyCheckList">
        <div class="con">
          <p></p>
        </div>
        <div class="buyCheckNumList" v-for="(b,index) in this.$store.state.betsDisplay">
          <div class="buyCheckNum">
            <div class=" border_line_top H01px"></div>
            <!--<span class="icon-close" @click="deleteBtn(index)"></span>-->
            <p class="num">{{b.actionDate}}</p>
            <p class="intro">
              <span>{{b.total}}注
                <em>{{b.totalMoney}}元</em>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="xieyi">
        <span v-bind:class="{ 'icon-checkbox': icon_checkbox, 'icon-checkboxed': icon_checkboxed }" @click="checkbox"></span>我以阅读并同意《cp256彩票服务协议》
      </div>
    </div>
    <div class="buyCheckBtn">
      <div class="con">
        <!-- <div class="num">
                追号 <span class="inputNum">
                <em class="decrease">-</em>
                <i class="inp">{{addition}}</i>
                <em class="increase">+</em>
                </span>
                <span class="fr">倍投 <span class="inputNum">
                <em class="decrease">-</em>
                <i class="inp">{{multiple}}</i>
                <em class="increase">+</em></span>
                </span>
              </div> -->
        <div class=" border_line_top H01px"></div>
        <p class="total">{{total}}注{{addition}}期
          <span class="red fr">{{totalMoney}}元</span>
        </p>
        <p class="MB10">
          <span class="btn" @click="payBtn">付款</span>
        </p>
        <div class="H10"></div>
      </div>
    </div>
  </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
  name: 'buyHallCheck',
  props: ['json', 'json2', 'total', 'totalMoney', 'groupName'],
  data() {
    return {
      multiple: '2',
      addition: '1',
      actionData: '',
      actionNum: '',
      sumMoney: '',
      icon_checkbox: true,
      icon_checkboxed: false
    }
  },
  methods: {
    payBtn () {
      if (this.icon_checkbox) {
        layer.open({
          content: '您未同意服务协议',
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      } else {
        var _self = this;

        // 最后一步，打包提交后台
        var list = {
          // "code": arrList,
          "code": _self.$store.state.arrList,
          "para": {
            "type": this.json.type,
            "actionNo": this.json.actionNo
          }
        }
        // iBHLYZX.getToken();
        server.postCode(_self, {
          data: JSON.stringify(list)
        })
        // 支付完毕，清空投注数据数组
        this.$store.commit('arrList', [])
        // 支付完毕，清空支付页面显示数据数组
        this.$store.commit('betsDisplay', [])
      }
    },
    back () {
      this.$store.commit('buyCheck', false);
    },
    // 自选号码
    optionalNumber () {
      this.$emit("optionFun", '')
      this.$store.commit('buyCheck', false);
    },
    // 删除选号
    deleteBtn (index) {
      this.$emit("fresh3", '');
      this.$store.commit('buyCheck', false);
      this.$store.commit('betsDisplay', []);
      // console.log('index:' + index)
      // var betDisplayTemp = this.$store.state.betsDisplay
      // betDisplayTemp.splice(index, 1);
      // this.$store.commit('betsDisplay', betDisplayTemp);
    },
    // 机选一注
    // randomBtn: function () {
    //   if(this.$store.state.isFixed == 1) {
    //     var arr = this.$store.state.arr
    //   } else {
    //     var arr = this.json.actionData;
    //   }
    //   console.log('arr:', arr)
    //   var len = arr.length;
    //   var num = parseInt(Math.random() * len);
    //   console.info(num)
    //   console.info(arr[num])
    //   this.$emit("fresh4", arr[num]);
    // },
    // 协议
    checkbox: function () {
      this.icon_checkbox = !this.icon_checkbox;
      this.icon_checkboxed = !this.icon_checkboxed;
      if (this.icon_checkbox) {
        this.state = 1;
      } else {
        this.state = 0;
      }
    },
  },
  mounted() {
    console.log('this.$store.state.odds:' + this.$store.state.odds)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*购买确认*/

.buyHallCheck {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 15;
}

header {
  z-index: 10;
}

.back {
  position: absolute;
  left: 0;
  top: 0;
  width: 35px;
}

.icon-back {
  font-size: 18px;
  color: #666;
}

.buyCheck {
  margin-top: 10px;
}

.buyCheck ul {
  margin-left: 10px;
}

.buyCheck ul li {
  width: 50%;
}

.buyCheck ul li p {
  line-height: 30px;
  border: solid 1px #666666;
  color: #666666;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 10px;
}

.buyCheck ul li p span {

  margin-right: 3px;
}

.buyCheckList {
  margin: 10px 10px 0 10px;
}

.buyCheckList .con {
  height: 10px;
  padding: 5px;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 3px 3px #e8e8e8;
}

.buyCheckList .con p {

  background: #eeeeee;
  height: 10px;
  border-radius: 25px;
}

.buyCheckNumList {
  background: #fff;
  margin: -10px 5px 0 5px;
  position: relative;
}

.buyCheckNum {
  position: relative;
  padding: 0 10px;
}

.buyCheckNum .num {
  color: #f54444;
  font-size: 20px;
  letter-spacing: 5px;
  padding-left: 40px;
  padding-top: 20px;
  line-height: 30px;
}

.buyCheckNum .icon-close {
  position: absolute;
  left: 10px;
  top: 35px;
  font-size: 25px;
  color: #dddddd;
}

.buyCheckNum .intro {
  padding-left: 40px;
  line-height: 30px;
  padding-bottom: 15px;
  font-size: 15px;
}

.buyCheckNum .intro span {
  margin-left: 20px;
}

.buyCheckNum .intro em {
  margin-left: 10px;
}

.buyCheck .xieyi {
  position: relative;
  margin: 0 10px;
  font-size: 14px;
  line-height: 50px;
  color: #666;
  padding-left: 23px;
}

.buyCheck .xieyi span {
  position: absolute;
  left: 0;
  top: 16px;
  font-size: 18px;
  color: #dedede;
}

.buyCheckBtn {
  height: 140px;
}

.buyCheckBtn .con {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
}

.buyCheckBtn .con .num {
  line-height: 50px;
  margin: 0 10px;
  font-size: 14px;
}

.buyCheckBtn .con .num .inputNum {
  display: inline-block;
  width: 90px;
  height: 25px;
  background: #f2f2f2;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin-top: 12px;
  vertical-align: top;
  position: relative;
}

.buyCheckBtn .con .num .inputNum .decrease {
  position: absolute;
  left: 0;
  top: 0;
  width: 25px;
  height: 25px;
  display: inline-block;
  text-align: center;
  line-height: 25px;
  font-size: 18px;
}

.buyCheckBtn .con .num .inputNum .increase {
  position: absolute;
  right: 0;
  top: 0;
  width: 25px;
  height: 25px;
  display: inline-block;
  text-align: center;
  line-height: 25px;
  font-size: 18px;
}

.buyCheckBtn .con .num .inputNum .inp {
  position: absolute;
  left: 26px;
  top: 0;
  width: 38px;
  height: 25px;
  background: #fff;
  text-align: center;
  line-height: 25px;
}

.buyCheckBtn .total {
  text-align: center;
  line-height: 33px;
  margin: 0 10px;
  font-size: 15px;
  color: #666666;
}

.buyCheckBtn .btn {
  width: 100%;
  display: block;
  color: #fff;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background: #f54444;
  border-radius: 5px;
}

.buyCheckDetail {
  margin: 0 10px;
  background: #fff;
}

.buyCheckDetail .title {
  line-height: 35px;
  padding: 0 12px;
  position: relative;
  font-size: 14px;
}

.buyCheckDetail .title span {
  display: block;
  position: absolute;
  left: 5px;
  top: 7px;
  height: 17px;
  width: 3px;
  background: #f54444;
}

.buyCheckDetail dl {
  padding-bottom: 10px;
}

.buyCheckDetail dl dd {
  position: relative;
  padding-left: 100px;
  line-height: 25px;
  font-size: 14px;
}

.buyCheckDetail dl .left {
  display: inline-block;
  width: 80px;
  text-align: right;
  color: #999999;

  position: absolute;
  left: 0;
  top: 0;
}

.buyCheckDetailBtn {
  height: 60px;
}

.buyCheckDetailBtn .con {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fff;
}

.buyCheckDetailBtn .con a {
  display: block;
  height: 40px;
  margin: 0 10px;
  background: #f54444;
  color: #fff;
  margin-top: 10px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  font-size: 16px;
}
</style>


