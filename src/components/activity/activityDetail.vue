<template>
    <div class="activityDetail">
        <headCom></headCom>
        <div class="activityList">
            <a href='javascript:'>
                <p class="title">{{activeDetail.title}}</p>
                <p class="title2">活动时间：{{activeDetail.atime}}</p>
                <div class="pic "><img :src="activeDetail.imgurl"></div>
                <p class="intro">{{activeDetail.abstract}}</p>
                
            </a>
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'
    export default {
        name: 'activityDetail',
        data () {
            return {
                activeDetail:{},
                id:''
            }
        },
        components:{
            headCom
        },
        mounted:function(){
            var _self=this;
            this.id=location.href.split('?')[1].split('=')[1] ;
            //优惠活动请求
            server.activeDetail(_self,{
                id:this.id
            });
            //修改title
            this.$store.commit('changetitle','优惠活动');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .activityList{
        margin:0 10px 10px 10px;
    }
    .activityList .title{
         line-height: 35px;
         font-size: 18px;
    }
    .title2{
        color: #999;
    }
    .pic{
        margin:10px 0;
    }
    .activityList .intro{
        font-size: 14px;
        color: #666;
        line-height: 25px;
    }
</style>
