<template>
    <div class="buyHall">
        <headCom></headCom>
        <div class="tab">
            <div class="buyHallTab" >
                <ul class="out">
                    <li class="n W33"  :class="item.class" v-for="(item, index) in tab" @click="tab_box(index)"><span><a href="javascript:">{{item.title}}</a></span></li>
                </ul>
                <div class=" border_line_top H01px"></div>
            </div>
            <div class="H45"></div>
        </div>
        <div class="H10"></div>
        <div class="buyHallCon" v-for="item in buyHall">
            <router-link :to="{ path: '/buyHall/buyHallDetail', query: { id: item.id }}">
                <!--<div class="pic" :class="item.icon">
                   <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>
                </div>-->
				<div v-if="item.id != '38'" class="pic" :class="item.icon">
                   <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>
                </div>
				<img v-else class="pic" style="width: 55px; height: 55px" src="../../../static/images/liuhecai.png">
                <p class="buyHallTitle">{{item.title}}<span>第{{item.actionNo.actionno}}期</span></p>
                <p class="buyHallTime">距离下一期截止还有：{{item.actionNo.actiontime}}</p>
                <p class="icon-arrow-right"></p>
            </router-link>
        </div>
        <foot></foot>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import foot from './../public/foot'
    import server from './../../server'
    export default {
        name: 'buyHall',
        data () {
            return {
                buyHall:[],
                tab:[{title:'全部彩种',class:'current',id:0},{title:'高频彩',class:'',id:1},{title:'低频彩',class:'',id:2}]
            }
        },
        components:{
            headCom,foot
        },
        methods:{
            //筛选弹框的事件
            tab_box: function (index) {
                for(var i=0;i<this.tab.length;i++){
                    this.tab[i].class='';
                }
                this.tab[index].class='current';
                //修改选中的id
                var _self=this;
                server.colorHall(_self,{
                     frequency:this.tab[index].id,
                     current_page:1,
                     page_count:99
                });
            }
        },
        mounted:function(){
            var _self=this;
            server.colorHall(_self,{
                 frequency: 0,
                 current_page: 1,
                 page_count: 99
            });
            //修改title
            this.$store.commit('changetitle','购彩大厅');
            //修改头部返回箭头
            this.$store.commit('changeBack',false);
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
    .buyHallCon{
      margin:0 10px 5px 10px;
    }
    .buyHallCon a{
      position: relative;
      background: #fff;
      display: block;
    }
    .buyHallCon .pic{
      position: absolute;
      left:10px;
      top:15px;
      width: 50px;
      height: 50px;
      color: #f54444;
      font-size: 55px;
    }
    .buyHallTitle{
      margin-left: 70px;
      font-size: 16px;
      line-height: 30px;
      padding-top: 18px;
    }
    .buyHallTitle span{
      color: #f54444;
      font-size: 13px;
      margin-left: 5px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .buyHallTime{
      margin-left: 70px;
      font-size: 12px;
      color: #bdbdbd;
      line-height: 20px;
      padding-bottom: 20px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .buyHallCon .icon-arrow-right{
      position: absolute;
      right:10px;
      top:32px;
      width: 20px;
      height: 20px;
      color: #cccccc;
      border:solid 1px #cccccc;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-size: 13px;
    }
</style>

