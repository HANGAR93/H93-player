// BD.js

// Definición de algunas playlists por defecto
const defaultPlaylists = [
  {
    name: "Default Playlist",
    tracks: [
      { title: '"Chemical Love"', artist: "#1 Kevin & Cherry", src: "assets/ChemicalLove.mp3" },
      { title: '"Running in the 90s"', artist: "#2 Max Coveri", src: "assets/runninginthe90s.mp3" },
      { title: '"No One Sleep in Tokyo"', artist: "#3 Edo Boys", src: "assets/noonesleepintokyo.flac" },
      { title: '"Night of Fire"', artist: "#4 Niko", src: "assets/nightoffire.flac" },
      { title: '"One Night in Arabia"', artist: "#5 Go Go Girls", src: "assets/onenightinarabia.flac" },
      { title: '"Deja Vu"', artist: "#6 Dave Rodgers", src: "assets/dejavu.mp3" },
      { title: '"Speed Lover"', artist: "#7 Speedman", src: "assets/speedlover.flac" },
      { title: '"Crazy for Love"', artist: "#8 Dusty", src: "assets/crazyforlove.flac" },
      { title: '"GAS GAS GAS"', artist: "#9 Manuel", src: "assets/gasgasgas.flac" },
      { title: '"Adrenaline"', artist: "#10 Ace", src: "assets/Ace - Adrenaline.mp3" },
      { title: '"The Top"', artist: "#11 Ken Blast", src: "assets/Ken Blast - The Top.mp3" },
      { title: '"Space Boy"', artist: "#12 Dave Rodgers", src: "assets/spaceboy.mp3" },
      { title: '"Be My Babe"', artist: "#13 Jilly", src: "assets/03. Jilly - Be My Babe.mp3" },
      { title: '"Remember Me"', artist: "#14 Leslie Parrish", src: "assets/04. Leslie Parrish - Remember Me.mp3" },
      { title: '"Don´t Stop the Music"', artist: "#15 Lou Grant", src: "assets/06. Lou Grant - Don't Stop the Music.mp3" },
      { title: '"Heartbeat"', artist: "#16 Nathalie", src: "assets/10. Nathalie - Heartbeat.mp3" },
      { title: '"Save Me"', artist: "#17 Leslie Parrish", src: "assets/13. Leslie Parrish - Save Me.mp3" },
      { title: '"Don´t Stand So Close"', artist: "#18 Dr Love", src: "assets/07. Dr. Love - Don't Stand So Close.mp3" },
      { title: '"Love & Money"', artist: "#19 Za-Za", src: "assets/06. Za-Za - Love & Money.mp3" },
      { title: '"Killing My Love"', artist: "#20 Leslie Parrish", src: "assets/01. Leslie Parrish - Killing My Love.mp3" },
      { title: '"Dancing"', artist: "#21 Vicky Vale", src: "assets/05. Vicky Vale - Dancing.mp3" },
      { title: '"Lost into the Night"', artist: "#22 Elisa", src: "assets/12. Elisa - Lost into the Night.mp3" },
      { title: '"Stay"', artist: "#23 Victoria", src: "assets/20. Victoria - Stay.mp3" },
      { title: '"Boom Boom Japan"', artist: "#24 Dave Rodgers", src: "assets/04. Dave Rodgers - Boom Boom Japan.mp3" },
      { title: '"Black Out"', artist: "#25 Overload", src: "assets/05. Overload - Black Out.mp3" },
      { title: '"Beat of the Rising Sun"', artist: "#26 Dave Rodgers", src: "assets/07. Dave Rodgers - Beat of the Rising Sun.mp3" },
      { title: '"Gimme The Night"', artist: "#27 Dave McLoud", src: "assets/Dave McLoud - Gimme The Night.mp3" },
      { title: '"Forever Young"', artist: "#28 Symbol", src: "assets/Symbol - Forever Young.mp3" },
      { title: '"I Wanna Be The Night"', artist: "#29 Chris T.", src: "assets/Chris T. - I Wanna Be The Night.mp3" },
      { title: '"Rider Of The Sky"', artist: "#30 Ace", src: "assets/Ace - Rider Of The Sky.mp3" },
      { title: '"Golden Age"', artist: "#31 Max Coveri", src: "assets/Max Coveri - Golden Age.mp3" },
      { title: '"You´re Gonna Be"', artist: "#32 Starlet", src: "assets/Starlet - You're Gonna Be.mp3" },
      { title: '"Emotional Fire"', artist: "#33 Denise", src: "assets/Denise - Emotional Fire (Extended Mix).mp3" },
      { title: '"Express Love"', artist: "#34 Mega NRG Man", src: "assets/Mega NRG Man - Express Love.mp3" },
      { title: '"Power"', artist: "#35 Go 2", src: "assets/Go 2 - Power.mp3" },
      { title: '"Futureland"', artist: "#36 Ace", src: "assets/Ace - Futureland.mp3" },
      { title: '"Looka Bomba"', artist: "#37 Go 2", src: "assets/Go 2 - Looka Bomba.mp3" },
      { title: '"Rockin Hardcore"', artist: "#38 Fastway", src: "assets/Fastway - Rockin' Hardcore.mp3" },
      { title: '"Midnight Love"', artist: "#39 Neo", src: "assets/Neo - Midnight Love.mp3" },
      { title: '"Mad Desire"', artist: "#40 Stephy Martini", src: "assets/Stephy Martini - Mad Desire (Extended Mix).mp3" },
      { title: '"Disconnected"', artist: "#41 Hotblade", src: "assets/Hotblade - Disconnected.mp3" },
      { title: '"When The Sun Goes Down"', artist: "#42 Ken Blast", src: "assets/Ken Blast - When The Sun Goes Down.mp3" }
    ]
  }
];

