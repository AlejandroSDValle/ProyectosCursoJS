const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '', 
    transmision: '',
    color: ''
}

document.addEventListener('DOMContentLoaded', () => {
    generarInputYear();
    mostrarAutos(autos);
    marca.addEventListener('change', obtenerValor);
    year.addEventListener('change', obtenerValor);
    minimo.addEventListener('change', obtenerValor);
    maximo.addEventListener('change', obtenerValor);
    puertas.addEventListener('change', obtenerValor);
    transmision.addEventListener('change', obtenerValor);
    color.addEventListener('change', obtenerValor);
});

function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto => {
        const p = document.createElement('P');
        p.textContent = `Marca : ${auto.marca} - ${auto.modelo} - ${auto.year} - Puertas: ${auto.puertas} 
                        - Transmision: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color} `;
        resultado.appendChild(p);
    });
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function generarInputYear(){
    const dateMax = new Date().getFullYear();
    const dateMin = dateMax - 8;
    for(let i = dateMax; i >= dateMin; i--){
        const option = document.createElement('OPTION');
        option.textContent = i;
        option.value = i;
        year.appendChild(option);
    }
}

function obtenerValor(e){
    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto();
}

function filtrarAuto(){
    const resultado = autos.filter( auto => {
        if( datosBusqueda.marca){
            return auto.marca === datosBusqueda.marca;
        }
        return auto;
    }).filter(auto => {
        if( datosBusqueda.year ){
            return auto.year === parseInt(datosBusqueda.year);
        }
        return auto;
    }).filter(auto => {
        if( datosBusqueda.minimo ){
            return auto.precio >= parseInt(datosBusqueda.minimo);
        }
        return auto;
    }).filter(auto => {
        if( datosBusqueda.maximo ){
            return auto.precio <= parseInt(datosBusqueda.maximo);
        }
        return auto;
    }).filter(auto => {
        if( datosBusqueda.puertas ){
            return auto.puertas === parseInt(datosBusqueda.puertas);
        }
        return auto;
    }).filter(auto => {
        if( datosBusqueda.transmision ){
            return auto.transmision === datosBusqueda.transmision;
        }
        return auto;
    }).filter(auto => {
        if( datosBusqueda.color ){
            return auto.color === datosBusqueda.color;
        }
        return auto;
    })
    
    if(resultado.length){
        mostrarAutos(resultado);
        return;
    }
    mensaje();
}

function mensaje(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.textContent = 'No hay resultados';
    noResultado.classList.add('alerta', 'error');
    resultado.appendChild(noResultado);
    
}


