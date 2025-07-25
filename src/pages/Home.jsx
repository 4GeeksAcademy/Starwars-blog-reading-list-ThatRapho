import { useState, useEffect } from "react";
import PlanetList from "../components/PlanetList.jsx";
import CharacterList from "../components/CharacterList.jsx";
import FilmList from "../components/FilmList.jsx";
import SpeciesList from "../components/SpeciesList.jsx";
import StarshipList from "../components/StarshipList.jsx";
import VehicleList from "../components/VehicleList.jsx";
import { useGlobalReducer } from '../context/GlobalContext';



export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="min-vh-100 bg-dark text-light py-5 px-3">
      <h1 className="display-4 text-center text-warning mb-4 fw-bold">
        Star Wars Databank
      </h1>

      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6 d-flex gap-2">
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              placeholder="Search characters, planets, ships..."
            />
            <button className="btn btn-warning">
              Search
            </button>
              {/* la barra de búsqueda solo es estética, sorry */}
          </div>
        </div>
      </div>

<div className="container">
  <h1 className="text-warning mb-4">Films</h1>
  <div
    className="d-flex overflow-auto gap-3 pb-4 custom-scrollbar mb-5"
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}
  >
  <FilmList></FilmList>
  </div>
</div>

<div className="container">
  <h1 className="text-warning mb-4">Planets</h1>
  <div
    className="d-flex overflow-auto gap-3 pb-4 custom-scrollbar mb-5"
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}
  >
  <PlanetList></PlanetList>
  </div>
</div>

<div className="container">
  <h1 className="text-warning mb-4">Characters</h1>
  <div
    className="d-flex overflow-auto gap-3 pb-4 custom-scrollbar mb-5"
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}
  >
  <CharacterList></CharacterList>
  </div>
</div>

<div className="container">
  <h1 className="text-warning mb-4">Species</h1>
  <div
    className="d-flex overflow-auto gap-3 pb-4 custom-scrollbar mb-5"
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}
  >
  <SpeciesList></SpeciesList>
  </div>
</div>

<div className="container">
  <h1 className="text-warning mb-4">Starships</h1>
  <div
    className="d-flex overflow-auto gap-3 pb-4 custom-scrollbar mb-5"
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}
  >
  <StarshipList></StarshipList>
  </div>
</div>

<div className="container">
  <h1 className="text-warning mb-4">Vehicle</h1>
  <div
    className="d-flex overflow-auto gap-3 pb-4 custom-scrollbar mb-5"
    style={{
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}
  >
  <VehicleList></VehicleList>
  </div>
</div>

    </div>
	);
}; 