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
