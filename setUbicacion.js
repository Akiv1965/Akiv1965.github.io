 //$(document).ready(function () {
  

 function functionUbicacion(lat, lon){
  navigator.geolocation.getCurrentPosition(function(position) {

    var lat =  Number(position.coords.latitude);//40.481815
    var lon =  Number(position.coords.longitude);//-3.364305
 var ubicacion;
      $.get(
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
          lat +
          "&lon=" +
          lon +
          "",
        function (ciudad) {
          ubicacion = ciudad.address;
          $("#ciudad").text(ubicacion.city);
          $("#lat").text(lat)
          $("#lon").text(lon)
          console.log(ciudad, new Date().getDate());
          //return lat, lon
        }
      );
      })
    }
 // });
  