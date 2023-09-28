import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text } from 'recharts';

interface ChartData {
  id: string;
  amount: number;
  date: string;
  status: string;
  asset: string
}

interface ChartProps {
  data: ChartData[];
}

export default function Chart(props: ChartProps) {

  const data = props.data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString()
  }));

  return (
    <LineChart
      width={800}
      height={600}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="amount" />
      <Tooltip />
      <Legend />
      <Line
        key={data[0].asset}
        type="monotone"
        dataKey="amount"
        data={data}
        name={data[0].asset}
      />
    </LineChart>
  );
}
