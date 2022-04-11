window.pmc = window.pmc || {};

//carousel code
pmc.keyCTAInner = function(myevent, linkName) {
	s.linkTrackVars = "prop14,prop33,eVar22,eVar33,events";
	s.linkTrackEvents = myevent;
	s.events = myevent;
	s.prop14 = s.eVar22 = s.pageName;
	s.prop33 = s.eVar33 = linkName;
	s.tl(this, "o", linkName);
}

if (s.pageName == "Home:Homepage" && document.URL.match(/en\-gb/i) != null) {
	$("#group1 .carousel .crsl-item a").bind("mousedown", function () {
		
		try {
			pmc.keyCTAInner("event2", "en-GB WP HP " + $(this).parent().parent().find("h1").text() + " carousel " + $(this).parent().parent().find("p:first").text().split(".")[0].replace(/\n+/g, "").replace(/\W+/g, " ") + ": Buy now");
		} catch (e) {
		}
		
	});
}
