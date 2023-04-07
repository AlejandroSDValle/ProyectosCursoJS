const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    listaCursos.addEventListener('click', agregarCurso);
    listaCarrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', vaciarCarro);
});

function vaciarCarro(){
    limpiarHTML();
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const id = e.target.dataset.id;
        carrito = carrito.filter(curso => curso.id !== id);
        mostrarCarrito();
    }
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement;
        obtenerCurso(curso);
    }

}

function obtenerCurso(curso){
    const cursoObj = {
        imagen: curso.querySelector('.imagen-curso').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1,
        id: curso.querySelector('.agregar-carrito').getAttribute('data-id')
    }
    
    if(carrito.some( curso => curso.id === cursoObj.id)){
        carrito = carrito.map( curso => {
            if(curso.id === cursoObj.id){
                curso.cantidad++;
            }
            return curso;
        });
    }else{
        carrito = [ ...carrito, cursoObj];
    }

    mostrarCarrito();
}

function mostrarCarrito(){

    limpiarHTML();

    carrito.forEach(curso => {
        const tr = document.createElement('tr');
        
        const tdImagen = document.createElement('td');
        const imagen = document.createElement('img');
        imagen.src = curso.imagen;
        imagen.width = 100;
        tdImagen.appendChild(imagen);
        
        const tdNombre = document.createElement('td');
        tdNombre.textContent = curso.nombre;
        
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = curso.precio;
        
        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = curso.cantidad;
        
        const tdBorrar = document.createElement('td');
        const borrar = document.createElement('a');
        borrar.classList.add('borrar-curso');
        borrar.href = '#';
        borrar.dataset.id = curso.id;
        borrar.textContent = 'X';
        tdBorrar.appendChild(borrar);
        
        tr.appendChild(tdImagen);
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdBorrar);
        
        listaCarrito.appendChild(tr);
      });
}

function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }

}