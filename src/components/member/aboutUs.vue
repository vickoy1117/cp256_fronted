<template>
    <div class="aboutUS">
        <headCom></headCom>
        <div class="aboutus">
            <p class="con">{{aboutInfo.content}}</p>
        </div>
    </div>
</template>

<script>
    import headCom from './../public/headCom'
    import server from './../../server'
    export default {
        name: 'aboutUS',
        data () {
            return {
                aboutInfo:{}
            }
        },
        components:{
            headCom
        },
        mounted:function(){
            var _self=this;
            server.aboutus(_self);
            //修改title
            this.$store.commit('changetitle','关于我们');
            //修改头部返回箭头
            this.$store.commit('changeBack',true);
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*更多*/
    
    
    .aboutus .con{
        line-height: 20px;
        color: #666;
        font-size: 14px;
        padding: 10px;
    }
</style>

