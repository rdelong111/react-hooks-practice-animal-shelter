import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentFilt, changeFilt] = useState('all');

  useEffect(() => {
    fetch(`http://localhost:3001/pets${filter === 'all' ? '' : `?type=${filter}`}`)
      .then((r) => r.json())
      .then((thePets) => setPets(thePets));
  }, [filter]);

  function handleAdoptPet(ID) {
    fetch(`http://localhost:3001/pets/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isAdopted: true})
    })
      .then((r) => r.json())
      .then((updatedPet) => {
        const updatedList = pets.map((pet) => {
          return pet.id === ID ? updatedPet : pet;
        });
        setPets(updatedList);
      });
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={(e) => changeFilt(e.target.value)}
              onFindPetsClick={() => setFilter(currentFilt)}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
