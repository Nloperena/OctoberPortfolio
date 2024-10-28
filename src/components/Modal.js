import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com'; // Import EmailJS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSms, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// Define animation variants
const modalVariants = {
  hidden: { y: '100vh', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.6, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // Stagger the animation for each input
      type: 'spring',
      stiffness: 50,
    },
  }),
};

// Floating circle animation with varied speed and offsets
const circleAnimation = (duration, delay, distance) => ({
  hidden: { y: 0 },
  visible: {
    y: [0, distance, 0],
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: duration,
      ease: 'easeInOut',
      delay: delay,
    },
  },
});

// Modal content animation variants
const modalContentVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const Modal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    budget: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null); // To track success or failure
  const [countdown, setCountdown] = useState(4); // Initial countdown state

  useEffect(() => {
    // Log environment variables on component mount
    console.log("User ID:", process.env.REACT_APP_EMAILJS_USER_ID);
    console.log("Service ID:", process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log("Template ID:", process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
  }, []);

  useEffect(() => {
    if (submitStatus === 'success') {
      // Start countdown when form is successfully submitted
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(intervalId); // Stop the interval once the countdown reaches 0
            closeModal(); // Close the modal
          }
          return prevCountdown - 1;
        });
      }, 1000); // Decrement every second
    }
  }, [submitStatus, closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: formData.name,
      user_phone: formData.phone,
      user_email: formData.email,
      message: formData.message,
      user_budget: formData.budget,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus('success');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setSubmitStatus('error');
      });
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:nicholasloperena@gmail.com';
  };

  const handleTextClick = () => {
    window.open('sms:+14077905891', '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        onClick={closeModal}
        className="fixed inset-0 bg-black z-40"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      ></motion.div>

      {/* Modal Container */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center p-8 z-50"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Floating Parallax Circles with opacity */}
        <motion.div
          className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400 rounded-full opacity-50"
          variants={circleAnimation(6, 0, 30)}
          initial="hidden"
          animate="visible"
        ></motion.div>
        <motion.div
          className="absolute top-20 -right-10 w-24 h-24 bg-blue-400 rounded-full opacity-50"
          variants={circleAnimation(4, 0.5, 20)}
          initial="hidden"
          animate="visible"
        ></motion.div>
        <motion.div
          className="absolute bottom-20 left-20 w-16 h-16 bg-pink-400 rounded-full opacity-50"
          variants={circleAnimation(5, 1, 25)}
          initial="hidden"
          animate="visible"
        ></motion.div>
        <motion.div
          className="absolute top-10 left-20 w-40 h-40 bg-yellow-400 rounded-full opacity-50"
          variants={circleAnimation(7, 1.2, 40)}
          initial="hidden"
          animate="visible"
        ></motion.div>
        <motion.div
          className="absolute bottom-10 right-20 w-28 h-28 bg-green-400 rounded-full opacity-50"
          variants={circleAnimation(5.5, 0.8, 35)}
          initial="hidden"
          animate="visible"
        ></motion.div>
        <motion.div
          className="absolute bottom-32 right-20 w-20 h-20 bg-red-400 rounded-full opacity-50"
          variants={circleAnimation(6.2, 1.5, 28)}
          initial="hidden"
          animate="visible"
        ></motion.div>

        {/* Modal Content */}
        <motion.div
          className="max-w-4xl p-8 rounded-lg shadow-lg combined-glassmorphic relative"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-6 rounded-lg">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-white">
                {submitStatus === 'error' ? (
                  <span>
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mr-2" />
                    Website is currently in maintenance mode. We're in the middle of an update so try these options below!
                  </span>
                ) : (
                  'Contact Me'
                )}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300 transition duration-150 text-3xl"
              >
                &times;
              </button>
            </div>

            {/* Conditional Rendering for Success or Error */}
            {submitStatus === 'success' ? (
              <motion.p
                className="text-green-500 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Your message has been sent successfully! Closing in {countdown} seconds.
              </motion.p>
            ) : submitStatus === 'error' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-white text-lg mb-4">
                  Oops, something went wrong! Please try sending a message through one of the options below.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleEmailClick}
                      className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>Send an Email</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleTextClick}
                      className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faSms} />
                      <span>Send a Text Message</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'phone', 'email', 'message', 'budget'].map((field, i) => (
                  <motion.div
                    key={field}
                    variants={inputVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    {field !== 'message' ? (
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        name={field}
                        placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none transition"
                        required={field !== 'budget'}
                      />
                    ) : (
                      <textarea
                        name={field}
                        placeholder="Your Message"
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none transition"
                        rows="4"
                        required
                      ></textarea>
                    )}
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.8)',
                  }}
                >
                  Get a Website
                </motion.button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Add wavy gradient animation and glassmorphic effect */}
      <style jsx>{`
        .combined-glassmorphic {
          background: linear-gradient(
            270deg,
            rgba(255, 0, 117, 0.4),
            rgba(255, 119, 205, 0.4),
            rgba(119, 170, 255, 0.4),
            rgba(0, 117, 255, 0.4)
          );
          background-size: 800% 800%;
          animation: gradient-flow 15s ease infinite;
          backdrop-filter: blur(15px); /* Stronger blur effect */
          background-color: rgba(255, 255, 255, 0.05); /* Lower transparency for the glass effect */
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 50% 100%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Modal;
