//document.addEventListener('DOMContentLoaded', function () {

	var idioma = navigator.language;

	if (idioma.slice(0, 2) !== "es") {
		idioma = "en"
	}

 function curiosityLaunch () {
		// Abre página de créditos
		// Open credit page
		$(".linkTitulo").on("click", function () {
			chrome.windows.create({ url: "creditos/creditos.html", width: 330, height: 650, left: 250, top: 12, type: "popup" })
		})

		$("#starGif").on("click", function () {
			window.open("https://play.google.com/store/apps/details?id=com.rover.curiositycams", "_blank")
		})

		//Conexión AJAX con api.nasa 
		$.ajax({

			//  GET Manifest para ver cámaras con imágenes y fechas última imagen 
			//  GET Manifest to see cams with images and the last image date
			type: "GET",
			url: "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=hb4mXofbbZ3GHnWy48wjFiXBGj7wkadXhEN9TOYA",
			success: function (data) {
				console.log(data.photo_manifest)
				var fotoLength = data.photo_manifest.photos.length - 1;
				var fotoLengthArchivo = fotoLength
				var diaSolUltimo = data.photo_manifest.photos[fotoLength].sol
				var diaSolUltimoArchivo
				var diaTierraUltimo=new Date(data.photo_manifest.photos[fotoLengthArchivo].earth_date).toLocaleDateString()
				var arrayImagenes = []
				$("#cabListaFechas").html("<small>"+diaTierraUltimo+" - <small>(Sol"+diaSolUltimo+")</small></small><hr>Cámaras On-Line: <big>"+data.photo_manifest.photos[fotoLengthArchivo].cameras.length+"</big> <small> ("+data.photo_manifest.photos[fotoLengthArchivo].total_photos+" Fotos)</small>")
				//Monta desplegable para archivo de fechas
				//Set menu for dates archive	
				for (var k = 0; k < 8; k++) {
					diaSolUltimoArchivo = data.photo_manifest.photos[fotoLengthArchivo].sol
					diaTierraUltimo = new Date(data.photo_manifest.photos[fotoLengthArchivo].earth_date).toLocaleDateString()
					$("#fechasID").append("<option value='" + fotoLengthArchivo + "'><span class='listaFechas'>" + diaTierraUltimo + "<small>(Sol" + diaSolUltimoArchivo + ")</small></span> <span class='listaFechas'> Cámaras: " + data.photo_manifest.photos[fotoLengthArchivo].cameras.length + "</span>   <span class='listaFechas'> Total fotos: " + data.photo_manifest.photos[fotoLengthArchivo].total_photos + "</span></option>")
					fotoLengthArchivo--
				}
				var camaraArray = data.photo_manifest.photos[fotoLength].cameras
				var camara = data.photo_manifest.photos[fotoLength].cameras[0]
				var indexFoto = 0

				// Monta Galería y botones de cámara
				// Set gallery and cams buttons
				creaBotones()
				setFoto()

				//Evento para el archivo de fechas
				//Event for dates archive		
				$("#fechasID").change(function () {
					console.log($("#fechasID").val())
					fotoLengthArchivo = $("#fechasID").val()
					camaraArray = data.photo_manifest.photos[fotoLengthArchivo].cameras
					diaSolUltimo = data.photo_manifest.photos[fotoLengthArchivo].sol
					camara = data.photo_manifest.photos[fotoLengthArchivo].cameras[0]
					$("#cabListaFechas").html("<small>"+data.photo_manifest.photos[fotoLengthArchivo].earth_date+" - <small>(Sol"+diaSolUltimo+")</small></small><hr> Cámaras On-Line: <big>"+data.photo_manifest.photos[fotoLengthArchivo].cameras.length+"</big><small> ("+data.photo_manifest.photos[fotoLengthArchivo].total_photos+" Fotos)</small>")
					creaBotones()
					setFoto()
				})


				// Función para cambiar de cámaras
				// Function for change cams
				$("#cajaBotones").on("click", function (e) {
					console.log($(this).attr("id"))
					console.log(e.target.id)
					camara = e.target.id//$(this).attr("id")
					//$(".botonCamara").css({ "color": "rgb(173, 255, 47, 0.8)", "font-weight": "normal" })
					$("button:enabled").css({ "color": "rgb(170, 255, 40, 0.8)", "font-weight": "bold" })
					$("#" + camara).css({ "color": "rgba(200, 40, 40)", "font-weight": "bold" })
					indexFoto = 0;
					setFoto();
				})

				// Movimiento de flechas
				// Arrows movement	
				$(".flechas").on("click", function () {
					if ($(this).attr("id") == "next") {
						indexFoto++;
						console.log(indexFoto)
						setFoto();
					} else {
						indexFoto--;
						if (indexFoto < 0) {
							indexFoto = 0
							window.alert("Está al principio de la galería")
						}
						setFoto()
					}
				})

				// Monta thumbnails
				// Set thumbnails
				$(".row").click(function (e) {
					// console.log(e)
					console.log(e.originalEvent.path)
					$("#galeria #" + ($("#primer").val() - 1) + " #indexThumb").css({ width: "19px", fontSize: "0.9em" })
					var urlImg = e.originalEvent.path[0].currentSrc
					indexFoto = Number(e.originalEvent.path[1].id) + 1
					$("#primer").val(indexFoto)
					$("#imgMarte").attr("src", urlImg)
					//$("#galeria #"+($("#primer").val()-1)+" #indexThumb").animate({width: "45px", fontSize: "1.4em"})
					indexFoto--;
				})

				// Crea botones para cámaras con imágenes
				// Set buttons for cams with images
				function creaBotones(nombreCamaraFull) {
					//$("#cajaBotones").empty()
					$(":button").css({"color": "rgb(15, 205, 30,0.6)", "opacity": "0.4"})
					$(":button").attr("disabled", true)
					indexFoto = 0
					for (var i = 0; i < camaraArray.length; i++) {
						
						//$("#cajaBotones").append("<span id='" + camaraArray[i] + "' class='botonCamara'>" + camaraArray[i] + "</span>")
						if (idioma.slice(0, 2) == "es") {
							switch (camaraArray[i]) {
								case "FHAZ":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
								case "RHAZ":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
								case "MAST":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
								case "CHEMCAM":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
								case "MAHLI":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
								case "MARDI":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
								case "NAVCAM":
									$("#" + camaraArray[i]).css({ "color": "rgba(170, 255, 40)", "font-weight": "bold", "opacity": "1" })
									$("#"+camaraArray[i]).attr("disabled", false)
									break;
							}
							console.log(camaraArray[0])
						$("#" + camaraArray[0]).css({ "color": "rgba(200, 40, 40)", "font-weight": "bold", "opacity": "1" })
						}
						
					}
					$("#cajaBotones").append("<span id='ping' hidden><img id='imgBall' src='iconos/pingGreen.png' width='9px'></span>")
				}

				// Función para montar la galería
				// Function to set the gallery images 		
				function setFoto() {
					arrayImagenes = []
					$.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + diaSolUltimo + "&camera=" + camara + "&api_key=hb4mXofbbZ3GHnWy48wjFiXBGj7wkadXhEN9TOYA", function (data) {
						console.log(data)
						$(".row").empty()
						var fotoMarte = data.photos

						if (indexFoto > data.photos.length - 1) {
							indexFoto--;
							window.alert("Esta cámara no tiene más imágenes")
						}
						var fechaImg = new Date(fotoMarte[indexFoto].earth_date).toLocaleDateString()
						var nombreCamaraFull = fotoMarte[indexFoto].camera.full_name
						if (idioma.slice(0, 2) == "es") {
							switch (fotoMarte[indexFoto].camera.name) {
								case "FHAZ":
									nombreCamaraFull = "Cámara frontal para prevención de riesgos"
									break;
								case "RHAZ":
									nombreCamaraFull = "Cámara trasera para prevención de riesgos"
									break;
								case "MAST":
									nombreCamaraFull = "Cámara del mástil"
									break;
								case "CHEMCAM":
									nombreCamaraFull = "Conjunto de cámaras para química"
									break;
								case "MAHLI":
									nombreCamaraFull = "Cámara manual"
									break;
								case "MARDI":
									nombreCamaraFull = "Cámara de descenso"
									break;
								case "NAVCAM":
									nombreCamaraFull = "Cámara de navegación"
									break;
							}
						}
						$("#nombreCam").text(nombreCamaraFull + " (" + fotoMarte[indexFoto].camera.name + ")")
						$("#primer").val(indexFoto + 1)
						$("#ultimo").val(data.photos.length)
						$("#ultimo").attr("max", data.photos.length)
						ultimoIndexReset = data.photos.length
						$(".slides").html("<img src='" + fotoMarte[indexFoto].img_src + "' style='width: 100%;' id='imgMarte'> ")
						for (var k = 0; k <= fotoMarte.length - 1; k++) {
							arrayImagenes.push(fotoMarte[k].img_src)
							$(".row").append("<span class='column' id='" + k + "'><span id='indexThumb'>" + (k + 1) + "</span><img  src='" + fotoMarte[k].img_src + "' style='width:100%; height:100%'></span>")
						}
						//$("#galeria #"+($("#primer").val()-1)+" #indexThumb").animate({width: "45px", fontSize: "1.4em"})	
					})
				}//Fin función setFoto

				var intervalImg;
				var indexArrayImg//=Number($("#primer").val())-1
				var ultimoIndex//= Number($("#ultimo").val())
				var primerIndex;
				var scrollX = -50
				// Función SCROLL  ****
				function scrollWin(scrollX) {
					document.getElementById('galeria').scrollTo(scrollX, 0);
				}


				function moverImagenes() {
					// $("#slidesMovie").show()
					//$("#slidesMovie").css({"display": "flex"})
					$("#fechasID").hide()
					$(".botonCamara").hide()
					$(".flechas").hide()
					$(".numbertext").hide()
					$("#botonMovie").hide()
					$("#target").hide()
					$("#ping").show()

					// $("#img"+indexArrayImg).css({"position": "sticky", "left": "0px"})

					$("#primer").val(indexArrayImg + 1)
					$("#ultimo").val(ultimoIndex)
					
					$("#galeria #" + indexArrayImg).animate({ fontSize: "1.4em", color: "red" }, 300)
					$("#galeria #" + indexArrayImg).animate({ fontSize: "0.9em", color: "rgb(173, 255, 47, 0.9)" }, 500)

					scrollX = scrollX + 50
					if (indexArrayImg == 0) {
						scrollX = 0
						scrollWin(scrollX)
					}
					if (scrollX > 150) {
						scrollWin(scrollX)
					}

					console.log(indexArrayImg, "....", scrollX)
					indexArrayImg++
					if (indexArrayImg >= ultimoIndex) {
						indexArrayImg = primerIndex
						scrollX = (indexArrayImg * 50) - 50
						scrollWin(scrollX)
						console.log("..", primerIndex, "....", scrollX)
					}
					$(".slides").html("<img src='" + arrayImagenes[indexArrayImg] + "' style='width: 100%' id='imgMarte'> ")
				}
				$("#botonMovie").on("click", function () {
					$("#botonMovie").hide()
					$("#botonCerrarMovie").show()
					primerIndex = Number($("#primer").val()) - 1
					indexArrayImg = Number($("#primer").val()) - 1
					ultimoIndex = Number($("#ultimo").val())
					intervalImg = setInterval(moverImagenes, 500)
					$("#galeria #" + indexFoto + " #indexThumb").animate({ width: "19px", fontSize: "0.9em" })
				})
				$("#botonCerrarMovie").on("click", function () {

					clearInterval(intervalImg)
					indexFoto = Number($("#primer").val()) - 1
					indexArrayImg = Number($("#primer").val());
					scrollX = scrollX - 50
					$("#ping").hide();
					$("#fechasID").show()
					$("#botonCerrarMovie").hide()
					$(".botonCamara").show()
					$(".flechas").show()
					$(".numbertext").show()
					$("#botonMovie").show()
					$("#target").show()
					$("#galeria #" + indexFoto + " #indexThumb").animate({ width: "45px", fontSize: "1.4em" })
					$("#ultimo").val(ultimoIndexReset)
				})
			}//Fin Función AJAX

		}) //Fin conexión AJAX


		// Abre ventana pata imagen original
		// Open window for original image
		$("#target").on("click", function () {
			chrome.windows.create({ url: $("#imgMarte").attr("src"), width: 700, left: 50, top: 9, type: "popup" })
		})

		// // Conexión AJAX para coger datos clima
		// // AJAX conection for set wheather data

		// $.get("https://api.nasa.gov/insight_weather/?api_key=hb4mXofbbZ3GHnWy48wjFiXBGj7wkadXhEN9TOYA&feedtype=json&ver=1.0", function (clima, estado) {
		// 	console.log(estado)
		// 	console.log(clima)
		// 	// Monta estación meteorológica
		// 	// Set wheather station


		// 	var climaMarte = clima[clima.sol_keys[clima.sol_keys.length - 1]]
		// 	var fechaClima = new Date(climaMarte.Last_UTC).toLocaleString();
		// 	var min;
		// 	var max
		// 	var press
		// 	var vient
		// 	console.log(clima)
		// 	if (climaMarte.AT) {
		// 		$("#aviso").hide()
		// 	}
		// 	if (climaMarte.AT !== undefined) {
		// 		min = climaMarte.AT.mn.toFixed(2);
		// 		max = climaMarte.AT.mx.toFixed(2);
		// 	} else {
		// 		min = "&#10060;"
		// 		max = "&#10060;"
		// 	}
		// 	if (climaMarte.PRE !== undefined) {
		// 		press = climaMarte.PRE.av.toFixed(2);
		// 	} else {
		// 		press = " &#10060;"
		// 	}

		// 	if (climaMarte.HWS !== undefined) {
		// 		vient = ((climaMarte.HWS.av) * 3.6).toFixed(2);
		// 	} else {
		// 		vient = " &#10060;"
		// 	}

		// 	var arrayDatos = [min, max, press, vient]
		// 	console.log(arrayDatos)
		// 	var estacion = climaMarte.Season
		// 	switch (estacion) {
		// 		case "winter":
		// 			estacion = "Invierno"
		// 			break
		// 		case "fall":
		// 			estacion = "Otoño"
		// 			break
		// 		case "summer":
		// 			estacion = "Verano"
		// 			break
		// 		case "spring":
		// 			estacion = "Primavera"
		// 			break
		// 	}
		// 	console.log(arrayDatos)
		// 	for (var i = 0; i < 4; i++) {
		// 		$("#datosTabla").append("<td class='cajaDato'>" + arrayDatos[i] + "</td>")
		// 	}
		// 	$("#fechaClima").html("<div><small>En Marte es: </small> <span style='color: var(--colorContraste)'>" + estacion + "</span></div><div style='font-size: 0.8em; padding: 4px 0px 10px 0px; opacity: 0.8;'><small>Actualizado (Hora local): </small> " + fechaClima + "</div>")
		// })
	}
//})