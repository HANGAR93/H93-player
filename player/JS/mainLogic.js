const cintaContainer = document.querySelector('.cinta-container');
const cinta = document.querySelector('.cinta');

// Función que se ejecuta cuando el cursor se mueve
cintaContainer.addEventListener('mousemove', (event) => {
  // Obtenemos la posición del cursor dentro del contenedor
  const rect = cintaContainer.getBoundingClientRect();
  const x = event.clientX - rect.left; // Posición en el eje X
  const y = event.clientY - rect.top;  // Posición en el eje Y

  // Calculamos el porcentaje de la posición del cursor respecto al tamaño del contenedor
  const percentX = (x / rect.width) - 0.5; // Normalizamos entre -0.5 y 0.5
  const percentY = (y / rect.height) - 0.5; // Normalizamos entre -0.5 y 0.5

  // Aplicamos una rotación en el contenedor .cinta basada en la posición del cursor
  cinta.style.transform = `rotateX(${percentY * 120}deg) rotateY(${-percentX * 120}deg)`;
});

// Restablecer la rotación cuando el cursor sale del área
cintaContainer.addEventListener('mouseleave', () => {
  cinta.style.transform = 'rotateX(0deg) rotateY(0deg)';
});








//todo lo referente al audio

let savedTime = 0; 

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const stopBtn = document.getElementById('stopBtn');

const goBtn = document.getElementById('goBtn');
    // Obtener los íconos dentro del div
const iconPlay = playPauseBtn.querySelector('.icon-play');
const iconPause = playPauseBtn.querySelector('.icon-pause');

const rotorSR = document.querySelector('.borderotor');
const rotorTR = document.querySelector('.borderotor2');
const rotorSRb = document.querySelector('.contenedor');
const rotorTRb = document.querySelector('.contenedor2');
const bobina11 = document.querySelector('.rotor11');
const bobina12 = document.querySelector('.rotor12');
const poleas = document.querySelector('.cpolea2');
const poleas2 = document.getElementById('cpolea2b');
const divBrillo = document.querySelector('.bobina');
const divBrillo2 = document.querySelector('.bobina2');
const divBrillo3 = document.querySelector('.bobina3');

const logoBtn = document.querySelector('.logo');


    // Mostrar el icono de Play por defecto
iconPlay.style.display = 'block';
iconPause.style.display = 'none';













// main.js

// Variables globales
let playlist = [];  // Para la playlist default (lista de pistas)
let currentTrack = 0;

let currentBlobUrl = null;


// Ajusta el valor de currentTrack en función del estado de la playlist
function updateCurrentTrackIndex() {
  // Si la playlist está vacía, reinicia el currentTrack a -1 o un valor que no cause problemas
  if (playlist.length === 0) {
    currentTrack = -1;
  } else {
    // Asegúrate de que currentTrack esté dentro de los límites válidos de la lista
    currentTrack = Math.min(Math.max(currentTrack, 0), playlist.length - 1);
  }
}

function loadTrack() {
  if (preventAutoLoad) return;

  // Llama a la función que asegura que currentTrack sea válido
  updateCurrentTrackIndex();

 


  if (playlist.length === 0 || currentTrack === -1) {
    console.warn("La playlist está vacía o currentTrack es inválido.");
    audio.src = "";
    audio.pause();
    updateTrackInfo();
    return;
  }

  const track = playlist[currentTrack];

  // Revocar la URL anterior SOLO si era un blob
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }

  if (track.file && track.file instanceof Blob) {
    currentBlobUrl = URL.createObjectURL(track.file);
    audio.src = currentBlobUrl;
  } else if (track.src) {
    audio.src = track.src;
  } else {
    console.error('La pista no tiene archivo ni ruta definida:', track);
    return;
  }

  // Resetear el progreso antes de cargar la nueva canción
  audio.currentTime = 0; // Restablecer el progreso a 0

  updateTrackInfo();
}


  
// Función para actualizar la información de la canción en la interfaz
function updateTrackInfo() {
    if (playlist.length > 0) {
        document.getElementById('trackTitle').textContent = playlist[currentTrack].title;
        document.getElementById('trackArtist').textContent = playlist[currentTrack].artist;
      } else {
        // Si la playlist está vacía, se limpia la información visual
        document.getElementById('trackTitle').textContent = "";
        document.getElementById('trackArtist').textContent = "";
      }
}

// Función para cargar la playlist default desde el store "tracklist"
function loadDefaultPlaylist(db) {
  const transaction = db.transaction(['tracklist'], 'readonly');
  const store = transaction.objectStore('tracklist');
  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = (event) => {
    playlist = event.target.result;
    console.log('Playlist default recuperada:', playlist);
    loadTrack();  // Carga la primera pista
    
  };

  getAllRequest.onerror = (event) => {
    console.error('Error al recuperar la playlist default:', event.target.error);
  };
}



// Función para cargar todas las playlists (gestión de múltiples playlists) desde el store "playlists"
function loadAllPlaylists(db) {
  const transaction = db.transaction(['playlists'], 'readonly');
  const store = transaction.objectStore('playlists');
  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = (event) => {
    const allPlaylists = event.target.result;
    console.log('Todas las playlists recuperadas:', allPlaylists);
    renderPlaylists(allPlaylists);
  };

  getAllRequest.onerror = (event) => {
    console.error('Error al recuperar las playlists:', event.target.error);
  };
}


