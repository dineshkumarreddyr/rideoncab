(function(){
	"use strict";

	Date.prototype.addHours= function(h){
		this.setHours(this.getHours()+h);
		return this;
	}
	var fnMinutes = function(){
		return (new Date().addHours(2));
	}
})();