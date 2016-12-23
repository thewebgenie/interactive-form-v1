/*
worked on by Ryan Zajac
This is the script for a form interactivity project.
The purpose is to add interactivity to a form by making changes to index.html through an external script only
*/
//Task 1 - on page load focus on 1st form element
$("#name").focus();
$('#other-title').remove();
$('#payment').val('credit card');
//Task 2 - when other is selected from the "Job Role" drop down menu, reveal a text field for user entry of job title
$('#title').change(function() {
	//variable for value of #title select box
	var $titleval = $("#title").val();
	//if equal to other
	if ($titleval === "other") {
		//variable containing other-title input field
		var $textbox = "<input type='text' id='other-title' placeholder='Your Job Role'>";
		//append $textbox to 1st fieldset
		$("fieldset").first().append($textbox);
		//remove #other-title duplicates
		$('#other-title').next().remove();
	}	
	else {
		$('#other-title').remove();
	}
});
//Task 3 - Shirt Changes
$('#color').hide();
$('#color').prev().hide();
$('#design').change(function() {

	$('#color').show();
$('#color').prev().show();
	$("#design option:contains('Select Theme')").remove();
	//variable for value of #design select box
	var $designval = $("#design").val();
		//if equal to js-puns
	if ($designval === "js puns") {
		$('#color').val("darkslategrey");
		//hide i love js shirt colors
		$('option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]').hide();
		//show js-puns shirt colors
		$('option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]').show();
	}
	else if ($designval === "heart js") {
		$('#color').val("tomato");
		//hide js-puns shirt colors
		$('option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]').hide();
		//show i love js shirt colors
		$('option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]').show();
	}
});
// ACTIVITIES fieldset changes
//add price of activities to value of each input in activities fieldset
$('.activities input').each(function() {
	$(this).val(100);
});
$('.activities input').first().val('200');
$('.activities input').click( function() {
	var $text = $(this).parent().text();
	var $length = $text.length;
	var $dateTime = $text.slice($length-22, $length-6);
	var $parent = $(this).parent();
	var isInputChecked = (this.checked);
	//create variable for finding labels with conflicting times
	var $duplicate = $parent.siblings('label:contains('+$dateTime+')');
	$($duplicate).children().attr('disabled', true);
	$($duplicate).attr('class', 'disabled');
	if (!isInputChecked) {
		$($duplicate).children().attr('disabled', false);
		$($duplicate).removeAttr('class', 'disabled');
	}
	});

	// if ($dateTime === dateTime && isInputChecked) {
	// 		$(this).children().attr('disabled', true);
	// 	}
	// 	else {
	// 		$(this).children().attr('disabled', false);
	// 		}

	var $cost = 0;
	$('.ct').remove();

	$(".activities input:checked").each(function() {
// 	var $costText = '<h3>Total Cost: '+$cost+"</h3>";
		$cost += parseInt($(this).val());
	var $costText = '<h3 class="ct">Total Cost: $ '+$cost+'</h3>';
        $('.activities').append($costText);
        if ($cost === 0) {
        	$('.ct').hide();
        }
});
//Task 8 - Show/Hide payment options based on what is selected
//on load hide paypal and bitcoin divs, making credit card the default option
$( "#credit-card" ).nextAll().hide();
$('#payment').change(function() {
	var $payMethod = $('#payment').val();

	if ($payMethod === 'credit card') {
		$( "#credit-card" ).show();
		$( "#credit-card" ).nextAll().hide();

	}
	else if ($payMethod === 'select_method') {
		$( "#credit-card" ).hide();
		$( "#credit-card" ).nextAll().hide();
		$( "#credit-card" ).next().hide();
	}
	else if ($payMethod === 'paypal') {
		$( "#credit-card" ).hide();
		$( "#credit-card" ).nextAll().hide();
		$( "#credit-card" ).next().show();
	}
	else if ($payMethod === 'bitcoin') {
		$( "#credit-card").nextAll().show();
		$( "#credit-card").hide();
		$( "#credit-card").next().hide();

	}
})
//Validation
//boolean variables
var nameValid;
var emailValid;
var checkValid;
var paymentInfoValid;
//1.)check that name field is not blank
//on load
//if blank
//real time validation
if ($('#name').val() === "") {
	//change label and add red color
	$('#name').prev().text("Please provide your name").attr('class', 'error');
}
//and check on keyup
$('#name').on("change focus keyup click paste", function() {
	if ( $('#name').val() === "" ) {
	$('#name').prev().text("Name must not be blank").attr('class', 'error');
}
//if not blank change back to standard formatting
else {
	$('#name').prev().text("Name").removeAttr('class', 'error');
	//set nameNotBlank to true
	return nameValid = true;
}
});
//end real time validation
//2.)function to make sure email is formatted like [text]@[text].[text]
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//function that calls validateEmail function and returns true if email address passes test
var mailVer = function() {

	var $mail = $('#mail').val();

	if (validateEmail($mail)) {
		$('#mail').prev().removeAttr('class', 'error');
		return emailValid = true;
	}
	else {
		$('#mail').prev().text('Email must contain [text]@[text].[text]').attr("class", "error");
		return emailValid = false;
	}
}
//3.)make sure at least one checkbox is checked
var checkboxVer = function() {
	if ($('.activities p[class="error"]').length = 1) {
		$('.activities p[class="error"]').remove();
	}
	//count the number of checked check boxes
	var count = $( ".activities input:checked" ).length;
	if (count > 0) {
		$('.activities p[class="error"]').remove();
		return checkValid = true;
	}
	else {
		$('.activities').prepend('<p class="error">*At least one must be checked.</p>');
		// $('.activities p[class="error"]').remove();
		return checkValid = false;
	}
}
//4.) Credit Card Validations
	//4a.)Credit card field should only accept a number between 13 and 16 digits
	//4b.)The zipcode field should accept a 5-digit number
	//4c.)The CVV number must be exactly 3 digits long
	function getLength(x) {
	return x.toString().length;
}
//function to make sure test subject is made up of only numbers
function onlyNums(testval) {
	var on = /^\d+$/;
	return on.test(testval);
}
	var ccNumberVerified;
	var cvvVerified;
	var zipVerified;
	var ccNumberVerification = function() {
	//count the number of checked check boxes
	var $ccn = $("#cc-num").val();
	if (getLength($ccn) == 16 && onlyNums($ccn)) {
		$('#cc-num').prev().removeAttr('class', 'error');
		$('#cc-num').removeAttr('class', 'fieldError');
		return ccNumberVerified = true;
	}
	else if (getLength($ccn) != 16) {
		$('#cc-num').prev().attr("class", "error");
		$('#cc-num').attr('class', 'fieldError');
		alert('Credit Card number is not 16 digits');
		return ccNumberVerified = false;
	}
	else if (!onlyNums($ccn)) {
		$('#cc-num').prev().attr("class", "error");
		$('#cc-num').attr('class', 'fieldError');
		alert('Credit Card field contains characters that are not numbers');
		return ccNumberVerified = false;
	}
}
var cvvVerification = function() {
	var $cvv = $("#cvv").val();
	if (getLength($cvv) == 3 && onlyNums($cvv)) {
		$('#cvv').prev().removeAttr('class', 'error');
		$('#cvv').removeAttr('class', 'fieldError');
		return cvvVerified = true;
	}
	else {
		$('#cvv').prev().attr("class", "error");
		$('#cvv').attr('class', 'fieldError');
		alert('CVV is not 3 digits and/or does not contain only numbers');
		return cvvVerified = false;
	}
}
var zipVerification = function() {
	//count the number of checked check boxes
	var $zip = $("#zip").val();
	if (getLength($zip) == 5 && onlyNums($zip)) {
		$('#zip').prev().removeAttr('class', 'error');
		$('#zip').removeAttr('class', 'fieldError');
		return zipVerified = true;
	}
	else {
		$('#zip').prev().attr('class', 'error');
		$('#zip').attr('class', 'fieldError');
		alert('CVV is not 5 digits and/or does not contain only numbers');
		return zipVerified = false;
	}
}
function ccVerification() {
	ccNumberVerification();
	cvvVerification();
	zipVerification();

	if (ccNumberVerified && cvvVerified && zipVerified ) {
		return paymentInfoValid = true;
	}
	else {
		return paymentInfoValid = false;
	}

}

var paymentInfoVerification = function() {
	var choice = $('#payment').val();
	if (choice === 'credit card') {
		ccVerification();
	}
	else if (choice === 'select_method') {
		alert("payment method must be chosen");
		return paymentInfoValid = false;
	}
	else if(choice === 'paypal') {
		return paymentInfoValid = true;
	}
	else if(choice === 'bitcoin') {
		return paymentInfoValid = true;
	}	
}
$('form').on('submit', function(event) {
	event.preventDefault();
	checkboxVer(); 
	mailVer(); 
	paymentInfoVerification(); 
	// console.log(ccTest($('#cc-num'), 16));
	if (!nameValid || !emailValid || !checkValid || !paymentInfoValid) {
		location.href = '#';
		console.log(nameValid);
		console.log(emailValid);
		console.log(checkValid);
		console.log(paymentInfoValid);
}
else {
	alert('Registration Complete');
	location.reload();
}
	
})