document.getElementById('newPlaylistForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('playlistName').value.trim();
    const trackElements = document.querySelectorAll('#trackContainer .track');
    const messageBox = document.getElementById('formMessage');
  
    try {
      const tracks = [];
  
      trackElements.forEach((trackEl, index) => {
        const artist = trackEl.querySelector('.artist').value.trim();
        const title = trackEl.querySelector('.title').value.trim();
        const fileInput = trackEl.querySelector('.trackFile');
        const file = fileInput.files[0];
      
        if (!artist || !title || !file) {
          throw new Error(`No data enought for track ${index + 1}`);
        }
      
        tracks.push({
          artist: `#${index + 1}  ${artist}`,
          title: `"${title}"`,
          file
        });
      });
      
  
      const newPlaylist = {
        name,
        tracks,
        isCustom: true
      };
  
      createNewPlaylist(newPlaylist);
      messageBox.textContent = `Playlist "${name}" saves succesfully.`;
      messageBox.style.color = 'white';
      document.getElementById('newPlaylistForm').reset();
  
    
      document.getElementById('trackContainer').innerHTML = '';
      addTrack(); // Agrega al menos una pista vacía para continuar
  
    } catch (error) {
      messageBox.textContent = 'Error: ' + error.message;
      messageBox.style.color = 'white';
    }
  });

  function createNewPlaylist(newPlaylist) {
    openMusicDB(db => {
      const transaction = db.transaction(['playlists'], 'readwrite');
      const store = transaction.objectStore('playlists');
      const addRequest = store.put(newPlaylist);  
  
      addRequest.onsuccess = () => {
        console.log('Playlist guardada correctamente o actualizada.');
        loadAllPlaylists(db); 
      };
  
      addRequest.onerror = (event) => {
        console.error('Error al guardar o actualizar la playlist:', event.target.error);
      };
    });
  }
  
  function addTrack() {
    const container = document.getElementById('trackContainer');
  
    const trackDiv = document.createElement('div');
    trackDiv.classList.add('track');
    trackDiv.setAttribute('draggable', 'true');
    trackDiv.style.borderBottom = '1px solid #ddd';
    trackDiv.style.marginBottom = '5px';
    trackDiv.style.paddingBottom = '5px';
  
    trackDiv.innerHTML = `
      <input type="text" class="artist" placeholder="Artist" required />
      <input type="text" class="title" placeholder="Title" required />
      <label class="custom-file-label">
        Explore..
        <input type="file" class="trackFile" accept="audio/*" required hidden />
      </label>
      <button type="button" class="removeTrack">Remove track</button>
      <br><br>
    `;
  
    container.appendChild(trackDiv);
    setupDragAndDrop(trackDiv);
  }
  
  // DRAG & DROP que se añade a cada track
  function setupDragAndDrop(trackDiv) {
    const container = document.getElementById('trackContainer');
  
    trackDiv.addEventListener('dragstart', (e) => {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        e.preventDefault();
        return;
      }
  
      e.dataTransfer.setData('text/plain', [...container.children].indexOf(trackDiv));
      trackDiv.classList.add('dragging');
    });
  
    trackDiv.addEventListener('dragover', (e) => {
      e.preventDefault();
      trackDiv.style.border = '2px dashed #aaa';
    });
  
    trackDiv.addEventListener('dragleave', () => {
      trackDiv.style.border = '1px solid #ddd';
    });
  
    trackDiv.addEventListener('drop', (e) => {
      e.preventDefault();
      trackDiv.style.border = '1px solid #ddd';
  
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const fromElement = container.children[fromIndex];
      const toIndex = [...container.children].indexOf(trackDiv);
  
      if (fromIndex !== toIndex) {
        container.insertBefore(fromElement, fromIndex < toIndex ? trackDiv.nextSibling : trackDiv);
      }
    });
  
    trackDiv.addEventListener('dragend', () => {
      trackDiv.classList.remove('dragging');
    });
  }
  
  // Botón de agregar pistas
  document.getElementById('addTrackButton').addEventListener('click', addTrack);
  
  // Eliminar pistas con delegación
  document.getElementById('trackContainer').addEventListener('click', (e) => {
    if (e.target.classList.contains('removeTrack')) {
      const trackDiv = e.target.closest('.track');
      if (trackDiv) trackDiv.remove();
    }
  });
  
  // Al cargar, asegurarse de que al menos una pista esté presente
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('trackContainer');
    if (container && container.children.length === 0) {
      addTrack();
    } else {
      // Si ya hay pistas cargadas (como en edición), asegurarse que tengan drag habilitado
      [...container.children].forEach(trackDiv => setupDragAndDrop(trackDiv));
    }
  });
  
  

// Función para actualizar una playlist existente por su ID
function updatePlaylist(id, updatedData) {
  openMusicDB(db => {
    const transaction = db.transaction(['playlists'], 'readwrite');
    const store = transaction.objectStore('playlists');
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const pl = event.target.result;
      if (pl) {
        Object.assign(pl, updatedData);
        const putRequest = store.put(pl);
        putRequest.onsuccess = () => {
          console.log('Playlist updated succesfully:', pl);
          loadAllPlaylists(db);
        };
        putRequest.onerror = (event) => {
          console.error('Error playlist update:', event.target.error);
        };
      } else {
        console.error('No playlist ID found:', id);
      }
    };

    getRequest.onerror = (event) => {
      console.error('Error no playlist obtained:', event.target.error);
    };
  });
}

// Iniciar la carga de la base de datos y de la playlist default y, opcionalmente, las playlists
document.addEventListener('DOMContentLoaded', () => {
  // Cargar la playlist default
  openMusicDB(db => {
    loadDefaultPlaylist(db);
    // Para cargar todas las playlists (nuevas) si ya las tienes:
    loadAllPlaylists(db);
  });
});


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('newPlaylistForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('playlistName').value.trim();
    const rawTracks = document.getElementById('playlistTracks').value.trim();
    const messageBox = document.getElementById('formMessage');
  
    try {
      const tracks = JSON.parse(rawTracks);
  
      if (!Array.isArray(tracks) || tracks.length === 0) {
        throw new Error('Must add a valid track.');
      }
  
      const newPlaylist = {
        name: name,
        tracks: tracks
      };
  
      createNewPlaylist(newPlaylist);
      messageBox.textContent = `Playlist "${name}" saved succesfully.`;
      messageBox.style.color = 'white';
  
      // Reset form
      document.getElementById('newPlaylistForm').reset();
    } catch (error) {
      messageBox.textContent = 'Error: ' + error.message;
      messageBox.style.color = 'white';
    }
  });
});


// Función para renderizar todas las playlists en el HTML (modificada para hacerlas clickeables)
function renderPlaylists(playlists) {
    const container = document.getElementById('allPlaylistsContainer');
    container.innerHTML = '';
    
    playlists.forEach(pl => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.gap = '10px';
      div.style.marginBottom = '10px';
  
      // Botón para cargar (seleccionar) la playlist (si lo necesitas)
      const loadBtn = document.createElement('span');
      loadBtn.textContent = `${pl.name} (ID: ${pl.id})`;
      loadBtn.style.cursor = 'pointer';
      loadBtn.style.flexGrow = '1';
      loadBtn.addEventListener('click', () => {
        selectPlaylist(pl.id);
      });
      
      // Botón para editar la playlist
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit-playlist-btn');
      editBtn.addEventListener('click', (e) => {
        // Evitar que se dispare la acción de carga
        e.stopPropagation();
        editPlaylist(pl);
      });
      
      // Botón para eliminar la playlist
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.classList.add('delete-playlist-btn');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`¿Are you sure (remove "${pl.name})"?`)) {
          deletePlaylist(pl.id);
        }
      });
      
      div.appendChild(loadBtn);
      div.appendChild(editBtn);
      div.appendChild(deleteBtn);
      container.appendChild(div);
    });
  }
  



  let currentPlaylistObj = null;

  // Función para limpiar el reproductor si se elimina la playlist
  function clearPlayerUI() {
    document.getElementById('trackTitle').textContent = '';
    document.getElementById('trackArtist').textContent = '';
    audio.pause();
    audio.src = '';
    audio.load();
    isPlaying = false;
    playlist = [];
    currentTrack = 0;
    updateTrackInfo();
  }
  
  function editPlaylist(playlistObj) {
    currentPlaylistObj = playlistObj;

  
    const container = document.getElementById('editPlaylistContainer');
    container.style.display = 'block';
  
    container.innerHTML = `
      <h3>Edit Playlist: ${playlistObj.name}</h3>
      <label>Name:</label>
      <input type="text" id="editPlaylistName" value="${playlistObj.name}" required /><br><br>
      <div id="editTracksContainer"></div>
      <button type="button" id="addEditTrack">Add track</button><br><br>
      <button type="button" id="savePlaylistEdits">Save changes</button>
      <button type="button" id="cancelEdit">Cancel</button>
      <p id="editFormMessage"></p>
    `;
  
    const tracksContainer = document.getElementById('editTracksContainer');
  
    playlistObj.tracks.forEach((track, index) => {
      const trackDiv = document.createElement('div');
      trackDiv.classList.add('edit-track');
      trackDiv.style.borderBottom = '1px solid #ddd';
      trackDiv.style.marginBottom = '5px';
      trackDiv.style.paddingBottom = '5px';
      trackDiv.setAttribute('draggable', 'true');
  
      const currentFileName = (track.file && track.file.name) ? track.file.name : 'No file';
      const cleanArtist = track.artist.replace(/^#\d+\s*/, '');
      const cleanTitle = track.title.replace(/^"(.*)"$/, '$1');
  
      trackDiv.innerHTML = `
      <label>Track:</label><br>
      <input type="text" class="edit-artist" value="${cleanArtist}" placeholder="Artist" required />
      <input type="text" class="edit-title" value="${cleanTitle}" placeholder="Title" required /><br>
      <small>Current file: ${currentFileName}</small><br>
      <label class="custom-file-label">
        Explore..
        <input type="file" class="edit-file" accept="audio/*" hidden />
      </label><br>
      <button type="button" class="removeEditTrack">Remove track</button>
      <button type="button" class="infoLastFMBtn">Track info</button>
     
      <br><br>
    `;
    
      // Avoid drag when editing text
      trackDiv.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'INPUT') {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData('text/plain', [...tracksContainer.children].indexOf(trackDiv));
        trackDiv.classList.add('dragging');
      });
  
      trackDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
        trackDiv.style.border = '2px dashed #aaa';
      });
  
      trackDiv.addEventListener('dragleave', () => {
        trackDiv.style.border = '1px solid #ddd';
      });
  
      trackDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        trackDiv.style.border = '1px solid #ddd';
  
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const fromElement = tracksContainer.children[fromIndex];
        const toElement = trackDiv;
        const toIndex = [...tracksContainer.children].indexOf(toElement);
  
        if (fromIndex !== toIndex) {
          tracksContainer.insertBefore(fromElement, fromIndex < toIndex ? toElement.nextSibling : toElement);
        }
      });
  
      trackDiv.addEventListener('dragend', () => {
        trackDiv.classList.remove('dragging');
      });
  
      trackDiv.querySelector('.removeEditTrack').addEventListener('click', () => {
        trackDiv.remove();
      });
  
      // Guardamos también el archivo original por si no lo cambian
      const fileInput = trackDiv.querySelector('.edit-file');
      fileInput.dataset.originalIndex = index;
  
      tracksContainer.appendChild(trackDiv);
    });
  
    // Agregar pista nueva
    document.getElementById('addEditTrack').addEventListener('click', () => {
      const trackDiv = document.createElement('div');
      trackDiv.classList.add('edit-track');
      trackDiv.style.borderBottom = '1px solid #ddd';
      trackDiv.style.marginBottom = '5px';
      trackDiv.style.paddingBottom = '5px';
  
      trackDiv.innerHTML = `
        <label>New track:</label><br>
        <input type="text" class="edit-artist" placeholder="Artist" required />
        <input type="text" class="edit-title" placeholder="Title" required /><br>
         <label class="custom-file-label">
                   Explore..
                    <input type="file" class="edit-file" accept="audio/*" required hidden />
                  </label><br>
        <button type="button" class="removeEditTrack">Remove track</button>
        <br><br>
      `;
      tracksContainer.appendChild(trackDiv);
  
      trackDiv.querySelector('.removeEditTrack').addEventListener('click', () => {
        trackDiv.remove();
      });
    });
  
    // Cancelar edición
    document.getElementById('cancelEdit').addEventListener('click', () => {
      container.style.display = 'none';
      container.innerHTML = '';
    });


