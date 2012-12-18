var objLists = {};
function isEmptyObject(O){
	for (var x in O) {
		return false;
	}
	return true;
}
function createNode(id, name, value) {
	var dd = document.createElement("div");
	if(id == "") {
		dd.id = name;
	}
	else {
		dd.id = id +"_"+name;
	}

	var pic = document.createElement("div");
	pic.id = dd.id +"_pic";
	pic.className = "rNone";
	var nameNode = document.createElement("span");
	nameNode.innerText = name+": ";
	nameNode.className += "name";
	var valueNode = document.createElement("span");
	valueNode.className = "value";

	if(typeof(value) == "string") {
		valueNode.innerText = '"'+encodeURIComponent(value)+'"';
		valueNode.className += " valueString";
	}
	else if(typeof(value) == "number") {
		valueNode.className += " valueNumber";
		valueNode.innerText = value;
	}
	else if(typeof(value) == "boolean") {
		valueNode.className += " valueObject";
		valueNode.innerText = value.toString();
	}
	else if(typeof(value) == "object" && value != null) {
		if(Object.prototype.toString.call(value) == '[object Object]') {
			valueNode.innerText = "Object";
			var empty = isEmptyObject(value);
		}
		else if(Object.prototype.toString.call(value) == '[object Array]') {
			valueNode.innerText = "Array["+value.length+"]";
			var empty = (value.length == 0);
		}
		valueNode.className += " valueObject";
		if(!empty) {
			pic.className = "rClose";
			pic.setAttribute("loc",dd.id);
			nameNode.setAttribute("loc",dd.id);
			valueNode.setAttribute("loc",dd.id);
			dd.setAttribute("loc",dd.id);
		}
	}
	else if(value == null) {
		valueNode.className += " valueNull";
		valueNode.innerText = 'null';
	}
	dd.appendChild(pic);
	dd.appendChild(nameNode);
	dd.appendChild(valueNode);
	dd.className = "main";
	return dd;
}

function tree(id, flag) {
	var target = document.createElement("div");
	target.id = id+"_child";
	document.getElementById(id).appendChild(target);
	if(id != flag) {
		var parent = document.getElementById(id).parentNode.style.marginRight;
		parent = Number(parent.substr(0, parent.length - 2)) + 20;
		target.style.marginLeft = parent + "px";
		var tmp = id.split("_");
		obj = objLists;
		for(i=0;i<tmp.length;i++) {
			obj = obj[tmp[i]];
		}
	}
	else {
		id = flag;
		obj = objLists[flag];
	}
	if(typeof(obj) != 'object') {
		var dd = document.createElement("div");
		dd.innerText = obj;
		target.appendChild(dd);
	}
	else {
		for(var name in obj) {
			var node = createNode(id, name, obj[name]);
			target.appendChild(node);
		}
	}
}

function getJson(node, obj, flag) {
	node.innerHTML = '';
	objLists[flag] = obj;
	node.addEventListener("click", function(rr){
		var name = rr.toElement.getAttribute("loc");
		if(name == null) {
			return false;
		}
		var child = document.getElementById(name+"_child");
		var t = document.getElementById(name);
		if(t.childNodes.length >3 && child != null && child.style.display != "none") {
			child.style.display = "none";
			document.getElementById(name+"_pic").className = "rClose";
		}
		else {
			var child = document.getElementById(name+"_child");
			if(child == null) {
				tree(name, flag);
			}
			else {
				child.style.display = "block";
			}
			document.getElementById(name+"_pic").className = "rOpen";
		}
	},false);
	tree(flag, flag);
}