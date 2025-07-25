import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../context/GlobalContext";

const starshipList = () => {
  const navigate = useNavigate();
  const [starships, setstarships] = useState([]);
  const { dispatch, store } = useGlobalReducer();

  useEffect(() => {
    const getstarships = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/starships/`);
        const data = await res.json();
        setstarships(data.results);
        console.log(data.results);
      } catch (err) {
        console.error("Failed to fetch starships:", err);
      }
    };

    getstarships();
  }, []);

  return (
    <>
      {starships.map((entry, i) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.uid === entry.uid && fav.type === "starships"
        );

        const toggleFavorite = () => {
          dispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
              uid: entry.uid,
              name: entry.name,
              type: "starships",
            },
          });
        };

        return (
          <div
            key={i}
            className="card bg-secondary text-white border-0 shadow-lg flex-shrink-0"
            style={{
              width: "22rem",
              scrollSnapAlign: "start",
            }}
          >
            <div className="card-body text-center">
              <h4 className="card-title">{entry.name}</h4>
              <p className="card-text">UID: {entry.uid}</p>
              <img
                src={`/img/images/starships/${entry.uid}.jpg`} style={{width: "100%", height: "60%"}}
                className="w-100"
              />
              <div className="d-flex justify-content-between">
                <a
                  onClick={() => navigate(`/detail/starships/${entry.uid}`)}
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
  );
};

export default starshipList;
