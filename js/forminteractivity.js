/*
worked on by Ryan Zajac
This is the script for a form interactivity project.
The purpose is to add interactivity to a form by making changes to index.html through an external script only
*/
//Task 1 - on page load focus on 1st form element
$("#name").focus();
$('#other-title').remove();
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
// var $pleaseselectappend = '<option value="pleaseselect">Please select a theme first.</option>';
// $("#color").append($pleaseselectappend);
// 		//hide all color options until theme is selected
// $( 'option[value="tomato"], option[value="steelblue"], option[value="dimgrey"], option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]' ).hide();
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
function dateTimeIsolator(textTarget) {
 	var $text = $(textTarget).parent().text();
	var $length = $text.length;
	var $dateTime = $text.slice($length-25, $length-7);
	return $dateTime;
 }
 var firstDateTime = dateTimeIsolator($('input[name="js-libs"]'));
 console.log(firstDateTime);
// ACTIVITIES fieldset changes
//add price of activities to value of each input in activities fieldset
$('.activities input').each(function() {
	$(this).val(100);
});
$('.activities input').first().val('200');
 

$('.activities input').click( function() {
	var $this = $(this);
	var $text = $(this).text();
		var $length = $text.length;
		var $dateTime = $text.slice($length-25, $length-7);
	var $parent = $(this).parent();
	var isInputChecked = (this.checked);
	
	$($parent).siblings().each(function() {
		var text = $(this).text();
		var length = text.length;
		var dateTime = text.slice(length-25, length-7);
		if ($dateTime === dateTime && isInputChecked) {
			$(this).children().attr('disabled', true);
		}
		else {
			$(this).children().attr('disabled', false);
			
		}
	});
	var $cost = 0;
	$('.ct').remove();
});
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
	console.log($payMethod);

	if ($payMethod === 'credit card') {
		$( "#credit-card" ).show();
		$( "#credit-card" ).nextAll().hide();

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
var nameNotBlank;
var emailValid;
var oneIsChecked;
var creditCardVerified;
//1.)check that name field is not blank
//on load
//if blank
if ($('#name').val() === "") {
	//change label and add red color
	$('#name').prev().text("Name: Please provide your name").css("color", "red");
}
//and check on keyup
$('#name').on("change focus keyup click paste", function() {
	if ( $('#name').val() === "" ) {
	$('#name').prev().text("Name: Please provide your name").css("color", "red");
}
//if not blank change back to standard formatting
else {
	$('#name').prev().text("Name").css("color", "black");
	//set nameNotBlank to true
	return nameNotBlank = true;
}
});
//2.)function to make sure email is formatted like [text]@[text].[text]
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//function that calls validateEmail function and returns true if email address passes test
var mailVer = function() {
	var $mail = $('#mail').val();
	if (validateEmail($mail)) {
		return emailValid;
		console.log(emailValid);
	}
	else {
		return !emailValid;
	}
}
//3.)make sure at least one checkbox is checked
var checkboxVer = function() {
	//count the number of checked check boxes
	var count = $( ".activities input:checked" ).length;
	if (count > 0) {
		return oneIsChecked;
	}
	else {
		return !oneIsChecked;
	}
}
//4.) Credit Card Validations
	//4a.)Credit card field should only accept a number between 13 and 16 digits
	//4b.)The zipcode field should accept a 5-digit number
	//4c.)The CVV number must be exactly 3 digits long
function getLength(target) {
	target.length;
}
//function to make sure test subject is made up of only numbers
function onlyNums(testval) {
	var on = /^\d+$/;
	return on.test(testval);
}
function ccTest (varc, numNums, ccbool) {
		if(getLength(varc) === numNums && onlyNums(varc)) {
			return ccbool;
		}
		else {
			return !ccbool;
		}
	}
$('#payment').on('change', function() {
var paymentValue = $('#payment').val();
if (paymentValue === 'credit card') {
	var $ccn = $("#cc-num").val();
	var $cvv = $("#cvv").val();
	var $zip = $("#zip").val();

	var cardNumberValid;
	var cvvValid;
	var zipValid;
	
	ccTest($ccn, 16, cardNumberValid);
	ccTest($cvv, 3, cvvValid);
	ccTest($zip, 5, zipValid);

	if (cardNumberValid && cvvValid && zipValid || paymentValue === 'paypal' || 'bitcoin' ) {
		creditCardVerified = true;
		console.log('creditCardVerified now');
	}
	}

 
// $('button [type="submit"').onclick = submit();
// })
$('form').on('submit', function() {
	checkboxVer() && mailVer();
	if (!nameNotBlank 
		|| !emailValid
		|| !oneIsChecked
		|| !creditCardVerified) {
		console.log('There are errors');
}

})
})

