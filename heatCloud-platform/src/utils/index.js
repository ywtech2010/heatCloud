const SIGN_REGEXP = /([yMdHsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
const DATE_TIME_PATTERN = 'yyyy-MM-dd HH:mm:ss'

function padding(s, len) {
  var len = len - ( s + '' ).length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s;
};

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export const mobileReg = /^1[3456789]\d{9}$/;

export const passwordReg = /^[a-z0-9A-Z]{6,16}$/;

export const letterNumberReg = /^[a-z0-9]+$/i;

export const floatNumber2 = /^(([1-9][0-9]*)|([0-9]+\.[0-9]{1,2}))$/;

export const clearCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie =
        keys[i] +
        '=0;expires=' +
        new Date(0).toUTCString() +
        ';path=/video_learning' +
        ';domain=localhost';
    }
  }
};

export const formatDate = {
    format: function(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'H':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    convertTime: (dateTime, pattern) => {
      var matchs1 = pattern ? pattern.match(SIGN_REGEXP) : DATE_TIME_PATTERN.match(SIGN_REGEXP);
      if(dateTime) {
        var matchs2 = dateTime.split('.')[0].match(/(\d)+/g);
        return formatDate.format(formatDate.parse(matchs1, matchs2), pattern);
      } else {
        return '/'
      }
    },
    convertStringTime(dateString, pattern) {
      var matchs1 = pattern ? pattern.match(SIGN_REGEXP) : DATE_TIME_PATTERN.match(SIGN_REGEXP);
      if (dateString) {
        var matchs2 = dateString.match(/(\d)+/g);
        return formatDate.parse(matchs1, matchs2);
      } else {
        return '-'
      }
    },
    parse: function( matchs1, matchs2) {
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int)
              break
            case 'M':
              _date.setMonth(_int - 1)
              break
            case 'd':
              _date.setDate(_int)
              break
            case 'H':
              _date.setHours(_int)
              break
            case 'm':
              _date.setMinutes(_int)
              break
            case 's':
              _date.setSeconds(_int)
              break
          }
        }
        return _date
      }
      return null
    },
    getTimeForStamp(timestamp) {
      if (typeof(timestamp) !== 'number' && isNaN(Number(timestamp))) {
        throw new Error(
          'The argument timestamp is a not valid date timestamp value.')
      } else {
        const time = timestamp
          ? Number(timestamp)
          : (new Date().valueOf())
        const d = new Date(time)
        const year = d.getFullYear()
        const month = d.getMonth() + 1
        const day = d.getDate()
        const hour = d.getHours()
        const minute = d.getMinutes()
        const second = d.getSeconds()
        return [year, month, day].map(this.formatNumber).join('-') +
          ' ' +
          [hour, minute, second].map(this.formatNumber).join(':')
      }
    },
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
  };

export function toThousands(num) {
  var num = (num || 0).toString(), result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}
