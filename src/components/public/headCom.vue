<template>
    <div class="head">
        <div class="H50">
            <header>
                <p class="back" @click="back" v-show="this.$store.state.headBack">
                   <span class="icon-back"></span>
                </p>
                <p>{{this.$store.state.documentTitle}}</p>
                <div class=" border_line"></div>
            </header>
        </div>
    </div>
</template>

<script>
export default {
    name: 'head',
    methods:{
        back:function(){
           this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
    header{
        z-index: 10;
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
</style>


