import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useValue } from "../../../context/ContextProvider";

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CostoCuartoPastel = () => {
  const {
    state: { cuartos },
  } = useValue();
  const [costoGrupos, setCostoGrupos] = useState([]);

  useEffect(() => {
    let free = 0,
      menorDe4000 = 0,
      Entre4000y8000 = 0,
      Masde8000 = 0;
    cuartos.forEach((cuarto) => {
      if (cuarto.precio === 0) return free++;
      if (cuarto.precio < 6000) return menorDe4000++;
      if (cuarto.precio <= 8000) return Entre4000y8000++;
      Masde8000++;
    });
    setCostoGrupos([
      { name: "Gratis para quedarse", qty: free },
      { name: "Menos de $ 4,000", qty: menorDe4000 },
      { name: "Entre $ 4,000 y $ 6,000", qty: Entre4000y8000 },
      { name: "Más de $ 8,000", qty: Masde8000 },
    ]);
  }, [cuartos]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={costoGrupos}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="qty"
        >
          {costoGrupos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h6">Costos de los departamentos</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {costoGrupos[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default CostoCuartoPastel;
