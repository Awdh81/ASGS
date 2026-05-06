import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [showHeader, setShowHeader] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    animalType: "",
    animalBreed: "",
    animalAge: "",
    animalGender: "",
    problem: "",
    symptoms: "",
    emergency: "No",
    preferredDate: "",
    preferredTime: "",
  });
  const [creatingAppointment, setCreatingAppointment] = useState(false);

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

  // CREATE NEW APPOINTMENT
  const createNewAppointment = async (e) => {
    e.preventDefault();
    setCreatingAppointment(true);
    try {
      const res = await axios.post("http://localhost:8000/api/bookings/create", newAppointment);
      alert(res.data.message);
      setNewAppointment({
        ownerName: "",
        email: "",
        phone: "",
        address: "",
        animalType: "",
        animalBreed: "",
        animalAge: "",
        animalGender: "",
        problem: "",
        symptoms: "",
        emergency: "No",
        preferredDate: "",
        preferredTime: "",
      });
      setShowCreateForm(false);
      await getBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to create appointment. Please try again.");
    } finally {
      setCreatingAppointment(false);
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
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-100%);
            }
          }
          .card-expand {
            animation: fadeIn 0.3s ease-out;
          }
          .header-show {
            animation: slideDown 0.4s ease-out;
          }
          button:hover {
            transform: translateY(-2px);
          }
          button:active {
            transform: translateY(0);
          }
        `}
      </style>

      {/* Control Buttons */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        gap: "10px"
      }}>
        <button
          onClick={() => setShowHeader(!showHeader)}
          style={{
            background: showHeader ? "#ef4444" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
            fontSize: "13px"
          }}
        >
          {showHeader ? "🔽 Hide Stats" : "🔼 Show Stats"}
        </button>
        
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <span>➕</span>
          <span>New Appointment</span>
        </button>
      </div>

      {/* Header Section */}
      {showHeader && (
        <div className="header-show" style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 20px 25px -12px rgba(0,0,0,0.2)"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "12px",
                borderRadius: "12px"
              }}>
                <span style={{ fontSize: "30px" }}>👨‍⚕️</span>
              </div>
              <div>
                <h1 style={{ 
                  fontSize: "24px", 
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0
                }}>
                  Veterinary Dashboard
                </h1>
                <p style={{ color: "#666", fontSize: "12px", margin: 0 }}>
                  Manage appointments & help furry friends 🐾
                </p>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <div style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                padding: "8px 15px",
                borderRadius: "12px",
                textAlign: "center",
                color: "white"
              }}>
                <div style={{ fontSize: "10px", opacity: 0.9 }}>📋 TOTAL</div>
                <div style={{ fontSize: "22px", fontWeight: "bold" }}>{bookings.length}</div>
              </div>
              <div style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                padding: "8px 15px",
                borderRadius: "12px",
                textAlign: "center",
                color: "white"
              }}>
                <div style={{ fontSize: "10px", opacity: 0.9 }}>✅ CONFIRMED</div>
                <div style={{ fontSize: "22px", fontWeight: "bold" }}>{confirmedBookings.length}</div>
              </div>
              <div style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                padding: "8px 15px",
                borderRadius: "12px",
                textAlign: "center",
                color: "white"
              }}>
                <div style={{ fontSize: "10px", opacity: 0.9 }}>⏳ PENDING</div>
                <div style={{ fontSize: "22px", fontWeight: "bold" }}>{pendingBookings.length}</div>
              </div>
              <div style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                padding: "8px 15px",
                borderRadius: "12px",
                textAlign: "center",
                color: "white"
              }}>
                <div style={{ fontSize: "10px", opacity: 0.9 }}>❌ REJECTED</div>
                <div style={{ fontSize: "22px", fontWeight: "bold" }}>{rejectedBookings.length}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Appointment Form Modal */}
      {showCreateForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflow: "auto"
        }} onClick={() => setShowCreateForm(false)}>
          <div style={{
            background: "white",
            borderRadius: "30px",
            maxWidth: "800px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "30px",
            position: "relative"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "2px solid #667eea",
              paddingBottom: "15px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "28px" }}>➕</span>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Create New Appointment</h2>
              </div>
              <button
                onClick={() => setShowCreateForm(false)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                  fontSize: "20px"
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={createNewAppointment}>
              {/* Owner Details */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", color: "#667eea" }}>👤 Owner Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input type="text" name="ownerName" placeholder="Owner Name" value={newAppointment.ownerName} onChange={(e) => setNewAppointment({...newAppointment, ownerName: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                  <input type="email" name="email" placeholder="Email" value={newAppointment.email} onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                  <input type="text" name="phone" placeholder="Phone" value={newAppointment.phone} onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                  <input type="text" name="address" placeholder="Address" value={newAppointment.address} onChange={(e) => setNewAppointment({...newAppointment, address: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                </div>
              </div>

              {/* Animal Details */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", color: "#10b981" }}>🐕 Animal Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input type="text" name="animalType" placeholder="Animal Type" value={newAppointment.animalType} onChange={(e) => setNewAppointment({...newAppointment, animalType: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                  <input type="text" name="animalBreed" placeholder="Breed" value={newAppointment.animalBreed} onChange={(e) => setNewAppointment({...newAppointment, animalBreed: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} />
                  <input type="number" name="animalAge" placeholder="Age" value={newAppointment.animalAge} onChange={(e) => setNewAppointment({...newAppointment, animalAge: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} />
                  <select name="animalGender" value={newAppointment.animalGender} onChange={(e) => setNewAppointment({...newAppointment, animalGender: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Health Details */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", color: "#ef4444" }}>🏥 Health Details</h3>
                <textarea name="problem" placeholder="Describe the problem" value={newAppointment.problem} onChange={(e) => setNewAppointment({...newAppointment, problem: e.target.value})} rows="3" style={{ width: "100%", padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px", marginBottom: "10px" }} required></textarea>
                <textarea name="symptoms" placeholder="Symptoms" value={newAppointment.symptoms} onChange={(e) => setNewAppointment({...newAppointment, symptoms: e.target.value})} rows="2" style={{ width: "100%", padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px", marginBottom: "10px" }}></textarea>
                <select name="emergency" value={newAppointment.emergency} onChange={(e) => setNewAppointment({...newAppointment, emergency: e.target.value})} style={{ width: "100%", padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }}>
                  <option value="No">No Emergency</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              {/* Appointment Time */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", color: "#3b82f6" }}>📅 Appointment Time</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input type="date" name="preferredDate" value={newAppointment.preferredDate} onChange={(e) => setNewAppointment({...newAppointment, preferredDate: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                  <input type="time" name="preferredTime" value={newAppointment.preferredTime} onChange={(e) => setNewAppointment({...newAppointment, preferredTime: e.target.value})} style={{ padding: "10px", border: "2px solid #e0e0e0", borderRadius: "10px" }} required />
                </div>
              </div>

              <button type="submit" disabled={creatingAppointment} style={{
                width: "100%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                {creatingAppointment ? "Creating..." : "➕ Create Appointment"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Buttons */}
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        marginBottom: "20px", 
        flexWrap: "wrap",
        marginTop: showHeader ? "0" : "60px"
      }}>
        <button
          onClick={() => setActiveTab("pending")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
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
            background: activeTab === "rejected" ? "#ef4444" : "white",
            color: activeTab === "rejected" ? "white" : "#666",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          ❌ Rejected ({rejectedBookings.length})
        </button>
      </div>

      {/* Appointments List */}
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
          <button
            onClick={() => setShowCreateForm(true)}
            style={{
              marginTop: "20px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ➕ Create New Appointment
          </button>
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
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
              }}
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(item._id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: getStatusColor(item.status),
                  padding: "20px"
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
                <div style={{ padding: "25px", background: "#f8f9fa" }}>
                  
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
                          cursor: "pointer"
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
                          cursor: "pointer"
                        }}
                      >
                        {rejectingId === item._id ? "⏳ Rejecting..." : "❌ Reject Booking"}
                      </button>
                    </div>
                  )}

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

                  {/* Details Sections */}
                  <div style={{ background: "white", padding: "18px", borderRadius: "12px", marginBottom: "15px" }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", color: "#333" }}>👤 Owner Details</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                      <div><strong>Name:</strong> {item.ownerName}</div>
                      <div><strong>Email:</strong> {item.email}</div>
                      <div><strong>Phone:</strong> {item.phone}</div>
                      <div><strong>Address:</strong> {item.address}</div>
                    </div>
                  </div>

                  <div style={{ background: "white", padding: "18px", borderRadius: "12px", marginBottom: "15px" }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", color: "#333" }}>🐕 Animal Details</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                      <div><strong>Type:</strong> {item.animalType}</div>
                      <div><strong>Breed:</strong> {item.animalBreed || "Not specified"}</div>
                      <div><strong>Age:</strong> {item.animalAge} years</div>
                      <div><strong>Gender:</strong> {item.animalGender}</div>
                    </div>
                  </div>

                  <div style={{ background: "white", padding: "18px", borderRadius: "12px", marginBottom: "15px" }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", color: "#333" }}>🏥 Health Details</h4>
                    <div><strong>Problem:</strong> {item.problem}</div>
                    <div style={{ marginTop: "10px" }}><strong>Symptoms:</strong> {item.symptoms}</div>
                    {item.emergency === "Emergency" && (
                      <div style={{ marginTop: "10px", padding: "8px", background: "#fee2e2", color: "#dc2626", borderRadius: "8px", textAlign: "center", fontWeight: "bold" }}>
                        🚨 EMERGENCY CASE! 🚨
                      </div>
                    )}
                  </div>

                  <div style={{ background: "white", padding: "18px", borderRadius: "12px" }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "15px", color: "#333" }}>📅 Appointment Details</h4>
                    <div><strong>Date:</strong> {new Date(item.preferredDate).toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {item.preferredTime}</div>
                    <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
                      Requested on: {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Floating Stats */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        padding: "10px 18px",
        borderRadius: "50px",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
        fontWeight: "bold",
        fontSize: "13px"
      }}>
        🐾 Total: {bookings.length} Appointments
      </div>
    </div>
  );
};

export default DoctorDashboard;