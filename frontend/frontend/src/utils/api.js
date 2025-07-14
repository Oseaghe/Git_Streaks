import axios from 'axios';

const API_URL = 'http://localhost:8080/api/streaks'; // adjust when deployed

export const fetchStreaks = async (usernames) => {
    const response = await axios.post(API_URL, { usernames: usernames });
    return response.data;
};
