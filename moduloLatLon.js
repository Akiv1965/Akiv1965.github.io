export{lat, lon}
navigator.geolocation.getCurrentPosition(function(position) {

    var lat =  Number(position.coords.latitude);//40.481815
    var lon =  Number(position.coords.longitude);//-3.364305
    
    return lat,lon
}
)