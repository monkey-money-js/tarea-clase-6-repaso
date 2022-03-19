function calcularPromedio(vectorEdades){
    let sumaEdades = 0;
    for (let i=0; i<vectorEdades.length; i++){
        sumaEdades+=vectorEdades[i];
    }
    return Number(sumaEdades/vectorEdades.length);
}

function calcularMayor(vectorEdades){
    let numeroMayor = 0;
    for(let i=0; i<vectorEdades.length; i++){
        if(vectorEdades[i] > numeroMayor){
            numeroMayor = vectorEdades[i];
        }
    }
    return numeroMayor;
}

function calcularMenor(vectorEdades){
    let numeroMenor = vectorEdades[0];
    for(let i=0; i<vectorEdades.length; i++){
        if(vectorEdades[i] < numeroMenor){
            numeroMenor = vectorEdades[i];
        }
    }
    return numeroMenor;
}
