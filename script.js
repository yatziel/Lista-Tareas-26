/* Referencias Generales */

const tareaEntrada = document.getElementById('tarea-entrada');
const botonAgregar = document.getElementById('boton-agregar');
const mensaje = document.getElementById('mensaje');
const contenedorTareas = document.getElementById('contenedor-tareas');
const contadorTotales = document.getElementById('tareas-totales');
const contadorCompletadas = document.getElementById('tareas-completadas');
const botonOcultar = document.getElementById('boton-ocultar');
const botonEliminar = document.getElementById('boton-eliminar');

/* Escuchadores */

botonAgregar.addEventListener('click', agregarTarea);
botonOcultar.addEventListener('click', ocultarCompletadas);
botonEliminar.addEventListener('click', eliminarCompletadas);

/* Función Agregar Tarea */

function agregarTarea() {
  
  // Generamos una variable  para evaluar si hay texto o nel

  const texto = tareaEntrada.value.trim();

  // Evaluar la constante texto

  if(texto) {
    const elementoTarea = crearElementoTarea();
    contenedorTareas.append(elementoTarea);
    tareaEntrada.value = ''; 
    mensaje.textContent = 'Tarea creada correctamente! 😊';
    // Actualizamos contadores
    actulizarContadores();
  } else {
    mensaje.textContent = 'No escribiste nada chamaco! 🧐';
  }
}

/* Mostrar un mensaje al escribir en el input */

tareaEntrada.addEventListener('input', () => {

  // Evaluar si el valor del input esta vacio

  if( tareaEntrada.value.trim() === '' ) {
    mensaje.textContent = 'Escribe tu primera tarea! 🤗';
  } else {
    mensaje.textContent = 'Al finalizar presiona enter! ↩️';
  }

} )

/* Función para crear el elemento tarea */

function crearElementoTarea() {

  // Crear los elementos html de la tarea
  const tareaContenedor = document.createElement('div');
  const tareaTexto = document.createElement('p');
  const iconosContenedor = document.createElement('div');
  const iconoCompletada = document.createElement('i');
  const iconoEliminar = document.createElement('i');

  // Crear la estructura de la tarea

  iconosContenedor.append(iconoCompletada, iconoEliminar);
  tareaContenedor.append(tareaTexto, iconosContenedor);

  // Agregar las clases a los elementos

  tareaContenedor.classList.add('tarea');
  tareaTexto.classList.add('tarea-texto');
  iconosContenedor.classList.add('tarea-iconos');
  iconoCompletada.classList.add('bi', 'bi-check-circle');
  iconoEliminar.classList.add('bi', 'bi-trash2');

  // Agregar el texto que escriba el usuario en el input

  tareaTexto.innerText = tareaEntrada.value;

  // Escuchadores de los íconos.

  iconoCompletada.addEventListener('click', (e) => {
    const tareaElemento = e.target.parentNode.parentNode;
    const esCompletada = tareaElemento.classList.contains('tarea-completada');
    
    tareaElemento.classList.toggle('tarea-completada');

    if(esCompletada) {
      e.target.classList.remove('bi-dash-circle');
      e.target.classList.add('bi-check-circle');
    } else {
      e.target.classList.remove('bi-check-circle');
      e.target.classList.add('bi-dash-circle');
    }

    // Actualizamos contadores
    actulizarContadores();

    
  } );

  iconoEliminar.addEventListener('click', (e) => {
    const tareaElemento = e.target.parentNode.parentNode;
    tareaElemento.remove();

    // Actualizar contadores
    actulizarContadores();

  })

  // Retornamos la estructura de la tarea
  return tareaContenedor;
}

/* Función Ocultar Completadas. Muestra y oculta las tareas marcadas como completadas */

let tareasOcultas = false; // Controlar el estado de las tareas

function ocultarCompletadas() {

  const tareasCompletadas = document.querySelectorAll('.tarea-completada');

  // Iteración de elementos - Recorrer colecciones
  
  tareasCompletadas.forEach( (tarea) => { 

    if(tareasOcultas) {
      // Mostramos tareas
      tarea.style.display = 'flex';
    } else {
      // Ocultamos tareas
      tarea.style.display = 'none';
    }
  
  } );

  // Cambiamos el estado de la variable.
  
  tareasOcultas = !tareasOcultas;

  // Cambiar el texto del boton

  if(tareasOcultas) {
    botonOcultar.textContent = 'Mostrar Completadas';
  } else {
    botonOcultar.textContent = 'Ocultar Completadas';
  }

}

/* Función Elminar Completadas. Borra las tareas marcadas como completadas */

function eliminarCompletadas() {
  const tareasCompletadas = document.querySelectorAll('.tarea-completada');

  tareasCompletadas.forEach( tarea => tarea.remove() );

  // Actualizamos los contadores
  actulizarContadores();

}

/* Al presionar la tecla enter se ejecusta Agregar Tarea */

tareaEntrada.addEventListener('keydown', (e) => {
  // Evaluar la tecla presionada
  if(e.key === 'Enter') {
    agregarTarea();
  }
} )


/* Actualizamos los contadores */

function actulizarContadores() {

  // Contar todas las tareas

  const tareasTotales = document.querySelectorAll('.tarea');
  const tareasCompletadas = document.querySelectorAll('.tarea-completada');

  contadorTotales.textContent = tareasTotales.length;
  contadorCompletadas.textContent = tareasCompletadas.length;
}

/* Al inicializar la página */

actulizarContadores();