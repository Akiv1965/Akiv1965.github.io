function lanzarAsteroides() {
	//Conexión AJAX con api.nasa
	$.ajax({
		type: "GET",
		url: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=hb4mXofbbZ3GHnWy48wjFiXBGj7wkadXhEN9TOYA",
		success: function (datos) {
			var arrayFechas = [];
			var objCercanos = datos.near_earth_objects;
			
			console.log(datos, new Date(-2177879400000).toLocaleDateString(), new Date().getTime())
			for (var i = 0; i < objCercanos.length; i++) {
				//console.log(objCercanos[i]);
				var fechaObjCercano = objCercanos[i].close_approach_data;
				
				for (var k = 0; k < fechaObjCercano.length; k++) {
					var distancia= Number(fechaObjCercano[k].miss_distance.kilometers).toFixed()
					var velocidad= Number(fechaObjCercano[k].relative_velocity.kilometers_per_hour).toFixed()
					console.log(Number(velocidad).toLocaleString())
					//console.log(fechaObjCercano[k].close_approach_date, ".....", (new Date().toISOString()).slice(5,7))
					if (
						Number(fechaObjCercano[k].close_approach_date.slice(0, 4)) >=
							Number(new Date().toISOString().slice(0, 4)) &&
						Number(fechaObjCercano[k].close_approach_date.slice(5, 7)) >=
							Number(new Date().toISOString().slice(5, 7))
					) {
						//console.log(fechaObjCercano[k].close_approach_date)
						arrayFechas.push({
							fechaNumero: Number(fechaObjCercano[k].epoch_date_close_approach), //Number(fechaObjCercano[k].close_approach_date.slice(0, 4)),
							fechaTotal: fechaObjCercano[k].close_approach_date,
							distancia: Number(distancia).toLocaleString(),
							velocidad: Number(velocidad).toLocaleString(),//fechaObjCercano[k].relative_velocity.kilometers_per_hour.toLocaleString()
							objetoCompleto: objCercanos[i]
						});
					}
				}
			}
			arrayFechas = arrayFechas.sort(function (a, b) {
				return a.fechaNumero - b.fechaNumero;
			});
			console.log(arrayFechas);
			for (var j = 0; j < 101; j++) {
				var asteroideDatos = arrayFechas[j].objetoCompleto;
				var imgRiesgo = "iconos/iconDangerGreen.png";
				if (asteroideDatos.is_potentially_hazardous_asteroid == true) {
					imgRiesgo = "iconos/iconDangerRed.png";
				}
				$("#listaAsteroides").append(
					"<div id='asteroide" +
						j +
						"' class='asteroideClass'><span class='datosAst' id='fechaAcercamiento'>" +
						arrayFechas[j].fechaTotal +
						"</span><span class='datosAst' id='nombreAsteroide'>" +
						asteroideDatos.name_limited +
						"<br><small>" +
						asteroideDatos.name +
						"</small></span>"+
						"</span><span class='datosAst' id='distanciaTierra'>" +
						arrayFechas[j].distancia +
						"<small>Kms</small></span><span class='datosAst' id='velocidad'>" +
						arrayFechas[j].velocidad +
						"<small>Km/h</small></span><span class='datosAst' id='diametro'>"
						+" <span id='diametroMax'>" +
						asteroideDatos.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
							2
						) +
						"Km</span><span id='diametroMin'>x" +
						asteroideDatos.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
							2
						) +
						" Km</span></span><span class='datosAst' id='peligro'><img src='" +
						imgRiesgo +
						"' ' style='width: 25px;'></div>"
				);
			}
			$(".asteroideClass:even").css({
				background: "rgb(195,195,195, 0.9)",
				color: "rgb(65,65,65, 0.9)"
			})
		}
	});
}
