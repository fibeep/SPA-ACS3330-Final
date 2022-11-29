import React, { useState } from "react";
import "../App.css";


function StarWars(){

  // ---------------------------- Constants
  const [value, setValue] = useState("");
const [data, setData] = useState("");
  // ---------------------------- Constants

  // ----------------------- API CALL ---------------
  async function getCharacter() {
    const path = `https://swapi.dev/api/people/${value}/`;
    const res = await fetch(path)
    const json = await res.json()
    console.log(value)
    console.log(json)
    setData(json)
  }

  // ----------------------- API CALL ---------------

  return (
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
      <h1>Character Stats:</h1>
      <h2>{data.name}</h2>
      <h2>{data.height}</h2>
      <h2>{data.mass}</h2>
      <h2>{data.eye_color}</h2>
    </div>
  );
}

export default StarWars