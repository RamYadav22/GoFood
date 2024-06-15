import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  // State for user credentials
  // userCredential se credentials;
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "", // Changed 'geolocation' to 'location'
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior syntehetic evenet


    try {
      console.log(window.location.href)
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location, // Changed 'geolocation' to 'location'
        }),
      });
      console.log('second inside the singup try')
      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert('You successfully Registered');
      }
    } catch (error) {
      //console.error('Error:', error);
      alert('error i signup---', error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    setcredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            value={credentials.name}
            onChange={handleInputChange} // Use the separate input change handler
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='location' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            name='location'
            value={credentials.location}
            onChange={handleInputChange}
          />
        </div>

        <button type='submit' className='m-3 btn btn-primary'>
          Submit
        </button>
        <Link to='/login' className='m-3 btn btn-danger'>
          Already a user
        </Link>
      </form>
    </div>
  );
}