// Ajusta el valor de currentTrack en función del estado de la playlist
function updateCurrentTrackIndex() {
  // Si la playlist está vacía, reinicia el currentTrack a -1 o un valor que no cause problemas
  if (playlist.length === 0) {
    currentTrack = -1;
  } else {
    // Asegúrate de que currentTrack esté dentro de los límites válidos de la lista
    currentTrack = Math.min(Math.max(currentTrack, 0), playlist.length - 1);
  }
}





document.getElementById('savePlaylistEdits').addEventListener('click', () => {
  try {
    const updatedName = document.getElementById('editPlaylistName').value.trim();
    const trackDivs = document.querySelectorAll('#editTracksContainer .edit-track');
    const updatedTracks = [];

    trackDivs.forEach((div, i) => {
      const artist = div.querySelector('.edit-artist').value.trim();
      const title = div.querySelector('.edit-title').value.trim();
      const fileInput = div.querySelector('.edit-file');

      let file = fileInput.files[0];
      if (!file) {
        const originalIndex = parseInt(fileInput.dataset.originalIndex);
        file = currentPlaylistObj.tracks[originalIndex]?.file;
      }

      if (!artist || !title) throw new Error(`Complete artist or title track ${i + 1}.`);
      if (!file) throw new Error(`Missing audio file for track ${i + 1}.`);

      updatedTracks.push({
        artist: `#${i + 1} ${artist}`,
        title: `"${title}"`,
        file
      });
    });

    const updatedPlaylist = {
      id: currentPlaylistObj.id,
      name: updatedName,
      tracks: updatedTracks,
      isCustom: true
    };

    updatePlaylist(currentPlaylistObj.id, updatedPlaylist);

    playlist = updatedTracks;
    currentPlaylistObj.tracks = updatedTracks;

    updateCurrentTrackIndex();

    audio.pause();
    audio.currentTime = 0;
    audio.src = '';
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = null;
    }

    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.value = 0;

    updateTrackInfo();
    selectPlaylist(currentPlaylistObj.id);

    const container = document.getElementById('editPlaylistContainer');
    container.style.display = 'none';
    container.innerHTML = '';

    currentPlaylistId = currentPlaylistObj.id;
    loadAllPlaylists(window._db);
  } catch (error) {
    const msg = document.getElementById('editFormMessage');
    if (msg) {
      msg.textContent = 'Error: ' + error.message;
      msg.style.color = 'white';
    }
  }
});


  }
  





  
  
// Función para seleccionar una playlist por su ID y cargarla en el reproductor
function selectPlaylist(id) {
    openMusicDB(db => {
      const transaction = db.transaction(['playlists'], 'readonly');
      const store = transaction.objectStore('playlists');
      const request = store.get(id);
    
      request.onsuccess = (event) => {
        const selectedPlaylist = event.target.result;
        if (selectedPlaylist && selectedPlaylist.tracks) {
          playlist = selectedPlaylist.tracks;
          currentTrack = 0;
          console.log('Playlist seleccionada:', selectedPlaylist.name, selectedPlaylist.tracks);
          loadTrack(); // loadTrack() se encargará de limpiar el reproductor si no hay pistas
        } else {
          console.error('Playlist no encontrada o sin pistas');
          // Limpia la interfaz y el reproductor si no hay pistas:
          playlist = [];
          audio.src = "";
          audio.pause();
          updateTrackInfo();
        }
      };
      savedTime = 0;
      request.onerror = (event) => {
        console.error('Error al obtener la playlist:', event.target.error);
      };
    });
    document.getElementById('trackTitle').textContent = "              ..zzzzzZzz..";
    document.getElementById('trackArtist').textContent = "paused..";
  }
  
  function deletePlaylist(id) {
    openMusicDB(db => {
      const transaction = db.transaction(['playlists'], 'readwrite');
      const store = transaction.objectStore('playlists');
      const deleteRequest = store.delete(id);
  
      deleteRequest.onsuccess = () => {
        console.log(`Playlist con ID ${id} eliminada correctamente`);
        // Recargar la lista de playlists después de la eliminación
        loadAllPlaylists(db);  // Usa `db` directamente aquí, no `window._db`
      };
  
      deleteRequest.onerror = (event) => {
        console.error('Error al eliminar la playlist:', event.target.error);
      };
    });
  
    clearPlayerUI();
   
  }
  


// Función para activar y desactivar los efectos
function activarEfectos() {
iconPlay.style.display = 'none';
iconPause.style.display = 'block';

divBrillo.classList.add('activo');
divBrillo2.classList.add('activo');
divBrillo3.classList.add('activo');
}

function activarEfectosR() {
iconPlay.style.display = 'none';
iconPause.style.display = 'block';
rotorSR.classList.add('gogogor');
rotorTR.classList.add('gogogor');
rotorSRb.classList.add('gogogo2r');
rotorTRb.classList.add('gogogo2r');
bobina11.classList.add('gogogor');
bobina12.classList.add('gogogor');
poleas.classList.add('gogogor');
poleas2.classList.add('gogogor');
divBrillo.classList.add('activor');
divBrillo2.classList.add('activor');
divBrillo3.classList.add('activor');
}

