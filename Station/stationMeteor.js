import {lat, lon} from "../moduloLatLon.js";
console.log(lat, lon)

    //functionUbicacion(lat, lon)
var idioma = (navigator.language).slice(0, 2);
if (idioma !== "es") {
    idioma = "en";
}

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&lang="+idioma+"&exclude=minutely&appid=f5a03880bc93e6b9de4a16b7c4ef9aeb", {
	
	}
	).then(response => response.json()).then(clima => {
    console.log(clima)

    })
