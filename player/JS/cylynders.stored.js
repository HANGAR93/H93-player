document.addEventListener('DOMContentLoaded', function () {
 
    
    // Seleccionas el primer contenedor con la clase 'contenedor'
    var contenedor3 = document.querySelector('.cinta'); 
      
    if (contenedor3) {
  
  // El HTML que deseas agregar
  var newHTML3 = `
  
 
      <div class="cylinder" id="cintas">
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
        <div class="face5"></div>
      
      
        
      </div>

      
      <div class="cylinder" id="cintas2">
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
        <div class="face6"></div>
       
        
        
      
      
        
      </div>



      <div class="cylinder" id="rotoreje">
        <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>


        
      </div>

      <div class="cylinder" id="rotoreje2">
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
            <div class="face4"></div>
     
        
      </div>

      <div class="cylinder" id="poleaeje">
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
      </div>

   
      <div class="cylinder" id="poleaeje2">
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
        <div class="face3"></div>
      </div>



      <div class="cylinder" id="polea">
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        
      </div>

      <div class="cylinder" id="polea2">
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        
      </div>
      
      <div class="cylinder" id="polea3">
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        
      </div>
  
      <div class="cylinder" id="polea4">
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        <div class="face2"></div>
        
      </div>
  

      <div class="cylinder" id="ccentral">
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        
      </div>
  

      <div class="cylinder" id="c1">
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        
      </div>

      <div class="cylinder" id="c2">
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        
      </div>
      <div class="cylinder" id="c3">
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        
      </div>
      <div class="cylinder" id="c4">
     
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>
        <div class="face"></div>

      </div>
      
  
  `;
       // Append el nuevo HTML al contenedor
       contenedor3.insertAdjacentHTML('beforeend', newHTML3);
      } else {
          console.error("No se encontró un contenedor con la clase 'cinta'.");
      }
  
  

  })