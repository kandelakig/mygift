var iconFolder = "images/loading/";
var imageIndex = 0;
var keepSwitchingIcon = false;
var frameChangeRate = 60;

function rotateIcon() {
	if ( keepSwitchingIcon ) {
		chrome.browserAction.setIcon({
			path: iconFolder + "loading" + imageIndex + ".png"
		});
		imageIndex = (imageIndex + 1) % 8;
		setTimeout(rotateIcon, frameChangeRate);
	}
}

function startAnimation() {
	keepSwitchingIcon = true;
	rotateIcon();
}

function stopAnimation() {
	keepSwitchingIcon = false;
	setTimeout("chrome.browserAction.setIcon({ path: \"images/icon.png\" })", frameChangeRate);
}

function switchAnimation() {
	if (keepSwitchingIcon) {
		stopAnimation();
	} else {
		startAnimation();
	}
}