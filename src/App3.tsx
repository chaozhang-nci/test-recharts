
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
        fill="#333" 
        >{`${(percent * 100).toFixed(0)}%`}</text> 
      {/* >{`${name} ${value}`}</text> 
       <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>  */}
    </g>
  );
};

const getIntroOfPage = (label: string) => {
    if (label === 'Group A') {
      return 'Group A is about men clothing';
    } if (label === 'Group B') {
      return 'Group B is about women dress';
    } if (label === 'Group C') {
      return 'Group C is about women bag';
    } if (label === 'Group D') {
      return 'Group D is about household goods';
    } if (label === 'Group E') {
      return 'Group E is about food';
    } if (label === 'Group F') {
      return 'Group F is about baby food';
    }
  };

  const CustomTooltip = ({ active, payload }: { active: boolean; payload: Record<string, any> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff' }}>
          <p className="label">{payload[0].payload.date}</p>
          <p className="label">{`high : ${payload[0].payload.high}`}</p>
          <p className="label">{`low : ${payload[0].payload.low}`}</p>
          <p className="label">{`open : ${payload[0].payload.openClose[0]}`}</p>
          <p className="label">{`close : ${payload[0].payload.openClose[1]}`}</p>
        </div>
      );
    }
  
    return null;
  };
  

export default function App() {

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={1400} height={400}>
      <Pie
        data={data01}
        cx={200}
        cy={200}
        isAnimationActive={false}
        // innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
       label={ renderActiveShape1}
      />

      <Pie
        data={data02}
        cx={600}
        cy={200}
        isAnimationActive={false}
        // innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
       label={ renderActiveShape1}
      />
       <Tooltip />
      </PieChart>
</ResponsiveContainer>
  );
}
