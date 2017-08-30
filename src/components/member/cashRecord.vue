<template>
    <div class="cashRecord">
        <headCom></headCom>
        <div class="tab">
            <div class="buyHallTab">
                <ul class="out">
                    <li class="n W33" :class="item.class" v-for="(item, index) in tab" @click="tab_box(index)">
                        <span>
                            <a href="javascript:">{{item.title}}</a>
                        </span>
                    </li>
                </ul>
                <div class=" border_line_top H01px"></div>
            </div>
            <div class="H45"></div>
        </div>
        <div class="memberTable rechargeRecord">
            <table>
                <tr v-for="item in withdrawList">
                    <td class="W25">
                        {{dec}}
                        <div class=" border_line"></div>
                    </td>
                    <td class="green W25">
                        {{item.amount}}元
                        <div class=" border_line"></div>
                    </td>
                    <td class="gry W50">
                        {{item.actiontime | time}}
                        <div class=" border_line"></div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import headCom from './../public/headCom'
import server from './../../server'
export default {
    name: 'cashRecord',
    data() {
        return {
            tab: [{ title: '待审核', class: 'current', state: 1 },
            { title: '已提款', class: '', state: 0 },
            { title: '已取消', class: '', state: 4 }],
            withdrawList: '',
            dec: '待审核'
        }
    },
    components: {
        headCom
    },
    methods: {
        //筛选弹框的事件
        tab_box: function (index) {
            for (var i = 0; i < this.tab.length; i++) {
                this.tab[i].class = '';
            }
            this.tab[index].class = 'current';
            this.dec = this.tab[index].title;
            //修改选中的id
            var _self = this;

            server.withdrawRecord(_self, {
                state: this.tab[index].state,
                current_page: 1,
                page_count: 20
            })
        }
    },
    mounted: function () {
        var _self = this;
        
        server.withdrawRecord(_self, {
            state: 1,
            current_page: 1,
            page_count: 20
        });
        //修改title
        this.$store.commit('changetitle', '提款记录');
        //修改头部返回箭头
        this.$store.commit('changeBack', true);
    },
    filters: {
        time(value) {
            var date = new Date(value * 1000);
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.memberTable table {
    width: 100%;
    background: #f7f7f7;
}

.memberTable table tr {

    line-height: 50px;
    text-align: center;
}

.buyHallTab {
    position: fixed;
    left: 0;
    top: 50px;
    width: 100%;
    height: 45px;
    background: #fff;
    z-index: 10;
}

.buyHallTab li {
    font-size: 15px;
    line-height: 43px;
    text-align: center;
}

.buyHallTab li a {
    display: inline-block;
    color: #000;
    height: 43px;
    border-bottom: solid 2px #fff
}

.buyHallTab li.current a {
    color: #f54444;
    border-bottom: solid 2px #f54444
}
</style>

