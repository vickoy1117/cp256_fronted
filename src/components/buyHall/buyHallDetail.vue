<template>
    <div class="buyHallDetail">
        <component :is="currentView"></component>
    </div>
</template>

<script>
    import server from './../../server'
    import buyHallSetting from './buyHallSetting'
    import buykuai3 from './buykuai3'
    import buykuai4 from './buykuai4'
    import buykuai5 from './buykuai5'
    import buykuai6 from './buykuai6'
    import buykuai7 from './buykuai7'
    export default {
        name: 'buyHallDetail',
        data () {
            return {
               currentView:'',
               type:''
            }
        },
        components:{
            buykuai3,buykuai4,buykuai5,buykuai6,buykuai7
        },
        mounted:function(){
            this.type=location.href.split('?')[1].split('=')[1] ;
            if(this.type==25 || this.type==35 || this.type==36 || this.type==37 || this.type==41 || this.type==42 || this.type==43 || this.type==44 || this.type==45){
               this.currentView='buykuai3';
            }else if(this.type==1 || this.type==12 || this.type==3){
               this.currentView='buykuai4';
            }else if(this.type==6 || this.type==7 || this.type==15 || this.type==16 || this.type==34){
               this.currentView='buykuai5';
            }else if(this.type==20 || this.type==9 || this.type==10){
               this.currentView='buykuai6';
            }else if(this.type==38){
              // 六合彩
               this.currentView='buykuai7';
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .back{
        position: absolute;
        left:0;
        top:0;
        width: 35px;
    }
    .icon-back{
        font-size: 18px;
        color: #666;
    }
   /*购买大厅详情*/
    .buyHallDetail .title{
      position: relative;
      padding: 0 10px 0 20px;
      background: #fff;
      line-height: 35px;
      font-size: 14px;
      color: #666;
    }
    .buyHallDetail .title span{
      position: absolute;
      left:10px;
      top:7px;
      width: 3px;
      height: 20px;
      background: #f54444;
    }
    .buyHallDetail .choseTitle{
      line-height: 40px;
      margin:  0 10px;
      color: #666;
      font-size: 15px;
    }
    .buyHallDetail .choseList {
      position: relative;

    }
    .buyHallDetail .choseList .pos{
      position: absolute;
      left:10px;
      top:10px;
      color: #666;
      background: #e3e2e2;
      border-radius: 20px;
      padding: 5px 8px;
    }
    .buyHallDetail .choseList ul{
      margin: 10px 10px 0 70px;
    }
    .buyHallDetail .choseList ul li{
      width: 40px;
        height: 40px;
        background: #fff;
        border:solid 1px #dfdfdf;
        color: #f54444;
        font-size: 13px;
        text-align: center;
        line-height: 40px;
        margin:0 10px 10px 0;
        border-radius: 50%;
    }
    .buyHallDetail .choseList ul li.current{
      color: #fff;
      background: #f54444;
      border:solid 1px #f54444;
    }
    .buyHallBtn{
      position: fixed;
      left:0;
      bottom:0;
      height: 50px;
      width: 100%;
    }
    .buyHallBtn .con{
      height: 49px;
      background: #fff;
      padding: 0 10px 0 60px;
      line-height: 49px;
      font-size: 15px;
      color: #000;
      position: relative;
    }
    .buyHallBtn .icon-delete{
        position: absolute;
        left:0;
        top:0;
        width: 50px;
        height: 50px;
        display: block;
        text-align: center;
        line-height: 50px;
        color: #999;
        font-size: 25px;
    }
    .buyHallBtn .border_lineLeft{
      left:50px;
      top:10px;
      height: 30px;
    }
    .buyHallBtn  .fr{
      background: #f54444;
      color: #fff;
      font-size: 16px;
      border-radius: 5px;
      width: 80px;
      height: 35px;
      display: inline-block;
      text-align: center;
      line-height: 35px;
      margin-top: 8px;
    }
    /*购买大厅弹框*/
    .buyHallChose{
       position: fixed;
       left:0;
       width: 100%;
       top:50px;
       height: 100%;
    }
    .buyHallChose .bg{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .buyHallChose .con{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      background: #fff;
      z-index: 5;
    }
    .buyHallChose .con .title{
      height: 15px;
      border-top: solid 1px #f54444;;
      position: relative;
      margin-bottom: 5px;
    }
    .buyHallChose .con .title p{
      position: absolute;
      background: #fff;
      left:50%;
      top:-15px;
      line-height: 30px;
      text-align: center;
      padding: 0 5px;
      min-width: 80px;
      margin-left: -45px;
      font-size: 15px;
      color: #f54444;;
    }
    .buyHallChose .con  ul{
      margin-left: 10px;
    }
    .buyHallChose .con  ul li{
      width: 33.3%;
    }
    .buyHallChose .con  ul li.current{
      color: #f54444;;
    }
    .buyHallChose .con  ul li p{
      margin: 0 10px 10px 0;
      border-radius: 5px;
      border:solid 1px #dedede;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
    }
</style>

