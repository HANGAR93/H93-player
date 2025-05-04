document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('editPlaylistContainer');

    container.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('infoLastFMBtn')) {
            const trackDiv = event.target.closest('.edit-track');
            if (!trackDiv) return;

            let artist = trackDiv.querySelector('.edit-artist')?.value?.trim() || '';
            let title = trackDiv.querySelector('.edit-title')?.value?.trim() || '';

            artist = artist.replace(/^#\d+\s*/, '');
            title = title.replace(/^"(.*)"$/, '$1');

            if (!artist || !title) {
                alert('Please enter both Artist and Title.');
                return;
            }

            hideOtherInfo(trackDiv);

            const lastfmInfo = trackDiv.querySelector('.lastfm-info');
            if (lastfmInfo && lastfmInfo.style.display === 'block') {
                lastfmInfo.style.display = 'none';
            } else {
                consultarInfoLastFM(title, artist, trackDiv);
            }
        }
    });

    async function consultarInfoLastFM(titulo, artista, trackDiv) {
        const apiKey = 'd15681c47993a3ae3f57634f31e10dfa';
        const baseUrl = 'https://ws.audioscrobbler.com/2.0/';
        const trackUrl = `${baseUrl}?method=track.getInfo&track=${encodeURIComponent(titulo)}&artist=${encodeURIComponent(artista)}&api_key=${apiKey}&format=json`;
        const artistUrl = `${baseUrl}?method=artist.getInfo&artist=${encodeURIComponent(artista)}&api_key=${apiKey}&format=json`;
        const similarTracksUrl = `${baseUrl}?method=track.getSimilar&track=${encodeURIComponent(titulo)}&artist=${encodeURIComponent(artista)}&api_key=${apiKey}&format=json`;

        try {
            const [trackResponse, artistResponse, similarTracksResponse] = await Promise.all([
                fetch(trackUrl),
                fetch(artistUrl),
                fetch(similarTracksUrl)
            ]);

            const trackData = await trackResponse.json();
            const artistData = await artistResponse.json();
            const similarTracksData = await similarTracksResponse.json();

            const track = trackData?.track;
            const artist = artistData?.artist;
            const similarTracks = similarTracksData?.similartracks?.track || [];

            if (track) {
                mostrarInfoTrackLastFM(track, artist, similarTracks);
            } else {
                mostrarInfoTrackLastFM({ notFound: true });
            }
        } catch (error) {
            console.error('Error fetching Last.fm data:', error);
            alert('An error occurred while querying Last.fm.');
        }
    }

    function mostrarInfoTrackLastFM(track = null, artist = null, similarTracks = []) {
        const contenedor = document.querySelector('.lastfm-info');
        const isTrackNull = track === null;
        const isTrackNotFound = track?.notFound === true;

        const trackName = isTrackNull
            ? 'NOT SELECTED'
            : isTrackNotFound
            ? 'not found'
            : track?.name || 'not found';

        const artistName = isTrackNull
            ? 'NOT SELECTED'
            : isTrackNotFound
            ? 'not found'
            : track?.artist?.name || 'not found';

        const album = isTrackNull
            ? 'NOT SELECTED'
            : isTrackNotFound
            ? 'not found'
            : track?.album?.title || 'not found';

        const listeners = isTrackNull
            ? 'NOT SELECTED'
            : isTrackNotFound
            ? 'not found'
            : track?.listeners || 'not found';

        const resumenBruto = isTrackNull
            ? 'NOT SELECTED'
            : isTrackNotFound
            ? 'not found'
            : track?.wiki?.summary || 'not found';

        const resumen = limpiarHTML(resumenBruto)
            .replace(/Read more( on| at)? Last\.?fm.*$/i, '')
            .trim();

        const tags = isTrackNull
            ? 'NOT SELECTED'
            : isTrackNotFound
            ? 'not found'
            : (track?.toptags?.tag?.length
                ? track.toptags.tag.map(t => t.name).slice(0, 5).join(', ')
                : 'not found');

                const textoLargoNoSeleccionado = `
                ****** No artist has been selected yet. This space is reserved for an extensive artist biography. To view this information, please enter an artist and a track title
                above, and then click the info button. ******
                `;
                
                const textoLargoNoEncontrado = `
                ****** We could not find the artist. This may happen if the artist's name was misspelled, the track is too rare,
                or the database simply does not have information available. ******
                `;
                
                const artistBio = artist
                    ? limpiarHTML(artist.bio?.summary || textoLargoNoEncontrado)
                        .replace(/Read more( on| at)? Last\.?fm.*$/i, '')
                        .trim()
                    : (isTrackNull ? textoLargoNoSeleccionado : textoLargoNoEncontrado);
                
            
            const similarSongs = similarTracks.length
                ? similarTracks.map(t => t.name).slice(0, 5).join(', ')
                : (isTrackNull
                    ? 'No track selected '
                    : 'No similar songs');
            
        const info = `
          <div class="retro-info">
            <div class="clase-1"><span>93</span><span id="name-tltx">HANGAR</span><span>93</span><span id="fechaHora"></span></div>
            <div class="clase-2">
                <div class="clase-2a">
               WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

WWWWWWWWW+....-+=@WWWWWWWWWWWWWWWWWWWWW@=+--...:@WWWWWWWWWW

WWWWWWW@............+#*:-........:*#*............#WWWWWWWWW

WWWWWWW*...............:*=#@@@@#*:-..............+WWW@@#*++

WWWWWWW+..........-=WWWWWWWWWWWWWWWWW#:.................=WW

WWWWWWW*........*WWWWWWWWWWWWWWWWWWWW+.....--::+++-..+WWWWW

WWWWWWW@......=WWWWWWWWWWWWWWWWWWWWWWW#..-+++++-..:@WWWWWWW

WWWWWWWW+...-WWWWWWWWWWWWWWWWWWWWWWWWWWW+..++++..+WWWWWWWWW

WWWWWWWWW-.:WWWWWWWWWWWWWWWWWWWWWWWWWWWWW*..-+++-..#WWWWWWW

WWWWWWWWW.-WWWWWWWWWWWWWWWWWWWWWWWWWWW@:..-+++++++..:WWWWWW

WWWWWWWW*.=WWWWWWWWWWWWWWWWWWWWWWWWW+...-:--.........:@WWWW

WWWWWWWW+.@WWWWWWWWWWWWWWWWWWWWWW=-....--+*=#@W--WWWWWWWWWW

WWWWWWWW:.@WWWW:#WWWWWWWWWWW=@W@@WWWWWWWW*=WWWW:-WWWWWWWWWW

WWWWWW#+-.#WWWW=...-+***+-.....-+*===+-...WWWWW--*@WWWWWWWW

WWW+......:WWWWW-........................=WWWW=......-#WWWW

WWWW@@@@W+.=WWWW@.......................+WWWW@.:@#==#@WWWWW

WWWWWWW@+...=WWWW#.....................:WWWW@....:#WWWWWWWW

WWWWW+.......+WWWW@-.*.............+..*WWWW=.........+@WWWW

WWW:..-+=WWW#..=WWWWWW=...........+W@WWWW#-.=WWWWW@####WWWW

WWWWWWWWWWWWWW*..:@WWWW*.........:WWWWW*..+WWWWWWWWWWWWWWWW

WWWWWWWWWWWWWWWW#:..-*@WWWW@#@@WWW@=:..-#WWWWWWWWWWWWWWWWWW

WWWWWWWWWWWWWWWWWWW@*-.............-*@WWWWWWWWWWWWWWWWWWWWW


                <span>POWERED BY CSS && JS ONLY</span>
                </div>
                <div class="clase-2b">
                        <span> --- ARTIST BIO ---  </span>          <br>
                         <span class="span-bio">       ${artistBio}        </span>
                   <span>----------------------------</span><br>
                </div>
            </div>
            <div class="clase-3">ENJOY THE BEST EUROBEAT COMPILATION  HERE ! <span>...GO</span></div>
            <div class="clase-4"></div>
            <div class="clase-5"><div><span class="sa-tltx">&#183;</span> Track.......</div><div class="real_info"><span>${rellenarConPuntos(trackName)}</span></div></div>
            <div class="clase-5"><div><span class="sa-tltx">&#183;</span> Artist......</div><div class="real_info"><span>${rellenarConPuntos(artistName)}</span></div></div>
            <div class="clase-4"></div>
            <div class="clase-5"><div><span class="sa-tltx">&#183;</span> Album.......</div><div class="real_info"><span>${rellenarConPuntos(album)}</span></div></div>
            <div class="clase-5"><div><span class="sa-tltx">&#183;</span> Listeners...</div><div class="real_info"><span>${rellenarConPuntos(listeners)}</span></div></div>
            <div class="clase-6">TAGS <span>${tags}</span> </div>
            <div class="clase-3"><span>I WANT YOUR FEEDBACK, SEND IT TO ME  ........FEED</span></div>
            <div class="clase-7">DESCRIPTION <span>${resumen}</span></div>
            <div class="clase-8">SIMILARS <span>${similarSongs}</span></div>
            <div class="clase-9"><span id="sponsor1">Last.fm</span><span id="sponsor2">Gecko</span><span id="sponsor3">OpenAI</span><span id="sponsor4">Formspree</span></div>
          </div>
        `;

        contenedor.innerHTML = info;
        actualizarFechaHora();
    }

    function limpiarHTML(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    mostrarInfoTrackLastFM();

    function hideOtherInfo(trackDiv) {
        const allTrackDivs = document.querySelectorAll('.edit-track');
        allTrackDivs.forEach(div => {
            if (div !== trackDiv) {
                const lastfmInfo = div.querySelector('.lastfm-info');
                if (lastfmInfo) {
                    lastfmInfo.style.display = 'none';
                }
            }
        });
    }

    function actualizarFechaHora() {
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString();
        const hora = ahora.toLocaleTimeString();
        const fechaHoraFormateada = `${fecha}   ${hora}`;

        const elementosFecha = document.querySelectorAll('#fechaHora');
        elementosFecha.forEach(elem => {
            elem.textContent = fechaHoraFormateada;
        });
    }

    setInterval(actualizarFechaHora, 1000);

    function rellenarConPuntos(texto) {
        const maxLength = 33;
        const textoLimpio = texto.trim();
        const espaciosRestantes = Math.max(0, maxLength - textoLimpio.length);
        const puntos = '.'.repeat(espaciosRestantes);

        return `
            <span class="dots">${puntos}</span>
            <span class="dynamic-text">${textoLimpio}</span>
        `;
    }
});
