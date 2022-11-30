import React, { useState } from "react";
import "../App.css";


function StarWars(){



  // ---------------------------- Constants ----------------------
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const [home, setHome] = useState("");
  const [films, setFilms] = useState([])
  const [list, setList] = useState([])

  // ---------------------------- Constants ----------------------


  // ----------------------- API CALL ---------------
  async function getCharacter() {
    // General Data--------
    const path = `https://swapi.dev/api/people/${value}/`;
    const res = await fetch(path);
    const json = await res.json();

    setData(json);
    // General Data-------

    // Home Planet Data----
    const homepath = await json.homeworld
    const homeRes = await fetch(homepath)
    const homeJson = await homeRes.json()

    setHome(homeJson)
    // Home Planet Data----

    // Films Data-------------

    const filmsRes = await Promise.all(json.films.map((film) => fetch(film)));
    const filmsJSON = await Promise.all(filmsRes.map(res => res.json()))
    
    setFilms(filmsJSON)

    // Films Data-------------
  }

  // ----------------------- API CALL ---------------



  return (
    <div>
      <div class="info">
        <div class="card">
          <div class="header">
            <h1>Character Stats:</h1>
          </div>

          <h2>Name: {data.name}</h2>
          <h2>Height: {data.height}</h2>
          <h2>Mass: {data.mass}</h2>
          <h2>Eye Color: {data.eye_color}</h2>
        </div>
        <div class="card">
          <div class="header">
            <h1>Character Homeworld:</h1>
          </div>

          <h2>Name: {home.name}</h2>
          <h2>Terrain: {home.terrain}</h2>
          <h2>Population: {home.population}</h2>
        </div>
        <div class="card">
          <div class="header">
            <h1>Films Starring:</h1>
          </div>
          {films.length > 0 && films.map((film) => <h2>{film.title}</h2>)}
        </div>
      </div>
      <div class="info">
        <div></div>
        <div class="card2">
          <h2> Search for Your Character by Entering a Number Below</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getCharacter();
            }}
          >
            <input
              class="input-field"
              type="number"
              min="1"
              max="83"
              placeholder="1"
              onChange={(e) => setValue(e.target.value)}
            />
            <br></br>
            <button class="action-button" type="submit">
              Search
            </button>
          </form>
          <button
            class="action-button"
            onClick={(e) => {
              setList([...list, data]);
            }}
          >
            Add To Favorites
          </button>
        </div>

        <div class="card2">
          <h2>Favorite Characters:</h2>
          {list.length > 0 && list.map((obj) => <h2>{obj.name}</h2>)}
        </div>
      </div>
    </div>
  );
}

export default StarWars