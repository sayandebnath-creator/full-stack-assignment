import "./App.css";
import { useState } from "react";
import { CallDurationChart, SadPathChart } from "./components/Chart";
import { supabase } from "./utils/supabase";

const initialAreaData = [
  { time: "00:00", value: 2 },
  { time: "01:00", value: 6 },
  { time: "02:00", value: 14 },
  { time: "03:00", value: 9 },
  { time: "04:00", value: 3 },
];

export default function App() {
  const [areaData, setAreaData] = useState(initialAreaData);
  const [email, setEmail] = useState("");
  const [newValue, setNewValue] = useState<number | "">("");

  async function updateChart() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    const { data: existing } = await supabase
      .from("chart_data")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      const ok = confirm(
        `Previous value for 02:00 was ${existing.value}. Overwrite it?`
      );
      if (!ok) return;
    }

    await supabase.from("chart_data").upsert({
      email,
      value: Number(newValue),
    });

    setAreaData(prev =>
      prev.map(item =>
        item.time === "02:00"
          ? { ...item, value: Number(newValue) }
          : item
      )
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Call Analytics</h1>

      <div className="card">
        <h3 className="card-title">Call Duration Analysis</h3>

        <CallDurationChart data={areaData} />

        <div style={{ marginTop: 16 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ marginRight: 8 }}
          />

          <input
            type="number"
            placeholder="Value for 02:00"
            value={newValue}
            onChange={e => setNewValue(e.target.valueAsNumber)}
            style={{ marginRight: 8 }}
          />

          <button onClick={updateChart}>Update</button>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Sad Path Analysis</h3>
        <SadPathChart />
      </div>
    </div>
  );
}
