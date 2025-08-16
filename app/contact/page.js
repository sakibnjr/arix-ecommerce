import Header from '../components/Header';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';
import { AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment, AiOutlineClockCircle, AiOutlineMessage } from 'react-icons/ai';

export default function ContactPage() {
  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Send us a message anytime',
      contact: 'support@arix.com',
      action: 'mailto:support@arix.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+88 01235 456789',
      action: 'tel:+8801235456789',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Visit Us',
      description: 'Our office location',
      contact: 'Dhaka, Bangladesh',
      action: '#',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">Contact</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h1 className="font-display text-display-lg md:text-display-xl lg:text-7xl text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-body-xl md:text-body-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
              Get in Touch
            </h2>
            <p className="text-body-xl text-gray-700 max-w-3xl mx-auto">
              Choose your preferred way to reach us. We're here to help with any questions about our products or services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className="text-center group"
              >
                <div className={`bg-gradient-to-br ${method.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {index === 0 && <AiOutlineMail className="w-10 h-10 text-white" />}
                  {index === 1 && <AiOutlinePhone className="w-10 h-10 text-white" />}
                  {index === 2 && <AiOutlineEnvironment className="w-10 h-10 text-white" />}
                </div>
                <h3 className="text-heading-lg font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-body-md text-gray-600 mb-4">{method.description}</p>
                <a
                  href={method.action}
                  className="inline-flex items-center text-body-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {method.contact}
                  <HiChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-8 leading-tight">
                Contact Information
              </h2>
              
              <div className="space-y-8 mb-8">
                <div className="flex items-start">
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <AiOutlineMail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-md font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-body-lg text-gray-600 mb-2">support@arix.com</p>
                    <p className="text-body-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <AiOutlinePhone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-md font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-body-lg text-gray-600 mb-2">+88 01235 456789</p>
                    <p className="text-body-sm text-gray-500">Available during business hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <AiOutlineEnvironment className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-md font-semibold text-gray-900 mb-2">Office Location</h3>
                    <p className="text-body-lg text-gray-600 mb-2">Dhaka, Bangladesh</p>
                    <p className="text-body-sm text-gray-500">Visit us for in-person support</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                    <AiOutlineClockCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-heading-lg font-semibold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-body-md font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-body-md text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                    <AiOutlineMessage className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-heading-lg font-semibold text-gray-900">Send Message</h2>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 resize-none"
                      placeholder="Tell us more details about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-body-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-body-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              Can't find what you're looking for? Check out our FAQ section or contact us directly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-heading-md font-semibold text-gray-900 mb-3">How long does shipping take?</h3>
                <p className="text-body-md text-gray-600">
                  Standard shipping takes 3-5 business days within Bangladesh. International shipping varies by location.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-heading-md font-semibold text-gray-900 mb-3">What's your return policy?</h3>
                <p className="text-body-md text-gray-600">
                  We offer a 30-day return policy for unworn items in original condition. Contact us for return instructions.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-heading-md font-semibold text-gray-900 mb-3">Do you ship internationally?</h3>
                <p className="text-body-md text-gray-600">
                  Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-heading-md font-semibold text-gray-900 mb-3">Are your products authentic?</h3>
                <p className="text-body-md text-gray-600">
                  Absolutely! All our products are officially licensed and authentic, ensuring the highest quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
