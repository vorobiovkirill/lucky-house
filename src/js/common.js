$(document).ready(function(){

	$('.bxslider').bxSlider({
		pagerCustom: '#thumbnials',
		mode: 'fade',
		infiniteLoop: false,
		hideControlOnEnd: true,
	});

	//Массивы с данными для выпадающих списков
	var type_property_arr = ['Квартира','Комната','Дом','Участок','Коммерческая недвижимость','Гараж'];
	var city_arr = ["Киев", "Белая Церьковь","Белогородка","Борисполь","Бровары","Бузовая","Буча","Васильков","Вишневое","Ворзель","Вышгород","Гатное","Глеваха","Гнедин","Гора","Гостомель","Зазимье","Иванковичи","Ирпень","Коцюбинское","Крюковщина","Макаров","Малая", "Александровка","Мила","Михайловка","Рубежовка","Немешаево","Новые Петровцы","Обухов","Петропавловская Борщаговка","Подгорцы","Святопетровское","Софиевская Борщаговка","Счастливое","Тарасовка","Ходосовка","Хотов","Чабаны","Чайки","Чубинское","Ясногородка","Шевченково"];
	var rajon_arr = ['Голосеевский', 'Дарницкий', 'Деснянский', 'Днепровский', 'Оболонский', 'Печерский', 'Подольский', 'Святошинский', 'Соломенский', 'Шевченковский'];

	//Все необходимые выпадающие списки ниже:
	$.each(type_property_arr, function(){
		$('#type-of-properties').append('<option value="'+this+'">'+this+'</option>');
	});
	$.each(city_arr, function(){
		$('#city').append('<option value="'+this+'">'+this+'</option>');
	});
	$.each(rajon_arr, function(){
		$('#rajons').append('<option value="'+this+'">'+this+'</option>');
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
});