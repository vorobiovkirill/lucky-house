function genURI(){
	$('a.lh-btn-search').attr('href', 'http://www.lucky-house.com.ua/result');
	var type_deal = $('#rent').val();
	var type_property = $('#type-of-properties').val();
	var city = $('#city').val();
	var rajon = $('#rajons').val();
	var room_from = $('#rooms1').val();
	var room_to = $('#rooms2').val();
	var price_from = $('#price1').val();
	var price_to = $('#price2').val();
	var currency = $('#currency').val();
	var photo_only;
	if($('#rent-photo').is(':checked')){
		photo_only = 'on';
	}else{photo_only = 'off';}
	var str = '?type_deal='+type_deal+'&type_property='+type_property+'&city='+city;
	if(rajon !== ""){
		str+= '&rajon='+rajon;
	}
	if(room_from !== ""){
		str+= '&room_from='+room_from;
	}
	if(room_to !== ""){
		str+= '&room_to='+room_to;
	}
	if(price_from !== ""){
		str+= '&price_from='+price_from;
	}
	if(price_to !== ""){
		str+= '&price_to='+price_to;
	}
	if(photo_only == "on"){
		str+= '&photo_only';
	}
	var _href = $("a.lh-btn-search").attr("href");
	$('a.lh-btn-search').attr('href', _href + str);
}


$(document).ready(function(){

	$('input, select').change(function(){
		genURI();
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
	
	genURI();
});