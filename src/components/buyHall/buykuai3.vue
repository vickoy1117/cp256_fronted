<!-- 江苏快3 -->
<template>
    <div class="buykuai3">
        <div class="H50">
            <header>
                <p class="back" @click="back">
                    <span class="icon-back"></span>
                </p>
                <p>
                    <span @click="buyHallChose = !buyHallChose">{{groupName}}
                        <span class="icon-arrow-down"></span>
                    </span>
                </p>
                <div class=" border_line"></div>
            </header>
        </div>
        <div class="buyHallDetail">
            <component :is="'buyHallPrimary'"></component>
            <!--<p class="title">
                <span></span>第{{actionno}}期
                <em class="red ML10">{{actiontime}} 截止</em>
            </p>
            <div class="choseTitle">
                <div class="H10"></div>
                <p>{{simpleInfo}}</p>
                <div class="shake"></div>
            </div>-->
            <div v-if="this.selectGroup.length==1 && this.selectGroup[0].options.length==1">
                <div class="choseList2" v-for="item in selectGroup">
                    <p class="pos tabListName">{{item.keyname}}</p>
                    <ul class="out">
                        <li class="n" v-for="(number,index) in item.options" @click="selectgroup(index)" :class="number.class" :keyname="item.keyname">{{number.num | cutNum}}</li>
                    </ul>
                </div>
            </div>
            <div v-if="this.selectGroup.length==2">
                <div class="choseList" v-for="(item,init) in selectGroup">
                    <p class="pos tabListName">{{item.keyname}}</p>
                    <ul class="out">
                        <li class="n" v-for="(number,index) in item.options" @click="selectgroup2(index,init)" :class="number.class" :keyname="item.keyname">{{number.num | cutNum}}</li>
                    </ul>
                </div>
            </div>
            <div v-if="this.selectGroup.length==1 && this.selectGroup[0].options.length>1">
                <div class="choseList3" v-for="item in selectGroup">
                    <p class="pos tabListName">{{item.keyname}}</p>
                    <ul class="out">
                        <!--<li class="n" v-for="(number,index) in item.options" @click="selectgroup(index)" :class="number.class" :keyname="item.keyname">{{number.num}}</li>-->
                        <li class="n" v-for="(number,index) in item.options" @click="selectgroup(index)" :class="number.class" :keyname="item.keyname">
                            <div :class="number.class">{{number.num}}</div>
                            <div v-if="isFixed == 1">{{number.odds}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="H50">
            <div class="buyHallBtn">
                <div class=" border_line"></div>
                <div class="con">
                    <span class="icon-delete" @click="deleteSelect"></span>
                    共{{total}}注 {{totalMoney}}元
                    <span class="fr" @click="toPlay">确认</span>
                    <div class="border_lineLeft"></div>
                </div>
            </div>
        </div>
        <div class="buyHallChose" v-show="buyHallChose">
            <div class="con">
                <div class="buyHallChoseList tabList">
                    <div class="H20"></div>
                    <div class="title">
                        <p class="tabListName">{{groupName}}</p>
                    </div>
                    <ul class="out">
                        <li class="n" v-for="(list,index) in initList.groupList" @click="groupList(index)" :class="list.class" :type="list.groupid">
                            <p>{{list.groupname}}</p>
                        </li>
                    </ul>
                </div>
                <div class="buyHallChoseList tabList">
                    <div class="H20"></div>
                    <div class="title">
                        <p class="tabListName">{{playName}}</p>
                    </div>
                    <ul class="out">
                        <li class="n" v-for="(list,index) in initList.playList" :class="list.class" @click="playList(index)" :type="list.playid">
                            <p :playid="list.playid">{{list.name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="H10"></div>
            </div>
            <div class="bg" @click="buyHallChose = !buyHallChose"></div>
        </div>
        <buyHallSetting :total="total" :totalMoney="totalMoney" :fanDianBdw="fanDianBdw" :bonusprop="bonusprop" :bonuspropbase="bonuspropbase" :gameFanDian="gameFanDian" :myFanDian="myFanDian" :award="award" :highest="highest" v-on:fresh2="freshPro2" v-on:fresh1="freshPro1" :json="json" :json2="json2"></buyHallSetting>
        <buyHallCheck :json="json" :json2="json2" :total="total" :groupName="groupName" :totalMoney="totalMoney" :selectGroup="selectGroup" v-on:fresh3="freshPro3" v-on:fresh4="freshPro4" v-on:optionFun="optionFun">
        </buyHallCheck>
    </div>
</template>

<script>
import server from './../../server'
import buyHallSetting from './buyHallSetting'
import buyHallCheck from './buyHallCheck'
import buyHallPrimary from './buyHallPrimary'

export default {
    name: 'buykuai3',
    data() {
        return {
            fanDianBdw: '',
            bonusprop: '',
            bonuspropbase: '',
            gameFanDian: '',
            myFanDian: '',
            award: '',
            highest: '',
            arr: [],                // 存放选中的数字
            arrOdds: [],            // 存放选中的数字的赔率
            price: 2,
            type: '',
            actiontime: '',
            actionno: '',
            buyHallChose: false,
            defPlayName: '',
            selectGroup: [],
            initList: {},
            groupName: '',
            playName: '',
            groupId: '',
            playedId: '',
            total: 0,
            totalMoney: 0,
            json: {},
            json2: {},
            arrList: [{ one: [] }, { two: [] }],
            simpleInfo: ''            // 玩法最少选几个号码
        }
    },
    components: {
        buyHallSetting, buyHallCheck, buyHallPrimary
    },
    methods: {
        // 获取投注页面信息的方法
        getPlayDefaultInfo() {
            this.type = location.href.split('?')[1].split('=')[1];
            var _self = this;
            //获取彩种信息
            server.playDefaultInfo(_self, {
                type: this.type
            });
        },
        back: function () {
            this.$router.go(-1);
        },
        groupList: function (index) {
            for (var i = 0; i < this.initList.groupList.length; i++) {
                this.initList.groupList[i].class = '';
            }
            this.initList.groupList[index].class = 'current';
            //改变第一级选项
            this.groupName = this.initList.groupList[index].groupname;
            this.groupId = this.initList.groupList[index].groupid;
            //获取玩法列表
            var _self = this;
            server.played2(_self, {
                groupId: _self.groupId,
            });
            //清空之前选中的注数
            this.total = 0;
            this.totalMoney = 0;
            this.json = {};
            this.json2 = {};
            this.arr = [];
            this.arrList = [{ one: [] }, { two: [] }];
            // 清空投注数据数组
            this.$store.commit('arrList', [])
            // 清空支付页面显示数据数组
            this.$store.commit('betsDisplay', [])
        },
        playList: function (index) {
            for (var i = 0; i < this.initList.playList.length; i++) {
                this.initList.playList[i].class = '';
            }
            this.initList.playList[index].class = 'current';
            this.playName = this.initList.playList[index].name;

            this.playedId = this.initList.playList[index].playid;
            //获取玩法具体参数
            var _self = this;

            server.played(_self, {
                type: this.type,
                playedId: this.initList.playList[index].playid
            });
            //清空之前选中的注数
            this.total = 0;
            this.totalMoney = 0;
            this.json = {};
            this.json2 = {};
            this.arr = [];
            this.arrList = [{ one: [] }, { two: [] }];
            // 清空投注数据数组
            this.$store.commit('arrList', [])
            // 清空支付页面显示数据数组
            this.$store.commit('betsDisplay', [])
        },
        selectgroup: function (index) {
            var _self = this;
            if (this.selectGroup[0].options[index].class == 'current') {
                this.selectGroup[0].options[index].class = '';
                //取消选中的数字
                var num = this.selectGroup[0].options[index].num;
                var selectIndex = this.arr.indexOf(num);
                if (selectIndex > -1) {
                    this.arr.splice(selectIndex, 1);
                }
                // 取消选中的数字的赔率
                if (_self.isFixed == 1) {
                    var odds = this.selectGroup[0].options[index].odds;
                    this.arrOdds[0].splice(selectIndex, 1);
                }

            } else {
              var num = this.selectGroup[0].options[index].num;
              if(_self.playedId == '304')
              {
                Array.prototype.indexOf = function(val) {
                  for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                  }
                  return -1;
                };
                if(num == '大' || num =='小') {
                  if(_self.arr.indexOf('大') > -1 || _self.arr.indexOf('小') > -1 )
                    return layer.open({
                      content: '大小不能同时选择',
                      skin: 'msg',
                      time: 3 //2秒后自动关闭
                    });
                }else if(num == '单' || num =='双')
                {
                  if(_self.arr.indexOf('单') > -1 || _self.arr.indexOf('双') > -1 )
                    return layer.open({
                      content: '单双不能同时选择',
                      skin: 'msg',
                      time: 3 //2秒后自动关闭
                    });
                }
              }
                this.selectGroup[0].options[index].class = 'current';

                addArr(num)
                // 如果赔率固定，同步插入addarrOdds数组
                if (_self.isFixed == 1) {
                    var odds = this.selectGroup[0].options[index].odds;
                    addarrOdds(0, odds)
                }
            };
            //添加this.arr（把选择的号插入数组）
            function addArr(addNum) {
                if (_self.arr instanceof Array) {
                    _self.arr.push(addNum);
                    // _self.arr[initNum].sort();
                } else {
                    _self.arr = [];
                    _self.arr.push(addNum);
                    // _self.arr[initNum].sort()
                }
                // 将选择的号码传给vuex保存
                console.log('_self.arr:' + _self.arr)
                _self.$store.commit('arr', _self.arr)
            };
            // 添加this.arrOdds（把选择的号的固定赔率插入数组）
            function addarrOdds(initNum, addOdds) {
                if (_self.arrOdds[initNum] instanceof Array) {
                    _self.arrOdds[initNum].push(addOdds);
                } else {
                    _self.arrOdds[initNum] = [];
                    _self.arrOdds[initNum].push(addOdds);
                    // _self.arrOdds[initNum].sort()
                }
                // 将选择的号码的赔率传给vuex保存
                console.log('_self.arrOdds:' + _self.arrOdds[initNum])
                _self.$store.commit('odds', _self.arrOdds[initNum])
                // 用作固定赔率最高奖励之用传递给buyHallSetting使用
                _self.award = Math.max.apply(null, _self.arrOdds[initNum])
            }
        },
        selectgroup2: function (index, init) {
            var _self = this;
            if (init == 0) {
                if (this.groupId == 43) {
                    if (this.selectGroup[0].options[index].class == 'current') {
                        this.selectGroup[0].options[index].class = '';
                        //取消选中的数字
                        var num = this.selectGroup[0].options[index].num;
                        for (var i = 0; i < this.arrList[0].one.length; i++) {
                            if (this.arrList[0].one[i] == num) {
                                return this.arrList[0].one.splice(i, 1);
                            }
                        }
                    } else {
                        this.selectGroup[0].options[index].class = 'current';
                        //加入选中数字
                        var num = this.selectGroup[0].options[index].num;
                        this.arrList[0].one.push(num);
                    }
                } else {
                    var num = this.selectGroup[0].options[index].num;
                    for (var i = 0; i < this.selectGroup[0].options.length; i++) {
                        this.selectGroup[0].options[i].class = ''
                    };
                    this.selectGroup[0].options[index].class = 'current';
                    this.arrList[0].one[0] = num;
                }
            } else {
                var num = this.selectGroup[1].options[index].num;
                var numHas = true;
                if (this.arrList[0].one[0] == num) {
                    numHas = true;
                } else {
                    numHas = false;
                }
                if (numHas) {
                    layer.open({
                        content: '选择不同的拖码',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                } else {
                    if (this.selectGroup[1].options[index].class == 'current') {
                        this.selectGroup[1].options[index].class = '';
                        //取消选中的数字
                        var num = this.selectGroup[1].options[index].num;
                        var selectIndex = this.arrList[1].two.indexOf(num);
                        if (selectIndex > -1) {
                            this.arrList[1].two.splice(selectIndex, 1);
                        }
                    } else {
                        this.selectGroup[1].options[index].class = 'current';
                        //加入选中数字
                        var num = this.selectGroup[1].options[index].num;
                        this.arrList[1].two.push(num);
                    }
                }
            }
            //计算注数
            var val = this.arrList;
            if (this.groupId == 43) {
                this.total = val[0].one.length * val[1].two.length;
            } else if (this.playedId == 303) {
                // 快3 二不同号（胆拖）
                _self.total = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arrList[1].two instanceof Array) {
                        this.total = _self.arrList[1].two.length;
                    }
                }
            } else {
                if (val[0].one.length > 0 && val[1].two.length > 1) {
                    this.total = combine(val[1].two, 2).length;
                }
            }
            function combine(arr, num) {
                var r = [];
                (function f(t, a, n) {
                    if (n == 0) return r.push(t);
                    for (var i = 0, l = a.length; i <= l - n; i++) {
                        f(t.concat(a[i]), a.slice(i + 1), n - 1);
                    }
                })([], arr, num);
                return r;
            };
        },
        // 清空
        deleteSelect: function () {
            for (var i = 0; i < this.selectGroup.length; i++) {
                for (var j = 0; j < this.selectGroup[i].options.length; j++) {
                    this.selectGroup[i].options[j].class = "";
                }
            };
            this.arr = [];
            this.total = 0;
            this.totalMoney = 0;
            this.arrList = [{ one: [] }, { two: [] }];
            for (var i = 0; i < this.selectGroup.length; i++) {
                this.selectGroup[i].number = 0
                this.selectGroup[i].numberList = []
            }
        },
        // 确认
        toPlay: function () {
            // console.log('aaaa')
            var _self = this;

            if (_self.playedId == 123) {
                // 三不同号
                if (this.total < 1) {
                    return layer.open({
                        content: '请至少选择三注',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                } else {
                    sendDate();
                }
            } else if (_self.playedId == 124) {
                // 二不同号
                if (this.total < 1) {
                    return layer.open({
                        content: '请至少选择二注',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                } else {
                    sendDate();
                }
            } else {
                if (this.total <= 0) {
                    return layer.open({
                        content: '请至少选择一注',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                } else {
                    sendDate();
                }
            }

            function sendDate() {
                _self.$store.commit('buySetting', true);
                //计算传给后台的
                if (_self.playedId == 302 || _self.playedId == 303) {
                    var val = _self.arrList;
                    if (val[0].one.length > 0 && val[1].two.length > 0) {
                        var tuoma = "(" + val[0].one + ")" + val[1].two.join(' ') + "";
                        _self.arr[0] = tuoma;
                    }
                }

                if (_self.groupId == 43) {
                    var val = _self.arrList;
                    if (val[0].one.length > 0 && val[1].two.length > 1) {
                        var tuoma = val[0].one.join(' ') + "," + val[1].two.join(' ');
                        _self.arr[0] = tuoma;
                    }
                }

                if (_self.playedId == 120 || _self.playedId == 123 || _self.playedId == 124) {
                    // 三同号单选  三不同号  二不同号
                    var tuoma = new Array;
                    if (_self.arr.length > 0) {
                        tuoma[0] = _self.arr.join(' ');
                        var json = {};

                        json.actionData = tuoma;
                        json.actionNum = _self.total;
                        json.playedGroup = _self.groupId;
                        json.playedId = _self.playedId;
                        json.type = _self.type;
                        json.actionNo = _self.actionno;
                        json.weiShu = 0;
                        json.beiShu = 1;
                        _self.json = json;
                    }
                } else {
                    // {"code":[{"fanDian":0,"bonusProp":182000,"mode":2,"beiShu":2,"actionData":"2,2,2,2,23,","actionNum":2,"weiShu":0,"playedGroup":"1","playedId":"2","type":"1"}],"para":{"type":"1","actionNo":"20170211-69"}}
                    var json = {};
                    json.actionData = _self.arr;
                    console.log(json.actionData)
                    json.actionNum = _self.total;
                    json.playedGroup = _self.groupId;
                    json.playedId = _self.playedId;
                    json.type = _self.type;
                    json.actionNo = _self.actionno;
                    json.weiShu = 0;
                    json.beiShu = 1;
                    _self.json = json;
                }
            }
        },
        freshPro2: function (b) {
            console.info(b)
            this.totalMoney = b.totalMoney;
            this.price = b.price;
        },
        freshPro1: function (b) {
            this.json2 = b
        },
        // 自选号
        optionFun() {
            console.log('optionFun click')
            this.arr = [];
            this.arrOdds = [];
            this.total = 0;
            this.totalMoney = 0;
            this.arrList = [{ one: [] }, { two: [] }];
            for (var i = 0; i < this.selectGroup.length; i++) {
                for (var j = 0; j < this.selectGroup[i].options.length; j++) {
                    this.selectGroup[i].options[j].class = "";
                }
            };
            for (var i = 0; i < this.selectGroup.length; i++) {
                this.selectGroup[i].number = 0;
                this.selectGroup[i].numberList = [];
            }
        },
        // 清空
        freshPro3: function (b) {
            this.arr = [];
            this.arrOdds = [];
            this.total = 0;
            this.totalMoney = 0;
            this.arrList = [{ one: [] }, { two: [] }];
            this.$store.commit('arrList', [])
            console.log('清空后的arrList:', this.$store.state.arrList)
            for (var i = 0; i < this.selectGroup.length; i++) {
                for (var j = 0; j < this.selectGroup[i].options.length; j++) {
                    this.selectGroup[i].options[j].class = "";
                }
            };
            for (var i = 0; i < this.selectGroup.length; i++) {
                this.selectGroup[i].number = 0;
                this.selectGroup[i].numberList = [];

            }
        },
        freshPro4: function (b) {
            this.arr.push(b);
            this.total += 1;
        },
    },
    watch: {
        initList: function (val) {
            this.selectGroup = this.initList.playedconfig.config.selectGroup;
            this.defPlayName = this.initList.defPlayName;
            this.groupName = this.initList.groupList[0].groupname;
            this.playName = this.initList.playList[0].name;
            this.actionno = this.initList.actionNo.actionno;
            this.actiontime = this.initList.actionNo.actiontime;
            this.groupId = this.initList.playedconfig.groupId;
            this.playedId = this.initList.playList[0].playid;
            //用于计算返利
            var bonusprop = this.initList.playedconfig.config.bonusprop;
            var bonuspropbase = this.initList.playedconfig.config.bonuspropbase;
            var gameFanDian = this.initList.playedconfig.config.gameFanDian;
            var myFanDian = this.initList.playedconfig.config.myFanDian;
            this.fanDianBdw = this.initList.playedconfig.config.fanDianBdw;
            this.bonusprop = bonusprop;
            this.bonuspropbase = bonuspropbase;
            this.gameFanDian = gameFanDian;
            this.myFanDian = myFanDian;
        },
        arr: function (val) {
            if (this.playedId == 123) {
                // 三不同号
                this.total = combine(val, 3).length;
            } else if (this.playedId == 124) {
                // 二不同号
                this.total = combine(val, 2).length;
            } else {
                this.total = combine(val, 1).length;
            }
            function combine(arr, num) {
                var r = [];
                (function f(t, a, n) {
                    if (n == 0)
                        return r.push(t);
                    for (var i = 0, l = a.length; i <= l - n; i++) {
                        f(t.concat(a[i]), a.slice(i + 1), n - 1);
                    }
                })([], arr, num);
                return r;
            }
        },
        total: function (val) {
            this.totalMoney = (val * this.price).toFixed(2);
        }
    },
    filters: {
        cutNum: function (value) {
            return value.split('|').join(',');
        }
    },
    mounted: function () {
        // 获取投注页面信息的方法
        this.getPlayDefaultInfo();
        // 清空投注数据数组
        this.$store.commit('arrList', [])
        // 清空支付页面显示数据数组
        this.$store.commit('betsDisplay', [])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back {
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
}

.icon-back {
    font-size: 18px;
    color: #666;
}


/*购买大厅详情*/

.buyHallDetail .title {
    position: relative;
    padding: 0 10px 0 20px;
    background: #fff;
    line-height: 35px;
    font-size: 14px;
    color: #666;
}

.buyHallDetail .title span {
    position: absolute;
    left: 10px;
    top: 7px;
    width: 3px;
    height: 20px;
    background: #f54444;
}

.buyHallDetail .choseTitle {
    line-height: 40px;
    margin: 0 10px;
    color: #666;
    font-size: 15px;
}

.buyHallDetail .choseList {
    position: relative;
}

.buyHallDetail .choseList .pos {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #666;
    background: #e3e2e2;
    border-radius: 20px;
    padding: 5px 8px;
}

.buyHallDetail .choseList3 .pos {
    position: absolute;
    left: 10px;
    color: #666;
    background: #e3e2e2;
    border-radius: 20px;
    padding: 5px 8px;
}

.buyHallDetail .choseList ul {
    margin: 10px 10px 0 90px;
}

.buyHallDetail .choseList ul li {
    width: 40px;
    height: 40px;
    background: #fff;
    border: solid 1px #dfdfdf;
    color: #f54444;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
    margin: 0 10px 10px 0;
    border-radius: 50%;
}

.buyHallDetail .choseList ul li.current {
    color: #fff;
    background: #f54444;
    border: solid 1px #f54444;
}

.buyHallDetail .choseList3 ul {
    margin: 10px 10px 0 90px;
}

.buyHallDetail .choseList3 ul li {
    margin: 0 10px 10px 0;
}

.buyHallDetail .choseList3 ul li div:first-child {
    width: 40px;
    height: 40px;
    background: #fff;
    border: solid 1px #dfdfdf;
    color: #f54444;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
}

.buyHallDetail .choseList3 ul li div:nth-child(2) {
    height: 15px;
    font-size: 10px;
    margin: 3px 0 0 0;
    color: #999;
    text-align: center;
}

.buyHallDetail .choseList3 ul li div.current {
    color: #fff;
    background: #f54444;
    /*border: solid 1px #f54444;*/
}

.buyHallDetail .choseList2 {
    position: relative;
}

.buyHallDetail .choseList2 .pos {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #666;
    background: #e3e2e2;
    border-radius: 20px;
    padding: 5px 8px;
}

.buyHallDetail .choseList2 ul {
    margin: 10px 10px 0 70px;
}

.buyHallDetail .choseList2 ul li {
    height: 40px;
    background: #fff;
    border: solid 1px #dfdfdf;
    color: #f54444;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    padding: 0 10px;
}

.buyHallDetail .choseList2 ul li.current {
    color: #fff;
    background: #f54444;
    border: solid 1px #f54444;
}

.buyHallBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
}

.buyHallBtn .con {
    height: 49px;
    background: #fff;
    padding: 0 10px 0 60px;
    line-height: 49px;
    font-size: 15px;
    color: #000;
    position: relative;
}

.buyHallBtn .icon-delete {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    display: block;
    text-align: center;
    line-height: 50px;
    color: #999;
    font-size: 25px;
}

.buyHallBtn .border_lineLeft {
    left: 50px;
    top: 10px;
    height: 30px;
}

.buyHallBtn .fr {
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

.buyHallChose {
    position: fixed;
    left: 0;
    width: 100%;
    top: 50px;
    height: 100%;
}

.buyHallChose .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.buyHallChose .con {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 5;
}

.buyHallChose .con .title {
    height: 15px;
    border-top: solid 1px #f54444;
    ;
    position: relative;
    margin-bottom: 5px;
}

.buyHallChose .con .title p {
    position: absolute;
    background: #fff;
    left: 50%;
    top: -15px;
    line-height: 30px;
    text-align: center;
    padding: 0 5px;
    min-width: 80px;
    margin-left: -45px;
    font-size: 15px;
    color: #f54444;
    ;
}

.buyHallChose .con ul {
    margin-left: 10px;
}

.buyHallChose .con ul li {
    width: 33.3%;
}

.buyHallChose .con ul li.current {
    color: #f54444;
    ;
}

.buyHallChose .con ul li p {
    margin: 0 10px 10px 0;
    border-radius: 5px;
    border: solid 1px #dedede;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
}
</style>

