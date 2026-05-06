import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sell() {
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Seller Information (get from logged in user)
  const [sellerInfo, setSellerInfo] = useState({
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    sellerAddress: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    price: "",
    description: ""
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const navigate = useNavigate();

  // 🔥 LOAD DATA & SELLER INFO
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("animals")) || [];
    setAnimals(data);
    
    // Load seller info from localStorage (set during login)
    const savedSeller = JSON.parse(localStorage.getItem("sellerInfo")) || {};
    setSellerInfo(savedSeller);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSellerChange = (e) => {
    setSellerInfo({ ...sellerInfo, [e.target.name]: e.target.value });
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
    if (!sellerInfo.sellerName || !sellerInfo.sellerPhone) {
      return alert("Please enter your contact information");
    }

    setIsLoading(true);

    setTimeout(() => {
      const newAnimal = {
        id: Date.now(),
        ...formData,
        images,
        video,
        preview: images[0],
        createdAt: new Date().toISOString(),
        seller: {
          name: sellerInfo.sellerName,
          email: sellerInfo.sellerEmail,
          phone: sellerInfo.sellerPhone,
          address: sellerInfo.sellerAddress
        }
      };

      const old = JSON.parse(localStorage.getItem("animals")) || [];
      const updated = [...old, newAnimal];

      localStorage.setItem("animals", JSON.stringify(updated));
      localStorage.setItem("sellerInfo", JSON.stringify(sellerInfo));
      
      setAnimals(updated);
      setShowForm(false);
      setFormData({ name: "", type: "", age: "", price: "", description: "" });
      setImages([]);
      setVideo(null);
      setIsLoading(false);
      alert("Animal listed successfully! Buyers can now contact you 🎉");
    }, 500);
  };

  // 🔥 DELETE FUNCTION
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const updated = animals.filter((item) => item.id !== id);
      setAnimals(updated);
      localStorage.setItem("animals", JSON.stringify(updated));
      alert("Deleted successfully!");
    }
  };

  const handleContactSeller = (seller) => {
    alert(
      `📞 Update:\n\n` +
      `Name: ${seller.name}\n` +
      `Email: ${seller.email || "Not provided"}\n` +
      `Phone: ${seller.phone}\n` +
      `Address: ${seller.address || "Not provided"}\n\n` +
      `You can call or WhatsApp on the phone number.`
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate("/public-dashboard")}>
            ← Back
          </button>
          <h1 style={styles.title}>💰 Sell Your Animal</h1>
        </div>
        <button style={styles.addNewBtn} onClick={() => setShowForm(true)}>
          + Add to Sell
        </button>
      </div>

      {/* Form Modal/Drawer */}
      {showForm && (
        <div style={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>List Your Animal for Sale</h2>
              <button style={styles.modalClose} onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>🐾 Animal Details</h3>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Animal Name *</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g., Golden Retriever"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Animal Type *</label>
                    <input
                      name="type"
                      type="text"
                      placeholder="e.g., Dog, Cow, Goat"
                      value={formData.type}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Age (years) *</label>
                    <input
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Price (₹) *</label>
                    <input
                      name="price"
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      name="description"
                      placeholder="Describe your animal (health, breed, etc.)"
                      value={formData.description}
                      onChange={handleChange}
                      style={styles.textarea}
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>📸 Media Upload</h3>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Upload Images (Min 2) *</label>
                  <div style={styles.fileInputWrapper}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImages}
                      style={styles.fileInput}
                      id="images"
                    />
                    <label htmlFor="images" style={styles.fileLabel}>
                      📷 Choose Images
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div style={styles.fileInfo}>✅ {images.length} image(s) selected</div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Upload Video *</label>
                  <div style={styles.fileInputWrapper}>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideo}
                      style={styles.fileInput}
                      id="video"
                    />
                    <label htmlFor="video" style={styles.fileLabel}>
                      🎥 Choose Video
                    </label>
                  </div>
                  {video && <div style={styles.fileInfo}>✅ Video selected</div>}
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>📞 Your Contact Information</h3>
                <p style={styles.sectionNote}>
                  This info will be visible to buyers so they can contact you
                </p>

                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name *</label>
                    <input
                      name="sellerName"
                      type="text"
                      placeholder="Your name"
                      value={sellerInfo.sellerName}
                      onChange={handleSellerChange}
                      style={styles.input}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number *</label>
                    <input
                      name="sellerPhone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={sellerInfo.sellerPhone}
                      onChange={handleSellerChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      name="sellerEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={sellerInfo.sellerEmail}
                      onChange={handleSellerChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Address</label>
                    <input
                      name="sellerAddress"
                      type="text"
                      placeholder="City, District"
                      value={sellerInfo.sellerAddress}
                      onChange={handleSellerChange}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" style={styles.submitBtn} disabled={isLoading}>
                {isLoading ? "Listing..." : "List Animal for Sale →"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Animal Listings */}
      <div style={styles.listingsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Your Listings</h2>
          <span style={styles.listingCount}>{animals.length} items</span>
        </div>

        {animals.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🐾</span>
            <p>No listings yet.</p>
            <button style={styles.emptyBtn} onClick={() => setShowForm(true)}>
              + Add to Sell
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {animals.map((animal) => (
              <div key={animal.id} style={styles.productCard}>
                <div style={styles.imageContainer}>
                  <img
                    src={animal.preview}
                    style={styles.productImage}
                    alt={animal.name}
                  />
                  <div style={styles.imageOverlay}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{animal.name}</h3>
                  <p style={styles.productType}>{animal.type}</p>
                  <p style={styles.productAge}>Age: {animal.age} years</p>
                  <div style={styles.priceSection}>
                    <span style={styles.currentPrice}>₹{animal.price}</span>
                  </div>
                  
                  {/* Seller Info Mini */}
                  <div style={styles.sellerMini}>
                    <span style={styles.sellerIcon}>👤</span>
                    <span style={styles.sellerName}>{animal.seller?.name || "Seller"}</span>
                  </div>

                  <div style={styles.actionButtons}>
                    <button
                      style={styles.contactBtn}
                      onClick={() => handleContactSeller(animal.seller)}
                    >
                      📞 Contact Seller
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(animal.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Quick View with Seller Details */}
      {selectedAnimal && (
        <div style={styles.modalOverlay} onClick={() => setSelectedAnimal(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setSelectedAnimal(null)}>
              ✕
            </button>

            <div style={styles.modalContent}>
              <div style={styles.modalLeft}>
                <div style={styles.modalImageContainer}>
                  <img
                    src={selectedAnimal.images?.[0]}
                    style={styles.modalImage}
                    alt={selectedAnimal.name}
                  />
                </div>
                <div style={styles.thumbnailStrip}>
                  {selectedAnimal.images?.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      style={styles.thumbnail}
                      alt="thumbnail"
                    />
                  ))}
                </div>
              </div>

              <div style={styles.modalRight}>
                <h2 style={styles.modalTitle}>{selectedAnimal.name}</h2>
                <p style={styles.modalType}>
                  <span style={styles.label}>Type:</span> {selectedAnimal.type}
                </p>
                <p style={styles.modalAge}>
                  <span style={styles.label}>Age:</span> {selectedAnimal.age} years
                </p>
                {selectedAnimal.description && (
                  <p style={styles.modalDesc}>
                    <span style={styles.label}>Description:</span> {selectedAnimal.description}
                  </p>
                )}

                <div style={styles.modalPrice}>
                  <span style={styles.modalCurrentPrice}>₹{selectedAnimal.price}</span>
                </div>

                {/* Seller Details Section */}
                <div style={styles.sellerSection}>
                  <h4 style={styles.sellerSectionTitle}>📞 Seller Details</h4>
                  <div style={styles.sellerDetail}>
                    <span>👤 Name:</span>
                    <strong>{selectedAnimal.seller?.name || "Not provided"}</strong>
                  </div>
                  <div style={styles.sellerDetail}>
                    <span>📧 Email:</span>
                    <strong>{selectedAnimal.seller?.email || "Not provided"}</strong>
                  </div>
                  <div style={styles.sellerDetail}>
                    <span>📱 Phone:</span>
                    <strong style={styles.phoneNumber}>{selectedAnimal.seller?.phone || "Not provided"}</strong>
                  </div>
                  <div style={styles.sellerDetail}>
                    <span>📍 Address:</span>
                    <strong>{selectedAnimal.seller?.address || "Not provided"}</strong>
                  </div>
                </div>

                {selectedAnimal.video && (
                  <div style={styles.videoSection}>
                    <p style={styles.videoLabel}>📹 Preview Video</p>
                    <video controls style={styles.modalVideo}>
                      <source src={selectedAnimal.video} />
                    </video>
                  </div>
                )}

                <button 
                  style={styles.contactSellerBtn}
                  onClick={() => handleContactSeller(selectedAnimal.seller)}
                >
                  📞 Contact Seller Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sell;

/* 🔥 FLIPKART-STYLE PREMIUM STYLES - FIXED TEXT VISIBILITY */
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1f2f6",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },

  header: {
    background: "linear-gradient(135deg, #2874f0, #1e5fd9)",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  backBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },

  title: {
    color: "#fff",
    fontSize: "22px",
    margin: 0
  },

  addNewBtn: {
    background: "#ffc107",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    color: "#2874f0",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    overflow: "auto"
  },

  modal: {
    background: "#fff",
    borderRadius: "16px",
    maxWidth: "700px",
    width: "90%",
    maxHeight: "85vh",
    overflow: "auto",
    position: "relative",
    margin: "20px"
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e0e0e0",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10
  },

  modalTitle: {
    fontSize: "20px",
    color: "#172337",
    margin: 0
  },

  modalClose: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#666"
  },

  form: {
    padding: "24px"
  },

  section: {
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "1px solid #f0f0f0"
  },

  sectionTitle: {
    fontSize: "16px",
    color: "#172337",
    marginBottom: "16px"
  },

  sectionNote: {
    fontSize: "12px",
    color: "#fb641b",
    marginBottom: "16px"
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px"
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },

  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#172337"
  },

  input: {
    padding: "12px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#172337",
    backgroundColor: "#fff",
    transition: "all 0.2s",
    outline: "none"
  },

  textarea: {
    padding: "12px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#172337",
    backgroundColor: "#fff",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none"
  },

  fileInputWrapper: {
    position: "relative"
  },

  fileInput: {
    display: "none"
  },

  fileLabel: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#2874f0",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px"
  },

  fileInfo: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#388e3c"
  },

  submitBtn: {
    width: "100%",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px"
  },

  listingsSection: {
    padding: "24px"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  sectionTitle: {
    fontSize: "20px",
    color: "#172337",
    margin: 0
  },

  listingCount: {
    color: "#878787",
    fontSize: "14px"
  },

  emptyState: {
    textAlign: "center",
    padding: "60px",
    background: "#fff",
    borderRadius: "12px",
    color: "#878787"
  },

  emptyIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px"
  },

  emptyBtn: {
    marginTop: "16px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },

  productCard: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
  },

  imageContainer: {
    position: "relative",
    paddingTop: "100%",
    overflow: "hidden"
  },

  productImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  imageOverlay: {
    position: "absolute",
    bottom: "-50px",
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
    padding: "20px",
    transition: "bottom 0.3s"
  },

  viewBtn: {
    background: "#ffc107",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    color: "#2874f0",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%"
  },

  productInfo: {
    padding: "16px"
  },

  productName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#172337",
    marginBottom: "4px"
  },

  productType: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "4px"
  },

  productAge: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "8px"
  },

  priceSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
  },

  currentPrice: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#172337"
  },

  sellerMini: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "12px",
    padding: "6px 10px",
    background: "#f5f5f5",
    borderRadius: "8px"
  },

  sellerIcon: {
    fontSize: "12px"
  },

  sellerName: {
    fontSize: "12px",
    color: "#666"
  },

  actionButtons: {
    display: "flex",
    gap: "10px"
  },

  contactBtn: {
    flex: 1,
    background: "#25d366",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer"
  },

  deleteBtn: {
    flex: 1,
    background: "#fff",
    border: "1px solid #ff3f6c",
    padding: "8px",
    borderRadius: "6px",
    color: "#ff3f6c",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer"
  },

  modalContent: {
    display: "flex",
    gap: "30px",
    padding: "30px"
  },

  modalLeft: {
    flex: 1
  },

  modalImageContainer: {
    marginBottom: "15px"
  },

  modalImage: {
    width: "100%",
    borderRadius: "8px"
  },

  thumbnailStrip: {
    display: "flex",
    gap: "10px"
  },

  thumbnail: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer"
  },

  modalRight: {
    flex: 1
  },

  modalTitle: {
    fontSize: "22px",
    color: "#172337",
    marginBottom: "10px"
  },

  modalType: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px"
  },

  modalAge: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px"
  },

  modalDesc: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
    lineHeight: "1.5"
  },

  label: {
    fontWeight: "600",
    color: "#172337"
  },

  modalPrice: {
    marginBottom: "20px"
  },

  modalCurrentPrice: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#172337"
  },

  sellerSection: {
    background: "#f5f5f5",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "20px"
  },

  sellerSectionTitle: {
    fontSize: "14px",
    color: "#172337",
    marginBottom: "12px"
  },

  sellerDetail: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#172337"
  },

  phoneNumber: {
    color: "#25d366"
  },

  videoSection: {
    marginBottom: "20px"
  },

  videoLabel: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "10px",
    color: "#172337"
  },

  modalVideo: {
    width: "100%",
    borderRadius: "8px"
  },

  contactSellerBtn: {
    width: "100%",
    background: "#25d366",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

// Add hover effects
const injectStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("flipkart-sell-styles")) {
    const style = document.createElement("style");
    style.id = "flipkart-sell-styles";
    style.textContent = `
      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      }
      
      .product-card:hover .image-overlay {
        bottom: 0;
      }
      
      .delete-btn:hover {
        background: #ff3f6c;
        color: #fff;
      }
      
      .contact-btn:hover {
        background: #1da15f;
      }
      
      .add-new-btn:hover {
        background: #ffca28;
      }
      
      input:focus, textarea:focus {
        outline: none;
        border-color: #2874f0;
        box-shadow: 0 0 0 2px rgba(40,116,240,0.1);
      }
      
      @media (max-width: 768px) {
        .modal-content {
          flex-direction: column;
        }
        .row {
          grid-template-columns: 1fr;
        }
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }
      }
    `;
    document.head.appendChild(style);
  }
};

injectStyles();