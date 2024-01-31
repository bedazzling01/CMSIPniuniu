function Polyfills() {
  if (Function.prototype.name === undefined) {
    // 针对IE9-IE11
    Object.defineProperty(Function.prototype, 'name', {
      get: function() {
        return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
      }
    });
  }
  if (Object.assign === undefined) {
    // 针对IE
    (function() {
      Object.assign = function(target) {
        if (target === undefined || target == null) {
          return {};// 返回一个空对象
        }
        const output = Object(target);
        for (let index = 1; index < arguments.length; index++) {
          const source = arguments[index];
          if (source !== undefined && source !== null) {
            for (const nextKey in source) {
              if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        }
        return output;
      };
    })();
  }
}
const _Polyfills = Polyfills();
const LocationResolver = {
  getUrlKey: function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }
};
const _ = {
  extend: function (o1, o2, override) {
    for (const i in o2) {
      if (Object.hasOwnProperty.call(o2, i)) {
        if (o1[i] === undefined || override === true) {
          o1[i] = o2[i];
        }
      }
    }
    return o1;
  },
  prepend: function (newItem, pItem) {
    const firstItem = pItem.firstChild;
    if (firstItem) {
      pItem.insertBefore(newItem, firstItem);
    } else {
      pItem.appendChild(newItem);
    }
    return newItem;
  },
  slice: function (obj, start, end) {
    const res = [];
    for (let i = start || 0, len = end || obj.length; i < len; i++) {
      res.push(obj[i]);
    }
    return res;
  },
  logs: function () {
    // if (this.debug == true) {
    console.log.apply(console, arguments);
    // }
  },
  warn: function () {
    console.warn.apply(console, arguments);
  }
};

const Utils = {
  isArray: function(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  },
  deepCopy: function(obj, target) {
    let type;
    if (!target) {
      type = Array.isArray(obj) ? [] : {};
    }
    for (const key in obj) {
      // others[i]={ b: { 'aa': '杭州', 'bb': '宁波' } }
      // 如果others[i]的子对象是对象，递归操作！
      if (obj[key] && typeof obj[key] === 'object') {
        if (!target) {
          type[key] = this.deepCopy(obj[key]);
        } else {
          target[key] = this.deepCopy(obj[key]);
        }
      } else {
        if (!target) {
          type[key] = obj[key];
        } else {
          target[key] = obj[key];
        }
      }
    }
    if (target) {
      return target;
    } else {
      return type;
    }
  },
  deepExtend: function() {
    if (arguments[0] === false) {
      return;
    }
    if (arguments.length === 1) {
      for (const key in arguments[0]) {
        $[key] = arguments[0][key];
      }
    } else {
      const isDeep = typeof arguments[0] === 'boolean';
      const sliceNumber = isDeep ? 2 : 1;
      let target = isDeep ? arguments[1] : arguments[0];
      const others = Array.prototype.slice.call(arguments, sliceNumber);
      for (let i = 0, len = others.length; i < len; i++) {
        if (arguments[0] === true) {
          target = this.deepCopy(others[i], target);
        } else {
          for (const key in others[i]) {
            target[key] = others[i][key];
          }
        }
      }
      return target;
    }
  },
  isChildTarget(child, parent, justChild = false) {
    // justChild为true则只判断是否为子元素，若为false则判断是否为本身或者子元素 默认为false
    let parentNode;
    if (justChild) {
      parentNode = child.parentNode;
    } else {
      parentNode = child;
    }
    if (child && parent) {
      while (parentNode) {
        if (parent === parentNode) {
          return true;
        }
        parentNode = parentNode.parentNode;
      }
    }
    return false;
  }
};

/**
 * dom节点处理
 */
class DomUtils {
  static addClass(obj, cName) {
    const cStr = obj.getAttribute('class');
    let curArr = cStr ? cStr.split(' ') : [];
    const newCArr = cName.split(" ");
    curArr = curArr.concat(newCArr);
    curArr = curArr.filter((item, index) => {
      return item !== "" && curArr.indexOf(item) === index;
    });
    const newClassName = curArr.join(" ");
    obj.setAttribute("class", newClassName);
  }

  static removeClass(obj, cName) {
    const cStr = obj.getAttribute('class');
    if (!cStr) return;
    const curArr = cStr.split(' ');
    const newCArr = cName.split(" ");
    const targetArr = curArr.filter((item) => {
      return item !== "" && newCArr.indexOf(item) < 0;
    });
    const newClassName = targetArr.join(" ");
    obj.setAttribute("class", newClassName);
  }

  static hasClass(obj, cName) {
    const cStr = obj.getAttribute('class');
    if (!cStr) return -1;
    const curArr = (cStr.split(' ')).filter((item) => {
      return item !== "";
    });
    return curArr.indexOf(cName);
  }

  static createNode(str, params) {
    params = params || {};
    const className = params.class;
    const id = params.id;
    const div = document.createElement("div");
    if (className) {
      div.setAttribute("class", className);
    }
    if (id) {
      div.setAttribute("id", id);
    }
    div.innerHTML = str;
    return div;
  }
}
const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64DecodeChars = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
// 加密方法
function base64encode(str) {
  let out, i;
  let c1, c2, c3;
  const len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}
// 解密方法
function base64decode (str) {
  let c1, c2, c3, c4;
  let i, out;
  const len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    }
    while (i < len && c1 === -1);
    if (c1 === -1) { break; }
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    }
    while (i < len && c2 === -1);
    if (c2 === -1) { break; }
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 === 61) { return out; }
      c3 = base64DecodeChars[c3];
    }
    while (i < len && c3 === -1);
    if (c3 === -1) { break; }
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 === 61) { return out; }
      c4 = base64DecodeChars[c4];
    }
    while (i < len && c4 === -1);
    if (c4 === -1) { break; }
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}

export { LocationResolver, _, Utils, DomUtils, _Polyfills, Polyfills, base64EncodeChars, base64DecodeChars, base64encode, base64decode };