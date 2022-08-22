import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";
import { setHeaders } from "./functions";

const initialState = {
    list: [],
    status: null,
    deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all-users`, setHeaders());

        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const usersDelete = createAsyncThunk(
    "users/userDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/users/delete/${id}`, setHeaders()
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

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [usersFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [usersFetch.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = "success";
        },
        [usersFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [usersDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [usersDelete.fulfilled]: (state, action) => {
            const newList = state.list.filter(
                (user) => user._id !== action.payload._id
                );
            state.list = newList;
            state.deleteStatus = "success";
            toast.error("User deleted.",
                {
                    position: "bottom-left",
                    autoClose: 2500,
                });
        },
        [usersDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
    }
});

export default usersSlice.reducer;