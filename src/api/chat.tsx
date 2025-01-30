import axios from "axios";
import { Message } from "../type/type";

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error.response || 'Try later');
});

const ENDPOINT_URL = "http://localhost:3000/chat";

const chatApi = {
  async getAll(room: string) {
    const result = await axios.get(`${ENDPOINT_URL}/${room}`);
    return result.data;
  },
  async post(messageData: Message) {
    await axios.post(ENDPOINT_URL, messageData);
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