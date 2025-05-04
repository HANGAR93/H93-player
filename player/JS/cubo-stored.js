document.addEventListener('DOMContentLoaded', function () {
 
    
  // Seleccionas el primer contenedor con la clase 'contenedor'
  var contenedor = document.querySelector('.contenedor'); 
    
  if (contenedor) {

// El HTML que deseas agregar
var newHTML = `

<div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>

`;
     // Append el nuevo HTML al contenedor
     contenedor.insertAdjacentHTML('beforeend', newHTML);
    } else {
        console.error("No se encontró un contenedor con la clase 'contenedor'.");
    }


 
  // Seleccionas el primer contenedor con la clase 'contenedor'
  var contenedor2 = document.querySelector('.contenedor2'); 
    
  if (contenedor2) {

// El HTML que deseas agregar
var newHTM2L = `

    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>
    <div class="cubo">
        <div class="cara cara-frontal"></div>
        <div class="cara cara-trasera"></div>
        <div class="cara cara-derecha"></div>
        <div class="cara cara-izquierda"></div>
        <div class="cara cara-superior"></div>
        <div class="cara cara-inferior"></div>
    </div>


`;
     // Append el nuevo HTML al contenedor
     contenedor2.insertAdjacentHTML('beforeend', newHTM2L );
    } else {
        console.error("No se encontró un contenedor con la clase 'contenedor2'.");
    }
})