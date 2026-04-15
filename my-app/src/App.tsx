import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("calculator");

  const [footage, setFootage] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchens, setKitchens] = useState("");
  const [total, setTotal] = useState(0);
  const [hasFridge, setHasFridge] = useState("");
  const [hasOven, setHasOven] = useState("");
  const [hasWindow, setHasWindow] = useState("");
  const [hasSteam, setHasSteam] = useState("");

  const [rates, setRates] = useState(() => {
    const savedRates = localStorage.getItem("rates");
    return savedRates
      ? JSON.parse(savedRates)
      : {
          sqftRate: 0.04,
          bathroomRate: 20,
          kitchenRate: 30,
          fridgeRate: 50,
          ovenRate: 50,
          windowRate: 15,
          steamRate: 50,
        };
  });

  const [breakdown, setBreakdown] = useState({
    footage: "",
    bathrooms: "",
    kitchens: "",
    fridge: "",
    oven: "",
    windows: "",
    steam: "",
    total: "",
  });

  useEffect(() => {
    localStorage.setItem("rates", JSON.stringify(rates));
  }, [rates]);

  const handleRateChange = (key, value) => {
    setRates((prevRates) => ({
      ...prevRates,
      [key]: Number(value) || 0,
    }));
  };

  const handleCalculate = () => {
    const sqft = Number(footage) || 0;
    const bathCount = Number(bathrooms) || 0;
    const kitchenCount = Number(kitchens) || 0;

    const fridgeCost = hasFridge === "yes" ? rates.fridgeRate : 0;
    const ovenCost = hasOven === "yes" ? rates.ovenRate : 0;
    const windowCost = hasWindow === "yes" ? rates.windowRate : 0;
    const steamCost = hasSteam === "yes" ? rates.steamRate : 0;

    const sqftOutput = sqft * rates.sqftRate;
    const bathroomCost = bathCount * rates.bathroomRate;
    const kitchenCost = kitchenCount * rates.kitchenRate;
    const addons = fridgeCost + ovenCost + windowCost + steamCost;

    const result = sqftOutput + bathroomCost + kitchenCost + addons;
    setTotal(result);

    setBreakdown({
      footage: `${sqft} × ${rates.sqftRate} = $${sqftOutput.toFixed(2)}`,
      bathrooms: `${bathCount} × ${rates.bathroomRate} = $${bathroomCost.toFixed(2)}`,
      kitchens: `${kitchenCount} × ${rates.kitchenRate} = $${kitchenCost.toFixed(2)}`,
      fridge:
        hasFridge === "yes"
          ? `Yes = $${rates.fridgeRate.toFixed(2)}`
          : `No = $0.00`,
      oven:
        hasOven === "yes"
          ? `Yes = $${rates.ovenRate.toFixed(2)}`
          : `No = $0.00`,
      windows:
        hasWindow === "yes"
          ? `Yes = $${rates.windowRate.toFixed(2)}`
          : `No = $0.00`,
      steam:
        hasSteam === "yes"
          ? `Yes = $${rates.steamRate.toFixed(2)}`
          : `No = $0.00`,
      total: `$${result.toFixed(2)}`,
    });
  };

  return (
    <div className="app">

      <div className="tabs">
        <button
          className={currentTab === "calculator" ? "active-tab" : ""}
          onClick={() => setCurrentTab("calculator")}
        >
          Calculator
        </button>
        <button
          className={currentTab === "rates" ? "active-tab" : ""}
          onClick={() => setCurrentTab("rates")}
        >
          Rates & Fees
        </button>
      </div>
      
      <div className="background-shapes">
        <div className="shape shape-top-left" />
        <div className="shape shape-right" />
        <div className="shape shape-bottom-left" />
        <div className="leaf leaf-1" />
        <div className="leaf leaf-2" />
        <div className="leaf leaf-3" />
      </div>

      

      {currentTab === "rates" && (
          <div className="calculator-card">
            <h1>Rates & Fees</h1>

            <div className="form-group">
              <label>Square Foot Rate</label>
              <input
                type="number"
                step="0.01"
                value={rates.sqftRate}
                onChange={(e) => handleRateChange("sqftRate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Bathroom Rate</label>
              <input
                type="number"
                step="0.01"
                value={rates.bathroomRate}
                onChange={(e) =>
                  handleRateChange("bathroomRate", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Kitchen Rate</label>
              <input
                type="number"
                step="0.01"
                value={rates.kitchenRate}
                onChange={(e) =>
                  handleRateChange("kitchenRate", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Fridge Clean Fee</label>
              <input
                type="number"
                step="0.01"
                value={rates.fridgeRate}
                onChange={(e) => handleRateChange("fridgeRate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Oven Clean Fee</label>
              <input
                type="number"
                step="0.01"
                value={rates.ovenRate}
                onChange={(e) => handleRateChange("ovenRate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Window Clean Fee</label>
              <input
                type="number"
                step="0.01"
                value={rates.windowRate}
                onChange={(e) => handleRateChange("windowRate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Steam Clean Fee</label>
              <input
                type="number"
                step="0.01"
                value={rates.steamRate}
                onChange={(e) => handleRateChange("steamRate", e.target.value)}
              />
            </div>
          </div>
        )}

      <div className="cards-container">
        {currentTab === "calculator" && (
          <div className="calculator-card">
            <h1>Pricing Calculator</h1>
            <h1>Standard Plan:</h1>

            <div className="form-group">
              <label>Footage of house</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  placeholder="Enter footage"
                  value={footage}
                  onChange={(e) => setFootage(e.target.value)}
                />
                <span>sq ft</span>
              </div>
            </div>

            <div className="form-group">
              <label>Number of Bathrooms</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  placeholder="Enter number of bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Number of Kitchens</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  placeholder="Enter number of kitchens"
                  value={kitchens}
                  onChange={(e) => setKitchens(e.target.value)}
                />
              </div>
            </div>

            <h1>Add Ons:</h1>

            <div className="form-group">
              <label>Fridge Clean:</label>
              <select
                value={hasFridge}
                onChange={(e) => setHasFridge(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Oven Clean:</label>
              <select
                value={hasOven}
                onChange={(e) => setHasOven(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Window Clean:</label>
              <select
                value={hasWindow}
                onChange={(e) => setHasWindow(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Steam Clean:</label>
              <select
                value={hasSteam}
                onChange={(e) => setHasSteam(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="result-row">
              <div className="price-box">${total.toFixed(2)}</div>
              <button onClick={handleCalculate}>Calculate</button>
            </div>
          </div>
        )}

        

        <div className="breakdown-card">
          <h2>Price Breakdown</h2>

          <p>
            <strong>Footage:</strong> {breakdown.footage}
          </p>
          <p>
            <strong>Bathrooms:</strong> {breakdown.bathrooms}
          </p>
          <p>
            <strong>Kitchens:</strong> {breakdown.kitchens}
          </p>
          <p>
            <strong>Fridge Clean:</strong> {breakdown.fridge}
          </p>
          <p>
            <strong>Oven Clean:</strong> {breakdown.oven}
          </p>
          <p>
            <strong>Window Clean:</strong> {breakdown.windows}
          </p>
          <p>
            <strong>Steam Clean:</strong> {breakdown.steam}
          </p>

          <hr />

          <p>
            <strong>Total:</strong> {breakdown.total}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;