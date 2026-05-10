import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Buy() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarket = async () => {
      const localStored = JSON.parse(localStorage.getItem("animals")) || [];

      try {
        const res = await axios.get("http://localhost:8000/api/public/market");
        const items = res.data.data || [];
        const formatted = items.map((item) => ({
          id: item._id,
          name: item.title,
          type: item.type || "",
          age: item.age || "",
          price: item.price,
          description: item.description,
          preview: item.image,
          seller: {
            name: item.sellerName,
            email: item.sellerEmail,
            phone: item.sellerPhone,
            address: item.sellerAddress
          },
          createdAt: item.createdAt
        }));

        const backendIds = new Set(formatted.map((item) => item.id));
        const merged = [
          ...formatted,
          ...localStored.filter((item) => !backendIds.has(item.id))
        ];

        localStorage.setItem("animals", JSON.stringify(merged));
        setAnimals(merged);
      } catch (error) {
        console.error("Failed to load market data:", error);
        setAnimals(localStored);
      }
    };

    fetchMarket();
  }, []);

  // Filter and sort animals
  let filtered = animals.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Filter by price range
  if (priceRange !== "all") {
    const [min, max] = priceRange.split("-");
    filtered = filtered.filter(
      (item) => item.price >= parseInt(min) && item.price <= parseInt(max)
    );
  }

  // Sort animals
  if (sortBy === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "latest") {
    filtered.sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : parseInt(a.id, 10) || 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : parseInt(b.id, 10) || 0;
      return bDate - aDate;
    });
  }

  const handleContactSeller = (seller) => {
    alert(
      `📞 Contact Seller:\n\n` +
      `Name: ${seller?.name || "Not provided"}\n` +
      `Email: ${seller?.email || "Not provided"}\n` +
      `Phone: ${seller?.phone || "Not provided"}\n` +
      `Address: ${seller?.address || "Not provided"}\n\n` +
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
          <h1 style={styles.title}>🛒 Animal Market</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.cartIcon}>
            <span>🛍️</span>
            <span style={styles.cartCount}>{animals.length}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchSection}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search animals by name..."
            style={styles.searchInput}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            style={styles.filterBtn}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "▲" : "▼"} Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={styles.filtersBar}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Sort by:</label>
            <select 
              style={styles.filterSelect} 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Price Range:</label>
            <select 
              style={styles.filterSelect}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="0-5000">₹0 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
              <option value="20000-50000">₹20,000 - ₹50,000</option>
              <option value="50000-999999">₹50,000+</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div style={styles.resultsCount}>
        <span>{filtered.length} animals found</span>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div style={styles.emptyState}>
          <span style={styles.emptyIcon}>🐾</span>
          <h3 style={styles.emptyTitle}>No Animals Available</h3>
          <p style={styles.emptyText}>Check back later for new listings!</p>
        </div>
      )}

      {/* Product Grid */}
      <div style={styles.grid}>
        {filtered.map((animal) => (
          <div key={animal.id} style={styles.productCard}>
            {/* Image Container */}
            <div style={styles.imageContainer}>
              <img
                src={animal.preview}
                style={styles.productImage}
                alt={animal.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300?text=Animal";
                }}
              />
              {animal.price < 10000 && (
                <div style={styles.discountBadge}>Popular</div>
              )}
              <div style={styles.imageOverlay}>
                <button
                  style={styles.quickViewBtn}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{animal.name}</h3>
              <p style={styles.productType}>{animal.type}</p>
              <p style={styles.productAge}>Age: {animal.age} years</p>
              
              <div style={styles.priceSection}>
                <span style={styles.currentPrice}>₹{animal.price}</span>
                <span style={styles.originalPrice}>
                  ₹{Math.floor(animal.price * 1.2)}
                </span>
                <span style={styles.discount}>20% off</span>
              </div>

              {/* Rating */}
              <div style={styles.rating}>
                <span style={styles.stars}>★★★★☆</span>
                <span style={styles.ratingCount}>(4.2)</span>
              </div>

              {/* Seller Info */}
              <div style={styles.sellerInfo}>
                <span style={styles.sellerIcon}>👤</span>
                <span style={styles.sellerName}>
                  {animal.seller?.name || "Verified Seller"}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button
                  style={styles.buyNowBtn}
                  onClick={() => handleContactSeller(animal.seller)}
                >
                  📞 Contact Seller
                </button>
                <button
                  style={styles.viewDetailsBtn}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Quick View */}
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
                      onClick={() => {
                        const modalImg = document.querySelector(`.${styles.modalImage}`);
                        if (modalImg) modalImg.src = img;
                      }}
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
                <p style={styles.modalPrice}>
                  <span style={styles.modalCurrentPrice}>₹{selectedAnimal.price}</span>
                  <span style={styles.modalOriginalPrice}>
                    ₹{Math.floor(selectedAnimal.price * 1.2)}
                  </span>
                  <span style={styles.modalDiscount}>20% off</span>
                </p>

                {selectedAnimal.description && (
                  <p style={styles.modalDesc}>
                    <span style={styles.label}>Description:</span><br />
                    {selectedAnimal.description}
                  </p>
                )}

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
                    <strong style={styles.phoneNumber}>
                      {selectedAnimal.seller?.phone || "Not provided"}
                    </strong>
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

export default Buy;

/* 🔥 FLIPKART-STYLE PREMIUM STYLES */
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
    fontWeight: "500",
    transition: "all 0.2s"
  },

  title: {
    color: "#fff",
    fontSize: "22px",
    margin: 0
  },

  headerRight: {
    display: "flex",
    alignItems: "center"
  },

  cartIcon: {
    position: "relative",
    fontSize: "24px",
    cursor: "pointer"
  },

  cartCount: {
    position: "absolute",
    top: "-8px",
    right: "-12px",
    background: "#ffc107",
    color: "#2874f0",
    fontSize: "10px",
    fontWeight: "bold",
    padding: "2px 5px",
    borderRadius: "10px"
  },

  searchSection: {
    padding: "20px 24px",
    background: "#fff",
    borderBottom: "1px solid #e0e0e0"
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    maxWidth: "600px",
    margin: "0 auto",
    position: "relative"
  },

  searchIcon: {
    position: "absolute",
    left: "15px",
    fontSize: "18px",
    color: "#999"
  },

  searchInput: {
    flex: 1,
    padding: "12px 15px 12px 45px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#172337",
    outline: "none",
    transition: "all 0.2s"
  },

  filterBtn: {
    background: "#2874f0",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },

  filtersBar: {
    background: "#fff",
    padding: "15px 24px",
    display: "flex",
    gap: "30px",
    borderBottom: "1px solid #f0f0f0",
    flexWrap: "wrap"
  },

  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  filterLabel: {
    fontSize: "13px",
    color: "#666",
    fontWeight: "500"
  },

  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#172337",
    background: "#fff",
    cursor: "pointer"
  },

  resultsCount: {
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e0e0e0"
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    background: "#fff",
    margin: "40px",
    borderRadius: "16px"
  },

  emptyIcon: {
    fontSize: "64px",
    display: "block",
    marginBottom: "20px"
  },

  emptyTitle: {
    fontSize: "24px",
    color: "#172337",
    marginBottom: "10px"
  },

  emptyText: {
    fontSize: "14px",
    color: "#878787"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    padding: "24px"
  },

  productCard: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    cursor: "pointer"
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

  discountBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#ffc107",
    color: "#172337",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "600",
    zIndex: 2
  },

  imageOverlay: {
    position: "absolute",
    bottom: "-50px",
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
    padding: "20px",
    transition: "bottom 0.3s",
    zIndex: 2
  },

  quickViewBtn: {
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
    color: "#878787",
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
    marginBottom: "8px",
    flexWrap: "wrap"
  },

  currentPrice: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#172337"
  },

  originalPrice: {
    fontSize: "13px",
    color: "#878787",
    textDecoration: "line-through"
  },

  discount: {
    fontSize: "12px",
    color: "#388e3c",
    fontWeight: "500"
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "12px"
  },

  stars: {
    color: "#ffc107",
    fontSize: "12px"
  },

  ratingCount: {
    fontSize: "11px",
    color: "#878787"
  },

  sellerInfo: {
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

  buyNowBtn: {
    flex: 1,
    background: "#fb641b",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },

  viewDetailsBtn: {
    flex: 1,
    background: "#fff",
    border: "1px solid #2874f0",
    padding: "8px",
    borderRadius: "6px",
    color: "#2874f0",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },

  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    overflow: "auto"
  },

  modal: {
    background: "#fff",
    borderRadius: "16px",
    maxWidth: "900px",
    width: "90%",
    maxHeight: "85vh",
    overflow: "auto",
    position: "relative"
  },

  modalClose: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "#fff",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    zIndex: 10,
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },

  modalContent: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    flexWrap: "wrap"
  },

  modalLeft: {
    flex: 1,
    minWidth: "250px"
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
    gap: "10px",
    flexWrap: "wrap"
  },

  thumbnail: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "all 0.2s"
  },

  modalRight: {
    flex: 1,
    minWidth: "280px"
  },

  modalTitle: {
    fontSize: "24px",
    color: "#172337",
    marginBottom: "15px"
  },

  modalType: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px"
  },

  modalAge: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px"
  },

  label: {
    fontWeight: "600",
    color: "#172337"
  },

  modalPrice: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  modalCurrentPrice: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#172337"
  },

  modalOriginalPrice: {
    fontSize: "16px",
    color: "#878787",
    textDecoration: "line-through"
  },

  modalDiscount: {
    fontSize: "14px",
    color: "#388e3c"
  },

  modalDesc: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
    lineHeight: "1.6"
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
    color: "#172337",
    flexWrap: "wrap",
    gap: "8px"
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
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  }
};

// Add hover effects
const injectStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("buy-styles")) {
    const style = document.createElement("style");
    style.id = "buy-styles";
    style.textContent = `
      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      }
      
      .product-card:hover .image-overlay {
        bottom: 0;
      }
      
      .buy-now-btn:hover {
        background: #f54a0a;
      }
      
      .view-details-btn:hover {
        background: #2874f0;
        color: #fff;
      }
      
      .back-btn:hover {
        background: rgba(255,255,255,0.3);
      }
      
      .filter-btn:hover {
        background: #1e5fd9;
      }
      
      .contact-seller-btn:hover {
        background: #1da15f;
      }
      
      input:focus, select:focus {
        outline: none;
        border-color: #2874f0;
        box-shadow: 0 0 0 2px rgba(40,116,240,0.1);
      }
      
      .thumbnail:hover {
        border-color: #2874f0;
        transform: scale(1.05);
      }
      
      @media (max-width: 768px) {
        .modal-content {
          flex-direction: column;
        }
        .filters-bar {
          flex-direction: column;
        }
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          padding: 16px;
        }
        .action-buttons {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

injectStyles();