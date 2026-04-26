import { useState } from "react";

export default function Slide2Prediction() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [aqi, setAqi] = useState(null);
  const [currentAqi, setCurrentAqi] = useState(null);
  const [loading, setLoading] = useState(false);

  const [disease, setDisease] = useState("");
  const [advice, setAdvice] = useState("");

  const stateCityMap = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Durg"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Navi Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Kohima", "Dimapur"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Varanasi", "Agra", "Prayagraj"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh"]
  };

  const handlePredict = async () => {
    if (!state || !city) {
      alert("Enter state and city");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state, city }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setCurrentAqi(data.current_aqi);
      setAqi(data.future_aqi);
      setDisease(data.disease);
      setAdvice(data.advice);
    } catch (err) {
      console.error(err);
      alert("Backend not working");
    }

    setLoading(false);
  };

  return (
    <section id="slide-2" className="h-screen snap-start relative">
      <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-y-auto">

        {/* HEADER */}
        <div className="absolute top-16 left-10 z-20">
          <div className="text-[10px] tracking-[0.3em] text-green-400 uppercase font-mono mb-3">
            ◈ SLIDE 02 / PREDICTION
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-extrabold leading-none">
            AQI <span className="text-green-400">PREDICTION</span> SYSTEM
          </h1>
        </div>

        {/* INPUT BOX — position:relative is the anchor for the result below */}
        <div className="z-20 flex flex-col gap-8 w-[700px] relative -translate-y-16">

          {/* INPUT ROW */}
          <div className="flex gap-10">
            <div className="flex flex-col w-1/2 group">
              <label className="text-xs tracking-widest text-green-400 mb-2 opacity-70">STATE</label>
              <input
                type="text"
                list="states"
                placeholder="Select state"
                value={state}
                onChange={(e) => { setState(e.target.value); setCity(""); }}
                className="bg-transparent text-white text-lg outline-none placeholder-gray-500"
              />
              <div className="h-[2px] bg-green-400/30 group-focus-within:bg-green-400 group-focus-within:shadow-[0_0_10px_#00ffcc] transition-all"></div>
              <datalist id="states">
                {Object.keys(stateCityMap).map((s) => <option key={s} value={s} />)}
              </datalist>
            </div>

            <div className="flex flex-col w-1/2 group">
              <label className="text-xs tracking-widest text-green-400 mb-2 opacity-70">CITY</label>
              <input
                type="text"
                list="cities"
                placeholder="Select city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent text-white text-lg outline-none placeholder-gray-500"
              />
              <div className="h-[2px] bg-green-400/30 group-focus-within:bg-green-400 group-focus-within:shadow-[0_0_10px_#00ffcc] transition-all"></div>
              <datalist id="cities">
                {(stateCityMap[state] || []).map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePredict}
            className="relative overflow-hidden px-10 py-3 font-semibold text-black bg-green-400 rounded-md transition hover:bg-green-300"
          >
            {loading ? "Predicting..." : "Predict Future AQI"}
            <span className="absolute inset-0 bg-green-400 opacity-20 blur-xl"></span>
          </button>

          {/* RESULT  */}
          <div
            className={`absolute top-[calc(100%+1.5rem)] left-0 w-full flex flex-col items-center gap-2 transition-opacity duration-500 ${
              aqi !== null ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-2xl font-bold text-green-400">
              {currentAqi !== null ? `Current AQI: ${currentAqi}` : ""}
            </p>

            <p className="text-2xl font-bold text-green-400">
              {aqi !== null ? `Future AQI (after 6 hours): ${aqi.toFixed(2)}` : ""}
            </p>

            <p className="text-2xl text-red-400 font-semibold">
              {disease && `Disease: ${disease}`}
            </p>

            {advice && (
              <div className="w-[520px] bg-gradient-to-br from-green-400/10 to-transparent border border-green-400/20 rounded-xl px-7 py-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,200,0.08)]">
                <p className="text-green-400 font-semibold text-lg mb-5 text-center tracking-wide">
                  Health Advice
                </p>
                <div className="flex flex-col gap-2">
                  {advice.split("\n").filter(line => line.trim() !== "").map((line, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-green-400 text-lg mt-[4px]">•</span>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {line.replace(/^[-•*]\s*/, "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,200,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,200,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-green-400 opacity-10 blur-3xl"></div>
      </div>
    </section>
  );
}