function activarEfectosN() {
iconPlay.style.display = 'none';
iconPause.style.display = 'block';
rotorSR.classList.add('gogogon');
rotorTR.classList.add('gogogon');
rotorSRb.classList.add('gogogo2n');
rotorTRb.classList.add('gogogo2n');
bobina11.classList.add('gogogon');
bobina12.classList.add('gogogon');
poleas.classList.add('gogogon');
poleas2.classList.add('gogogon');
divBrillo.classList.add('activon');
divBrillo2.classList.add('activon');
divBrillo3.classList.add('activon');
}


function desactivarEfectos() {
iconPlay.style.display = 'block';
iconPause.style.display = 'none';

divBrillo.classList.remove('activo');
divBrillo2.classList.remove('activo');
divBrillo3.classList.remove('activo');
}

function desactivarEfectosR() {
iconPlay.style.display = 'block';
iconPause.style.display = 'none';
rotorSR.classList.remove('gogogor');
rotorTR.classList.remove('gogogor');
rotorSRb.classList.remove('gogogo2r');
rotorTRb.classList.remove('gogogo2r');
bobina11.classList.remove('gogogor');
bobina12.classList.remove('gogogor');
poleas.classList.remove('gogogor');
poleas2.classList.remove('gogogor');
divBrillo.classList.remove('activor');
divBrillo2.classList.remove('activor');
divBrillo3.classList.remove('activor');
}

function desactivarEfectosN() {
iconPlay.style.display = 'block';
iconPause.style.display = 'none';
rotorSR.classList.remove('gogogon');
rotorTR.classList.remove('gogogon');
rotorSRb.classList.remove('gogogo2n');
rotorTRb.classList.remove('gogogo2n');
bobina11.classList.remove('gogogon');
bobina12.classList.remove('gogogon');
poleas.classList.remove('gogogon');
poleas2.classList.remove('gogogon');
divBrillo.classList.remove('activon');
divBrillo2.classList.remove('activon');
divBrillo3.classList.remove('activon');
}

// Variable de control para saber si el cambio de canción fue manual
let isSkipping = true;
let glitchInterval;
let glitchEn =  false;
glitching();


// Variables de control para los botones
const allButtons = [stopBtn, nextBtn, prevBtn, playPauseBtn];

// Desactivar botones durante el rebobinado
function disableButtons() {
allButtons.forEach(button => button.disabled = true);
}

// Activar botones después del rebobinado
function enableButtons() {
allButtons.forEach(button => button.disabled = false);
}

document.getElementById('trackTitle').textContent = "Enjoy the ride!";
document.getElementById('trackArtist').textContent = "Ty for listening";



let isQuantumProcessing = false; 
let controlContent2 = true; 
let preventAutoLoad = true;

goBtn.addEventListener('click', () => {
    isQuantumProcessing = false;
    preventAutoLoad = false; 
    loadTrack(); 
  
    // Tu código:
    isCounting = true;
    startTimer();
    glitchEn = true;
    glitching();
    document.getElementById('terminal-ia').style.display = 'none';
    document.querySelector('.main').style.display = 'none';
    document.querySelector('ul').style.display = 'none';
    document.querySelector('.lines').style.display = 'none';
    checkAudioStatus();
    audio.currentTime = savedTime;  // Establece el tiempo guardado
  
    // Alternar mensajes

    if (playlist.length > 0) {
      // Mensaje cuando hay canciones
      document.getElementById('trackArtist').textContent = "Are you..";
      document.getElementById('trackTitle').textContent = "      ..Ready?";

      // Eliminar cualquier clase de advertencia y usar la fuente base
      document.getElementById('trackArtist').classList.remove("track-warning");
      document.getElementById('trackTitle').classList.remove("track-warning");

    } else {
      // Mensaje cuando no hay canciones
      document.getElementById('trackArtist').textContent = "[ WARNING 0x300 ]";
      document.getElementById('trackTitle').textContent = "No tracks found";

      // Aplicar estilo de advertencia
      document.getElementById('trackArtist').classList.add("track-warning");
      document.getElementById('trackTitle').classList.add("track-warning");
    }

  });



  logoBtn.addEventListener('click', () => {
    // Verificar si ya está en proceso (para evitar que el botón funcione mientras `isQuantumProcessing` sea true)
    //if (isQuantumProcessing) return;
    
   
    // Desactivar el botón mientras se ejecuta la función
    //logoBtn.disabled = true;
    
    // Marcar como en proceso
    isQuantumProcessing = true;
  
    preventAutoLoad = true;
    isCounting = false;
    stopTimer(); // Detiene el contador
    pause();
    glitchEn = false;
    glitching();
  
    // Actualizar la UI para mostrar el estado de pausa
    document.getElementById('trackArtist').classList.remove("track-warning");
    document.getElementById('trackTitle').classList.remove("track-warning");
    document.querySelector('.lines').style.display = 'block';
    document.querySelector('.main').style.display = 'block';
    document.querySelector('ul').style.display = 'block';
    document.getElementById('trackTitle').textContent = "              ..zzzzzZzz..";
    document.getElementById('trackArtist').textContent = "paused..";
    document.getElementById('terminal-ia').style.display = 'block';
    
    // Comprobar el estado del audio
    checkAudioStatus();
    loadQuote();
  
    savedTime = audio.currentTime;  // Guardamos el tiempo actual de la canción
    // Pausar la canción
    audio.pause();
  
    // Desactivar cualquier animación o efecto visual
    desactivarEfectos();
    desactivarEfectosN();
    desactivarEfectosR();
  
    // Mostrar el icono de Play y ocultar el de Pause
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  
    // Detener el contador de tiempo
    totalSeconds = 0;
  
    // Detener el intervalo de glitch
    enableButtons();
  


    
  });
  

// Evento para el botón stop
stopBtn.addEventListener('click', () => {
if(playlist.length > 0) {
    resetToDefault();
    playRewindSound2()
    initializeDistortion(); // Resetea la distorsión y el slider al iniciar una canción

    document.getElementById('trackTitle').textContent = "";
    document.getElementById('trackArtist').textContent = "";

    // Pausar la canción y reiniciarla desde el principio
    audio.pause();
    audio.currentTime = 0;

    // Desactivar cualquier animación o efecto visual
    desactivarEfectos();
    desactivarEfectosN();
    desactivarEfectosR();





    // Mostrar el icono de Play y ocultar el de Pause
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';

    // Detener el contador de tiempo
    totalSeconds = 0;
    document.getElementById("seconds").innerHTML = pad(0);
    document.getElementById("minutes").innerHTML = pad(0);

    // Detener el intervalo de glitch
    
    enableButtons();
}
});



let firstPlay = true;
let savedTime2 = 0;


// 1) Cuando el usuario arrastra la barra, actualiza la posición
progressBar.addEventListener('input', (e) => {
  const newTime = parseFloat(e.target.value);
  savedTime2 = newTime;

 
  if (firstPlay) {
    const trackInfo = playlist[currentTrack];
    if (trackInfo.file instanceof Blob) {
      audio.src = URL.createObjectURL(trackInfo.file);
    } else {
      audio.src = trackInfo.src;
    }
    firstPlay = false;
  }

  audio.currentTime = newTime;
});


