import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";
import { setHeaders } from "./functions";

const initialState = {
    items: [],
    status: null,
    createStatus: null,
    deleteStatus: null,
    editStatus: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);

        return response?.data
    }
);

export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/products`, values, setHeaders()
            );
            return response.data;
        } catch (error) {
            toast.error(error.response?.data,
                {
                    position: "bottom-left",
                    autoClose: 2500,
                });
            return rejectWithValue(error.response?.data) 
        }
    }
);

export const productsEdit = createAsyncThunk(
    "products/productsEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/products/edit/${values.product._id}`, values, setHeaders()
            );
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data,
                {
                    position: "bottom-left",
                    autoClose: 2500,
                });
        }
    }
);

export const productsDelete = createAsyncThunk(
    "products/productsDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/products/delete/${id}`, setHeaders()
            );
            return response.data;
            
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data,
                {
                    position: "bottom-left",
                    autoClose: 2500,
                });
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "rejected"
        },
        [productsCreate.pending]: (state, action) => {
            state.createStatus = "pending"
        },
        [productsCreate.fulfilled]: (state, action) => {
            state.createStatus = "no payload"
            if (action.payload) {
                state.createStatus = "success"
                state.items.push(action.payload)
                toast.success("Product created",
                {
                    position: "bottom-left",
                    autoClose: 2500,
                })
            }
        },
        [productsCreate.rejected]: (state, action) => {
            state.createStatus = "rejected"
        },
        [productsDelete.pending]: (state, action) => {
            state.deleteStatus = "pending"
        },
        [productsDelete.fulfilled]: (state, action) => {

            const newList = state.items.filter((item) => item._id !== action.payload._id)

            state.items = newList
            state.deleteStatus = "success"
            toast.error("Product deleted",
            {
                position: "bottom-left",
                autoClose: 2500,
            })
        },
        [productsDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected"
        },
        [productsEdit.pending]: (state, action) => {
            state.editStatus = "pending"
        },
        [productsEdit.fulfilled]: (state, action) => {

            const updatedProducts = state.items.map((product) =>
            product._id === action.payload._id ? action.payload: product);

            state.items = updatedProducts;
            state.editStatus = "success"
            toast.info("Product saved",
            {
                position: "bottom-left",
                autoClose: 2500,
            })
        },
        [productsEdit.rejected]: (state, action) => {
            state.editStatus = "rejected"
        }
    }
});

export default productsSlice.reducer