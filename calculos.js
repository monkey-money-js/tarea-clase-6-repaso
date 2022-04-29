function calcularPromedio(numeros){
    let acumulador = 0;
    for (let i=0; i<numeros.length; i++){
        acumulador+=numeros[i];
    }
    return acumulador/numeros.length;
}

function calcularMayor(numeros){
    let numeroMayor = 0;
    for(let i=0; i<numeros.length; i++){
        if(numeros[i] > numeroMayor){
            numeroMayor = numeros[i];
        }
    }
    return numeroMayor;
}

function calcularMenor(numeros){
    let numeroMenor = numeros[0];
    for(let i=0; i<numeros.length; i++){
        if(numeros[i] < numeroMenor){
            numeroMenor = numeros[i];
        }
    }
    return numeroMenor;
}
