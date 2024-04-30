
import "./styles.css";
import React, { useCallback, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Tooltip } from "recharts";

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
    { name: 'Group A2', value: 151 , fill: '#246AD4'},
    { name: 'Group B2', value: 37 , fill: '#61A1EC'},
    { name: 'Group C2', value: 6, fill: '#A5D3FE' },
    { name: 'Group D2', value: 1, fill: '#FFCF54' },
    { name: 'Group E2', value: 1, fill: '#F294B0' },
    { name: 'Group F2', value: 4 , fill: '#74F2AE'},
    { name: 'Group G2', value: 1 , fill: '#987DC4'},
  ];

  const renderCustomizedLabel=(props: any) =>
    {
    const {cx, cy, midAngle, innerRadius, outerRadius, 
      fill,percent, name, value, color, startAngle, endAngle,index}=props;
    const RADIAN = Math.PI / 180;
    console.log("mid-angle for "+ index);
    console.log(midAngle);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + outerRadius * cos;
    const sy = cy + outerRadius * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;

    const isLeftSide = (midAngle < 270 && midAngle > 90); // Change 10 to half of the number of items per side
    const ySpacing = 10; // Adjust the vertical spacing between lines
    const xSpacing = -100; // Adjust the horizontal spacing between left and right sides
    const topSpacing = cy;
    const ey = isLeftSide ? 
         +my - (index) * ySpacing 
        : +my - (index) * ySpacing;
        console.log(" ey :" + ey)
    const textAnchor = isLeftSide ? "start" : "end";
    const xPosition = cx + (!isLeftSide ? -1 : .75) * xSpacing;
    let keyName = name.split(" ");
    const diffAngle = endAngle - startAngle;
    const delta = ((360-diffAngle)/15)-1;
    const radius = innerRadius + (outerRadius - innerRadius);
    const x = cx + (radius+delta) * Math.cos(midAngle * RADIAN);
    const y = cy + (radius+(delta*delta)) * Math.sin(midAngle * RADIAN);
    return (
      <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${xPosition + (index-1) *8},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={xPosition + (index-1) *8} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={textAnchor === "start" ? xPosition - 45 : xPosition + 50 + (index-1) *8}
        y={ey + 5}
        fontSize={15}
        textAnchor={textAnchor}
        fill={"black"}
      >
        {`${(percent > 0.01)?(percent * 100).toFixed(0):(percent * 100).toFixed(2)}%`}
      </text>
    </g>
    );
  };
  const renderCustomizedLabelLine= (props:any)=>{
    let { cx, cy, midAngle, innerRadius, outerRadius, color, startAngle, endAngle } = props;
    const RADIAN = Math.PI / 180;
    const diffAngle = endAngle - startAngle;
    const radius = innerRadius + (outerRadius - innerRadius);
    let path='';
    for(let i=0;i<((360-diffAngle)/15);i++){
      path += `${(cx + (radius+i) * Math.cos(-midAngle * RADIAN))},${(cy + (radius+i*i) * Math.sin(-midAngle * RADIAN))} `
    }
    return (
      <polyline points={path} stroke={color} fill="none" />
    );
  }

const renderActiveShape1 = (props: any) => {
   // console.log(props);
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
    value,name, index1, index2
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
        fill="#333" > {`${(percent * 100).toFixed(0)}%`}</text>
      {/* >{`${name} ${value}`}</text> */}
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

export default function App() {
  return (
    <ResponsiveContainer width="100%" height="100%">
    <PieChart width={1200} height={200}>
      <Pie
        //activeIndex={activeIndex1}
        //activeShape={renderActiveShape1}
        data={data01}
        cx={200}
        cy={200}
        // innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        //onMouseEnter={onPieEnter1}
        label={renderActiveShape1}
        //labelLine={renderCustomizedLabelLine}
        //label={renderCustomizedLabel}
      />
     <Pie
        data={data02}
        cx={500}
        cy={200}
        innerRadius={30}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
        //label={renderActiveShape}
       // onMouseEnter={onPieEnter2}
      />
      <Tooltip />
    </PieChart>
    </ResponsiveContainer>
  );
}
