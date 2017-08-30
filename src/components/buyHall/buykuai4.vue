<!-- 时时彩 -->
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
    
            <div class="choseList" v-for="(item,init) in selectGroup">
                <p class="pos tabListName">{{item.keyname}}</p>
                <ul class="out">
                    <li class="n" v-for="(number,index) in item.options" @click="selectgroup(index,init)" :class="number.class" :keyname="item.keyname">{{number.num}}</li>
                </ul>
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
            arr: [],
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
            playedId: '',             // 玩法ID
            total: 0,
            totalMoney: 0,
            json: {},
            json2: {},
            jsfun: '',
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
            this.jsfun = this.initList.playList[index].jsfun;
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
        selectgroup: function (index, init) {
            var _self = this;
            if (this.selectGroup[init].options[index].class == 'current') {
                this.selectGroup[init].options[index].class = '';
                //取消选中的数字
                var num = this.selectGroup[init].options[index].num;
                for (var i = 0; i < this.arr[init].length; i++) {
                    if (this.arr[init][i] == num) {
                        this.arr[init].splice(i, 1);
                    }
                }
            } else {
                this.selectGroup[init].options[index].class = 'current';
                var num = this.selectGroup[init].options[index].num;
                addArr(init, num)
            };
            //添加this.arr
            function addArr(initNum, addNum) {
                if (_self.arr[initNum] instanceof Array) {
                    _self.arr[initNum].push(addNum);
                    _self.arr[initNum].sort();
                } else {
                    _self.arr[initNum] = [];
                    _self.arr[initNum].push(addNum);
                    _self.arr[initNum].sort()
                };
            };
            //调用该方法
            console.log('jsfun:' + this.jsfun)
            eval(this.jsfun + '()');

            // 注数计算方法
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

            //组选60计算方法
            function ssczx60() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 0 && _self.arr[1].length > 2) {
                        num = Sames(_self.arr[0], _self.arr[1]);
                        var tLen = _self.arr[1].length;
                        var dLen = _self.arr[0].length;
                        var sele_count = new Array('0', '0', '0', '1', '4', '10', '20', '35', '56', '84');
                        var c = '';
                        var anum = '';
                        if (tLen - 1 >= 0) {
                            c = tLen - 1
                        } else {
                            c = 0;
                        };
                        if (num - 1 >= 0) {
                            if (dLen - num == 0) {
                                anum = sele_count[c] * dLen;
                            } if (dLen - num > 0) {
                                anum = sele_count[tLen] * (dLen - num) + sele_count[c] * num;
                            }
                        } else {
                            anum = sele_count[tLen] * dLen;
                        }
                        _self.total = parseInt(anum);
                    } else {
                        _self.total = 0;
                    }
                }
            };
            function Sames(a, b) {
                var num = 0;
                for (var i = 0; i < a.length; i++) {
                    var zt = 0;
                    for (var j = 0; j < b.length; j++) {
                        if (a[i] - b[j] == 0) {
                            zt = 1;
                        }
                    }
                    if (zt == 1) {
                        num += 1;
                    }
                }
                return num;
            };
            //组选30计算方法
            function ssczx30() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 1 && _self.arr[1].length > 0) {
                        var dLen = _self.arr[0].length;
                        var tLen = _self.arr[1].length;
                        var dCode = _self.arr[0];
                        var tCode = _self.arr[1];
                        var d = 0;
                        var bnum = 0;
                        for (var i = 0; i < dLen - 1; i++) {
                            d = i + 1;
                            for (var j = d; j < dLen; j++) {
                                for (var c = 0; c < tLen; c++) {
                                    if (dCode[i] - tCode[c] != 0 && dCode[j] - tCode[c] != 0) {
                                        bnum = bnum + 1;
                                    }
                                }
                            }
                        }
                        _self.total = bnum;
                    } else {
                        _self.total = 0;
                    }
                }

            };
            //组选120计算方法
            function ssczx120() {
                if (_self.arr[0].length > 4) {
                    _self.total = combine(_self.arr[0], 5).length
                } else {
                    _self.total = 0;
                }
            };
            //五星复试
            function tzAllSelect() {
                var fullNum = true;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] == undefined || _self.arr[i].length == 0) {
                        fullNum = false;
                    }
                };
                if (fullNum) {
                    _self.total = 1;
                    for (var i = 0; i < _self.arr.length; i++) {
                        _self.total *= _self.arr[i].length
                    }
                } else {
                    _self.total = 0;
                }
            };
            //组选20计算方法
            function ssczx20() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 0 && _self.arr[1].length > 1) {
                        var dLen = _self.arr[0].length;
                        var tLen = _self.arr[1].length;
                        var dCode = _self.arr[0];
                        var tCode = _self.arr[1];
                        var d = 0;
                        var bnum = 0;
                        for (var i = 0; i < tLen - 1; i++) {
                            d = i + 1;
                            for (var j = d; j < tLen; j++) {
                                for (var c = 0; c < dLen; c++) {
                                    if (dCode[i] - tCode[c] != 0 && dCode[j] - tCode[c] != 0) {
                                        bnum = bnum + 1;
                                    }
                                }
                            }
                        }
                        _self.total = bnum;
                    } else {
                        _self.total = 0;
                    }
                }
            };
            //组选10计算方法
            function ssczx10() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 0 && _self.arr[1].length > 0) {
                        var dLen = _self.arr[0].length;
                        var tLen = _self.arr[1].length;
                        var dCode = _self.arr[0];
                        var tCode = _self.arr[1];
                        var bnum = 0;
                        for (var i = 0; i < dLen; i++) {
                            for (var j = 0; j < tLen; j++) {
                                if (dCode[i] - tCode[j] != 0) {
                                    bnum = bnum + 1;
                                }
                            }
                        }
                        _self.total = bnum;
                    } else {
                        _self.total = 0;
                    }
                }
            };
            //组选5计算方法
            function ssczx5() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 0 && _self.arr[1].length > 0) {
                        var dLen = _self.arr[0].length;
                        var tLen = _self.arr[1].length;
                        var dCode = _self.arr[0];
                        var tCode = _self.arr[1];
                        var bnum = 0;
                        for (var i = 0; i < dLen; i++) {
                            for (var j = 0; j < tLen; j++) {
                                if (dCode[i] - tCode[j] != 0) {
                                    bnum = bnum + 1;
                                }
                            }
                        }
                        _self.total = bnum;
                    } else {
                        _self.total = 0;
                    }
                }
            };
            //组选24计算方法
            function ssczx24() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length > 3) {
                        console.info(_self.arr[0])
                        var sele_count = new Array('0', '0', '0', '1', '5', '15', '35', '70', '126', '210');
                        var dCode = _self.arr[0];
                        var endnum = 0;
                        var num = dCode.length - 1;
                        var endnum = parseInt(sele_count[num]);
                        _self.total = endnum;
                    } else {
                        _self.total = 0;
                    }
                }

            };
            //组选12计算方法
            function ssczx12() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 0 && _self.arr[1].length > 1) {
                        var sele_count = new Array('0', '1', '3', '6', '10', '15', '21', '28', '36');
                        var dCode = _self.arr[0];
                        var tCode = _self.arr[1];
                        var dLen = _self.arr[0].length;
                        var tLen = _self.arr[1].length;
                        var c = 0;
                        var d = 0;
                        var anum = 0;
                        num = Sames(dCode, tCode);
                        if (tLen - 1 >= 0) {
                            c = tLen - 1
                        } else {
                            c = 0;
                        };
                        if (tLen - 2 >= 0) {
                            d = tLen - 2
                        } else {
                            d = 0;
                        };
                        if (num - 1 >= 0) {
                            if (dCode.length - num == 0) {
                                c = tLen - 2;
                                anum = sele_count[c] * dCode.length;
                            }
                            if (dCode.length - num > 0) {
                                c = tLen - 2;
                                anum = sele_count[c] * num;
                                anum = anum + sele_count[tLen - 1] * (dCode.length - num);
                            }
                        } else {
                            if (tLen - 1 >= 0) {
                                c = tLen - 1
                            } else {
                                c = 0;
                            };
                            anum = sele_count[c] * dCode.length;
                        }
                        _self.total = parseInt(anum);
                    } else {
                        _self.total = 0;
                    }
                }

            };
            //组选6计算方法
            function ssczx6() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length > 1) {
                        var sele_count = new Array('0', '0', '1', '3', '6', '10', '15', '21', '28', '36', '45');
                        var dLen = _self.arr[0].length;
                        _self.total = sele_count[dLen];
                    } else {
                        _self.total = 0;
                    }
                }
            };
            //组选4计算方法
            function ssczx4() {
                if (_self.arr[0] instanceof Array && _self.arr[1] instanceof Array) {
                    if (_self.arr[0].length > 0 && _self.arr[1].length > 0) {
                        var sele_count = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
                        var dCode = _self.arr[0];
                        var tCode = _self.arr[1];
                        var dLen = _self.arr[0].length;
                        var endnum = 0;
                        for (var e = 0; e < dCode.length; e++) {
                            var this_num = dCode[e];
                            var d_arr = drop_array_lines(tCode, this_num);
                            endnum += d_arr.length;
                        }
                        _self.total = endnum;
                    } else {
                        _self.total = 0;
                    }
                }
            };
            function drop_array_lines(arr, num) {
                var drop_arr = new Array();
                for (var o = 0; o < arr.length; o++) {
                    if (parseInt(arr[o], 10) - parseInt(num, 10) == 0) {

                    } else {
                        drop_arr.push(arr[o]);
                    }
                }
                return drop_arr;
            }
            //前三组三计算方法
            function tzPermutationSelect() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length > 1) {
                        var dCode = _self.arr[0];
                        var dLen = _self.arr[0].length;
                        _self.total = permutation(dCode, 2).length;
                    } else {
                        _self.total = 0;
                    }
                } else {
                    _self.total = 0;
                }
            };

            function permutation(arr, num) {
                var r = [];
                (function f(t, a, n) {
                    if (n == 0) return r.push(t);
                    for (var i = 0, l = a.length; i < l; i++) {
                        f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
                    }
                })([], arr, num);
                return r;
            }
            //前三组六计算方法
            function tzCombineSelect() {
                if (_self.playedId == 31 || _self.playedId == 33) {
                    // 二星组选-前二组选复式(至少两个号)
                    if (_self.arr[0] instanceof Array) {
                        if (_self.arr[0].length > 1) {
                            var dCode = _self.arr[0];
                            var dLen = _self.arr[0].length;
                            _self.total = combine(dCode, 2).length;
                        } else {
                            _self.total = 0;
                        }
                    } else {
                        _self.total = 0;
                    }
                } else {
                    // （至少三个号）
                    if (_self.arr[0] instanceof Array) {
                        if (_self.arr[0].length > 2) {
                            var dCode = _self.arr[0];
                            var dLen = _self.arr[0].length;
                            _self.total = combine(dCode, 3).length;
                        } else {
                            _self.total = 0;
                        }
                    } else {
                        _self.total = 0;
                    }
                }
            };
            //后三组选和值计算方法
            function ssch3zxhz() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length > 0) {
                        var sele_count = new Array('1', '2', '2', '4', '5', '6', '8', '10', '11', '13', '14', '14', '15', '15', '14', '14', '13', '11', '10', '8', '6', '5', '4', '2', '2', '1');
                        var dCode = _self.arr[0];
                        var dLen = _self.arr[0].length;
                        var num = 0;
                        var endnum = 0;
                        for (var i = 0; i < dCode.length; i++) {
                            num = dCode[i] - 1;
                            endnum = endnum + parseInt(sele_count[num]);
                        }
                        _self.total = endnum;
                    } else {
                        _self.total = 0;
                    }
                } else {
                    _self.total = 0;
                }
            };
            //五星定位胆
            function tz5xDwei() {
                _self.total = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array) {
                        console.info(_self.arr)
                        _self.total += _self.arr[i].length;
                    }
                }
            }
            //前三一码
            function tz5xBDwei() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length > 0) {
                        _self.total = _self.arr[0].length;
                    } else {
                        _self.total = 0;
                    }
                } else {
                    _self.total = 0;
                }
            }
            //前三二码
            function tz11x5Select() {
                if (_self.playedId == 261) {
                    // 至少选3个号
                    // 五星三码
                    if (_self.arr[0] instanceof Array) {
                        if (_self.arr[0].length > 2) {
                            _self.total = combine(_self.arr[0], 3).length;
                        } else {
                            _self.total = 0;
                        }
                    } else {
                        _self.total = 0;
                    }
                } else if (_self.playedId == 264 || _self.playedId == 254 || _self.playedId == 255 ||
                    _self.playedId == 256 || _self.playedId == 257) {
                    // 至少选1个号
                    if (_self.arr[0] instanceof Array) {
                        if (_self.arr[0].length > 0) {
                            _self.total = _self.arr[0].length;
                        } else {
                            _self.total = 0;
                        }
                    } else {
                        _self.total = 0;
                    }
                } else {
                    // 至少选2个号
                    if (_self.arr[0] instanceof Array) {
                        if (_self.arr[0].length > 1) {
                            _self.total = combine(_self.arr[0], 2).length;
                        } else {
                            _self.total = 0;
                        }
                    } else {
                        _self.total = 0;
                    }
                }
            }
            //前二大小单双
            function tzDXDS() {
                var c = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                        c += 1;
                    }
                }
                if (c > 1) {
                    _self.total = 1;
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                            _self.total *= _self.arr[i].length;
                        }
                    }
                } else {
                    _self.total = 0;
                }
            }
            //前三大小单双
            function tzDXDSq3h3() {
                var c = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                        c += 1;
                    }
                }
                if (c > 2) {
                    _self.total = 1;
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                            _self.total *= _self.arr[i].length;
                        }
                    }
                } else {
                    _self.total = 0;
                }
            }
            //前三趣味二星
            function qwwf() {
                var c = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                        c += 1;
                    }
                }
                if (c > 0) {
                    _self.total = 1;
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                            _self.total *= _self.arr[i].length;
                        }
                    }
                } else {
                    _self.total = 0;
                }
            }

        },
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
                this.selectGroup[i].number = 0;
                this.selectGroup[i].numberList = [];

            }
        },
        toPlay: function () {
            var _self = this;
            //调用该方法
            eval(this.jsfun + '()');
            //五星复选的算法
            function tzAllSelect() {
                var fullNum = true;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] == undefined || _self.arr[i].length == 0) {
                        errMSg('请选择' + _self.selectGroup[i].keyname)
                        fullNum = false;
                        return;
                    }
                };
                if (fullNum) {
                    actionData2();
                    sendDate();
                }
            }
            //组选120计算方法
            function ssczx120() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length < 5) {
                        errMSg('至少选择五位');
                    } else {
                        actionData();
                        sendDate();
                    }
                } else {
                    errMSg('至少选择五位');
                }

            }
            //组选60计算方法
            function ssczx60() {
                errorNum(1, 3);
            }
            //组选30计算方法
            function ssczx30() {
                errorNum(0, 2);
            }
            //组选20计算方法
            function ssczx20() {
                errorNum(1, 2);
            }
            //组选20计算方法
            function ssczx10() {
                tzAllSelect();
            }
            //组选5计算方法
            function ssczx5() {
                tzAllSelect();
            }
            //组选24计算方法
            function ssczx24() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length < 4) {
                        errMSg('至少选择四位');
                    } else {
                        actionData();
                        sendDate();
                    }
                } else {
                    errMSg('至少选择四位');
                }
            }
            //组选12计算方法
            function ssczx12() {
                errorNum(1, 2);
            }
            //组选6计算方法
            function ssczx6() {
                if (_self.arr[0] instanceof Array) {
                    if (_self.arr[0].length < 2) {
                        errMSg('至少选择两位');
                    } else {
                        actionData();
                        sendDate();
                    }
                } else {
                    errMSg('至少选择两位');
                }
            }
            //组选4计算方法
            function ssczx4() {
                tzAllSelect()
            }
            //前三组三计算方法
            function tzPermutationSelect() {
                errorNum(0, 2);
            }
            //前三组六计算方法
            function tzCombineSelect() {
                if (_self.playedId == 31 || _self.playedId == 33) {
                    // 二星组选-前后二组选复式
                    errorNum(0, 2);
                } else {
                    errorNum(0, 3);
                }
            }
            //后三组选和值计算方法
            function ssch3zxhz() {
                errorNum(0, 1);
            }
            //五星定位胆
            function tz5xDwei() {
                var dataList = [];
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array) {
                        dataList[i] = _self.arr[i].join('');;
                    } else {
                        dataList[i] = '-'
                    }
                };
                _self.json.actionData = [dataList.join(',')];
                sendDate();
            }
            //前三一码
            function tz5xBDwei() {
                tzAllSelect()
            }
            //前三二码
            function tz11x5Select() {
                // tzAllSelect()
                if (_self.playedId == 261) {
                    // 五星三码
                    errorNum(0, 3);
                } else if (_self.playedId == 264 || _self.playedId == 254 || _self.playedId == 255 ||
                    _self.playedId == 256 || _self.playedId == 257) {
                    tzAllSelect()
                } else {
                    errorNum(0, 2);
                }

            }
            //前二大小单双
            function tzDXDS() {
                var c = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                        c += 1;
                    }
                };
                if (c < 2) {
                    errMSg('至少选择两位')
                } else {
                    var dataList = [];
                    console.log('_self.selectGroup', _self.selectGroup)
                    console.log('_self.arr', _self.arr)
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        if (_self.arr[i] instanceof Array) {
                            dataList[i] = _self.arr[i].join('');;
                        } else {
                            dataList[i] = '-'
                        }
                    };
                    _self.json.actionData = [dataList.join(',')];
                    sendDate();
                }
            }
            //前三大小单双
            function tzDXDSq3h3() {
                var c = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                        c += 1;
                    }
                };
                if (c < 3) {
                    errMSg('至少选择三位')
                } else {
                    var dataList = [];
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        if (_self.arr[i] instanceof Array) {
                            dataList[i] = _self.arr[i].join('');;
                        } else {
                            dataList[i] = '-'
                        }
                    };
                    _self.json.actionData = [dataList.join(',')];
                    sendDate();
                }
            }
            //前三趣味二星
            function qwwf() {
                var c = 0;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] instanceof Array && _self.arr[i].length > 0) {
                        c += 1;
                    }
                };
                if (c < 1) {
                    errMSg('至少选择一位')
                } else {
                    var dataList = [];
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        if (_self.arr[i] instanceof Array) {
                            dataList[i] = _self.arr[i].join('');;
                        } else {
                            dataList[i] = '-'
                        }
                    };
                    _self.json.actionData = [dataList.join(',')];
                    sendDate();
                }
            }

            //判断最低选择的位数
            function errorNum(initW, lest) {
                var fullNum = true;
                for (var i = 0; i < _self.selectGroup.length; i++) {
                    if (_self.arr[i] == undefined || _self.arr[i].length == 0) {
                        errMSg('请选择' + _self.selectGroup[i].keyname)
                        fullNum = false;
                        return;
                    } else if (_self.arr[initW] instanceof Array) {
                        if (_self.arr[initW].length < lest) {
                            errMSg(_self.selectGroup[initW].keyname + '至少选择' + lest + '个');
                            fullNum = false;
                            return;
                        }
                    }
                };
                if (fullNum) {
                    actionData2();
                    sendDate();
                }
            }
            //错误提示
            function errMSg(msg) {
                layer.open({
                    content: msg,
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });
            }

            function actionData() {
                _self.json.actionData = [_self.arr[0].join(',')];
            }
            function actionData2() {
                var arrJoin = [];
                if (_self.playedId == 278) {
                    // 三星组选-后三组选和值
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        arrJoin[i] = _self.arr[i].join(',');
                    }
                } else if (_self.playedId == 142 || _self.playedId == 143 || _self.playedId == 261 ||
                    _self.playedId == 262 || _self.playedId == 263 || _self.playedId == 264 ||
                    _self.playedId == 254 || _self.playedId == 255 || _self.playedId == 256 ||
                    _self.playedId == 257 || _self.playedId == 93) {
                    // 不定胆-前三二码、后三二码、五星三码、五星二码、四星二码、四星一码
                    // 趣味-一帆风顺、好事成双
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        arrJoin[i] = _self.arr[i].join(' ');
                    }
                } else {
                    for (var i = 0; i < _self.selectGroup.length; i++) {
                        arrJoin[i] = _self.arr[i].join('');
                    }
                }
                _self.json.actionData = [arrJoin.join(',')];
            }
            //发送给后台的数据
            function sendDate() {
                // var json={};
                // var arrJoin=[];
                // if(_self.playedId==258){
                //     //组选120
                //     json.actionData=[_self.arr[0].join(',')];
                // }else{
                //     //五星复选的算法
                //     for(var i=0;i<_self.selectGroup.length;i++){
                //         arrJoin[i]=_self.arr[i].join('');
                //     };
                //     json.actionData=[arrJoin.join(',')];
                // }
                _self.json.actionNum = _self.total;
                _self.json.playedGroup = _self.groupId;
                _self.json.playedId = _self.playedId;
                _self.json.type = _self.type;
                _self.json.actionNo = _self.actionno;
                _self.json.weiShu = 0;
                _self.json.beiShu = 1;

                //_self.$store.commit('addData',json);
                _self.$store.commit('buySetting', true);
            }

        },
        freshPro2: function (b) {
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
            this.jsfun = this.initList.playList[0].jsfun;
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
        total: function (val) {
            this.totalMoney = (val * this.price).toFixed(2);
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

