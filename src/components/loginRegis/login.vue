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
                        <input type="text" placeholder="请输入账号" v-model="username">
                    </span>
                </dd>
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </span>
                </dd>
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="text" placeholder="请输入图片验证码" v-model="vcode">
                        <img :src="vCodeUrl" onclick="javascript:this.src=this.src+&quot;?&quot;+Math.random();" class="pic_code">
                    </span>
                </dd>
            </dl>
            <p class="regis">
                <router-link to="/loginRegis/register">马上注册</router-link>
                <router-link to="/loginRegis/forgetPassword" class="fr">忘记密码</router-link>
            </p>
            <div class="H20"></div>
            <div class="loginBtn" @click="loginBtn">
                <a href="javascript:">登录</a>
            </div>
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
            bannerUrl: 'static/images/banner.jpg',
            username: '',
            password: '',
            vcode: '',
            error: '',
            vCodeUrl: ''
        }
    },
    methods: {
        back: function () {
            this.$store.state.isBack = true;
            this.$router.go(-1);
        },
        loginBtn: function () {
            var errMsg = function (data) {
                layer.open({
                    content: data,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            };
            if (this.username == '') {
                errMsg('用户名包含非法字符,请重新登陆');
            } else if (this.password == '') {
                errMsg('不允许空密码登录');
            } else if (this.vcode == '') {
                errMsg('验证码不能为空');
            } else {
                var _self = this;
                server.login(_self, {
                    username: _self.username,
                    password: _self.password,
                    vcode: _self.vcode
                });
            }
        },
        // 申请试用
        trialBtn () {
            this.$router.push({path: '/loginRegis/trial'})
        }
    },
    mounted() {
        this.vCodeUrl = server.vCodeUrl('Public/vcode')   // 验证码
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


