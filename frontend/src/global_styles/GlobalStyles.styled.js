import styled from "styled-components";

export const SpinnerDiv = styled.div`
    display: flex;
    margin-top: 3rem;
    justify-content: center;
    align-items: center;
`;

export const HomeContainer = styled.div`
    padding: 2rem 4rem;

    h2 {
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        margin-top: 2rem;
    }
`;

// Products
export const StyledProducts = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 2rem;

    @media(max-width: 626px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 2rem;
    }
`;

export const StyledProduct = styled.div`
    width: 250px;
    max-width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem 1rem;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(94, 104, 121, 0.3);

    img {
    width: 80%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    }

    h3 {
    font-size: 25px;
    font-weight: 400;
    }

    button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    margin-top: 2rem;
    font-weight: 400;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #1fa504;
    color: white;
    letter-spacing: 1.15px;

        &:hover {
            background-color: #23ca02;
        }
    }
`;

export const StyledDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ProductPrice = styled.span`
    font-size: 20px;
    font-weight: 700;
`;

export const LoadMoreButton = styled.button`
  width: 0;
  height: 0;
  outline: none;
  border: none;
`;


// Lists
export const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
        border: none;
        outline: none;
        padding: 3px 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
`;

export const DeleteBtn = styled.button`
    background-color: rgb(231, 48, 48);
    &:hover {
    background-color: rgb(250, 91, 89);
    }
`;

export const EditBtn = styled.button`
    background-color: #0270ca;
    &:hover {
        background-color: #47a7f5;
    }
`;

export const ViewBtn = styled.button`
    background-color: #1fa504;
    &:hover {
    background-color: #23ca02;
    }
`;

export const Pending = styled.div`
    color: rgb(253,181,40);
    background: rgba(253,181,40,0.12);
`;

