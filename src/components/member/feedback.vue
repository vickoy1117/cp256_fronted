<template>
    <div class="feedback">
        <headCom></headCom>
        <div class="changePassword">
            <dl>
                <dd>
                    <span class="left">联系方式</span>
                    <span class="right">
                        <input type="text" placeholder="请输入手机号" v-model="phone">
                    </span>
                </dd>
            </dl>
            <div class="H10"></div>
            <div class="textArea">
                <textarea placeholder="内容" v-model="content">
    
                </textarea>
            </div>
            <div class="H30"></div>
            <div class="MB10" @click="feedbackBtn">
                <span class="btn">确认</span>
            </div>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'feedback',
    data() {
        return {
            phone: '',
            content: ''
        }
    },
    components: {
        headCom
    },
    methods: {
        feedbackBtn: function () {
            var _self = this;
            var errMsg = function (data) {
                layer.open({
                    content: data,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            };
            if (this.phone == '') {
                errMsg('请填写手机号');
            } else if (this.content == '') {
                errMsg('请填写内容');
            } else {
                var _self = this;
                console.info(this.phone + this.content)

                server.feedback(_self, {
                    contactPhone: this.phone,
                    adviceContent: this.content
                })
            }

        }
    },
    mounted: function () {
        var _self = this;
        //修改title
        this.$store.commit('changetitle', '意见反馈');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.textArea {
    background: #fff;
    padding: 10px;
}

.textArea textarea {
    width: 100%;
    height: 200px;
    border: none;
    line-height: 23px;
    font-size: 14px;
    color: #000;
}
</style>

