
import "./styles.css";
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
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
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
        >{`${(percent > 0.01)?(percent * 100).toFixed(0):(percent * 100).toFixed(2)}%`}</text> 
    </g>
  );
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
