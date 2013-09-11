$.ioutils.nolog = false;
$.ioutils.nostats = true;
var stringex;
$.iobase.stringexsetup.keys = 'authors,keywords';
//$( 'body').stringex( function( a) { stringex = a; $.log( 'stringex OK'); })    OMITTED IN THIS EDITION
var onmsg = function( req, sender, c) {
	$.log( 'REQ', req);
	var h = req;
	var doc = {};
	doc.authors = [];
	for ( var i = 0; i < h.authors.length; i++) {
		var h2 = h.authors[ i];
		for ( var name in h2.name) doc.authors.push( name);
	}
	doc.keywords = [];
	for ( var k in h.keywords) for ( var keyword in h.keywords[ k]) doc.keywords.push( keyword);
	doc.titleen = h.title.en;
	doc.titlejp = h.title.jp;
	doc.raw = h;
	$.log( 'doc', doc);
	//stringex.add( doc);    OMITTED in this edition
	if ( ! sender || ! req || ! $.isObject( req) || req.type != 'nicecover') return;	// filter out junk
	c( 'OK');
}
chrome.extension.onMessage.addListener( onmsg);
$.log( 'load OK');