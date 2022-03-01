function pruebaValidarNumeroMiembros(){
    console.assert(
        validarNumeroMiembros(0) === 'El numero de miembros no puede ser 0',
        'validarNumeroMiembros no comprobo que el numero de miembros sea 0'
    )
    console.assert(
        validarNumeroMiembros(100) === 'El numero de miembros no puede ser mayor a 99',
        'validarNumeroMiembros no comprobo que el numero de miembros sea menor a 100'
    )
    console.assert(
        validarNumeroMiembros('dsadsad') === 'Este campo solo admite numeros',
        'validarNumeroMiembros no comprobo que el numero de miembros sean solo numeros'
    )
}

function pruebaValidarEdadMiembros(){
    console.assert(
        validarEdadMiembros(0) === 'La edad no puede ser 0',
        'validarEdadMiembros no comprobo que la edad sea 0'
    )
    console.assert(
        validarEdadMiembros(300) === 'La edad no puede ser mayor a 200',
        'validarEdadMiembros no comprobo que la edad sea menor a 200'
    )
    console.assert(
        validarEdadMiembros(2.7) === 'Este campo solo admite numeros naturales',
        'validarEdadMiembros no comprobo que la edad sean solo numeros naturales'
    )
}

pruebaValidarNumeroMiembros();
pruebaValidarEdadMiembros();
