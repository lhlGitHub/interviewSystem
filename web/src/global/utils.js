export default {
  // 自定义判断元素类型JS
  toType(obj) {
    return {}.toString
      .call(obj)
      .match(/\s([a-zA-Z]+)/)[1]
      .toLowerCase();
  },
  // 参数过滤函数
  filterNull(o) {
    for (var key in o) {
      if (o[key] === null) {
        delete o[key];
      }
      if (this.toType(o[key]) === 'string') {
        o[key] = o[key].trim();
      } else if (this.toType(o[key]) === 'object') {
        o[key] = this.filterNull(o[key]);
      } else if (this.toType(o[key]) === 'array') {
        o[key] = this.filterNull(o[key]);
      }
    }
    return o;
  },
  
   // 获取url key对应的value
   getQueryVariable(key) {
    const url = window.location.href
    const queryIndex = url.indexOf('?') + 1
    const query = url.substring(queryIndex)
    const vars = query.split('&')
    console.log('url',url)
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] == key) {
        return pair[1]
      }
    }
    return false
  },


  /*
  id: id 值
  queryValuekey ：要查询value key 
  queryIdKey ：要查询id key 

  */
  getObjValueById(id, queryIdKey, queryValuekey,list) {
    let obj = {};
    obj= list.find((element) => element[queryIdKey] === id)
    console.log('obj',obj)
    return obj[queryValuekey];
  },

  loadScript(url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
    if (script.readyState) {
      // IE
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  },
  /**
   * 判断对象是否相同
   */
  isObjectValueEqual(obj1, obj2) {
    const self = this;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
      return obj1 === obj2;
    }

    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    // 例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      console.log('Object.keys(obj1)', Object.keys(obj1), Object.keys(obj2));
      return false;
    }

    for (var o in obj1) {
      var t1 = obj1[o] instanceof Object;
      var t2 = obj2[o] instanceof Object;
      if (t1 && t2) {
        if (!self.isObjectValueEqual(obj1[o], obj2[o])) {
          console.log('self.isObjectValueEqual', obj1[o], obj2[o]);
          return false;
        }
      } else if (obj1[o] !== obj2[o]) {
        console.log('three', obj1[o], obj2[o]);
        return false;
      }
    }
    return true;
  },
  getDateTime(timestamp, isSample = false) {
    console.log('timestamp', timestamp);
    var time = '';
    if (timestamp) new Date(timestamp);
    else {
      time = new Date();
    }
    var y = time.getFullYear(); // getFullYear方法以四位数字返回年份
    var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
    var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
    var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
    var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
    var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
    if (M < 10) {
      M = '0' + M;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (isSample) return y + '年' + M + '月' + d + '日';
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  },
  getDay() {
    var d = new Date().getDay();
    var weekday = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期四',
      '星期四',
    ];
    return weekday[d];
  },
  /**
   * 获取对应名称的cookie
   * @param name cookie的名称
   * @returns {null} 不存在时，返回null
   */
  getCookie(name) {
    let strcookie = document.cookie; //获取cookie字符串
    let arrcookie = strcookie.split('; '); //分割
    for (let i = 0; i < arrcookie.length; i++) {
      let arr = arrcookie[i].split('=');
      if (arr[0] == name) {
        return arr[1];
      }
    }
    return '';
  },
};
