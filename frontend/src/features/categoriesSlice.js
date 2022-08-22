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

export const categoriesFetch = createAsyncThunk(
    "categories/categoriesFetch",
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);

        return response?.data
    }
);

export const categoriesCreate = createAsyncThunk(
    "categories/categoriesCreate",
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/categories`, values, setHeaders()
            );
            console.log(response.data)
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

export const categoriesEdit = createAsyncThunk(
    "categories/categoriesEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/categories/edit/${values.category._id}`, values, setHeaders()
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

export const categoriesDelete = createAsyncThunk(
    "categories/categoriesDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/categories/delete/${id}`, setHeaders()
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

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: {
        [categoriesFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [categoriesFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload
        },
        [categoriesFetch.rejected]: (state, action) => {
            state.status = "rejected"
        },
        [categoriesCreate.pending]: (state, action) => {
            state.createStatus = "pending"
        },
        [categoriesCreate.fulfilled]: (state, action) => {
            state.createStatus = "no payload"
            if (action.payload) {
                state.createStatus = "success"
                state.items.push(action.payload)
                toast.success("Category created",
                {
                    position: "bottom-left",
                    autoClose: 2500,
                })
            }
        },
        [categoriesCreate.rejected]: (state, action) => {
            state.createStatus = "rejected"
        },
        [categoriesDelete.pending]: (state, action) => {
            state.deleteStatus = "pending"
        },
        [categoriesDelete.fulfilled]: (state, action) => {

            const newList = state.items.filter((item) => item._id !== action.payload._id)

            state.items = newList
            state.deleteStatus = "success"
            toast.error("Category deleted",
            {
                position: "bottom-left",
                autoClose: 2500,
            })
        },
        [categoriesDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected"
        },
        [categoriesEdit.pending]: (state, action) => {
            state.editStatus = "pending"
        },
        [categoriesEdit.fulfilled]: (state, action) => {

            const updatedCategories = state.items.map((category) =>
            category._id === action.payload._id ? action.payload: category);

            state.items = updatedCategories;
            state.editStatus = "success"
            toast.info("Category saved",
            {
                position: "bottom-left",
                autoClose: 2500,
            })
        },
        [categoriesEdit.rejected]: (state, action) => {
            state.editStatus = "rejected"
        }
    }
});

export default categoriesSlice.reducer