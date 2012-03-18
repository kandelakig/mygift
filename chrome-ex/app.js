var db = $.couch.db("test"); // satestod bazas qvia "Test", momavalshi sheicvleba

function sendRequest(tab) {
	db.saveDoc({ // db.saveDoc agzavnis http requests couchDB-stan da aseivebs JSON documents bazashi
		"url": tab.url, // zogadad JSON-is struqtura mosafiqrebelia
		"created_at": new Date(),
		"recipiant": "kandela@mandela.org"
	}, {
		"success": function(data){
			stopAnimation(); // gavacheret knopka :)
			console.log("Request saved with _id=\""+data["id"]+"\""); // serveris pasuxs ubralod valogirebt
		}
	});
	startAnimation(); // daiwyo knopkam triali
};
