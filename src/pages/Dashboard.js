import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'https://student-authentication-backend.onrender.com/api/dashboard',
          {
            headers: { Authorization: token }
          }
        );
        setUser(res.data);
        setCourse(res.data.course);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [token, navigate]); // ✅ FIXED

  const updateCourse = async () => {
    try {
      await axios.put(
        'https://student-authentication-backend.onrender.com/api/update-course',
        { course },
        { headers: { Authorization: token } }
      );
      alert("Course updated");
    } catch {
      alert("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        'https://student-authentication-backend.onrender.com/api/update-password',
        { oldPassword, newPassword },
        { headers: { Authorization: token } }
      );
      alert("Password updated");
    } catch {
      alert("Error updating password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Dashboard</h2>

        {user && (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>

            <h3>Update Course</h3>
            <input
              value={course}
              style={styles.input}
              onChange={e => setCourse(e.target.value)}
            />
            <button style={styles.button} onClick={updateCourse}>
              Update Course
            </button>

            <h3>Update Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              style={styles.input}
              onChange={e => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              style={styles.input}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button style={styles.button} onClick={updatePassword}>
              Update Password
            </button>
          </>
        )}

        <br />

        <button
          style={styles.button}
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f3f0ff'
  },
  card: {
    padding: '25px',
    width: '320px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    textAlign: 'center'
  },
  input: {
    width: '90%',
    margin: '8px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 15px',
    marginTop: '10px',
    backgroundColor: '#7c73e6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(124,115,230,0.4)'
  }
};

export default Dashboard;