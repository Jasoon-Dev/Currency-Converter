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
            <div className="md:hidden mt-4 space-y-2 px-6 text-center">
              <Link to="/" className="block hover:text-indigo-400">Home</Link>
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
              <section
                  id="home"
                  className="hidden md:flex flex-col items-center text-center py-20 text-amber-50">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Fast & Simple Currency Converter
                  </h2>
                  <p className="text-lg md:text-xl max-w-2xl">
                    Get real-time exchange rates instantly. Convert between 100+ currencies with
                    ease, right in your browser.
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
              
                      {/* More Tools Section 1*/}
              <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto text-center mb-8">
                  <h2 className="text-3xl font-extrabold mb-4  text-white">
                    More Tools
                  </h2>
                  <p className=" text-white">
                    Explore our other useful tools to make your life easier.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

                  {/* BMI Calculator 1*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Grade Calculator | GPA Tracker</h3>
                      <p className="mb-4">
                        Easily calculate your grades and track your GPA to stay on top of your academic progress.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-fuchsia-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                    Coming Soon
                    </Link>
                  </div>
                  {/* BMI Calculator 2*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Quiz & Assignment Generator</h3>
                      <p className="mb-4">
                        Teachers input topics, and generates random multiple-choice or short-answer questions.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>
                  {/* BMI Calculator 3*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Homework | Assignment Submission Portal</h3>
                      <p className="mb-4">
                        A simple portal where students can upload assignments / homeworks and teachers can check them anytime.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-green-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>
                  
                  {/* BMI Calculator 4*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Random Group Generator</h3>
                      <p className="mb-4">
                        Teachers can input a list of students, and it randomly creates groups for projects or activities.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>

                  {/* Unit Converter 5*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Unit Converter</h3>
                      <p className="mb-4">
                        Convert between hundreds of units across 30+ categories with precision and ease like length, weight, temperature, and more.
                      </p>
                    </div>
                    <Link
                      to="https://unitconverterjs.vercel.app/"
                      className="mt-4 inline-block px-4 py-2 bg-white text-cyan-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Try Now
                    </Link>
                  </div>

                  {/* Loan Calculator 6*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Scientific Calculator</h3>
                      <p className="mb-4">
                        Perform advanced mathematical calculations quickly and accurately in one easy tool.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-pink-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>

                  {/* Tip Calculator 7*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">PDF | WORD | EXCEL | PPT | IMG Conversion</h3>
                      <p className="mb-4">
                        PDF ⇆ Word | PDF ⇆ Excel | PDF ⇆ PowerPoint | PDF ⇆ Image | Word ⇆ PDF | Excel ⇆ PDF | PowerPoint ⇆ PDF
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-yellow-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>

                  {/* BMI Calculator 8*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Name Picker</h3>
                      <p className="mb-4">
                        Quickly pick a random name from a list for draws, raffles, or classroom activities.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>
                  {/* Loan Calculator 9*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Password Generator</h3>
                      <p className="mb-4">
                        Create strong, secure, and random passwords to protect your accounts. Ensure your online safety with unique passwords generated in seconds.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-lime-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>

                  {/* Tip Calculator 10*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Loan Calculator</h3>
                      <p className="mb-4">
                        Easily estimate your monthly loan payments with our Loan Calculator. Plan your finances better by calculating interest, total cost, and repayment schedules.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>

                  {/* BMI Calculator 11*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">QR Code Generator</h3>
                      <p className="mb-4">
                        Create custom QR codes instantly with our QR Code Generator. Share links, text, or contact details in a fast and scannable way.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-teal-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
                  </div>
                  {/* BMI Calculator 12*/}
                  <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center text-white bg-gradient-to-brfrom-gray-400 via-gray-500 to-gray-600  flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Electric Bill Calculator</h3>
                      <p className="mb-4">
                        Quickly estimate your monthly electricity costs with our Electric Bill Calculator. Enter your usage and rates to see how much you’ll need to pay.
                      </p>
                    </div>
                    <Link
                      to=""
                      className="mt-4 inline-block px-4 py-2 bg-white text-gray-600 font-bold rounded-full hover:bg-gray-200 transition"
                    >
                      Coming Soon
                    </Link>
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