export const Dispatched = styled.div`
    color: rgb(38,198,249);
    background-color: rgba(38,198,249,0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

export const Delivered = styled.div`
    color: rgb(102,108,255);
    background-color: rgba(102,108,255,0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

export const Admin = styled.div`
    color: rgb(253, 181, 40);
    background: rgba(253,181,40,0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

export const Customer = styled.div`
    color: rgb(38,198,249);
    background: rgba(38,198,249,0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

export const AddProductButton = styled.button`
    background-color: #1fa504;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    max-width: 170px;
    margin: 1rem auto;
    cursor: pointer;

    &:hover {
        background-color: #23ca02;
    }
    &:active {
        transform: scale(0.9);
    }
`;

//Admin Headers
export const AdminHeaders = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;

  h2 {
    cursor: pointer;
  }
`;

// Create and Edit Product
export const CreateProductForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 50%;
    margin-top: 2rem;
    @media(max-width: 800px) {
    width: 100%;
    max-width: 100%;
    }

    label {
        margin-top: 0.8rem;
    }

    input {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182, 182, 182);
        margin: 0.3rem 0;

        &:focus {
            border: 1px solid rgb(0, 0, 0);
            box-shadow: 0 2px 5px 1px #111;
        }
    }

    select {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182, 182, 182);
        margin: 0.3rem 0;
        background-color: #fff;

        &:focus {
        border: 1px solid rgb(0, 0, 0);
        box-shadow: 0 2px 5px 1px #111;
        }
    }
`;

export const CreateProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    justify-content: center;
    @media(max-width: 800px) {
        flex-direction: column;
        justify-content: center;
    }
`;

export const ImagePreview = styled.div`
    margin: 2rem 0 2rem 4rem;
    padding: 2rem;
    border: 1px solid rgb(183, 183, 183);
    max-width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: rgb(78, 78, 78);
    border-radius: 5px;
    flex-direction: column;
    @media(max-width: 800px) {
        width: 100%;
        max-width: 100%;
        margin: 0;
        margin-top: 2rem;
    }
    img {
        max-width: 100%;
        @media(max-width: 800px) {
        max-width: 100px;
        max-height: 100px;
        }
    }
`;

export const ImageCancel = styled.button`
    background-color: rgb(199, 42, 42);
    margin-top: 2rem;
    outline: none;
    border: none;
    color: white;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: rgb(231, 48, 48);
    }
`;


// Login & Register
export const LoginForm = styled.form`
    max-width: 90%;
    width: 500px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #01010186;
    border-radius: 15px;
    color: #fff;

    @media(max-width: 800px) {
        margin-top: 3rem;
    }

    h2 {
        margin-bottom: 1rem;
    }

    input {
        height: 35px;
        width: 100%;
        padding: 7px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
        margin-bottom: 1rem;
        &:focus {
        border: 1px solid rgb(255, 255, 255);
        box-shadow: 0 2px 5px 1px #ffffff;
        }
    }

    & > button:active {
        transform: scale(0.9);
    }
    `;

export const LoginP = styled.p`
    margin-top: 1rem;
    font-size: 20px;
    span {
        font-weight: bold;
    }
    a {
        text-decoration: none;
        color: #1fa504;
    }
`;

export const FormError = styled.p`
    color: rgb(233, 2, 2);
    margin-top: 5px;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ShoppingVideo = styled.video`
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    
    @media(max-width: 1000px) {
        max-height: 100%;
    }
`;

// Delete Modals
export const ModalContainer = styled.div`
    position: fixed;
    inset: 0;
    margin: auto;
    background-color: rgb(17, 17, 17);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    max-width: 80%;
    height: 500px;
    max-height: 50%;
    color: white;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 5px 1px #111;

    @media(max-width: 800px) {
        position: fixed;
        top: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 4rem;
        background-color: rgb(17, 17, 17);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        max-width: 80%;
        height: 500px;
        max-height: 50%;
        color: white;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
    }
`;

export const YesButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100px;
    max-width: 30%;
    height: 40px;
    max-height: 30%;
    text-align: center;
    color: white;
    margin: 1rem;
    font-weight: bold;
    cursor: pointer;
    background-color: #1fa504;

    &:hover {
        background-color: #23ca02;
    }
    &:active {
        transform: scale(0.9);
    }
`;

export const NoButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100px;
    max-width: 30%;
    height: 40px;
    max-height: 30%;
    text-align: center;
    color: white;
    margin: 1rem;
    font-weight: bold;
    cursor: pointer;
    background-color: rgb(199, 42, 42);

    &:hover {
        background-color: rgb(231, 48, 48);
    }
    &:active {
        transform: scale(0.9);
    }
`;

// Edit Modals

export const EditModalContainer = styled.div`
    position: fixed;
    inset: 0;
    margin: auto;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({loc}) => loc.includes('product/') ? '1000px' : '500px'};
    max-width: 80%;
    height: ${({loc}) => loc.includes('product/') ? '1000px' : '300px'};
    max-height: 100%;
    color: black;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 5px 1px #111;
    z-index: 1;

    label {
        margin-top: 0.8rem;
    }

    input {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182, 182, 182);
        margin: 0.3rem 0;

        &:focus {
        border: 1px solid rgb(0, 0, 0);
        box-shadow: 0 2px 5px 1px #111;
        }
    }

    select {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182, 182, 182);
        margin: 0.3rem 0;
        background-color: #fff;

        &:focus {
        border: 1px solid rgb(0, 0, 0);
        box-shadow: 0 2px 5px 1px #111;
        }
    }

    @media(max-width: 800px) {
        position: ${({loc}) => loc.includes('product/') ? 'absolute' : 'fixed'};
        flex-direction: column;
        justify-content: center;
        max-height: fit-content;
        margin-top: 3rem;
        margin-bottom: 2rem;
        padding: 0px 1rem;
    }
`;

export const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 50%;
    max-height: 100%;
    margin-top: 1rem;
    gap: 0.5rem;

    @media(max-width: 800px) {
        width: 100%;
        max-width: 100%;
    }
`;

export const CancelProductButton = styled.button`
    background-color: rgb(199, 42, 42);
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    max-width: 170px;
    margin: 1rem auto;
    cursor: pointer;

    &:hover {
        background-color: rgb(231, 48, 48);
    }
`;

export const FormButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const TestDiv = styled.div`
    display: flex;
    padding: 2rem;
`;

export const CurrentOption = styled.option`
    font-weight: 700;
`;