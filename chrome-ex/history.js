function logAll(data) { 
  data.each( function(i,x) {
    console.log(i+": --> height="+x.height+"; width="+x.width+" --->"+((x.height > 40)&&(x.width > 30)));
    console.log(x);
  } );
  return data;
}
function test() {
	var url = "http://www.amazon.com/Waring-WHM100-Professional-10-Speed-Mixer/dp/B0036FRRR0/ref=sr_1_1?s=kitchen&ie=UTF8&qid=1330270558&sr=1-1";
	return retreiveImages(url).then(logAll);
}

function retreiveImages(url) {
	var d = $.Deferred();

	$.get(url, function(data) {
		var images = $("img", data);
		var imagesToLoad = images.length;

		function imageLoaded() {
			imagesToLoad--;
			if (imagesToLoad <= 0) {
				d.resolve($("img", data)
					.filter( function(index, item) { // Get all images from the page
						return (item.height > 40) && (item.width > 30);
					} )
					.sort( function comparator(a, b) {
						var A = {
							"ratio": a.height / a.width,
							"area": a.height * a.width
						};
						var B = {
							"ratio": b.height / b.width,
							"area": b.height * b.width
						};

						A.isGood = (2/5 < A.ratio && A.ratio < 5/2);
						B.isGood = (2/5 < B.ratio && B.ratio < 5/2);
						
						return A.isGood == B.isGood ? B.area - A.area : B.isGood - A.isGood;
					} )
				);
			}
		}

		images.each(function(index, image) {
			image.onload = imageLoaded;
			if (image.complete) {
				imageLoaded();
			}
		});
	});

	return d.promise();
}

function analizeHistory() {
	var msPerDay = 1000 * 60 * 60 * 24; // 24 saatis shesabamisi miliwamebi
	var d = $.Deferred();
	// TODO: History-s damushaveba sheizleba bg.html-shi iyos gadasatani. mosafiqrebelia
	chrome.history.search({
		"text": "",
		"startTime": (new Date).getTime() - 30*msPerDay, // viqeqebit 2 tvis istoriashi
		"maxResults": 1000
	}, function(data) { // Success callback
		d.resolve(data.filter( function(item) { // vfiltravt regexp-ebis meshveobit
										var generalProductRegexp = /^(?!.*category.*)(.*product[^s].*)|(.*\/p\/.*)|(.*p[-_]?\d+.*)|(.*[?&]item_?id.*)|(.*[?&]id=.*)|(.*\/\/www\.amazon\.com\/.+)|(.*-\d{3,}\.html)|(.*,pd\.html.*)$/i; // es sashineleba sxvadasxva linkebze dakvirvebit davwere
										var amazonRegexp = /^.*\/\/www\.amazon\.com.*\/b\/.*$/i; // amazonze rac shevamchnie, ARA konkretuli produqtis linkebs ureviat "/b/"
										return isShop(item.url) &&  generalProductRegexp.test(item.url) && !amazonRegexp.test(item.url);
									} )
									.sort( function comparator(a, b) {
										return b.visitCount - a.visitCount == 0 ? b.lastVisitTime - a.lastVisitTime : b.visitCount - a.visitCount;
									} )
									.slice(0, 9)
		);
	});
	// vabrunebt "danapirebs"
	return d.promise();
}

