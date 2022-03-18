/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad,
la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente,
borrando los inputs ya creados (investigar cómo en MDN).

/*# Tarea clase 8

A las 2 tareas de la clase 6, ponerles las validaciones que consideren necesarias 
 (regular expressions, objetos, for each, poner estilos, 
 mostrar los errores en la interfaz de usuario y escribir pruebas),
 copiar del repositorio original de la tarea 6 y hacerlo bien piola.

 TIP: Las edades no pueden tener decimales.

*/

const $botonCalcular = document.querySelector('#boton-calcular');
const $botonSiguiente = document.querySelector('#boton-siguiente');
const $botonReset = document.querySelector('#boton-reset');

const $numeroMiembros = document.querySelector('#numero-familiares');
const $errores = document.querySelector('#errores');
const $resultados = document.querySelector('#resultados');

const miObjeto = {};

$botonSiguiente.onclick = function(){

    mostrarErrores();

    const numeroMiembros = Number($numeroMiembros.value);
    miObjeto.miembros = numeroMiembros;

    const errores = errorNumeroMiembros(numeroMiembros);

    borrarMiembrosAnteriores();

    if (errores === 0){
        for(let i=0; i<numeroMiembros; i++){
            crearMiembro(i);
        }
        mostrarBotones();
        ocultarErrores();
    }
    
}

function crearMiembro(indice){
    const $nuevoDiv = document.createElement('div');
    $nuevoDiv.className = 'nuevo-div';
    const $nuevoLabel = document.createElement('label');
    $nuevoLabel.textContent = `Miembro de la familia #${indice + 1}`;
    $nuevoDiv.appendChild($nuevoLabel);
    
    const $nuevoInputEdad = document.createElement('input');
    $nuevoInputEdad.type = 'number';
    $nuevoInputEdad.className = 'miembro';
    $nuevoInputEdad.classList.add(`edad-${String(indice+1)}`);
    $nuevoDiv.appendChild($nuevoInputEdad);

    document.querySelector('#div-miembros').appendChild($nuevoDiv);
}


///////////////////////////////////////calculos/////////////////////////////////////////
$botonCalcular.onclick = function(){
    borrarErrores();
    borrarResultados();
    const $miembroInput = document.querySelectorAll('.miembro');
    const vectorEdades = [];

    for(let i=0; i<$miembroInput.length; i++){
        vectorEdades.push(Number($miembroInput[i].value));
    }
    miObjeto.vectorEdad = vectorEdades;

    const contadorErrores = errorEdadesMiembros(vectorEdades);

    if (contadorErrores === 0){
        borrarBordes();
        const promedioEdad = calcularPromedio(vectorEdades);
        const numeroMayor = calcularMayor(vectorEdades);
        const numeroMenor = calcularMenor(vectorEdades);

        const edades = {
            promedio: promedioEdad,
            mayor: numeroMayor,
            menor: numeroMenor
        }

        mostrarResultados(edades);
    }
    
}

///////////////////////////////////////errores/////////////////////////////////////////
function validarNumeroMiembros(numeroMiembros){
    if (numeroMiembros === 0){
        return 'El numero de miembros no puede ser 0';
    } else if (numeroMiembros > 99){
        return 'El numero de miembros no puede ser mayor a 99';
    } else if (!/^[0-9]+$/.test(numeroMiembros)){
        return 'Este campo solo admite numeros naturales';
    } else{
        return '';
    }
}

function errorNumeroMiembros(miembros){
    const errorNumeroMiembros = validarNumeroMiembros(miembros);
    let contadorErrores = 0;
    borrarErrores();
    if (errorNumeroMiembros) {
        contadorErrores++;
        const $error = document.createElement('li');
        $error.className = 'error-list';
        $numeroMiembros.className = 'error';
        $error.textContent = errorNumeroMiembros;
        $errores.appendChild($error);
    }
    return contadorErrores;
}

function validarEdadMiembros(edadMiembro){
    if (edadMiembro === 0){
        return 'La edad no puede ser 0';
    } else if (edadMiembro > 200){
        return 'La edad no puede ser mayor a 200';
    } else if (!/^[0-9]+$/.test(edadMiembro)){
        return 'Este campo solo admite numeros naturales';
    } else{
        return '';
    }
}

function errorEdadesMiembros(vectorEdad){
    let errorEdadesMiembros;
    let contadorErrores = 0;
    for (let i=0; i<miObjeto.miembros; i++){
        errorEdadesMiembros = validarEdadMiembros(vectorEdad[i]);
        if (errorEdadesMiembros){
            contadorErrores++;
            const $errorLi = document.createElement('li');
            $errorLi.className = 'error-list';
            document.querySelector(`.edad-${String(i+1)}`).classList.add('error');
            $errorLi.textContent = errorEdadesMiembros;
            $errores.appendChild($errorLi);
        }
    }
    mostrarErrores();
    return contadorErrores;
}

function mostrarErrores() {
    $errores.className = '';
}

function borrarErrores(){
    document.querySelectorAll('.error-list').forEach(function(error){
        error.remove();
    });
}

function ocultarErrores() {
    $errores.className = 'oculto';
    $numeroMiembros.className = '';
}

function borrarBordes(){
    const $redNode = document.querySelectorAll('.error');
    for (let i=0; i<$redNode.length; i++){
        $redNode[i].classList.remove('error');
    }
}
////////////////////////////////////reset/////////////////////////////////////////
$botonReset.onclick = borrarMiembrosAnteriores;
function borrarMiembrosAnteriores(){
    ocultarBotones();
    borrarResultados();
    $numeroMiembros.value = null;
    const $miembro = document.querySelectorAll('.nuevo-div');
    $miembro.forEach( element => element.remove() );
}

function ocultarBotones(){
    $botonCalcular.className = 'oculto';
    $botonReset.className = 'oculto';
}

function mostrarBotones(){
    $botonCalcular.className = '';
    $botonReset.className = '';
}

function borrarResultados(){
    document.querySelector('#resultados').textContent = '';
}

function mostrarResultados(edades){
    const $divPromedioEdad = document.createElement('div');
    $divPromedioEdad.textContent = `El promedio de edad es de ${edades.promedio.toFixed(2)} años.`;
    $resultados.appendChild($divPromedioEdad);

    const $divMayorEdad = document.createElement('div');
    $divMayorEdad.textContent = `La mayor edad es de ${edades.mayor} años.`;
    $resultados.appendChild($divMayorEdad);

    const $divMenorEdad = document.createElement('div');
    $divMenorEdad.textContent = `La menor edad es de ${edades.menor} años.`;
    $resultados.appendChild($divMenorEdad);
}
