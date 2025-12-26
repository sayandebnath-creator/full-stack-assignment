import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function CallDurationChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="callGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7fb3d5" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#7fb3d5" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
        <YAxis hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6fa8dc"
          fill="url(#callGradient)"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const sadPathData = [
  { name: "Unsupported Language", value: 22 },
  { name: "Assistant did not speak Spanish", value: 18 },
  { name: "Assistant did not speak French", value: 12 },
  { name: "Customer Hostility", value: 15 },
  { name: "Verbal Aggression", value: 8 },
  { name: "User refused to confirm identity", value: 15 },
  { name: "Caller Identification", value: 10 },
];

const COLORS = [
  "#8faecc",
  "#9db6cf",
  "#b0c6db",
  "#c6ddb8",
  "#b6d2a5",
  "#d8e6f0",
  "#c2d9ea",
];

const renderLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, name, fill } = props;
  const RADIAN = Math.PI / 180;

  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const x2 = cx + (outerRadius + 28) * Math.cos(-midAngle * RADIAN);
  const y2 = cy + (outerRadius + 28) * Math.sin(-midAngle * RADIAN);

  const anchor = x2 > cx ? "start" : "end";

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={fill}
        strokeDasharray="3 3"
      />
      <text
        x={x2 + (x2 > cx ? 6 : -6)}
        y={y2}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize={12}
        fill={fill}
      >
        {name}
      </text>
    </g>
  );
};

export function SadPathChart() {
  return (
    <ResponsiveContainer width="100%" height={460}>
      <PieChart>

        <Pie
          data={sadPathData}
          cx="50%"
          cy="50%"
          innerRadius={140}
          outerRadius={200}
          dataKey="value"
          label={renderLabel}
          labelLine={false}
        >
          {sadPathData.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
              stroke="#f5f7fa"
              strokeWidth={2}
            />
          ))}
        </Pie>

        <Pie
          data={sadPathData}
          cx="50%"
          cy="50%"
          innerRadius={120}
          outerRadius={130}
          dataKey="value"
          fill="#e9eef4"
          stroke="#f5f7fa"
          strokeWidth={1}
        />

        {/* <Pie
          data={[{ value: 100 }]}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={110}
          dataKey="value"
          fill="#ffffff"
          stroke="none"
          isAnimationActive={false}
        /> */}

      </PieChart>
    </ResponsiveContainer>
  );
}