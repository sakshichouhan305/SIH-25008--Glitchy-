import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    city: '',
    district: '',
    instituteName: '',
    role: 'Student'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Store user data
      localStorage.setItem('token', 'dummy-token'); // Add actual token logic
      localStorage.setItem('role', formData.role.toLowerCase());
      // Navigate to admin page
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-bold text-lg">SE</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">SurakshaEd</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Create your account to get started with disaster preparedness education.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.contactNumber}
              </p>
            )}
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
              />
              {errors.district && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.district}
                </p>
              )}
            </div>
          </div>

          {/* Institute Name */}
          <div>
            <input
              type="text"
              name="instituteName"
              placeholder="Institute Name"
              value={formData.instituteName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 text-sm"
            />
            {errors.instituteName && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.instituteName}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-700 text-sm"
            >
              <option value="Student" className="py-2">👨‍🎓 Student</option>
              <option value="Teacher" className="py-2">👨‍🏫 Teacher</option>
              <option value="Admin" className="py-2">👨‍💼 Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            🚀 Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-semibold ml-2 transition-colors duration-200 hover:underline"
            >
              Sign in here
            </button>
          </p>
          
          {/* Additional Footer Info */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Secure • Protected • Trusted Platform for Schools & Colleges in India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
