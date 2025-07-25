import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../context/GlobalContext";

const FilmList = () => {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const { dispatch, store } = useGlobalReducer();

  useEffect(() => {
    const getFilms = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/films`);
        const data = await res.json();
        setFilms(data.result);
      } catch (err) {
        console.error("Failed to fetch films:", err);
      }
    };

    getFilms();
  }, []);

  return (
    <>
      {films.map((film, i) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.uid === film.uid && fav.type === "films"
        );

        const toggleFavorite = () => {
          dispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
              uid: film.uid,
              name: film.properties.title,
              type: "films",
            },
          });
        };

        return (
          <div
            key={film.uid}
            className="card bg-secondary text-white border-0 shadow-lg flex-shrink-0"
            style={{
              width: "20rem",
              scrollSnapAlign: "start",
            }}
          >
            <div className="card-body text-center">
              <h4 className="card-title mb-3">{film.properties.title}</h4>
              <img
                src={`/img/images/films/${i + 1}.jpg`}
                className="w-75"
                alt={film.properties.title}
              />
              <div className="d-flex justify-content-between">
                <button
                  onClick={() => navigate(`/detail/films/${film.uid}`)}
                  className="btn btn-warning mt-2"
                >
                  Learn More
                </button>
                <button onClick={toggleFavorite} className="btn btn-light mt-2 ms-2">
                  <i
                    className={`fa-${isFavorite ? "solid" : "regular"} fa-heart`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FilmList;
