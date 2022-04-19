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

const $numeroFamiliares = document.querySelector('#numero-familiares');
const $errores = document.querySelector('#errores');
const $resultados = document.querySelector('#resultados');

const numeros = {};

$botonSiguiente.onclick = function(){

    mostrarErrores();

    const numeroMiembros = Number($numeroFamiliares.value);
    numeros.miembros = numeroMiembros;

    const errores = evaluarErrorNumeroMiembros(numeroMiembros);

    borrarMiembrosAnteriores();

    if (errores === 0){
        for(let i=0; i<numeroMiembros; i++){
            crearMiembro(i);
        }
        mostrarBotones();
        ocultarErrores();
        
    }

    const $nodeBotonSueldo = document.querySelectorAll('.boton-sueldo');
    const $nodeBotonQuitarSueldo = document.querySelectorAll('.boton-quitar-sueldo');
    const $nodeInputSueldo = document.querySelectorAll('.sueldo');
    for (let i=0; i<$nodeBotonSueldo.length; i++){
        $nodeBotonSueldo[i].onclick = function(){
            $nodeInputSueldo[i].classList.remove('oculto'); 
        }
        $nodeBotonQuitarSueldo[i].onclick = function(){
            $nodeInputSueldo[i].value = null;
            $nodeInputSueldo[i].classList.add('oculto');
        }
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

    const $botonSueldo = document.createElement('button');
    $botonSueldo.type = 'button';
    $botonSueldo.className = 'boton-sueldo';
    $botonSueldo.textContent = 'Agregar sueldo';
    $nuevoDiv.appendChild($botonSueldo);

    const $botonQuitarSueldo = document.createElement('button');
    $botonQuitarSueldo.type = 'button';
    $botonQuitarSueldo.className = 'boton-quitar-sueldo';
    $botonQuitarSueldo.textContent = 'Quitar sueldo';
    $nuevoDiv.appendChild($botonQuitarSueldo);
    
    const $nuevoInputSueldo = document.createElement('input');
    $nuevoInputSueldo.type = 'number';
    $nuevoInputSueldo.className = `sueldo`;
    $nuevoInputSueldo.classList.add('oculto');
    $nuevoInputSueldo.classList.add(`sueldo-${String(indice+1)}`);
    $nuevoDiv.appendChild($nuevoInputSueldo);

    document.querySelector('#div-miembros').appendChild($nuevoDiv);
}

$botonCalcular.onclick = function(){
    borrarErrores();
    borrarResultados();
    const $miembroInput = document.querySelectorAll('.miembro');
    const $sueldoInput = document.querySelectorAll('.sueldo');
    const vectorEdades = [];
    const vectorSueldos= [];
    const vectorSueldosCompleto = [];

    for(let i=0; i<$miembroInput.length; i++){
        vectorEdades.push(Number($miembroInput[i].value));
        vectorSueldosCompleto.push(Number($sueldoInput[i].value));
        if (Number($sueldoInput[i].value) > 0){
            vectorSueldos.push(Number($sueldoInput[i].value));
        }
    }

    numeros.vectorEdad = vectorEdades;
    numeros.vectorSueldo = vectorSueldos;
    numeros.vectorSueldoCompleto = vectorSueldosCompleto;

    const contadorErrores = evaluarErroresMiembros(numeros);

    if (contadorErrores === 0){
        borrarBordes();
        const promedioEdad = calcularPromedio(vectorEdades);
        const edadMayor = calcularMayor(vectorEdades);
        const edadMenor = calcularMenor(vectorEdades);

        const promedioSueldo = calcularPromedio(vectorSueldos);
        const sueldoMayor = calcularMayor(vectorSueldos);
        const sueldoMenor = calcularMenor(vectorSueldos);

        numeros.edadPromedio = promedioEdad;
        numeros.edadMayor = edadMayor;
        numeros.edadMenor = edadMenor;

        numeros.sueldoPromedio = promedioSueldo;
        numeros.sueldoMayor = sueldoMayor;
        numeros.sueldoMenor = sueldoMenor;

        mostrarResultados(numeros);
    }
    
}

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

function evaluarErrorNumeroMiembros(miembros){
    const errorNumeroMiembros = validarNumeroMiembros(miembros);
    let contadorErrores = 0;
    borrarErrores();
    if (errorNumeroMiembros) {
        contadorErrores++;
        const $error = document.createElement('li');
        $error.className = 'error-list';
        $numeroFamiliares.className = 'error';
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

function validarSueldoMiembros(sueldoMiembro){
    if (sueldoMiembro < 0){
        return 'El sueldo no puede ser menor a 0';
    }
    else{
        return '';
    }
}

function evaluarErroresMiembros(numeros){
    let errorEdadesMiembros; 
    let errorSueldosMiembros;
    let contadorErrores = 0;
    for (let i=0; i<numeros.vectorEdad.length; i++){
        errorEdadesMiembros = validarEdadMiembros(numeros.vectorEdad[i]);
        errorSueldosMiembros = validarSueldoMiembros(numeros.vectorSueldoCompleto[i]);
        if (errorEdadesMiembros){
            contadorErrores++;
            const $errorEdad = document.createElement('li');
            $errorEdad.className = 'error-list';
            document.querySelector(`.edad-${String(i+1)}`).classList.add('error');
            $errorEdad.textContent = errorEdadesMiembros;
            $errores.appendChild($errorEdad);
        }
        if (errorSueldosMiembros){
            contadorErrores++;
            const $errorSueldo = document.createElement('li');
            $errorSueldo.className = 'error-list';
            document.querySelector(`.sueldo-${String(i+1)}`).classList.add('error');
            $errorSueldo.textContent = errorSueldosMiembros;
            $errores.appendChild($errorSueldo);
            /// QUE PASA SI UN MIEMBRO DE LA FAMILIA NO TIENE SUELDO???? ERROR
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
    $numeroFamiliares.className = '';
}

function borrarBordes(){
    const $redNode = document.querySelectorAll('.error');
    $redNode.forEach( element => element.classList.remove('error'));
}

$botonReset.onclick = borrarMiembrosAnteriores;
function borrarMiembrosAnteriores(){
    borrarErrores();
    ocultarBotones();
    borrarResultados();
    $numeroFamiliares.value = null;
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

function mostrarResultados(numeros){
    const $promedioEdad = document.createElement('li');
    $promedioEdad.textContent = `El promedio de edad es de ${numeros.edadPromedio.toFixed(2)} años.`;
    $resultados.appendChild($promedioEdad);
    const $mayorEdad = document.createElement('li');
    $mayorEdad.textContent = `La mayor edad es de ${numeros.edadMayor} años.`;
    $resultados.appendChild($mayorEdad);
    const $menorEdad = document.createElement('li');
    $menorEdad.textContent = `La menor edad es de ${numeros.edadMenor} años.`;
    $resultados.appendChild($menorEdad);

    const $promedioSueldo = document.createElement('li');
    $promedioSueldo.textContent = `El promedio de sueldo es de $${numeros.sueldoPromedio.toFixed(2)} .`;
    $resultados.appendChild($promedioSueldo);
    const $mayorSueldo = document.createElement('li');
    $mayorSueldo.textContent = `El mayor sueldo es de $${numeros.sueldoMayor} .`;
    $resultados.appendChild($mayorSueldo);
    const $menorSueldo = document.createElement('li');
    $menorSueldo.textContent = `El menor sueldo es de $${numeros.sueldoMenor} .`;
    $resultados.appendChild($menorSueldo);
}
