import React, { useState } from "react";
import emailjs from "emailjs-com";

function Feedback({ darkMode }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send("service_13k2bot", "template_3hotmpe", formData, "sHWgwycl1U3n2sjQK")
      .then(
        () => {
          alert("✅ Feedback sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("❌ Failed to send. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <main className={`flex-grow ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-gray-900"}`}>
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg text-white">
          Feedback
        </h1>
        <p className={`text-center mb-6 text-xl leading-relaxed ${darkMode ? "text-gray-300" : "text-white/90"}`}>
          We value your thoughts! Send us your feedback or suggestions. Your input
          helps us improve and provide a better experience.
        </p>
        <form onSubmit={sendEmail} className="space-y-6">
          {["name","email","message"].map((field, idx) => (
            <div key={idx}>
              <label className={`block mb-2 font-medium ${darkMode ? "text-gray-300" : "text-white/90"}`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== "message" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder={field === "name" ? "Your Name" : "your@email.com"}
                  className={`p-3 w-full border-2 rounded-xl focus:ring-2 outline-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                      : "bg-white/10 border-white/50 text-white focus:ring-indigo-300"
                  }`}
                />
              ) : (
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  className={`p-3 w-full border-2 rounded-xl focus:ring-2 outline-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                      : "bg-white/10 border-white/50 text-white focus:ring-indigo-300"
                  }`}
                ></textarea>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600/90 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Send Feedback
          </button>
        </form>
      </div>
    </main>
  );
}

export default Feedback;
