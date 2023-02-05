import moment from "moment";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useValue } from "../../../context/ContextProvider";

const meses = 3;
const hoy = new Date();
const tempData = [];
for (let i = 0; i < meses; i++) {
  const date = new Date(hoy.getFullYear(), hoy.getMonth() - (meses - (i + 1)));
  tempData.push({
    date,
    name: moment(date).format("MMM YYYY"),
    usuarios: 0,
    cuartos: 0,
  });
}

const CuartosUsuarios = () => {
  const {
    state: { cuartos, usuarios },
  } = useValue();
  const [data, setData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < meses; i++) {
      tempData[i].usuarios = 0;
    }
    usuarios.forEach((user) => {
      for (let i = 0; i < meses; i++) {
        if (moment(tempData[i].date).isSame(user?.createdAt, "month"))
          return tempData[i].usuarios++;
      }
    });
    setData([...tempData]);
  }, [usuarios]);

  useEffect(() => {
    for (let i = 0; i < meses; i++) {
      tempData[i].cuartos = 0;
    }
    cuartos.forEach((room) => {
      for (let i = 0; i < meses; i++) {
        if (moment(tempData[i].date).isSame(room?.createdAt, "month"))
          return tempData[i].cuartos++;
      }
    });
    setData([...tempData]);
  }, [cuartos]);

  return (
    <div style={{ width: "100%", height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="usuarios"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="cuartos"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CuartosUsuarios;