playPauseBtn.addEventListener('click', () => {
  if (!playlist.length) return;

  playRewindSound2();
  updateTrackInfo();

 
  if (firstPlay) {
    const trackInfo = playlist[currentTrack];
    if (trackInfo.file instanceof Blob) {
      audio.src = URL.createObjectURL(trackInfo.file);
    } else {
      audio.src = trackInfo.src;
    }
    audio.currentTime = savedTime2; // normalmente 0
    firstPlay = false;
  }

  // Reproducir o pausar sin cambiar src ni currentTime después
  if (audio.paused) {
    audio.play();
    activarEfectos();
    play();
  } else {
    savedTime2 = audio.currentTime; // guarda posición al pausar
    audio.pause();
    desactivarEfectos();
    pause();
  }
});


// Actualizar la barra de progreso
audio.addEventListener('timeupdate', () => {
const progress = (audio.currentTime / audio.duration) * 100;
progressBar.value = progress;
});

// Controlar el progreso manualmente
progressBar.addEventListener('input', (e) => {
const time = (e.target.value / 100) * audio.duration;
audio.currentTime = time;
});

// Inicializar el valor de la barra de volumen al cargar la página
volumeControl.value = audio.volume;  // Asegura que el valor de la barra esté sincronizado con el volumen del audio

// Función para aplicar una curva exponencial
function applyExponentialCurve(value, min, max, factor) {
// Normaliza el valor en el rango [0, 1]
let normalized = (value - min) / (max - min);

// Aplica la curva exponencial
let exponentialValue = Math.pow(normalized, factor);

// Convierte de nuevo a un rango entre min y max
return (exponentialValue * (max - min)) + min;
}


volumeControl.addEventListener('input', (e) => {
// Aplicamos una curva exponencial al volumen
let exponentialVolume = applyExponentialCurve(e.target.value, 0, 1, 3);  // Factor 3 para que el cambio sea más gradual

audio.volume = exponentialVolume;  // Ajusta el volumen del audio
});

let isAutoEnding = false;



nextBtn.addEventListener('click', () => {

    // Verificar si la longitud de la playlist es mayor a 0
    if (playlist.length === 0) {
      return; // Si la playlist está vacía, no hacer nada
    }





  logoBtn.classList.add('rotating');

  if (playlist.length > 0) {
      if (!isAutoEnding) {
          playRewindSound2(); 
          playRewindSound(); // Solo reproducir sonido al hacer clic manual
      }

      // Ejecutar la reproducción y efectos al iniciar
      play();
      initializeDistortion(); // Resetea la distorsión y el slider al iniciar una canción
      resetToDefault();
      
      // Si estamos en modo auto-ending (cambio automático al siguiente track)
      if (isAutoEnding && !isQuantumProcessing) {
          play();
          if (playlist[currentTrack].file && playlist[currentTrack].file instanceof Blob) {
              // La pista tiene un archivo Blob, por lo que es personalizada
              currentTrack = (currentTrack + 1) % playlist.length;
              loadTrack();
          } else {
              // La pista es de una lista por defecto (tiene una propiedad src)
              currentTrack = (currentTrack + 1) % playlist.length;
              audio.src = playlist[currentTrack].src;
          }
          updateTrackInfo(); // Actualizar la información de la pista
          audio.play();
          iconPlay.style.display = 'none';
          iconPause.style.display = 'block';

      } else {
          // Aquí se maneja la transición de la pista de manera manual
          document.querySelector('.xdd').style.display = 'block';
          document.getElementById('xdd2').style.display = 'block';
          document.getElementById('trackTitle').style.display = 'none'; 
          document.getElementById('trackArtist').style.display = 'none'; 
          audio.pause();

          activarEfectosN();

          setTimeout(() => {
              rewindSound.pause();
              rewindSound.currentTime = 0; // Reiniciar el sonido al principio
              desactivarEfectosN();
          }, 1000);

          setTimeout(() => {
              // Ocultar los efectos de transición
              document.querySelector('.xdd').style.display = 'none';
              document.getElementById('xdd2').style.display = 'none';
              document.getElementById('trackTitle').style.display = 'block'; // Mostrar el título
              document.getElementById('trackArtist').style.display = 'block'; // Mostrar el artista
              if (!isQuantumProcessing) {
              if (playlist[currentTrack].file && playlist[currentTrack].file instanceof Blob) {
                  // La pista tiene un archivo Blob, por lo que es personalizada
                  currentTrack = (currentTrack + 1) % playlist.length;
                  loadTrack();
              } else {
                  // La pista es de una lista por defecto (tiene una propiedad src)
                  currentTrack = (currentTrack + 1) % playlist.length;
                  audio.src = playlist[currentTrack].src;
              }

              updateTrackInfo(); // Actualizar la información de la pista
              
              audio.play();
              iconPlay.style.display = 'none';
              iconPause.style.display = 'block';
              activarEfectos(); // Reactivar el brillo tras cargar la pista
              enableButtons();
            }
             
          
              logoBtn.classList.remove('rotating'); // Detener la animación de giro
          }, 1000);

          rebobinar();
      }
  }
});



// Cambiar a la canción anterior
prevBtn.addEventListener('click', () => {

      // Verificar si la longitud de la playlist es mayor a 0
      if (playlist.length === 0) {
        return; // Si la playlist está vacía, no hacer nada
      }
  



  logoBtn.classList.add('rotating2');

    if(playlist.length > 0) {
        initializeDistortion(); // Resetea la distorsión y el slider al iniciar una canción
        resetToDefault();


        if (!isSkipping  && !isQuantumProcessing) {
        
            if (playlist[currentTrack].file && playlist[currentTrack].file instanceof Blob) {
                // La pista tiene un archivo Blob, por lo que es personalizada
                currentTrack = (currentTrack - 1) % playlist.length;
                loadTrack();
            } else {
                // La pista es de una lista por defecto (tiene una propiedad src)
                currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
                audio.src = playlist[currentTrack].src;
                
            }
            updateTrackInfo(); // Actualizar la información de la pista
            audio.play();
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            isSkipping = true;
        }
        else{
            isSkipping = true;
            document.querySelector('.xdd').style.display = 'block';
            document.getElementById('xdd2').style.display = 'block';
            document.getElementById('trackTitle').style.display = 'none'; 
            document.getElementById('trackArtist').style.display = 'none'; 
            audio.pause();
            playRewindSound2();
            activarEfectosR();
            
            playRewindSound();

            setTimeout(() => {
                rewindSound.pause();
                rewindSound.currentTime = 0; // Reiniciar el sonido al principio
                desactivarEfectosR();
            }, 1000);

            setTimeout(() => {
                document.querySelector('.xdd').style.display = 'none';
                document.getElementById('xdd2').style.display = 'none';
                document.getElementById('trackTitle').style.display = 'block'; // Mostrar el título
                document.getElementById('trackArtist').style.display = 'block'; // Mostrar el artista
                
                if (!isQuantumProcessing) {
                if (playlist[currentTrack].file && playlist[currentTrack].file instanceof Blob) {
                    // La pista tiene un archivo Blob, por lo que es personalizada
                    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
                    loadTrack();
                } else {
                    // La pista es de una lista por defecto (tiene una propiedad src)
                    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
                    audio.src = playlist[currentTrack].src;
                    
                }
                
                updateTrackInfo(); // Actualizar la información de la pista
                
                audio.play();
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
                activarEfectos(); // Reactivar el brillo tras cargar la pista
                enableButtons();
              }   
           
              logoBtn.classList.remove('rotating2'); // Detener la animación de giro
            }, 1000);
            


        }
        rebobinar();
    }
  
});




audio.addEventListener('ended', () => {
  // Evitar que se ejecute si está en proceso de cambio de canción
  if (isQuantumProcessing) return;

  isAutoEnding = true; // Indicar que el cambio de canción es automático
 

      // Simular clic en el botón "Siguiente"
  nextBtn.click(); // Esto disparará el cambio de canción

  


  // Reiniciar el estado después del cambio
  isAutoEnding = false; 
 
  logoBtn.classList.remove('rotating'); // Detener la animación de giro
});


