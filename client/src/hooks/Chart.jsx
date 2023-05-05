import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, LabelList } from 'recharts';
function Chart ({ data }) {
  return (<ResponsiveContainer width={600}
  height={400}>
    <BarChart data={data} margin={{ top: 30, left: 0, ringth: 0, bottom: 50 }} >
        {/* <CartesianGrid strokeDasharray='3 3'/> */}
        <XAxis dataKey="name" interval={0}/>
      <YAxis domain={[0, 5]} />
        {/* <Tooltip/>
        <Legend/> */}
        <Bar dataKey="name" fill
        ="#8884d8" />

      <Bar dataKey="Calificacion" fill
        ="#F74E13"> <LabelList dataKey="Calificacion" position="top" /></Bar>
    </BarChart>

    </ResponsiveContainer>);
}
export default Chart;
