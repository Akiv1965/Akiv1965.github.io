
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
	var iconoActual= climaActual.weather[0].icon
	var descripActual= climaActual.weather[0].description
	var fechaActual= new Date().toLocaleDateString()
	var numeroDia = new Date().getDay()
	var diaSemana= ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]
	var velocidad= (climaActual.wind_speed*3.6).toFixed(1)
	var visibilidad= (climaActual.visibility).toLocaleString()
	var direcViento= climaActual.wind_deg
    var iconoViento;
	var amanecer= new Date((climaActual.sunrise)*1000).getHours()+":"+new Date((climaActual.sunrise)*1000).getMinutes()
	var anochecer= new Date((climaActual.sunset)*1000).getHours()+":"+new Date((climaActual.sunset)*1000).getMinutes()
	
	DirecViento(direcViento, iconoViento, velocidad)
	
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
	
	// 48 HORAS  **

	for(var i=1; i < climaHoras.length; i++){
	 console.log()
	 var hora= new Date((climaHoras[i].dt)*1000).toLocaleTimeString().slice(0, -3)
	 var iconoHoras= climaHoras[i].weather[0].icon
	 var descripHoras= climaHoras[i].weather[0].description
	 var tempHoras= climaHoras[i].temp

	 $("#horas").append("<div class='cajaHoras'>"
	 +"<span id='horaEnHoras'>"+hora+"</span>"
	 +"<div id='iconoEnHoras'><span id='tempEnHoras'>"+tempHoras+"</span><img src='http://openweathermap.org/img/wn/"+iconoHoras+"@4x.png' style='width: 90%'><span id='descripEnHoras'>"+descripHoras+"</span></div>"
	 +"</div>")
	}


})
    
})