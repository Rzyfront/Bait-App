import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, LabelList, CartesianGrid } from 'recharts';

const ChartToxi = ({ data }) => {
  return (
        <ResponsiveContainer width={300} height={250}>
            <BarChart data={data} margin={{ top: 30, left: 0, right: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="url(#grad)" height={50}>
                    <LabelList dataKey='value' position="top" />
                    <LabelList position="center" fill='#FA0505'>%</LabelList>
                </Bar>
            </BarChart>
        </ResponsiveContainer>
  );
};

export default ChartToxi;
