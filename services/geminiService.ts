import { StatMetric, ChartDataPoint, AiInsight } from "../types";

export const generateHealthInsights = async (
  stats: StatMetric[],
  chartData: ChartDataPoint[]
): Promise<AiInsight[]> => {
  try {
    const response = await fetch('/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stats, chartData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      {
        title: "Analysis Failed",
        description: "Could not generate insights at this time. Please try again later.",
        type: "warning"
      }
    ];
  }
};