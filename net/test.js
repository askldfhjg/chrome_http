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
		div.id = "div-"+count;
		up.addEventListener("click",function(rr){
			var id = Number(rr.target.id);
			if(id == NaN) return;
			var content = document.getElementById("detail_"+id).innerText;
			var divv = document.getElementById("div-"+id);
			getJson(divv, JSON.parse(content)["data"], divv.id);
			//chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, "div-"+id);
			body.scrollTop = body.scrollHeight;
		},false);
		count++;
		main.appendChild(up);
		main.appendChild(div);
		body.appendChild(main);
	    request.getContent(function(content, send){
	    	var main = document.getElementById("main_"+count2);
			var dd = document.createElement("div");
			dd.innerText = content;
			dd.style.display="none";
			dd.id="detail_"+count2;
			main.appendChild(dd);
			main.appendChild(document.createElement("hr"));
			//chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, "d = "+content);
			body.scrollTop = body.scrollHeight;
			count2++;
		});
	}
});

function aal(o) {
	chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, o);
}

document.getElementById("button").addEventListener("click", function(rr){
	chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, document.documentElement.innerHTML);
});

