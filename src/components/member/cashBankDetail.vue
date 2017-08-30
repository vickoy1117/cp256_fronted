<template>
    <div class="cashBankDetail">
        <headCom></headCom>
        <p class="MB10 LH30 FZ15">收款人信息</p>
        <dl class="shoukuan">
            <dd>
                <span class="left">银行</span>
                <span class="right">{{info.name}}</span>
            </dd>
            <dd>
                <span class="left">收款人</span>
                <span class="right">{{info.username}}</span>
            </dd>
            <dd>
                <span class="left">账号</span>
                <span class="right">{{info.account}}</span>
            </dd>
            <dd>
                <span class="left">开户行</span>
                <span class="right">{{info.bankaddress}}</span>
            </dd>
        </dl>
        <p class="MB10 LH45 FZ15">请填写您的汇款信息</p>
        <dl class="info">
            <dd>
                <span class="left">银行名称</span>
                <span class="right">
                    <input type="text" placeholder="银行卡所属银行" v-model="recharge.bankname">
                </span>
            </dd>
            <dd>
                <span class="left">存款人姓名</span>
                <span class="right">
                    <input type="text" placeholder="银行卡的户名" v-model="recharge.accountname">
                </span>
            </dd>
            <dd>
                <span class="left">存款金额</span>
                <span class="right">
                    <input type="text" placeholder="存款金额" v-model="recharge.amount">
                </span>
            </dd>
    
        </dl>
        <div class="H30"></div>
        <div class="MB10" @click="btn">
            <span class="btn">确认</span>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'cashBankDetail',
    data() {
        return {
            info: {},
            recharge: {}
        }
    },
    components: {
        headCom
    },
    methods: {
        btn: function () {
            // if(this.recharge.amount<50||this.recharge.amount>50000){
            //         return layer.open({
            //             content: '银行卡充值最低50元，最高50000元',
            //             skin: 'msg',
            //             time: 3 //2秒后自动关闭
            //         });
            //     }

            server.rechargeBank(this, {
                mBankId: location.href.split('?')[1].split('=')[1],
                amount: this.recharge.amount
            });
        }

    },
    mounted: function () {
        var _self = this;

        server.accountDetail(_self, {
            id: location.href.split('?')[1].split('=')[1]
        })
        //修改title
        this.$store.commit('changetitle', '填写存款信息');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    background: #f54444;
    font-size: 16px;
}

.shoukuan {
    margin: 0 10px;
    background: #fff;
    border-radius: 5px;
    padding: 5px 10px;
}

.shoukuan dd {
    line-height: 30px;
    font-size: 14px;
}

.shoukuan dd .left {
    width: 70px;
    display: inline-block;
}

.info {
    margin: 0 10px;

    border-radius: 5px;
    padding: 5px 10px;
}

.info dd {
    line-height: 40px;
    font-size: 14px;
    margin-bottom: 10px;
    position: relative;
    padding-left: 70px;
}

.info dd .left {
    width: 70px;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 40px;
}

.info dd input {
    background: #fff;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    text-indent: 10px;
}
</style>

