import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <>
      <main className="bg-white min-h-screen text-gray-800 p-4">
        <section className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">Our Story</h1>
          <p className="mb-6">
            PartySafe was born from a young entrepreneur's journey in Berlin. After living in this vibrant city for over 8 years, I couldn't ignore the prevalence of drugs misuse and overuse in clubs and festivals. The idea to provide accurate and accessible information about drugs took shape during my time at Spiced Academy's Full Stack Web Development bootcamp in Berlin.
          </p>
          <p className="mb-6">
            With a commitment to harm reduction and the goal of making drug use safer, PartySafe began its journey. Our mission is to empower individuals with reliable drug testing kits and harm reduction resources, creating a safer and more informed community in recreational settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Where We Are Now</h2>
          <p className="mb-6">
            At PartySafe, we are still in the early stages of bringing our vision to life. Our journey has just begun, and we are excited to take steps towards enhancing the safety and well-being of individuals in recreational settings. While we continue to grow and evolve, our commitment to harm reduction and promoting safer drug use practices remains steadfast.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to make drug use safer for everyone. We believe that everybody has the right to know what's inside the drugs they are consuming. Our goal is to provide drug kit tests that empower individuals to make informed decisions about their drug use. By offering reliable testing solutions, we aim to promote safer drug use practices and create a more responsible and conscious community.
          </p>
          <p className="mb-6">
            Our commitment extends to providing accurate and easy-to-use testing solutions to enhance safety and well-being. We are driven by the belief that harm reduction is essential, and every individual deserves the tools to make informed choices.
          </p>
        </section>

        <div className="text-center mb-4">
          <a href="mailto:info@partysafe.app" className="text-blue-500 hover:underline transition duration-300" title="Contact Us: info@partysafe.app">
            Contact Us: info@partysafe.app
          </a>
        </div>
      </main>
    </>
  );
}

export default About;
