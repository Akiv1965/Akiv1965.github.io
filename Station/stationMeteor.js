
navigator.geolocation.getCurrentPosition(function(position) {

    const lat =  Number(position.coords.latitude);//40.481815
    const lon =  Number(position.coords.longitude);//-3.364305




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
	var fechaActual= new Date().toLocaleDateString()
	var numeroDia = new Date().getDay()
	var diaSemana= ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]
	var velocidad= (climaActual.wind_speed*3.6).toFixed(1)
	var visibilidad= (climaActual.visibility).toLocaleString()
	var direcViento= climaActual.wind_deg
    var iconoViento= DirecViento(direcViento, iconoViento, velocidad);
	var amanecer= new Date((climaActual.sunrise)*1000).getHours()+":"+new Date((climaActual.sunrise)*1000).getMinutes()
	var anochecer= new Date((climaActual.sunset)*1000).getHours()+":"+new Date((climaActual.sunset)*1000).getMinutes()
	var arrayTemps=[]
	var tempMin
	var tempMax
	var indexPosition
	//DirecViento(direcViento, iconoViento, velocidad)
	console.log(DirecViento(direcViento, iconoViento, velocidad))
	$("#iconoViento").html("<span id='velocidadViento'>"+velocidad+"<small>Km/h</small></span><img src='"+iconoViento+"' style='width: 100%'>")
	//DIA ACTUAL
	$("#tempActual").text(climaActual.temp.toFixed(1)+"º")
	$("#sensacActual").html("<small>Sensación térmica:</small><b>"+climaActual.feels_like.toFixed(1)+"º</b>")
	$("#iconoActual").html("<img src='http://openweathermap.org/img/wn/"+iconoActual+"@4x.png' style='width: 85%;'><span id='descripActual'>"+descripActual+"</span>")
	
	$("#riseAndSet").html(
		"<span class='riseAndSet' id='rise'><img src='iconos/iconAmanecer.png' style='width: 100%;'>"+amanecer+"</span>"
		+"<span class='riseAndSet' id='set'><img src='iconos/iconAnochecer.png' style='width: 100%;'>"+anochecer+"</span>"
		)
	$("#presion").html("<img src='iconos/iconPress.png' style='width: 15%;'><span>"+climaActual.pressure+"<small>mbar</small></span>")
	$("#humedad").html("<img src='iconos/iconHumedad.png' style='width: 15%;'><span>"+climaActual.humidity+"<small>%</small></span>")
	$("#uvi").html("<img src='iconos/iconUV2.png' style='width: 15%;'><span><small> Índice </small>"+climaActual.uvi+"</span>")
	$("#visibility").html("<img src='iconos/iconVisibility.png' style='width: 15%;'><span>"+visibilidad+"<small>mt</small></span>")
	//console.log($("#actual").height())
	var altura= (($("#actual").height())/2)-30;//$(".cajaHoras").css("height")

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
	 var probLluvia= (climaHoras[0].pop)*100
	 
	 //console.log(DirecViento(direcViento, iconoViento, velocidad))
	 $("#horas").append("<div class='cajaHoras'>"
	 +"<span id='horaEnHoras'>"+hora+"</span>"
	 +"<div id='boxTemp'><span id='tempEnHoras' style='bottom:"+posicion+"px'>"+tempHoras+"</span></div>"
	 +"<div id='iconoEnHoras' ><img src='http://openweathermap.org/img/wn/"+iconoHoras+"@4x.png' style='width: 35%'><span id='descripEnHoras'>"+descripHoras+"</span></div>"
	 //+"<div id='datosEnHoras'><span class='spanDatosHoras'><img src='"+iconoVientoEnHoras+"' style='width: 100%'></span><span class='spanDatosHoras'><img src='iconos/iconLluvia.png' style='width: 50%'><span style='width:100%; position: absolute; top: 7px; left: 11px; font-size: 0.8rem'>"+probLluvia+"%</span></div>"
	 +"</div>")
	 
	}
	console.log($("#horas").width(), $(".cajaHoras").height(),"alticono..", $("#iconoEnHoras").height() )
	$("#horas").prepend("<div style='height: 100%; position:sticky; left:0px; font-size: 0.7rem'>"
	+"<div id='indexMax' class='indexMaxMin' style='width:"+$("#horas").width()+"px; border-top: 1px solid rgb(225, 10, 10); top: 15px'><span class='termometro'>"+tempMax+"</span></div>"
	+"<div id='indexMin' class='indexMaxMin' style='width:"+$("#horas").width()+"px; top: 50%; border-bottom: 1px solid rgb(10, 10, 225); margin-bottom: 3px;'><span class='termometro' style='background: rgb(10, 10, 225, 0.6);'>"+tempMin+"</span></div></div>")


 	// DIAS ***
	for(var h=0; h < climaDias.length; h++){
		var fechaDias= new Date((climaDias[h].dt)*1000).toLocaleDateString()
		numeroDia = new Date((climaDias[h].dt)*1000).getDay()
		var tempMaxDias= climaDias[h].temp.max
		var tempMinDias= climaDias[h].temp.min
		var iconoDias= climaDias[h].weather[0].icon
		var descripDias= climaDias[h].weather[0].description

		$("#dias").append("<div class='cajaDias'>"
		+"<span id='diaEnDias'>"+diaSemana[numeroDia]+" <small>"+fechaDias+"</small></span>"
		+"<div id=iconoEnDias>"
		+"<span id='tempEnDias'>"+tempMaxDias+" - "+tempMinDias+"</span>"
		+"<img src='http://openweathermap.org/img/wn/"+iconoDias+"@4x.png' style='width: 40%'>"
		+"<span id='descripEnDias'>"+descripDias+"</span>"
		+"</div>"

		)
	}
})
    
})