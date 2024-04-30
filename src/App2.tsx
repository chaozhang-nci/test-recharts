import { useCallback } from "react";
import { Box } from "@mui/material";
import "./styles.css";
import { ResponsiveContainer, PieChart, Pie, LabelList } from "recharts";

const data = [
  {
    name: "Cash",
    value: 6000,
    percentage: "18%",
    fill: "#3333FF"
  },
  {
    name: "Pension",
    value: 4000,
    percentage: "25%",
    fill: "#FF9933"
  },
  {
    name: "Real-state",
    value: 10000,
    percentage: "31%",
    fill: "#FF3333"
  },
  {
    name: "Business",
    value: 12000,
    percentage: "13%",
    fill: "#00FF00"
  }
];

const renderCustomizedLabelPercentage = (data:any, total = 32000) => {
 //  console.log("Data", data);
 //  console.log(parseInt(data.value) / total);
  // calculate percentage
  let percentageCalculated = (data.value / total) * 100;
  return percentageCalculated.toFixed(2).replace(".", ",").toString() + "%";
};

export default function App() {
  const renderLabel = useCallback((piePiece:any) => {
    return piePiece.name;
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh"
      }}
    >
      <ResponsiveContainer>
        <PieChart style={{ cursor: "pointer" }}>
          <Pie
            className="chartpie"
            dataKey="value"
            data={data}
            label={renderLabel}
            cx="50%"
            cy="50%"
            outerRadius={"75%"}
            nameKey="name"
            // activeShape={(props) => renderActiveShape(props, showSubchart)}
            // onMouseEnter={onMouseOver}
            // onMouseLeave={onMouseLeave}
          >
            <LabelList
              dy={-3}
              fill="white" // Percentage color
              // dataKey="percentage"
              dataKey={renderCustomizedLabelPercentage}
              position="inside"
             // angle="paserInt("0")
              stroke="none" // Border of letters
              className="label-percentage"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
