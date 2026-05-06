import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  // GET BOOKINGS
  const getBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/bookings/all");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // CONFIRM BOOKING
  const confirmBooking = async (id) => {
    setConfirmingId(id);
    try {
      const res = await axios.put(`http://localhost:8000/api/bookings/confirm/${id}`);
      alert(res.data.message);
      await getBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to confirm booking. Please try again.");
    } finally {
      setConfirmingId(null);
    }
  };

  // REJECT BOOKING
  const rejectBooking = async (id) => {
    if (!window.confirm("Are you sure you want to reject this booking?")) return;
    
    setRejectingId(id);
    try {
      const res = await axios.put(`http://localhost:8000/api/bookings/reject/${id}`);
      alert(res.data.message);
      await getBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to reject booking. Please try again.");
    } finally {
      setRejectingId(null);
    }
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const pendingBookings = bookings.filter(b => b.status === "Pending");
  const confirmedBookings = bookings.filter(b => b.status === "Confirmed");
  const rejectedBookings = bookings.filter(b => b.status === "Rejected");

  const getCurrentBookings = () => {
    if (activeTab === "pending") return pendingBookings;
    if (activeTab === "confirmed") return confirmedBookings;
    return rejectedBookings;
  };

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "#10b981";
    if (status === "Rejected") return "#ef4444";
    return "#f59e0b";
  };

  const getAnimalEmoji = (type) => {
    const emojis = {
      dog: "🐕",
      cat: "🐱",
      bird: "🐦",
      rabbit: "🐰",
      horse: "🐴",
      reptile: "🐍",
      other: "🐾",
    };
    return emojis[type?.toLowerCase()] || "🐾";
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "80px",
            height: "80px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #9f7aea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            Loading appointments... ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px"
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .card-expand {
            animation: fadeIn 0.3s ease-out;
          }
          button:hover {
            transform: translateY(-2px);
          }
          button:active {
            transform: translateY(0);
          }
        `}
      </style>

      {/* Header */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "25px",
        marginBottom: "20px",
        boxShadow: "0 20px 25px -12px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "15px",
              borderRadius: "15px"
            }}>
              <span style={{ fontSize: "40px" }}>👨‍⚕️</span>
            </div>
            <div>
              <h1 style={{ 
                fontSize: "32px", 
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0
              }}>
                Veterinary Dashboard
              </h1>
              <p style={{ color: "#666", marginTop: "5px", margin: 0 }}>
                Manage appointments & help furry friends 🐾
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              padding: "10px 20px",
              borderRadius: "15px",
              textAlign: "center",
              color: "white"
            }}>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>📋 TOTAL</div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{bookings.length}</div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              padding: "10px 20px",
              borderRadius: "15px",
              textAlign: "center",
              color: "white"
            }}>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>✅ CONFIRMED</div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{confirmedBookings.length}</div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              padding: "10px 20px",
              borderRadius: "15px",
              textAlign: "center",
              color: "white"
            }}>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>⏳ PENDING</div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{pendingBookings.length}</div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              padding: "10px 20px",
              borderRadius: "15px",
              textAlign: "center",
              color: "white"
            }}>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>❌ REJECTED</div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>{rejectedBookings.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveTab("pending")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s",
            background: activeTab === "pending" ? "#f59e0b" : "white",
            color: activeTab === "pending" ? "white" : "#666",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          ⏳ Pending ({pendingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab("confirmed")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s",
            background: activeTab === "confirmed" ? "#10b981" : "white",
            color: activeTab === "confirmed" ? "white" : "#666",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          ✅ Confirmed ({confirmedBookings.length})
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s",
            background: activeTab === "rejected" ? "#ef4444" : "white",
            color: activeTab === "rejected" ? "white" : "#666",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          ❌ Rejected ({rejectedBookings.length})
        </button>
      </div>

      {/* Appointments Container */}
      {getCurrentBookings().length === 0 ? (
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 20px 25px -12px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>
            {activeTab === "pending" && "⏰"}
            {activeTab === "confirmed" && "✅"}
            {activeTab === "rejected" && "❌"}
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
            No {activeTab} appointments
          </h3>
          <p style={{ color: "#666" }}>
            {activeTab === "pending" && "All caught up! No pending appointments."}
            {activeTab === "confirmed" && "No confirmed appointments yet."}
            {activeTab === "rejected" && "No rejected appointments."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {getCurrentBookings().map((item, index) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                transition: "all 0.3s"
              }}
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(item._id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: getStatusColor(item.status),
                  padding: "20px",
                  transition: "all 0.3s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                      <span style={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "bold"
                      }}>
                        #{index + 1}
                      </span>
                      <span style={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "13px"
                      }}>
                        📅 {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px", flexWrap: "wrap" }}>
                      <div style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "10px",
                        borderRadius: "12px"
                      }}>
                        <span style={{ fontSize: "30px" }}>{getAnimalEmoji(item.animalType)}</span>
                      </div>
                      <div>
                        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "bold", margin: 0 }}>
                          {item.ownerName}'s {item.animalType}
                        </h3>
                        <div style={{ display: "flex", gap: "15px", marginTop: "8px", color: "rgba(255,255,255,0.95)", fontSize: "14px", flexWrap: "wrap" }}>
                          <span>👤 {item.ownerName}</span>
                          <span>📅 {new Date(item.preferredDate).toLocaleDateString()}</span>
                          <span>⏰ {item.preferredTime}</span>
                          <span>{item.status === "Confirmed" ? "✅ Confirmed" : item.status === "Rejected" ? "❌ Rejected" : "⏳ Pending"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    padding: "8px",
                    marginLeft: "15px"
                  }}>
                    <span style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}>
                      {expandedId === item._id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === item._id && (
                <div className="card-expand" style={{ padding: "25px", background: "#f8f9fa" }}>
                  
                  {/* Action Buttons */}
                  {item.status === "Pending" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "25px" }}>
                      <button
                        onClick={() => confirmBooking(item._id)}
                        disabled={confirmingId === item._id}
                        style={{
                          background: "linear-gradient(135deg, #10b981, #059669)",
                          color: "white",
                          padding: "14px",
                          border: "none",
                          borderRadius: "12px",
                          fontWeight: "bold",
                          fontSize: "16px",
                          cursor: "pointer",
                          transition: "all 0.3s"
                        }}
                      >
                        {confirmingId === item._id ? "⏳ Confirming..." : "✅ Confirm Booking"}
                      </button>
                      <button
                        onClick={() => rejectBooking(item._id)}
                        disabled={rejectingId === item._id}
                        style={{
                          background: "linear-gradient(135deg, #ef4444, #dc2626)",
                          color: "white",
                          padding: "14px",
                          border: "none",
                          borderRadius: "12px",
                          fontWeight: "bold",
                          fontSize: "16px",
                          cursor: "pointer",
                          transition: "all 0.3s"
                        }}
                      >
                        {rejectingId === item._id ? "⏳ Rejecting..." : "❌ Reject Booking"}
                      </button>
                    </div>
                  )}

                  {/* Status Messages */}
                  {item.status === "Confirmed" && (
                    <div style={{
                      background: "#d1fae5",
                      padding: "15px",
                      borderRadius: "12px",
                      textAlign: "center",
                      marginBottom: "25px",
                      border: "2px solid #10b981"
                    }}>
                      <p style={{ fontWeight: "bold", color: "#065f46", fontSize: "18px", margin: 0 }}>
                        ✅ APPOINTMENT CONFIRMED! 🎉
                      </p>
                    </div>
                  )}

                  {item.status === "Rejected" && (
                    <div style={{
                      background: "#fee2e2",
                      padding: "15px",
                      borderRadius: "12px",
                      textAlign: "center",
                      marginBottom: "25px",
                      border: "2px solid #ef4444"
                    }}>
                      <p style={{ fontWeight: "bold", color: "#991b1b", fontSize: "18px", margin: 0 }}>
                        ❌ APPOINTMENT REJECTED 💔
                      </p>
                    </div>
                  )}

                  {/* Owner Details */}
                  <div style={{
                    background: "white",
                    padding: "18px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "18px", color: "#333", margin: "0 0 15px 0" }}>
                      👤 Owner Details
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
                      <div><strong style={{ color: "#555" }}>Name:</strong> <span style={{ color: "#333" }}>{item.ownerName}</span></div>
                      <div><strong style={{ color: "#555" }}>Email:</strong> <span style={{ color: "#333" }}>{item.email}</span></div>
                      <div><strong style={{ color: "#555" }}>Phone:</strong> <span style={{ color: "#333" }}>{item.phone}</span></div>
                      <div><strong style={{ color: "#555" }}>Address:</strong> <span style={{ color: "#333" }}>{item.address}</span></div>
                    </div>
                  </div>

                  {/* Animal Details */}
                  <div style={{
                    background: "white",
                    padding: "18px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "18px", color: "#333", margin: "0 0 15px 0" }}>
                      🐕 Animal Details
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
                      <div><strong style={{ color: "#555" }}>Type:</strong> <span style={{ color: "#333" }}>{item.animalType}</span></div>
                      <div><strong style={{ color: "#555" }}>Breed:</strong> <span style={{ color: "#333" }}>{item.animalBreed || "Not specified"}</span></div>
                      <div><strong style={{ color: "#555" }}>Age:</strong> <span style={{ color: "#333" }}>{item.animalAge} years</span></div>
                      <div><strong style={{ color: "#555" }}>Gender:</strong> <span style={{ color: "#333" }}>{item.animalGender} {item.animalGender === "male" ? "♂️" : "♀️"}</span></div>
                    </div>
                  </div>

                  {/* Health Details */}
                  <div style={{
                    background: "white",
                    padding: "18px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "18px", color: "#333", margin: "0 0 15px 0" }}>
                      🏥 Health Details
                    </h4>
                    <div><strong style={{ color: "#555" }}>Problem:</strong> <span style={{ color: "#333" }}>{item.problem}</span></div>
                    <div style={{ marginTop: "10px" }}><strong style={{ color: "#555" }}>Symptoms:</strong> <span style={{ color: "#333" }}>{item.symptoms}</span></div>
                    {item.emergency && item.emergency !== "No" && (
                      <div style={{
                        marginTop: "15px",
                        padding: "10px",
                        background: "#fee2e2",
                        color: "#dc2626",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontWeight: "bold",
                        border: "1px solid #dc2626"
                      }}>
                        🚨 EMERGENCY: {item.emergency} ⚠️
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div style={{
                    background: "white",
                    padding: "18px",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "18px", color: "#333", margin: "0 0 15px 0" }}>
                      📅 Appointment Details
                    </h4>
                    <div><strong style={{ color: "#555" }}>Date:</strong> <span style={{ color: "#333" }}>{new Date(item.preferredDate).toLocaleDateString()}</span></div>
                    <div style={{ marginTop: "8px" }}><strong style={{ color: "#555" }}>Time:</strong> <span style={{ color: "#333" }}>{item.preferredTime}</span></div>
                    <div style={{ marginTop: "12px", fontSize: "12px", color: "#888", borderTop: "1px solid #eee", paddingTop: "10px" }}>
                      Requested on: {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Floating Button */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        padding: "12px 20px",
        borderRadius: "50px",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
        cursor: "pointer",
        fontWeight: "bold"
      }}>
        🐾 Total: {bookings.length} Appointments
      </div>
    </div>
  );
};

export default DoctorDashboard;