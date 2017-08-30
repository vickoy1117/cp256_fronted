<template>
    <div class="pushRecord">
        <headCom></headCom>  
        <div class="pushList" v-for="item in orderList">
            <router-link :to="{ path: '/member/pushRecordDetail', query: { id: item.id }}">
                <span class="icon-arrow-right"></span>
                <p><span class="type">{{item.name}} </span><span class="fr gry">{{dec}}</span></p>
                <p><span class="gry FZ12">{{item.actiontime}}</span> <span class="red fr">{{item.bonus}}</span></p>
                <div class="H05"></div>
                <div class=" border_line"></div> 
            </router-link> 
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'

    export default {
        name: 'pushRecord',
        data () {
            return {
                orderList:[],
                tab:[
                        {title:'我的中奖',class:'',orderType:2},
                    ],
                dec:''
            }
        },
        components:{
            headCom
        },
        methods:{

        },
        mounted:function(){
            var _self=this;

            server.getOrderHistory(_self,{
                orderType:2,
                current_page:1,
                page_count:10
            });         
            //修改title
            this.$store.commit('changetitle','中奖记录');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .buyHallTab{
      position: fixed;
      left:0;top:50px;
      width: 100%;
      height: 45px;
      background: #fff;
      z-index: 10;
    }
    .buyHallTab li{
      font-size: 15px;
      line-height: 43px;
      text-align: center;
    }
    .buyHallTab li a{
      display: inline-block;
      color: #000;
      height: 43px;
      border-bottom:solid 2px #fff
    }
    .buyHallTab li.current a{
      color: #f54444;
      border-bottom:solid 2px #f54444 
    }
    .pushList {
        padding-top: 5px;
        position: relative;
    }
    .pushList a{
        display: block;
    }
    .icon-arrow-right{
        position: absolute;
        right: 10px;
        top: 18px;
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
    .pushList .type{
        font-size: 15px;
        color: #000;

    }
</style>

