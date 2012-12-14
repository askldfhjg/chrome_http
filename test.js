var body = document.getElementsByTagName("body");
body = body[0];

chrome.devtools.network.onRequestFinished.addListener(function(request) {
	var url = request.request.url;
	if(	url.search("gateway") != -1) {
		var ff = request.request.postData.params;
		var len = ff.length;
		for(i=0;i<len;i++) {
			if(ff[i].name == 'parameter') {
				var dd = document.createElement("div");
				dd.innerText = decodeURIComponent(ff[i].value);
				dd.style.color = "red"
				body.appendChild(dd);
			}
		}
	    request.getContent(function(content, send){
			var dd = document.createElement("div");
			dd.innerText = content;
			body.appendChild(dd);
			body.appendChild(document.createElement("hr"));
			//chrome.experimental.devtools.console.addMessage(chrome.experimental.devtools.console.Severity.Warning, "d = "+content);
			body.scrollTop = body.scrollHeight; 
	      });
	}
});

