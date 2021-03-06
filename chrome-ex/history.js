function retreiveImages(url, histId) {
	var prefix = /^\w+:\/\/[^\/]*/.exec(url)[0];
	var d = $.Deferred();

	$.get(url, function(data) {
		var images = $("img", data);
		var imagesToLoad = images.length;

		function comparator(a, b) {
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
		}

		function imageLoaded() {
			imagesToLoad--;
			if (imagesToLoad <= 0) {
				d.resolve({
						"histId": histId,
						"images": images
						.filter( function(index, item) { // vfiltravt patara suratebisgan
							return (item.height > 40) && (item.width > 30);
						} )
						.sort(comparator) // vasortirebs zemotagwerili logikit
					}
				)
			}
		}

		function imageLoadingError() {
			if (this.src.slice(0, 19) == "chrome-extension://") {
				this.src = prefix+this.src.slice(51);
			}
		}

		images.unbind("load");
		images.unbind("error");
		images.bind("load", imageLoaded);
		images.bind("error", imageLoadingError);
	});

	return d.promise();
}

function analizeHistory() {
	var msPerDay = 1000 * 60 * 60 * 24; // 24 saatis shesabamisi miliwamebi
	var d = $.Deferred();

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
									.map( function(item) {
										return {
											"id": item.id,
											"url": item.url,
											"title": item.title,
											"promise": retreiveImages(item.url, item.id),
											"lastVisitTime": item.lastVisitTime,
											"visitCount": item.visitCount
										}
									} )
		);
	});
	// vabrunebt "danapirebs"
	return d.promise();
}

