<template>
    <div class="home">
        <div style="height:40px;">fdfdd
            <div class="logoTop">
                <a href="/member/member" class="logoLogin" v-if="!this.$store.state.isLogined">登录</a>
                <a href="/member/member" class="logoLogin" v-if="this.$store.state.isLogined"><span class="icon-account"></span></a>
                <p><img src="/static/images/logo.png" alt=""></p>
                <a href="/loginRegis/register" class="logoRegis" v-if="!this.$store.state.isLogined"><span>注册</span></a>
            </div>
        </div>
        <div class="homePic">
            <slideBox></slideBox>

            <div class="scroll_list">
                <div class="con">
                    <span class="icon-notice"></span>
                    <div class="scrollDiv" id="scrollDiv">
                        <ul>
                            <li v-for="item in scrollDiv"><p><marquee direction="left" behavior="scroll" scrollamount="3"
                                                                      scrolldelay="0" loop="-1" >{{item.title}}</marquee></p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="H30"></div>
        <div class="tag_list">
            <ul class="out">
                <ul class="out">
                <li class="n" v-for="item in tag_list">
                    <router-link :to="item.href">
                        <div class="pic" :class="item.class"></div>
                        <p>{{item.title}}</p>
                    </router-link>
                </li>
                <li class="n" @click="sever">
                    <a href="javascript:">
                        <div class="pic icon-sevric"></div>
                        <p>在线客服</p>
                    </a>
                </li>
            </ul>
            </ul>
        </div>
        <div class="H10"></div>
        <div class="tic_list">
            <p class="tic_list_title"><span></span>热门彩种</p>
            <div class="border_line_top H01"></div>
            <ticList></ticList>
        </div>
        <div class="H10"></div>
        <div class="tic_list">
            <p class="tic_list_title">
              <span></span>最新中奖名单
              <!--<router-link to="/index/awardList">全部<em class="icon-arrow-right"></em></router-link>-->
            </p>
            <div class="border_line_top H01"></div>
        </div>
        <div class="scrollDivWin scrollDiv" id="scrollDivWin">
            <ul>
                <li v-for="item in scrollDivWin"><p><span class="icon-win"></span><span class="num">{{item.username|formatUserName}}</span>喜中<span class="money">{{item.bonus}}</span><span class="use">{{item.title}}</span></p></li>
            </ul>
        </div>
        <div class="H10"></div>
        <foot></foot>
    </div>
</template>

