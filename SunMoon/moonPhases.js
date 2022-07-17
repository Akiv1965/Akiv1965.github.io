function functionMoonPhases(lat, lon, idioma, fechaLunaHoy){
var fechaISO = new Date().toISOString().slice(0, 10);
var offSet = (new Date().getTimezoneOffset() * -1) / 60;
var offSetVar = "+" + String(offSet).padStart(2, "0");
if (offSet < 0) {
  offSet = offSet * -1;
  offSetVar = "-" + String(offSet).padStart(2, "0");
}
//console.log(offSetVar);
//$.ajax(luna2).done(function(response2) {
fetch(
  "https://api.met.no/weatherapi/sunrise/2.0/.json?lat=" +
    lat +
    "&lon=" +
    lon +
    "&date=" +
    fechaISO +
    "&offset=" +
    offSetVar +
    ":00&days=8",
  {
    //mode: "no-cors",
    headers: { "User-Agent": "MoonPahses/0.1" },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    var moonrise;
          var moonset;
          var datoLuna = data.location.time;
          if (!datoLuna[0].moonrise) {
            moonrise = " - -:- - ";
          } else {
            moonrise = new Date(datoLuna[0].moonrise.time)
              .toTimeString()
              .slice(0, 5);
          }
          if (!datoLuna[0].moonset) {
            moonset = " - -:- - ";
          } else {
            moonset = new Date(datoLuna[0].moonset.time)
              .toTimeString()
              .slice(0, 5);
          }

          var azimuth00horas = datoLuna[0].moonposition.azimuth;
          if (moonrise.slice(0, -3) !== "- -:- ") {
            var azimuth =
              Number(moonrise.slice(0, -3)) * 15 + Number(azimuth00horas);

            if (azimuth > 360) {
              azimuth =
                Number(moonrise.slice(0, -3)) * 15 +
                Number(azimuth00horas) -
                360; //1 hora 15 grados
            }
          }
          console.log(
            moonrise.slice(0, -3),
            "...",
            azimuth00horas,
            "..",
            azimuth
          );
          var direccion;

          if (azimuth >= 350 && azimuth < 20) {
            direccion = "Norte";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "North";
            }
          }
          if (azimuth >= 20 && azimuth < 80) {
            direccion = "NorEste";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "Northeast ";
            }
          }
          if (azimuth >= 80 && azimuth < 110) {
            direccion = "Este";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "East ";
            }
          }
          if (azimuth >= 110 && azimuth < 170) {
            direccion = "SurEste";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "Southeast ";
            }
          }
          if (azimuth >= 170 && azimuth < 200) {
            direccion = "Sur";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "South ";
            }
          }
          if (azimuth >= 200 && azimuth < 260) {
            direccion = "SurOeste";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "Southwest ";
            }
          }
          if (azimuth >= 260 && azimuth < 290) {
            direccion = "Oeste";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "West ";
            }
          }
          if (azimuth >= 290 && azimuth < 350) {
            direccion = "NorOeste";
            if (idioma.slice(0, 2) !== "es") {
              direccion = "Nortwest ";
            }
          }

          //Click to see DIRECTION
          $("div #toolDirection").on("click", function () {
			var salidaLuna = "Salida Luna: "
				if(idioma == "en"){
					salidaLuna= "Moonrise: "
				}
            $("#azimuth").html(
              "<small id='salida'>"+salidaLuna+"</small><span style='font-size: 1.2em;  margin-top: 6px;'>" +
                direccion +
                "</span><small>" +
                azimuth.toFixed(1) +
                "&deg;</small>"
            );
            $("#azimuth").fadeIn(400);
            $("#azimuth").fadeOut(5800);
          });

          var diaCabecera = fechaLunaHoy;
          var riseSetWeek = [];
          $("#RiseSet").html(
            "<p id='moonRise' class='riseSet'><img src='iconos/moonriseIcon.png' style='width:20px; margin-right: 2px;'> " +
              moonrise +
              "</p><p id='moonSet' class='riseSet'><img src='iconos/moonsetIcon.png' style='width:20px; margin-right: 2px;'> " +
              moonset +
              "</p>"
          );
          for (var i = 1; i < datoLuna.length - 1; i++) {
            var riseWeek;
            var setWeek;
            if (!datoLuna[i].moonset) {
              setWeek = " - -:- - ";
            } else {
              setWeek = new Date(datoLuna[i].moonset.time)
                .toTimeString()
                .slice(0, 5);
            }
            if (!datoLuna[i].moonrise) {
              riseWeek = " - -:- - ";
            } else {
              riseWeek = new Date(datoLuna[i].moonrise.time)
                .toTimeString()
                .slice(0, 5);
            }

            console.log(riseWeek + "....." + setWeek);
            riseSetWeek.push([riseWeek, setWeek]);
          }
          //setTimeout(
            moonJson(moonrise, moonset, riseSetWeek, direccion, azimuth)
  })
}

