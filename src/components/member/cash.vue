<template>
    <div class="cash">
        <headCom></headCom>
        <div class="MB10">
            <div class="H10"></div>
            <p class="LH25 FZ14">提款银行：{{account}}
                <span class="fr red">{{bankName}}</span>
            </p>
            <p class="LH25 FZ14">开户姓名：{{username}}</p>
            <div class="cashNum">
                <span>提款金额</span>
                <input type="text" :placeholder="coinScope" v-model="amount">
            </div>
            <div class="cashNum">
                <span>提款密码</span>
                <input type="password" placeholder="请输入提款密码" v-model="coinPwd">
            </div>
            <div class="H20"></div>
            <p class="cashBtn" @click="cashBtn">提交</p>
            <div class="H20"></div>
            <p class="red FZ16 LH35">温馨提示</p>
            <p class="FZ14 LH20">1.提款不收取手续费，为防止恶意提现，每日提款次数最多为3次（提款处理中与提款成功次数的总和）。</p>
            <p class="FZ14 LH20">2.为了防止套现和洗钱，每次充值后需消费金额100%后才能提现</p>
            <p class="FZ14 LH20">3.用户提款最快10分钟内到账
                <span class="red"></span>
            </p>
        </div>
        <div class="cashAlert" v-show="cashAlert">
            <div class="con">
                <p class="title">您还未绑定银行去，前去绑定吧！</p>
                <p class="btns">
                    <span style="margin-right: 40px;" @click="cancelBtn">取消</span>
                    <span @click="confirmBtn">确认</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'cash',
    data() {
        return {
            account: '',
            username: '',
            bankName: '',
            amount: '',
            coinPwd: '',
            cashAlert: false,
            coinScope: ''
        }
    },
    components: {
        headCom
    },
    methods: {
        cashBtn: function () {
            if (!(this.amount == '' && this.coinCode == '')) {
                var _self = this;

                server.withdrawDo(_self, {
                    amount: this.amount,
                    coinpwd: this.coinPwd
                });
            }
        },
        cancelBtn: function () {
            this.cashAlert = false;
        },
        confirmBtn: function () {
            this.$router.push({ name: 'bundingBank' });
        },

    },
    mounted: function () {
        var _self = this;

        server.getUserBankInfo(_self,{});
        server.withdrawInfo(_self, {});
        //修改title
        this.$store.commit('changetitle', '提现');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*提现*/

.cashAlert {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 15;
}

.cashAlert .con {
    width: 250px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -125px;
    margin-top: -75px;
    height: 150px;
    border-radius: 3px;
}

.cashAlert .con .title {
    margin: 0 10px;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    margin: 20px 0 40px 0;
}

.cashAlert .con .btns {
    text-align: center;
}

.cashAlert .con .btns span {
    display: inline-block;
    width: 60px;
    height: 30px;
    background: #f64444;
    color: #fff;
    line-height: 30px;

    border-radius: 5px;
}

.cashNum {
    background: #fff;
    border: solid 1px #e6e6e6;
    border-radius: 5px;
    line-height: 40px;
    position: relative;
    padding-left: 80px;
    margin-top: 10px;
}

.cashNum span {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 80px;
    text-align: center;
    font-size: 14px;
}

.cashNum input {
    width: 100%;
    height: 40px;
    font-size: 14px;
}

.cashBtn {
    display: block;
    width: 100%;
    line-height: 40px;
    background: #f54444;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
}
</style>

