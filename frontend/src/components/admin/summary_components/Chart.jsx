import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { setHeaders } from '../../../features/functions';

const Chart = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    function compare (a, b) {
        if(a.date < b.date) {
          return -1
        } else if(a.date > b.date) {
          return 1
        } else {
          return 0
        }  
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/income-weekly`, setHeaders());

              response.data.sort(compare);
              
              const newData = response.data.map((item) => {
                const DAYS = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                ]

                return {
                    day: DAYS[item._id - 1],
                    amount: item.total / 100
                }
              });

              setSales(newData);
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false)
            }
          }
      
          fetchData();
    }, [])

  return (
    <>
    {loading ? <Loader>Loading chart</Loader> :
    <StyledChart>
    <h3>Earnings for the last 7 days ($)</h3>
    <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={300}
      data={sales}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      
    </LineChart>
  </ResponsiveContainer>
</StyledChart>}
    
    </>
  )
}

export default Chart;

const StyledChart = styled.div`
    max-width: 100%;
    height: 300px;
    margin-top: 2rem;
    padding: 1rem;
    border: 2px solid rgba(48,51,78,0.2);
    border-radius: 5px;

    h3 {
        margin-bottom: 1rem;
    }
`;

const Loader = styled.p`
    margin-top: 2rem;
`;