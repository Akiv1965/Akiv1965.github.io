document.addEventListener('DOMContentLoaded', function () {	
console.log(document.cookie)
 ///////////   SLIDER  \\\\\\\\\\\	
//Define Slider
		$( ".rango" ).slider({
			stop: function( event, ui ) {console.log(event.currentTarget.value)},
			start: function( event, ui ) {}
		});
//Evento Slider
		$("#slider-mini").hide()
		$(".ui-slider-track.ui-mini .ui-slider-handle").prepend("<div id='metros'>"+"1"+"km</div>")
	
navigator.geolocation.getCurrentPosition(function(position) {
	
			var lat = Number(position.coords.latitude)//41.551666666667;//
			var lon = Number(position.coords.longitude)//-5.7727777777778;//
			var idioma= "es"
			
			var radio= 1000
			console.log(lat + "  ..  " + lon+"..."+position.coords.altitude)

	
	$( ".rango" ).on( "slidestop", function( event, ui ) {  
	// Set el radio de alcance
	  //$("#radio").text(event.currentTarget.value)
	//Reiniciar variables para cargar de nuevo el mapa	 
	event.cancelable= true;
	console.log(event)
		radio= event.currentTarget.value
		labels = []
		labels2=[]
		stringPlaces="";
		stringPlaces2=""
		$("#wikiLista").empty()
		conectWiki(lat,lon)
	  } );
	  $(".rango").on("change", function(){
		  
		  var metros= $(".ui-slider-track.ui-mini .ui-slider-handle").attr("title")
		  $("#metros").text(metros/1000+"km")
		  
		  })
		  
		         ////////////
        // SCRIPT PARA AUTOCOMPLETE DE GOOGLE
        ///////////////
// 		var apiKey= config.key

//         $.getScript("https://maps.googleapis.com/maps/api/js?key="+apiKey+"&libraries=places&v=weekly", function() {
//             var input = document.getElementById('inputLoc');
//             autocomplete = new google.maps.places.Autocomplete(input);

//             autocomplete.addListener('place_changed', function() {
//                 var places = autocomplete.getPlace();
//                 if (places.length == 0) {
//                     return;
//                 }
//                 //nueva lat y lon	 
//                 if (places.geometry.viewport.ka !== "") {
//                     lat = places.geometry.location.lat();
//                     lon = places.geometry.location.lng();
//                     console.log(lat + "  ..  " + lon)
// 				conectWiki(lat, lon)
// 				$("#myNav").animate({height: 0}, 300)
//                 }


//             })

// }) //Fin Google autocomplete

// Evento para selección de idioma 			
	$("#selecIdioma").on("change", function(){
		console.log($("#selecIdioma").val())
		idioma= $("#selecIdioma").val()
		//document.getElementById("myNav").style.height = "0%";
		$("#myNav").animate({height: 0}, 300)
		conectWiki(lat,lon)
		})
        	 

function conectWiki(lat, lon){	
	var imagenesArray= []		 
$("#wikiLista").empty()



			var labels = [] //Array etiquetas para Markers
			var labels2= [] //Array etiquetas para Markers para cuando son más de 20
			var coordenadas=[]
			var stringPlaces; //String de lugares para llamada a WIKI hasta 20
			var stringPlaces2;//String de lugares para llamada a WIKI otros 20
console.log(lat+"xxxxx"+lon)
	$.get("https://"+idioma+".wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gscoord="+lat+"|"+lon+"&gsradius="+radio+"&gslimit=40&origin=*", function(datosSet){
		console.log(datosSet)
		var lat2;
		var lon2;
		var geoSearch= datosSet.query.geosearch
		
//Set lat y lon de los lugares para crear markers y sus etiquetas		
		for(var i=0; i < geoSearch.length; i++){
		lat2= geoSearch[i].lat
		lon2= geoSearch[i].lon
		coordenadas.push({titulo: geoSearch[i].title, lat:lat2, lon:lon2})
		labels.push(geoSearch[i].title)	
		}
		//
		console.log(coordenadas)
		$("#numWikiSitios").text(geoSearch.length)
		$("#numWikiSitios").animate({
			fontSize: "0.8em"
		},
		{
			duration: 600,
			complete: function(){
				$("#numWikiSitios").css("color", "rgb(185, 179, 215)")
			$("#numWikiSitios").animate({fontSize: "0.6em"})	
			}
		
		})
		stringPlaces= labels.join("|") // String de títulos para llamada a WIKI
		//console.log(labels, stringPlaces)
		
//Llama a WIKI para extraer datos artículos (título, enlace, foto, extracto) limitado a 20
	$.get("https://"+idioma+".wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&exchars=260&explaintext&exintro=true&titles="+stringPlaces+"&pithumbsize=100&origin=*", function(datosPage){
		console.log(datosPage)
		var datosPagina= datosPage.query.pages
		var idKey= Object.keys(datosPagina)
		var datosInfoWindow;
		var imgInfoWindow;
		var index2=[] //Index para las páginas que no tienen extracto
		//For para crear datos #infoWindowsID y luego recuperarlos con infoWindow
			for(var i=0; i < idKey.length; i++){
			datosInfoWindow= datosPagina[idKey[i]]
			//console.log(datosInfoWindow)
				if(datosInfoWindow.thumbnail === undefined){
				imgInfoWindow= "img/iconNoFoto.png"
					
				} else{
				imgInfoWindow= datosInfoWindow.thumbnail.source
				}
				
			//Crea los distintos #infoWindowN. 
//Si el extracto es indefinido crea arrays labels2 e index2 
//para recuperarlos en 2º llamada			
		if(datosInfoWindow.extract !== undefined){
		$("#wikiLista").append("<div id='infoWindow"+i+"' class='boxWindow'><div id='titulo'><a href='https://"+idioma+".wikipedia.org/wiki/"+datosInfoWindow.title+"' target='_blank'>"+datosInfoWindow.title+"</a></div><div id='contExtract'><span id='extracto"+i+"' class='extractos'>"+datosInfoWindow.extract+"</span><span class='imgExtract'><img src='"+imgInfoWindow+"' style='width:100%; height: 100%'></span></div><div class='linkGallery'><img src='img/iconGallery.png' width='100%'></div><div id='linkMap'></div></div>")
		} else {
			$("#wikiLista").append("<div id='infoWindow"+i+"' class='boxWindow'><div id='titulo'><a href='https://"+idioma+".wikipedia.org/wiki/"+datosInfoWindow.title+"' target='_blank'>"+datosInfoWindow.title+"</a></div><div id='contExtract'><span id='extracto"+i+"' class='extractos'><img src='img/loadingGif.gif'></span><span class='imgExtract'><img src='"+imgInfoWindow+"' style='width:100%; height: 100%'></span></div><div class='linkGallery'><img src='img/iconGallery.png' width='100%'></div><div id='linkMap'></div></div>")
			labels2.push([datosInfoWindow.title])
			index2.push(i)
		}
		
	
		//console.log(labels2)
		 

		}//Bucle for
		
		console.log($("#infoWindow1 #titulo").text())
		for(var k=0; k<coordenadas.length; k++){
			var tituloInfo=$("#infoWindow"+k+" #titulo").text()
			for(var h=0; h<coordenadas.length; h++){
				
				if(tituloInfo == coordenadas[h].titulo){
		$("#infoWindow"+k+" #linkMap").html("<a href='https://www.google.com/maps/dir/?api=1&origin="+lat+","+lon+"&destination="+coordenadas[h].lat+","+coordenadas[h].lon+"' target='_blank'><img src='img/iconWalker1.png' width= '100%'></a>")
		
		if($("#infoWindow"+k+" #contExtract img").attr("src").slice(-14) !== "iconNoFoto.png"){
		$("#infoWindow"+k+" .linkGallery").attr("id", tituloInfo)
		}else{
			$("#infoWindow"+k+" .linkGallery").hide()
		}
				}
			}
			
		}
		$(".boxWindow:even").css({"background": "linear-gradient(100deg, rgba(87, 74, 141,0.9), rgba(128, 119, 165,0.9) )", "color": "rgb(186, 171, 235)"});
		$(".boxWindow #titulo a:even").css("color", "rgb(195, 181, 240)")
		
		$(".boxWindow:odd").css({"background": "linear-gradient(100deg, rgba(128, 119, 165,0.9), rgba(87, 74, 141,0.9) )", "color": "rgb(35, 25, 90)"});
		$(".boxWindow #titulo a:odd").css("color", "rgb(48, 30, 100)")
		
		stringPlaces2= labels2.join("|")// Crea string de títulos para llamada wiki
		
// 2º llamada a wiki para extraer extractos cuando son más de 20
	$.get("https://"+idioma+".wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exchars=260&explaintext&exintro=true&titles="+stringPlaces2+"&origin=*", function(datosPage2){
		
		if(datosPage2.query !== undefined){
			//console.log(datosPage2)
			var datosPagina2= datosPage2.query.pages
			var idKey2= Object.keys(datosPagina2)
			var datosInfoWindow2;
//Bucle para incluir los extractos donde faltan
				for(var h=0; h < idKey2.length; h++){
			datosInfoWindow2= datosPagina2[idKey2[h]]
			
			$("#extracto"+index2[h]).text(datosInfoWindow2.extract)	
			}
		}
	})//WIKI 2ºllamada
	})// WIKI 1ºllamada 	
	})// WIKI llamada coordenadas artículos
	
	//// GALERIA
setTimeout(function(){
$(".linkGallery").on("click", function(){
	
		$.get("https://"+idioma+".wikipedia.org/w/api.php?action=query&generator=images&titles="+this.id+"&format=json&prop=imageinfo&iiprop=url&origin=*", function(Set1){
			$("#galeria").show()
			var imagenesLista=Set1.query.pages
			var indexArray=0
			var imagenesArray1=[]
			
			console.log(Set1, Set1.query.pages, Object.keys(imagenesLista).length)
			for(var j=1; j<Object.keys(imagenesLista).length+1; j++){
				//console.log(imagenesLista[j*-1].title.split(":")[1].slice(0, -4))
			if(imagenesLista[j*-1]){
				if(imagenesLista[j*-1].imageinfo[0].url.slice(-3) !== "svg"){
					imagenesArray1.push({
						titulo: imagenesLista[j*-1].title.split(":")[1].slice(0, -4),
						urlImg: imagenesLista[j*-1].imageinfo[0].url
					})
				}
			}
				//console.log(imagenesArray)
			}
			imagenesArray= imagenesArray1
			if(Set1.continue){
				var imcontinue= Set1.continue.gimcontinue;
				var pageID=  imcontinue.split("|")
				$.get("https://es.wikipedia.org/w/api.php?action=query&generator=images&pageids="+pageID[0]+"&format=json&prop=imageinfo&iiprop=url&formatversion=2&gimcontinue="+imcontinue+"&gimlimit=500&origin=*", function(Set2){
					console.log(Set2)
					if(Set2.query){
					var imagenesLista2= Set2.query.pages
					var imagenesArray2=[]
					for(var k=0; k<imagenesLista2.length; k++){
						
						if(imagenesLista2[k].imageinfo[0].url.slice(-3) !== "svg"){
		imagenesArray2.push({titulo: imagenesLista2[k].title.split(":")[1].slice(0, -4), urlImg:imagenesLista2[k].imageinfo[0].url})
				}
					}
				
				imagenesArray=imagenesArray2.concat(imagenesArray1)
				console.log(imagenesArray)
				var	lonImagenesArray= imagenesArray.length	
			}
			lanzaGaleria()
				
				})//2ºllamada
			}else {
				console.log(imagenesArray)
					lanzaGaleria()
				
			}
		/// EVENT TOUCHSTART
			document.getElementById("galeria").addEventListener("touchstart", function(e){
				console.log(parseInt(e.changedTouches[0].clientX) )
				
				$("#touchInicio").text(parseInt(e.changedTouches[0].clientX))
				e.preventDefault()
								
			}, false)
			
/// EVENT TOUCHEND			
			document.getElementById("galeria").addEventListener("touchend", function(e){
				console.log(parseInt(e.changedTouches[0].clientX))
				console.log(Number($("#touchInicio").text()) - Number(e.changedTouches[0].clientX))
				e.preventDefault()
				var leftRight= Number($("#touchInicio").text()) - Number(e.changedTouches[0].clientX)
		if(leftRight > 2){
			indexArray++
			if(indexArray > imagenesArray.length-1){indexArray=0}
			lanzaGaleria()
		}
		if(leftRight < 2 && leftRight < -2){
			indexArray--
			if(indexArray < 1){indexArray=0}
			
			lanzaGaleria()
		}
		if(leftRight < 2 && Number($("#touchInicio").text()) > 305 ){
			$("#galeria").empty()
			$("#galeria").hide()
		}
								
			}, false)	
		

			
		function lanzaGaleria(){
			$("#galeria").html("<div id='cajaGaleria'><div id='tituloGaleria'>"+imagenesArray[indexArray].titulo+"</div>"
			+"<div id='imagenGaleria'><span id='flechaIzq' class='flechas'>&#10094;</span><span id='flechaDer' class='flechas'>&#10095;</span><img id='imgGal' src='"+imagenesArray[indexArray].urlImg+"' width='100%'></div><div id='contador'>"+(indexArray+1)+"/"+imagenesArray.length+"</div><div id='closeGal'>&times;</div></div>")	
		$("#closeGal").on("click", function(){$("#galeria").hide() })
		$(".flechas").click(function(){
		
			if(this.id == "flechaIzq"){
				indexArray--
			if(indexArray < 1){indexArray=0}
			lanzaGaleria()
			}else{
				indexArray++
			if(indexArray > imagenesArray.length-1){indexArray=0}
			lanzaGaleria()
			}
		})
		}	
		
	})//1ºllamada
			

		
		
			
			
	
		
})	
}, 5000)

/////////  FIN GALERIA
}

conectWiki(lat, lon)

})//Fin GeoLocation
})