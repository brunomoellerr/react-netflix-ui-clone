import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import netflix_loading from './assets/netflix_loading.gif';


const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomNum = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosenMovie = originals[0].items.results[randomNum];
      let chosenInfo = await tmdb.getMovieInfo(chosenMovie.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }
      else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />
      {
        featuredData &&
          <FeaturedMovie item={featuredData} />
      }

        <section className="lists">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
        </section>

        <footer>
          Developed by @brunomoellerr <br />
          Rights reserved to Netflix <br/>
          Data pulled from themoviedb.org
        </footer>
        {movieList.length <= 0 && 
          <div className="loading">
            <img src={netflix_loading} alt="Loading" />
          </div>
        }
    </div>
  );
};

export default App;