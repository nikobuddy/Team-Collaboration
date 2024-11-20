
const HomePage = () => {
  return <div>
    <h1 className="text-2xl font-bold">Welcome to Bike Builders!</h1>
    <p className="mt-2">This is your dashboard.</p>
    <img src="C:\Users\Harshada jadhav\Desktop" alt="Team" />
    <p className="mt-2">This is your dashboard.</p>  
  </div>;
  import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    
    setError('');

    
    console.log('Email:', email);
    console.log('Password:', password);

   
    alert('Login successful!');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Heyy Buddy</h1>
    </div>
  );
};

export default LoginPage;


  
};

export default HomePage
