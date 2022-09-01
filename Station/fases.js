function fasesLunares(faseNum, faseLuna){
    if(faseNum == 0 || faseNum == 1){
        faseLuna= "Luna Nueva"
    }
    if(faseNum > 0 && faseNum < 0.25){
        faseLuna= "Luna Creciente"
    }
    if(faseNum == 0.25){
        faseLuna= "Cuarto Creciente"
    }
    if(faseNum > 0.25 && faseNum < 0.5){
        faseLuna= "Gibosa Creciente"
    }
    if(faseNum == 0.5){
        faseLuna= "Luna Llena"
    }
    if(faseNum > 0.5 && faseNum < 0.75){
        faseLuna= "Gibosa Menguante"
    }
    if(faseNum == 0.75){
        faseLuna= "Cuarto Menguante"
    }
    if(faseNum > 0.75 && faseNum < 1){
        faseLuna= "Luna Menguante"
    }
    return faseLuna

}