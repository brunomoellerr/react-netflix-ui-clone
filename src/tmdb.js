const API_KEY = '<TMDB API KEY>';
const API_BASE = 'https://api.themoviedb.org/3';


const basicFetch = async (endpoint) => {
  const request = await fetch(`${API_BASE}${endpoint}&api_key=${API_KEY}`);
  const json = await request.json();
  return json;
}


const tmdb = {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Netflix Originals',
        items: await basicFetch(`/discover/tv?with_network=213`)
      },
      {
        slug: 'trending',
        title: 'Recommended for you',
        items: await basicFetch(`/trending/all/week?`)
      },
      {
        slug: 'toprated',
        title: 'Top Rated',
        items: await basicFetch(`/movie/top_rated?`)
      },
      {
        slug: 'action',
        title: 'Action',
        items: await basicFetch(`/discover/movie?with_genres=28`)
      },
      {
        slug: 'comedy',
        title: 'Comedy',
        items: await basicFetch(`/discover/movie?with_genres=35`)
      },
      {
        slug: 'horror',
        title: 'Horror',
        items: await basicFetch(`/discover/movie?with_genres=27`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749`)
      },
      {
        slug: 'documentary',
        title: 'Documentary',
        items: await basicFetch(`/discover/movie?with_genres=99`)
      },
    ]
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?`)
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?`)
          break;
        default:
          info = null;
      }
    }
    return info;
  }
}



export default tmdb;