function logAll(data) { 
  data.each( function(i,x) {
    console.log(i+": --> height="+x.height+"; width="+x.width+" --->"+((x.height > 40)&&(x.width > 30)));
    console.log(x);
  } );
  return data;
}
function test1() {
	var url = "http://www.amazon.com/Waring-WHM100-Professional-10-Speed-Mixer/dp/B0036FRRR0/ref=sr_1_1?s=kitchen&ie=UTF8&qid=1330270558&sr=1-1";
	return retreiveImages(url).then(logAll);
}
function test2() {
	var url = "http://www.thinkgeek.com/tshirts-apparel/jewelry/e9b7/?pfm=homepage_Featured_3_e9b7";
	return retreiveImages(url).then(logAll);
}
function test3() {
	var url = "http://www.fabuloustreet.com/index.php?main_page=product_info&cPath=1_93&products_id=1064";
	return retreiveImages(url).then(logAll);
}
