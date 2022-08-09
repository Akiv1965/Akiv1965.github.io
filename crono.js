var tiempoRestSegundos= "x"
setInterval(
    
function crono(){
    if(tiempoRestSegundos == "x"){
        $("#horaActual").html("<span>"+new Date().toLocaleDateString()+"</span><span>"+new Date().toLocaleTimeString("en-GB")+"</span>")
    
}else{
    tiempoRestSegundos--
   
   if(tiempoRestSegundos < 0){
       tiempoRestSegundos= 59;
       tiempoRestMinutos--
   }
   if(tiempoRestMinutos < 0){
       tiempoRestMinutos= 59
       tiempoRestHoras--
       if(tiempoRestHoras <= 0){
           tiempoRestHoras= 0
       }
   }
   var segundos= tiempoRestSegundos.toString();
   var minutos= tiempoRestMinutos.toString();
   
   if(segundos.length <2){
       segundos= "0"+segundos
   }
   if(minutos.length <2){
       minutos= "0"+minutos
   }
   $("#tiempoDescuento").text(tiempoRestHoras+":"+minutos+":"+segundos)
   $("#horaActual").html("<b>"+new Date().toLocaleTimeString("en-GB")+"</b>")
   /*if(mensDiaNoche == "Hasta el amanecer"){
    
   }else{
    $("#hastaElAnochecer").text(tiempoRestHoras+":"+minutos+":"+segundos)
   }*/
}
   
}
, 1000);