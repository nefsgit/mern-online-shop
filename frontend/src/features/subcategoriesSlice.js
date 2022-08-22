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

export const subcategoriesFetch = createAsyncThunk(
    "subcategories/subcategoriesFetch",
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/subcategories`);

        return response?.data
    }
);

export const subcategoriesCreate = createAsyncThunk(
    "subcategories/subcategoriesCreate",
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/subcategories`, values, setHeaders()
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

export const subcategoriesEdit = createAsyncThunk(
    "subcategories/subcategoriesEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/subcategories/edit/${values.subcategory._id}`, values, setHeaders()
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

export const subcategoriesDelete = createAsyncThunk(
    "subcategories/subcategoriesDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/subcategories/delete/${id}`, setHeaders()
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

const subcategoriesSlice = createSlice({
    name: "subcategories",
    initialState,
    reducers: {},
    extraReducers: {
        [subcategoriesFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [subcategoriesFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload
        },
        [subcategoriesFetch.rejected]: (state, action) => {
            state.status = "rejected"
        },
        [subcategoriesCreate.pending]: (state, action) => {
            state.createStatus = "pending"
        },
        [subcategoriesCreate.fulfilled]: (state, action) => {
            state.createStatus = "no payload"
            if (action.payload) {
                state.createStatus = "success"
                state.items.push(action.payload)
                toast.success("Subcategory created",
                {
                    position: "bottom-left",
                    autoClose: 2500,
                })
            }
        },
        [subcategoriesCreate.rejected]: (state, action) => {
            state.createStatus = "rejected"
        },
        [subcategoriesDelete.pending]: (state, action) => {
            state.deleteStatus = "pending"
        },
        [subcategoriesDelete.fulfilled]: (state, action) => {

            const newList = state.items.filter((item) => item._id !== action.payload._id)

            state.items = newList
            state.deleteStatus = "success"
            toast.error("Subcategory deleted",
            {
                position: "bottom-left",
                autoClose: 2500,
            })
        },
        [subcategoriesDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected"
        },
        [subcategoriesEdit.pending]: (state, action) => {
            state.editStatus = "pending"
        },
        [subcategoriesEdit.fulfilled]: (state, action) => {

            const updatedSubcategories = state.items.map((subcategory) =>
            subcategory._id === action.payload._id ? action.payload: subcategory);

            state.items = updatedSubcategories;
            state.editStatus = "success"
            toast.info("Subcategory saved",
            {
                position: "bottom-left",
                autoClose: 2500,
            })
        },
        [subcategoriesEdit.rejected]: (state, action) => {
            state.editStatus = "rejected"
        }
    }
});

export default subcategoriesSlice.reducer