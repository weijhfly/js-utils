//rem px:rem 100:1
let rem = () => {
	let deviceWidth = document.documentElement.clientWidth,
		html = document.documentElement;

	if (deviceWidth > 1024) {
		deviceWidth = 1024;
		html.style.maxWidth = '1024px';
		html.style.margin = '0 auto';
	}
	html.style.fontSize = deviceWidth / 7.5 + 'px';
}

rem();
window.addEventListener("resize", () => {
	rem()
}, false);