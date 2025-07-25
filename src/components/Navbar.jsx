import { Link } from "react-router-dom";
import { useGlobalReducer } from '../context/GlobalContext'
import * as actionTypes from "../context/actionTypes.js";

export const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-secondary">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              src="/img/Star-Wars-Logo-Transparent.png"
              style={{ width: "10%" }}
              alt="Star Wars Logo"
            />
          </span>
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="favoritesDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites {store.favorites.length > 0 && `(${store.favorites.length})`}
          </button>

          <ul
            className="dropdown-menu"
            aria-labelledby="favoritesDropdown"
            style={{ minWidth: "15rem" }}
          >
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites yet.</li>
            ) : (
              store.favorites.map((fav, i) => {

                return (
                  <li key={`${fav.uid}-${i}`}>
                    <Link
                      className="dropdown-item"
                      to={`/detail/${fav.type}/${fav.uid}`}
                    >
                      {fav.name}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
