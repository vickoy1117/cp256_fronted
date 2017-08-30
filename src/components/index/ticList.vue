<template>
    <div class="ticList">
        <ul class="out">
            <li class="n" v-for="item in ticList">
                <router-link :to="{ path: '/buyHall/buyHallDetail', query: { id: item.id }}">
                    <span class="pic" :class="item.icon">
                       <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>

                    </span>
                    <p class="tic_name">{{item.title}}</p>
                    <p class="tic_time">{{item.info}}</p>
                </router-link >
                <div class="border_line_top H01"></div>
            </li>
            <li class="n ticMore">
                <router-link to="/buyHall/buyHall">
                    <span class=" ticM">···</span>
                    <p class="tic_name">更多</p>
                    <p class="tic_time">查看详情</p>
                </router-link >
                <div class="border_line_top H01"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import server from './../../server'
    export default {
        name: 'ticList',
        data () {
            return {
                ticList:[]
            }
        },
        mounted:function(){
            var _self=this;
            server.ticList(_self)

           
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .icon-tic-shandong{
      color: #bca7f2;
    }
    .icon-tic-guangdong{
      color: #3e9f6a;
    }
    .icon-tic-jiangxi{
      color: #f64444;
    }
    .icon-tic-chongq{

    }
    .ticMore{
       height: 81px;
    }
    .ticMore a{
      height: 50px;
    }
    .ticMore a .ticM{
      width: 50px;
      height: 50px;
      background: #f7ad00;
      color: #fff;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      margin:0 auto;
      font-size: 50px;
      position: absolute;
      left:10px;
      top: 15px;
      display: block;
    }
    .ticList ul li{
      width: 50%;

    }
    .ticList ul li a{
      display: block;
      position: relative;
      padding: 15px 0 15px 0;

    }
    .ticList ul li .pic{
      position: absolute;
      left:10px;
      top: 15px;
      font-size: 50px;
      display: block;
    }
    .ticList ul li .pic span{
      color: red;
    }
    .tic_name{
      margin-left: 70px;
      font-size: 16px;
      line-height: 30px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tic_time{
      margin-left: 70px;
      font-size: 13px;
      line-height: 20px;
      color: #666;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
</style>
