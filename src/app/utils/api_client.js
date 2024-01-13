import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getRequestWithAuth = async (url) => {

    const token = localStorage.getItem("token");
    const header = {
        "Authorization": `Bearer ${token}`
    };
    const checkResponseStatus = (res) => {
        if (res.status) {
            return true;
        } else {
            return false;
        }
    }

    try {
        const { data } = await axios.get(baseUrl + url, {
            headers: header
        });
        if (checkResponseStatus(data)) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error.toString());
    }
};

export const getRequest = async (url) => {

    const checkResponseStatus = (res) => {
        if (res.status) {
            return true;
        } else {
            return false;
        }
    }

    try {
        const { data } = await axios.get(baseUrl + url);
        if (checkResponseStatus(data)) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error.toString());
    }
};

export const postRequestWithAuth = async (url, body) => {
    const token = localStorage.getItem("token");
    const header = {
        "Authorization": `Bearer ${token}`
    };
    const checkResponseStatus = (res) => {
        if (res.status) {
            return true;
        } else {
            return false;
        }
    }

    try {
        console.log(body);
        const { data } = await axios.post(baseUrl + url, body, {
            headers: header
        });
        if (checkResponseStatus(data)) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error.toString());
    }
}

export const postRequest = async (url, body) => {
    const checkResponseStatus = (res) => {
        if (res.status) {
            return true;
        } else {
            return false;
        }
    }

    try {
        const { data } = await axios.post(baseUrl + url, body);
        if (checkResponseStatus(data)) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error.toString());
    }
}