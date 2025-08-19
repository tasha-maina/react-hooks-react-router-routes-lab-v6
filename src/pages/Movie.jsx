import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Movie not found`);
        return res.json();
      })
      .then(setMovie)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!movie) return <h2>Loading...</h2>;

  return (
    <>
      <header><NavBar /></header>
      <main>
        <h1>{movie.title}</h1>
        <p>⏱ Time: {movie.time} minutes</p>
        <h3>Genres</h3>
        <ul>
          {movie.genres.map(genre => <li key={genre}>{genre}</li>)}
        </ul>
      </main>
    </>
  );
}

export default Movie;
