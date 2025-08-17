import React from "react";

function Privacy() {
  return (
    <main className="flex-grow bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-3xl mx-auto p-8 text-white">
        <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
          Privacy Policy
        </h1>
        <p className="mb-6 text-xl leading-relaxed text-center opacity-90">
          Your privacy matters to us. This app is designed to give you safe,
          simple, and secure access to currency conversions without collecting
          personal information.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">🔒 Data Collection</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          We do not collect or store personal data. All conversions are processed
          in real-time using trusted exchange rate APIs.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">🍪 Cookies & Tracking</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          We do not use cookies or tracking technologies. Your usage is anonymous
          and secure.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">💳 Financial Data</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          No financial or personal details are ever saved on our servers. Your
          inputs are only used to calculate the result instantly on-screen.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">🌍 Third-Party APIs</h2>
        <p className="mb-4 text-lg leading-relaxed opacity-90">
          We rely on reputable third-party APIs for currency data, but we do not
          share your activity or data with them beyond the necessary request to
          fetch exchange rates.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">📩 Contact Us</h2>
        <p className="text-lg leading-relaxed opacity-95 font-medium">
          If you have concerns about privacy or security while using this
          application, please reach out to us. Your trust and confidence are very
          important to us.
        </p>
      </div>
    </main>
  );
}

export default Privacy;
