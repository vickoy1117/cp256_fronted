<template>
    <div class="member">
        <headCom></headCom>
        <div class="member">
            <div class="unlogin hide">
                <a href="">立即登陆</a>
            </div>
            <div class="hasLogin">
                <div class="pic ">
                    <span class="icon-login"></span>
                    <img src="/static/images/banner.jpg" class="hide">
                </div>
                <p class="username">{{nickname}}</p>
                <p class="money">余额
                    <em>{{money}}</em>元</p>
                <p class="outLogin" @click="getBack">退出登录</p>
            </div>
        </div>
        <div class="H10"></div>
        <div class="memberList">
            <ul class="out">
                <li class="n">
                    <router-link to="/member/recharge">
                        <div class="pic icon-recharge"></div>
                        <p>充值</p>
                    </router-link>
                    <div class="border_line"></div>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/cash">
                        <div class="pic icon-cash"></div>
                        <p>提现</p>
                    </router-link>
                    <div class="border_line"></div>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/accountDetail">
                        <div class="pic icon-account-detail"></div>
                        <p>帐户明细</p>
                    </router-link>
                    <div class="border_line"></div>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/rechargeRecord">
                        <div class="pic icon-recharge-record"></div>
                        <p>充值记录</p>
                    </router-link>
                    <div class="border_line"></div>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/cashRecord">
                        <div class="pic icon-no-record"></div>
                        <p>提款记录</p>
                    </router-link>
                    <div class="border_line"></div>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/winningRecord">
                        <div class="pic icon-lottery2"></div>
                        <p>中奖记录</p>
                    </router-link>
                    <div class="border_line"></div>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/pushRecord">
                        <div class="pic icon-pay-record"></div>
                        <p>投注记录</p>
                    </router-link>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/information">
                        <div class="pic icon-message"></div>
                        <p>个人消息</p>
                    </router-link>
                    <div class="border_lineLeft"></div>
                </li>
                <li class="n">
                    <router-link to="/member/more">
                        <div class="pic icon-more"></div>
                        <p>更多</p>
                    </router-link>
                    <div class="border_lineLeft"></div>
                </li>
            </ul>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import foot from './../public/foot'
import server from './../../server'
export default {
    name: 'member',
    data() {
        return {

            nickname: '',
            money: '0.00'
        }
    },
    components: {
        headCom, foot
    },
    methods: {
        getBack: function () {
            var _self = this;
            server.logout(_self, {});
        }
    },
    mounted: function () {
        var _self = this;

        server.userInfo(_self, {});
        //修改title
        this.$store.commit('changetitle', '个人中心');
        //修改头部返回箭头
        this.$store.commit('changeBack', false);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.member {
    width: 100%;
    height: 150px;
    background: url(/static/images/bg.jpg) no-repeat center center;
    background-size: cover;
    position: relative;
}

.member .unlogin {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    margin-top: -20px;
}

.member .unlogin a {
    display: block;
    color: #fff;
    border: solid 1px #fff;
    border-radius: 5px;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 auto;
    font-size: 18px;
}

.hasLogin {
    position: relative;
    height: 150px;
}

.hasLogin .pic {
    position: absolute;
    left: 10px;
    top: 50%;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    margin-top: -35px;
    text-align: center;
    line-height: 70px;
}

.hasLogin .icon-login {
    color: #e8e8e8;
    font-size: 60px;
    margin: 3px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    background: #fff;
    display: inline-block;
    line-height: 80px;
    overflow: hidden;
}

.hasLogin .pic img {
    margin: 3px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
}

.hasLogin .username {
    margin-left: 90px;
    color: #fff;
    padding-top: 52px;
    font-size: 18px;
}

.hasLogin .money {
    margin-left: 90px;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
}

.hasLogin .money em {
    margin: 0 5px;
}

.hasLogin .outLogin {
    position: absolute;
    right: 15px;
    top: 15px;
    background: rgba(255, 255, 255, 0.5);
    color: #fff;
    font-size: 16px;
    border-radius: 25px;
    padding: 5px 10px;
}

.memberList ul {
    background: #fff;
    width: 100%;
}

.memberList li {
    width: 33.3%;
    position: relative;
    text-align: center;
}

.memberList li a {
    display: block;
    padding: 10px 0;
}

.memberList li .pic {
    height: 60px;
    line-height: 60px;
    font-size: 32px;
}

.memberList li .pic.icon-recharge {
    color: #ff7225;
}

.memberList li .pic.icon-cash {
    color: #46c4ee;
}

.memberList li .pic.icon-account-detail {
    color: #ff4141;
    font-size: 28px;
}

.memberList li .pic.icon-recharge-record {
    color: #46c4ee;
    font-size: 30px;
}

.memberList li .pic.icon-no-record {
    color: #52d3bf;
    font-size: 32px;
}

.memberList li .pic.icon-lottery2 {
    color: #ff5858;
    font-size: 36px;
}

.memberList li .pic.icon-pay-record {
    color: #ff4a4a;
    font-size: 38px;
}

.memberList li .pic.icon-message {
    color: #ff782f;
    font-size: 30px;
}

.memberList li .pic.icon-more {
    color: #ff782f;
    font-size: 30px;
}

.memberList li p {
    font-size: 14px;
    line-height: 22px;
    color: #000;
}
</style>

