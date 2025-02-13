import axios from "axios";

const apiClient = axios.create({
    baseURL : 'https://localhost:7298/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateOtp = (userId) => {
    return apiClient.post('/Otp/generate', userId);
};

export const validateOtp = (userId, userOtp) => {
    return apiClient.post('/Otp/validate', { userId, userOtp });
};