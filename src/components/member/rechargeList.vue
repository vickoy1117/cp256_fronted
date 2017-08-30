<template>
    <div class="rechargeList">
        <headCom></headCom>
        <p class="MB10 LH30 FZ13">{{dec}}扫码信息</p>
        <div class="bg_white">
            <p class="MB10 LH25 FZ13 gry3">订单号：{{number}}</p>
            <p class="MB10 LH25 FZ13 gry3">充值金额：{{this.$store.state.recharge}}元</p>
            <div class="pic"><img :src="ercodeurl" alt=""></div>
            <div class="H10"></div>
            <div class="H10"></div>
        </div>
        <ul class="out">
            <li class="n" @click="prev">上一步</li>
            <li class="n" @click="recharge">立即充值</li>
            <li class="n" @click="payed">我已支付</li>
        </ul>
        <div class="dec MB10">
            <p>扫码步骤</p>
            <p>1.点“立即充值”将自动为您截屏保存到相册，同时打开微信。</p>
            <p>2.请在微信中打开“扫一扫”</p>
            <p>3.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。</p>
            <p>4.如未充值及时到账，请联系在线客服</p>
        </div>
        <div class="erweiAlert" v-show="erwei">
            <div class="con">
                <img :src="ercodeurl" alt="">
            </div>
            <div class="bg" @click="close"></div>
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'
    export default {
        name: 'rechargeList',
        data () {
            return {
               type:'',
               dec:'',
               number:'',
               ercodeurl:'',
               idNum:'',
               erwei:false
            }
        },
        components:{
            headCom
        },
        methods:{
            prev:function(){
               this.$router.go(-1);
               this.$store.commit('changeRecharge','');
            },
            recharge:function(){
               this.erwei=true;
               var width=$(window).height()-$(window).width();
               $('.erweiAlert .con img').css({'margin-top':-width/2})
            },
            close:function(){
                this.erwei=false;
            },
            payed:function(){
                var _self=this;
                server.rechargePay(_self,{
                    id:_self.idNum
                });
            }
        },
        mounted:function(){
            var _self=this;
            this.type=location.href.split('?')[1].split('=')[1] ;

            server.rechargeDo(_self,{
                mBankId:287,
                amount:this.$store.state.recharge
            });
            //修改title
            switch(this.type){
                case '1':
                  this.$store.commit('changetitle','微信充值');
                  this.dec='微信支付';
                  break;
                case '2':
                  this.$store.commit('changetitle','支付宝充值');
                  this.dec='支付宝支付';
                  break;

            }
            //修改头部返回箭头
            this.$store.commit('changeBack',true);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .erweiAlert{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        z-index: 20;
    }
    .erweiAlert .bg{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);

    }
    .erweiAlert .con{
      width: 100%;
    }
    .erweiAlert .con img{
      position: absolute;
      left:50%;
      top:50%;
      width: 250px;
      margin-left: -125px;
      z-index: 2;
    }
   .bg_white{
      background:#fff;
      padding: 5px 0;
   }
   .gry3{
    color: #666;
   }
   .pic img{
      width: 200px;
      height: 200px;
      margin:0 auto;
      display: block;
   }
    ul{
        text-align: center;
        margin-top: 20px;
    }
    ul li{
        width: 80px;
        height: 30px;
        border-radius: 25px;
        color: #fff;
        background: #f64444;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        margin-right: 15px;
    }
    .dec{
        margin-top: 20px;
        font-size: 12px;
        color: #999999;
        line-height: 20px;
    }
</style>

