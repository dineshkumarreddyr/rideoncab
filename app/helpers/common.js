(function(){
	"use strict";

	Date.prototype.addHours= function(h){
		this.setHours(this.getHours()+h);
		return this;
	}
	Date.prototype.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
var generatepicker = function(c,x){
	debugger;
}
var fnMinutes = function(){
	return (new Date().addHours(2));
}
})();