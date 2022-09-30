function airQuality(lugar, paisCode, idioma){
const options = {method: 'GET', headers: {accept: 'application/json'}};
console.log(lugar, paisCode, idioma)
fetch('https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=10000&country_id='+paisCode+'&city='+lugar+'&order_by=lastUpdated&dumpRaw=false', options)
  .then(response => response.json())
  .then(response =>    { console.log(response)

    if(idioma != "es"){
    var objectParams={
        "no": "Nitrogen Monoxide",
        "no2": "Nitrogen Dioxide",
        "ch4": "Methane",
        "so2": "Sulfur Dioxide",
        "o3": "Ozone",
        "co": "Carbon Monoxide",
        "bc": "Black Carbon",
        "pm10": "Particle <10 microns",
        "pm25": "Particle <25 microns"
    }
    } else {
      var objectParams={
         "no": "Monóxido de nitrógeno",
         "no2": "Dióxido de Nitrógeno",
         "ch4": "Metano",
         "so2": "Dióxido de azufre",
         "o3": "Ozono",
         "co": "Monóxido de carbono",
         "bc": "Carbón negro",
         "pm10": "Partícula <10 micras",
         "pm25": "Partícula <25 micras"
      }
    }
    var datosAQ= response.results[0].measurements

    for(var t=0; t < datosAQ.length; t++){
      var parametro= datosAQ[t].parameter
      var valor= datosAQ[t].value
      var unidad= datosAQ[t].unit
      var ppm= (valor/1000)/1.2
      console.log(parametro, ppm)
      

      $("#airQuality").append(
        "<span class='classParam' title='"+objectParams[parametro]+"'><small style='width: 30%; cursor: pointer;'>"+parametro+":</small><span style='width: 30%'><big>"+valor+"</big><small>"+unidad+"</small></span>"
        +"<div class='escala'><span id='verde"+parametro+"' class='spanColor' style='background: green;'></span><span id='naranja' class='spanColor' style='background: orange;'></span><span id='rojo' class='spanColor' style='background: red;'></span></div></span>")
        
        scalaLuz(parametro, ppm)
    }
    
  }
    )
  .catch(err => console.error(err));
}