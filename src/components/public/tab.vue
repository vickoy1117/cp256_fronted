<template>
    <div class="tab">
        <div class="buyHallTab" >
            <ul class="out">
                <li class="n"  :class="[item.class,$store.state.tabWidth]" v-for="(item, index) in this.$store.state.tab" @click="tab_box(index)"><span><a href="javascript:">{{item.title}}</a></span></li>
            </ul>
            <div class=" border_line_top H01px"></div>
        </div>
        <div class="H45"></div>
    </div>
</template>

<script>
    import server from './../../server'
    export default {
        name: 'tab',
        methods:{
            //筛选弹框的事件
            tab_box: function (index) {
                for(var i=0;i<this.$store.state.tab.length;i++){
                    this.$store.state.tab[i].class='';
                }
                this.$store.state.tab[index].class='current';
                this.$store.state.currentView=this.$store.state.tab[index].currentView;
                //修改选中的id
                this.$store.commit('changeTabTitle',this.$store.state.tab[index].id);
                var _self=this;
                server.colorHall(_self,{
                     frequency:this.$store.state.id,
                     current_page:1,
                     page_count:8
                });
            }
        },
        mounted:function(){
           
        }

    }
</script>
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
</style>

