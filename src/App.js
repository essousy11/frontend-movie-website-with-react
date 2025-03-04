import './App.css';
//import api from './api/axiosConfig';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Hero from './components/hero/Hero';
import Header from './components/header/Header'
import Trailer from './components/trailer/Trailer'
import Reviews from './components/reviews/Reviews'
function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () =>{

    try{
      const response = await axios.get("http://localhost:8080/api/v1/movies");

      console.log(response.data);

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
  
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {
      console.error("Erreur lors de la récupération des données du film :", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message à l'utilisateur ou effectuez d'autres actions nécessaires.
    }
  };

  useEffect(() =>{
    getMovies();
  },[])
  
  return (
    <div className="App">
     <Header/>
     <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home movies = {movies} />}></Route>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
        <Route path="/Reviews/:movieId" element={<Reviews getMovieData = {getMovieData} movie ={movie} reviews = {reviews} setReviews = {setReviews}/>}></Route>
        </Route>
     </Routes>
    </div>
  );
}

export default App;
