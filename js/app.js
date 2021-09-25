// Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

Seguro.prototype.cotizar = function () {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    
    // Cada año que la diferencia es mayor el costo reduce un 2.7% el valor del seguro
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 2.7) * cantidad) / 100;

    // Si el seguro es basico se multiplica por un 30% mas
    // SI el seguro es completo se multiplica por un 50% mas
    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;

}

function UI() { };

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i >= min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    tipo === 'error' ?
        div.classList.add('error') :
        div.classList.add('correcto')

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000)
}

UI.prototype.limpiar = () => {
    const mensajes = document.querySelectorAll('.mensaje');
    mensajes.forEach(msg => msg.remove());
}

//Intancias
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e) {
    e.preventDefault();
    // Leer marca año y tipo de cobertura

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    ui.limpiar();

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando ...', 'exito');

    const seguro = new Seguro(marca, year, tipo);
    seguro.cotizar();
}