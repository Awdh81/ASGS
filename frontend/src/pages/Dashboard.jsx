import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 0, doctors: 0, patients: 0, admins: 0 },
    appointments: { total: 0, pending: 0, confirmed: 0, rejected: 0 },
    marketplace: { totalListings: 0, totalSales: 0, pendingOrders: 0, totalRevenue: 0 },
    animals: { total: 0, adopted: 0, available: 0, pendingAdoption: 0 }
  });
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [animalListings, setAnimalListings] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityCounts, setActivityCounts] = useState({ login: 0, logout: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  // Fetch all dashboard data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Fetch all dashboard stats in one call
      const statsRes = await axios.get("http://localhost:8000/api/admin/dashboard-stats", {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => ({ data: { data: null } }));
      
      // Fetch activities separately
      const activitiesRes = await axios.get("http://localhost:8000/api/admin/activity-logs", {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => ({ data: { activities: [] } }));
      
      if (statsRes.data && statsRes.data.data) {
        const statsData = statsRes.data.data;
        
        // Set all the data from the dashboard-stats response
        setUsers([
          ...statsData.allUsers.admins.map(u => ({ ...u, role: 'admin' })),
          ...statsData.allUsers.public.map(u => ({ ...u, role: 'public' })),
          ...statsData.allUsers.doctors.map(u => ({ ...u, role: 'doctor' }))
        ]);
        setAppointments(statsData.recentAppointments || []);
        
        // Calculate statistics from the response
        const stats = {
          users: {
            total: statsData.users.total,
            doctors: statsData.users.doctors,
            patients: statsData.users.publicUsers,
            admins: statsData.users.admins
          },
          appointments: statsData.appointments,
          marketplace: statsData.marketplace,
          animals: {
            total: statsData.marketplace.totalListings || 0,
            adopted: statsData.marketplace.soldItems || 0,
            available: statsData.marketplace.availableItems || 0,
            pendingAdoption: 0
          }
        };
        setStats(stats);
      }

      const marketRes = await axios.get("http://localhost:8000/api/public/market").catch(() => ({ data: { data: [] } }));
      const marketItems = marketRes.data.data || [];
      setMarketplaceData(marketItems);
      setAnimalListings(marketItems.map((item) => ({
        _id: item._id,
        name: item.title,
        type: item.type || '',
        breed: item.breed || '',
        age: item.age || '',
        owner: {
          name: item.sellerName
        },
        ownerEmail: item.sellerEmail,
        status: item.status,
        createdAt: item.createdAt
      })));
      
      const activityList = activitiesRes.data.activities || [];
      setActivities(activityList);
      
      const loginCount = activityList.filter(a => a.action === 'login').length;
      const logoutCount = activityList.filter(a => a.action === 'logout').length;
      setActivityCounts({
        login: loginCount,
        logout: logoutCount,
        total: activityList.length
      });
      
      // Get recent activities
      const recent = activityList.slice(0, 20);
      setRecentActivities(recent);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (usersData, appointmentsData, marketplaceData, animalsData) => {
    // User stats
    const doctors = usersData?.filter(u => u.role === 'doctor').length || 0;
    const patients = usersData?.filter(u => u.role === 'public').length || 0;
    const admins = usersData?.filter(u => u.role === 'admin').length || 0;
    
    // Appointment stats
    const pending = appointmentsData?.filter(a => a.status === 'Pending').length || 0;
    const confirmed = appointmentsData?.filter(a => a.status === 'Confirmed').length || 0;
    const rejected = appointmentsData?.filter(a => a.status === 'Rejected').length || 0;
    
    // Marketplace stats
    const soldItems = marketplaceData?.filter(m => m.status === 'sold').length || 0;
    const pendingOrders = marketplaceData?.filter(m => m.status === 'pending').length || 0;
    const totalRevenue = marketplaceData?.filter(m => m.status === 'sold').reduce((sum, item) => sum + (item.price || 0), 0) || 0;
    
    // Animal stats
    const adopted = animalsData?.filter(a => a.status === 'adopted').length || 0;
    const available = animalsData?.filter(a => a.status === 'available').length || 0;
    const pendingAdoption = animalsData?.filter(a => a.status === 'pending').length || 0;
    
    setStats({
      users: {
        total: usersData?.length || 0,
        doctors: doctors,
        patients: patients,
        admins: admins
      },
      appointments: {
        total: appointmentsData?.length || 0,
        pending: pending,
        confirmed: confirmed,
        rejected: rejected
      },
      marketplace: {
        totalListings: marketplaceData?.length || 0,
        totalSales: soldItems,
        pendingOrders: pendingOrders,
        totalRevenue: totalRevenue
      },
      animals: {
        total: animalsData?.length || 0,
        adopted: adopted,
        available: available,
        pendingAdoption: pendingAdoption
      }
    });
  };

  const getDoctorAppointments = (doctorId) => {
    const doctorApps = appointments.filter(apt => apt.doctorId === doctorId);
    setDoctorAppointments(doctorApps);
    setSelectedDoctor(doctorId);
  };

  // Chart data for user distribution
  const userDistributionData = {
    labels: ['Doctors', 'Patients', 'Admins'],
    datasets: [
      {
        data: [stats.users.doctors, stats.users.patients, stats.users.admins],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  // Chart data for appointment status
  const appointmentStatusData = {
    labels: ['Pending', 'Confirmed', 'Rejected'],
    datasets: [
      {
        data: [stats.appointments.pending, stats.appointments.confirmed, stats.appointments.rejected],
        backgroundColor: ['#f59e0b', '#10b981', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  // Chart data for marketplace
  const marketplaceDataChart = {
    labels: ['Total Listings', 'Total Sales', 'Pending Orders'],
    datasets: [
      {
        label: 'Count',
        data: [stats.marketplace.totalListings, stats.marketplace.totalSales, stats.marketplace.pendingOrders],
        backgroundColor: ['#8b5cf6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  // Chart data for animals
  const animalDataChart = {
    labels: ['Available', 'Adopted', 'Pending'],
    datasets: [
      {
        data: [stats.animals.available, stats.animals.adopted, stats.animals.pendingAdoption],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📊 Admin Dashboard</h1>
          <p style={styles.subtitle}>Complete system overview and analytics</p>
        </div>
        <div style={styles.headerStats}>
          <div style={styles.headerStat}>
            <span>🟢</span>
            <span>Last Updated: {new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab("overview")}
          style={{ ...styles.tab, ...(activeTab === "overview" && styles.activeTab) }}
        >
          📈 Overview
        </button>
        <button
          onClick={() => setActiveTab("users")}
          style={{ ...styles.tab, ...(activeTab === "users" && styles.activeTab) }}
        >
          👥 Users & Activity
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          style={{ ...styles.tab, ...(activeTab === "appointments" && styles.activeTab) }}
        >
          📅 Appointments
        </button>
        <button
          onClick={() => setActiveTab("marketplace")}
          style={{ ...styles.tab, ...(activeTab === "marketplace" && styles.activeTab) }}
        >
          🛒 Buy/Sell Data
        </button>
        <button
          onClick={() => setActiveTab("animals")}
          style={{ ...styles.tab, ...(activeTab === "animals" && styles.activeTab) }}
        >
          🐕 Animal List
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="animate-fade-in">
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statValue}>{stats.users.total}</div>
              <div style={styles.statLabel}>Total Users</div>
              <div style={styles.statDetails}>
                <span>👨‍⚕️ {stats.users.doctors} Doctors</span>
                <span>👤 {stats.users.patients} Patients</span>
                <span>👑 {stats.users.admins} Admins</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statValue}>{stats.appointments.total}</div>
              <div style={styles.statLabel}>Total Appointments</div>
              <div style={styles.statDetails}>
                <span>⏳ {stats.appointments.pending} Pending</span>
                <span>✅ {stats.appointments.confirmed} Confirmed</span>
                <span>❌ {stats.appointments.rejected} Rejected</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🛒</div>
              <div style={styles.statValue}>{stats.marketplace.totalListings}</div>
              <div style={styles.statLabel}>Marketplace Listings</div>
              <div style={styles.statDetails}>
                <span>💰 ₹{stats.marketplace.totalRevenue}</span>
                <span>📦 {stats.marketplace.totalSales} Sold</span>
                <span>⏳ {stats.marketplace.pendingOrders} Pending</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🐕</div>
              <div style={styles.statValue}>{stats.animals.total}</div>
              <div style={styles.statLabel}>Total Animals</div>
              <div style={styles.statDetails}>
                <span>✅ {stats.animals.available} Available</span>
                <span>🏠 {stats.animals.adopted} Adopted</span>
                <span>⏳ {stats.animals.pendingAdoption} Pending</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🔐</div>
              <div style={styles.statValue}>{activityCounts.total}</div>
              <div style={styles.statLabel}>Activity Events</div>
              <div style={styles.statDetails}>
                <span>🔓 {activityCounts.login} Logins</span>
                <span>🔒 {activityCounts.logout} Logouts</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>User Distribution</h3>
              <div style={styles.chartContainer}>
                <Doughnut data={userDistributionData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Appointment Status</h3>
              <div style={styles.chartContainer}>
                <Doughnut data={appointmentStatusData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Marketplace Overview</h3>
              <div style={styles.chartContainer}>
                <Bar data={marketplaceDataChart} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>Animal Status</h3>
              <div style={styles.chartContainer}>
                <Doughnut data={animalDataChart} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>🔄 Recent Activities</h3>
            <div style={styles.activityList}>
              {recentActivities.slice(0, 10).map((activity, idx) => (
                <div key={idx} style={styles.activityItem}>
                  <div style={styles.activityIcon}>
                    {activity.action === 'login' && '🔓'}
                    {activity.action === 'logout' && '🔒'}
                    {activity.action === 'appointment_created' && '📅'}
                    {activity.action === 'appointment_confirmed' && '✅'}
                    {activity.action === 'animal_listed' && '🐕'}
                    {activity.action === 'animal_sold' && '💰'}
                  </div>
                  <div style={styles.activityContent}>
                    <div style={styles.activityUser}>{activity.userEmail || activity.userName}</div>
                    <div style={styles.activityAction}>{activity.action}</div>
                    <div style={styles.activityTime}>{new Date(activity.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="animate-fade-in">
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>👥 All Users</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name || user.username || 'N/A'}</td>
                      <td>{user.email}</td>
                      <td>
                        <span style={{
                          ...styles.roleBadge,
                          backgroundColor: user.role === 'doctor' ? '#3b82f6' : user.role === 'admin' ? '#f59e0b' : '#10b981'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td><span style={styles.activeBadge}>🟢 Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Login/Logout Activity */}
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>🔐 Login/Logout Activity</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Action</th>
                    <th>Time</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.filter(a => a.action === 'login' || a.action === 'logout').map((activity) => (
                    <tr key={activity._id}>
                      <td>{activity.userName || 'N/A'}</td>
                      <td>{activity.userEmail}</td>
                      <td>
                        <span style={{
                          ...styles.actionBadge,
                          backgroundColor: activity.action === 'login' ? '#10b981' : '#ef4444'
                        }}>
                          {activity.action === 'login' ? '🔓 LOGIN' : '🔒 LOGOUT'}
                        </span>
                      </td>
                      <td>{new Date(activity.timestamp).toLocaleString()}</td>
                      <td>{activity.ipAddress || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div className="animate-fade-in">
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>📅 All Appointments</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Animal</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Emergency</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt._id}>
                      <td>{apt.ownerName}</td>
                      <td>{apt.email}</td>
                      <td>{apt.animalType}</td>
                      <td>{apt.doctorName || 'Not assigned'}</td>
                      <td>{new Date(apt.preferredDate).toLocaleDateString()}</td>
                      <td>{apt.preferredTime}</td>
                      <td>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: apt.status === 'Confirmed' ? '#10b981' : apt.status === 'Rejected' ? '#ef4444' : '#f59e0b'
                        }}>
                          {apt.status}
                        </span>
                      </td>
                      <td>{apt.emergency === 'Emergency' ? '🚨 Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor-wise Appointments */}
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>👨‍⚕️ Doctor-wise Appointments</h3>
            <div style={styles.doctorGrid}>
              {users.filter(u => u.role === 'doctor').map((doctor) => (
                <div key={doctor._id} style={styles.doctorCard}>
                  <div style={styles.doctorIcon}>👨‍⚕️</div>
                  <div style={styles.doctorName}>{doctor.name || doctor.email}</div>
                  <div style={styles.doctorStats}>
                    <span>📅 {appointments.filter(a => a.doctorId === doctor._id).length} Appointments</span>
                    <span>✅ {appointments.filter(a => a.doctorId === doctor._id && a.status === 'Confirmed').length} Confirmed</span>
                  </div>
                  <button 
                    onClick={() => getDoctorAppointments(doctor._id)}
                    style={styles.viewButton}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Doctor Appointments Modal */}
          {selectedDoctor && (
            <div style={styles.modal} onClick={() => setSelectedDoctor(null)}>
              <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h3>Doctor Appointments</h3>
                  <button onClick={() => setSelectedDoctor(null)} style={styles.closeButton}>✕</button>
                </div>
                <div style={styles.modalBody}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Animal</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorAppointments.map((apt) => (
                        <tr key={apt._id}>
                          <td>{apt.ownerName}</td>
                          <td>{apt.animalType}</td>
                          <td>{new Date(apt.preferredDate).toLocaleDateString()}</td>
                          <td>{apt.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Marketplace Tab - Buy/Sell Data */}
      {activeTab === "marketplace" && (
        <div className="animate-fade-in">
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>🛒 Marketplace Listings (Buy/Sell)</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Seller</th>
                    <th>Status</th>
                    <th>Listed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {marketplaceData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>{item.seller?.name || item.sellerEmail || 'N/A'}</td>
                      <td>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: item.status === 'sold' ? '#10b981' : item.status === 'pending' ? '#f59e0b' : '#3b82f6'
                        }}>
                          {item.status || 'Available'}
                        </span>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Marketplace Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💰</div>
              <div style={styles.statValue}>₹{stats.marketplace.totalRevenue}</div>
              <div style={styles.statLabel}>Total Revenue</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📦</div>
              <div style={styles.statValue}>{stats.marketplace.totalSales}</div>
              <div style={styles.statLabel}>Items Sold</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⏳</div>
              <div style={styles.statValue}>{stats.marketplace.pendingOrders}</div>
              <div style={styles.statLabel}>Pending Orders</div>
            </div>
          </div>
        </div>
      )}

      {/* Animals Tab */}
      {activeTab === "animals" && (
        <div className="animate-fade-in">
          <div style={styles.recentSection}>
            <h3 style={styles.sectionTitle}>🐕 Animal Listings</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Animal Name</th>
                    <th>Type</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Listed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {animalListings.map((animal) => (
                    <tr key={animal._id}>
                      <td>{animal.name}</td>
                      <td>{animal.type}</td>
                      <td>{animal.breed}</td>
                      <td>{animal.age} years</td>
                      <td>{animal.owner?.name || animal.ownerEmail || 'N/A'}</td>
                      <td>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: animal.status === 'available' ? '#10b981' : animal.status === 'adopted' ? '#8b5cf6' : '#f59e0b'
                        }}>
                          {animal.status || 'Available'}
                        </span>
                      </td>
                      <td>{new Date(animal.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  header: {
    background: 'white',
    borderRadius: '20px',
    padding: '25px 30px',
    marginBottom: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    color: '#666',
    marginTop: '5px'
  },
  headerStats: {
    display: 'flex',
    gap: '15px'
  },
  headerStat: {
    padding: '8px 15px',
    background: '#f3f4f6',
    borderRadius: '10px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  tabContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 24px',
    background: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#666',
    transition: 'all 0.3s'
  },
  activeTab: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statIcon: {
    fontSize: '40px',
    marginBottom: '10px'
  },
  statValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#667eea'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px'
  },
  statDetails: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#999',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  chartCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  chartTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#333'
  },
  chartContainer: {
    height: '250px'
  },
  recentSection: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    color: '#333'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  roleBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  actionBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  activeBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    background: '#d1fae5',
    color: '#065f46',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    background: '#f9fafb',
    borderRadius: '10px'
  },
  activityIcon: {
    fontSize: '24px'
  },
  activityContent: {
    flex: 1
  },
  activityUser: {
    fontWeight: 'bold',
    color: '#333'
  },
  activityAction: {
    fontSize: '12px',
    color: '#666'
  },
  activityTime: {
    fontSize: '11px',
    color: '#999'
  },
  doctorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  },
  doctorCard: {
    background: '#f9fafb',
    padding: '15px',
    borderRadius: '12px',
    textAlign: 'center'
  },
  doctorIcon: {
    fontSize: '40px'
  },
  doctorName: {
    fontWeight: 'bold',
    margin: '10px 0'
  },
  doctorStats: {
    fontSize: '12px',
    color: '#666',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '10px'
  },
  viewButton: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    width: '80%',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto'
  },
  modalHeader: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer'
  },
  modalBody: {
    padding: '20px'
  }
};

export default Dashboard;