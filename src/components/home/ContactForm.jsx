import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this field when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: data.message || 'Your message has been sent successfully!'
                });
                // Reset form after successful submission
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.error || 'Failed to send message. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                type: 'error',
                message: 'An error occurred. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            <div className="flex max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-xl">
                {/* Left Section - Purple */}
                <div className="bg-purple-600 text-white p-16 w-2/5 flex flex-col justify-between min-h-[600px]">
                    <div>
                        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
                        <p className="text-lg mb-12 leading-relaxed">
                            For exhibition inquiries, commissions, or collaboration opportunities, please reach out to us.
                        </p>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Email</h2>
                            <p className="text-lg">studio@abbasisters.art</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Gallery Representation</h2>
                            <p className="text-lg">Contemporary Visions Gallery</p>
                            <p className="text-lg">New York & Berlin</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
                        <div className="flex space-x-4">
                            <Instagram className="w-8 h-8 hover:opacity-70 cursor-pointer transition-opacity" />
                            <Facebook className="w-8 h-8 hover:opacity-70 cursor-pointer transition-opacity" />
                            <Twitter className="w-8 h-8 hover:opacity-70 cursor-pointer transition-opacity" />
                            <Youtube className="w-8 h-8 hover:opacity-70 cursor-pointer transition-opacity" />
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="bg-white p-16 w-3/5 min-h-[600px]">
                    <h2 className="text-2xl font-bold text-black mb-8">Send a Message</h2>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your email address"
                                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your message"
                                rows={5}
                                className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none bg-white`}
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                            )}
                        </div>

                        {submitStatus && (
                            <div className={`p-3 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
