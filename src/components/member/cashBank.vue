<template>
    <div class="cashBank">
        <headCom></headCom>
        <div class="H10"></div>
        <div class="pushList" v-for="item in accountList">
            <router-link :to="{ path: '/member/cashBankDetail', query: { id: item.id }}">
                <span class="icon-arrow-right"></span>
                <p><span class="type red">{{item.name}} </span><span class="fr FZ14">{{item.username}}</span></p>
                <p><span class="gry FZ13 LH20">{{item.bankaddress}}</span></p>
                <div class="H05"></div>
                <p class="FZ15">{{item.account}}</p>
                <div class="H05"></div>
            </router-link> 
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'
    export default {
        name: 'cashBank',
        data () {
            return {
                accountList:[]
            }
        },
        components:{
            headCom
        },
        methods:{
          
          
        },
        mounted:function(){
            var _self=this;
            server.publicAccount(_self,{
                current_page:1,
                page_count:10
            })
            //修改title
            this.$store.commit('changetitle','选择银行账号');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .pushList {
        padding-top: 5px;
        position: relative;
        background: #fff;
        margin: 0 10px 5px 10px;
        border-radius: 5px;
    }
    .pushList a{
        display: block;
    }
    .icon-arrow-right{
        position: absolute;
        right: 10px;
        top: 34px;
        width: 16px;
        height: 16px;
        color: #cccccc;
        border: solid 1px #cccccc;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        font-size: 10px;
    }
    .pushList p{
       margin:0 40px 0 10px;
       line-height: 22px;
    }
    .pushList .type.red{
       color: #f54444;
    }
    .pushList .type{
        font-size: 15px;
        color: #000;
    }
    .pushList p .fr{
        color: #666;
    }
</style>