// Crear el objeto de audio para el sonido de rebobinado
const rewindSound = new Audio('assets/rewind.mp3');
const rewindSound2 = new Audio('assets/closing-tape-cassette-172756.mp3');

// Reproducir el sonido cuando se hace un rebobinado
function playRewindSound() {
rewindSound.play();
disableButtons(); // Desactivar botones al iniciar el rebobinado
}

// Reproducir el sonido button
function playRewindSound2() {
rewindSound2.play();

}

function glitching() {
if (glitchEn) {
    // Si el glitch está habilitado, inicia el intervalo para el glitch
    glitchInterval = setInterval(() => {
        const glitch = document.querySelector('.logo');

        glitch.classList.add('logo-glitch');

        // Desactivar el glitch después de 1 segundo (duración de la animación)
        setTimeout(() => {
            glitch.classList.remove('logo-glitch');
        }, 1000);  // Duración de la animación en milisegundos
    }, 10000);  // Ejecutar cada 10 segundos
} else {
    // Si el glitch está deshabilitado, quitar la clase y limpiar el intervalo
    clearInterval(glitchInterval);
    const glitch = document.querySelector('.logo');
    glitch.classList.remove('logo-glitch');
}
}

//VHS

function getVHSDate() {
const now = new Date();

// Extraemos el mes, día y año
const month = now.toLocaleString('en-US', { month: 'short' }); // Obtiene el mes abreviado
const day = String(now.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
const year = now.getFullYear(); // Obtiene el año

// Formateamos la fecha en el formato "Mes. Día Año"
const vhsDate = `${month}. ${day} ${year}`;

// Insertamos la fecha en el div
document.getElementById('vhs-date').textContent = vhsDate;
}

// Llamamos la función para mostrar la fecha
getVHSDate();



// Función para obtener la hora en formato "AM/PM 00:00"
function getVHSTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convertimos el formato de 24 horas a 12 horas
    hours = hours % 12 || 12; // Si es 0, lo cambiamos a 12 (12 AM)
    minutes = String(minutes).padStart(2, '0'); // Aseguramos que los minutos tengan 2 dígitos

    const vhsTime = `${period} ${hours}:${minutes}`; // Formato "AM/PM 00:00"
    document.getElementById('vhs-time').textContent = vhsTime; // Actualiza el div con la hora
  }

  getVHSTime();
  setInterval(getVHSTime, 30000);








    // Variables del contador
    let hours = 0;
    let minutes = 0;
    let seconds = 0;


    let isCounting = false; // Variable de control que determina si el contador sigue corriendo

    // Mostrar el tiempo en el formato "00:00:00"
    function updateCounter() {
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Función para iniciar o actualizar el contador
    function startCounting() {
      if (isCounting) { // Si isCounting es true, el contador sigue
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
        updateCounter();
      }
    }

   
// Inicia el contador automáticamente cuando la página carga
let intervalId;
function startTimer() {
if (!intervalId) {
intervalId = setInterval(startCounting, 1000); // Ejecuta la función cada 1000 ms (1 segundo)
}
}

// Detener el contador
function stopTimer() {
clearInterval(intervalId); // Detiene el intervalo
intervalId = null;
}




// Más funciones audio

const bassControl = document.getElementById("bassControl");
const trebleControl = document.getElementById("trebleControl");

// Configurar Web Audio API
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
const track = audioContext.createMediaElementSource(audio);

// Crear filtros para graves y agudos
const bassFilter = audioContext.createBiquadFilter();
bassFilter.type = "lowshelf"; // Tipo de filtro para graves
bassFilter.frequency.value = 200; // Frecuencia base para graves

const trebleFilter = audioContext.createBiquadFilter();
trebleFilter.type = "highshelf"; // Tipo de filtro para agudos
trebleFilter.frequency.value = 3000; // Frecuencia base para agudos

// Conectar filtros al contexto de audio
track.connect(bassFilter).connect(trebleFilter).connect(audioContext.destination);

// Función para aplicar una curva exponencial más pronunciada
function applyExponentialCurve(value, min, max, factor) {
// Asegura que el valor esté entre 0 y 1
let normalized = (value - min) / (max - min);

// Aplicar la curva exponencial
let exponentialValue = Math.pow(normalized, factor);

// Convierte de nuevo a un rango entre min y max
return (exponentialValue * (max - min)) + min;
}

// Ajuste gradual de los filtros (bass y treble) con curva exponencial
bassControl.addEventListener("input", (e) => {
// Aplicar una curva exponencial mucho más pronunciada a la ganancia de graves
let gainValue = applyExponentialCurve(e.target.value, -30, 30, 1.5); // Factor 1.5 para mayor diferencia

bassFilter.gain.value = gainValue; // Aplicar la ganancia al filtro de graves
});

trebleControl.addEventListener("input", (e) => {
// Aplicar una curva exponencial más suave a la ganancia de agudos
let gainValue2 = applyExponentialCurve(e.target.value, -30, 30, 1.5); // Factor de 1.5 para un cambio más intenso

trebleFilter.gain.value = gainValue2; // Ajustar ganancia de agudos
});

// Iniciar el contexto de audio al reproducir
audio.addEventListener("play", () => {
if (audioContext.state === "suspended") {
    audioContext.resume();
}
});

// Crear el nodo de paneo estéreo y conectar
const stereoPanner = audioContext.createStereoPanner();
track.connect(stereoPanner).connect(audioContext.destination);

// Ajuste del balance estéreo más sensible
const balanceControl = document.getElementById("balanceControl");
balanceControl.addEventListener("input", (e) => {
// Aumentar la sensibilidad del balance estéreo
let exaggeratedPanValue = applyExponentialCurve(e.target.value, -1.5, 1.5, 3); 

stereoPanner.pan.value = exaggeratedPanValue; 
});

// Sincronizar los valores de los controles con los valores actuales de Web Audio API
window.addEventListener("load", () => {
// Sincronizamos los controles con los valores actuales de los filtros y el paneo
bassControl.value = bassFilter.gain.value; // Actualiza el control de graves
trebleControl.value = trebleFilter.gain.value; // Actualiza el control de agudos
balanceControl.value = stereoPanner.pan.value; // Actualiza el control de balance estéreo
});

// Opcional: actualizar en tiempo real mientras se mueve el control
bassControl.value = bassFilter.gain.value;
trebleControl.value = trebleFilter.gain.value;
balanceControl.value = stereoPanner.pan.value;





const distortionControl = document.getElementById('distortion-control');

// Crear el nodo de distorsión (WaveShaperNode)
const distortion = audioContext.createWaveShaper();

// Crear un nodo de ganancia para controlar el volumen
const gainNode = audioContext.createGain();

// Crear la fuente de audio
const audioSource = audioContext.createMediaElementSource(audio);

// Conectar la fuente de audio a la distorsión
audioSource.connect(distortion);
distortion.connect(gainNode);
gainNode.connect(audioContext.destination);

// Función para crear la curva de distorsión
function makeDistortionCurve(amount) {
const curve = new Float32Array(44100); // 44.1 kHz
for (let i = 0; i < 44100; i++) {
    const x = i * 2 / 44100 - 1;
    curve[i] = Math.pow(Math.abs(x), amount) * Math.sign(x); // Genera una forma distorsionada
}
return curve;
}

// Función que actualiza la distorsión en tiempo real según el valor del slider (invertido)
function updateDistortion(value) {
const invertedValue = (100 - value) / 100; // Invertir el valor del slider
distortion.curve = makeDistortionCurve(invertedValue); // Aplica la curva de distorsión
}

// Evento para actualizar la distorsión al mover el slider
distortionControl.addEventListener('input', (event) => {
const distortionValue = event.target.value;
updateDistortion(distortionValue); // Aplica la distorsión según el valor invertido
});

// Función que asegura que el slider esté completamente a la izquierda (sin distorsión)
function initializeDistortion() {
distortionControl.value = 0; // Coloca el slider al mínimo (izquierda)
updateDistortion(0); // Aplica distorsión nula (sin distorsión)
}


// Llamar a la función de inicialización al cargar la página
initializeDistortion();



// Obtener el control del pitch (slider)
const pitchControl = document.getElementById('pitch-control');

// Obtener los elementos específicos que deben rotar
const elements = [
rotorSR,
rotorTR,
rotorSRb,
rotorTRb,
poleas,
poleas2
];
// Variable común para controlar la velocidad
let speedControl = 50;  // Valor inicial de 50, que es el valor medio (predeterminado)
let rotationAngle = 0;  // Ángulo de rotación acumulado
let rotationSpeed = (speedControl / 50) * 10;  // Velocidad de rotación
let rotationRequestId = null;  // ID de requestAnimationFrame
let lastTime = 0;  // Tiempo de la última actualización
let skipNextDelta = false; // Flag para ignorar el primer deltaTime tras reanudar

// Conectar la fuente de audio al nodo de ganancia
audioSource.connect(gainNode);
gainNode.connect(audioContext.destination);

// Función para actualizar la velocidad de rotación y el playbackRate del audio
function updateSpeedControl(value) {
// Actualizamos la variable común `speedControl`
speedControl = value;

// Actualizamos el playbackRate del audio
audio.playbackRate = speedControl / 50; // La escala de 0-100 para el slider se traduce en playbackRate

// Actualizamos la velocidad de rotación
rotationSpeed = (speedControl / 50) * 10;  // Ajusta la velocidad de rotación en función de `speedControl`
}

function updateRotation() {
const currentTime = Date.now();
let deltaTime = (currentTime - lastTime) / 1000;  // Tiempo transcurrido en segundos

// Si es el primer frame luego de reanudar, ignoramos deltaTime para evitar discrepancias
if (skipNextDelta) {
    deltaTime = 0;
    skipNextDelta = false;
}

lastTime = currentTime;

// Incrementamos el ángulo global basado en la velocidad y deltaTime
rotationAngle += rotationSpeed * deltaTime * 60;

// Aplicamos la rotación a cada uno de los elementos
elements.forEach((element) => {
    // Caso de rotores traseros que requieren translateZ(-10px)
    if (element === rotorSRb || element === rotorTRb) {
        element.style.transform = `rotate(${rotationAngle}deg) translateZ(-10px)`;
    }
    // Caso de "poleas" y "poleas2", que rotarán al doble de velocidad
    else if (element === poleas || element === poleas2) {
        element.style.transform = `rotate(${rotationAngle * 2}deg)`;
    }
    // Para el resto de elementos, aplicamos la rotación normal
    else {
        element.style.transform = `rotate(${rotationAngle}deg)`;
    }
});

// Intentamos acceder a las reglas CSS y ajustar la duración de la animación
try {
    const styles = document.styleSheets[0]; // Accedemos al primer stylesheet

    // Verificamos si podemos acceder a las reglas
    if (styles.cssRules) {
        for (let i = 0; i < styles.cssRules.length; i++) {
            const rule = styles.cssRules[i];
            const playbackRate = audio.playbackRate;

            // Si playbackRate es 0, detenemos la animación
            if (playbackRate === 0) {
                if (rule.selectorText && rule.selectorText.includes('.bobina.activo::after')) {
                    rule.style.animationDuration = `0s`;
                }
                if (rule.selectorText && rule.selectorText.includes('.bobina2.activo::after')) {
                    rule.style.animationDuration = `0s`;
                }
                if (rule.selectorText && rule.selectorText.includes('.bobina3.activo::after')) {
                    rule.style.animationDuration = `0s`;
                }
            } else {
                // Ajustamos la duración en función del playbackRate
                if (rule.selectorText && rule.selectorText.includes('.bobina.activo::after')) {
                    rule.style.animationDuration = `${(1 / playbackRate) * 0.5}s`;
                }
                if (rule.selectorText && rule.selectorText.includes('.bobina2.activo::after')) {
                    rule.style.animationDuration = `${(1 / playbackRate) * 0.5}s`;
                }
                if (rule.selectorText && rule.selectorText.includes('.bobina3.activo::after')) {
                    rule.style.animationDuration = `${(1 / playbackRate) * 0.5}s`;
                }
            }
        }
    } else {
        console.warn('No se puede acceder a las reglas CSS, el archivo puede tener restricciones CORS.');
    }
} catch (error) {
    console.error('Error al acceder a las reglas CSS:', error);
}

// Solicitar el siguiente fotograma
rotationRequestId = requestAnimationFrame(updateRotation);
}

// Función para comenzar la rotación
function startRotation() {
if (!rotationRequestId) {
    lastTime = Date.now();  // Reiniciamos el tiempo de referencia
    skipNextDelta = true;   // Activamos el flag para ignorar el primer deltaTime
    rotationRequestId = requestAnimationFrame(updateRotation);  // Iniciamos la animación
}
}

// Función para detener la rotación
function stopRotation() {
if (rotationRequestId) {
    cancelAnimationFrame(rotationRequestId);  // Detenemos la animación
    rotationRequestId = null;  // Limpiamos el ID del requestAnimationFrame
}
}

// Evento para controlar el slider (pitch control)
pitchControl.addEventListener('input', (event) => {
const pitchValue = event.target.value;
updateSpeedControl(pitchValue); // Llama a la función para aplicar el valor del slider

rotorSRb.style.transform = `rotate(${rotationAngle}deg) translateZ(-10px)`;
rotorTRb.style.transform = `rotate(${rotationAngle}deg) translateZ(-10px)`;

});

// Función para restablecer el control deslizante, playbackRate y animación al valor predeterminado
function resetToDefault() {
const defaultPlaybackRate = 1; // Valor predeterminado para playbackRate (cuando el slider está a 50)
const defaultSliderValue = 50; // Valor predeterminado del slider (coincide con playbackRate = 1)

// Restablecemos la variable común `speedControl`
speedControl = defaultSliderValue;

// Restablecemos la velocidad de rotación y playbackRate
audio.playbackRate = defaultPlaybackRate;
pitchControl.value = defaultSliderValue;
rotationSpeed = (speedControl / 50) * 10;
// Detenemos la rotación
stopRotation();

rotationAngle = 0;  // Restablecer el ángulo de rotación

// Restablecemos la rotación de los elementos
elements.forEach((element) => {
    element.style.transform = `rotate(${rotationAngle}deg)`;
});

rotorSRb.style.transform = `rotate(${rotationAngle}deg) translateZ(-10px)`;
rotorTRb.style.transform = `rotate(${rotationAngle}deg) translateZ(-10px)`;


// Restablecer la duración de las animaciones de las bobinas
// Asegurarse de que las hojas de estilo estén disponibles
if (document.styleSheets.length > 0) {
  const styles = document.styleSheets[0]; // Acceder al primer archivo de estilo
  try {
      // Acceder a las reglas CSS de forma más compatible
      const rules = styles.cssRules || styles.rules; 

      for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];

          // Verificar si el selector contiene las clases que queremos modificar
          if (rule.selectorText && rule.selectorText.includes('.bobina.activo::after')) {
              rule.style.animationDuration = `1s`; // Duración predeterminada
          }
          if (rule.selectorText && rule.selectorText.includes('.bobina2.activo::after')) {
              rule.style.animationDuration = `1s`; // Duración predeterminada
          }
          if (rule.selectorText && rule.selectorText.includes('.bobina3.activo::after')) {
              rule.style.animationDuration = `1s`; // Duración predeterminada
          }
      }
  } catch (e) {
      console.error("Error al acceder o modificar las reglas CSS:", e);
  }
} else {
  console.error('No se han encontrado hojas de estilo en el documento.');
}

}

