import { GenerateChartData } from "../../components/viewAnalytics/generateChartModal/interface";
import { Bar, Line, Scatter } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  ScatterController,
  Title,
  Tooltip as TooltipChart,
} from "chart.js";
import { blueTones } from "../../utils/colorUtil";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  ScatterController,
  Title,
  TooltipChart,
  Legend,
  annotationPlugin
);

const ChartFactory = (props: {
  generateChartData: GenerateChartData;
  dataToChart: unknown[];
}) => {
  const { generateChartData, dataToChart } = props;

  const renderChart = () => {
    const groupedData = dataToChart.reduce((acc, data) => {
      const label = data[generateChartData.yVariable];
      const value = data[generateChartData.xVariable];

      if (!acc[label]) {
        acc[label] = 0;
      }

      acc[label] += value;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Dados",
          data: values,
          backgroundColor: blueTones,
          borderColor: blueTones,
        },
      ],
    };

    const optionsToChartBar = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: `${generateChartData.yVariable} x ${generateChartData.xVariable}`,
          font: {
            weight: "bold",
          },
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            display: true,
          },
          title: {
            display: true,
            text: generateChartData.xVariable,
          },
        },
        x: {
          grid: {
            display: true,
          },
          title: {
            display: true,
            text: generateChartData.yVariable,
          },
        },
      },
    };

    switch (generateChartData.chartType) {
      case "bar":
        return <Bar data={data} options={optionsToChartBar} />;
      case "scatter":
        return <Scatter data={data} options={optionsToChartBar} />;
      case "line":
        return <Line data={data} options={optionsToChartBar} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "1000px", height: "calc(100vh - 210px)" }}>
      {renderChart()}
    </div>
  );
};

export default ChartFactory;
