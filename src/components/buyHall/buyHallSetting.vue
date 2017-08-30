<template>
  <div class="buyHallSetting" v-show="this.$store.state.buySetting">
    <div class="con">
      <p class="text_center LH40 FZ15">注单设定</p>
      <p class="border_line"></p>
      <p v-if="this.$store.state.isFixed == 0 && showBDW" class="MB10 LH35 gry">奖金：{{award2}}
        <span class="fr">返利：{{fanli}}%</span>
      </p>
      <p v-if="this.$store.state.isFixed == 1" class="MB10 LH35 gry">最高奖金：{{award}} </p>
      <p v-if="this.$store.state.isFixed == 2" class="MB10 LH35 gry">最高奖金：{{this.$store.state.changeOdds}} </p>
      <div class="outside" v-show="this.$store.state.isFixed == 0 && showBDW">
        <div class="demo">
          <input type="hidden" class="single-slider" value="0" />
        </div>
      </div>
      <p class="H05"></p>
      <!--
          <div class="choseMoney MB10 FZ13">
              <p class=" LH45 gry ">单注金额 </p>
              <div class="choseList">
                  <div class="out">
                      <input type="text" class="n"  v-model="price">
                      <div class="n">
                          <ul class="out">
                              <li class="n"
                              :class="item.class"　
                              v-for="(item,index) in money"
                              @click="choseMoney(index)"
                              >{{item.title}}</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          -->
      <div class="choseMoney MB10 FZ13">
        <p class=" LH45 gry ">倍数：
          <button type="button" @click="multipleBtn(-1)">-</button>
          <input class="multiple-btn" v-model.number="multiple" type="number">
          <button type="button" @click="multipleBtn(1)">+</button>
        </p>
      </div>
      <p class="MB10 LH25 gry FZ13">单注金额：2元 </p>
      <p class="MB10 LH25 gry FZ13">注数：{{total}}注 </p>
      <p class="MB10 LH25 gry FZ13">总额：{{totalMoney}}元 </p>
      <p class="MB10 LH25 gry FZ13">若中奖，单注最高
        <span class="red">{{highest}}</span>元
      </p>
      <p class="H10"></p>
      <p class="border_line"></p>
      <ul class="out LH45 blue FZ14 choseBtn">
        <li class="cancel n" @click="cencel">
          <p class="border_lineLeft"></p>取消</li>
        <li class="ensure n" @click="ensure">确认</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buyHallSetting',
  props: ['total', 'totalMoney', 'fanDianBdw', 'bonusprop', 'bonuspropbase', 'gameFanDian', 'myFanDian', 'award','json', 'json2'],
  data() {
    return {
      // money:[{title:'元',class:'current',id:'1',},{title:'角',class:'',id:'0.1'},{title:'分',class:'',id:'0.01'}],
      money: 2,
      price: 2,
      persent: 0,
      fanli: 0,
      // mode: 1,
      mode: 2,
      highest: 0,
      award2: '',           // 奖励
      actionData: '',
      multiple: 1,          // 倍数
      showBDW: false         // 是否显示调整条
    }
  },
  methods: {
    // choseMoney:function(index){
    //     for(var i=0;i<this.money.length;i++){
    //         this.money[i].class='';
    //     }
    //     this.money[index].class='current';
    //     this.mode=this.money[index].id;
    //     this.$emit("fresh2",{
    //         totalMoney:(this.total*this.price*this.money[index].id).toFixed(2),
    //         price:this.money[index].id*this.price
    //     });
    //     this.highest=(this.award2*this.price*this.money[index].id).toFixed(2);
    // },

    // 倍数调节
    multipleBtn(res) {
      if (res == -1 && this.multiple == 1) {
        this.multiple == 1;
      } else {
        this.multiple = this.multiple + res;
      }
    },
    cencel: function () {
      this.$store.commit('buySetting', false);
    },
    ensure () {
      if (this.multiple <= 0) {
        return layer.open({
          content: '注数不能小于零',
          skin: 'msg',
          time: 3 //2秒后自动关闭
        });
      }
      this.$emit("fresh1", {
        fanDian: this.fanli,
        bonusProp: this.award2,
        mode: this.mode,
        beiShu: this.multiple
      });

      var _self = this;
      console.log('json', _self.json)
      console.log('json2', _self.json2)
      var arrList = [];
      var actionDataStr = []; //空字符串接传给actionData的数字
      for (var i = 0; i < this.json.actionData.length; i++) {
        actionDataStr.push(this.json.actionData[i])
      }
      // 江苏快3 和值-大小单双
      if (this.json.playedGroup == 42 || this.json.playedId == 304) {
        actionDataStr = this.json.actionData.join(' ');
      } else {
        actionDataStr = actionDataStr.toString();
      }
      console.log('this.$store.state.arr:', this.$store.state.arr)
      console.log('this.$store.state.odds:', this.$store.state.odds)
      // 通过isFixed判断该彩种是否为固定赔率，
      // 如果为1，即固定赔率，
      // 如果为2，即动态赔率
      // 如果为0，即可滑动调整赔率
      if (this.$store.state.isFixed == 1) {
        if (this.json.playedId == 352 || this.json.playedId == 353 ||
          this.json.playedId == 354 || this.json.playedId == 356 ||
          this.json.playedId == 357 || this.json.playedId == 344 ||
          this.json.playedId == 345 || this.json.playedId == 346 ||
          this.json.playedId == 347 || this.json.playedId == 348 ||
          this.json.playedId == 349 || this.json.playedId == 350 ||
          this.json.playedId == 351) {
          // 连码-中二  连码-三全中 连码二全中 连码-特串 连肖连尾。。。
          // 赔率从低至高排序，
          this.$store.state.odds.sort()
          arrList.push({
            // "fanDian": this.json2.fanDian,
            "fanDian": this.fanli,
            "bonusProp": this.$store.state.odds[0],
            // "mode": this.json2.mode * 2,
            "mode": this.mode,
            // "beiShu": this.json2.beiShu,
            "beiShu": this.multiple,
            "actionData": actionDataStr,
            "actionNum": this.$store.state.total,
            "weiShu": this.json.weiShu,
            "playedGroup": this.json.playedGroup,
            "playedId": this.json.playedId,
            "type": this.json.type
          });
        } else {
          for (var i = 0; i < this.$store.state.arr.length; i++) {
            arrList.push({
              // "fanDian": this.json2.fanDian,
              "fanDian": this.fanli,
              "bonusProp": this.$store.state.odds[i],
              // "mode": this.json2.mode * 2,
              "mode": this.mode,
              // "beiShu": this.json2.beiShu,
              "beiShu": this.multiple,
              "actionData": this.$store.state.arr[i],
              "actionNum": 1,                     // 固定注数都为1
              "weiShu": this.json.weiShu,
              "playedGroup": this.json.playedGroup,
              "playedId": this.json.playedId,
              "type": this.json.type
            })
          }
        }
      } else if (this.$store.state.isFixed == 2) {
        arrList.push({
          // "fanDian": this.json2.fanDian,
          "fanDian": this.fanli,
          "bonusProp": this.$store.state.changeOdds,
          // "mode": this.json2.mode * 2,
          "mode": this.mode,
          // "beiShu": this.json2.beiShu,
          "beiShu": this.multiple,
          "actionData": actionDataStr,
          "actionNum": this.json.actionNum,
          "weiShu": this.json.weiShu,
          "playedGroup": this.json.playedGroup,
          "playedId": this.json.playedId,
          "type": this.json.type
        });
      } else {  // isFixed == 0
        arrList.push({
          // "fanDian": this.json2.fanDian,
          "fanDian": this.fanli,
          // "bonusProp": this.json2.bonusProp,
          "bonusProp": this.award2,
          // "mode": this.json2.mode * 2,
          "mode": this.mode,
          // "beiShu": this.json2.beiShu,
          "beiShu": this.multiple,
          "actionData": actionDataStr,
          "actionNum": this.json.actionNum,
          "weiShu": this.json.weiShu,
          "playedGroup": this.json.playedGroup,
          "playedId": this.json.playedId,
          "type": this.json.type
        });
      }
      // 临时存储下vuex内的arrList数组
      var arrListTemporary = _self.$store.state.arrList
      // 将投注数据拼接在vuex的arrList中
      arrList = arrListTemporary.concat(arrList)
      // 将拼接后的数组提交回vuex
      this.$store.commit('arrList', arrList)
      console.log('state的arrList:', _self.$store.state.arrList)

      // betsDisplay保存用于显示在支付页面的数据
      // 将当前的选号、注数、金额保存在临时对象中
      var betsTemporary = {
        actionDate: this.json.actionData,
        total: this.total,
        totalMoney: this.totalMoney
      }
      // 临时存储下vuex内的betsDisplay数组
      var betsDisplayTemporary = _self.$store.state.betsDisplay
      // 将投注数据拼接在vuex的betsDisplay中
      var betsDisplay = betsDisplayTemporary.concat(betsTemporary)
      // 将拼接后的数组提交回vuex
      this.$store.commit('betsDisplay', betsDisplay)
      console.log('betsDisplay', _self.$store.state.betsDisplay)

      this.$store.commit('buyCheck', true);
      this.$store.commit('buySetting', false);
    }
  },
  watch: {
    persent: function (val) {
      if (this.fanDianBdw == 0) {
        this.fanli = (this.fanDianBdw * val / 100).toFixed(2);
      } else {
        this.fanli = (this.fanDianBdw * val / 100).toFixed(2);
      }
    },
    fanli: function (val) {
      var b = parseFloat((this.bonusprop - this.bonuspropbase) / this.gameFanDian * this.myFanDian);
      var c = parseFloat(this.bonuspropbase);
      var a = b + c - parseFloat((this.bonusprop - this.bonuspropbase) * val / this.gameFanDian);
      this.award2 = a.toFixed(2);
    },
    myFanDian: function (val) {
      var b = parseFloat((this.bonusprop - this.bonuspropbase) / this.gameFanDian * val);
      var c = parseFloat(this.bonuspropbase);
      var a = b + c - parseFloat((this.bonusprop - this.bonuspropbase) * this.fanli / this.gameFanDian);
      this.award2 = a.toFixed(2);
    },
    price: function (val) {
      this.$emit("fresh2", {
        totalMoney: (this.total * this.price * this.mode * this.multiple).toFixed(2),
        price: this.mode * this.price
      });
      this.highest = (this.award2 * this.multiple * val * this.mode / 2.0).toFixed(2);
    },
    award2: function (val) {
      this.highest = (val * this.price * this.multiple * this.mode / 2.0).toFixed(2);
    },
    award: function(val) {
      this.highest = (val * this.price * this.multiple * this.mode / 2.0).toFixed(2);
    },
    // award3: function(val) {
    //   this.highest = (val * this.price * this.multiple * this.mode / 2.0).toFixed(2);
    // },
    bonusprop: function (val) {
      var b = parseFloat((val - this.bonuspropbase) / this.gameFanDian * this.myFanDian);
      var c = parseFloat(this.bonuspropbase);
      var a = b + c - parseFloat((val - this.bonuspropbase) * this.fanli / this.gameFanDian);
      this.award2 = a.toFixed(2);
    },
    fanDianBdw: function (val) {
      if (val != 0 && val != '0') {
        this.showBDW = true;
      }
    },
    multiple: function (val) {
      if (val < 0) {
        this.multiple = 1;
      }
      this.$emit("fresh2", {
        totalMoney: (this.total * this.price * val).toFixed(2),
        price: this.price
      });
      if(this.award) {
        this.highest = this.award * this.multiple;
      } else {
        this.highest = this.award2 * this.multiple;
      }
    }
  },
  mounted: function () {
    this.highest = this.award * this.multiple;
    if (this.fanDianBdw != 0 && this.fanDianBdw != '0') {
      this.showBDW = true;
    }
    var _self = this;
    (function ($, window, document, undefined) {
      'use strict';
      var jRange = function () {
        return this.init.apply(this, arguments);
      };
      jRange.prototype = {
        defaults: {
          onstatechange: function () { },
          isRange: false,
          showLabels: true,
          showScale: true,
          step: 1,
          format: '%s',
          theme: 'theme-green',
          width: 300,
          disable: false
        },
        template: '<div class="slider-container">\
                <div class="back-bar">\
                          <div class="selected-bar"></div>\
                          <div class="pointer low"></div><div class="pointer-label">123456</div>\
                          <div class="pointer high"></div><div class="pointer-label">456789</div>\
                          <div class="clickable-dummy"></div>\
                      </div>\
              </div>',
        init: function (node, options) {
          this.options = $.extend({}, this.defaults, options);
          this.inputNode = $(node);
          this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : this.options.from);
          this.domNode = $(this.template);
          this.domNode.addClass(this.options.theme);
          this.inputNode.after(this.domNode);
          this.domNode.on('change', this.onChange);
          this.pointers = $('.pointer', this.domNode);
          this.lowPointer = this.pointers.first();
          this.highPointer = this.pointers.last();
          this.labels = $('.pointer-label', this.domNode);
          this.lowLabel = this.labels.first();
          this.highLabel = this.labels.last();
          this.scale = $('.scale', this.domNode);
          this.bar = $('.selected-bar', this.domNode);
          this.clickableBar = this.domNode.find('.clickable-dummy');
          this.interval = this.options.to - this.options.from;
          this.render();

        },
        render: function () {
          // Check if inputNode is visible, and have some width, so that we can set slider width accordingly.
          if (this.inputNode.width() === 0 && !this.options.width) {
            console.log('jRange : no width found, returning');
            return;
          } else {
            this.domNode.width(this.options.width || this.inputNode.width());
            this.inputNode.hide();
          }

          if (this.isSingle()) {
            this.lowPointer.hide();
            this.lowLabel.hide();
          }
          if (!this.options.showLabels) {
            this.labels.hide();
          }
          this.attachEvents();
          if (this.options.showScale) {
            this.renderScale();
          }
          this.setValue(this.options.value);
        },
        isSingle: function () {
          if (typeof (this.options.value) === 'number') {
            return true;
          }
          return (this.options.value.indexOf(',') !== -1 || this.options.isRange) ?
            false : true;
        },
        attachEvents: function () {
          this.clickableBar.click($.proxy(this.barClicked, this));
          this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
          this.pointers.bind('dragstart', function (event) {
            event.preventDefault();
          });

        },
        onDragStart: function (e) {
          if (this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
            return;
          }
          e.stopPropagation();
          e.preventDefault();
          var pointer = $(e.target);
          this.pointers.removeClass('last-active');
          pointer.addClass('focused last-active');
          this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
          $(document).on('mousemove.slider touchmove.slider', $.proxy(this.onDrag, this, pointer));
          $(document).on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(this.onDragEnd, this));

        },
        onDrag: function (pointer, e) {
          e.stopPropagation();
          e.preventDefault();

          if (e.originalEvent.touches && e.originalEvent.touches.length) {
            e = e.originalEvent.touches[0];
          } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
            e = e.originalEvent.changedTouches[0];
          }
          var position = e.clientX - this.domNode.offset().left;
          this.domNode.trigger('change', [this, pointer, position]);

        },
        onDragEnd: function (e) {
          this.pointers.removeClass('focused');
          this.labels.removeClass('focused');
          _self.persent = $($('.pointer-label')[1]).text();

          $(document).off('.slider');
        },
        barClicked: function (e) {
          if (this.options.disable) return;
          var x = e.pageX - this.clickableBar.offset().left;
          if (this.isSingle())
            this.setPosition(this.pointers.last(), x, true, true);
          else {
            var pointer = Math.abs(parseInt(this.pointers.first().css('left'), 10) - x + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css('left'), 10) - x + this.pointers.first().width() / 2) ?
              this.pointers.first() : this.pointers.last();
            this.setPosition(pointer, x, true, true);
          }
          _self.persent = $($('.pointer-label')[1]).text();
        },
        onChange: function (e, self, pointer, position) {
          var min, max;
          if (self.isSingle()) {
            min = 0;
            max = self.domNode.width();
          } else {
            min = pointer.hasClass('high') ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
            max = pointer.hasClass('low') ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width();
          }
          var value = Math.min(Math.max(position, min), max);
          self.setPosition(pointer, value, true);

        },
        setPosition: function (pointer, position, isPx, animate) {
          var leftPos,
            lowPos = this.lowPointer.position().left,
            highPos = this.highPointer.position().left,
            circleWidth = this.highPointer.width() / 2;
          if (!isPx) {
            position = this.prcToPx(position);
          }
          if (pointer[0] === this.highPointer[0]) {
            highPos = Math.round(position - circleWidth);
          } else {
            lowPos = Math.round(position - circleWidth);
          }
          pointer[animate ? 'animate' : 'css']({
            'left': Math.round(position - circleWidth)
          });
          if (this.isSingle()) {
            leftPos = 0;
          } else {
            leftPos = lowPos + circleWidth;
          }
          this.bar[animate ? 'animate' : 'css']({
            'width': Math.round(highPos + circleWidth - leftPos),
            'left': leftPos
          });
          this.showPointerValue(pointer, position, animate);
          this.isReadonly();
        },
        // will be called from outside
        setValue: function (value) {
          var values = value.toString().split(',');
          this.options.value = value;
          var prc = this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
          if (this.isSingle()) {
            this.setPosition(this.highPointer, prc[1]);
          } else {
            this.setPosition(this.lowPointer, prc[0]);
            this.setPosition(this.highPointer, prc[1]);
          }
        },
        renderScale: function () {
          var s = this.options.scale || [this.options.from, this.options.to];
          var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
          var str = '';
          for (var i = 0; i < s.length; i++) {
            str += '<span style="left: ' + i * prc + '%">' + (s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '') + '</span>';
          }
          this.scale.html(str);

          $('ins', this.scale).each(function () {
            $(this).css({
              marginLeft: -$(this).outerWidth() / 2
            });
          });

        },
        getBarWidth: function () {
          var values = this.options.value.split(',');
          if (values.length > 1) {
            return parseInt(values[1], 10) - parseInt(values[0], 10);
          } else {
            return parseInt(values[0], 10);
          }
        },
        showPointerValue: function (pointer, position, animate) {
          var label = $('.pointer-label', this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();

          var text;
          var value = this.positionToValue(position);
          if ($.isFunction(this.options.format)) {
            var type = this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
            text = this.options.format(value, type);
          } else {
            text = this.options.format.replace('%s', value);
          }

          var width = label.html(text).width(),
            left = position - width / 2;
          left = Math.min(Math.max(left, 0), this.options.width - width);
          label[animate ? 'animate' : 'css']({
            left: left
          });
          this.setInputValue(pointer, value);

        },
        valuesToPrc: function (values) {
          var lowPrc = ((values[0] - this.options.from) * 100 / this.interval),
            highPrc = ((values[1] - this.options.from) * 100 / this.interval);
          return [lowPrc, highPrc];
        },
        prcToPx: function (prc) {
          return (this.domNode.width() * prc) / 100;
        },
        positionToValue: function (pos) {
          var value = (pos / this.domNode.width()) * this.interval;
          value = value + this.options.from;

          return Math.round(value / this.options.step) * this.options.step;
        },
        setInputValue: function (pointer, v) {
          // if(!isChanged) return;
          if (this.isSingle()) {
            this.options.value = v.toString();
          } else {
            var values = this.options.value.split(',');
            if (pointer.hasClass('low')) {
              this.options.value = v + ',' + values[1];
            } else {
              this.options.value = values[0] + ',' + v;
            }
          }
          if (this.inputNode.val() !== this.options.value) {
            this.inputNode.val(this.options.value);
            this.options.onstatechange.call(this, this.options.value);
          }
        },
        getValue: function () {
          return this.options.value;
        },
        isReadonly: function () {
          this.domNode.toggleClass('slider-readonly', this.options.disable);
        },
        disable: function () {
          this.options.disable = true;
          this.isReadonly();
        },
        enable: function () {
          this.options.disable = false;
          this.isReadonly();
        },
        toggleDisable: function () {
          this.options.disable = !this.options.disable;
          this.isReadonly();
        }
      };

      var pluginName = 'jRange';
      // A really lightweight plugin wrapper around the constructor,
      // preventing against multiple instantiations
      $.fn[pluginName] = function (option) {
        var args = arguments,
          result;
        this.each(function () {
          var $this = $(this),
            data = $.data(this, 'plugin_' + pluginName),
            options = typeof option === 'object' && option;
          if (!data) {
            $this.data('plugin_' + pluginName, (data = new jRange(this, options)));
            $(window).resize(function () {
              data.setValue(data.getValue());
            }); // Update slider position when window is resized to keep it in sync with scale
          }
          // if first argument is a string, call silimarly named function
          // this gives flexibility to call functions of the plugin e.g.
          //   - $('.dial').plugin('destroy');
          //   - $('.dial').plugin('render', $('.new-child'));
          if (typeof option === 'string') {
            result = data[option].apply(data, Array.prototype.slice.call(args, 1));
          }
        });
        // To enable plugin returns values
        return result || this;
      };
    })(jQuery, window, document);
    $('.single-slider').jRange({
      from: 0,
      to: 100,
      step: 1,
      scale: [0, 25, 50, 75, 100],
      format: '%s',
      width: 260,
      showLabels: true,
      showScale: true
    });
  }
}
</script>
<style scoped>
.choseMoney {
  position: relative;
  height: 45px;
}

.choseMoney button {
  width: 30px;
  height: 30px;
  line-height: 4px;
  border: 1px solid gray;
  background-color: #fff;
  font-size: 20px;
  margin: 0 10px;
}

.choseBtn li {
  width: 50%;
  text-align: center;
  position: relative;
}

.choseList {
  position: absolute;
  right: 0;
  top: 8px;
  height: 25px;
  border: solid 1px #cccccc;
  background: #e6e6e6;
  line-height: 25px;
}

.choseList input {
  width: 60px;
  font-size: 14px;
  color: #000;
  text-align: center;
  background: #fff;
  height: 25px;
}

.multiple-btn {
  width: 30px;
}

.choseList ul li {
  width: 25px;
  height: 25px;
  border-left: solid 1px #cccccc;
  font-size: 13px;
  color: #666;
  text-align: center;
}

.choseList ul li.current {
  background: #fa7a43;
  color: #fff;
}

.buyHallSetting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
}

.buyHallSetting .con {
  width: 300px;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  margin-top: 35%;
}
</style>

