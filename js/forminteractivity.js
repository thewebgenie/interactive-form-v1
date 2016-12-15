/*
worked on by Ryan Zajac
This is the script for a form interactivity project.
The purpose is to add interactivity to a form by making changes to index.html through an external script only

*/
//on page load 
//focus on 1st form element
$("#name").focus();
//
var $pleaseselectappend = '<option value="pleaseselect">Please select a theme first.</option>';
$("#color").append($pleaseselectappend);
$("#color").val("pleaseselect");
		//hide all options
$( 'option[value="tomato"], option[value="steelblue"], option[value="dimgrey"], option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]' ).hide();


//when other is selected from the "Job Role" drop down menu, reveal a text field
$('#title').change(function() {
	//variable for value of #title select box
var $titleval = $("#title").val();
	//if equal to other
if ($titleval === "other") {
	//variable containing other-title input field
	var $textbox = "<input type='text' id='other-title' placeholder='Your Job Role'>";
	//append $textbox to 1st and only 1st fieldset
	$("fieldset").first().append($textbox);
	//remove #other-title duplicates
	$('#other-title').next().remove();
}
else {
	$('#other-title').remove();
}
});

$('#design').change(function() {
	$("#design option:contains('Select Theme'), #color option:contains('Please')").remove();
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
		var $dateTime = $text.slice(
			$length-25, $length-7);
		console.log($dateTime);
		if ($('.activities label:contains($dateTime)'))
		{
				$('.activities input').attr('disabled', true);
			}
		
		// $('$(this).parent().siblings()'):contains($dateTime)


	// body...
	var $cost = 0;
	$('.ct').remove();
	$(".activities input:checked").each(function() {

// 	var $costText = '<h3>Total Cost: '+$cost+"</h3>";
		$cost += parseInt($(this).val());
       });
	var $costText = '<h3 class="ct">Total Cost: $ '+$cost+'</h3>';
        $('.activities').append($costText);
})

$(".activities input:checked").each(function() {
		var $text = $(this).text();
		var $length = $text.length();
		var $dateTime = $text.slice(
			$length-25, $length-7);
		console.log($dateTime);

	})
// 	if ($('(this):checked)')) {
// 	var $cost = 0;
// 	var $costText = '<h3>Total Cost: '+$cost+"</h3>";
// //append cost to activities fieldset
// 	$cost += 200;
// 	console.log($costText);
// 	$('.activities').append($costText);
// }
// else if
// }

// $('#activities input').each(function() {
// 	// body...

// });
//Payment Info changes
//on load hide paypal and bitcoin divs
$( "#credit-card" ).nextAll().hide();

//when payment select box is changed this runs
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
$('button [type="submit"]').on('click', function() {
	if ($('#name').val() !== '') {}
})
//check that name field is not blank
//email must be formatted like dave@teamtreehouse.com
//must have at least one checkbox checked
//if Credit Card must have credit card number, ip code, and 3 number CVV value 
	//Credit card field should only accept a number between 13 and 16 digits
	//The zipcode field should accept a 5-digit number
	//The CVV number must be exactly 3 digits long

