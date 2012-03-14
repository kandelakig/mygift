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

