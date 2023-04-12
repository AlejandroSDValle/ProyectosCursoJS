const formulario = document.querySelector('#cotizar-seguro');
const resultado = document.querySelector('#resultado');

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
    let cantidad = 2000;
    switch(this.marca){
        case '1': 
            cantidad *= 1.15;
        break;
        case '2':
            cantidad *= 1.05;
        break;
        case '3':
            cantidad *= 1.35;
        break;
        default:
            ui.mostrarMensaje("Hubo un error revisa los datos del formulario", "error");
            cantidad = 0;
        break;
    }

    const diferencia = (new Date().getFullYear() - this.year) * 3;
    cantidad -= (diferencia * cantidad) / 100; 

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI(){}  

UI.prototype.llenarOpciones =  () => {

    const fechaMax = new Date().getFullYear();
    const fechaMin = fechaMax - 20;

    for(let i = fechaMax; i >= fechaMin; i--){
        const option = document.createElement("OPTION");
        option.textContent = i;
        option.value = i;
        year.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const p = document.createElement('P');
    p.textContent = mensaje;
    p.classList.add(tipo, "mt-10", "mensaje");
    if(!formulario.querySelector('.mensaje')){
        formulario.insertBefore(p, document.querySelector('#resultado'));
        setTimeout(() => {
            p.remove();
        }, 3000);
    }
}

UI.prototype.mostrarResultado = (total, {marca, year, tipo}) =>{

    if(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    const div = document.createElement('DIV');
    div.classList.add('mt-10');

    const header = document.createElement('P');
    header.classList.add('header');
    header.textContent = 'Tu Resumen';

    const cantidad = document.createElement('P');
    cantidad.classList.add('font-bold');
    cantidad.textContent = `Total: ${total}`;

    const marcaP = document.createElement('P');
    marcaP.classList.add('font-bold');
    const marcaValue = document.querySelector('#marca').value;
    switch(marca){
        case '1': 
            marca =  'Americano';
        break;
        case '2':
            marca =  'Asiatico';
        break;
        case '3':
            marca =  'Europeo';
        break;
        default:
            ui.mostrarMensaje("Hubo un error revisa los datos del formulario", "error");
            cantidad = 0;
        break;
    }
    marcaP.textContent = `Marca: ${marca} `;

    const yearP = document.createElement('P');
    yearP.classList.add('font-bold');
    yearP.textContent = `year: ${year}`;

    const tipoP = document.createElement('P');
    tipoP.classList.add('font-bold');
    tipoP.textContent = `Tipo: ${tipo}`;

    const spinner = document.querySelector('#cargando');
    spinner.classList.remove('hidden');
    setTimeout(() => {
        spinner.classList.add('hidden');
        div.appendChild(header);
        div.appendChild(cantidad);
        div.appendChild(marcaP);
        div.appendChild(yearP);
        div.appendChild(tipoP);
        resultado.appendChild(div);
    }, 2000);

}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
    formulario.addEventListener('submit', validarFormulario);
});

function validarFormulario(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje("Faltan datos, revisar el formulario y prueba de nuevo", "error");
        return;
    }

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
  
    if(total != 0){
        ui.mostrarResultado(total, seguro);
    }

}