// Llamar a resetToDefault() para establecer los valores predeterminados al iniciar
resetToDefault();

// Función para rebobinar la animación, resetear y detenerla
function rebobinar() {
// Restablecer los valores al inicio
resetToDefault();

// Reiniciar la animación, velocidad y slider
startRotation();
}

// Modificación en las funciones de play y pause
let savedState = null;  // Variable para almacenar el estado guardado

function play() {
if (!rotationRequestId) {
    startRotation();  // Iniciar o reanudar la rotación
}
}

function pause() {
if (rotationRequestId) {
    stopRotation();  // Detener la rotación
}
}

// Aseguramos translateZ(-10px) al cargar la página
window.addEventListener('load', () => {
rotorSRb.style.transform = `translateZ(-10px)`;
rotorTRb.style.transform = `translateZ(-10px)`;
});







const mainGainNode = gainNode;

// Crear un nodo de delay
const delayNode = audioContext.createDelay();
delayNode.delayTime.value = 0.4;

// Crear un nodo de feedback (retroalimentación)
const feedbackGain = audioContext.createGain();
feedbackGain.gain.value = 0.5;

// Conectar el feedback: delay -> feedback -> delay
delayNode.connect(feedbackGain);
feedbackGain.connect(delayNode); // Retroalimentación

