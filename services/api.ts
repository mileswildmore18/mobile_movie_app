// import API Key to get movies
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

// fetch movies from a query
export const fetchMovies = async ({query}: { query: string }) => {
    // get movie data based on user's searched movie or based on the query
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
//     get movie search results
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });
    // check if response fails
    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }
    const data = await response.json();
    // store data on movie results
    return data.results;
}
// /discover/movie

// fetch movie details
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });
        // check if response to fetching the movie details fails
        if(!response.ok) throw new Error('Failed to fetch movie details');

        // gather movie detail data if response is successful and store it in the database
        const data = await response.json();

        // return movie details to user
        return data;

        // give error message if movie details fail to fetch
    } catch (error){
        console.log(error);
        throw error;
    }
}