<script>
    import ticList from './ticList'
    import foot from './../public/foot'
    import slideBox from './slideBox'
    import server from './../../server'
    export default {
        name: 'home',
        data () {
            return {
                bannerUrl:'/static/images/banner.jpg',
                bannerLink:'',
                scrollDiv:[],
                scrollDivWin:[],
                tag_list:[{class:'icon-repect',title:'存/取款',href:'/member/member'},
                        {class:'icon-record',title:'投注记录',href:'/member/pushRecord'},
                        {class:'icon-present',title:'优惠活动',href:'/activity/activity'},

                ]
            }
        },
        components:{
            ticList,foot,slideBox
        },
        methods:{
            sever:function(){
                //var url=location.href;
                //if(typeof iBHLYZX != "undefined" && typeof iBHLYZX.openCustormerService != "undefined")
                //{
                //  iBHLYZX.openCustormerService(url);
                //}
                        var ua = navigator.userAgent,isInApp = false;
                            if(ua.match(/cp59/i) == 'cp59'){
                            isInApp = true;
                        }
                         if(!isInApp) {
                            window.open('https://messenger.providesupport.net/messenger/0pw4s1dzf7r3t18y0u1tamilnh.html');
                          }
                          else if(typeof iBHLYZX.extopen != 'undefined'){
                            iBHLYZX.extopen('https://messenger.providesupport.net/messenger/0pw4s1dzf7r3t18y0u1tamilnh.html');
                          }

            }
        },
        mounted:function(){
            var _self=this;
            //系统公告请求
            server.noticeList(_self);
            //最新中奖名单请求
            server.newWinner(_self);
            //新闻单条滚动效果
          setInterval(function () {
            $('.scrollDivWin ul li').eq(0).animate({marginTop:'-'+$('.scrollDivWin ul li').height()},2000,'linear',function () {
              var item=_self.scrollDivWin.shift()
              _self.scrollDivWin.push(item)
              $('.scrollDivWin ul li').css('marginTop','0px')
            })
          },1000)

        },
      filters: {
        formatUserName: function (value) {
          return value.substr(0, value.length - 4) + '****';
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .logoTop{
        position: fixed;
        left:0;
        top:0;
        height: 44px;
        background: #f64000;
        width: 100%;
        z-index: 50;
    }
    .logoTop p{
         text-align: center;
         height: 43px;
         margin-top: 5px;
    }
    .logoTop img{
         height: 30px;
    }
    .logoLogin{
      position: absolute;
      left:0;
      top:0;
      width: 50px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 15px;
      color: #fff;
    }
    .logoRegis{
      position: absolute;
      right:0;
      top:0;
      width: 50px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      color: #fff;
    }
    .homePic{
      position: relative;
    }
    .scroll_list{
      position: absolute;
      left:0;
      bottom:-50px;
      width: 100%;
      z-index: 10;
    }
    .scroll_list .con{
      background: #fff;
      height: 40px;
      border-radius: 25px;
      margin:0 10px;
      position: relative;
    }
    .scroll_list .con .icon-notice{
       position: absolute;
       left:0;
       top:0;
       width: 50px;
       height: 40px;
       color: #fb5555;
       font-size: 23px;
       text-align: center;
       line-height: 40px;
    }
    .scroll_list .scrollDiv{
      position: relative;
      height: 40px;
      overflow: hidden;

    }
    .scroll_list .scrollDiv ul {
      position: absolute;
      left:0;
      width: 100%;

    }
    .scroll_list .scrollDiv ul li{
      height:40px;
      line-height: 40px;
      font-size: 15px;
      color: #000;
      margin-right: 20px;
      margin-left: 50px;

    }
    .scroll_list .scrollDiv ul li p{

      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tag_list{
      margin: 30px 10px 0px 10px;
      background: #fff;

    }
    .tag_list li{
      width: 25%;
      text-align: center;
      padding-top: 10px;
    }
    .tag_list li .pic{
        font-size: 30px;

    }
    .tag_list li  p{
      font-size: 13px;
      line-height: 20px;
      padding-bottom: 10px;
      color: #747474;
    }
    .tag_list li .pic.icon-repect{
      color: #ff7223;
    }

    .tag_list li .pic.icon-record{
      color: #46c4ed;
    }

    .tag_list li .pic.icon-present{
      color: #fe4243;
    }

    .tag_list li .pic.icon-sevric{
      color: #4ed2bd;
    }
    .tic_list{
       margin:0 10px;
       background: #fff;

    }
    .tic_list_title{
      line-height: 40px;
      font-size: 16px;
      line-height: 40px;
      margin: 0 10px;
      position: relative;
      padding-left: 8px;
    }
    .tic_list_title span{
      position: absolute;
      left:0;
      top:10px;
      height: 20px;
      width: 3px;
      display: inline-block;
      background: #f64444;
    }
    .tic_list_title a{
      float: right;
      color: #666666;
      font-size: 13px;
    }
    .tic_list_title a em{
      color: #999999;
      margin-left:5px;
    }

    .scrollDivWin{
      margin:0 10px;
      background:#fff;
      padding-top: 5px;
      height: 105px;
      overflow: hidden;
      position: relative;
    }
    .scrollDivWin ul{

      position: absolute;
      left: 0;
      width: 100%;
    }
    .scrollDivWin li{
      line-height: 35px;
        width: 100%;

    }
    .scrollDivWin li span{
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .scrollDivWin li span.icon-win{
      color: #f8ae01;
      font-size: 15px;
      margin-right: 5px;
      margin-left: 10px;
    }
    .scrollDivWin li span.num{
      color: #666666;
      font-size: 16px;
      margin-right: 5px;
      width: 25%;
    }
    .scrollDivWin li span.money{
      color: #f64442;
      font-size: 16px;
      margin-right: 5px;
      width: 20%;
      padding-left:5%;
    }
    .scrollDivWin li span.use{
      color: #666;
      font-size: 16px;
      margin-right: 5px;

    }
</style>
