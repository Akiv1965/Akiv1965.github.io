
navigator.geolocation.getCurrentPosition(function(position) {

    const lat =  Number(position.coords.latitude);//40.481815
    const lon =  Number(position.coords.longitude);//-3.364305
	// var lugar;
	// var paisCode



    functionUbicacion(lat, lon)
	
	
var idioma = (navigator.language).slice(0, 2);
if (idioma !== "es") {
    idioma = "en";
}

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&lang="+idioma+"&exclude=minutely&appid=f5a03880bc93e6b9de4a16b7c4ef9aeb", {
	
	}
	).then(response => response.json()).then(clima => {
    console.log(clima)
    var climaActual= clima.current
	var climaHoras= clima.hourly
	var climaDias= clima.daily
	var iconoActual= climaActual.weather[0].icon
	var descripActual= climaActual.weather[0].description
	var diaNoche= iconoActual.slice(-1)
	var descripMain= climaActual.weather[0].main+diaNoche
	var fechaActual= new Date().toLocaleDateString()
	var numeroDia = new Date().getDay()
	var diaSemana= ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]
	var velocidad= (climaActual.wind_speed*3.6).toFixed(1)
	var visibilidad= (climaActual.visibility).toLocaleString()
	var direcViento= climaActual.wind_deg
    var iconoViento= DirecViento(direcViento, iconoViento, velocidad);
	var probLluvia= (climaDias[0].pop)*100
	var amanecer=  new Date((climaActual.sunrise)*1000).toLocaleTimeString().slice(0, -3)//new Date((climaActual.sunrise)*1000).getHours()+":"+new Date((climaActual.sunrise)*1000).getMinutes()
	var anochecer= new Date((climaActual.sunset)*1000).toLocaleTimeString().slice(0, -3)//new Date((climaActual.sunset)*1000).getHours()+":"+new Date((climaActual.sunset)*1000).getMinutes()
	var riseMoon= new Date((climaDias[0].moonrise)*1000).toLocaleTimeString().slice(0, -3)
	var setMoon= new Date((climaDias[0].moonset)*1000).toLocaleTimeString().slice(0, -3)
	var faseNum= climaDias[0].moon_phase
	var faseLuna= fasesLunares(faseNum, faseLuna)
	var arrayTemps=[]
	var tempMin
	var tempMax
	var indexPosition
	var imgClima= {
		"Thunderstormd": "images/diaTormenta.jpg",
		"Thunderstormn": "images/nocheTormenta.jpg",
		"Cleard": "images/diaClaro.jpg",
		"Clearn": "images/nocheClara.jpg",
		"Drizzled": "images/diaLluvia.jpg",
		"Drizzlen": "images/nocheLluvia.jpg",
		"Raind": "images/diaLluvia.jpg",
		"Rainn": "images/nocheLluvia.jpg",
		"Snowd": "images/diaNieve.jpg",
		"Snown": "images/nocheNieve.jpg",
		"Atmosphered": "images/diaNiebla.jpg",
		"Atmospheren": "images/nocheNiebla.jpg",
		"Cloudsd": "images/diaNubes.jpg",
		"Cloudsn": "images/nocheNubes.jpg",
	}
	//console.log("url('"+imgClima[descripMain]+"')", imgClima[descripMain], imgClima.Clearn)
	//console.log(DirecViento(direcViento, iconoViento, velocidad), new Date((climaActual.sunrise)*1000).toLocaleTimeString().slice(0, -3))
	
	//DIA ACTUAL
	$("#actual").css({
		"background-image": "url('"+imgClima[descripMain]+"')",
		"background-size": "cover"
	});
	$("#iconoViento").html("<span id='velocidadViento'>"+velocidad+"<small>Km/h</small></span><img src='"+iconoViento+"' style='width: 100%; filter: drop-shadow(1px 2px 3px rgb(90,50,50))'>")
	$("#tempActual").text(climaActual.temp.toFixed(1)+"º")
	$("#sensacActual").html("<small>Sensación térmica:</small><b>"+climaActual.feels_like.toFixed(1)+"º</b>")
	$("#descripActual").html(descripActual)
	//<img src='http://openweathermap.org/img/wn/"+iconoActual+"@4x.png' style='width: 85%;'>
	$("#riseAndSet").html(
		"<span class='riseAndSet' id='rise'><img src='iconos/iconAmanecer.png' style='width: 100%;'>"+amanecer+"</span>"
		+"<span class='riseAndSet' id='set'><img src='iconos/iconAnochecer.png' style='width: 100%;'>"+anochecer+"</span>"
		)
	$("#riseAndSetMoon").html(
		"<span class='riseAndSet' id='riseMoon'><img src='iconos/moonriseIcon.png' style='width: 100%;'>"+riseMoon+"</span>"
		+"<span class='riseAndSet' id='setMoon'><img src='iconos/moonsetIcon.png' style='width: 100%;'>"+setMoon+"</span>"
		+"<span style='width: 18%; position: absolute; top: 0px; font-size: 0.6rem; text-align: center'>"+faseLuna+"</span>"
	)
	$("#presion").html("<img src='iconos/iconPress.png' style='width: 15%;'><span>"+climaActual.pressure+"<small>mbar</small></span>")
	$("#humedad").html("<img src='iconos/iconHumedad.png' style='width: 15%;'><span>"+climaActual.humidity+"<small>%</small></span>")
	$("#uvi").html("<img src='iconos/iconUV2.png' style='width: 15%;'><span><small> Índice </small>"+climaActual.uvi+"</span>")
	$("#visibility").html("<img src='iconos/iconVisibility.png' style='width: 15%;'><span>"+visibilidad+"<small>mt</small></span>")
	$("#prob").html("<img src='iconos/iconLluvia.png' style='width: 100%'><span style='position: absolute; top: 13%; left: 20%; font-weight: bold; font-size: 0.8rem'>"+probLluvia.toFixed(0)+"%</span></span>")
	//console.log($("#actual").height())
	var altura= (($("#actual").height())/2)-37;//$(".cajaHoras").css("height")

	// 48 HORAS  **
//Hallar posición respecto temp mínima
	for(var k=1; k < climaHoras.length; k++){
		arrayTemps.push((climaHoras[k].temp).toFixed(1))
	}
	tempMin= Math.min(...arrayTemps)
	tempMax= Math.max(...arrayTemps)
	indexPosition= altura/(tempMax-tempMin)
	for(var i=1; i < climaHoras.length; i++){

	 var hora= new Date((climaHoras[i].dt)*1000).toLocaleTimeString().slice(0, -3)
	 var iconoHoras= climaHoras[i].weather[0].icon
	 var descripHoras= climaHoras[i].weather[0].description
	 var tempHoras= (climaHoras[i].temp).toFixed(1)
	 var posicion= ((tempHoras-tempMin))*indexPosition
	 //console.log("pos..",posicion,"alt..", altura,"ind..", indexPosition)
	//if(posicion*2 > altura){posicion= altura/2; console.log("new ",posicion)}
	 var velocidad= (climaHoras[i].wind_speed*3.6).toFixed(1)
	 var direcViento= climaHoras[i].wind_deg
	 var iconoVientoEnHoras= DirecViento(direcViento, iconoViento, velocidad)
	 var probLluvia= (climaHoras[i].pop)*100
	 
	 //console.log(DirecViento(direcViento, iconoViento, velocidad))
	 $("#horas").append("<div class='cajaHoras'>"
	 +"<span id='horaEnHoras'>"+hora+"</span>"
	 +"<div id='boxTemp'><span id='tempEnHoras' style='bottom:"+posicion+"px'>"+tempHoras+"</span></div>"
	 +"<div id='iconoEnHoras' ><img src='http://openweathermap.org/img/wn/"+iconoHoras+"@4x.png' style='width: 35%'><span id='descripEnHoras'>"+descripHoras+"</span></div>"
	 +"<div class='datosEnHoras'>"
	 +"<span class='spanDatosHoras' style='width: 80%; display: flex; flex-direction: column; align-items: center;'><img src='"+iconoVientoEnHoras+"' style='width: 100%'><span style='position: absolute; top: 41%; font-weight: bold; color: rgb(30, 30, 70, 0.8)'>"+velocidad+"<small>Km/h</small></span></span>"
	 +"<span class='spanDatosHoras'><img src='iconos/iconLluvia.png' style='width: 100%'><span style='position: absolute; top: 20%; left: 30%; font-weight: bold; color: rgb(30, 30, 70, 0.8)'>"+probLluvia.toFixed(0)+"%</span></span></div>"
	 +"</div>")
	 
	}
	console.log($("#horas").width(), $(".cajaHoras").height(),"alticono..", $("#iconoEnHoras").height() )
	$("#horas").prepend("<div style='height: 100%; position:sticky; left:0px; font-size: 0.7rem'>"
	+"<div id='indexMax' class='indexMaxMin' style='width:"+($("#horas").width()+200)+"px; border-top: 1px solid rgb(225, 10, 10); top: 15px'><span class='termometro'>"+tempMax+"</span></div>"
	+"<div id='indexMin' class='indexMaxMin' style='width:"+($("#horas").width()+200)+"px; top: 50%; border-bottom: 1px solid rgb(10, 10, 225); margin-bottom: 3px;'><span class='termometro' style='background: rgb(10, 10, 225, 0.6);'>"+tempMin+"</span></div></div>")


 	// DIAS ***
	for(var h=0; h < climaDias.length; h++){
		var fechaDias= new Date((climaDias[h].dt)*1000).toLocaleDateString()
		numeroDia = new Date((climaDias[h].dt)*1000).getDay()
		var amanecerEnDias= new Date((climaDias[h].sunrise)*1000).toLocaleTimeString().slice(0, -3)
		var anochecerEnDias= new Date((climaDias[h].sunset)*1000).toLocaleTimeString().slice(0, -3)
		var riseMoonEnDias= new Date((climaDias[h].moonrise)*1000).toLocaleTimeString().slice(0, -3)
		var setMoonEnDias= new Date((climaDias[h].moonset)*1000).toLocaleTimeString().slice(0, -3)
		var tempMaxDias= climaDias[h].temp.max
		var tempMinDias= climaDias[h].temp.min
		var iconoDias= climaDias[h].weather[0].icon
		var descripDias= climaDias[h].weather[0].description
		var probLluvia= (climaDias[h].pop)*100
		var faseNum= climaDias[h].moon_phase
		var faseLuna= fasesLunares(faseNum, faseLuna)
		var velocidad= (climaDias[h].wind_speed*3.6).toFixed(1)
	 	var direcViento= climaDias[h].wind_deg
	 	var iconoVientoEnDias= DirecViento(direcViento, iconoViento, velocidad)
		console.log(fasesLunares(faseNum, faseLuna))
		$("#dias").append("<div class='cajaDias'>"
		+"<span id='diaEnDias'><small>"+diaSemana[numeroDia]+"</small> "+fechaDias+"</span>"
		+"<div id=iconoEnDias>"
		+"<span id='tempEnDias'><span style='color: rgb(200,50,50, 0.8)'>"+tempMaxDias.toFixed(1)+"º&#8593; </span><span style='color: rgb(50,50,200, 0.8)'>&#8595;"+tempMinDias.toFixed(1)+"º</span></span>"
		+"<img src='http://openweathermap.org/img/wn/"+iconoDias+"@4x.png' style='width: 50%'>"
		+"<span id='descripEnDias'>"+descripDias+"</span>"
		+"</div>"
		+"<span class='spanDatosHoras' style='width: 25%'><img src='iconos/iconLluvia.png' style='width: 100%'><span style='position: absolute; top: 15%; left: 15%; font-weight: bold; color: rgb(30, 30, 70, 0.8)'>"+probLluvia.toFixed(0)+"%</span></span></span>"
		+"<div class='datosEnDias'>"
		+"<span class='riseSetEnDias'><span id='riseEnDias' class='spanRiseSet'><span>"+amanecerEnDias+"</span><img src='iconos/iconAmanecer.png' style='width: 35%;'></span><span id='setEnDias' class='spanRiseSet'><img src='iconos/iconAnochecer.png' style='width: 35%;'><span>"+anochecerEnDias+"</span></span></span>"
		+"<span style='display: flex; flex-direction: column; align-items: center;'><span class='riseSetEnDias'><span id='riseMoonEnDias' class='spanRiseSet'><span>"+riseMoonEnDias+"</span><img src='iconos/moonriseIcon.png' style='width: 33%;'></span><span id='setMoonEnDias' class='spanRiseSet'><img src='iconos/moonsetIcon.png' style='width: 33%;'><span>"+setMoonEnDias+"</span></span></span><span style='font-size: 0.7rem'>"+faseLuna+"</span></span>"
		+"<span style='position: relative; width:55%'><img src='"+iconoVientoEnDias+"' style='width: 100%'><span style='position: absolute; left: 15%; top: 35%; font-size: 0.7rem'>"+velocidad+"<small>Km/h</small></span></span>"
		+"</div>"
		)
	}
})
    
})