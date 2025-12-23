import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <h1>UK Energy App</h1>

            <section>
                <button onClick={() => router.push("/energy/EnergyDashboard")}>
                    Energy mix
                </button>

                <button onClick={() => router.push("/energy/ChargingWindow")}>
                    Charging window
                </button>
            </section>

        </>
    )
}
