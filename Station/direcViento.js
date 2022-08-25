function DirecViento(direcViento, iconoViento, velocidad){
		
	if(direcViento >= 350 || direcViento < 20){
			direcViento= "N"
			iconoViento= "iconos/vientos/Norte.png"
			//$("#N").css("color", "red")
		}
		if(direcViento >= 20 && direcViento < 80){
			direcViento= "NE"
			iconoViento= "iconos/vientos/Noreste.png"
			//$("#NE").css("color", "red")
		}
		if(direcViento >= 80 && direcViento < 110){
			direcViento= "E"
			iconoViento= "iconos/vientos/Este.png"
			//$("#E").css("color", "red")
		}
		if(direcViento >= 110 && direcViento < 170){
			direcViento= "SE"
			iconoViento= "iconos/vientos/Sureste.png"
			//$("#SE").css("color", "red")
		}
		if(direcViento >= 170 && direcViento < 200){
			direcViento= "S"
			iconoViento= "iconos/vientos/Sur.png"
			//$("#S").css("color", "red")
		}
		if(direcViento >= 200 && direcViento < 260){
			direcViento= "SO"
			iconoViento= "iconos/vientos/Suroeste.png"
			//$("#SO").css("color", "red")
		}
		if(direcViento >= 260 && direcViento < 290){
			direcViento= "O"
			iconoViento= "iconos/vientos/Oeste.png"
			//$("#O").css("color", "red")
		}
		if(direcViento >= 290 && direcViento <350){
			direcViento= "NO"
			iconoViento= "iconos/vientos/Noroeste.png"
			//$("#NO").css("color", "red")
		}
		//$("#iconoViento").html("<span id='velocidadViento'>"+velocidad+"<small>Km/h</small></span><img src='"+iconoViento+"' style='width: 100%'>")
		return iconoViento
	}