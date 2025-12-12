import React, { useState } from 'react';
import './App.css';

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeRole, setActiveRole] = useState('exporter');
  const [formData, setFormData] = useState({
    username: '',
    iecNumber: '',
    email: '',
    phone: '',
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
    
      // Reset form after successful signup
      setFormData({
        username: '',
        iecNumber: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'exporter'
      });
    
    } else {
      // Sign in logic
      console.log('Sign in data:', { 
        username: formData.username, 
        password: formData.password 
      });
      alert(`Welcome back, ${formData.username || formData.email}!`);

      // Reset form after successful signin
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    }
  };

  const demoCredentials = {
    exporter: { username: 'greenvalley', email: 'greenvalley@agri.com', password: 'exp123' },
    qaInspector: { username: 'rajesh', email: 'rajesh@qa.com', password: 'qa123' },
    admin: { username: 'admin', email: 'admin@agriportal.com', password: 'admin123' }
  };

  const fillDemoCredentials = (role) => {
    const credentials = demoCredentials[role];
    setFormData(prev => ({
      ...prev,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      role: role
    }));
    setActiveRole(role);
  };

  const roles = [
    { id: 'exporter', label: 'Exporter', icon: '🚜' },
    { id: 'qaInspector', label: 'QA Inspector', icon: '🔍' },
    { id: 'admin', label: 'Admin', icon: '👨‍💼' }
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
                type="button"
              >
                Sign In
              </button>
              <button
                className={`toggle-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(true)}
                type="button"
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              
              {isSignUp && (
                <div className="role-selection">
                  <label>Select Your Role</label>
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
                        <span className="role-icon">{role.icon}</span>
                        <span className="role-label">{role.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username">
                  {isSignUp && formData.role === 'exporter' 
                    ? 'IEC Number' 
                    : 'Username / Email'}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={
                    isSignUp && formData.role === 'exporter'
                      ? "Enter IEC number"
                      : "Enter username or email"
                  }
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Address Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone Number Field (Sign Up only) */}
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="phone-input">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <small className="input-hint">Enter 10-digit mobile number</small>
                </div>
              )}

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                />
                {isSignUp && (
                  <small className="input-hint">Minimum 6 characters</small>
                )}
              </div>

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    minLength="6"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                {isSignUp ? 'Create Account' : 'Login'}
              </button>

              {/* Demo Credentials Section - Sign In only */}
              {!isSignUp && (
                <div className="demo-section">
                  <h3>Demo Credentials:</h3>
                  <div className="demo-cards">
                    <div 
                      className={`demo-card ${activeRole === 'exporter' ? 'active' : ''}`}
                      onClick={() => fillDemoCredentials('exporter')}
                    >
                      <div className="demo-icon">🚜</div>
                      <div className="demo-info">
                        <h4>Exporter</h4>
                        <p className="demo-cred">greenvalley / exp123</p>
                        <p className="demo-email">greenvalley@agri.com</p>
                      </div>
                    </div>
                    <div 
                      className={`demo-card ${activeRole === 'qaInspector' ? 'active' : ''}`}
                      onClick={() => fillDemoCredentials('qaInspector')}
                    >
                      <div className="demo-icon">🔍</div>
                      <div className="demo-info">
                        <h4>QA Inspector</h4>
                        <p className="demo-cred">rajesh / qa123</p>
                        <p className="demo-email">rajesh@qa.com</p>
                      </div>
                    </div>
                    <div 
                      className={`demo-card ${activeRole === 'admin' ? 'active' : ''}`}
                      onClick={() => fillDemoCredentials('admin')}
                    >
                      <div className="demo-icon">👨‍💼</div>
                      <div className="demo-info">
                        <h4>Admin</h4>
                        <p className="demo-cred">admin / admin123</p>
                        <p className="demo-email">admin@agriportal.com</p>
                      </div>
                    </div>
                  </div>
                  <p className="demo-hint">Click any card to auto-fill credentials</p>
                </div>
              )}

              {/* Divider */}
              <div className="divider">
                <span>or</span>
              </div>

              {/* Toggle Link */}
              <p className="toggle-link">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? 'Sign In here' : 'Sign Up here'}
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
                <li>Secure Digital Certification</li>
                <li>Real-time Quality Tracking</li>
                <li>Secure data encryption</li>
                <li>Export Compliance Management</li>
                <li>Multi-User Access Control</li>
                <li>Blockchain Verification</li>
                <li>Mobile Responsive</li>
              </ul>

              <h3>📋 Required for Sign Up</h3>
              <p>
                For exporters, your Import Export Code (IEC) serves as your username. 
                This ensures unique identification and compliance with trade regulations.
              </p>
              <div className="requirements">
                <div className="requirement-item">
                  <span className="req-icon">✓</span>
                  <span>Valid Email Address</span>
                </div>
                <div className="requirement-item">
                  <span className="req-icon">✓</span>
                  <span>Indian Mobile Number</span>
                </div>
                <div className="requirement-item">
                  <span className="req-icon">✓</span>
                  <span>Secure Password (6+ chars)</span>
                </div>
                {formData.role === 'exporter' && (
                  <div className="requirement-item">
                    <span className="req-icon">✓</span>
                    <span>IEC Number (for Exporters)</span>
                  </div>
                )}
              </div>

              <h3>🔒 Security Notice</h3>
              <p className="security-notice">
                All credentials are encrypted. Never share your password with anyone.
                The portal uses industry-standard SSL encryption for all data transfers.
              </p>

              <div className="contact-support">
                <h3>📞 Need Help?</h3>
                <p>Contact support: <strong>1800-AGR-PORTAL</strong></p>
                <p>Email: <strong>support@agriquality.gov.in</strong></p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>© 2024 Agricultural Quality Check Portal. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact Us</a>
            </div>
            <p className="version">Secure Digital Certification System v3.1</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
