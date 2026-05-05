import React, { useState, useEffect } from "react";
import "./Sell.css";

function Sell() {
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  // 🔥 LOAD DATA (persist fix)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("animals")) || [];
    setAnimals(data);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 FILE → BASE64 CONVERT FUNCTION
  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length < 2) {
      alert("Minimum 2 images required");
      return;
    }

    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file))
    );

    setImages(base64Images);
  };

  const handleVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64Video = await convertToBase64(file);
    setVideo(base64Video);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length < 2) return alert("Upload 2 images");
    if (!video) return alert("Upload 1 video");

    const newAnimal = {
      id: Date.now(),
      ...formData,
      images,
      video,
      preview: images[0], // base64
    };

    const old = JSON.parse(localStorage.getItem("animals")) || [];
    const updated = [...old, newAnimal];

    localStorage.setItem("animals", JSON.stringify(updated));
    setAnimals(updated);

    setShowForm(false);

    setFormData({ name: "", type: "", age: "", price: "" });
    setImages([]);
    setVideo(null);
  };

  // 🔥 DELETE FUNCTION
  const handleDelete = (id) => {
    const updated = animals.filter((item) => item.id !== id);
    setAnimals(updated);
    localStorage.setItem("animals", JSON.stringify(updated));
  };

  return (
    <div className="sell-container">
      <h1>💰 Sell Your Animal</h1>

      {!showForm && (
        <button className="add-btn" onClick={() => setShowForm(true)}>
          ➕ Add New Animal
        </button>
      )}

      {showForm && (
        <form className="sell-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Animal Name" onChange={handleChange} required />
          <input name="type" placeholder="Animal Type" onChange={handleChange} required />
          <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />

          <label>Upload Minimum 2 Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImages} />

          <label>Upload 1 Video</label>
          <input type="file" accept="video/*" onChange={handleVideo} />

          <button type="submit">Submit</button>
        </form>
      )}

      {/* CARD LIST */}
      <div className="animal-list">
        {animals.map((animal) => (
          <div key={animal.id} className="flip-card">
            <img src={animal.preview} className="card-img" alt="animal" />

            <div className="card-body">
              <h3>{animal.name}</h3>
              <p>{animal.type}</p>
              <p className="price">₹{animal.price}</p>

              <button
                className="open-btn"
                onClick={() => setSelectedAnimal(animal)}
              >
                Open
              </button>

              {/* 🔥 DELETE BUTTON */}
              <button
                style={{ background: "red", marginTop: "5px" }}
                onClick={() => handleDelete(animal.id)}
              >
                Delete
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
              <video width="250" controls>
                <source src={selectedAnimal.video} />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sell;