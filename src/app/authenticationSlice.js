import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        token:"",
        isLoggedIn: false,
        emailConfirmationLink: "",
        userId: "",
        usernameAndEmail: ""
    },
    reducers: {
        userAuthenticated: (state,action) => {
            console.log("action", action);
            localStorage.setItem("token", action.payload.accessToken);
            return {
                ...state, ...{
                    token: action.payload.accessToken,
                    isLoggedIn:true,
                    emailConfirmationLink: action.payload.emailConfirmationLink || "",
                    userId: action.payload.userId ,
                    usernameAndEmail: action.payload.usernameAndEmail
                }
            }
        },
        logout: () => {
            localStorage.clear();
        },
        emailConfirmed: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        }
    }
});

export const { userAuthenticated, logout, emailConfirmed  } = authenticationSlice.actions;

export default authenticationSlice.reducer;