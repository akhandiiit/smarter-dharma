import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts({ breakdown }: any) {
  const data = Object.keys(breakdown).map((key) => ({
    facade: key,
    cost: breakdown[key].cost.toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="facade" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cost" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}
