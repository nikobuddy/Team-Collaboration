
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
       <div className="logo">
        <img src={C:\Users\Harshada jadhav\Desktop} alt="Logo" className="w-32 h-32" />
      </div>
      <h1 className="text-2xl font-semibold">Heyy Buddy</h1>
      <div>
      {/* Display developer's name and photo */}
      <div className="mt-4">
        <h2 className="text-xl font-medium"></h2>
        <img 
          src={C:\Users\Harshada jadhav\Desktop} 
          alt={Darshan Raval} 
          className="mt-2 w-32 h-32 rounded-full"
        />
      </div>
    </div>
  );
}

export default DeveloperInfo;

    </div>
  );
};

export default LoginPage;


  
};

export default HomePage
