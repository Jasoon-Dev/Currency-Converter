import React from "react";

function About() {
  return (
    <main className="flex-grow bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-3xl mx-auto p-8 text-white">
        <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
          About Us
        </h1>
        <p className="mb-6 text-xl leading-relaxed text-center opacity-90">
          This Currency Converter was built to help people convert money quickly and
          easily between multiple currencies. Our mission is to provide reliable,
          real-time exchange rates to support travel, business, and everyday use.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-3">⚡ Simplicity & Speed</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          We believe in simplicity and speed — no clutter, just a clean and effective
          tool you can use anytime.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-3">🌍 Global Usage</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          Whether you are planning a trip abroad, making international purchases, or
          monitoring global market trends, our tool is designed to be your trusted
          companion.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-3">🔧 Continuous Improvement</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          Our team is dedicated to continuously improving accuracy, usability, and
          performance to ensure that you always have the most up-to-date exchange
          rates at your fingertips.
        </p>
        <p className="text-lg leading-relaxed opacity-95 font-medium mt-6 text-center">
          Thank you for using our Currency Converter — we hope it makes your life
          a little easier every day.
        </p>
      </div>
    </main>
  );
}

export default About;
