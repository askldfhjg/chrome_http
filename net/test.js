var body = document.getElementsByTagName("body");
body = body[0];
var count = 1;
var count2 = 1;
chrome.devtools.network.onRequestFinished.addListener(function(request) {
	var url = request.request.url;
	if(	url.search("gateway") != -1) {
		var ff = request.request.postData.params;
		var len = ff.length;
		var params = "";
		var uid = "";
		for(i=0;i<len;i++) {
			if(ff[i].name == 'parameter') {
				params = ff[i].value;
			}
			if(ff[i].name == 'uid') {
				uid = ff[i].value;
			}
		}
		var main = document.createElement("div");
		var up = document.createElement("div");
		main.id="main_"+count;
		up.innerText = count+" "+decodeURIComponent(params)+" "+uid;
		up.style.color = "red";
		up.style.cursor = "pointer";
		up.id=count;
		var div = document.createElement("div");
		div.id = "div_"+count;
		up.addEventListener("click",function(rr){
			var id = Number(rr.target.id);
			if(id == NaN) return;
			var content = document.getElementById("detail_"+id).innerText;
			getJson(document.getElementById("div_"+id), JSON.parse(content));
			chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, document.documentElement.innerHTML);
		},false);
		count++;
		main.appendChild(up);
		main.appendChild(div);
		body.appendChild(main);
	    request.getContent(function(content, send){
	    	var main = document.getElementById("main_"+count2);
			var dd = document.createElement("div");
			dd.innerText = content;
			dd.id="detail_"+count2;
			main.appendChild(dd);
			main.appendChild(document.createElement("hr"));
			//chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, "d = "+content);
			body.scrollTop = body.scrollHeight;
			count2++;
		});
	}
});

