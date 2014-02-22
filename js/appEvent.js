

/*
 *  Examples of use:
 *

$(appEvent).on(appEvent.logged_in, function() {do something});
$(appEvent).trigger(appEvent.logged_in);

$(appEvent).on(appEvent.someEvent, function(data) {do something, possibly with data});
$(appEvent).trigger(appEvent.someEvent, data);

*/

/*For JSHint*/
/*global $:false*/
/*global console:false*/

var appEvent = (function(appEvent){

    "use strict";

	appEvent = {
        logged_in: 'SAMÅKNING-LOGGED_IN',
        logged_out: 'SAMÅKNING-LOGGED_OUT',
        changed_user: 'SAMÅKNING-CHANGED_USER',
        fetched_list: 'SAMÅKNING-FETCHED_LIST'
	};

	$.each(appEvent, function(key, element) {
		$(appEvent).on(element, function() {console.log('AppEvent triggered: ' + element);});
	});

	return appEvent;

})({});