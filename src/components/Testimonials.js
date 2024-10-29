import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Set default icon for Leaflet (to avoid missing marker icons)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedText, setExpandedText] = useState({}); // Track expanded text state
  const [expandedHeadline, setExpandedHeadline] = useState({}); // Track expanded headline state

  // Create the Contentful client using environment variables
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'testimonials',
        });
        setTestimonials(response.items);
        setLoading(false);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setError(true);
        setLoading(false);
      }
    };

    getTestimonials();
  }, [client]);

  const ensureHttps = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const handleReadMoreText = (index) => {
    setExpandedText((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleReadMoreHeadline = (index) => {
    setExpandedHeadline((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading testimonials. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="container max-w-screen-lg mx-auto py-16 px-6 lg:px-0">
      <h2 className="text-5xl font-extrabold text-center text-gray-100 mb-16">What People Are Saying</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg shadow-xl p-6 transform transition duration-500 hover:scale-105 hover:bg-gray-700 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Headline with text truncation and read more */}
            {testimonial.fields.headline && (
              <motion.h3
                className="text-2xl font-bold text-white mb-4"
                initial={{ height: expandedHeadline[index] ? 'auto' : '60px', overflow: 'hidden' }}
                animate={{ height: expandedHeadline[index] ? 'auto' : '60px' }}
                transition={{ duration: 0.5 }}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedHeadline[index] ? 'none' : 2, // Show only two lines
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {testimonial.fields.headline}
              </motion.h3>
            )}
            {/* "Read More" Button for headline */}
            {testimonial.fields.headline && testimonial.fields.headline.length > 60 && (
              <button
                onClick={() => handleReadMoreHeadline(index)}
                className="text-teal-400 underline mb-4"
              >
                {expandedHeadline[index] ? 'Show Less' : 'Show More'}
              </button>
            )}

            {/* Person Name */}
            {testimonial.fields.testimonialPersonName && (
              <p className="text-lg text-teal-400 font-semibold mb-2">{testimonial.fields.testimonialPersonName}</p>
            )}

            {/* Job Title */}
            {testimonial.fields.title && (
              <p className="text-sm text-gray-400 mb-4">{testimonial.fields.title}</p>
            )}

            {/* Full-width Square Profile Picture */}
            {testimonial.fields.TestimonialPersonImage && (
              <div className="w-full h-64 mb-4">
                <img
                  src={`https:${testimonial.fields.TestimonialPersonImage.fields.file.url}`}
                  alt={testimonial.fields.testimonialPersonName}
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              </div>
            )}

            {/* Full Testimonial with "Read More" Feature */}
            {testimonial.fields.fullTestimonial && (
              <div className="text-gray-300">
                <motion.p
                  initial={{ height: expandedText[index] ? 'auto' : '100px', overflow: 'hidden' }}
                  animate={{ height: expandedText[index] ? 'auto' : '100px' }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.fields.fullTestimonial}
                </motion.p>
                {/* "Read More" Button */}
                <button
                  onClick={() => handleReadMoreText(index)}
                  className="text-teal-400 underline mt-2"
                >
                  {expandedText[index] ? 'Read Less' : 'Read More'}
                </button>
              </div>
            )}

            {/* Testimonial Date */}
            {testimonial.fields.testimonialdate && (
              <p className="text-gray-400 text-sm mt-4">
                {new Date(testimonial.fields.testimonialdate).toLocaleDateString()}
              </p>
            )}

            {/* Contact Link */}
            {testimonial.fields.websiteLink1 && (
              <div className="flex justify-center mt-6">
                <FontAwesomeIcon icon={faLink} className="text-teal-400 mr-2" />
                <a
                  href={ensureHttps(testimonial.fields.websiteLink1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 underline hover:text-teal-300"
                >
                  Website
                </a>
              </div>
            )}

            {/* Star Rating */}
            <div className="flex justify-center items-center mt-6">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 mr-1" />
              ))}
            </div>

            {/* Map: Hidden by default and appears on hover */}
            {testimonial.fields.location && (
              <motion.div
                className="absolute inset-0 bg-gray-900 p-4 mt-4 hidden-on-hover"
                initial={{ height: 0, opacity: 0 }}
                whileHover={{ height: '200px', opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <MapContainer
                  center={[testimonial.fields.location.lat, testimonial.fields.location.lon]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg overflow-hidden"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[testimonial.fields.location.lat, testimonial.fields.location.lon]}>
                    <Popup>
                      {testimonial.fields.testimonialPersonName}'s Work Location
                    </Popup>
                  </Marker>
                </MapContainer>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
