$(document).ready(function() {

	// Обьявляем вызов Мобильного меню
	// Документация: http://mmenu.frebsite.nl/  https://github.com/FrDH/jQuery.mmenu

	$("#mobile_menu").mmenu({
		"navbar": {
			"add": false
		}
	});

	// BXSLIDEr
	$('.bxslider').bxSlider({
		pagerCustom: '#thumbnials',
		mode: 'fade',
		infiniteLoop: false,
		hideControlOnEnd: true,
	});


// FIXED HEADER MENU
var stickyNavTop = $('.main-navigation').offset().top;

var stickyNav = function(){
	var scrollTop = $(window).scrollTop();

	if (scrollTop > stickyNavTop) {
		$('.main-navigation').addClass('sticky');
	} else {
		$('.main-navigation').removeClass('sticky');
	}
};

stickyNav();

$(window).scroll(function() {
	stickyNav();
});

	//Отключение Района
	$('#city').change(function(){
		if($(this).val() !== "Киев"){
			$('.districts-field').children('label').children('select').children('option').html('Район (только для Киева)');
			$('.districts-field').children('label').children('select').prop('disabled', true).css("cursor", "default");
		}else{
			$('.districts-field').children('label').children('select').children('option').html('Район');
			$('.districts-field').children('label').children('select').prop('disabled', false);
		}
	});

	//выбор комнат
	$('#rooms1').change(function(){
		var min = $(this).val();
		$('#')
	});

	//выбор цены
	$('.price_btn').click(function(){
		$('.dropdown-menu').slideToggle();
	});

});