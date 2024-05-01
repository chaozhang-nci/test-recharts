
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
    { name: 'Group F2', value: 4 , fill: '#74F2AE'},
    { name: 'Group D2', value: 1, fill: '#FFCF54' },
    { name: 'Group E2', value: 1, fill: '#F294B0' },
    
    { name: 'Group G2', value: 1 , fill: '#987DC4'},
  ];

  const renderCustomizedLabel=(props: any) =>
    {
    // assumption the pie data is sorted from large to small
    // clockwise 
    // small slice would be in the corner north-west
    // include slice index
   
    const {cx, cy, midAngle, innerRadius, outerRadius, 
      fill,percent, name, value, color, startAngle, endAngle,index, totoalSlice}=props;
    const RADIAN = Math.PI / 180;
    console.log("mid-angle for "+ index);
    console.log(midAngle);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + outerRadius * cos;
    const sy = cy + outerRadius * sin;
    const mx = cx + (outerRadius + 3* index) * cos;
    const my = cy + (outerRadius + 3* index) * sin;
    // const mx = cx + (outerRadius + 20) * cos;
    // const my = cy + (outerRadius + 20) * sin;

    const isLeftSide = !(midAngle < 90 && midAngle > -90); // Change 10 to half of the number of items per side
    const isTopSide = !(midAngle < 0 && midAngle > -210); // Change 10 to half of the number of items per side
    const ySpacing = 20; // Adjust the vertical spacing between lines
    const xSpacing = 10; // Adjust the horizontal spacing between left and right sides
    const topSpacing = cy - outerRadius ;
    const ey = isLeftSide ? 
        cy - index * ySpacing 
        : +my -  ySpacing*0.5;
    console.log(" ey :" + ey + " leftside "+ isLeftSide);
    console.log(" mx :" + mx + " my "+ my + " topside "+ isTopSide);
    const textAnchor = isLeftSide ? "start" : "end";
    const xPosition = cx + (isLeftSide ? -1 : 1) * outerRadius;
    let keyName = name.split(" ");
    const diffAngle = endAngle - startAngle;
    console.log(" diff angle "+ diffAngle);
   
    return (
   <>{ (Math.abs(diffAngle) > 15 && !(isTopSide && isLeftSide))?
      <g>
      <text
        x={isLeftSide ? sx -35: sx + 25 }
        y={isTopSide ? sy - 5 : sy + 15}
        fontSize={15}
        textAnchor={textAnchor}
        fill={"black"}
      >
        {`${(percent > 0.01)?(percent * 100).toFixed(0):(percent * 100).toFixed(2)}%`}
      </text>
    </g>
    :
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${xPosition + (isLeftSide ? -1 : 1)* xSpacing},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={xPosition + (isLeftSide ? -1 : 1)* xSpacing} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={textAnchor === "start" ? xPosition - xSpacing - 50 : xPosition + 50 }
        y={ey + 5}
        fontSize={15}
        textAnchor={textAnchor}
        fill={"black"}
      >
        {`${(percent > 0.01)?(percent * 100).toFixed(0):(percent * 100).toFixed(2)}%`}
      </text>
    </g>
    }</>
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
        startAngle={90}
        endAngle={-270}
        label={renderCustomizedLabel}
        labelLine={false}
      />
     <Pie
        data={data02.reverse()}
        cx={500}
        cy={200}
        //innerRadius={30}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        label={renderCustomizedLabel}
        labelLine={false}
      />
      <Tooltip />
    </PieChart>
    </ResponsiveContainer>
  );
}
