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
  const [darkMode, setDarkMode] = useState(false);

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

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    convert();
  }, [from, to, amount]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-gray-900"} min-h-screen flex flex-col`}>

      {/* Header/Navbar */}
      <header className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-md py-4 px-6 sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold text-indigo-600 cursor-pointer">💱 Converter</Link>
          <nav className="hidden md:flex gap-6 font-medium">
            <Link to="/" className="hover:text-indigo-400">Home</Link>
            <Link to="/about" className="hover:text-indigo-400">About</Link>
            <Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link>
            <Link to="/feedback" className="hover:text-indigo-400">Feedback</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✖" : "☰"}
            </button>
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700" onClick={toggleDarkMode}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2 px-6">
            <Link to="/" className="block hover:text-indigo-400">Home</Link>
            <a href="#converter" className="block hover:text-indigo-400">Converter</a>
            <Link to="/about" className="block hover:text-indigo-400">About</Link>
            <Link to="/privacy" className="block hover:text-indigo-400">Privacy Policy</Link>
            <Link to="/feedback" className="block hover:text-indigo-400">Feedback</Link>
          </div>
        )}
      </header>

      {/* Routes */}
      <Routes>
        {/* Home/Converter */}
        <Route path="/" element={
          <main className="flex-grow">
            {/* Hero Section */}
            <section id="home" className="flex flex-col items-center text-center py-20 text-amber-50">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Fast & Simple Currency Converter
              </h2>
              <p className="text-lg md:text-xl max-w-2xl">
                Get real-time exchange rates instantly. Convert between 100+ currencies with ease, right in your browser.
              </p>
            </section>

            {/* Converter Section */}
            <section className="flex items-center justify-center px-4 py-12" id="converter">
              <div className={`shadow-2xl rounded-2xl p-8 w-full max-w-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Convert Currencies Instantly
                </h2>

                <div className="mb-6">
                  <label className="block mb-2 font-medium">Enter Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={`p-3 w-full border-2 rounded-xl focus:ring-2 outline-none text-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500" : "border-indigo-300 focus:ring-indigo-500"}`}
                  />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1">
                    <label className="block mb-2 font-medium">From</label>
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className={`p-3 w-full border-2 rounded-xl focus:ring-2 outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500" : "border-purple-300 focus:ring-purple-500"}`}
                    >
                      {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                    </select>
                  </div>

                  <button onClick={swapCurrencies} className="p-3 bg-indigo-500 text-white rounded-full mt-7 hover:bg-indigo-600 transition">
                    ⇅
                  </button>

                  <div className="flex-1">
                    <label className="block mb-2 font-medium">To</label>
                    <select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className={`p-3 w-full border-2 rounded-xl focus:ring-2 outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500" : "border-pink-300 focus:ring-pink-500"}`}
                    >
                      {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                    </select>
                  </div>
                </div>

                <div className="text-center mt-8 text-2xl font-bold">
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

        {/* About, Privacy, Feedback */}
        <Route path="/about" element={<About darkMode={darkMode} />} />
        <Route path="/privacy" element={<Privacy darkMode={darkMode} />} />
        <Route path="/feedback" element={<Feedback darkMode={darkMode} />} />
      </Routes>

      {/* Footer */}
      <footer className={`shadow-inner py-6 mt-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-600"}`}>
        <div className="max-w-6xl mx-auto text-center">
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
