//判断arr是否为一个数组，返回一个bool值
var colors = ["green", "blue", "red"];

function isArray(arr){
  //your implement
  return Object.prototype.toString.call(arr) == "[object Array]";
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn){
  //your implement
   return Object.prototype.toString.call(fn) == "[object Function]";
}

isArray(colors);
isFunction(isArray);

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var Result;
    switch(Object.prototype.toString.call(src)){  //判断类型
        case "[object Number]": 
            Result = (typeof src === "object"?new Number(src):parseInt(src.toString()));
            break;
        case "[object String]":
            // 遍历字符串 =.= 好像没啥意义
            // {
            //  var temp = src.split("");
            //  var cloneString="";
            //  for(var i=0;i<temp.length;i++)
            //  {
            //      cloneString+=temp[i];
            //  }
            // }
            Result = (typeof src === "object"?new String(src):src.toString()); //基本包装类型
            break;
        case "[object Boolean]":
            Result = (typeof src === "Boolean"?new Boolean(src):src);
            break;
        case "[object Date]":
            Result = new Date(src);
            break;
        case "[object Array]":
            var temp = new Array();
              // Array.prototype.push.apply(temp,src);
             // 当使用for(var i=0,a;a = src[i++];) i会在a被赋值后就自动增加而不是
             // 等到一个循环完成再增加
            for(var i=0,a;a = src[i];i++)
            {
                  // temp.push(cloneObject(a));
                  // 使用push方法会让数组所有元素的类型变成undfined
                 temp[i] = cloneObject(a);
            }
            Result = temp;
            delete temp;
            break;
        case "[object Object]":
            var temp = {}; 
            var keys = Object.keys(src);
            // keys 为对象src的键名字数组,这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。
            // 它是数组！！！
            for(var i=0,a;a=keys[i];i++)
            {
                temp[a] = cloneObject(src[a]);//在 JavaScript 也可以使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中
            }
            Result = temp;
            delete temp;
            delete keys;
            break;
        default:
            break;
    }
    return Result;
}
// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

//学习数组、字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
   let res = [arr[0]];
    for(let i = 0; i< arr.length; i++){
        let repeat = false;
        for(let j = 0; j < res.length; j++){
            if(arr[i] === res[j]){
                repeat = true;
                break;
            }
        }
        if(!repeat){
            res.push(arr[i]);
        }
    }
    return res;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, "");
    }

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
