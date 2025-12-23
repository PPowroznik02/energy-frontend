import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";

import {
    Box,
    Typography,
    Stack,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";


function EnergyDashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://energy-backend-ekhb.onrender.com/energy/mix")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" mt={4}>
                Error: {error}
            </Typography>
        );
    }

    if (!data) return null;

    const chartData = [
        {
            name: "Today",
            green: data.today.greenEnergyPercentage,
            data: data.today.carbonIntensityEnergyMixDto.map((item) => ({
                id: item.fuel,
                value: item.perc,
                label: item.fuel,
            })),
        },
        {
            name: "Tomorrow",
            green: data.tomorrow.greenEnergyPercentage,
            data: data.tomorrow.carbonIntensityEnergyMixDto.map((item) => ({
                id: item.fuel,
                value: item.perc,
                label: item.fuel,
            })),
        },
        {
            name: "Day after tomorrow",
            green: data.dayAfterTomorrow.greenEnergyPercentage,
            data: data.dayAfterTomorrow.carbonIntensityEnergyMixDto.map(
                (item) => ({
                    id: item.fuel,
                    value: item.perc,
                    label: item.fuel,
                })
            ),
        },
    ];

    return (
        <Box px={3} py={4}>
            <h2>
                Energy Mix Dashboard
            </h2>

            <Stack
                direction="row"
                spacing={4}
                justifyContent="center"
                flexWrap="wrap"
                sx={{
                    mt: 3,
                }}
            >
                {chartData.map((chart) => (
                    <Card
                        key={chart.name}
                        sx={{
                            minWidth: 400, // increased width
                            maxWidth: 450,
                            textAlign: "center",
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                                transform: "scale(1.03)",
                                boxShadow: 6,
                            },
                            p: 2, // padding around content
                            mb: 3,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                gutterBottom
                                sx={{ color: "primary.main" }}
                            >
                                {chart.name}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Green energy: {chart.green.toFixed(1)}%
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                }}
                            >
                                <PieChart
                                    series={[{ data: chart.data }]}
                                    width={350} // increased width
                                    height={350} // increased height
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}

export default EnergyDashboardPage;
