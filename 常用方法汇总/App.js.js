import {
    dateFormat,
    numberComma
} from 'vux';
import _ from 'lodash';
import Native from './Native';
import {
    __isUndefined
} from './helper';
window.App = {
    Native,

    _emitHook(vm, hook) {
        const _emit = _vm => {
            const child = _vm.$children;
            const handlers = _vm.$options[hook];
            if (handlers) {
                if (handlers.apply) {
                    handlers.call(_vm, ...[...arguments].slice(2));
                } else {
                    for (let i = 0, j = handlers.length; i < j; i++) {
                        handlers[i].call(_vm, ...[...arguments].slice(2));
                    }
                }
            }
            if (_vm._hasHookEvent) {
                _vm.$emit('hook:' + hook);
            }
            if (child.length) {
                for (let i = 0, j = child.length; i < j; i++) {
                    _emit(child[i]);
                }
            }
        };
        _emit(vm);
    },
    /**
     * @desc - 获取 url 上的全部传参并转成对象
     * @example App.parseQueryString() => {}
     */
    parseQueryString(queryString = window.location.search) {
        let kv;
        let result = {};
        let bool = {
            true: true,
            false: false
        };
        let searchStr =
            queryString.indexOf('?') === 0 ? queryString.substr(1) : queryString;
        searchStr = searchStr ? searchStr.split('&') : '';
        for (let i = 0; i < searchStr.length; i++) {
            kv = searchStr[i].split('=');
            kv[1] = decodeURIComponent(kv[1]);
            kv[1] = __isUndefined(bool[kv[1]]) ? kv[1] : bool[kv[1]];
            result[kv[0]] = kv[1];
        }
        return result;
    },

    /**
     * @desc - 全局绑定事件
     * @param  {String}   evts 事件类型，多个事件用空格分隔
     * @example App.on('xxxx', fn)
     */
    on(evts, fn) {
        evts.split(/\s+/g).forEach(eventName => {
            document.addEventListener(eventName, fn, false);
        });
    },

    /**
     * @desc - 全局移除事件
     * @param  {String}   evt    事件类型
     * @example App.off('xxxx', fn)
     */
    off(evt, fn) {
        document.removeEventListener(evt, fn, false);
    },

    /**
     * @desc - 全局触发绑定事件
     * @param  {String}   evt    事件名
     * @param  {Object}   data   需要传递的参数
     * @example App.trigger('xxxx', {})
     */
    trigger(evtName, data = {}) {
        let evt = document.createEvent('Events');
        evt.initEvent(evtName, false, true);
        evt.data = data;
        document.dispatchEvent(evt);
        return evt;
    },

    /**
     * @desc - 获取当前的系统及所支持的css前缀
     * @example App.device => { cssPre: webkit || '', os: ios ||  android}
     */
    device: {
        alipayClient: navigator.userAgent.indexOf('AlipayClient') >= 0,
        cssPre: document.body.style.webkitBorderImage !== undefined ? 'webkit' : '',
        os: navigator.userAgent.indexOf('iPhone') > -1 ? 'ios' : 'android'
    },
    /**
     * @desc - 脱敏账号、手机号、证件号或者中文名字
     * @param {val: string} - 要转换的字符串
     * @example App.protect('13800138000') => 138****8000
     * @example App.protect('张三') => 张**
     */
    protect(val) {
        const REGEXP_MOBILE = /^(13[0-9]|15[7-9]|15[0-6]|18[5-9]|180|1[6-7]6)[0-9]{8}$/;
        const REGEXP_CNINA = /[\u4e00-\u9fa5]+$/;
        const MATCH_ACCOUNT = /^(\d{4})\d+(\d{4}|\d{3}[a-zA-Z])$/;
        const MATCH_MOBILE = /^(\d{3})\d+(\d{4}$)/;
        const MATCH_CNINA = /^([\u4e00-\u9fa5])[\u4e00-\u9fa5]+$/;

        if (val.length > 8) {
            return String(val).replace(
                REGEXP_MOBILE.test(val) ? MATCH_MOBILE : MATCH_ACCOUNT,
                ($1, $2, $3) => $2 + '****' + $3
            );
        } else if (REGEXP_CNINA.test(val)) {
            return val.replace(MATCH_CNINA, ($1, $2, $3) => $2 + '**');
        } else {
            return val;
        }
    },

    /**
     * @desc - 格式化日期
     * @param {date: string} - 要转换时间戳
     * @param {fmt: string} - 要转换成的格式
     * @example App.dateFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss') => 2017-12-19 11:30:16
     */
    dateFormat,
    /**
     * @desc - 获取n个月前的日期
     * @param {startDate: string} - 起始日期对象
     * @param {n: number} - 月数
     * @example App.getDateByMonth(new Date(), 3)
     */
    getDateByMonth(startDate, n) {
        let year = startDate.getFullYear();
        let month = startDate.getMonth() - n;
        let date = startDate.getDate();

        if (month < 0) {
            year = year - 1;
            month = month + 11;
        }

        return new Date(year, month, date);
    },
    /**
     * @desc - 跳转到结果页
     * @param {opts.docTitle: String} - 页面标题，默认取document.title
     * @param {opts.type: String} - 结果页类型，默认success, 取值有success，error
     * @param {opts.title: String} - 结果标题，默认值'恭喜您，操作成功'
     * @param {opts.code: String} - 错误码，type为error时传
     * @param {opts.msg: String} - 成功或失败信息
     * @param {opts.backUrl: String} - 点击返回按钮回到的页面url, 不写默认返回上一级
     * @example App.pushResult({type: 'error', title: '操作失败', code: 'EF2345', 'msg': ''})
     */
    pushResult(opts) {
        const defaults = {
            docTitle: document.title,
            type: 'success',
            title: '',
            code: '',
            msg: '',
            backUrl: ''
        };

        opts = Object.assign({}, defaults, opts);

        Native.pushWindow({
            url: '/result/index/index.html',
            data: opts,
            param: {
                defaultTitle: opts.docTitle
            }
        });
    },

    /*
     * @desc - 跳转协议页面
     * @param {opts.type} 协议类型
     * @param {opts.prdCde} 产品代码
     *
     */
    pushProtocol(opts) {

        return new Promise((resolve) => {
            App.Native.rpc({
                operationType: 'com.MB309009',
                data: {
                    prdCode: opts.prdCde,
                    financeFileType: opts.type
                }
            }).then(r => {
                if (r.errorCode !== '0') {
                    App.Native.alert(r.errorMsg);
                    return;
                }
                App.Native.pushWindowOnline({
                    url: r.data.fasDFStUrl,
                    param: {
                        defaultTitle: document.title
                    }
                })
            });
        });

    },

    /*
     * @desc - 跳转协议页面   **********资管请求PDF文件************
     * @param {opts.type} 协议类型
     * @param {opts.prdCde} 产品代码
     *
     */
    salepushProtocol(opts) {
        return new Promise((resolve) => {
            App.Native.rpc({
                operationType: 'com.MB706634',
                data: {
                    zgProCode: opts.zgProCode,
                    turnPageBeginPos: opts.turnPageBeginPos,
                    turnPageShowNum: opts.turnPageShowNum,
                    zgDate: opts.zgDate,
                    zgFiletype: opts.zgFiletype,
                    zgFileId: opts.zgFileId
                }
            }).then(r => {
                if (r.errorCode !== '0') {
                    App.Native.alert(r.errorMsg);
                    return;
                } else if (r.data.zgUrlList.length > 0) {
                    this.data = r.data.zgUrlList
                }

            });
        })
    },
    /**
     * @desc - 格式化数字
     * @param {no: string} - 需要格式化的数字
     * @param {split: string} - 需要分割的标志 默认是空格
     * @example App.numberFormat('19990102', '/') => 1999/01/02
     * @example App.numberFormat('6222023301231050271') => 6222 0233 0123 1050 271
     */
    numberFormat(no = '', split = ' ') {
        if (!no) return;

        if (no.length == 8) {
            return no.replace(
                /(\d{4})(\d{2})(\d{2})/,
                '$1' + split + '$2' + split + '$3'
            );
        } else {
            return no.replace(/(\d{4})(?=\d)/g, '$1' + split);
        }
    },

    /**
     * @desc - 格式化金额，保留2位小数，四舍五入，长度不够自动补0
     * @param { cash: string } - 需要格式化的金额
     * @example App.cashFormat(9527.127) => 9527.13
     * @example App.cashFormat(9527) => 9527.00
     */
    cashFormat(cash = 0, len = 2) {
        return App.numberRound(cash, len);
    },

    /**
     * @desc  检查字符串是否为合法的手机号码
     * @param {number: string }  - 需要检验的手机号码
     * @returns {boolean}  是否为合法手机号码
     * @example let m1 = '13112345678';
     * App.legalMobile(m1) => true;
     * let m2 = '15312345678';
     * App.legalMobile(m2) => false;
     */
    legalMobile(string) {
        // let REGEXP_PHONE = new RegExp(/^(13[0-9]|15[5-9]|15[0-2]|18[4-9])[0-9]{8}$/)
        let REGEXP_PHONE = new RegExp(/^1\d{10}$/);
        return REGEXP_PHONE.test(string);
    },

    /**
     * @desc  检查字符串是否为正整数
     * @param { number: string }  - 需要检验的字符串
     * @example let number = '32';
     * App.legalInteger(number) => true;
     */
    legalInteger(string) {
        let REGEXP_INTEGER = new RegExp(/^[0-9]+$/);
        return REGEXP_INTEGER.test(string);
    },
    /**
     * @desc  检查字符串是否为合法的身份证号码
     * @param {id: string} 需要校验的身份证号码
     * @example let id = '430421197710177894';
     * App.legalIDNumber(id) => true;
     */
    legalIdNumber(id) {
        let AREA_CODE = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外'
        };

        switch (id.length) {
            case 15:
            case 18:
                {
                    break;
                }
            default:
                {
                    return false;
                }
        }

        let testInt = id.length == 15 ? id : id.substr(0, 17);
        if (!_.isInteger(Number(testInt))) {
            return false;
        }

        let areaCode = parseInt(id.substr(0, 2));
        if (!AREA_CODE[areaCode]) {
            return false;
        }

        let birthDay = id.length == 15 ? '19' + id.substr(6, 6) : id.substr(6, 8);
        if (!_.isInteger(Number(birthDay))) {
            return false;
        }

        if (id.length == 18) {
            let testNumber =
                (parseInt(id.charAt(0)) + parseInt(id.charAt(10))) * 7 +
                (parseInt(id.charAt(1)) + parseInt(id.charAt(11))) * 9 +
                (parseInt(id.charAt(2)) + parseInt(id.charAt(12))) * 10 +
                (parseInt(id.charAt(3)) + parseInt(id.charAt(13))) * 5 +
                (parseInt(id.charAt(4)) + parseInt(id.charAt(14))) * 8 +
                (parseInt(id.charAt(5)) + parseInt(id.charAt(15))) * 4 +
                (parseInt(id.charAt(6)) + parseInt(id.charAt(16))) * 2 +
                parseInt(id.charAt(7)) * 1 +
                parseInt(id.charAt(8)) * 6 +
                parseInt(id.charAt(9)) * 3;
            if (id.charAt(17) != '10X98765432'.charAt(testNumber % 11)) {
                return false;
            }
        }

        return true;
    },

    /**
     * @desc  密码检验，检验的规则是，数字，字母，特殊字符至少两种以上，长度8 - 12位之间
     * @param {paw: string} 需要校验的密码
     * @example App.legalPassword(paw) => true || false
     */
    legalPassword(paw) {
        let specialWord = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]+?/;
        let numberWord = /\d+?/;
        let englishWord = /[a-zA-Z]+?/;
        paw = paw.replace(/\s+/, '');

        if (paw.length < 8 || paw.length > 12) return false;
        let res = [specialWord, numberWord, englishWord].filter(item =>
            item.test(paw)
        );
        return res.length >= 2;
    },

    /**
     * @desc  格式化数字，并且四舍五入,长度不够的自动补0
     * @param {num: string, default:0} 需要转格式的数字
     * @param {len: number, default:2} 需要保留多少位小数
     */
    numberRound(num = 0, len = 2) {
        const pow = Math.pow(10, len + 1);
        const abs = p => Math.abs(p);
        const s = p => String(p);
        const f = p => p / pow;
        const tf = p => Number(p).toFixed(len);
        const minus = /^\-/.test(s(num));
        let [integer, point] = s(num).split('.');

        if (!!!+point || point.length <= len) return tf(num);

        point = s(point).substr(0, len + 1);

        if (point.length <= len) {
            let pre = point.length - len < 0 ? point.length - len : 1;
            point = point + '0'.repeat(abs(pre));
        }

        point =
            abs(integer) + (point[point.length - 1] >= 5 ? f(+point + 1) : f(point));

        return tf(minus ? 0 - point : point);
    },
    /*
     @desc 获取设备id
    */
    getDeviceId() {
        return new Promise(resolve => {
            Native.getDeviceInfo().then(res => {
                let deviceStr;
                if (this.device.os == 'android') {
                    deviceStr = `${res.imei}|${res.androidId=='' || res.androidId=='9774d56d682e549c' || res.androidId.length<16 ? '0' : res.androidId.toUpperCase()}|${res.mac=='' || res.mac=='000000000000' || res.mac=='020000000000' ? '0' :res.mac.toUpperCase()}|${this.vm.$store.getters.getUserInfo.session_cifNo || '' }|`
                } else {
                    deviceStr = `${res.deviceId}${this.vm.$store.getters.getUserInfo.session_cifNo}`
                }
                resolve(deviceStr);
            })
        })
    },

    /**
     * @desc 验证邮箱格式
     *
     */
    checkEmail(res) {
        let ab = /^([0-9a-zA-Z\.])+[@]{1}([0-9a-zA-Z])+[\.]{1}([0-9a-zA-Z\.])*?([0-9a-zA-Z])+$/;
        return ab.test(res)
    },
     /**
     * @method verify
     * @desc 弹出账号核实框
     * @param {session_customerId: string, cardNumber:string}
     * @returns {backUrl: '' } 跳转成功页面,点击关闭要跳转的页面
     * @example App.verify().then( r => {暂不核实}).catch(err => {没有需要核实的卡号})
     *
     */
    verify(opts) {
      const {session_customerId, cardNo }= this.vm.$store.getters.getUserInfo;
      const defaults = {
        session_customerId: session_customerId,
        cardNo: cardNo,
        backUrl: ''
      };
      opts = Object.assign({}, defaults, opts);

      let p = new Promise((resolve, reject) => {
        Native.rpc({
          operationType: "com.MB610006",
          showError: true,
          data: {
            cardNo: '',
            custNo: opts.session_customerId//网银客户号
          }
        }).then(s => {
          //需要身份验证
          console.log(opts.cardNo + "交易账号")
          let Arr = s.data.suppressedCardList
          let isExit = Arr.some((item) =>{
            return item.cardNo == opts.cardNo
          })
          console.log(isExit)
          if(isExit){
            console.log('为了保证账户安全，需加强身份验')
            Native.confirm({
              title: "提示",
              message:
                "您的账户长时间未进行交易，为了保证账户安全，需加强身份验证，请对以下信息进行核实。",
              okButton: "现在核实",
              cancelButton: "暂不核实"
            }).then(ok => {
              console.log('123')
              console.log(ok);
              let cardNoArr= JSON.stringify(s.data.suppressedCardList);
              resolve([ok, cardNoArr])
            });
          }else{
            reject()
          }
        });
      })
      let p2 = new Promise((resolve, reject) => {
        p.then(([r, cardNoArr]) => {
          if (r.ok == true) {
            console.log("现在核实"+ cardNoArr);
            App.Native.pushWindow({
              url: "/financing/financialPurchase/identityVerification.html",
              data: {
                list: cardNoArr,
                backUrl: opts.backUrl
              }
            });
          } else {
            console.log("暂不核实");
            resolve();
          }
        }).catch(() => {
          console.log('88')
          reject()
        })
      })
      return p2;

    },
  remoteLog(eventId, params = {}) {
    const keys = Object.keys(params);
    const paramStr = keys.map(el => {
      return `${el}=${params[el]}`
    }).join('^');
    Native.remoteLog(eventId, paramStr);

  }
}
