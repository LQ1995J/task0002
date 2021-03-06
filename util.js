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
  for(var i =0; i<=arr.length;i++){
    fn(arr[i],i);
  }
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
function getObjectLength(obj) {
  var keys = Object.keys(obj);
  return keys.length;
}

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

//学习正则表达式，在util.js完成以下代码
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
  var patemail = /^[a-zA-z0-9_\.-]+@[a-zA-z0-9\.-]+\.[a-z]{2,6}$/g;
  var e = patemail.test(emailStr);
  console.log(e);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var ptel = /^1[3578]\d{9}$/g;
    var t= ptel.test(phone);
    console.log(t);
}
var numtel = 13370707413;
var emai = "1564763218@qq.com";

isEmail(emai);
isMobilePhone(numtel);

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
  if (!document.getElementById) return false;
  var c = element.getElementById(element);
  c.className = newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if (!document.getElementById) return false;
    var c = element.getElementById(element);
    c.className = "";
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
  var c = element.getElementById(element).parentNode;
  var s = element.getElementById(siblingNode).parentNode;
  if(c == s){
      return true;
     }else{
      return false;
     }
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
  if (!document.getElementById) return false;
	var offposition = new Array();
	var odiv = document.getElementById(element);
	offposition.push(odiv.offsetLeft);
	offposition.push(odiv.offsetTop);
	return offposition;  
}
// your implement

// 实现一个简单的Query
function $$(selector,root){
    var elements=[],allChildren;
    root=root||document;
    switch(selector.charAt(0)){
        case "#":
            elements.push(root.getElementById(selector.substring(1))); //name =selector.replace(/^#/,"");element.push(document.getElementById(name));
            break;
        case ".":

            if(root.getElementsByClassName){
                elements.push.apply(elements,root.getElementsByClassName(selector.substring(1)));
            }else{
                var classReg=new RegExp("\\b"+selector.substring(1)+"\\b");
                allChildren=root.getElementsByTagName("*");
                for(var i=0,len=allChildren.length;i<len;i++){
                    if(classReg.test(allChildren[i].className)){
                        elements.push(allChildren[i]);
                    }
                }
            }
            break;
        case "[":
            if(selector.indexOf("=")==-1){
                allChildren=root.getElementsByTagName("*");
                for(var i=0,len=allChildren.length;i<len;i++){
                    if(allChildren[i].getAttribute(selector.slice(1,-1))!=null){
                        elements.push(allChildren[i]);
                    }
                }
            }else{
                var index=selector.indexOf("=");
                allChildren=root.getElementsByTagName("*");
                for(var i=0,len=allChildren.length;i<len;i++){
                    if(allChildren[i].getAttribute(selector.slice(1,index))==selector.slice(index+1,-1)){
                        elements.push(allChildren[i]);
                    }
                }
            }
    }
    return elements;
}
function Q(selector){
    if(selector.indexOf(" ")!=-1){
        var selectorArr=selector.split(/\s+/);
        var arr=$$(selectorArr[0]);
        for(var i=0,len=arr.length;i<len;i++){
            if($$(selectorArr[1],$$(selectorArr[0])[i])[0]){
                return $$(selectorArr[1],$$(selectorArr[0])[i])[0];
            }
        }
    }else{
        return $$(selector)[0];
    }
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

//4. 事件
//4.1 任务描述
//我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
  element.addEventListener("event",listener,false);
}

// 例如：

addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
  if(element.removeEventListener){
    element.removeEventListener("event",listener,false);
  }
}
  
//接下来我们实现一些方便的事件方法

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
  addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
  addEvent(element,"keydown", function(e) {
		if (e.keyCode === 13) {
			listener();
		}
	});
}
$.on = function (selector, event, listener) {
    // your implement
  return addEvent($(selector), event, listener);
}

$.un = function(selector, event, listener){
  return removeEvent($(selector), event, listener);
}

$.click = function(select,listener){
  return addClickEvent($(selector), listener);
}

$.enter = function(select,listener){
  return addEnterEvent($(selector), listener);
}

function delegateEvent(element, tag, eventName, listener) {
    // your implement
  $.eventName.(element,function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase() === tag) {
			//?????
			listener.call(target, e);
		}
  });
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
$.delegate($("#list"), "li", "click", clickHandle);

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
	if (!!window.ActiveXObject || "ActiveXObject" in window)
            { alert(navigator.appVersion);
	     return true; }
     else
            { return false; }
  
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookies = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires = " + exdate.toGMTString())
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
  if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(cookieName + "=")
		if (c_start != -1) {
			c_start = c_start + cookieName.length + 1
			var c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}


//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：

// 
function ajax(url, options) {
    // your implement
	
	var xhr ;
	if(window.XMLHttpRequest){
		xhr = new XHRHttpRequest(); //IE7+,FireFox等其他浏览器
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); //IE7之前的浏览器
	}
	
	if(xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304){//同步请求检测status，异步请求检测readyState
	   	options.onsuccess();
	   }else{
	   	options.onfail();
	   }
	type = options.type||get;
	xhr.open(type, url, true);
	if(type == "get"){
	   xhr.send(null);
	   }else{
		xhr.send(options.data); //post请求应该把数据作为请求的主体提交。
	   }
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);



