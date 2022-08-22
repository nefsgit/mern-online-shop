import styled from "styled-components";

const Forbidden = () => {
  return (
    <ForbiddenDiv>
        <h1>Forbidden</h1>
        <h2>You don't have access to this page.</h2>
    </ForbiddenDiv>
  )
}

export default Forbidden;

const ForbiddenDiv = styled.div`
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
`;