// Crear un nodo de ganancia para el eco (opcional, ajustar volumen del eco)
const echoGainNode = audioContext.createGain();
echoGainNode.gain.value = 0.55;

// Conectar la cadena de procesamiento del audio
mainGainNode.connect(audioContext.destination); // Mantener siempre la conexión principal

// Variable para controlar el estado del delay
let isDelayActive = false;

// Función para activar o desactivar el delay
function toggleDelay() {
if (isDelayActive) {
    // Desactivar el delay
    mainGainNode.disconnect();
    mainGainNode.connect(audioContext.destination); // Desconectar el delay
    delayBtn.style.color = "rgb(168, 168, 168)"; // Cambiar color del texto a gris
    isDelayActive = false;
} else {
    // Activar el delay
    mainGainNode.disconnect();
    mainGainNode.connect(delayNode).connect(echoGainNode).connect(audioContext.destination); // Conectar delay y feedback
    delayBtn.style.color = "rgb(223, 35, 35)"; // Cambiar color del texto a rojo
    isDelayActive = true;
}
}

// Conectar el evento del botón
delayBtn.addEventListener("click", toggleDelay);

// Pausar el eco junto con la música
audio.addEventListener("pause", () => {
if (isDelayActive) {
    delayNode.disconnect(); // Desconectar el delay
}
});

// Reanudar el eco al reproducir
audio.addEventListener("play", () => {
if (audioContext.state === "suspended") {
    audioContext.resume(); // Asegurarse de que el contexto de audio esté activo
}

if (isDelayActive) {
    mainGainNode.disconnect(); // Desconectar temporalmente
    mainGainNode.connect(delayNode).connect(echoGainNode).connect(audioContext.destination); // Reconectar delay y echo
}
});



function toggleContainer2() {
  const container = document.getElementById("configCont");
  container.scrollTop = 0;

  if (container.style.display === "none" || container.style.display === "") {
    container.style.display = "block";
    document.getElementById('terminal-ia').style.display = 'none';
    
  } else {
    container.style.display = "none";
    document.getElementById('terminal-ia').style.display = 'block';
    loadQuote();
  }

  checkAudioStatus()
}



const configPlaylist = [
  'assets/Push It to the Limit 16bit.mp3',
  'assets/Mighty Morphin Power Rangers Full Theme 8bit Remix.mp3',
  'assets/Billie Jean (2022) [8 Bit Tribute to Michael Jackson] - 8 Bit Universe.mp3',
  'assets/Blue (Eiffel 65) - Mega Man Style 8-Bit Remix.mp3',
];

let currentConfigAudio = null;
let isAudioEnabled = false;

let shuffledPlaylist = [];
let currentTrackIndex = 0;

// Función para mezclar la playlist
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Reproduce la siguiente canción
function playNextTrack() {
  if (currentTrackIndex >= shuffledPlaylist.length) {
    shuffledPlaylist = shuffleArray(configPlaylist);
    currentTrackIndex = 0;
  }

  const selectedTrack = shuffledPlaylist[currentTrackIndex];
  currentConfigAudio = new Audio(selectedTrack);
  currentConfigAudio.loop = false;
  currentConfigAudio.volume = 0.5;
  currentConfigAudio.play();

  currentConfigAudio.onended = () => {
    currentConfigAudio = null;
    currentTrackIndex++;
    if (isAudioEnabled) playNextTrack();
  };
}

function checkAudioStatus() {
  const container = document.querySelector('.main');
  const container2 = document.getElementById("configCont");
  const container3 = document.getElementById("asciiDiv");

  const containerVisible = getComputedStyle(container).display === "block";
  const container2Visible = getComputedStyle(container2).display === "block";
  const canPlay = containerVisible || container2Visible;

  if (isAudioEnabled && canPlay) {
    if (!currentConfigAudio) {
      shuffledPlaylist = shuffleArray(configPlaylist);
      currentTrackIndex = 0;
      playNextTrack();
    }
  } else {
    if (currentConfigAudio) {
      currentConfigAudio.pause();
      currentConfigAudio.currentTime = 0;
      currentConfigAudio = null;
    }
  }

  // Mostrar asciiDiv SOLO si música activada y main está visible
  if (isAudioEnabled && containerVisible) {
    container3.style.display = "block";
  } else {
    container3.style.display = "none";
  }
}

  
  function toggleAudioByButton() {
    isAudioEnabled = !isAudioEnabled;
  
    
    const btn = document.getElementById("toggleAudioBtn");
    btn.textContent = isAudioEnabled ? "[SND: ON]" : "[SND: OFF]";
  
    // Ejecutar el estado según si debe sonar o no
    checkAudioStatus();
  }
  




  let isEffectActive = false;

  function toggleClass() {
    const div1 = document.querySelector(".fx");
    const div2 = document.querySelector(".fx2");
    const btn = document.getElementById("toggleClassBtn");
    const ascii = document.getElementById("asciiDiv");
  
    if (!isEffectActive) {  // Activado cuando isEffectActive es false
      div2.style.display ="block";     
      div1.style.display ="block";    // Activado
      btn.textContent = "[FX: ON]";
      ascii.style.backgroundColor ='black';
    } else {  // Desactivado cuando isEffectActive es true
      div2.style.display ="none";
      div1.style.display ="none";   // Desactivado
      btn.textContent = "[FX: OFF]";
      ascii.style.backgroundColor ='transparent';
    }
  
    isEffectActive = !isEffectActive; // Cambia el estado después de aplicar el efecto
  }
  

function toggleContainer() {
  var container = document.getElementById("aboutCont");
  container.scrollTop = 0;
  container.style.display = (container.style.display === "none" || container.style.display === "") ? "block" : "none";
  var terminal = document.getElementById('terminal-ia');
  terminal.style.display = (terminal.style.display === "block" || terminal.style.display === "") ? "none" : "block";
  loadQuote();
  }
  





  