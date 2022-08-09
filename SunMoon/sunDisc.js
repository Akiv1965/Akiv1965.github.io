

navigator.geolocation.getCurrentPosition(function(position) {
	for(var h=0; h < 30; h++){
	$("#hiddenDiv").append("<img src='fasesLunaIcons/lunaFase" + h + ".png' width='10px' hidden>")
}
	var idioma = (navigator.language).slice(0, 2);
  		if (idioma !== "es") {
		 	 idioma = "en";
  		}
	var lat =  Number(position.coords.latitude);//40.481815
	var lon =  Number(position.coords.longitude);//-3.364305
	var fechaLunaHoy = new Date().toLocaleDateString();
	
	
  functionUbicacion(lat, lon)
  functionMoonPhases(lat, lon, idioma, fechaLunaHoy)
fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&lang="+idioma+"&exclude=minutely&appid=f5a03880bc93e6b9de4a16b7c4ef9aeb", {
	
	}
	).then(response => response.json()).then(clima => {console.log(clima)
		var climaActual= clima.current
		var semanaSolar= clima.daily
		var iconoActual= climaActual.weather[0].icon
		var fechaActual= new Date().toLocaleDateString()
		var numeroDia = new Date().getDay()
		var diaSemana= ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]
		var velocidad= (climaActual.wind_speed*3.6).toFixed(1)
		var direcViento= climaActual.wind_deg
		console.log(direcViento)
		var presionActual= climaActual.pressure
		var top= "2px"
		var left= "0px"
		var iconoViento;
		var descripcion= climaActual.weather[0].description
		var amanecer= new Date((climaActual.sunrise)*1000).toLocaleTimeString('en-GB').slice(0, 5)//.getHours()+":"+new Date((climaActual.sunrise)*1000).getMinutes()
	 	var anochecer= new Date((climaActual.sunset)*1000).toLocaleTimeString('en-GB').slice(0, 5)//.getHours()+":"+new Date((climaActual.sunset)*1000).getMinutes()
		var duracionMinutos= ((climaActual.sunset)-(climaActual.sunrise))/60
		var duracionNoche= 1440- duracionMinutos;
		var duracionNocheHoras= Math.floor(duracionNoche/60)
		var duracionNocheMinutos= (duracionNoche-(duracionNocheHoras*60)).toFixed()
	// Set sunrise and sunset time 
		var duracionDiaHoras= Math.floor(duracionMinutos/60);
		var duracionDiaMinutos= (duracionMinutos-(duracionDiaHoras*60)).toFixed();   
   // Set data for sun disc (Sun hours)****
		var duracionDashArray = (Number(duracionMinutos) / 9.17).toFixed()
		var duracionSol = ((((climaActual.sunset) * 1000)-new Date().getTime()) / 60000)  
		var duracionSolDashArray = (4+((duracionMinutos-duracionSol) / 9.17)).toFixed()
		var mensDiaNoche= "Hasta el anochecer"
		var iconMoonReal= $("#imgLuna").attr("src")
		console.log(new Date().getTime() < new Date((climaActual.sunrise)*1000).getTime())
		
		tiempoRestHoras = Math.floor((duracionSol)/60);
		tiempoRestMinutos= ((duracionSol)-(tiempoRestHoras*60)).toFixed();
		tiempoRestSegundos= 0	
		//console.log(tiempoRestHoras, "-", tiempoRestMinutos, "-", tiempoRestSegundos)
		//moonFunction()
		
		$("#hastaElAnochecer").html("<span id='tiempoDescuento' style='font-size: 0.9em; color: rgb(0,255,255, 0.9)'></span>")
		$("#hastaElAmanecer").html("- -:- -")
   // Set data for sun disc (night before 12h) 	  
		if(duracionSol < 0){
			duracionSol= ((((climaActual.sunrise) * 1000) - new Date().getTime())/60000)+1440
			duracionSolDashArray = (163-((duracionSol) / 9.17)).toFixed()
			mensDiaNoche= "Hasta el amanecer"
		    tiempoRestHoras = Math.floor((duracionSol)/60);
			tiempoRestMinutos= ((duracionSol)-(tiempoRestHoras*60)).toFixed();
			tiempoRestSegundos= 0
			$("#imgSun").attr("href", iconMoonReal)
			$("#hastaElAnochecer").html("- -:- -")
			$("#hastaElAmanecer").html("<span id='tiempoDescuento' style='font-size: 0.9em; color: rgb(25,25,112, 0.9)'></span>")
			
			//$(".flechitas").css("animation-name", "flechitaNoche")
			//$("#reloj").css("top", "50%")
			//console.log(duracionSol)
			}
	// Set data for sun disc (night after 12h) 	
		if(new Date().getTime() < new Date((climaActual.sunrise)*1000).getTime()){
			duracionSol= 1440-((((climaActual.sunrise) * 1000) - new Date().getTime())/60000)
		 	duracionSolDashArray = (((duracionSol) / 9.17)-3).toFixed()
		 	mensDiaNoche= "Hasta el amanecer"
		 	tiempoRestHoras = Math.floor((1440-duracionSol)/60);
		 	tiempoRestMinutos= ((1440-duracionSol)-(tiempoRestHoras*60)).toFixed();
		 	tiempoRestSegundos= 0
			 $("#imgSun").attr("href", iconMoonReal)
			 $("#hastaElAnochecer").html("- -:- -")
			 $("#hastaElAmanecer").html("<span id='tiempoDescuento' style='font-size: 0.9em; color: rgb(25,25,112, 0.9)'></span>")
			 //$(".flechitas").css("animation-name", "flechitaNoche")
			 //$("#reloj").css("top", "50%")
		 //console.log(duracionSol)
	}
	
	// Operation to find out X and Y coordinates and set icon image on disc
	  var DashArrayGrados = (duracionSolDashArray * 2.29); //2.29 = 360º/157dash
      var DashArrayRadians = DashArrayGrados * (Math.PI / 180)
      var coordX = (Math.cos(DashArrayRadians) * 25)+45;
      var coordY = (Math.sin(DashArrayRadians) * 25)+45;

		 console.log(amanecer, ";;", anochecer, ";;", duracionMinutos)

		 //setInterval(crono, 1000)
		 
		  
	
	 
	//$("#horasSetRise").html("<span style='float: left; display: flex; align-items: flex-end; font-size: 1.5em; color: cyan;'><img src='iconos/iconSunrise.png' style='width: 30px'>"+amanecer+"</span><span style='float: right; display: flex; align-items: flex-end; font-size: 1.5em; color: midnightblue; font-weight: bold'><img src='iconos/iconSunset.png' style='width: 30px'>"+anochecer+"</span>")
	$("#fechaActual").html("<span><b><small>"+diaSemana[numeroDia]+"  </small><br>"+fechaActual+"</b></span>")
	$("#amanecer").text(amanecer)
	$("#anochecer").text(anochecer)
	$("#imgSun").attr({ x: coordX, y: coordY })
	$("#base-timer-path-remaining").attr("stroke-dasharray", duracionDashArray + " 157")
	$("#base-timer-path-remaining2").attr("stroke-dasharray", duracionSolDashArray + " 157")
	$("#textSVGAmanecer").text(duracionDiaHoras+" horas "+duracionDiaMinutos+" minutos")
	$("#textSVGAnochecer").text(duracionNocheHoras+" horas "+duracionNocheMinutos+" minutos")

	for (let i = 1; i < semanaSolar.length; i++) {
		var amanecerSemanal= new Date((semanaSolar[i].sunrise)*1000).toLocaleTimeString('en-GB').slice(0, 5)
		var anochecerSemanal= new Date((semanaSolar[i].sunset)*1000).toLocaleTimeString('en-GB').slice(0, 5)
		var duracionMinutosSemanal= ((semanaSolar[i].sunset)-(semanaSolar[i].sunrise))/60
		var duracionDiaHorasSemanal= Math.floor(duracionMinutosSemanal/60);
		var duracionDiaMinutosSemanal= (duracionMinutosSemanal-(duracionDiaHorasSemanal*60)).toFixed(); 
		numeroDia++
		if(numeroDia > 6){
			numeroDia=0
		}
		$("#semanaSolar").append("<div class='blockSemanal'>"
		+"<span class='amaneceAnoche'><img src='iconos/iconAmanecer.png' style='width: 35px'>"+amanecerSemanal+"</span>"
		+"<span class='amaneceAnoche centroSemanal'><span class='diaSemanal'>"+diaSemana[numeroDia]+"</span><span id='duracionSemanal'>"+duracionDiaHorasSemanal+"h "+duracionDiaMinutosSemanal+"min"+"</span></span>"
		+"<span class='amaneceAnoche'><img src='iconos/iconAnochecer.png' style='width: 35px'>"+anochecerSemanal+"</span></div>"
		)
		
	}
})
})