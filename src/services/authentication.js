import axios from "axios";
import { userAuthenticated } from "../app/authenticationSlice";

const axiosInstance = axios.create({
    baseURL: "https://expensesbe.azurewebsites.net/",    
});


export const SignUp = async (dispatch, credentials) => {
    try {

        // Check if email is already in use
        const emailCheck = await checkEmailInUse(credentials.email);
        console.log("emailcheck", emailCheck);
        if (emailCheck.isEmailInUse) {
            const error = new Error("Email is already in use.");
            error.response = { status: 400, data: "Email is already in use." };
            throw error;      
        }


        const { data } = await axiosInstance.post("/register", credentials);
    
        const email = credentials.email; 
        const linkResponse = await generateConfirmationLink(email);
        const emailConfirmationLink = linkResponse ? linkResponse : '';

        dispatch(userAuthenticated({ ...data, emailConfirmationLink }));

        return data;
    } catch (error) {
        console.error("Error in SignUp:", error.message);
        throw error;  
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post("/login", credentials);

        const userIdResponse = await axiosInstance.get("/api/user/userid", {
            headers: {
                Authorization: `Bearer ${data.accessToken}` 
            }
        });

        const userId = userIdResponse.data.userId;

        const userNameResponse = await axiosInstance.get("/api/user/username", {
            headers: {
                Authorization: `Bearer ${data.accessToken}` 
            }
        });

        const usernameAndEmail = userNameResponse.data.username;

        dispatch(userAuthenticated({ ...data, userId, usernameAndEmail }));
        console.log("data", data);
        return data;
    } catch (error) {
        console.log("Error!", error.message);
    }
    
}

export const generateConfirmationLink = async (email) => {
    try {
        const response = await axiosInstance.post("/api/User/generateConfirmationLink", JSON.stringify(email), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("response", response);
        return response.data.confirmationLink;
    } catch (error) {
        console.log("Error!", error.message);
        return null;
    }
};

//probably could be implemented inside the signin method
export const isEmailConfirmed = async (credentials) => {
    try {
        const { data } = await axiosInstance.post("/login", credentials);

        const response = await axiosInstance.get("/api/user/isEmailConfirmed", {
            headers: {
                Authorization: `Bearer ${data.accessToken}` 
            }
        });

        return response.data.emailConfirmed;

    } catch(error){
        console.log("Error!", error.message);
        return null;
    }

}

export const checkEmailInUse = async (email) => {
    try {
        console.log("partiti", email);

        const response = await axiosInstance.post("/api/User/isEmailInUse", JSON.stringify(email), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("response", response);
        return response.data;
    } catch (error) {
      console.log("errore nella checkemailinuse: ", error.message);
    }
};




