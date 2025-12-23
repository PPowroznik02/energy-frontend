import { useState } from "react"

function ChargingWindowPage() {
    const [hours, setHours] = useState(2)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchChargingWindow = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(
                `https://energy-backend-ekhb.onrender.com/energy/charging-window?hours=${hours}`
            )
            if (!response.ok) {
                throw new Error("Failed to fetch charging window")
            }

            const data = await response.json()
            setResult(data)
        } catch (err) {
            setError("Could not load charging window")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>Charging Window</h2>

            <label>
                Hours (1–6):
                <input
                    type="number"
                    min={1}
                    max={6}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                />
            </label>

            <button className="calculate-button" onClick={fetchChargingWindow}>
                Calculate
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {result && (
                <div>
                    <p><strong>From:</strong> {result.dateFrom}</p>
                    <p><strong>To:</strong> {result.dateTo}</p>
                    <p>
                        <strong>Green energy:</strong> {result.greenEnergyPercentage}%
                    </p>
                </div>
            )}
        </div>
    )
}

export default ChargingWindowPage
