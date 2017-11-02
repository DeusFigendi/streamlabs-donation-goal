function twodigitsafterdecimal(this_value,decimal_char) {
	// Takes a floating number in this_value
	// converts it to a string with two digits (for currencies)
	var before_decimal = parseInt(this_value);
	var after_decimal = Math.round(100*(this_value - before_decimal));
	if (after_decimal < 10) {
		after_decimal = "0"+after_decimal;
	}
	return(String(before_decimal)+decimal_char+String(after_decimal));
}

// Events will be sent when someone followers
// Please use event listeners to run functions.
document.addEventListener('goalLoad', function(obj) {
	// obj.detail will contain information about the current goal
	// this will fire only once when the widget loads
	console.log(obj.detail);
	$('#title').text(obj.detail.title);
	if(typeof(obj.detail.currency) != "undefined") {
		$('#goal-current').text(twodigitsafterdecimal(obj.detail.amount.current,',')+obj.detail.currency);
		$('#goal-total').text(twodigitsafterdecimal(obj.detail.amount.target,',')+obj.detail.currency);
	} else {
		$('#goal-current').text(obj.detail.amount.current);
		$('#goal-total').text(obj.detail.amount.target);
	}
	$('#goal-end-date').text(obj.detail.to_go.ends_at);
	if (obj.detail.amount.current / obj.detail.amount.target < 0.05) {
		document.querySelector("#goal-current").style.width = String(100 * obj.detail.amount.current / obj.detail.amount.target)+"%";
		document.querySelector("#goal-current").style.paddingLeft = "0";
	} else {
		document.querySelector("#goal-current").style.width = "calc("+String(100 * obj.detail.amount.current / obj.detail.amount.target)+"% - 1em)";
		document.querySelector("#goal-current").style.paddingLeft = "1em";
	}
	document.querySelector(".goal-cont").classList.add("run_animation");
});

document.addEventListener('goalEvent', function(obj) {
	// obj.detail will contain information about the goal
	console.log(obj.detail);	
	if(typeof(obj.detail.currency) != "undefined") {
		$('#goal-current').text(twodigitsafterdecimal(obj.detail.amount.current,',')+obj.detail.currency);
	} else {
		$('#goal-current').text(obj.detail.amount.current);
	}	
	if (obj.detail.amount.current / obj.detail.amount.target < 0.05) {
		document.querySelector("#goal-current").style.width = String(100 * obj.detail.amount.current / obj.detail.amount.target)+"%";
		document.querySelector("#goal-current").style.paddingLeft = "0";
	} else {
		document.querySelector("#goal-current").style.width = "calc("+String(100 * obj.detail.amount.current / obj.detail.amount.target)+"% - 1em)";
		document.querySelector("#goal-current").style.paddingLeft = "1em";
	}
	document.querySelector(".goal-cont").classList.remove("run_animation");
	setTimeout(function () {
		document.querySelector(".goal-cont").classList.add("run_animation");
	} , 1);
});

