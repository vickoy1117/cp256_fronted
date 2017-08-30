<template>
    <div class="register login">
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
                        <input type="text" placeholder="账号为6～12位字母或数字" v-model="username">
                    </span>
                </dd>
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="password" placeholder="密码为6～12位字母或数字" v-model="password">
                    </span>
                </dd>
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="password" placeholder="确认密码6～12位字母或数字" v-model="verify">
                    </span>
                </dd>
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="text" placeholder="请输入图片验证码" v-model="auth_code">
                        <img :src="vCodeUrl" onclick="javascript:this.src=this.src+&quot;?&quot;+Math.random();" class="pic_code">
                    </span>
                </dd>
                <!--<dd>
                    <span class="left icon-username"></span>
                    <span class="right">
                        <input type="text" placeholder="真实姓名(要求与银行卡开户人相同)" v-model="realname">
                    </span>
                </dd>-->
                <!--<dd>-->
                    <!--<span class="left icon-password2"></span>-->
                    <!--<span class="right">-->
                        <!--<input type="password" placeholder="取款密码6～12位字母或数字" v-model="capital_pwd">-->
                    <!--</span>-->
                <!--</dd>-->
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="text" placeholder="推荐码（必填）" v-model="recomCode">
                    </span>
                </dd>
                <!--<dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <form class="layui-form" action="">
                            <div class="layui-form-item">
                                <select v-model="sQuestion">
                                    <option value="" hidden>请选择密保问题</option>
                                    <option class="option" v-for="question in questionList">{{question.question}}</option>
                                </select>
                            </div>
                        </form>
                    </span>
                </dd>
                <dd>
                    <span class="left icon-password2"></span>
                    <span class="right">
                        <input type="password" placeholder="密保答案" v-model="sAnswer">
                    </span>
                </dd>-->
            </dl>
            <p class="regis checkbox">
                <span v-bind:class="{ 'icon-checkbox': icon_checkbox, 'icon-checkboxed': icon_checkboxed }" @click="checkbox"></span>
                <a @click="regProBtn">同意《注册协议》</a>
            </p>
            <div class="H20"></div>
            <div class="loginBtn " @click="registerBtn">
                <a href="javascript:">注册</a>
            </div>
        </div>
    </div>
</template>

<script>
import server from './../../server'
export default {
    name: 'register',
    data() {
        return {
            bannerUrl: 'static/images/banner.jpg',
            username: '',
            password: '',
            verify: '',
            auth_code: '',
            state: 1,
            realname: '',
            error: '',
            icon_checkbox: true,
            icon_checkboxed: false,
            capital_pwd: '',
            recomCode: '',                  // 推荐码
            sAnswer: '',
            questionList: [],
            sQuestion: '',
            vCodeUrl: '',
            uid: 0,     // 推荐人id
            lid: 0      // 推广链接id
        }
    },
    methods: {
        back: function () {
            this.$router.go(-1);
        },
        checkbox: function () {
            this.icon_checkbox = !this.icon_checkbox;
            this.icon_checkboxed = !this.icon_checkboxed;
            if (this.icon_checkbox) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        },
        registerBtn: function () {
            //前台验证注册页面
            var reg = /^[\w]{6,12}$/;
            var errMsg = function (data) {
                layer.open({
                    content: data,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            };
            var _self = this;
            if (this.username == '') {
                errMsg('用户名不能为空');
            } else if (!this.username.match(reg)) {
                errMsg('用户名为6～12位字母或数字');
            } else if (this.password == '') {
                errMsg('请填写密码');
            } else if (!this.password.match(reg)) {
                errMsg('密码为6～12位字母或数字');
            } else if (this.verify == '') {
                errMsg('请填写确认密码');
            } else if (!this.verify.match(reg)) {
                errMsg('确认密码为6～12位字母或数字');
            } else if (!(this.password == this.verify)) {
                errMsg('用户密码和确认密码不一致');
            } else if (this.auth_code == '') {
                errMsg('图形验证码不能为空');
            } else if (this.state == 1) {
                errMsg('你必须先同意协议才能注册');
            } else {
                server.register(_self, {
                    username: _self.username,
                    password: _self.password,
                    verify: _self.verify,
                    auth_code: _self.auth_code,
                    state: _self.state,
                    // realName: _self.realname,
                    capital_pwd: _self.capital_pwd,
                    // sQuestion: _self.sQuestion,
                    // sAnswer: _self.sAnswer,
                    recomCode: _self.recomCode
                    // lid: _self.lid,
                    // uid: _self.uid
                });
            }
        },
        // getQuestions: function () {  //获取问题
        //     var _self = this;
        //     server.questionList(_self, {});
        // },
        regProBtn: function () {   //注册协议
            var _self = this;
            server.regPro(self, {});
        },
        // 获取推荐码
        referralCode () {
            var params = this.getParamsFromURL(window.location);
            this.lid = params.lid;
            this.uid = params.uid;
        },
        // 截取地址栏参数方法
        getParamsFromURL(URL) {
            var paramObject = {};
            var paramStr = URL.search.substring(1);
            var params = paramStr.split('&');
            for(var i = 0; i < params.length; i++) {
                var pair = params[i].split('=');
                paramObject[pair[0]] = pair[1];
                paramObject[pair[0]] = decodeURI(paramObject[pair[0]]);
            }
            return paramObject;
        }
    },
    mounted() {
        // this.getQuestions();
        // 验证码
        this.vCodeUrl = server.vCodeUrl('Public/vcode')
        // 地址栏结尾的推荐码
        this.referralCode();
    }
}
</script>
<style scoped>
*::-webkit-input-placeholder {
    color: #666;
}

*:-moz-placeholder {
    color: #666;
}

*:-ms-input-placeholder {
    color: #666;
}

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
    background: url(/static//images/loginBg.png);
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
    overflow: scroll;
}

.login .con {
    position: absolute;
    left: 0%;
    top: 0%;
    margin-top: 5%;
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

select {
    width: 90%;
    height: 45px;
    font-size: 15px;
    background: none;
    border: none;
}

.option {
    background: rgba(255, 255, 255, 0.5);
}
</style>


