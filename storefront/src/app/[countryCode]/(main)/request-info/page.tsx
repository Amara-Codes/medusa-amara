"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RequestInfoForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    notes: '',
    privacyAccepted: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Example of a simulated API call
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      setLoading(false);
      setSubmitted(true);
      
      // Redirect to a thank-you page after submission
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit form', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Request Product Info</h2>

        {/* First Name and Last Name on the same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Email and Phone on the same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]*"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block font-semibold">City</label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block font-semibold">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-24"
          />
        </div>

        {/* Privacy Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="privacyAccepted"
            required
            checked={formData.privacyAccepted}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="privacyAccepted" className="text-sm">
            I accept the <Link href="/privacy-policy" className="text-blue-600 underline">privacy policy</Link>
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading || submitted} 
          className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : submitted ? 'Thanks!' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default RequestInfoForm;
