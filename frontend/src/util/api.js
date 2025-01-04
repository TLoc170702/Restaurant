import axios from "./axios.customize";

// User
const createUserApi = (username, email, password) => {
  const URL_API = "/v1/api/register";
  const data = {
    username, email, password
  }
  return axios.post(URL_API, data)
}
const loginApi = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = {
    email, password
  }
  return axios.post(URL_API, data)
}
const getUserApi = () => {
  const URL_API = "/v1/api/admin/user";
  return axios.get(URL_API)
}
const addUserApi = async (userData) => {
  const URL_API = "/v1/api/admin/addUser";
  return axios.post(URL_API, userData)
};
const deleteUserApi = async (id) => {
  const URL_API = `/v1/api/admin/deleteUser/${id}`;
  return axios.delete(URL_API, id)
};

// Room
const getRoomApi = () => {
  const URL_API = "/v1/api/admin/rooms";
  return axios.get(URL_API)
};
const addRoomApi = async (formData) => {
  const URL_API = "/v1/api/admin/addroom";
  try {
    const response = await axios.post(URL_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo gửi dữ liệu dạng FormData
      },
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
const getRoomByIdApi = async (id) => {
  const URL_API = `/v1/api/admin/editroom/${id}`;
  return axios.get(URL_API)
};
const editRoomApi = async (id, roomData) => {
  try {
    const response = await axios.put(`/v1/api/admin/editroom/${id}`, roomData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error.response?.data || error.message);
    throw error;
  }
};
const deleteRoomApi = async (id) => {
  const URL_API = `/v1/api/admin/deleteroom/${id}`;
  return axios.delete(URL_API, id)
};

// Offer
const addOfferApi = async (formData) => {
  const URL_API = "/v1/api/admin/addoffer";
  try {
    const response = await axios.post(URL_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo gửi dữ liệu dạng FormData
      },
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
const getOfferApi = () => {
  const URL_API = "/v1/api/admin/offers";
  return axios.get(URL_API)
};
const getOfferByIdApi = async (id) => {
  const URL_API = `/v1/api/admin/getofferbyid/${id}`;
  return axios.get(URL_API)
};
const editOfferApi = async (id, offerData) => {
  try {
    const response = await axios.put(`/v1/api/admin/editoffer/${id}`, offerData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error.response?.data || error.message);
    throw error;
  }
};
const deleteOfferApi = async (id) => {
  const URL_API = `/v1/api/admin/deleteoffer/${id}`;
  return axios.delete(URL_API, id)
};

// Staff 
const addStaffApi = async (formData) => {
  const URL_API = "/v1/api/admin/addstaff";
  try {
    const response = await axios.post(URL_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo gửi dữ liệu dạng FormData
      },
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
const getStaffApi = () => {
  const URL_API = "/v1/api/admin/staffs";
  return axios.get(URL_API)
};
const getStaffByIdApi = async (id) => {
  const URL_API = `/v1/api/admin/getstaffbyid/${id}`;
  return axios.get(URL_API)
};
const editStaffApi = async (id, offerData) => {
  try {
    const response = await axios.put(`/v1/api/admin/editstaff/${id}`, offerData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error.response?.data || error.message);
    throw error;
  }
};
const deleteStaffApi = async (id) => {
  const URL_API = `/v1/api/admin/deletestaff/${id}`;
  return axios.delete(URL_API, id)
};

// Feedback 
const addFeedbackApi = async (formData) => {
  const URL_API = "/v1/api/admin/addfeedback";
  try {
    const response = await axios.post(URL_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo gửi dữ liệu dạng FormData
      },
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
const getFeedbackApi = () => {
  const URL_API = "/v1/api/admin/feedbacks";
  return axios.get(URL_API)
};
const getFeedbackByIdApi = async (id) => {
  const URL_API = `/v1/api/admin/getfeedbackbyid/${id}`;
  return axios.get(URL_API)
};
const editFeedbackApi = async (id, offerData) => {
  try {
    const response = await axios.put(`/v1/api/admin/editfeedback/${id}`, offerData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating feedback:', error.response?.data || error.message);
    throw error;
  }
};
const deleteFeedbackApi = async (id) => {
  const URL_API = `/v1/api/admin/deletefeedback/${id}`;
  return axios.delete(URL_API, id)
};

// Order
const orderApi = async (payload) => {
  try {
    const token = localStorage.getItem('access_token'); // Lấy token từ localStorage
    if (!token) {
      throw new Error('Token not found. User is not authenticated.');
    }
    const response = await axios.post("/v1/api/admin/orderroom", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};
const getOrderApi = () => {
  const URL_API = "/v1/api/admin/orders";
  return axios.get(URL_API)
};
const getOrderByIdApi = async (id) => {
  const URL_API = `/v1/api/admin/orders/${id}`;
  return axios.get(URL_API)
};
// const confirmApi = async (id, offerData) => {
//   try {
//     const response = await axios.put(`/v1/api/admin/editorder/${id}`, offerData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating feedback:', error.response?.data || error.message);
//     throw error;
//   }
// };
const confirmApi = async (id, offerData, isFormData = false) => {
  try {
    const headers = isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };
    const response = await axios.put(`/v1/api/admin/editorder/${id}`, offerData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating feedback:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update feedback. Please try again.');
  }
};
const deleteOrderApi = async (id) => {
  const URL_API = `/v1/api/admin/deleteorder/${id}`;
  return axios.delete(URL_API, id)
};

export {
  createUserApi, loginApi, getUserApi,
  addUserApi, deleteUserApi,
  getRoomApi, addRoomApi, editRoomApi, getRoomByIdApi, deleteRoomApi,
  addOfferApi, getOfferApi, getOfferByIdApi, editOfferApi, deleteOfferApi,
  addStaffApi, getStaffApi, getStaffByIdApi, editStaffApi, deleteStaffApi,
  addFeedbackApi, getFeedbackApi, getFeedbackByIdApi, editFeedbackApi, deleteFeedbackApi,
  orderApi, getOrderApi, getOrderByIdApi, confirmApi, deleteOrderApi
}