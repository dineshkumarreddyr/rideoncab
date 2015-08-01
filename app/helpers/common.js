(function(){
	"use strict";

	Date.prototype.addHours= function(h){
		this.setHours(this.getHours()+h);
		return this;
	}
	Date.prototype.daysBetween = function( date1, date2 ) {
		var one_day=1000*60*60*24;
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();
		var difference_ms = date2_ms - date1_ms;
		return Math.round(difference_ms/one_day); 
	}

	var fnMinutes = function(){
		return (new Date().addHours(2));
	}
})();