//
//generator=categorymembers&gcmtitle=Category:English historical novelists&gcmlimit=500
//"generator=allpages&gapfrom="+response+"&gaplimit=480&prop=langlinks&lllimit=480&llprop=url|langname&"
//generator=allpages&gapfrom=Ac&gaplimit=500
//generator=random&grnnamespace=0&grnlimit=11

//$("document").ready(function () {
	var contResultados = 0;
	var contPaginas = 0;

		//console.log("received user data", response);
		

	
	//Evento para repetir búsqueda
	$("#nuevaBusqueda").on("click", function () {
		var response = $("#ultimaPagina").text();
		urlApi = "generator=allpages&gapfrom=" + response + "&gaplimit=480";
		lanzarWiki(response, urlApi);
	});

	//LANZARWIKI Función------------
	function lanzarWiki(response, urlApi) {
		console.log(response)
		//var response= $("#alfabetico").val()
		$("#cajaExtension").animate({
			opacity: "0",
			height: "0px"
		}, 500)
		$("#caja").css("opacity", 1)
		var urlApi = "generator=allpages&gapfrom=" + response + "&gaplimit=480"; //Construye URL para all pages mode
		if (response == "") {
			urlApi = "generator=random&grnnamespace=0&grnlimit=1"; //Construye URL para random page
		}
		$("#letrero").html(
			"La búsqueda empieza con: <br><span class='datosLetrero'>" +
			"<img src='iconos/loadingGif.gif' width='24px'>" +
				"</span>" +
				"<br>Primer artículo analizado: <br><span class='datosLetrero'>" +
				"<img src='iconos/loadingGif.gif' width='24px'>" +
				"</span><br>" +
				"Último artículo analizado: <br><span class='datosLetrero' id='ultimaPagina'>" +
				"<img src='iconos/loadingGif.gif' width='24px'>" +
				"</span><br>" +
				"<div id='letreroContador'><span class='contador1'>Artículos seleccionados: <span class='datosLetrero' id='totalResult' style='width: 85%'>" +
				"<img src='iconos/loadingGif.gif' width='24px'>" +
				"</span></span><br><span class='contador1'>Artículos Analizados:<span class='datosLetrero' id='totalPages' style='width: 85%'>" +
				0 +
				"</span></span></div>"
		)
		/*$("#ultimaPagina").html("<img src='iconos/loadingGif.gif' width='24px'>");
		$("#totalPages").html("<img src='iconos/loadingGif.gif' width='24px'>");
		$("#totalResult").html("<img src='iconos/loadingGif.gif' width='24px'>");*/
		continuePages = "";
		datosSet = "";
		ultimaPagina2 = "";
		ultimaPagina = "";
		// 1º llamada API Wiki
		$.get(
			"https://en.wikipedia.org/w/api.php?action=query&" +
				urlApi +
				"&prop=langlinks&lllimit=484&llprop=url|langname&" +
				"format=json&formatversion=2&origin=*",
			function (datosSet) {
				console.log(datosSet);
				var listaPaginas = [];

				listaPaginas = datosSet.query.pages;
				console.log(">>>>>>>> ", response, "..", listaPaginas);
				//Número aleatorio para índice array primeraPagina.
				min = Math.ceil(0);
				max = Math.floor(4);
				aleatorio = Math.floor(Math.random() * (max - min) + min);
				if (listaPaginas.length == 1) {
					aleatorio = 0;
				}

				var continuePages = datosSet.continue.gapcontinue; //listaPaginas[450].title//listaPaginas[listaPaginas.length-1].title datosSet.query.continue[gapcontinue]
				var ultimaPagina = listaPaginas[listaPaginas.length - 1].title;
				var primeraPagina = listaPaginas[aleatorio].title;
				if (response == "") {
					response = primeraPagina;
				}
				var arrayLang = []; //array de todos los lenguajes del artículo
				var arrayCHeck = []; //"arrayCheckTest"
				var arrayListaIdiomas = []; //"arrayIdiomsTest"
				var checkIdioma = 0;

				for (var i = aleatorio; i < listaPaginas.length - 1; i++) {
					contPaginas++;
					listaPaginaLinks = listaPaginas[i].langlinks;
					//Check si hay listapaginas y si son más de 4
					if (listaPaginaLinks && listaPaginaLinks.length > 4) {
						arrayLang = listaPaginas[i].langlinks;
						arrayCHeck = [];
						arrayListaIdiomas = [];
						//Crea arrayCheck para posterior análisis
						// y de paso crea arrayListaIdiomas para mostrar todos los enlaces a otros idiomas
						for (var k = 0; k < arrayLang.length; k++) {
							arrayCHeck.push(arrayLang[k].lang);
							arrayListaIdiomas.push(
								"<a href='" +
									arrayLang[k].url +
									"' target='_BLANK'>" +
									arrayLang[k].langname +
									"</a>"
							);
						}
						//Variable para chequear si algún enlace a idiomas específicos
						var checkIdioma =
							arrayCHeck.indexOf("it") +
							arrayCHeck.indexOf("fr") +
							arrayCHeck.indexOf("de");
						//Check que no haya enlace a español y alguno de checkIdioma
						if (arrayCHeck.indexOf("es") < 0 && checkIdioma >= -1) {
							contResultados++;
							//Creo título más número aleatorio para usar de ID que luego servirá para relacionar con el textoa mostrar
							var titulo = Math.random().toFixed(6) + listaPaginas[i].title;
							//Crea lista de artículos
							$("#listaPaginas").append(
								"<span id='paginaEnLista' class='paginaEnLista'>" +
									"<a href='https://en.wikipedia.org/wiki/" +
									listaPaginas[i].title +
									"' target='_BLANK' id='" +
									titulo +
									"' class='articuloEnLista'>" +
									listaPaginas[i].title +
									"</a>" +
									"<span id='" +
									titulo.slice(2, 8) +
									"' class='hideText' hidden></span><span id='idiomasEnLista'>" +
									arrayListaIdiomas.join(" ") +
									"</span></span>"
							);
						}
					}
				}
				/*"https://en.wikipedia.org/w/api.php?action=query&"
        +"generator=allpages&gaplimit=500&gapfrom="+continuePages+"&prop=langlinks&lllimit=500&llprop=url||langname&"
        +"format=json&formatversion=2&origin=*"*/

				if (datosSet.continue) {
					if (!datosSet.continue.gapcontinue) {
						continuePages = ultimaPagina;
					}
					// 2º llamada a la API de WIKI
					$.get(
						"https://en.wikipedia.org/w/api.php?action=query&" +
							"generator=allpages&gaplimit=500&gapfrom=" +
							continuePages +
							"&prop=langlinks&lllimit=480&llprop=url|langname&" +
							"format=json&formatversion=2&origin=*",
						function (datosSet2) {
							console.log(continuePages, datosSet2);
							var listaPaginas2 = datosSet2.query.pages;

							min = Math.ceil(1);
							max = Math.floor(9);
							aleatorio = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

							console.log("alea2..", aleatorio);
							var ultimaPagina2 = listaPaginas2[listaPaginas2.length - aleatorio].title;
							var arrayLang2 = []; //"arrayLangTest"
							var arrayCHeck2 = []; //"arrayCheckTest"
							var arrayListaIdiomas2 = []; //"arrayIdiomsTest"
							var checkIdioma2 = 0;
							for (var i = 5; i < listaPaginas2.length - 1; i++) {
								contPaginas++;
								var listaPaginaLinks2 = listaPaginas2[i].langlinks;
								if (listaPaginaLinks2 && listaPaginaLinks2.length > 4) {
									arrayLang2 = listaPaginas2[i].langlinks;
									arrayCHeck2 = [];
									arrayListaIdiomas2 = [];
									//console.log(arrayLang.map(dat => Object.values(dat)))
									arrayLang2.forEach((element) => {
										arrayCHeck2.push(element.lang);
										arrayListaIdiomas2.push(
											"<a href='" +
												element.url +
												"' target='_BLANK'>" +
												element.langname +
												"</a>"
										);
									});
									//console.log(arrayCHeck)
									var checkIdioma2 =
										arrayCHeck2.indexOf("it") +
										arrayCHeck2.indexOf("fr") +
										arrayCHeck2.indexOf("de");
									var titulo2 = Math.random().toFixed(6) + listaPaginas2[i].title;
									if (arrayCHeck2.indexOf("es") < 0 && checkIdioma2 >= -1) {
										contResultados++;
										$("#listaPaginas").append(
											"<span id='paginaEnLista' class='paginaEnLista'>" +
												"<a href='https://en.wikipedia.org/wiki/" +
												listaPaginas2[i].title +
												"' target='_BLANK' id='" +
												titulo2 +
												"' class='articuloEnLista'>" +
												listaPaginas2[i].title +
												"</a>" +
												"<span id='" +
												titulo2.slice(2, 8) +
												"' class='hideText' hidden></span><span id='idiomasEnLista'>" +
												arrayListaIdiomas2.join(" ") +
												"</span></span>"
										);
									}
									//Letrero informativo de la lista de artículos
									$("#letrero").html(
										"La búsqueda empieza con: <br><span class='datosLetrero'>" +
											response +
											"</span>" +
											"<br>Primer artículo analizado: <br><span class='datosLetrero'>" +
											primeraPagina +
											"</span><br>" +
											"Último artículo analizado: <br><span class='datosLetrero' id='ultimaPagina'>" +
											ultimaPagina2 +
											"</span><br>" +
											"<div id='letreroContador'><span class='contador1'>Artículos seleccionados: <span class='datosLetrero' id='totalResult' style='width: 85%'>" +
											contResultados +
											"</span></span><br><span class='contador1'>Artículos Analizados:<span class='datosLetrero' id='totalPages' style='width: 85%'>" +
											0 +
											"</span></span></div>"
									);
								}

								$("#totalPages").text(contPaginas);
							}
							//$(".articuloEnLista").on("mouseenter", "a", mouse)
							//Evento para mostrar extracto del texto
							$("div .paginaEnLista .articuloEnLista").mouseenter(mouse);
						}
					);
				}

				listaPaginas2 = [];
				listaPaginas = [];

				//EVENTO MOUSEENTER
				function mouse(e) {
					//function(e){
					console.log(e, e.target.id);
					var tituloText = e.target.id; //Título artículo
					var idExtract = tituloText.slice(2, 8); //ID aleatorio
					//Llamada a la API  WIKI para mostrar el extracto de texto del artículo seleccionado
					$.get(
						"https://en.wikipedia.org/w/api.php?action=query&" +
							"prop=extracts&exchars=300&explaintext&exintro=true&titles=" +
							tituloText.slice(8) +
							"&format=json&origin=*",
						function (datosText) {
							var datosTextJson = datosText.query.pages;
							var keyExtract = Object.keys(datosTextJson)[0];
							var extracto = datosTextJson[keyExtract].extract;

							$("#" + idExtract).text(extracto);
							//console.log(datosText, idExtract, extracto )
							$("#" + idExtract).show(900);
							$("div .paginaEnLista").mouseleave(function (e) {
								$(".hideText").hide();
							});
						}
					);
				} //Fin function mouse
			}
		); //Fin GET wiki
	} //Fin Función lanzarWiki
//});
