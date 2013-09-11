$.ioutils.nolog = false;
$.ioutils.nostats = true;
var $debug;
var $popup = $( 'body').ioover({ position: 'fixed', right: '5px', top: '5px', width: '200px', height: '100px', 'z-index': 1000000}).eq( 0);
$popup.stopTime().oneTime( '10s', function() { $popup.ioanimoutremove( 'slow'); })
var failed = function() { $popup.find( '[mid="canvas"]').ioanimoutremove( 'fast', function() { 
	$popup.stopTime();	// the popup will not disappear
	$popup.iounder().attr( 'mid', 'canvas').iodrawRoundbox( [ '#C13', 0., '#000', 1.0, 0.5, 5])
	$debug.ioanimoutemptyin( 'fast', function() { $debug.append( 'ERROR! Something went wrong while parsing. Possibly changed format?').css({ 'font-size': $.io.font.normal, color: '#fff'}); })
})}
var $failed = $popup.ioover().stopTime().oneTime( '2s', failed);
var parse = function( $body, c) { 	// c( false | true | hash)
	var info = {};
	info.url = window.location.href;	// identifier for this doc
	var $D = null; $body.find( 'td').each( function() { if ( $D) return; if ( $.trim( $( this).text()) == "講演抄録／キーワード") $D = $( this); })
	if ( ! $D) return c( false); //c( true);	// return status
	//var $status = $debug.msg( 'parsing ... <strong></strong>', 'under').find( 'strong');
	var $T = $D.parent().parent().parent(); 	// first table of 2 I need to parse
	// parse header info
	$D = $T.find( 'tbody').first().children();	// children, to be picked by number
	info.pdfurl = $D.eq( 1).find( 'a').last().attr( 'href');
	info.abstracts = {};	// ei and wa
	info.abstracts[ $.trim( $D.eq( 2).find( 'td').eq( 1).text())] = $.trim( $D.eq( 2).find( 'td').last().text());
	info.abstracts[ $.trim( $D.eq( 3).find( 'td').first().text())] = $.trim( $D.eq( 3).find( 'td').last().text());
	info.keywords = {}; // ei and wa
	var key = $.trim( $D.eq( 4).find( 'td').eq( 1).text())
	info.keywords[ key] = {}; $D.eq( 4).find( 'td').last().find( 'a').each( function() { if ( ! $.trim( $( this).text())) return; info.keywords[ key][ $.trim( $( this).text())] = $( this).attr( 'href'); })
	$debug.msg( 'keywords: <strong>' + key + ' (' + $.hk( info.keywords[ key]).length + ')</strong>', 'under');
	var key = $.trim( $D.eq( 5).find( 'td').first().text())
	info.keywords[ key] = {}; $D.eq( 5).find( 'td').last().find( 'a').each( function() { if ( ! $.trim( $( this).text())) return; info.keywords[ key][ $.trim( $( this).text())] = $( this).attr( 'href'); })
	$debug.msg( 'keywords: <strong>' + key + ' (' + $.hk( info.keywords[ key]).length + ')</strong>', 'under');
	info.reference = $.trim( $D.eq( 6).find( 'td').last().text());
	info.number = $.trim( $D.eq( 7).find( 'td').last().text());
	// parse main info
	$D = $T.next().next().find( 'tbody').first(); 
	var $L = []; $D.children().each( function() { $L.push( $( this));})
	$L.shift();	// header of this table
	info.meetings = $.trim( $L.shift().find( 'td').last().text());
	info.dates = $.trim( $L.shift().find( 'td').last().text());
	info.place = {};	// english and japanese
	info.place[ $.trim( $L[ 0].find( 'a').text())] = $.trim( $L.shift().find( 'a').attr( 'href')) // JP
	info.place[ $.trim( $L[ 0].find( 'a').text())] = $.trim( $L.shift().find( 'a').attr( 'href')) // EN
	info.topics = {}; 	// en,jp
	info.topics.jp = $.trim( $L.shift().find( 'td').last().text());
	info.topics.en = $.trim( $L.shift().find( 'td').last().text());
	$L.shift();
	info.meeting = {};
	info.meeting[ $.trim( $L[ 0].find( 'a').text())] = $.trim( $L.shift().find( 'a').attr( 'href'));
	info.code = {};
	info.code[ $.trim( $L[ 0].find( 'a').text())] = $.trim( $L.shift().find( 'a').attr( 'href'));
	info.language = $.trim( $L.shift().find( 'td').last().text());
	info.title = {}; info.subtitle = {};
	info.title.jp = $.trim( $L.shift().find( 'td').last().text());
	info.subtitle.jp = $.trim( $L.shift().find( 'td').last().text());
	info.title.en = $.trim( $L.shift().find( 'td').last().text());
	info.subtitle.en = $.trim( $L.shift().find( 'td').last().text());
	for ( var i = 0; i < 8; i++) $L.shift();	// skip keywords, already have them
	info.authors = [];	// each is { name: { name(jp,en,reading): url, ...}, affiliation: { affiliation: url, ...}}
	for ( var i = 0; i < 15; i++) {	// authors, 2 lines per author
		if ( ! $L[ 0].find( 'a').get().length) { $L.shift(); $L.shift(); continue; }	// empty cells
		var author = { name: {}, affiliation: {}};
		$L.shift().find( 'a').each( function() { author.name[ $.trim( $( this).text())] = $( this).attr( 'href'); })
		$L.shift().find( 'a').each( function() { author.affiliation[ $.trim( $( this).text())] = $( this).attr( 'href'); })
		info.authors.push( author);
	}
	$debug.msg( 'authors: <strong>(' + info.authors.length + ')</strong>', 'under');
	for ( var i = 0; i < 4; i++) $L.shift();
	info.printnumber = $.trim( $L.shift().find( 'td').last().text());
	info.vol = $.trim( $L.shift().find( 'td').last().text());
	info.number = $.trim( $L.shift().find( 'td').last().text());
	info.pages = $.trim( $L.shift().find( 'td').last().text());
	info.length = $.trim( $L.shift().find( 'td').last().text());
	$debug.msg( 'vol./no.: <strong>' + info.vol + ', ' + info.number + ', ' + info.pages + '</strong>', 'under');
	//$status.stopTime(); 
	return c( info);
}
var donotindex = false;
$popup.iounder().attr( 'mid', 'canvas').iodrawRoundbox( [ '#000', 0.85, '#000', 1.0, 0.5, 5])
$popup.ioover( true).css({ height: '3px'})
$popup.ioover( true).append( 'NiceCover Report').css({ 'font-size': $.io.font.small, color: '#fff', 'text-decoration': 'underline', 'font-weight': 'bold', margin: '0px 0px 0px 5%'})
$popup.ioover( true).css({ height: '5px'}) // spacer
var $cancel = $popup.ioover( true).css({ display: 'block', position: 'relative'}).eq( 0);
$cancel.iobutton( 'cancel', $.io.font.big, null, $.io.style.canvas.alert)
.onclick( function() { donotindex = true; $popup.ioanimoutemptyin( 'fast'); })
$popup.ioover( true).css({ height: '5px'}) // spacer
$debug = $popup.ioover( true).css({ margin: '0px 0px 0px 5%', width: '90%', overflow: 'hidden', color: '#ccc', 'font-size': $.io.font.tiny})//.iovstretch( 5);
$popup.css({ height: 'auto'});
parse( $( 'body'), function( h) { 
	if ( ! h) { $failed.stopTime(); return $.log( 'not my page'); } // not my page
	if ( h !== true) { $failed.stopTime(); $popup.ioover( true).stopTime().oneTime( '5s', function() { 
		if ( donotindex) return;
		h.type = 'nicecover';
		$.log( 'sending msg', h);
		chrome.runtime.sendMessage( h, function( rep) { $debug.msg( 'Storage status: <strong>' + rep + '</strong>', 'under');})
		//return $.log( 'info', h); 
	})}
	
})
