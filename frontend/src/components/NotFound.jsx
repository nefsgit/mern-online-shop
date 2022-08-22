import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundDiv>
        <h1>Not Found</h1>
        <h2>The requested page was not found.</h2>
        <p>This could be due to a few different reasons:</p>
        <ul>
          <li>The requested resource doesn't exist on this server.</li>
          <li>The server is down.</li>
          <li>Your internet connection is down.</li>
        </ul>
    </NotFoundDiv>
  )
}

export default NotFound;

const NotFoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(68, 68, 68);
  min-height: 80vh;

  h2 {
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  p {
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  ul {
    margin-top: 1rem;
  }
`;