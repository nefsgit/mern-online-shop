import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';

const Spinner = ({ message }) => {
  return (
    <SpinnerDiv>
        <Circles color="#00BFFF" height={50} width={200} className='m-5' />
        <p className='text-lg text-center px-2'>{message}</p>
    </SpinnerDiv>
  )
}

export default Spinner;

const SpinnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
`;