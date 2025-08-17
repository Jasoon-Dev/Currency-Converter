import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Feedback from "./pages/Feedback";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PHP");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get("https://open.er-api.com/v6/latest/USD").then((res) => {
      setCurrencies(Object.keys(res.data.rates));
    });
  }, []);

  const convert = async () => {
    if (!amount) {
      setResult(null);
      return;
    }
    const res = await axios.get(`https://open.er-api.com/v6/latest/${from}`);
    const rate = res.data.rates[to];
    setResult(
      (Number(amount) * rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  useEffect(() => {
    convert();
  }, [from, to, amount]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header/Navbar */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-600">💱 Converter</h1>
          <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/about" className="hover:text-indigo-600">About</Link>
            <Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link to="/feedback" className="hover:text-indigo-600">Feedback</Link>
          </nav>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2 px-6">
            <Link to="/" className="block text-gray-600 hover:text-indigo-600">Home</Link>
            <a href="#converter" className="block text-gray-600 hover:text-indigo-600">Converter</a>
            <Link to="/about" className="block text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="/privacy" className="block text-gray-600 hover:text-indigo-600">Privacy Policy</Link>
            <Link to="/feedback" className="block text-gray-600 hover:text-indigo-600">Feedback</Link>
          </div>
        )}
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <main className="flex-grow">
            <section id="home" className="flex flex-col items-center text-center py-20 text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Fast & Simple Currency Converter
              </h2>
              <p className="text-lg md:text-xl max-w-2xl">
                Get real-time exchange rates instantly. Convert between 100+ currencies
                with ease, right in your browser.
              </p>
            </section>
            <section className="flex items-center justify-center px-4 py-12" id="converter">
              <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Convert Currencies Instantly
                </h2>
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700">Enter Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="p-3 w-full border-2 border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">From</label>
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="p-3 w-full border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">To</label>
                    <select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="p-3 w-full border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
                    >
                      {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                    </select>
                  </div>
                </div>
                <div className="text-center mt-8 text-2xl font-bold text-gray-800">
                  {result && (
                    <>
                      {Number(amount).toLocaleString()} {from} ={" "}
                      <span className="text-indigo-600">{result} {to}</span>
                    </>
                  )}
                </div>
              </div>
            </section>
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Currency Converter. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-6 text-sm">
            <Link to="/about" className="hover:text-indigo-600">About</Link>
            <Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link to="/feedback" className="hover:text-indigo-600">Feedback</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
