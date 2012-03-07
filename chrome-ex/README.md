* `manifest.json`	- Main configuration file of extension
* `img/`	- All the image files go here
* `lib/`	- Third-party libraries (like jQuery) go here
* `bg.html`	- Extension's `background_page`
* `app.js`	- Main logic of `background_page`
* `animation.js`	- Script for animating `browser_action_icon` while loading
* `popup.html`	- HTML page which loads as popup, it searches for browsing history, filters results and (at the present) just logs them with `console.log()`
* `shops.js`	- Contains list of known e-shops