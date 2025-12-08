import React, { useState } from 'react';
import './App.css';

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeRole, setActiveRole] = useState('exporter');
  const [formData, setFormData] = useState({
    username: '',
    iecNumber: '',
    password: '',
    confirmPassword: '',
    role: 'exporter'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign up logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Sign up data:', formData);
      alert(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} account created successfully!`);
    } else {
      // Sign in logic
      console.log('Sign in data:', { 
        username: formData.username, 
        password: formData.password 
      });
      alert(`Welcome back, ${formData.username}!`);
    }
  };

  const demoCredentials = {
    exporter: { username: 'greenvalley', password: 'exp123' },
    qaInspector: { username: 'rajesh', password: 'qa123' },
    admin: { username: 'admin', password: 'admin123' }
  };

  const fillDemoCredentials = (role) => {
    const credentials = demoCredentials[role];
    setFormData(prev => ({
      ...prev,
      username: credentials.username,
      password: credentials.password
    }));
    setActiveRole(role);
  };

  const roles = [
    { id: 'exporter', label: 'Exporter' },
    { id: 'qaInspector', label: 'QA Inspector' },
    { id: 'admin', label: 'Admin' }
  ];

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">🌾</div>
            <h1>Agricultural Quality Check Portal</h1>
          </div>
          <p className="tagline">Secure Digital Certification System</p>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="auth-card">
            {/* Toggle between Sign In and Sign Up */}
            <div className="auth-toggle">
              <button
                className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
              <button
                className={`toggle-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              
              {isSignUp && (
                <div className="role-selection">
                  <label>Select Role</label>
                  <div className="role-buttons">
                    {roles.map(role => (
                      <button
                        key={role.id}
                        type="button"
                        className={`role-btn ${formData.role === role.id ? 'active' : ''}`}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, role: role.id }));
                          setActiveRole(role.id);
                        }}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Username / IEC Number Field */}
              <div className="form-group">
                <label htmlFor="username">
                  {isSignUp && formData.role === 'exporter' 
                    ? 'IEC Number' 
                    : 'Username / IEC Number'}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={
                    isSignUp && formData.role === 'exporter'
                      ? "Enter IEC number"
                      : "Enter username"
                  }
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                {isSignUp ? 'Create Account' : 'Login'}
              </button>

              {/* Demo Credentials Section */}
              {!isSignUp && (
                <div className="demo-section">
                  <h3>Demo Credentials:</h3>
                  <div className="demo-cards">
                    <div 
                      className={`demo-card ${activeRole === 'exporter' ? 'active' : ''}`}
                      onClick={() => fillDemoCredentials('exporter')}
                    >
                      <h4>Exporter</h4>
                      <p>greenvalley / exp123</p>
                    </div>
                    <div 
                      className={`demo-card ${activeRole === 'qaInspector' ? 'active' : ''}`}
                      onClick={() => fillDemoCredentials('qaInspector')}
                    >
                      <h4>QA Inspector</h4>
                      <p>rajesh / qa123</p>
                    </div>
                    <div 
                      className={`demo-card ${activeRole === 'admin' ? 'active' : ''}`}
                      onClick={() => fillDemoCredentials('admin')}
                    >
                      <h4>Admin</h4>
                      <p>admin / admin123</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Toggle Link */}
              <p className="toggle-link">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </form>
          </div>

          {/* Side Panel with Info */}
          <div className="info-panel">
            <div className="info-card">
              <h3>🌱 About the Portal</h3>
              <p>
                This portal provides secure digital certification for agricultural products. 
                Exporters can submit products for quality checks, QA inspectors can verify 
                and certify, while admins manage the entire system.
              </p>
              
              <h3>🔒 Secure Features</h3>
              <ul>
                <li>Digital certification with blockchain technology</li>
                <li>Real-time quality tracking</li>
                <li>Secure data encryption</li>
                <li>Multi-role access control</li>
              </ul>

              <h3>📋 IEC Number</h3>
              <p>
                For exporters, your Import Export Code (IEC) serves as your username. 
                This ensures unique identification and compliance with trade regulations.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2024 Agricultural Quality Check Portal. All rights reserved.</p>
          <p>Secure Digital Certification System v2.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;