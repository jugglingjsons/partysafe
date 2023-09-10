import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter to handle the redirection
import Image from 'next/image';

const AuthAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Simulate the animation delay
    setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // Adjust the duration as needed
  }, []);

  // Function to handle the redirection to the homepage
  const redirectToHomepage = () => {
    router.push('/'); // Replace '/' with the actual URL of your homepage (index.js)
  };

  return (
    <div className={`auth-animation ${animationComplete ? 'fade-out' : ''}`}>
      {/* Display the logo larger */}
      <Image
  src="/newlogo2.png" // Specify the path to your logo image
  alt="Your Logo"     // Add an alt text for accessibility
  width={100}         // Set the width of the image
  height={100}        // Set the height of the image
  className="newlogo2" // Apply any styling needed for your logo
  onClick={redirectToHomepage} // Add click event to redirect to the homepage
  style={{ cursor: 'pointer' }} // Change cursor style to indicate clickability
/>
      {/* Your slogan */}
      <div className="slogan">
        Stop wondering what’s inside your drugs. Start making informed decisions.
      </div>
      {/* Your homepage content */}
      <div className="homepage-content">
        {/* Content of your homepage */}
      </div>
    </div>
  );
};

export default AuthAnimation;
