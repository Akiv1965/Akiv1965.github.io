
$(document).ready(function(){
    	$("select").on("change", function(){
		zona= $("#zona").val()
		visibilidad= $("#visibilidad").val()
		console.log(zona, visibilidad)
		if(zona == "global"){
			$("#visible").attr("disabled", true)
		} else{
			$("#visible").attr("disabled", false)
		}
		if(visibilidad == "visible"){
			$("#global").attr("disabled", true)
		}else {
			$("#global").attr("disabled", false)
		}
		fotoSatelite(zona, visibilidad)
	})

})

var zona= "mediterranean";
var visibilidad= "infrared";
	fotoSatelite(zona, visibilidad)

function fotoSatelite(zona, visibilidad){

	fetch("https://api.met.no/weatherapi/geosatellite/1.4/available.json?area="+zona+"&type="+visibilidad+"&size=normal", {
		//mode: "no-cors",
		headers: {"User-Agent": "Station/0.1"}
	}
	).then(response => response.json()).then(dataMediterranean => {console.log(dataMediterranean)
		var imgMediterranean= dataMediterranean[dataMediterranean.length-1].uri
		var fechaSatelite= new Date(dataMediterranean[dataMediterranean.length-1].params.time).toLocaleString()
		$("#imgMediterranean").attr("src", imgMediterranean)
		$("#fechaSatelite").text(fechaSatelite)
		$("#ampliar a").attr("href", imgMediterranean)
	})
	}