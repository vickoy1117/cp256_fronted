<template>
    <div class="trend">
        <div class="H50">
            <header >
                <p class="back" @click="back">
                   <span class="icon-back"></span>
                </p>
                <p><span @click="buyHallChose = !buyHallChose">{{typeName}}<span class="icon-arrow-down"></span></span></p>
                <div class=" border_line"></div>
            </header>
        </div>
        <div class="tab">
            <div class="buyHallTab" >
                <ul class="out">
                    <li class="n"
                        v-for="(item, index) in trendList"
                        @click="tab_box(index)"
                        :class="{current:index==0}"
                        >
                        <span><a href="javascript:">{{item.info}}</a></span>
                    </li>
                </ul>
                <div class=" border_line_top H01px"></div>
            </div>

        </div>
        <div class="trend">
            <table id="chartsTable">
                <tr class="fir">
                    <td class="blue ">期次</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
				
                <tr v-for="item in optionList">
                    <td>{{item.number | cut}}</td>
                    <td v-for="num in item.options" :class="{charball:!(num.iswin==0)}"><p :class="{current:!(num.iswin==0)}" >{{num.value}}</p></td>
                </tr>
				
                <tr class="sec">
                    <td class="one ">出现次数</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
                <tr class="three">
                    <td class="one ">平均遗漏</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
                <tr class="four">
                    <td class="one ">最大遗漏</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
                <tr class="five">
                    <td class="one ">最大连出</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
            </table>
        </div>
        <div class="trendTab">
            <div class="con">
                <div class="border_line"></div>
                <ul class="out">
                    <li class="n"
                        v-for="(item,index) in countList"
                        :class="item.class"
                        @click="choseCount(index)"

                        >
                        {{item.count}}期
                        <div class=" border_lineLeft"></div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 筛选弹框 -->
        <div class="buyHallChose" v-show="buyHallChose">
            <div class="con">
                <div class="buyHallChoseList">
                    <div class="H10"></div>
                    <ul class="out">
                        <li class="n"
                        v-for="(list,index) in buyHallChoseList"
                        :type="list.typeid"
                        @click="picketlist(index)"
                        :class="{current:index==0}"
                    >
                        <p>{{list.title}}</p>
                    </li>
                    </ul>
                </div>
                <div class="H10"></div>
            </div>
            <div class="bg" @click="buyHallChose = !buyHallChose">
            </div>
        </div>			
    </div>

</template>

