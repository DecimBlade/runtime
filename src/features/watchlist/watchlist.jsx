import React, {useContext} from 'react'
import { GlobalContext } from "../../pages/auth/contexts/GlobalState";
import MovieCard from './MovieCard'
//import { useAuth } from "./auth/contexts/AuthContext";

function Watchlist(){
const {removeMovieFromWatchlist, watchlist} = useContext(GlobalContext);

  return(
    <div>
      <h1>Watchlist</h1>
      {watchlist.length > 0 ? (
      <div class = "movie-list"> 
            {watchlist.map((movie) => (
              <div class = "movie-item">
              <MovieCard movie={movie} />
              <button onClick={() => removeMovieFromWatchlist(movie.omdbID)}>remove from Watchlist</button>
            </div>
            ))}         
      </div>
      ) : (
        <h2>Your watchlist is empty. Go find some movies!</h2>
      )}
    </div>
  )
}

export default Watchlist
