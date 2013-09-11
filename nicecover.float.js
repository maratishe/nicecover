$.ioutils.nolog = false;
$.ioutils.nostats = true;
var $body = $( 'body'); var $body2;
var action = chrome.browserAction;  
var runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
// { appkey: 'zowlkn1e8wio1kd', appsecret: 'wuibsyyvg8m59lj', reqauth: { token:"Y5EOhosTMLaterXt", tokensecret:"5yinu000VD7BaGZf"}, accauth: { token:"smhjytfcbjtijjj4", tokensecret:"aekdqdq6v4begdp", uid:"200306293"}}
$body.css({ width: '300px', height: 'auto', 'background-color': '#eee', color: '#555', padding: '3px', 'font-size': $.io.font.small, 'text-align': 'right'})
$.fn.textbutton = function( c, color) { 
	if ( ! color) color = '#48C';
	var $me = $( this).first().css({ color: color})
	$me.hover( function() { $me.css({ cursor: 'pointer'})})
	$me.mouseover( function() { $me.fadeTo( 'fast', 0.6)})
	$me.mouseout( function() { $me.fadeTo( 'fast', 1.0)})
	$me.click( c)
}
function browsemap() { }
function showstatus( key) { }
function editdropbox( key, allownew) { }
var header = function() { storage.getBytesInUse( null, function( bytesinuse) { 
	$body.ioover( true).append( '<strong>Nice Cover</strong> Controls').css({ 'font-size': $.io.font.big,  'text-decoration': 'underline'})
	var $box = $body.ioover( true).css({  'border-bottom': '1px solid #666'})
	$box.ioover( { display: 'block', position: 'relative', float: 'right', margin: '3px 0px 3px 0px', width: '20%', height: 'auto', 'border-left': '1px solid #666'}, 'img', { src: 'icon.png'});
	var $box2 = $box.ioover({ display: 'block', position: 'relative', float: 'right', margin: '3px 10px 3px 0px', width: '70%', 'text-align': 'right', padding: '0px 5px'})
	$box.ioover( true).css({ clear: 'both'})
	$box2.ioover( true).css({ height: '5px'})
	var four = function() { 
		$box2.ioover( true).append( 'You can also <strong>browse your map</strong>')
		.find( 'strong').first().textbutton( function() { browsemap(); });
		//$body.ioover( true).css({ height: '10px'})
		$body2 = $body.ioover( true);
		$body.ioover( true).css({ 'border-top': '1px solid #666'}).append( 'nicecover.author@gmail.com');
	}
	var three = function() { storage.get( 'nicecoverstatus', function( h) { 
		if ( ! h) h = {};
		if (  ! h.nicecoverstatus || ! h.nicecoverstatus.msgs) h.nicecoverstatus = { msgs: [], errs: []} 
		h = h.nicecoverstatus;
		var $box3 = $box2.ioover( true).append( 'You have <strong></strong> and <strong></strong>');
		$box3.find( 'strong').first().append( h.msgs.length + ' messages').textbutton( function() { showstatus( 'msgs'); });
		$box3.find( 'strong').last().append( h.errs.length + ' errors').textbutton( function() { showstatus( 'errs'); }, '#C44');
		storage.set( { nicecoverstatus: h});	// just in case you are initiating
		four();
	})}
	var two = function() { storage.get( 'nicecoverdropbox', function( h) { 
		if ( ! h) h = {};
		if (  ! h.nicecoverdropbox) h.nicecoverdropbox = { public: null, private: null, miners: []}; 
		h = h.nicecoverdropbox;
		var $box3 = $box2.ioover( true).append( 'Your Dropbox: <strong></strong>/<strong></strong>');
		$box3.find( 'strong').first().append( h.public ? h.public.appkey.substr( 0, 6) + '...' : 'not set').textbutton( function() { editdropbox( 'public'); });
		$box3.find( 'strong').last().append( h.public ? h.public.appkey.substr( 0, 6) + '...' : 'not set').textbutton( function() { editdropbox( 'private'); });
		$box3 = $box2.ioover( true).append( 'Your Miners: <strong></strong>, add <strong></strong>');
		$box3.find( 'strong').first().append( h.miners.length + ' accounts').textbutton( function() { editdropbox( 'miners'); });
		$box3.find( 'strong').last().append( 'new').textbutton( function() { editdropbox( 'miners', true); }, '#f00');
		storage.set( { nicecoverdropbox: h});	// just in case you are initiating
		three();
	})}
	var one = function() { action.getBadgeText( {}, function( status2) { storage.getBytesInUse( null, function( bytes) { // local storage 
		var $box3 = $box2.ioover( true);
		// application status
		if ( ! status2) status2 = 'off';
		var status = status2;
		action.setBadgeText( { text: status});
		var $status = $box3.append( 'Status: <strong></strong>').find( 'strong').css({ color: '#f00'})
		$status.append( status == 'off' ? 'DISABLED' : 'ENABLED')
		.textbutton( function() {
			status = status == 'off' ? 'on' : 'off'; 
			action.setBadgeText({ text: status}); 
			$status.empty().append( status == 'off' ? 'DISABLED' : 'ENABLED');
			storage.set({ nicecoverstatus: status});
		}, '#f00')
		storage.set({ nicecoverstatus: status});
		// local strorage status
		$box3.append( ', Storage: <strong>' + Math.round( 0.001 * bytes) + 'kb (' + Math.round( 100 * bytes / storage.QUOTA_BYTES) + '%)</strong>');
		two();
	})})}
	one();
})}
eval( header)();
