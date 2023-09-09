const formularioCalculador = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculador.addEventListener('submit', (evento) => {
    evento.preventDefault();
    calcularCalorias();
});

function obtenerValor(elemento) {
    return elemento.value;
}

function mostrarMensajeDeError(mensaje) {
    // Código para mostrar un mensaje de error
}

function calcularCalorias() {
    aparecerResultado();

    const elementos = {
        nombre: document.querySelector('#nombre'),
        apellido: document.querySelector('#apellido'),
        tipoDocumento: document.querySelector('#tipo_documento'),
        documento: document.querySelector('#documento'),
        edad: document.querySelector('#edad'),
        peso: document.querySelector('#peso'),
        altura: document.querySelector('#altura'),
        genero: document.querySelector('input[name="genero"]:checked'),
        actividad: document.querySelector('#actividad')
    };

    const valores = {
        nombre: obtenerValor(elementos.nombre),
        apellido: obtenerValor(elementos.apellido),
        tipoDocumento: obtenerValor(elementos.tipoDocumento),
        documento: obtenerValor(elementos.documento),
        genero: obtenerValor(elementos.genero),
        edad: parseInt(elementos.edad.value),
        peso: parseFloat(elementos.peso.value),
        altura: parseFloat(elementos.altura.value),
        actividad: parseFloat(elementos.actividad.value)
    };

    if (!(valores.edad && valores.peso && valores.altura)) {
        mostrarMensajeDeError('<h1 id="sub_titulo">Por favor asegúrese de llenar todos los campos</h1>');
        return;
    } else if (valores.edad < 15 || valores.edad > 80) {
        mostrarMensajeDeError('La edad ingresada no es permitida');
        return;
    }

    let calculoCalorias;
    if (valores.genero === 'masculino') {
        calculoCalorias = valores.actividad * ((10 * valores.peso) + (6.25 * valores.altura) - (5 * valores.edad)) + 5;
    } else {
        calculoCalorias = valores.actividad * ((10 * valores.peso) + (6.25 * valores.altura) - (5 * valores.edad)) - 161;
    }

    let categoria = '';
    // Determina la categoría de edad
    if (valores.edad >= 15 && valores.edad <= 29) {
        categoria = 'Joven';
    } else if (valores.edad >= 30 && valores.edad <= 59) {
        categoria = 'Adulto';
    } else if (valores.edad >= 60) {
        categoria = 'Adulto Mayor';
    }

    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2" id="titulo">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <div class="card mb-3">
                    <img src="/img/banner.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title" id="titulo">Información</h5>
                        <p class="card-text" id="sub_titulo">El paciente ${valores.nombre} ${valores.apellido}, identificado con ${valores.tipoDocumento} de número ${valores.documento}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TBM.</p>
                        <p class="card-text" id="sub_titulo"><small class="text-muted">Por su edad pertenece al grupo poblacional: ${categoria}</small></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Volver a limpiar variables
    formularioCalculador.reset();
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}

// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}

