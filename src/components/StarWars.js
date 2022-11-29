import React, { useState } from "react";
import "../App.css";


function StarWars(){
  // ---------------------------- Constants ----------------------
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const [home, setHome] = useState("")
  const charList = [];

  // ---------------------------- Constants ----------------------

  // ---------------------------- Helper Function ---------------

    function setList(char){
        charList.push(char)
    }


  // ---------------------------- Helper Function ---------------

  // ----------------------- API CALL ---------------
  async function getCharacter() {
    const path = `https://swapi.dev/api/people/${value}/`;
    const res = await fetch(path);
    const json = await res.json();

    setData(json);

    const homepath = await json.homeworld
    const homeRes = await fetch(homepath)
    const homeJson = await homeRes.json()

    console.log(homepath)

    setHome(homeJson)
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
          <h2>Character List</h2>
          <h3>{charList}</h3>

      </div>
      </div>
      <div>
        <h1>Character Stats:</h1>
        <h2>Name: {data.name}</h2>
        <h2>Height: {data.height}</h2>
        <h2>Mass: {data.mass}</h2>
        <h2>Eye Color: {data.eye_color}</h2>

        <h1>Character Homeworld:</h1>
        <h2>Name: {home.name}</h2>
        <h2>Terrain: {home.terrain}</h2>
        <h2>Population: {home.population}</h2>


      </div>
    </div>
  );
}

export default StarWars