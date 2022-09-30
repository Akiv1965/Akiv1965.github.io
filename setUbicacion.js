 //$(document).ready(function () {
  

 function functionUbicacion(lat, lon){
 // navigator.geolocation.getCurrentPosition(function(position) {

    //var lat =  Number(position.coords.latitude);//40.481815
    //var lon =  Number(position.coords.longitude);//-3.364305
    var idioma = (navigator.language).slice(0, 2);
if (idioma !== "es") {
    idioma = "en";
}

      $.get(
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
          lat +
          "&lon=" +
          lon +
          "",
        function (ciudad) {
          ubicacion = ciudad.address;
          lugar= ubicacion.city;
          paisCode= ubicacion.country_code
          $("#ciudad").text(lugar);
          $("#direccionPostal").html("<span>"+ubicacion.state+"</span>"
          +"<span>"+ubicacion.postcode+" "+ubicacion.country+"</span>")
          console.log(ciudad, new Date().getDate());
          airQuality(lugar, paisCode, idioma)
        }
      );
      //})
    }
 // });
  