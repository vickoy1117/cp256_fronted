<template>
    <div class="login">
        <div class="head">
            <div class="H50">
                <header>
                    <p class="back" @click="back">
                        <span class="icon-back"></span>
                    </p>
                </header>
            </div>
        </div>
        <div class="con">
            <div class="pic ">
                <span class="icon-login"></span>
            </div>
            <div class="H30"></div>
            <dl>
                <dd>
                    <span class="left icon-username"></span>
                    <span class="right">
                        <input type="text" disabled v-model="username">
                    </span>
                </dd>
            </dl>
            <div class="H20"></div>
            <div class="loginBtn" @click="trialBtn">
                <a href="javascript:">免费试玩</a>
            </div>
        </div>
    </div>
</template>

<script>

import server from './../../server'
export default {
    name: 'login',
    data() {
        return {
            username: ''
        }
    },
    methods: {
        back: function () {
            this.$store.state.isBack = true;
            this.$router.back();
        },
        // 试用
        trialBtn() {
            var _self = this;
            server.tryDo(_self,{
                username: _self.username
            })
        }
    },
    mounted: function () {
        var _self = this
        // 获取试玩账号
        server.getTryName(_self);
    }
}
</script>
<style scoped>
.pic_code {
    position: absolute;
    right: 0;
    top: 0;
    height: 45px;
    width: 120px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

.fr {
    float: right;
}

.login {
    width: 100%;
    height: 100%;
    background: url(/static/images/loginBg.png);
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0px;
}

.login .con {
    position: absolute;
    left: 0%;
    top: 0%;
    margin-top: 10%;
    width: 100%;
}

.login .pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    line-height: 70px;
    margin: 0 auto;
}

.login .pic .icon-login {
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

.login dl {
    margin: 0 25px;
}

.login dl dd {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    line-height: 45px;
    height: 45px;
    margin-bottom: 20px;
    position: relative;
}

.login dl dd .left {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 60px;
    text-align: center;
    color: #fff;
    line-height: 45px;
    font-size: 25px;
}

.login dl dd .right {
    margin-left: 60px;
    display: block;
}

.login dl dd .right input {
    width: 100%;
    height: 45px;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 15px;
}

*::-webkit-input-placeholder {
    color: #666;
}

*:-moz-placeholder {
    color: #666;
}

*:-ms-input-placeholder {
    color: #666;
}

.login .regis {
    line-height: 20px;
    font-size: 14px;
    margin: 0 25px;
    color: #fff;
    position: relative;
}

.login .regis.checkbox {
    padding-left: 25px;
}

.login .regis a {
    color: #fff;
}

.login .regis span {
    font-size: 20px;
    color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    height: 20px;
}

.login .regis span.icon-checkboxed {
    font-size: 16px;
    line-height: 21px;
}

.loginBtn {
    margin: 0 25px;
}

.loginBtn a {
    display: block;
    line-height: 45px;
    border-radius: 25px;
    border: solid 1px#fff;
    text-align: center;
    color: #fff;
    font-size: 16px;
}

header {
    background-color: transparent !important;
}

.back {
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
}

.icon-back {
    font-size: 18px;
    color: #fff;
}
</style>


