/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad,
la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente,
borrando los inputs ya creados (investigar cómo en MDN).

CAN'T DEAL WITH SPAGHETTI CODE HAAAAAAAAAA HELP ME kjkldjgkljdjkljkljjlk
*/
const $botonCalcular = document.querySelector('#boton-calcular');
const $botonSiguiente = document.querySelector('#boton-siguiente');


$botonSiguiente.onclick = function(){
    const numeroMiembros = Number(document.querySelector('.numero-familiares').value);
    if (numeroMiembros > 0){
        for(let i=0; i<numeroMiembros; i++){
            crearMiembro(i);
        }
        $botonCalcular.className = '';
    }
     
}

function crearMiembro(indice){
    const $nuevoDiv = document.createElement('div');

    const $nuevoLabel = document.createElement('label');
    $nuevoLabel.textContent = `Miembro de la familia #${indice + 1}`;
    $nuevoDiv.appendChild($nuevoLabel);

    const $nuevoInput = document.createElement('input');
    $nuevoInput.type = 'number';
    $nuevoInput.className = 'miembro';
    $nuevoDiv.appendChild($nuevoInput);
    document.querySelector('#div-miembros').appendChild($nuevoDiv);
    
}

/////////////////////////////////////////////////////////////////////////////////////


$botonCalcular.onclick = function(){
    const $miembroInput = document.querySelectorAll('.miembro');
    const vectorEdades = [];
    for(let i=0; i<$miembroInput.length; i++){
        vectorEdades.push(Number($miembroInput[i].value));
    }
    
    const promedioEdad = calcularPromedio(vectorEdades);
    const numeroMayor = calcularMayorEdad(vectorEdades);
    const numeroMenor = calcularMenorEdad(vectorEdades);

    const $divPromedio = document.querySelector('#promedio-edad');
    $divPromedio.textContent = `El promedio de edad es de ${promedioEdad.toFixed(2)} años.`;

    const $divMayorEdad = document.querySelector('#mayor-edad');
    $divMayorEdad.textContent = `La mayor edad es de ${numeroMayor} años.`;

    const $divMenorEdad = document.querySelector('#menor-edad');
    $divMenorEdad.textContent = `La menor edad es de ${numeroMenor} años.`;
}

/////////////////////////////////////////////////////////////////////////////////////
function calcularPromedio(vectorEdades){
    let sumaEdades = 0;
    for (let i=0; i<vectorEdades.length; i++){
        sumaEdades+=vectorEdades[i];
    }
    const promedioEdad = Number(sumaEdades/vectorEdades.length);
    return promedioEdad;
}


/////////////////////////////////////////////////////////////////////////////////////
function calcularMayorEdad(vectorEdades){
    let numeroMayor = 0;
    for(let i=0; i<vectorEdades.length; i++){
        if(vectorEdades[i] > numeroMayor){
            numeroMayor = vectorEdades[i];
        }
    }
    return numeroMayor;
}


/////////////////////////////////////////////////////////////////////////////////////
function calcularMenorEdad(vectorEdades){
    let numeroMenor = vectorEdades[0];
    for(let i=0; i<vectorEdades.length; i++){
        if(vectorEdades[i] < numeroMenor){
            numeroMenor = vectorEdades[i];
        }
    }
    return numeroMenor;
}
