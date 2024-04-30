import "./styles.css";
// import React from "react";
import { useCallback } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell,Label, LabelList, Sector } from "recharts";

const data01 = [
  { name: 'Group A', value: 22, fill: '#246AD4'},
  { name: 'Group B', value: 22, fill: '#61A1EC'},
  { name: 'Group C', value: 20, fill: '#A5D3FE' },
  { name: 'Group D', value: 25, fill: '#FFCF54' },
  { name: 'Group E', value: 6, fill: '#F294B0' },
  { name: 'Group F', value: 3, fill: '#74F2AE'},
  { name: 'Group G', value: 2, fill: '#987DC4'},
];
 
const data02 = [
  { name: 'Group A', value: 151 , fill: '#246AD4'},
  { name: 'Group B', value: 37 , fill: '#61A1EC'},
  { name: 'Group C', value: 6, fill: '#A5D3FE' },
  { name: 'Group D', value: 1, fill: '#FFCF54' },
  { name: 'Group E', value: 1, fill: '#F294B0' },
  { name: 'Group F', value: 4 , fill: '#74F2AE'},
  { name: 'Group G', value: 1 , fill: '#987DC4'},
];

const renderActiveShape = (props: any) => {
  //console.log(props);
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,name
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 0) * cos;
  const sy = cy + (outerRadius + 0) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 5}
        textAnchor={textAnchor}
      //   fill="#333" > {`${(percent * 100).toFixed(0)}%`}</text>
       >{`${name} ${value}`}</text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

const getPertageFromList = (dataList: any) => {
  let dataSum = 0;
  dataList.forEach((element:any) => {
    dataSum = dataSum + element.value||0;
  });
  console.log(dataSum);
  //let percentageCalculated = (dataList.value / dataSum) * 100;
  return  dataList.map((element:any) => ({ ...element, pertVal: ((100 * element.value)/(dataSum||0)).toFixed(0).toString() + "%" }))
//return percentageCalculated.toFixed(2).replace(".", ",").toString() + "%";
};
const renderCustomizedLabelPercentage = (data:any, total = 32000) => {
  console.log("Data", data);
  console.log(data.pertVal);
 // calculate percentage
 let percentageCalculated = data.percentage *100;
 console.log(percentageCalculated);
 //return percentageCalculated.toFixed(2).replace(".", ",").toString() + "%";
 return data.pertVal;
};
const renderCustomizedLabelPercentage2 = (data:any, total = 32000) => {
  console.log("Data", data);
  console.log(data.pertVal);
 // calculate percentage
 let percentageCalculated = data.percentage *100;
 console.log(percentageCalculated);
 //return percentageCalculated.toFixed(2).replace(".", ",").toString() + "%";
 return data.value;
};

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

export default function App() {
  const renderLabel = useCallback((piePiece:any) => {
    return piePiece.pertVal;
  }, []);
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={getPertageFromList(data01)}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
         //label={renderActiveShape}
      >
         {/* {data01.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={entry.fill}  /> // make sure to map the index to the colour you want
         )
            )} */}
          <LabelList 
         dataKey={renderCustomizedLabelPercentage} 
          position="outside" fill='black' alignment-baseline="middle"  stroke="black" text-anchor="end" />
      </Pie>
      <Pie
        dataKey="value"
        data={getPertageFromList(data02)}
        cx={500}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
        label
        >
          {/* <LabelList 
         dataKey={renderCustomizedLabelPercentage2} 
          position="outside" fill='black' alignment-baseline="middle"  stroke="black" text-anchor="end" />
          */}
          </Pie> 
      

      <Tooltip />
    </PieChart>
  );
}