<script>
    import server from './../../server'
    export default {
        name: 'trend',
        data () {
            return {
                buyHallChoseList:[],
                buyHallChose:false,
                typeName:[],
                trendList:'',
                optionList:'',
                count:30,
                type:1,
                countList:[{class:'current',count:30},{class:'',count:50},{class:'',count:100}],
                day:'',
				checkbox:true
            }
        },
        methods:{
            tab_box: function (index) {
                var lis=$('.buyHallTab li');
                for(var i=0;i<lis.length;i++){
                    $(lis[i]).removeClass('current')
                }
                $(lis[index]).addClass('current')
                this.optionList=this.trendList[index].optionList;
            },
            choseCount:function(index){
                for(var i=0;i<this.countList.length;i++){
                    this.countList[i].class="";
                }
                this.countList[index].class="current";
                //不同期数的选择
                this.count=this.countList[index].count;
                var _self=this;
                server.trendChart(_self,{
                    type:this.type,
                    count:this.count,
                    day:this.day
                });
                //将新获取的数据传递给位数
                var lis=$('.buyHallTab li');
                for(var i=0;i<lis.length;i++){
                    $(lis[i]).removeClass('current')
                }
                $(lis[0]).addClass('current')

            },
            back:function(){				
                this.$router.go(-1);
            },
            picketlist:function(index){
                this.typeName=this.buyHallChoseList[index].title;
                //彩种变色
                var picList=$('.buyHallChoseList li');
                for(var i=0;i<picList.length;i++){
                    $(picList[i]).removeClass('current')
                }
                $(picList[index]).addClass('current')
                //获取彩票期数数据
                this.type=this.buyHallChoseList[index].typeid;
                var _self=this;
                server.trendChart(_self,{
                    type:this.type,
                    count:this.count,
                    day:this.day
                });
                this.buyHallChose=false;
                //将新获取的数据传递给位数
                var lis=$('.buyHallTab li');
                for(var i=0;i<lis.length;i++){
                    $(lis[i]).removeClass('current')
                }
                $(lis[0]).addClass('current')
				
            },
			
        },
        watch:{
            trendList:function(val){
                var length=val.length;
                switch(length){
                    case 0:
                      return ;
                    case 1:
                      $('.buyHallTab ul').addClass('WD100');
                      break;
                    case 2:
                      $('.buyHallTab ul').addClass('WD50');
                      break;
                    case 3:
                      $('.buyHallTab ul').addClass('WD33');
                      break;
                    case 4:
                      $('.buyHallTab ul').addClass('WD25');
                      break;
                    case 5:
                      $('.buyHallTab ul').addClass('WD20');
                      break;
                }
                this.optionList=this.trendList[0].optionList;
				
            }
        },
        filters:{
            cut:function(value){
                return value.split('-')[1]
            }
        },
        mounted:function(){
            var _self=this;
            var date=new Date();
            this.day=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            server.trendChart(_self,{
                type:this.type,
                count:30,
                day:this.day
            });
            //请求头部彩种选择
            server.roleTypeList(_self);
            //修改头部返回箭头
            this.$store.commit('changeBack',false);
        },	
		updated:function(){
			$('canvas').remove()
			Chart.init();
			DrawLine.bind("chartsTable","has_line");
			DrawLine.color('red');
			DrawLine.add(0,0,0,0);
			DrawLine.draw(Chart.ini.default_has_line);
		},
		beforeRouteLeave (to, from, next ){
			$('canvas').remove()
			next()
			
		}		
    }
	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .buyHallTab{
      width: 100%;
      height: 45px;
      background: #fff;
      z-index: 10;
    }
    .buyHallTab .WD100 li{
        width: 100%;
    }
    .buyHallTab .WD50 li{
        width: 50%;
    }
    .buyHallTab .WD33 li{
        width: 33.3%;
    }
    .buyHallTab .WD25 li{
        width: 25%;
    }
    .buyHallTab .WD20 li{
        width: 20%;
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
    .back{
        position: absolute;
        left:0;
        top:0;
        width: 35px;
    }
    .icon-back{
        font-size: 18px;
        color: #fff;
    }
   .trend table{
      width: 100%;
    }
    .trend table td{
      width: 8%;
      border:solid 1px #dddddd;
      text-align: center;line-height: 35px;
    }
    .trend table td:nth-child(1){
      width: 20%;

    }
    .trend table td p.current{
      background: #f54444;;
      color: #fff;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      margin:0 auto;
    }
    .trend table tr:nth-child(2n+1){
      background: #fafafa;
    }
    .trend table tr:nth-child(2n+2){
      background: #fff;
    }
    .trend table tr.sec{
      background: #e2f6ff;
    }
    .trend table tr.sec .one{
      color: #4595ef;
    }
    .trend table tr.three{
      background: #f3ffda;
    }
    .trend table tr.three .one{
      color: #5fd56f;
    }
    .trend table tr.four{
      background: #ffecec;
    }
    .trend table tr.four .one{
      color: #f37681;
    }
    .trend table tr.five{
      background: #fff6d8;
    }
    .trend table tr.five .one{
      color: #f37681;
    }
    .trendTab{
      height: 60px;
    }
    .trendTab .con{
      position: fixed;
      left:0;
      bottom:0;
      width: 100%;
      height: 60px;
      background: #fff;
	  z-index:1;
    }
    .trendTab .con li{
      width: 33.3%;
      text-align: center;
      position: relative;
      line-height: 59px;
      font-size: 16px;
      font-size:
    }
    .trendTab .con li.current{
      color: #f54444;;
    }
    /*购买大厅弹框*/
    .buyHallChose{
       position: fixed;
       left:0;
       width: 100%;
       top:50px;
       height: 100%;
	   z-index:100;
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

