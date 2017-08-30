<template>
  <div class="lotteryHallDetail">
    <headCom></headCom>
    <div class="lotteryHallList" v-for="item in list" v-if="typeId!=9">
      <div class="border_line_top H01"></div>
      <p class="listName"><span>第{{item.number}}期</span><em>开奖时间:{{item.time}}</em></p>
      <ul class="out">
        <li class="n nopoint" v-for="number in item.data">{{number}}</li>
      </ul>
    </div>

    <div class="lotteryHallList" v-if="typeId==9">
      <ul class="kuaisan">
        <li>
          <span class="span1">期数</span>
          <span class="span2" style="color: black">开奖号</span>
          <span class="span3">和值</span>
          <span class="span4" style="color: black">形态</span>
        </li>
        <li v-for="item in list">
          <span class="span1">{{item.number}}</span>
          <span class="span2"><span v-for="(number,index) in item.data">{{number}} {{index==2?" ":","}}</span></span>
          <span class="span3">{{parseInt(item.data[0])+parseInt(item.data[1])+parseInt(item.data[2])}}</span>
          <span class="span4">
            <span v-if="parseInt(item.data[0])+parseInt(item.data[1])+parseInt(item.data[2])>9" style="background: #686ef8">大</span>
            <span v-if="parseInt(item.data[0])+parseInt(item.data[1])+parseInt(item.data[2])<=9" style="background: #c7ba03">小</span>
            <span v-if="((parseInt(item.data[0])+parseInt(item.data[1])+parseInt(item.data[2]))%2)!=0" style="background: #d44f7e">单</span>
            <span v-if="((parseInt(item.data[0])+parseInt(item.data[1])+parseInt(item.data[2]))%2)==0" style="background: #86c85d">双</span>
          </span>
        </li>
      </ul>
      <!--<p class="listName"><span>第{{item.number}}期</span><em>开奖时间:{{item.time}}</em></p>-->
      <!--<ul class="out">-->
        <!--<li class="n point" v-for="number in item.data">-->
          <!--<span class="dian" :class="'icon-'+number"></span>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
  import headCom from './../public/headCom'
  import server from './../../server'
  export default {
    name: 'lotteryHallDetail',
    data () {
      return {
        type: '',
        typeName: '',
        list: [],
        typeId: '',
      }
    },
    components: {
      headCom
    },
//    computed:{
//      sum:function () {
//        console.log(this.list)
//        return 5
//      }
//    },
    watch: {
      typeName: function (val) {
        //修改title
        this.$store.commit('changetitle', this.typeName);
      }
    },
    mounted: function () {
      var _self = this;
      this.type = location.href.split('?')[1].split('=')[1];
      server.getHistoryNums(_self, {
        type: this.type,
        current_page: 1,
        page_count: 20
      });

      //修改头部返回箭头
      this.$store.commit('changeBack', true);

    }
  }
</script>
<style scoped>
  .lotteryHallList {
    position: relative;
  }

  .lotteryHallList .listName {
    margin: 0 10px;
    line-height: 40px;
    font-size: 16px;
    color: #000;
  }

  .lotteryHallList .listName span {

    font-size: 13px;
    color: #b3b3b3;
  }

  .lotteryHallList .listName em {
    margin-right: 20px;
    font-size: 13px;
    color: #b3b3b3;
    float: right;
  }

  .lotteryHallList ul {
    padding: 0 10px 15px 10px;
  }

  .lotteryHallList ul li.nopoint {
    width: 32px;
    height: 32px;
    background: #f54444;;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 32px;
    margin-right: 5px;
    border-radius: 50%;
  }

  .lotteryHallList ul li.point {
    width: 30px;
    height: 30px;
    display: inline-block;
    font-size: 40px;
    border: solid 1px #d1d1d1;
    border-radius: 3px;
    margin-right: 5px;
    position: relative;
  }

  .lotteryHallList ul li.point .dian {
    position: absolute;
    font-size: 90px;
  }

  .lotteryHallList ul li.point .dian.icon-1 {
    left: -30px;
    top: -32px;
    color: #e74543;
  }

  .lotteryHallList ul li.point .dian.icon-2 {
    left: -29px;
    top: -34px;
  }

  .lotteryHallList ul li.point .dian.icon-3 {
    left: -30px;
    top: -29px;
  }

  .lotteryHallList ul li.point .dian.icon-4 {
    left: -29px;
    top: -29px;
    color: #e74543;
  }

  .lotteryHallList ul li.point .dian.icon-5 {
    left: -29px;
    top: -28px;

  }

  .lotteryHallList ul li.point .dian.icon-6 {
    left: -29px;
    top: -30px;
  }
  .lotteryHallList .kuaisan{
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .lotteryHallList .kuaisan li{
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: #dfdfdf 1px solid;
    align-items: center;
    margin: 0;
    justify-content: space-between;
  }
  .lotteryHallList .kuaisan li span{
    display: block;
    font-size: 14px;
  }
  .lotteryHallList .kuaisan li .span1{
    width: 120px;
    text-align: center;
  }
  .lotteryHallList .kuaisan li .span2{
    width: 60px;
    text-align: center;
    color: #d44f7e;
  }
  .lotteryHallList .kuaisan li .span2 span{
    display: inline-block;
  }
  .lotteryHallList .kuaisan li .span3{
    width: 40px;
    text-align: center;
  }
  .lotteryHallList .kuaisan li .span4{
    width: 52px;
    text-align: center;
    color: white;
  }
  .lotteryHallList .kuaisan li .span4 span{
    display: inline-block;
    border-radius: 4px;
    width: 20px;
    height: 18px;
    color: white;
  }
</style>


