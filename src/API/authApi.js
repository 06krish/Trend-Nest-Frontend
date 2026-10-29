
import axiosInstance from './axiosInstance';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post(
        '/api/auth/register',
        userData
    );

    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post(
        '/api/auth/login',
        credentials
    );

    const user = response.data;

    // Save JWT token
    localStorage.setItem('trendnest_token', user.token);

    // Save user details
    localStorage.setItem(
        'trendnest_user',
        JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    );

    return user;
};

export const logoutUser = () => {
    localStorage.removeItem('trendnest_token');
    localStorage.removeItem('trendnest_user');
};