const dbName = 'musicDB';
const dbVersion = 9;

function openMusicDB(callback) {
  const request = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    console.log('onupgradeneeded ejecutado', event);

    if (!db.objectStoreNames.contains('tracklist')) {
      const tracklistStore = db.createObjectStore('tracklist', { keyPath: 'id', autoIncrement: true });
      tracklistStore.createIndex('title', 'title', { unique: false });
      defaultPlaylists[0].tracks.forEach(song => {
        tracklistStore.add(song);
      });
      console.log('ObjectStore "tracklist" creado');
    }

    if (!db.objectStoreNames.contains('playlists')) {
      const playlistsStore = db.createObjectStore('playlists', { keyPath: 'id', autoIncrement: true });
      playlistsStore.createIndex('name', 'name', { unique: false });
      playlistsStore.createIndex('tracks', 'tracks', { unique: false });
      console.log('ObjectStore "playlists" creado');
    }

    if (!db.objectStoreNames.contains('cssCache')) {
      db.createObjectStore('cssCache', { keyPath: 'id' });
      console.log('ObjectStore "cssCache" creado');
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('Base de datos abierta con éxito', db);
    console.log('ObjectStores disponibles:', db.objectStoreNames);

    insertDefaultPlaylists(db);

    if (callback && typeof callback === 'function') {
      callback(db);
    }
  };

  request.onerror = (event) => {
    console.error('Error al abrir la base de datos', event.target.error);
  };
}


function addPlaylist(store, playlist) {
  const addRequest = store.add(playlist);
  addRequest.onsuccess = () => {
    console.log(`✅ Playlist añadida: ${playlist.name}`);
  };
  addRequest.onerror = (event) => {
    console.error(`❌ Error al añadir playlist "${playlist.name}":`, event.target.error);
  };
}

function insertDefaultPlaylists(db) {
  const transaction = db.transaction('playlists', 'readwrite');
  const store = transaction.objectStore('playlists');
  const nameIndex = store.index('name');

  defaultPlaylists.forEach((playlist) => {
    const checkRequest = nameIndex.get(playlist.name);
    checkRequest.onsuccess = () => {
      const existing = checkRequest.result;
      if (!existing) {
        console.log(`🎶 Playlist predeterminada no encontrada, añadiendo: ${playlist.name}`);
        addPlaylist(store, playlist);
      }
    };
    checkRequest.onerror = (event) => {
      console.error(`❌ Error al verificar playlist "${playlist.name}": ${event.target.error}`);
    };
  });

  transaction.oncomplete = () => {
    console.log('🎶 Se insertaron todas las playlists predeterminadas (si no existían).');
  };

  transaction.onerror = (event) => {
    console.error('❌ Error en la transacción:', event.target.error);
  };
}

function loadAllPlaylists(db) {
  const transaction = db.transaction('playlists', 'readonly');
  const store = transaction.objectStore('playlists');
  const request = store.getAll();

  request.onsuccess = () => {
    const playlists = request.result;
    console.log('🎧 Todas las playlists recuperadas:', playlists);

    const playlistContainer = document.getElementById('playlistContainer');
    if (!playlistContainer) {
      console.warn('⚠️ No se encontró el contenedor de playlists (#playlistContainer).');
      return;
    }

    // Limpiar contenido anterior
    playlistContainer.innerHTML = '';

    playlists.forEach(playlist => {
      const playlistElement = document.createElement('div');
      playlistElement.textContent = `🎵 Playlist: ${playlist.name}`;
      playlistContainer.appendChild(playlistElement);
    });
  };

  request.onerror = () => {
    console.error('❌ Error al recuperar playlists');
  };
}
