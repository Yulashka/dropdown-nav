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

function menuEntry (title, hasImage, hasIcon, children) {
	this.hasImg = hasImage;
	this.title = title;
	this.hasIcon = hasIcon;
	this.children = children;
	//this.animation = animation; // left,right,top
}

// if animataion == left add class foo

var orangeChild = [
	new menuEntry("pants", true, true),
	new menuEntry("dresses", true, true),
	new menuEntry("hats", true, false)
]

var scheduleChild = [
	new menuEntry("banana", true, true),
	new menuEntry("orange", true, true, orangeChild),
	new menuEntry("figs", true, false)
]


var safetyChild = [
	new menuEntry("beef", true, true),
	new menuEntry("chicken", true, true),
	new menuEntry("fish", true, false)
]

var menu = [
	new menuEntry("SCHEDULE AND BIDDING", true, true, scheduleChild),
	new menuEntry("SAFETY", true, true, safetyChild),
	new menuEntry("TRAINING", true, false)
]


function myFunction() {
    var x = document.getElementById('demo');
    if (x.style.display === 'none') {
        x.style.display = 'block';
        navFunc(menu);
    } else {
        x.style.display = 'none';
    }
}

var root = document.getElementById("demo");
function navFunc(menuItems) {
	
	//do something here..
	for (var i = 0; i < menuItems.length; i++) {
		var icon = "";
		if(menuItems[i].hasIcon) {
			icon = iconPath;
		}
		var node = document.createElement("DIV");               
		var textnode = document.createTextNode(menuItems[i].title);
		node.appendChild(textnode);
		root.appendChild(node);
	  	/*root += "<img class='letter' src='" + menuItems[i].img + " '>" + 
	  	"<h5 class='d-inline'>" + menuItems[i].title + "</h5>" + icon + "<br>";
	  	.innerHTML = txt;*/
	  	if(menuItems[i].children) {
	  		navFunc(menuItems[i].children);
	  	}
  	}
}

