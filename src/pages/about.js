// pages/about.js
import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
        <div className="bg-white min-h-screen text-gray-800">
            <header className="flex flex-col items-center justify-center py-6 bg-white shadow-md">
                <Image src="/logo.png" alt="PartySafe Logo" width={550} height={550} />
            </header>

            <main className="p-4">
                <h1 className="text-2xl font-semibold mb-4">About Us</h1>
                <p className="mb-6">
                    At PartySafe, our mission is to make drug use safer for everyone. We believe that everybody has the right to know what's inside the drugs they are consuming. Our goal is to provide drug kit tests that empower individuals to make informed decisions about their drug use.
                </p>
                <p className="mb-6">
                    Our drug kit tests are designed to help you understand the composition of your drugs, identify potential risks, and reduce harm. By offering reliable testing solutions, we aim to promote safer drug use practices and create a more responsible and conscious community.
                </p>
                <h2 className="text-xl font-semibold mb-2">What are Drug Kit Tests?</h2>
                <p className="mb-6">
                    Drug kit tests, also known as reagent tests or pill testing, involve using chemical reagents to analyze the composition of a substance. These tests can provide valuable information about the presence of certain substances and help users identify potential adulterants or contaminants in their drugs.
                </p>
                <p className="mb-6">
                    By using our drug kit tests, you can gain insights into the composition of your substances and make informed choices to minimize potential risks. We are committed to providing you with accurate and easy-to-use testing solutions to enhance your safety and well-being.
                </p>
            </main>
        </div>
    );
}

export default About;
