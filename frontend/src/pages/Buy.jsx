import React, { useEffect, useState } from "react";
import "./Buy.css";

function Buy() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("animals")) || [];
    setAnimals(data);
  }, []);

  const filtered = animals.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="buy-container">

      {/* 🔵 HEADER */}
      <div className="header">
        <h2>🛒 Animal Market</h2>
        <input
          type="text"
          placeholder="Search animals..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <h3 className="empty">No Animals Available</h3>
      )}

      {/* GRID */}
      <div className="grid">
        {filtered.map((item) => (
          <div key={item.id} className="card">

            <img src={item.preview} alt="animal" />

            <div className="info">
              <h3>{item.name}</h3>
              <p>{item.type}</p>
              <h4>₹{item.price}</h4>

              <button onClick={() => setSelectedAnimal(item)}>
                Open
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedAnimal && (
        <div className="modal">
          <div className="modal-content">

            <span className="close" onClick={() => setSelectedAnimal(null)}>
              ❌
            </span>

            <h2>{selectedAnimal.name}</h2>
            <p>Type: {selectedAnimal.type}</p>
            <p>Price: ₹{selectedAnimal.price}</p>

            <div className="preview">
              {selectedAnimal.images.map((img, i) => (
                <img key={i} src={img} alt="" />
              ))}
            </div>

            {selectedAnimal.video && (
              <video width="300" controls>
                <source src={selectedAnimal.video} />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Buy;