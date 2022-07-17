 function functionUbicacion(lat, lon){
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
          console.log(ciudad, new Date().getDate());
        }
      );
    }