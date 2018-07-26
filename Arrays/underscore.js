// Underscore.js 1.8.2
// http://underscorejs.org
//（c）2009-2015 Jeremy Ashkenas，DocumentCloud和调查记者和编辑
// Underscore可以在MIT许可下自由分发。

（function（）{

    //基线设置
    // --------------
  
    //在浏览器中建立根对象，`window`，或在服务器上建立`exports`。
    var root = this;
  
    //保存`_`变量的先前值。
    var previousUnderscore = root._;
  
    //在缩小（但不是gzip）的版本中保存字节：
    var ArrayProto = Array.prototype，ObjProto = Object.prototype，FuncProto = Function.prototype;
  
    //创建快速参考变量，以便快速访问核心原型。
    VAR
      push = ArrayProto.push，
      slice = ArrayProto.slice，
      toString = ObjProto.toString，
      hasOwnProperty = ObjProto.hasOwnProperty;
  
    //我们希望使用的所有** ECMAScript 5 **本机函数实现
    //在这里宣布。
    VAR
      nativeIsArray = Array.isArray，
      nativeKeys = Object.keys，
      nativeBind = FuncProto.bind，
      nativeCreate = Object.create;
  
    //代理原型交换的裸函数参考。
    var Ctor = function（）{};
  
    //创建对Underscore对象的安全引用，以供下面使用。
    var _ = function（obj）{
      if（obj instanceof _）return obj;
      if（！（this instanceof _））return new _（obj）;
      this._wrapped = obj;
    };
  
    //使用导出** Node.js **的Underscore对象
    //旧的`require（）`API的向后兼容性。如果我们在
    //浏览器，将`_`添加为全局对象。
    if（typeof exports！=='undefined'）{
      if（typeof module！=='undefined'&& module.exports）{
        exports = module.exports = _;
      }
      exports._ = _;
    } else {
      root._ = _;
    }
  
    // 当前版本。
    _.VERSION ='1.8.2';
  
    //返回高效（对于当前引擎）版本的内部函数
    //传入的回调函数，在其他Underscore中重复应用
    // 功能。
    var optimizeCb = function（func，context，argCount）{
      if（context === void 0）return func;
      switch（argCount == null？3：argCount）{
        案例1：返回函数（值）{
          return func.call（context，value）;
        };
        案例2：返回函数（值，其他）{
          return func.call（context，value，other）;
        };
        case 3：return函数（value，index，collection）{
          return func.call（context，value，index，collection）;
        };
        情况4：返回函数（累加器，值，索引，集合）{
          return func.call（context，accumulator，value，index，collection）;
        };
      }
      return function（）{
        return func.apply（context，arguments）;
      };
    };
  
    //一个主要是内部函数，用于生成可以应用的回调
    //对集合中的每个元素，返回所需的结果
    // identity，任意回调，属性匹配器或属性访问器。
    var cb = function（value，context，argCount）{
      if（value == null）return _.identity;
      if（_.isFunction（value））返回optimizeCb（value，context，argCount）;
      if（_.isObject（value））返回_.matcher（value）;
      return _.property（value）;
    };
    _.iteratee = function（value，context）{
      return cb（value，context，Infinity）;
    };
  
    //用于创建分配器函数的内部函数。
    var createAssigner = function（keysFunc，undefinedOnly）{
      return函数（obj）{
        var length = arguments.length;
        if（length <2 || obj == null）return obj;
        for（var index = 1; index <length; index ++）{
          var source = arguments [index]，
              keys = keysFunc（source），
              l = keys.length;
          for（var i = 0; i <l; i ++）{
            var key = keys [i];
            if（！undefinedOnly || obj [key] === void 0）obj [key] = source [key];
          }
        }
        返回obj;
      };
    };
  
    //用于创建从另一个继承的新对象的内部函数。
    var baseCreate = function（prototype）{
      if（！_。isObject（prototype））return {};
      if（nativeCreate）返回nativeCreate（prototype）;
      Ctor.prototype =原型;
      var result = new Ctor;
      Ctor.prototype = null;
      返回结果;
    };
  
    // Helper用于确定集合的集合方法
    //应该作为数组或对象迭代
    //相关：http：//people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    var MAX_ARRAY_INDEX = Math.pow（2,53） -  1;
    var isArrayLike = function（collection）{
      var length = collection！= null && collection.length;
      return typeof length =='number'&& length> = 0 && length <= MAX_ARRAY_INDEX;
    };
  
    //集合函数
    // --------------------
  
    //基石，“每个”实现，又称“forEach”。
    //处理除了数组之外的原始对象。对待所有
    //稀疏数组 - 好像它们很密集。
    _.each = _.forEach = function（obj，iteratee，context）{
      iteratee = optimizeCb（iteratee，context）;
      var i，length;
      if（isArrayLike（obj））{
        for（i = 0，length = obj.length; i <length; i ++）{
          iteratee（obj [i]，i，obj）;
        }
      } else {
        var keys = _.keys（obj）;
        for（i = 0，length = keys.length; i <length; i ++）{
          iteratee（obj [keys [i]]，keys [i]，obj）;
        }
      }
      返回obj;
    };
  
    //返回将iteratee应用于每个元素的结果。
    _.map = _.collect = function（obj，iteratee，context）{
      iteratee = cb（iteratee，context）;
      var keys =！isArrayLike（obj）&& _.keys（obj），
          length =（keys || obj）.length，
          results = Array（length）;
      for（var index = 0; index <length; index ++）{
        var currentKey = keys？keys [index]：index;
        results [index] = iteratee（obj [currentKey]，currentKey，obj）;
      }
      返回结果;
    };
  
    //创建一个向左或向右迭代的缩减函数。
    function createReduce（dir）{
      //使用arguments.length优化迭代器函数
      //在主函数中将deoptimize，见＃1991。
      函数迭代器（obj，iteratee，memo，keys，index，length）{
        for（; index> = 0 && index <length; index + = dir）{
          var currentKey = keys？keys [index]：index;
          memo = iteratee（memo，obj [currentKey]，currentKey，obj）;
        }
        返回备忘录;
      }
  
      return函数（obj，iteratee，memo，context）{
        iteratee = optimizeCb（iteratee，context，4）;
        var keys =！isArrayLike（obj）&& _.keys（obj），
            length =（keys || obj）.length，
            index = dir> 0？0：长度 -  1;
        //如果没有提供，则确定初始值。
        if（arguments.length <3）{
          memo = obj [键？keys [index]：index];
          index + = dir;
        }
        return iterator（obj，iteratee，memo，keys，index，length）;
      };
    }
  
    // ** Reduce **从值列表中构建单个结果，也称为`inject`，
    //或`foldl`。
    _.reduce = _.foldl = _.inject = createReduce（1）;
  
    // reduce的右关联版本，也称为`foldr`。
    _.reduceRight = _.foldr = createReduce（-1）;
  
    //返回通过真值测试的第一个值。别名为`detect`。
    _.find = _.detect = function（obj，predicate，context）{
      var键;
      if（isArrayLike（obj））{
        key = _.findIndex（obj，predicate，context）;
      } else {
        key = _.findKey（obj，predicate，context）;
      }
      if（key！== void 0 && key！== -1）return obj [key];
    };
  
    //返回通过真值测试的所有元素。
    //别名为“select”。
    _.filter = _.select = function（obj，predicate，context）{
      var results = [];
      predicate = cb（谓词，上下文）;
      _.each（obj，function（value，index，list）{
        if（predicate（value，index，list））results.push（value）;
      }）;
      返回结果;
    };
  
    //返回真值测试失败的所有元素。
    _.reject = function（obj，predicate，context）{
      return _.filter（obj，_. negate（cb（predicate）），context）;
    };
  
    //确定所有元素是否与真实测试匹配。
    //别名为“all”。
    _.every = _.all = function（obj，predicate，context）{
      predicate = cb（谓词，上下文）;
      var keys =！isArrayLike（obj）&& _.keys（obj），
          length =（keys || obj）.length;
      for（var index = 0; index <length; index ++）{
        var currentKey = keys？keys [index]：index;
        if（！predicate（obj [currentKey]，currentKey，obj））返回false;
      }
      返回true;
    };
  
    //确定对象中是否至少有一个元素与真值测试匹配。
    //别名为“any”。
    _.some = _.any = function（obj，predicate，context）{
      predicate = cb（谓词，上下文）;
      var keys =！isArrayLike（obj）&& _.keys（obj），
          length =（keys || obj）.length;
      for（var index = 0; index <length; index ++）{
        var currentKey = keys？keys [index]：index;
        if（predicate（obj [currentKey]，currentKey，obj））返回true;
      }
      返回虚假;
    };
  
    //确定数组或对象是否包含给定值（使用`===`）。
    //别名为`includes`和`include`。
    _.contains = _.includes = _.include = function（obj，target，fromIndex）{
      if（！isArrayLike（obj））obj = _.values（obj）;
      return _.indexOf（obj，target，typeof fromIndex =='number'&& fromIndex）> = 0;
    };
  
    //在集合中的每个项目上调用一个方法（带参数）。
    _.invoke = function（obj，method）{
      var args = slice.call（arguments，2）;
      var isFunc = _.isFunction（method）;
      return _.map（obj，function（value）{
        var func = isFunc？方法：值[方法];
        return func == null？func：func.apply（value，args）;
      }）;
    };
  
    //`map`常见用例的便捷版：获取属性。
    _.pluck = function（obj，key）{
      return _.map（obj，_.property（key））;
    };
  
    //“filter”常见用例的便捷版：只选择对象
    //包含特定的`key：value`对。
    _.where = function（obj，attrs）{
      return _.filter（obj，_.matcher（attrs））;
    };
  
    //“find”常见用例的便捷版：获取第一个对象
    //包含特定的`key：value`对。
    _.findWhere = function（obj，attrs）{
      return _.find（obj，_.matcher（attrs））;
    };
  
    //返回最大元素（或基于元素的计算）。
    _.max = function（obj，iteratee，context）{
      var result = -Infinity，lastComputed = -Infinity，
          价值，计算;
      if（iteratee == null && obj！= null）{
        obj = isArrayLike（obj）？obj：_. values（obj）;
        for（var i = 0，length = obj.length; i <length; i ++）{
          value = obj [i];
          if（value> result）{
            result = value;
          }
        }
      } else {
        iteratee = cb（iteratee，context）;
        _.each（obj，function（value，index，list）{
          computed = iteratee（value，index，list）;
          if（computed> lastComputed || computed === -Infinity && result === -Infinity）{
            result = value;
            lastComputed = computed;
          }
        }）;
      }
      返回结果;
    };
  
    //返回最小元素（或基于元素的计算）。
    _.min = function（obj，iteratee，context）{
      var result = Infinity，lastComputed = Infinity，
          价值，计算;
      if（iteratee == null && obj！= null）{
        obj = isArrayLike（obj）？obj：_. values（obj）;
        for（var i = 0，length = obj.length; i <length; i ++）{
          value = obj [i];
          if（value <result）{
            result = value;
          }
        }
      } else {
        iteratee = cb（iteratee，context）;
        _.each（obj，function（value，index，list）{
          computed = iteratee（value，index，list）;
          if（computed <lastComputed || computed === Infinity && result === Infinity）{
            result = value;
            lastComputed = computed;
          }
        }）;
      }
      返回结果;
    };
  
    //使用现代版本的方式随机播放一个集合
    // [Fisher-Yates shuffle]（http://en.wikipedia.org/wiki/Fisher-揧ates_shuffle）。
    _.shuffle = function（obj）{
      var set = isArrayLike（obj）？obj：_. values（obj）;
      var length = set.length;
      var shuffled = Array（length）;
      for（var index = 0，rand; index <length; index ++）{
        rand = _.random（0，index）;
        if（rand！== index）shuffled [index] = shuffled [rand];
        shuffled [rand] = set [index];
      }
      回归洗牌;
    };
  
    //示例** n **来自集合的随机值。
    //如果未指定** n **，则返回单个随机元素。
    //内部`guard`参数允许它与`map`一起使用。
    _.sample = function（obj，n，guard）{
      if（n == null || guard）{
        if（！isArrayLike（obj））obj = _.values（obj）;
        return obj [_。random（obj.length  -  1）];
      }
      return _.shuffle（obj）.slice（0，Math.max（0，n））;
    };
  
    //按迭代生成的标准对对象的值进行排序。
    _.sortBy = function（obj，iteratee，context）{
      iteratee = cb（iteratee，context）;
      return _.pluck（_。map（obj，function（value，index，list）{
        返回{
          价值：价值，
          index：index，
          标准：iteratee（值，索引，列表）
        };
      }）。sort（function（left，right）{
        var a = left.criteria;
        var b = right.criteria;
        if（a！== b）{
          if（a> b || a === void 0）返回1;
          if（a <b || b === void 0）返回-1;
        }
        return left.index  -  right.index;
      }），'value'）;
    };
  
    //用于聚合“分组依据”操作的内部函数。
    var group = function（behavior）{
      return函数（obj，iteratee，context）{
        var result = {};
        iteratee = cb（iteratee，context）;
        _.each（obj，function（value，index）{
          var key = iteratee（value，index，obj）;
          行为（结果，价值，关键）;
        }）;
        返回结果;
      };
    };
  
    //按标准对对象的值进行分组。传递一个字符串属性
    //分组依据或返回标准的函数。
    _.groupBy = group（function（result，value，key）{
      if（_.has（result，key））result [key] .push（value）; 否则结果[key] = [value];
    }）;
  
    //用一个标准索引对象的值，类似于`groupBy`，但是
    //当您知道您的索引值将是唯一的时。
    _.indexBy = group（function（result，value，key）{
      结果[key] = value;
    }）;
  
    //计算按特定条件分组的对象实例。通过
    //要么计数的字符串属性，要么是返回的字符串属性
    //标准。
    _.countBy = group（function（result，value，key）{
      if（_.has（result，key））result [key] ++; 否则结果[key] = 1;
    }）;
  
    //从任何可迭代的地方安全地创建一个真实的实时数组。
    _.toArray = function（obj）{
      if（！obj）return [];
      if（_.isArray（obj））返回slice.call（obj）;
      if（isArrayLike（obj））返回_.map（obj，_.identity）;
      return _.values（obj）;
    };
  
    //返回对象中的元素数。
    _.size = function（obj）{
      if（obj == null）返回0;
      return isArrayLike（obj）？obj.length：_.keys（obj）.length;
    };
  
    //将一个集合拆分为两个数组：一个元素的所有元素都满足给定的数组
    //谓词，以及其元素都不满足谓词的谓词。
    _.partition = function（obj，predicate，context）{
      predicate = cb（谓词，上下文）;
      var pass = []，fail = [];
      _.each（obj，function（value，key，obj）{
        （谓词（value，key，obj）？pass：fail）.push（value）;
      }）;
      返回[通过，失败];
    };
  
    //数组函数
    // ---------------
  
    //获取数组的第一个元素。传递** n **将返回第一个N.
    //数组中的值。别名为`head`和`take`。**警卫**检查
    //允许它与`_. map`一起使用。
    _.first = _.head = _.take = function（array，n，guard）{
      if（array == null）return void 0;
      if（n == null || guard）返回数组[0];
      return _.initial（array，array.length  -  n）;
    };
  
    //返回除数组最后一个条目之外的所有内容。特别有用
    //参数对象 传递** n **将返回所有值
    //数组，不包括最后一个N.
    _.initial = function（array，n，guard）{
      return slice.call（array，0，Math.max（0，array.length  - （n == null || guard？1：n）））;
    };
  
    //获取数组的最后一个元素。传递** n **将返回最后一个N.
    //数组中的值。
    _.last = function（array，n，guard）{
      if（array == null）return void 0;
      if（n == null || guard）返回数组[array.length  -  1];
      return _.rest（array，Math.max（0，array.length  -  n））;
    };
  
    //返回除数组的第一个条目之外的所有内容。别名为“tail”和“drop”。
    //对arguments对象特别有用。传递** n **将返回
    //数组中的其余N个值。
    _.rest = _.tail = _.drop = function（array，n，guard）{
      return slice.call（array，n == null || guard？1：n）;
    };
  
    //从数组中删除所有有价值的值。
    _.compact = function（array）{
      return _.filter（array，_.identity）;
    };
  
    //递归`flatten`函数的内部实现。
    var flatten = function（input，shallow，strict，startIndex）{
      var output = []，idx = 0;
      for（var i = startIndex || 0，length = input && input.length; i <length; i ++）{
        var value = input [i];
        if（isArrayLike（value）&&（_. isArray（value）|| _.isArguments（value）））{
          //展平数组或参数对象的当前级别
          if（！shallow）value = flatten（value，shallow，strict）;
          var j = 0，len = value.length;
          output.length + = len;
          而（j <len）{
            输出[idx ++] = value [j ++];
          }
        } else if（！strict）{
          输出[idx ++] =值;
        }
      }
      返回输出;
    };
  
    //以递归（默认）或仅一个级别展平数组。
    _.flatten = function（array，shallow）{
      return flatten（array，shallow，false）;
    };
  
    //返回不包含指定值的数组版本。
    _.without = function（array）{
      return _.difference（array，slice.call（arguments，1））;
    };
  
    //生成一个无副本版本的数组。如果阵列已经存在
    //已经排序，您可以选择使用更快的算法。
    //别名为“独特”。
    _.uniq = _.unique = function（array，isSorted，iteratee，context）{
      if（array == null）return [];
      if（！_。isBoolean（isSorted））{
        context = iteratee;
        iteratee = isSorted;
        isSorted = false;
      }
      if（iteratee！= null）iteratee = cb（iteratee，context）;
      var result = [];
      var seen = [];
      for（var i = 0，length = array.length; i <length; i ++）{
        var value = array [i]，
            computed = iteratee？iteratee（value，i，array）：value;
        if（isSorted）{
          if（！i || see！== computed）result.push（value）;
          看到=计算;
        } else if（iteratee）{
          if（！_。contains（seen，calculated））{
            seen.push（计算机）;
            result.push（值）;
          }
        } else if（！_。contains（result，value））{
          result.push（值）;
        }
      }
      返回结果;
    };
  
    //生成一个包含union的数组：来自所有的不同元素
    //传入的数组。
    _.union = function（）{
      return _.uniq（flatten（arguments，true，true））;
    };
  
    //生成一个数组，其中包含所有项之间共享的所有项
    //传入的数组。
    _.intersection = function（array）{
      if（array == null）return [];
      var result = [];
      var argsLength = arguments.length;
      for（var i = 0，length = array.length; i <length; i ++）{
        var item = array [i];
        if（_.contains（result，item））继续;
        for（var j = 1; j <argsLength; j ++）{
          if（！_。contains（arguments [j]，item））break;
        }
        if（j === argsLength）result.push（item）;
      }
      返回结果;
    };
  
    //获取一个数组和许多其他数组之间的差异。
    //仅保留第一个数组中的元素。
    _.difference = function（array）{
      var rest = flatten（arguments，true，true，1）;
      return _.filter（array，function（value）{
        return！_。contains（rest，value）;
      }）;
    };
  
    //将多个列表拼接成一个数组 - 共享的元素
    //一个索引在一起
    _.zip = function（）{
      return _.unzip（arguments）;
    };
  
    // _.zip的补充。Unzip接受一组数组和组
    //共享索引上的每个数组的元素
    _.unzip = function（array）{
      var length = array && _.max（array，'length'）。length || 0;
      var result = Array（length）;
  
      for（var index = 0; index <length; index ++）{
        result [index] = _.pluck（array，index）;
      }
      返回结果;
    };
  
    //将列表转换为对象。传递一个`[key，value]`数组
    //对，或两个相同长度的并行数组 - 一个键，一个
    //相应的值。
    _.object = function（list，values）{
      var result = {};
      for（var i = 0，length = list && list.length; i <length; i ++）{
        if（values）{
          result [list [i]] = values [i];
        } else {
          结果[list [i] [0]] = list [i] [1];
        }
      }
      返回结果;
    };
  
    //返回数组中第一次出现的项的位置，
    //如果项目未包含在数组中，则为-1。
    //如果数组很大且已按排序顺序排列，则传递“true”
    // for ** isSorted **使用二进制搜索。
    _.indexOf = function（array，item，isSorted）{
      var i = 0，length = array && array.length;
      if（typeof isSorted =='number'）{
        i = isSorted <0？Math.max（0，length + isSorted）：isSorted;
      } else if（isSorted && length）{
        i = _.sortedIndex（array，item）;
        return array [i] === item？我：-1;
      }
      if（item！== item）{
        return _.findIndex（slice.call（array，i），_。isNaN）;
      }
      for（; i <length; i ++）if（array [i] === item）return i;
      返回-1;
    };
  
    _.lastIndexOf = function（array，item，from）{
      var idx = array？array.length：0;
      if（typeof from =='number'）{
        idx =从<0？idx + from + 1：Math.min（idx，from + 1）;
      }
      if（item！== item）{
        return _.findLastIndex（slice.call（array，0，idx），_。isNaN）;
      }
      while（--idx> = 0）if（array [idx] === item）return idx;
      返回-1;
    };
  
    //生成函数以创建findIndex和findLastIndex函数
    function createIndexFinder（dir）{
      return函数（数组，谓词，上下文）{
        predicate = cb（谓词，上下文）;
        var length = array！= null && array.length;
        var index = dir> 0？0：长度 -  1;
        for（; index> = 0 && index <length; index + = dir）{
          if（predicate（array [index]，index，array））返回索引;
        }
        返回-1;
      };
    }
  
    //返回类似数组的第一个索引，它传递谓词测试
    _.findIndex = createIndexFinder（1）;
  
    _.findLastIndex = createIndexFinder（-1）;
  
    //使用比较器函数计算出最小的索引
    //应插入一个对象以维持秩序。使用二进制搜索。
    _.sortedIndex = function（array，obj，iteratee，context）{
      iteratee = cb（iteratee，context，1）;
      var value = iteratee（obj）;
      var low = 0，high = array.length;
      而（低<高）{
        var mid = Math.floor（（低+高）/ 2）;
        if（iteratee（array [mid]）<value）low = mid + 1; 别高=中;
      }
      回归低;
    };
  
    //生成包含算术级数的整数数组。港口
    //本机Python`range（）`函数。看到
    // [Python文档]（http://docs.python.org/library/functions.html#range）。
    _.range = function（start，stop，step）{
      if（arguments.length <= 1）{
        stop = start || 0;
        start = 0;
      }
      step = step || 1;
  
      var length = Math.max（Math.ceil（（stop  -  start）/ step），0）;
      var range = Array（length）;
  
      for（var idx = 0; idx <length; idx ++，start + = step）{
        range [idx] = start;
      }
  
      回归范围;
    };
  
    //功能（ahem）功能
    // ------------------
  
    //确定是否将函数作为构造函数执行
    //或带有提供参数的普通函数
    var executeBound = function（sourceFunc，boundFunc，context，callingContext，args）{
      if（！（callingContext instanceof boundFunc））返回sourceFunc.apply（context，args）;
      var self = baseCreate（sourceFunc.prototype）;
      var result = sourceFunc.apply（self，args）;
      if（_.isObject（result））返回结果;
      回归自我;
    };
  
    //创建一个绑定到给定对象的函数（赋值`this`和arguments，
    //可选）代表** ECMAScript 5 **的本地`Function.bind`如果
    //可用
    _.bind = function（func，context）{
      if（nativeBind && func.bind === nativeBind）返回nativeBind.apply（func，slice.call（arguments，1））;
      if（！_。isFunction（func））抛出新的TypeError（'必须在函数上调用绑定'）;
      var args = slice.call（arguments，2）;
      var bound = function（）{
        return executeBound（func，bound，context，this，args.concat（slice.call（arguments）））;
      };
      回归;
    };
  
    //通过创建具有某些功能的版本来部分应用函数
    //参数预先填充，而不更改其动态`this`上下文。_行为
    //作为占位符，允许预先填充任何参数组合。
    _.partial = function（func）{
      var boundArgs = slice.call（arguments，1）;
      var bound = function（）{
        var position = 0，length = boundArgs.length;
        var args = Array（length）;
        for（var i = 0; i <length; i ++）{
          args [i] = boundArgs [i] === _？arguments [position ++]：boundArgs [i];
        }
        while（position <arguments.length）args.push（arguments [position ++]）;
        return executeBound（func，bound，this，this，args）;
      };
      回归;
    };
  
    //将一些对象的方法绑定到该对象。剩下的论点
    //是要绑定的方法名称。用于确保所有回调
    //在对象上定义属于它。
    _.bindAll = function（obj）{
      var i，length = arguments.length，key;
      if（length <= 1）抛出新错误（'bindAll必须传递函数名'）;
      for（i = 1; i <length; i ++）{
        key = arguments [i];
        obj [key] = _.bind（obj [key]，obj）;
      }
      返回obj;
    };
  
    //通过存储结果来记忆昂贵的功能。
    _.memoize = function（func，hasher）{
      var memoize = function（key）{
        var cache = memoize.cache;
        var address =''+（hasher？hasher.apply（this，arguments）：key）;
        if（！_。has（cache，address））cache [address] = func.apply（this，arguments）;
        return cache [address];
      };
      memoize.cache = {};
      返回memoize;
    };
  
    //将函数延迟给定的毫秒数，然后调用
    //它提供了参数。
    _.delay = function（func，wait）{
      var args = slice.call（arguments，2）;
      return setTimeout（function（）{
        return func.apply（null，args）;
      等等）;
    };
  
    //推迟一个函数，将其安排在当前调用堆栈之后运行
    //清除
    _.defer = _.partial（_。延迟，_，1）;
  
    //返回一个函数，在调用时，最多只触发一次
    //在给定的时间窗口内。通常，限制功能将运行
    //尽可能多，每个“等待”持续时间不会超过一次;
    //但如果你想在前沿禁用执行，请传递
    //`{leading：false}`。要在后端禁用执行，同上。
    _.throttle = function（func，wait，options）{
      var context，args，result;
      var timeout = null;
      var previous = 0;
      if（！options）options = {};
      var later = function（）{
        previous = options.leading === false？0：_.now（）;
        timeout = null;
        result = func.apply（context，args）;
        if（！timeout）context = args = null;
      };
      return function（）{
        var now = _.now（）;
        if（！previous && options.leading === false）previous = now;
        var remaining = wait  - （现在 - 上一个）;
        context = this;
        args = arguments;
        if（剩余<= 0 ||剩余>等待）{
          if（timeout）{
            clearTimeout（超时）;
            timeout = null;
          }
          previous = now;
          result = func.apply（context，args）;
          if（！timeout）context = args = null;
        } else if（！timeout && options.trailing！== false）{
          timeout = setTimeout（稍后，剩余）;
        }
        返回结果;
      };
    };
  
    //返回一个函数，只要它继续被调用，就不会
    //被触发 该函数将在停止调用后调用
    // N毫秒 如果传递`immediate`，则触发该函数
    //前缘，而不是尾随。
    _.debounce = function（func，wait，immediate）{
      var timeout，args，context，timestamp，result;
  
      var later = function（）{
        var last = _.now（） -  timestamp;
  
        if（last <wait && last> = 0）{
          timeout = setTimeout（稍后，等待 - 最后）;
        } else {
          timeout = null;
          if（！immediate）{
            result = func.apply（context，args）;
            if（！timeout）context = args = null;
          }
        }
      };
  
      return function（）{
        context = this;
        args = arguments;
        timestamp = _.now（）;
        var callNow = immediate &&！timeout;
        if（！timeout）timeout = setTimeout（稍后，等待）;
        if（callNow）{
          result = func.apply（context，args）;
          context = args = null;
        }
  
        返回结果;
      };
    };
  
    //返回作为参数传递给第二个的第一个函数，
    //允许你调整参数，运行前后代码，以及
    //有条件地执行原始函数。
    _.wrap = function（func，wrapper）{
      return _.partial（wrapper，func）;
    };
  
    //返回传入谓词的否定版本。
    _.negate = function（谓词）{
      return function（）{
        return！predicate.apply（this，arguments）;
      };
    };
  
    //返回一个函数，该函数是函数列表的组合，每个函数
    //消耗后面的函数的返回值。
    _.compose = function（）{
      var args = arguments;
      var start = args.length  -  1;
      return function（）{
        var i = start;
        var result = args [start] .apply（this，arguments）;
        while（i--）result = args [i] .call（this，result）;
        返回结果;
      };
    };
  
    //返回仅在第N次调用时和之后执行的函数。
    _.after = function（times，func）{
      return function（）{
        if（--times <1）{
          return func.apply（this，arguments）;
        }
      };
    };
  
    //返回一个只执行（但不包括）第N个调用的函数。
    _.before = function（times，func）{
      var备忘录;
      return function（）{
        if（ - > 0）{
          memo = func.apply（this，arguments）;
        }
        if（times <= 1）func = null;
        返回备忘录;
      };
    };
  
    //返回一个最多执行一次的函数，无论如何
    //经常你叫它。对于延迟初始化很有用。
    _.once = _.partial（_。before，2）;
  
    //对象函数
    // ----------------
  
    // IE <9中的键不会被`for key in ...'迭代，从而错过了。
    var hasEnumBug =！{toString：null} .propertyIsEnumerable（'toString'）;
    var nonEnumerableProps = ['valueOf'，'isPrototypeOf'，'toString'，
                        'propertyIsEnumerable'，'hasOwnProperty'，'toLocaleString'];
  
    function collectNonEnumProps（obj，keys）{
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto =（_. isFunction（constructor）&& constructor.prototype）|| ObjProto;
  
      //构造函数是一个特例。
      var prop ='constructor';
      if（_.has（obj，prop）&&！_。contains（keys，prop））keys.push（prop）;
  
      while（nonEnumIdx--）{
        prop = nonEnumerableProps [nonEnumIdx];
        if（prop in obj && obj [prop]！== proto [prop] &&！_。contains（keys，prop））{
          keys.push（丙）;
        }
      }
    }
  
    //检索对象自己的属性的名称。
    //代表** ECMAScript 5 **的原生`Object.keys`
    _.keys = function（obj）{
      if（！_。isObject（obj））return [];
      if（nativeKeys）返回nativeKeys（obj）;
      var keys = [];
      for（obj中的var键）if（_.has（obj，key））keys.push（key）;
      // Ahem，IE <9。
      if（hasEnumBug）collectNonEnumProps（obj，keys）;
      返回键;
    };
  
    //检索对象的所有属性名称。
    _.allKeys = function（obj）{
      if（！_。isObject（obj））return [];
      var keys = [];
      for（obj中的var键）keys.push（key）;
      // Ahem，IE <9。
      if（hasEnumBug）collectNonEnumProps（obj，keys）;
      返回键;
    };
  
    //检索对象属性的值。
    _.values = function（obj）{
      var keys = _.keys（obj）;
      var length = keys.length;
      var values = Array（length）;
      for（var i = 0; i <length; i ++）{
        values [i] = obj [keys [i]];
      }
      回报值;
    };
  
    //返回将iteratee应用于对象的每个元素的结果
    //与_.map相比，它返回​​一个对象
    _.mapObject = function（obj，iteratee，context）{
      iteratee = cb（iteratee，context）;
      var keys = _.keys（obj），
            length = keys.length，
            results = {}，
            currentKey;
        for（var index = 0; index <length; index ++）{
          currentKey = keys [index];
          results [currentKey] = iteratee（obj [currentKey]，currentKey，obj）;
        }
        返回结果;
    };
  
    //将对象转换为`[key，value]`对的列表。
    _.pairs = function（obj）{
      var keys = _.keys（obj）;
      var length = keys.length;
      var pairs = Array（length）;
      for（var i = 0; i <length; i ++）{
        pairs [i] = [keys [i]，obj [keys [i]]];
      }
      回归对;
    };
  
    //反转对象的键和值。值必须是可序列化的。
    _.invert = function（obj）{
      var result = {};
      var keys = _.keys（obj）;
      for（var i = 0，length = keys.length; i <length; i ++）{
        结果[obj [keys [i]]] = keys [i];
      }
      返回结果;
    };
  
    //返回对象上可用的函数名称的排序列表。
    //别名为`methods`
    _.functions = _.methods = function（obj）{
      var names = [];
      for（obj中的var键）{
        if（_.isFunction（obj [key]））names.push（key）;
      }
      return names.sort（）;
    };
  
    //使用传入对象中的所有属性扩展给定对象。
    _.extend = createAssigner（_。allKeys）;
  
    //使用传入对象中的所有属性分配给定对象
    //（https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign）
    _.extendOwn = _.assign = createAssigner（_。keys）;
  
    //返回传递谓词测试的对象的第一个键
    _.findKey = function（obj，predicate，context）{
      predicate = cb（谓词，上下文）;
      var keys = _.keys（obj），key;
      for（var i = 0，length = keys.length; i <length; i ++）{
        key = keys [i];
        if（谓词（obj [key]，key，obj））返回键;
      }
    };
  
    //返回仅包含白名单属性的对象副本。
    _.pick = function（object，oiteratee，context）{
      var result = {}，obj = object，iteratee，keys;
      if（obj == null）返回结果;
      if（_.isFunction（oiteratee））{
        keys = _.allKeys（obj）;
        iteratee = optimizeCb（oiteratee，context）;
      } else {
        keys = flatten（arguments，false，false，1）;
        iteratee = function（value，key，obj）{obj中的返回键; };
        obj = Object（obj）;
      }
      for（var i = 0，length = keys.length; i <length; i ++）{
        var key = keys [i];
        var value = obj [key];
        if（iteratee（value，key，obj））result [key] = value;
      }
      返回结果;
    };
  
     //返回没有列入黑名单的属性的对象副本。
    _.omit = function（obj，iteratee，context）{
      if（_.isFunction（iteratee））{
        iteratee = _.negate（iteratee）;
      } else {
        var keys = _.map（flatten（arguments，false，false，1），String）;
        iteratee = function（value，key）{
          return！_。contains（keys，key）;
        };
      }
      return _.pick（obj，iteratee，context）;
    };
  
    //使用默认属性填写给定对象。
    _.defaults = createAssigner（_。allKeys，true）;
  
    //创建一个继承自给定原型对象的对象。
    //如果提供了其他属性，那么它们将被添加到
    //创建对象
    _.create = function（prototype，props）{
      var result = baseCreate（prototype）;
      if（props）_. expandUwn（result，props）;
      返回结果;
    };
  
    //创建一个（浅层克隆的）对象副本。
    _.clone = function（obj）{
      if（！_。isObject（obj））return obj;
      return _.isArray（obj）？obj.slice（）：_。expand（{}，obj）;
    };
  
    //用obj调用拦截器，然后返回obj。
    //此方法的主要目的是“挖掘”方法链，在
    //命令对链中的中间结果执行操作。
    _.tap = function（obj，interceptor）{
      拦截器（OBJ）;
      返回obj;
    };
  
    //返回一个对象是否有一组给定的`key：value`对。
    _.isMatch = function（object，attrs）{
      var keys = _.keys（attrs），length = keys.length;
      if（object == null）return！length;
      var obj = Object（object）;
      for（var i = 0; i <length; i ++）{
        var key = keys [i];
        if（attrs [key]！== obj [key] ||！（key in obj））return false;
      }
      返回true;
    };
  
  
    //`isEqual`的内部递归比较函数。
    var eq = function（a，b，aStack，bStack）{
      //相同的对象是相同的。`0 === -0`，但它们并不完全相同。
      //参见[和谐`egal`提案]（http://wiki.ecmascript.org/doku.php?id=harmony:egal）。
      if（a === b）返回一个！== 0 || 1 / a === 1 / b;
      //必须进行严格的比较，因为`null == undefined`。
      if（a == null || b == null）返回a === b;
      //展开任何包装的对象。
      if（a instanceof _）a = a._wrapped;
      if（b instanceof _）b = b._wrapped;
      //比较`[[Class]]`名称。
      var className = toString.call（a）;
      if（className！== toString.call（b））返回false;
      switch（className）{
        //字符串，数字，正则表达式，日期和布尔值按值进行比较。
        case'[object RegExp]'：
        // RegExps被强制转换为字符串以进行比较（注意：''+ / a / i ==='/ a / i'）
        case'[object String]'：
          //基元及其对应的对象包装器是等价的; 因此，“5”是
          //相当于`new String（“5”）`。
          return''+ a ===''+ b;
        案例'[对象编号]'：
          //'NaN是等同的，但是非反身的。
          //对象（NaN）等同于NaN
          if（+ a！== + a）return + b！== + b;
          //对其他数值执行“egal”比较。
          return + a === 0？1 / + a === 1 / b：+ a === + b;
        案例'[对象日期]'：
        case'[object Boolean]'：
          //将日期和布尔值强制转换为数字原始值。日期通过他们的比较
          //毫秒表示 请注意具有毫秒表示的无效日期
          // @ NaN`不等同。
          return + a === + b;
      }
  
      var areArrays = className ==='[object Array]';
      if（！areArrays）{
        if（typeof a！='object'|| typeof b！='object'）return false;
  
        //具有不同构造函数的对象不等效，但是`Object`s或`Array`s
        //来自不同的框架。
        var aCtor = a.constructor，bCtor = b.constructor;
        if（aCtor！== bCtor &&！（_。isFunction（aCtor）&& aCtor instanceof aCtor &&
                                 _.isFunction（bCtor）&& bCtor instanceof bCtor）
                            &&（b中&&'构造函数'中的'constructor'））{
          返回虚假;
        }
      }
      //假设循环结构的相等性。检测循环的算法
      //结构改编自ES 5.1第15.12.3节，抽象操作`JO`。
      
      //初始化遍历对象的堆栈。
      //这是在这里完成的，因为我们只需要它们来进行对象和数组比较。
      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;
      while（length  - ）{
        //线性搜索 性能与数量成反比
        //独特的嵌套结构
        if（aStack [length] === a）返回bStack [length] === b;
      }
  
      //将第一个对象添加到遍历对象的堆栈中。
      aStack.push（一）;
      bStack.push（b）中;
  
      //递归地比较对象和数组。
      if（areArrays）{
        //比较数组长度以确定是否需要进行深度比较。
        length = a.length;
        if（length！== b.length）返回false;
        //深入比较内容，忽略非数字属性。
        while（length  - ）{
          if（！eq（a [length]，b [length]，aStack，bStack））返回false;
        }
      } else {
        //深度比较对象。
        var keys = _.keys（a），key;
        length = keys.length;
        //在比较深度相等之前，确保两个对象包含相同数量的属性。
        if（_.keys（b）.length！== length）返回false;
        while（length  - ）{
          //深入比较每个成员
          key = keys [length];
          if（！（_。has（b，key）&& eq（a [key]，b [key]，aStack，bStack）））return false;
        }
      }
      //从遍历对象的堆栈中删除第一个对象。
      aStack.pop（）;
      bStack.pop（）;
      返回true;
    };
  
    //执行深度比较以检查两个对象是否相等。
    _.isEqual = function（a，b）{
      返回eq（a，b）;
    };
  
    //给定的数组，字符串或对象是空的吗？
    //“空”对象没有可枚举的自身属性。
    _.isEmpty = function（obj）{
      if（obj == null）返回true;
      if（isArrayLike（obj）&&（_. isArray（obj）|| _.isString（obj）|| _.isArguments（obj）））return obj.length === 0;
      return _.keys（obj）。length === 0;
    };
  
    //给定值是一个DOM元素吗？
    _.isElement = function（obj）{
      return !!（obj && obj.nodeType === 1）;
    };
  
    //给定的值是一个数组吗？
    //委派给ECMA5的原生Array.isArray
    _.isArray = nativeIsArray || function（obj）{
      return toString.call（obj）==='[object Array]';
    };
  
    //给定变量是一个对象吗？
    _.isObject = function（obj）{
      var type = typeof obj;
      返回类型==='函数'|| type ==='object'&& !! obj;
    };
  
    //添加一些isType方法：isArguments，isFunction，isString，isNumber，isDate，isRegExp，isError。
    _.each（['Arguments'，'Function'，'String'，'Number'，'Date'，'RegExp'，'Error']，function（name）{
      _ ['是'+ name] = function（obj）{
        return toString.call（obj）==='[object'+ name +']';
      };
    }）;
  
    //在浏览器中定义方法的后备版本（ahem，IE <9），其中
    //没有任何可检查的“参数”类型。
    if（！_。isArguments（arguments））{
      _.isArguments = function（obj）{
        return _.has（obj，'callee'）;
      };
    }
  
    //如果合适，优化`isFunction`。在旧的v8中解决一些类型的bug，
    // IE 11（＃1621）和Safari 8（＃1929）。
    if（typeof /./！='function'&& typeof Int8Array！='object'）{
      _.isFunction = function（obj）{
        返回typeof obj =='function'|| 假;
      };
    }
  
    //给定的对象是有限数吗？
    _.isFinite = function（obj）{
      return isFinite（obj）&&！isNaN（parseFloat（obj））;
    };
  
    //给定的值是“NaN”吗？（NaN是唯一不相等的数字）。
    _.isNaN = function（obj）{
      return _.isNumber（obj）&& obj！== + obj;
    };
  
    //给定值是否为布尔值？
    _.isBoolean = function（obj）{
      return obj === true || obj === false || toString.call（obj）==='[object Boolean]';
    };
  
    //给定值是否等于null？
    _.isNull = function（obj）{
      return obj === null;
    };
  
    //未定义给定变量吗？
    _.isUndefined = function（obj）{
      return obj === void 0;
    };
  
    //用于检查对象是否具有给定属性的快捷方式
    //本身（换句话说，不在原型上）。
    _.has = function（obj，key）{
      return obj！= null && hasOwnProperty.call（obj，key）;
    };
  
    //效用函数
    // -----------------
  
    //在* noConflict *模式下运行Underscore.js，将`_`变量返回给它
    //以前的所有者 返回对Underscore对象的引用。
    _.noConflict = function（）{
      root._ = previousUnderscore;
      归还这个;
    };
  
    //保持身份函数的默认迭代次数。
    _.identity = function（value）{
      回报值;
    };
  
    //谓词生成函数。在Underscore之外经常有用。
    _.constant = function（value）{
      return function（）{
        回报值;
      };
    };
  
    _.noop = function（）{};
  
    _.property = function（key）{
      return函数（obj）{
        return obj == null？void 0：obj [key];
      };
    };
  
    //为返回给定属性的给定对象生成函数。
    _.propertyOf = function（obj）{
      return obj == null？function（）{}：function（key）{
        return obj [key];
      };
    };
  
    //返回一个谓词，用于检查对象是否具有给定的一组 
    //`key：value`对。
    _.matcher = _.matches = function（attrs）{
      attrs = _.extendOwn（{}，attrs）;
      return函数（obj）{
        return _.isMatch（obj，attrs）;
      };
    };
  
    //运行一个函数** n **次。
    _.times = function（n，iteratee，context）{
      var accum = Array（Math.max（0，n））;
      iteratee = optimizeCb（iteratee，context，1）;
      for（var i = 0; i <n; i ++）accum [i] = iteratee（i）;
      返回累积;
    };
  
    //返回min和max（包括）之间的随机整数。
    _.random = function（min，max）{
      if（max == null）{
        max = min;
        min = 0;
      }
      return min + Math.floor（Math.random（）*（max  -  min + 1））;
    };
  
    //一种（可能更快）将当前时间戳作为整数的方法。
    _.now = Date.now || function（）{
      return new Date（）。getTime（）;
    };
  
     //用于转义的HTML实体列表。
    var escapeMap = {
      '＆'：'＆amp;'，
      '<'：'＆lt;'，
      '>'：'＆gt;'，
      '''''''''，
      “'”：'＆＃x27;'，
      '''：'＆＃x60;'
    };
    var unescapeMap = _.invert（escapeMap）;
  
    //用于转义字符串和从HTML插值中取消字符串的函数。
    var createEscaper = function（map）{
      var escaper = function（match）{
        返回地图[匹配];
      };
      //用于标识需要转义的密钥的正则表达式
      var source ='（？：'+ _.keys（map）.join（'|'）+'）';
      var testRegexp = RegExp（source）;
      var replaceRegexp = RegExp（source，'g'）;
      return函数（字符串）{
        string = string == null？''：''+ string;
        return testRegexp.test（string）？string.replace（replaceRegexp，escaper）：string;
      };
    };
    _.escape = createEscaper（escapeMap）;
    _.unescape = createEscaper（unescapeMap）;
  
    //如果命名的`property`的值是一个函数，那么用它调用它
    //`object`作为上下文; 否则，退货。
    _.result = function（object，property，fallback）{
      var value = object == null？void 0：object [property];
      if（value === void 0）{
        value = fallback;
      }
      return _.isFunction（value）？value.call（object）：value;
    };
  
    //生成唯一的整数id（在整个客户端会话中唯一）。
    //对临时DOM ID有用。
    var idCounter = 0;
    _.uniqueId = function（prefix）{
      var id = ++ idCounter +'';
      返回前缀？prefix + id：id;
    };
  
    //默认情况下，Underscore使用ERB样式的模板分隔符，更改
    //按照模板设置使用替代分隔符。
    _.templateSettings = {
      评估：/ <％（[\ s \ S] +？）％> / g，
      interpolate：/ <％=（[\ s \ S] +？）％> / g，
      转义：/ <％ - （[\ s \ S] +？）％> / g
    };
  
    //在自定义`templateSettings`时，如果你不想定义一个
    //插值，评估或转义正则表达式，我们需要一个
    //保证不匹配。
    var noMatch = /(.)^/;
  
    //需要对某些字符进行转义，以便将它们放入
    // 字符串字面量。
    var escapes = {
      “'”：“'”，
      '\\'：'\\'，
      '\ r'：'r'，
      '\ n'：'n'，
      '\ u2028'：'u2028'，
      '\ u2029'：'u2029'
    };
  
    var escaper = / \\ |'| \ r | \ n | \ u2028 | \ u2029 / g;
  
    var escapeChar = function（match）{
      return'\\'+ escapes [match];
    };
  
    // JavaScript微模板，类似于John Resig的实现。
    //下划线模板处理任意分隔符，保留空格，
    //并在插值代码中正确转义引号。
    // NB：`oldSettings`仅用于向后兼容。
    _.template = function（text，settings，oldSettings）{
      if（！settings && oldSettings）settings = oldSettings;
      settings = _.defaults（{}，settings，_. modemptings）;
  
      //通过交替将分隔符合并为一个正则表达式。
      var matcher = RegExp（[
        （settings.escape || noMatch）.source，
        （settings.interpolate || noMatch）.source，
        （settings.evaluate || noMatch）.source
      ] .join（'|'）+'| $'，'g'）;
  
      //编译模板源，适当地转义字符串文字。
      var index = 0;
      var source =“__ p + ='”;
      text.replace（matcher，function（match，escape，interpolate，evaluate，offset）{
        source + = text.slice（index，offset）.replace（escaper，escapeChar）;
        index = offset + match.length;
  
        if（escape）{
          source + =“'+ \ n（（__ t =（”+ escape +“））== null？''：_。escape（__ t））+ \ n'”;
        } else if（interpolate）{
          source + =“'+ \ n（（__ t =（”+ interpolate +“））== null？''：__ t）+ \ n'”;
        } else if（evaluate）{
          source + =“'; \ n”+ evaluate +“\ n__p + ='”;
        }
  
        // Adob​​e VM需要返回匹配才能生成正确的offest。
        回归比赛;
      }）;
      source + =“'; \ n”;
  
      //如果未指定变量，请将数据值放在本地范围内。
      if（！settings.variable）source ='with（obj || {}）{\ n'+ source +'} \ n';
  
      source =“var __t，__ p =''，__ j = Array.prototype.join，”+
        “print = function（）{__ p + = __ j.call（arguments，''）;}; \ n”+
        source +'return __p; \ n';
  
      尝试{
        var render = new Function（settings.variable ||'obj'，'_'，source）;
      } catch（e）{
        e.source = source;
        扔掉;
      }
  
      var template = function（data）{
        return render.call（this，data，_）;
      };
  
      //提供已编译的源代码以方便预编译。
      var argument = settings.variable || 'OBJ';
      template.source ='function（'+ argument +'）{\ n'+ source +'}';
  
      返回模板;
    };
  
    //添加“链”功能。开始链接包装的Underscore对象。
    _.chain = function（obj）{
      var instance = _（obj）;
      instance._chain = true;
      返回实例;
    };
  
    // OOP
    // ---------------
    //如果将Underscore作为函数调用，它将返回一个包装对象
    //可以使用OO风格。这个包装器包含所有的改变版本
    //下划线功能。被包裹的对象可以被链接。
  
    //帮助函数继续链接中间结果。
    var result = function（instance，obj）{
      return instance._chain？_（obj）.chain（）：obj;
    };
  
    //将自己的自定义函数添加到Underscore对象。
    _.mixin = function（obj）{
      _.each（_。functions（obj），function（name）{
        var func = _ [name] = obj [name];
        _.prototype [name] = function（）{
          var args = [this._wrapped];
          push.apply（args，arguments）;
          返回结果（this，func.apply（_，args））;
        };
      }）;
    };
  
    //将所有Underscore函数添加到包装器对象。
    _.mixin（_）;
  
    //将所有mutator Array函数添加到包装器中。
    _.each（['pop'，'push'，'reverse'，'shift'，'sort'，'splice'，'unshift']，function（name）{
      var method = ArrayProto [name];
      _.prototype [name] = function（）{
        var obj = this._wrapped;
        method.apply（obj，arguments）;
        if（（name ==='shift'|| name ==='splice'）&& obj.length === 0）delete obj [0];
        返回结果（this，obj）;
      };
    }）;
  
    //将所有访问者数组函数添加到包装器。
    _.each（['concat'，'join'，'slice']，function（name）{
      var method = ArrayProto [name];
      _.prototype [name] = function（）{
        返回结果（this，method.apply（this._wrapped，arguments））;
      };
    }）;
  
    //从包装和链接的对象中提取结果。
    _.prototype.value = function（）{
      返回this._wrapped;
    };
  
    //为引擎操作中使用的某些方法提供解包代理
    //比如算术和JSON字符串化。
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
    
    _.prototype.toString = function（）{
      return''+ this._wrapped;
    };
  
    // AMD注册最终与AMD加载器兼容
    //可能无法在模块上强制执行下一轮语义。虽然一般
    // AMD注册的实践是匿名的下划线寄存器
    //作为一个命名模块，因为像jQuery一样，它是一个基础库
    //很受欢迎，可以捆绑在第三方库中，但不能成为其中的一部分
    //一个AMD加载请求。这些情况可能会产生错误
    //匿名define（）在加载器请求之外调用。
    if（typeof define ==='function'&& define.amd）{
      define（'underscore'，[]，function（）{
        return _;
      }）;
    }
  } .CALL（本））;