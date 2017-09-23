console.log("Hello World");
/*foo
  |- sub_foo_1
      |- sub_sub_foo_1
      |- sub_sub_foo_2
  |- sub_foo_2

bar
  |- sub_bar_1
  |- sub_bar_2

buz*/

var imgPath = "img/a.jpg";
var iconPath = "<i class='fa fa-chevron-right' aria-hidden='true'></i>";


function menuEntry (title, hasImage, hasIcon, shouldDisplay, children) {
	this.hasImg = hasImage;
	this.title = title;
	this.hasIcon = hasIcon;
	this.children = children;
	this.shouldDisplay = shouldDisplay;
	//this.animation = animation; // left,right,top
}

// if animataion == left add class foo

var sub_scheduleChild = [
	new menuEntry("Sub-sub_scheduleChild_0", true, false, false),
	new menuEntry("Sub-sub_scheduleChild_1", true, false, false),
	new menuEntry("Sub-sub_scheduleChild_2", true, false, false)
]

var scheduleChild = [
	new menuEntry("sub_scheduleChild_0", true, false, false),
	new menuEntry("sub_scheduleChild_1", true, true, false, sub_scheduleChild),
	new menuEntry("sub_scheduleChild_2", true, false, false)
]


var safetyChild = [
	new menuEntry("sub_safetyChild_0", true, false, false),
	new menuEntry("sub_safetyChild_1", true, false, false),
	new menuEntry("sub_safetyChild_2", true, false, false)
]

var menu = [
	new menuEntry("SCHEDULE AND BIDDING", true, true, true, scheduleChild),
	new menuEntry("SAFETY", true, true, true, safetyChild),
	new menuEntry("TRAINING", true, false, true)
]



function onload() {
	 navFunc(menu, "");
    
}

var root = document.getElementById("demo");

function navFunc(menuItems, levelStr) {
	for (var i = 0; i < menuItems.length; i++) {
		var currentLevel = levelStr + " " + i;
		//console.log(currentLevel);
		
		var node = createMenuElement(menuItems[i], currentLevel);
		root.appendChild(node);

		//checking if have icon 
		if(menuItems[i].hasIcon) {                
			node.appendChild(createIcon());  
		}
		//checking if have image 
		if(menuItems[i].hasImg) {
			//the first childNode of node is always some text
			node.insertBefore(createImg(), node.childNodes[0]);
		}
		//checking if have children 
	  	if(menuItems[i].children) {
	  		navFunc(menuItems[i].children, currentLevel);
	  	}

  	}
}

function toggleMenuItems(parentID, menuItems, action) {
	for (var i = 0; i < menuItems.length; i++) {
		var childId = parentID.toString() + " " + i;
		var tempEl = document.getElementById(childId);
		if(action  === "show"){
			tempEl.removeAttribute("class", "d-none");
			tempEl.setAttribute("class", "d-block");
			tempEl.style.width = "100%";
		} else {
			tempEl.removeAttribute("class", "d-block");
			tempEl.setAttribute("class", "d-none");
			tempEl.style.width = "0";
			if (menuItems[i].children){
				toggleMenuItems(childId, menuItems[i].children, action);
			}
		}
  	}
}

//create new element 
function createMenuElement(item, levelId) {
	var node = document.createElement("LI");          
	var textnode = document.createTextNode(item.title);
	node.setAttribute("id", levelId.trim());
	if(!item.shouldDisplay){
		node.setAttribute("class", "d-none");	
	}
	node.appendChild(textnode);
	return node;
}

//create new icon
function createIcon() {
	var icon = document.createElement("I");
	icon.setAttribute("class", "fa fa-chevron-right");
	icon.setAttribute("aria-hidden", "true");
	icon.setAttribute("onclick", "menuActionHandler(this.parentElement)");
	return icon;
}

//create new img
function createImg() {
	var image = document.createElement("IMG")
	image.setAttribute("src", imgPath);
	return image;
}

//on expand menu action handler
// find the element that was clicked
// if he has children show them
function menuActionHandler(parent) {
	var tempArra = parent.id.split(" "); // 1 0 1
	var current = menu[tempArra[0]].children;
	
	for(var i = 1; i < tempArra.length; i++) {
		var childIndex = tempArra[i];
		if(current[childIndex].children) {
			current = current[childIndex].children;
		}
	}

	var action = "show";
	if(parent.nextSibling.getAttribute("class") === "d-block") {
		action = "hide";
	}
 	toggleMenuItems(parent.id, current, action);
}


function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}