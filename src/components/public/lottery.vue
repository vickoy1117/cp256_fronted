<template>
    <div class="lottery">
        <div class="lotteryHall" v-for="item in this.$store.state.hasCate">
            <p class="title"><span></span>{{item.typename}}</p>
            <div class="lotteryHallList" v-for="list in item.subInfo">
                <router-link :to="{ path: '/lotteryHall/lotteryHallDetail', query: { id: list.id }}">
                    <div class="border_line_top H01"></div>
                    <p class="listName">{{list.title}}<span class="ML10">{{list.prizeInfo.number}}</span><em>全天{{list.num}}期</em></p>
                    <ul class="out" v-if="item.typeid==9">
                        <li class="n point"
                            v-for="number in list.prizeInfo.data"
                        >
                          <span class="dian" :class="'icon-'+number"></span>
                        </li>
                    </ul>
                    <ul class="out" v-else>
                        <li class="n nopoint"
                            v-for="number in list.prizeInfo.data"
                        >
                            {{number}}
                        </li>
                    </ul>
                    <p class="icon-arrow-right"></p>
                </router-link>
            </div>
        </div>
        <div class="lotteryHall" >
            <div class="lotteryHallList" v-for="list in this.$store.state.noCate">
                <router-link :to="{ path: '/lotteryHall/lotteryHallDetail', query: { id: list.id }}">
                    <div class="border_line_top H01"></div>
                    <p class="listName">{{list.title}}<span class="ML10">{{list.prizeInfo.number}}</span><em>全天{{list.num}}期</em></p>
                    <ul class="out">
                        <li class="n nopoint" v-for="number in list.prizeInfo.data">{{number}}</li>
                    </ul>
                    <p class="icon-arrow-right"></p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
       name: 'lottery',
       data () {
            return {


                money:'0'
            }
        },
    }
</script>
<style scoped>
   .lotteryHall{
      background: #fff;
      margin-bottom: 5px;
    }
    .lotteryHall .title{
      line-height: 30px;
      padding:0 12px;
        position: relative;
    }
    .lotteryHall .title span{
      display: block;
        position: absolute;
        left:5px;
        top:5px;
        height: 20px;
        width: 3px;
        background: #f54444;
    }
    .lotteryHallList {
      position: relative;
    }
    .lotteryHallList a{
      display: block;
    }
    .lotteryHallList .icon-arrow-right{
      position: absolute;
      right:10px;
      top:40px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
        color: #b3b3b3;
        border:solid 1px #b3b3b3;;
    }
    .lotteryHallList .listName{
       margin:0 10px;
       line-height: 40px;
       font-size: 16px;
       color: #000;
    }
    .lotteryHallList .listName span{

       font-size: 13px;
       color: #b3b3b3;
    }
    .lotteryHallList .listName em{
       margin-right:20px;
       font-size: 13px;
       color: #b3b3b3;
       float: right;
    }
    .lotteryHallList ul{
      padding:0 20px 15px 10px;
    }
    .lotteryHallList ul li.nopoint{
      width: 32px;
      height: 32px;
      background: #f54444;;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 32px;
      margin-bottom : 2px;
      margin-right: 5px;
      border-radius: 50%;
    }
    .lotteryHallList ul li.point{
        width: 30px;
        height: 30px;
        display: inline-block;
        font-size:40px;
        border:solid 1px #d1d1d1;
        border-radius: 3px;
        margin-right: 5px;
        position: relative;
    }
    .lotteryHallList ul li.point .dian{
       position: absolute;
       font-size:90px;
    }
    .lotteryHallList ul li.point .dian.icon-1{
        left:-30px;
        top:-32px;
        color: #e74543;
    }
    .lotteryHallList ul li.point .dian.icon-2{
        left:-29px;
        top:-34px;
    }
    .lotteryHallList ul li.point .dian.icon-3{
        left:-30px;
        top:-29px;
    }
    .lotteryHallList ul li.point .dian.icon-4{
        left:-29px;
        top:-29px;
         color: #e74543;
    }
    .lotteryHallList ul li.point .dian.icon-5{
        left:-29px;
        top:-28px;

    }
    .lotteryHallList ul li.point .dian.icon-6{
        left:-29px;
        top:-30px;
    }

</style>


