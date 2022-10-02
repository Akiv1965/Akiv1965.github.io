function scalaLuz(parametro, ppm){
    if(parametro == "no2"){
    console.log("flfllfllfll", ppm)
      if(ppm < 1){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 1 && ppm <= 6){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,90,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 6){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

  if(parametro == "no"){
    console.log("flfllfllfll", ppm)
      if(ppm < 1){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 1 && ppm <= 3){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,90,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 3){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

  if(parametro == "ch4"){
    console.log("flfllfllfll", ppm)
      if(ppm < 1){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 1 && ppm <= 5){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,90,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 5){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

  if(parametro == "so2"){
    console.log("flfllfllfll", ppm)
      if(ppm < 1.3){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 1.3 && ppm <= 5){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,90,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 5){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

  if(parametro == "o3"){
    console.log("flfllfllfll", ppm)
      if(ppm < 0.085){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 0.085 && ppm <= 0.10){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,90,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 0.10){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

  if(parametro == "co"){
    console.log("flfllfllfll", ppm)
      if(ppm < 5){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 5 && ppm <= 9){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,90,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 9){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

  if(parametro == "pm10" || parametro == "pm25"){
    console.log("flfllfllfll", ppm)
    ppm= (ppm*1000)*1.2
      if(ppm < 50){
        $("#verde"+parametro).css(
          {
          "background": "rgb(10,250,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm >= 50 && ppm <= 100){
        $("#naranja"+parametro).css(
          {
          "background": "rgb(255,200,10)",
          "filter": "brightness(1.9)"
          }
          )
      }
      if(ppm > 100){
        $("#rojo"+parametro).css(
          {
          "background": "rgb(255,30,30)",
          "filter": "brightness(1.9)"
          }
          )
      }
    
  }

}