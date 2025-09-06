import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { semana: "01-07", usuarios: 20 },
    { semana: "08-14", usuarios: 35 },
    { semana: "15-21", usuarios: 28 },
    { semana: "22-28", usuarios: 40 },
];

function UserChart() {
    return (
        <div className="w-full h-64 mb-6 bg-white pb-10 pt-5 px-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Nuevos usuarios por semana</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usuarios" stroke="#16a34a" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export default UserChart;