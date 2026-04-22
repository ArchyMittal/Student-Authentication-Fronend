import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('https://student-authentication-backend.onrender.com/api/register', data);
      alert("Registered");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>

        <input placeholder="Name" style={styles.input}
          onChange={e => setData({...data, name: e.target.value})} />

        <input placeholder="Email" style={styles.input}
          onChange={e => setData({...data, email: e.target.value})} />

        <input type="password" placeholder="Password" style={styles.input}
          onChange={e => setData({...data, password: e.target.value})} />

        <input placeholder="Course" style={styles.input}
          onChange={e => setData({...data, course: e.target.value})} />

        <button style={styles.button} onClick={handleSubmit}>
          Register
        </button>

        <p style={styles.link} onClick={() => navigate('/login')}>
          Already have account? Login
        </p>
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
    width: '300px',
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
  },
  link: {
    marginTop: '10px',
    color: '#7c73e6',
    cursor: 'pointer'
  }
};

export default Register;