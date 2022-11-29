import React, { useState } from "react";
import "../App.css";


function StarWars(){



  // ---------------------------- Constants ----------------------
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const [home, setHome] = useState("");
  const [films, setFilms] = useState([])
  const charList = [];

  // ---------------------------- Constants ----------------------





  // ---------------------------- Helper Function ---------------

    function setList(char){
        charList.push(char.name)
        console.log(charList)
    }


  // ---------------------------- Helper Function ---------------








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
      <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getCharacter();
            }}
          >
            <input
              type="number"
              min="1"
              max="83"
              placeholder="Write a Number 1-83"
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Character List:</h2>
          <h3>{charList}</h3>
          <button onClick={(e) => setList(data)}>Save Character</button>
        </div>
      </div>
      <div>
        <div>
          <h1>Character Stats:</h1>
          <h2>Name: {data.name}</h2>
          <h2>Height: {data.height}</h2>
          <h2>Mass: {data.mass}</h2>
          <h2>Eye Color: {data.eye_color}</h2>
        </div>
        <div>
          <h1>Character Homeworld:</h1>
          <h2>Name: {home.name}</h2>
          <h2>Terrain: {home.terrain}</h2>
          <h2>Population: {home.population}</h2>
        </div>
      </div>
      <div>
        <h1>Films Starring:</h1>
        { films.length > 0 &&
            films.map(film => (
                <h2>{film.title}</h2>
            ))
        }
        <button onClick={(e) => console.log(films)}>Click Me</button>
      </div>
    </div>
  );
}

export default StarWars