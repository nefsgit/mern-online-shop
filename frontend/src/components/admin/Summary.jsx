import styled from 'styled-components';
import { FaUsers, FaChartBar, FaClipboard } from 'react-icons/fa';
import Widget from './summary_components/Widget';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { setHeaders } from '../../features/functions';
import Chart from './summary_components/Chart';
import Transactions from './summary_components/Transactions';
import AllTimeData from './summary_components/AllTimeData';
import { toast } from 'react-toastify';

const Summary = () => {

  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);

  function compare (a, b) {
    if(a._id < b._id) {
      if(a._id === 1 && b._id === 12) return -1
      return 1
    } else if(a._id > b._id) {
      if(a._id === 12 && b._id === 1) return 1
      return -1
    } else {
      return 0
    }
    
  }

  const getData = async (dataUrl, setterMethod, percSetter) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/${dataUrl}`, setHeaders());
      response.data.sort(compare)
      setterMethod(response.data);
      if (response.data[1]) {
        percSetter(((response.data[0].total - response.data[1].total) / response.data[1].total) * 100)
      }
    } catch (error) {
      toast.error('Oops. Something went wrong. Please try again later.', {
        position: "bottom-left",
        autoClose: 2500,
      });
    }
  }

  useEffect(() => {
    getData('users/stats', setUsers, setUsersPerc);
    getData('orders/stats', setOrders, setOrdersPerc);
    getData('orders/income-stats', setIncome, setIncomePerc);
  }, [])

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: ordersPerc
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total ? income[0]?.total / 100 : "",
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: incomePerc
    }
  ]

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => <Widget key={index} data={data} />)}
          </WidgetWrapper>
        </Overview>
        <Chart />
      </MainStats>
      <SideStats>
        <Transactions />
        <AllTimeData />
      </SideStats>
    </StyledSummary>
  )
}

export default Summary;

const StyledSummary = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
  }
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
  max-width: 100%;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
  }
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: #000000;
  color: rgba(234,234,255,0.87);
  width: 100%;
  padding: 1.5rem;
  height: 180px;
  max-height: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
    justify-content: center;
    height: auto;
    max-height: 100%;
  }
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
  }
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  max-width: 100%;

  @media(max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
    margin-top: 4rem;
    margin-left: 0;
  }
`;