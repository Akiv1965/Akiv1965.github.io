var contResultados = 0;
	var contPaginas = 0;

	//console.log("received user data", response);Category:English historical novelists Peanuts music
	
	//Evento para repetir búsqueda
		function nuevaBusquedaCat() {
		console.log("EEEKK")
		lanzarWikiCat(response);
	}
	
	//LANZARWIKI Función------------
	function lanzarWikiCat(response) {
	//Monta dirección con la categoría
		var urlApi=  "generator=categorymembers&gcmtitle=Category:"+response+"&gcmprop=ids"
	//Si hay CONTINUE monta la dirección con el continue
		if($("#continueOculto").text() !== ""){
			var continuePages = $("#continueOculto").text();
			urlApi = "generator=categorymembers&gcmtitle=Category:"+response+"&gcmcontinue="+continuePages+"&gcmprop=ids";
		}

		$("#cajaExtension").animate({
			opacity: "0",
			height: "0px"
		}, 400)
		$("#caja").animate({
			opacity: "1"
		}, 400)
		
	//Monta HTML del letrero para datos artículos
		$("#letrero").html(
			"Categoría: <br><span class='datosLetrero'>" +
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
	
	//Conexión API  WIKI
		$.get(
			"https://en.wikipedia.org/w/api.php?action=query&" +
           		 urlApi +
				"&prop=langlinks&lllimit=485&llprop=url|langname&" +
				"format=json&formatversion=2&origin=*",
			function (datosSet) {
			
			//Si no encuentra la categoría 
                if(!datosSet.query){
					location.replace('index.html')
					alert("Categoría desconocida. <br> Introduzca una categoría en inglés válida.")
				}
                

                console.log(datosSet)
                var listaPaginas = [];
				var continueOculto= ""
				if(datosSet.continue){
					continueOculto= datosSet.continue.gcmcontinue
				}

				listaPaginas = datosSet.query.pages;

				 //listaPaginas[450].title//listaPaginas[listaPaginas.length-1].title datosSet.query.continue[gapcontinue]
				var ultimaPagina = listaPaginas[listaPaginas.length-1].title;
				var primeraPagina = listaPaginas[0].title;

				var arrayLang = []; //array de todos los lenguajes del artículo
				var arrayCHeck = []; //"arrayCheckTest"
				var arrayListaIdiomas = []; //"arrayIdiomsTest"
				var checkIdioma = 0;

				
				

				for (var i = 0; i < listaPaginas.length-1; i++) {
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
			//Monta letrero con los datos obtenidos
				$("#letrero").html(
					"Categoría: <br><span class='datosLetrero'>" +
						response +
						"</span>" +
						"<br>Primer artículo analizado: <br><span class='datosLetrero'>" +
						primeraPagina +
						"</span><br>" +
						"Último artículo analizado: <br><span class='datosLetrero' id='ultimaPagina'>" +
						ultimaPagina +
						"</span><span id='continueOculto' hidden>"+continueOculto+"</span><br>" +
						"<div id='letreroContador'><span class='contador1'>Artículos seleccionados: <span class='datosLetrero' id='totalResult' style='width: 85%'>" +
						contResultados +
						"</span></span><br><span class='contador1'>Artículos Analizados:<span class='datosLetrero' id='totalPages' style='width: 85%'>" +
						0 +
						"</span></span></div>"
				);
			
			//Conteo páginas
			$("#totalPages").text(contPaginas);

			//Si hay CONTINUE
				if(datosSet.continue){
					var continuePages = datosSet.continue.gcmcontinue;
				
		//Conexión API WIKI para CONTINUE		
            $.get(
                    "https://en.wikipedia.org/w/api.php?action=query&" +
                    "generator=categorymembers&gcmtitle=Category:"+response+"&gcmcontinue="+continuePages+"&gcmprop=ids"+
                        "&prop=langlinks&lllimit=485&llprop=url|langname&" +
                        "format=json&formatversion=2&origin=*",
                        function(datosSet2){
                            console.log(datosSet2)
                            var listaPaginas2 = datosSet2.query.pages;
							var continueOculto= ""
				if(datosSet.continue){
					continueOculto= datosSet2.continue.gcmcontinue

							var ultimaPagina2 = listaPaginas2[listaPaginas2.length - 1].title;
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
									
								}
							//Monta letrero para CONTINUE	
								$("#letrero").html(
										"Categoría: <br><span class='datosLetrero'>" +
											response +
											"</span>" +
											"<br>Primer artículo analizado: <br><span class='datosLetrero'>" +
											primeraPagina +
											"</span><br>" +
											"Último artículo analizado: <br><span class='datosLetrero' id='ultimaPagina'>" +
											ultimaPagina2 +
											"</span><span id='continueOculto' hidden>"+continueOculto+"</span><br>" +
											"<div id='letreroContador'><span class='contador1'>Artículos seleccionados: <span class='datosLetrero' id='totalResult' style='width: 85%'>" +
											contResultados +
											"</span></span><br><span class='contador1'>Artículos Analizados:<span class='datosLetrero' id='totalPages' style='width: 85%'>" +
											0 +
											"</span></span></div>"
									);
								$("#totalPages").text(contPaginas);
							}
						}
							//Evento para mostrar extracto del texto
							$("div .paginaEnLista .articuloEnLista").mouseenter(mouse);
                        })
					}else{
						console.log("OFF")
						$("#nuevaBusqueda").hide()
						$("#nuevaBusquedaFin").show()
					}

            //EVENTO MOUSEENTER
				function mouse(e) {
					//console.log(e, e.target.id);
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
				}

            })
		}