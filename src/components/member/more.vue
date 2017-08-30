<template>
    <div class="more">
        <headCom></headCom>
        <!-- <div class="moreList">
            <a href="">
                <span class="icon-shake2 icon"></span>
                <p>开启摇一摇震动<span class="fr"></span> </p>
                <div class=" border_line"></div> 
            </a>      
        </div>
        <div class="moreList">
            <a href="">
                <span class="icon-shake2 icon"></span>
                <p>开启触摸音效<span class="fr"></span> </p>
                <div class=" border_line"></div> 
            </a>      
        </div> -->
        <div class="moreList">
            <router-link to="/loginRegis/forgetPassword">
                <span class="icon-change-password icon"></span>
                <p>修改登录密码</p>
                <span class="fr icon-arrow-right"></span>
                <div class=" border_line"></div>
            </router-link>
        </div>
        <div class="moreList">
            <router-link to="/loginRegis/editCoinPassword">
                <span class="icon-change-password icon"></span>
                <p>修改取款密码</p>
                <span class="fr icon-arrow-right"></span>
                <div class=" border_line"></div>
            </router-link>
        </div>
		<!--
        <div class="moreList">
            <router-link to="/member/bundingBank">
                <span class="icon-change-password icon"></span>
                <p>修改银行卡</p>
                <span class="fr icon-arrow-right"></span>
                <div class=" border_line"></div>
            </router-link>
        </div>-->
        <div class="moreList">
            <router-link to="/member/feedback">
                <span class="icon-feedback icon"></span>
                <p>意见反馈</p>
                <span class="fr icon-arrow-right"></span>
                <div class=" border_line"></div>
            </router-link>
        </div>
        <div class="moreList">
            <router-link to="/member/aboutUs">
                <span class="icon-about-us icon"></span>
                <p>关于我们</p>
                <span class="fr icon-arrow-right"></span>
                <div class=" border_line"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'more',
    data() {
        return {

        }
    },
    components: {
        headCom
    },
    mounted: function () {
        var _self = this;
        //server.userInfo(_self);
        //修改title
        this.$store.commit('changetitle', '更多');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*更多*/

.moreList {
    line-height: 60px;
    background: #fff;
    position: relative;
}

.moreList a {
    display: block;
}

.moreList .icon {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    text-align: center;
    width: 60px;
    line-height: 60px;
}

.moreList p {
    padding-left: 60px;
    font-size: 15px;
}

.moreList .icon-shake2 {
    color: #ff7124;
    font-size: 29px;
}

.moreList .icon-change-password {
    font-size: 26px;
    color: #4fd2be;
}

.moreList .icon-feedback {
    font-size: 26px;
    color: #7984eb;
}

.moreList .icon-about-us {
    font-size: 31px;
    color: #f54444;
}

.moreList .icon-arrow-right {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 20px;
    height: 20px;
    color: #cccccc;
    border: solid 1px #cccccc;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
}
</style>

