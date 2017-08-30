<template>
    <div class="slideBox">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in slide">
                    <a :href="item.adurl">
                        <img :src='item.imgurl' />
                    </a>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import server from './../../server'

export default {
    name: 'slideBox',
    data() {
        return {
            slide: []
        }
    },
    watch:{
         slide:function(val){
          setTimeout(function(){
             var swiper = new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              centeredSlides: true,
              autoplay: 2500,
              loop : true,
              autoplayDisableOnInteraction: false
          });
          },200)
         } 
    },
    created: function () {
        var _self = this;
        server.indexAd(_self)
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*轮播*/
.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #fff;
    margin: 0 5px;
}

.swiper-pagination-bullet-active {
    opacity: 1;
    background: #ff0000;
}

.swiper-container {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 25px;
    left: 0;
    width: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.swiper-slide img {
    width: 100%;
    display: block;
}

.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    -ms-transition-property: -ms-transform;
    transition-property: transform;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}

.swiper-slide {
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
}

.swiper-pagination {
    position: absolute;
    text-align: center;
    -webkit-transition: 300ms;
    -moz-transition: 300ms;
    -o-transition: 300ms;
    transition: 300ms;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    z-index: 10;
}
</style>
