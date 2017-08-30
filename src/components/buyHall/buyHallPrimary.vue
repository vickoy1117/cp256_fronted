<template>
    <div class="buyHallPrimary">
        <div class="H10"></div>
        <ul class="out MB10">
            <li class="n">
                <div class="con">
                    <p class="gry2 FZ13 LH20">距离
                        <span class="red">{{actionno}}</span>期截止</p>
                    <p class="FZ14 LH20">{{actiontimeForm}}</p>
                    <div class="border_left"></div>
                </div>
            </li>
            <li class="n">
                <p class="FZ13 LH20">
                    <span class="red">余额</span>
                </p>
                <p class="FZ14 LH20">{{money}}元</p>
                <div class="border_left"></div>
            </li>
        </ul>
        <div class="H10"></div>
        <p class="MB10 LH25 FZ14 num">第
            <span class="red">{{number}}</span>期开奖号码：
            <span class="red">{{data}}</span>
        </p>
    </div>
</template>

<script>
import server from './../../server'
export default {
    name: 'buyHallPrimary',
    data() {
        return {
            actionno: '',           // 最新一期的期数
            actiontime: '',         // 最新一期的截止投注时间
            actiontimeForm: '',     // 最新一期的截止投注时间转化后结果
            number: '',             // 上一期期数
            data: '',               // 上一期开奖的号码
            money: '',              // 账户金额
            type: '',               // 彩种id
            roomId: ''              // 房间id

        }
    },
    watch: {
        // 最新一期的截止投注时间转化方法
        actiontime: function (val) {
            this.actiontimeFun(val);
        }
    },
    mounted() {
        //获取倒计时以及上一期数据
        this.getTimeMsg();
    },
    methods: {
        // 获取倒计时以及上一期数据
        getTimeMsg() {
            var _self = this;
            
            var params = this.getParamsFromURL(window.location);
            this.type = params.id;
            // this.roomId = params.roomId;
            server.getCurrentInfo(_self, {
                type: this.type
            });
        },
        // 定时器
        actiontimeFun (val) {
            var _self = this;
            if (val) {
                var timestamp = new Date().getTime() / 1000;
                if (val <= timestamp) {
                    _self.actiontimeForm = '已截止';
                } else {
                    var s = val - timestamp;
                    tick();
                    var tim = setInterval(function () {
                        tick()
                        s--;
                    }, 1000)
                    function tick() {
                        var h = parseInt(s / 3600);
                        var mins = s % 3600;
                        var min = parseInt(mins / 60);
                        var sec = parseInt(mins % 60);
                        _self.actiontimeForm = h + '时' + min + '分' + sec + '秒'
                        if (h == 0 && min == 0 && sec == 0) {
                            clearInterval(tim);
                            // 重新进去一次ajax请求，刷新数据
                            _self.getTimeMsg()
                            _self.$parent.getPlayDefaultInfo()
                            
                        }
                    }
                }
            }
        },
        // 获取地址栏参数的方法
        getParamsFromURL(URL) {
            var paramObject = {};
            var paramStr = URL.search.substring(1);
            var params = paramStr.split('&');
            for (var i = 0; i < params.length; i++) {
                var pair = params[i].split('=');
                paramObject[pair[0]] = pair[1];
                paramObject[pair[0]] = decodeURI(paramObject[pair[0]]);
            }
            return paramObject;
        }
    }
}
</script>
<style scoped>
.buyHallPrimary {
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 50px;*/
    background: #f7f7f7;
    /*width: 100%;*/
    z-index: 10;
}

.buyHallPrimary ul {
    background: #fff;
    border-radius: 5px;
    border: solid 1px #dedede;
}

.buyHallPrimary ul li {
    width: 50%;
    padding: 5px 0;
    text-align: center;
}

.buyHallPrimary ul li .con {
    border-right: 1px solid #dedede;
}

.num {
    background: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    border: solid 1px #dedede;
}
</style>

