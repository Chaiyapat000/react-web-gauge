import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function RechartGraph(props) {
  let x_datetime = [];
  let y_value = [];
  const data = props.measured_data;
  var type = props.measured_dataType;

  //console.log(type);

  for (let i in data) {
    //console.log(data[i][type]);
    y_value.push(data[i][type]);
    x_datetime.push(new Date(data[i].datetime));
  }

  var dataPoints = x_datetime.map((value, index) => {
    return { x: value, y: y_value[index] };
  });
  console.log(dataPoints);

  return (
    <div>
      <LineChart
        width={props.graphWidth}
        height={300}
        data={dataPoints}
        margin={{
          top: 20,
          right: 15,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" interval={200} label="dataTime" />
        <YAxis label={type} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

export default RechartGraph;
