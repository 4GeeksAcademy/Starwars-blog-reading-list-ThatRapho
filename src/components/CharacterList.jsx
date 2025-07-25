import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../context/GlobalContext";

const CharacterList = () => {
    let navigate = useNavigate();
    const [characters, setCharacters] = useState([])
    const { dispatch, store } = useGlobalReducer();

      useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/people/`);
        const data = await res.json();
        setCharacters(data.results);
        console.log(data.results);
      } catch (err) {
        console.error("Failed to fetch characters:", err);
      }
    };

    getCharacters();
  }, []);

    return (
        <>
          {characters.map((entry, i) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.uid === entry.uid && fav.type === "people"
        );

        const toggleFavorite = () => {
          dispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
              uid: entry.uid,
              name: entry.name,
              type: "people",
            },
          });
        };

        return (
          <div
            key={i}
            className="card bg-secondary text-white border-0 shadow-lg flex-shrink-0"
            style={{
              width: "18rem",
              scrollSnapAlign: "start",
            }}
          >
            <div className="card-body text-center">
              <h4 className="card-title">{entry.name}</h4>
              <p className="card-text">UID: {entry.uid}</p>
              <img
                src={`/img/images/people/${entry.uid}.jpg`}
                className="w-100"
              />
              <div className="d-flex justify-content-between">
                <a
                  onClick={() => navigate(`/detail/people/${entry.uid}`)}
                  className="btn btn-warning mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
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
    )
}

export default CharacterList;