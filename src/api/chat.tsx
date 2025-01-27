import axios from "axios";

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error.response || '時間をおいてお試しください。');
});

const ENDPOINT_URL = "http://localhost:3000/chat";

const chatApi = {
  async getAll(room) {
    // await axios.get(ENDPOINT_URL);
    const result = await axios.get(`${ENDPOINT_URL}/${room}`);
    return result.data;
  },
  async post(messageData) {
    await axios.post(ENDPOINT_URL, messageData);
    // const result = await axios.post("http://localhost:3000/chat", messageData);
    // return result.data;
  },
  // async delete(book) {
  //   const result = await axios.delete(ENDPOINT_URL + "/" + book._id);
  //   return result.data;
  // },
  // async patch(book) {
  //   const result = await axios.patch(ENDPOINT_URL + "/" + book._id, book);
  //   return result.data;
  // },
};

export default chatApi;