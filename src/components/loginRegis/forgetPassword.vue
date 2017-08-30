<template>
    <div class="forgetPassword">
        <headCom></headCom>
        <div class="changePassword">
            <dl>
                <dd>
                    <span class="left">原密码</span>
                    <span class="right">
                        <input type="password" placeholder="原密码6～12位字母或数字" v-model="origin_pwd">
                    </span>
                </dd>
                <div class=" border_line"></div>
                <dd>
                    <span class="left">新密码</span>
                    <span class="right">
                        <input type="password" placeholder="新密码6～12位字母或数字" v-model="new_pwd">
                    </span>
                </dd>
                <div class=" border_line"></div>
                <dd>
                    <span class="left">重复新密码</span>
                    <span class="right">
                        <input type="password" placeholder="重复新密码6～12位字母或数字" v-model="verify">
                    </span>
                </dd>
            </dl>
            <div class="H30"></div>
            <div class="MB10" @click="btn">
                <span class="btn">确认</span>
            </div>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'forgetPassword',
    data() {
        return {
            origin_pwd: '',
            new_pwd: '',
            verify: ''
        }
    },
    components: {
        headCom
    },
    methods: {
        btn: function () {
            //前台验证注册页面
            var reg = /^[\w]{6,12}$/;
            var errMsg = function (data) {
                layer.open({
                    content: data,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            };
            if (this.origin_pwd == '') {
                errMsg('原密码不能为空');
            } else if (!this.origin_pwd.match(reg)) {
                errMsg('原密码为6～12位字母或数字');
            } else if (this.new_pwd == '') {
                errMsg('新密码不能为空');
            } else if (!this.new_pwd.match(reg)) {
                errMsg('新密码为6～12位字母或数字');
            } else if (this.verify == '') {
                errMsg('确认新密码不能为空');
            } else if (!this.verify.match(reg)) {
                errMsg('确认新密码为6～12位字母或数字');
            } else {
                var _self = this;

                server.loginPwd(_self, {
                    origin_pwd: _self.origin_pwd,
                    new_pwd: _self.new_pwd,
                    verify: _self.verify
                });
            }
        }
    },
    mounted: function () {
        //修改title
        this.$store.commit('changetitle', '修改用户密码');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
    }
}
</script>
<style scoped>
/*修改密码*/

.changePassword dl {
    background: #fff;
}

.changePassword dl dd {
    position: relative;
    line-height: 60px;
}

.changePassword dl dd .left {
    position: absolute;
    left: 10px;
    top: 0;
    width: 100px;
    color: #000;
    font-size: 14px;
    display: block;
}

.changePassword dl dd .right {
    display: block;
    padding-left: 100px;
}

.changePassword dl dd .right input {
    width: 100%;
    height: 60px;
    border: none;
    font-size: 14px;
}

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
</style>

