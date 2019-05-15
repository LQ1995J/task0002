var hobbyBtn = document.getElementById("show-hobby");
var parentCon = document.getElementsByClassName("container")[0];

function showList(list, seperator, parentCon){
	var listhob = uniqArray(list.split(",")); //数组去重
	
	/*var lableList = document.getElementById("show-list");
	if(lableList){
		document.getElementById("show-list").innerHTML = "";
	}else{*/
		var lableList = document.createElement("div");		   
		lableList.id = "show-list";
		parentCon.appendChild(lableList);
		if(listhob.length > 0){
			for(var i = 0, len = listhob.length;i < len; i++){
				var trimValue = trim(listhob[i]);
				 if (trimValue !== "") {
					lableList.innerHTML += trimValue ;
				 }

			}
		}
	} 
//}


hobbyBtn.addEventListener("click", function(){
	var hobbies = document.getElementById("hobbies").value;
	var oInfo = document.getElementById("err-info");
	var reg = /[^\u4e00-\u9fa5a-zA-Z\d]/;
	var info,seperator;
	if (!hobbies) {
		info = "empty";
	} else {
		seperator = hobbies.match(reg)[0];
		info = showList(hobbies, seperator, parentCon);
	}
	if (info) {
		oInfo.innerHTML = info;
	}
	else {
		oInfo.innerHTML = "";
	}
	
},false);