function moonJson(moonrise, moonset, riseSetWeek, direccion, azimuth) {
    //Funcion AJAX para MOONJSON
    $.getJSON("moon2022.json", function (response) {
      //console.log(response);
      
      for (var i = 0; i < response.length; i = i + 24) {
        var fechaLunaJson = new Date(response[i].time).toLocaleDateString(); //new Date(response[i].time).toDateString().slice(0, 10);
        var edadLuna;
        var edadImgLuna;
        var porcentFase;
        var fase;
        var distancia;
        var version =
          "Fases Lunares " + chrome.runtime.getManifest().version;
        // Compara fecha actual con moon2020 para encontrar datos
        // Compare actual date and date moon2020 to find correct data
        //console.log(new Date(response[0].time).toLocaleDateString(), fechaLunaHoy)
        if (fechaLunaJson === fechaLunaHoy) {
          var numeroDia = new Date().getDay();
          var diasSemana = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
          ];
          var fecha = new Date().toLocaleDateString();
          var horaSalida = Number($("#moonRise").text().split(":")[0]);

          if (!horaSalida) {
            horaSalida = 0;
          }
          if ($("#moonRise").text().slice(-2) == "PM") {
            horaSalida = horaSalida + 12;
          }

          //console.log($("#moonRise").text(), "..HoraSalida...", horaSalida);
          i = i + horaSalida; //(new Date().toLocaleTimeString().split(":")[0]) Suma las horas del día
          
          edadLuna = "Día " +Number((response[i].age).toFixed()) ; //Math.floor(response[i].age)Math.round(response[i].age)(response[i].age).toFixed()
          edadImgLuna =Number((response[i].age).toFixed())//Number(Math.round(response[i].age)) Math.floor(response[i].age); ////
          porcentFase = response[i].phase;
          console.log(response[i].age, horaSalida, (edadImgLuna-Number(response[i].age)));
          if((edadImgLuna-Number(response[i].age)) <= 0.70 && (edadImgLuna-Number(response[i].age)) > 0.28 && (edadImgLuna-Number(response[i].age)) > 0){
            edadImgLuna = edadImgLuna-1;
            edadLuna = "Dia " + edadImgLuna;
          }
          if (edadImgLuna == 16 && porcentFase > 99.35) {
            edadImgLuna = 15;
            edadLuna = "Dia " + 15;
          }

          if (edadImgLuna == 14 && porcentFase > 99.10) {
            edadImgLuna = 15;
            edadLuna = "Dia " + 15;
          }
          if (edadImgLuna == 15 && porcentFase < 98.95) {
            edadImgLuna = 16;
            edadLuna = "Dia " + 16;
          }
          //console.log(response[i+24].age, response[i-2].age,response[i-1].age, response[i].age, edadImgLuna)
          if (edadImgLuna == 0) {
            edadImgLuna = 0;
            edadLuna = "Dia " + 1;
          }
          if (edadImgLuna > 29) {
            edadImgLuna = 0;
            edadLuna = "Dia " + 0;
          }
          /*if(edadImgLuna >= 29){
                                        edadImgLuna= 1
                                        edadLuna= "Dia "+1
                                    }*/

          distancia =
            "Distancia " +
            new Number(response[i].distance).toLocaleString();

          if (idioma == "en") {
            edadLuna = "Day " + edadImgLuna;
            if (edadImgLuna == 0) {
              edadImgLuna = 0;
              edadLuna = "Day " + 1;
            }
            distancia =
              "Distance: " +
              new Number(response[i].distance).toLocaleString();
            diasSemana = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            version = "Moon Phases " + chrome.runtime.getManifest().version;
            $("#toolRotation .tooltiptext").text("Click to see rotation");
            $("#toolDirection .tooltiptext").text(
              "Click to see moonrise point"
            );
            $("#starGif").attr("title", "Try the new MoonPhases app")
            $("#botonCreditos").attr("title", "About MoonPhases. Privacy Policy. Credits")
          }

          if (edadImgLuna < 15 && edadImgLuna > 0) {
            fase = " Creciente ";
            if (idioma == "en") {
              fase = " Waxing ";
            }
          } else {
            fase = "Menguante ";
            if (idioma == "en") {
              fase = " Waning ";
            }
          }
          if (porcentFase > 98.99) {
            fase = "Llena ";
            if (idioma == "en") {
              fase = " Full ";
            }
          }
          if (porcentFase <= 1) {
            fase = " Nueva ";
            if (idioma == "en") {
              fase = " New ";
            }
          }
          //Set icon for browser action

          console.log(response[i + 24].age + ".." + response[i].age);
          // Set data in fases.html
          $("#fecha").text(diasSemana[numeroDia] + " " + fecha);
          $("#datosLuna").html(
            "<p id='edadLunar' class='datosLunares'>" +
              edadLuna +
              ". <b>" +
              fase +
              "</b> " +
              porcentFase +
              "%<p id='distancia' class='datosLunares'>" +
              distancia +
              "Km</p>"
          );
          chrome.action.setIcon({
            path: { 32: "fasesLunaIcons/lunaFase" + edadImgLuna + ".png" },
          });
          chrome.action.setTitle({
            title:
              "\u{1F315} \u2191 " +
              moonrise +
              "\n\u{1F311} \u2193 " +
              moonset +
              "\n" +
              fase +
              " " +
              porcentFase +
              "%",
          });

          //Muestra efecto de rotación de la luna.
          var conteo = -1;

          if (edadImgLuna <= 13) {
            conteo = edadImgLuna + 1;
          }
          // Función ROTACIÓN	***
          function rotacion() {
            conteo++;
            if (conteo > 29) {
              conteo = 0;
            }
            //console.log(conteo, "....", edadImgLuna, "....", edadLuna)
            if (conteo == edadImgLuna) {
              clearInterval(intervalo);
            var salidaLuna = "Salida Luna: "
            if(idioma == "en"){
                salidaLuna= "Moonrise: "
            }
              $("#azimuth").html(
                "<small id='salida'>"+salidaLuna+"</small><span style='font-size: 1.2em;  margin-top: 6px;'>" +
                  direccion +
                  "</span><small>" +
                  azimuth.toFixed(1) +
                  "&deg;</small>"
              );

              setTimeout(function () {
                $("#azimuth").fadeOut(600);
              }, 3000);
            }

            $("#imgLuna").html(
              "<img src='fasesLunaIcons/lunaFase" + conteo + ".png'>"
            );

            setTimeout(function () {
              var backLuna = "fasesLunaIcons/lunaFase" + conteo + ".png";
              $("#imgLuna").css(
                "background-image",
                "url(" + backLuna + ")"
              );
            }, 100);
          }
          var intervalo = setInterval(rotacion, 200);
          $("div #toolRotation").on("click", function (e) {
            console.log(e);
            intervalo = setInterval(rotacion, 200);
            //intervalo= setInterval(rotacion(),200)
          });

          if (idioma !== "es") {
            $("#salida").text("Moon Rise: ");
          }

          $("#datos").text(edadImgLuna);
          $("#botonCreditos").text(version);
          // Set moon week column. Icons, porcent and days
          var edadImgLunaPrev = Number(edadLuna.slice(4, 6));
          //console.log(riseSetWeek)
          for (var k = 0; k <= 6; k++) {
            i = i + 24;
            //console.log(response[i+72].age)
            var porcentaje = response[i].phase;

            edadImgLunaPrev++;
            numeroDia = numeroDia + 1;
            if (numeroDia > 6) {
              numeroDia = 0;
            }
            if (edadImgLunaPrev > 29) {
              edadImgLunaPrev = 0;
            }
            if (edadImgLunaPrev == 0 && porcentaje > 0.98) {
              edadImgLunaPrev = 1;
            }
            console.log("Numero.." + numeroDia);
            $("#semanaLunar").append(
              "<div id='filaLunar'><div class='diaSemana'><span id='dia' class='filaTexto'>" +
                diasSemana[numeroDia] +
                "</span><span class='filaTexto' style='font-size: 0.9em'>" +
                porcentaje +
                "%</span></div><img src='fasesLunaIcons/lunaFase" +
                edadImgLunaPrev +
                ".png' style='width: 41px;'><div class='diaSemana'><span class='filaTexto' style='font-size: 0.9em'>&#8679;  " +
                riseSetWeek[k][0] +
                "</span><span class='filaTexto' style='font-size: 0.9em'>&#8681;  " +
                riseSetWeek[k][1] +
                "</span></div></div>"
            );
          }

          i = 100000;
        }
      }
    });
  }