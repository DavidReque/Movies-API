let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener('click', () => {

    if (pagina < 1000 ) {
        pagina += 1;
        getMovies();
    }

})

btnAnterior.addEventListener('click', () => {

    if (pagina > 1 ) {
        pagina -= 1;
        getMovies();
    }

})

const getMovies = async () => {

    try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1e730d08798bb7ec0c4b11bfb566838c&language=es-MX&page=${pagina}`)

    //Si la respuesta es correcta
    if (res.status === 200) {
        const data = await res.json();

        let peliculas = '';
        data.results.forEach(pelicula => {
            peliculas += `
            <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
            </div>
            `
        });

        document.getElementById('contenedor').innerHTML = peliculas;

    } else if (res.status === 401) {
        console.error('Llave incorrecta')
    } else if (res.status === 404) {
        console.error('La pelicula que buscas no existe')
    } else {
        console.error('Hubo un error')
    }

} catch (error) {
        console.error(error)
    }
}

getMovies();