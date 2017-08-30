<template>
    <div class="activity">
        <headCom></headCom>
        <div class="H10"></div>
        <div class="activityList" v-for="item in activity">
            <router-link :to="{ path: '/activity/activityDetail', query: { id: item.id }}">
                <p class="title">{{item.title}}<span>活动时间：{{item.atime}}</span></p>
                <div class="pic MB10"><img :src="item.imgurl"></div>
                <p class="intro">{{item.abstract}}</p>
                <div class=" border_line_top H01px MB10"></div>
                <p class="detail">查看详情</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'
    export default {
        name: 'activity',
        data () {
            return {
                bannerUrl:'/static/images/banner.jpg',
                activity:[]
            }
        },
        components:{
            headCom
        },
        mounted: function () {
            var _self = this;
            //优惠活动请求
            server.activeList(_self, {});
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
        background:#fff;
        margin:0 10px 10px 10px;
        border:solid 1px #cccccc;
        border-radius: 10px;
    }
    .activityList .title{
         line-height: 45px;
         font-size: 18px;
         margin:0 10px;
    }
    .activityList .title span{
        font-size: 13px;
        margin-left: 10px;
        color: #666;
    }
    .activityList .intro{
        font-size: 14px;
        color: #666;
        line-height: 40px;
        margin: 0 10px;
    }
    .activityList .detail{
        margin:0 10px;
        line-height: 40px;
        font-size: 15px;
        color: #666;
        display: block;
    }
</style>
