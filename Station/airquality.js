function airQuality(lugar, paisCode){
const options = {method: 'GET', headers: {accept: 'application/json'}};
console.log(lugar, paisCode)
fetch('https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=10000&country_id='+paisCode+'&city='+lugar+'&order_by=lastUpdated&dumpRaw=false', options)
  .then(response => response.json())
  .then(response =>    { console.log(response)

    var objectParams={
        "no": "Nitrogen Monoxide",
        "no2": "Nitrogen Dioxide",
        "ch4": "Methane",
        "so2": "Sulfur Dioxide",
        "o3": "Ozone",
        "co": "Carbon Monoxide",
        "bc": "Black Carbon",
        "pm10": "Particle <10 microns"
    }
    var datosAQ= response.results[0].measurements

    for(var t=0; t < datosAQ.length; t++){
      var parametro= datosAQ[t].parameter
      var valor= datosAQ[t].value
      var unidad= datosAQ[t].unit
      $("#airQuality").append("<span>"+objectParams[parametro]+": "+valor+unidad+"</span>")
    }
    
  }
    )
  .catch(err => console.error(err));
}