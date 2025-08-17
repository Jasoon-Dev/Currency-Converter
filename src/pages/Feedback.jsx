import React, { useState } from "react";
import emailjs from "emailjs-com";

function Feedback() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_13k2bot",
        "template_3hotmpe",
        formData,
        "sHWgwycl1U3n2sjQK"
      )
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
    <main className="flex-grow bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-3xl mx-auto p-8 text-white">
        <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
          Feedback
        </h1>
        <p className="text-center mb-6 text-xl leading-relaxed opacity-90">
          We value your thoughts! Send us your feedback or suggestions. Your input
          helps us improve and provide a better experience.
        </p>
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-white/90">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 w-full border-2 border-white/50 rounded-xl bg-white/10 placeholder-white/70 focus:ring-2 focus:ring-indigo-300 outline-none text-white"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-white/90">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 w-full border-2 border-white/50 rounded-xl bg-white/10 placeholder-white/70 focus:ring-2 focus:ring-indigo-300 outline-none text-white"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-white/90">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-3 w-full border-2 border-white/50 rounded-xl bg-white/10 placeholder-white/70 focus:ring-2 focus:ring-indigo-300 outline-none text-white"
              placeholder="Your message here..."
            ></textarea>
          </div>
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
