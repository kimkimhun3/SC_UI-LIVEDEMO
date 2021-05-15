import axios from "axios";
import cookie from "./cookie";

const SERVER = process.env.VUE_APP_SERVER;
const CHAT_SERVER = process.env.VUE_APP_CHAT_SERVER;

class Service {
  static async addDevice(deviceId){
    const token = cookie.getCookie("auth-token");
    const response = await axios.post(`${SERVER}device/add`,{deviceId},{headers:{'auth-token':token}})
    return response.data
  }
  // Get UserInfo
  static getUserInfo() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    return axios.get(`${SERVER}users/user`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Retrieve User's History
  static getUserHistory() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    return axios.get(`${SERVER}users/userHistory`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Change Cover
  static async changeCover(newCover) {
    const token = cookie.getCookie("auth-token");
    const response = await axios.post(
      `${SERVER}users/changeCover`,
      { newCover },
      { params: {}, headers: { "auth-token": token } }
    );
    return response.data;
  }

  // ChangeProfile
  static async changeProfile(newProfile) {
    const token = cookie.getCookie("auth-token");
    const response = await axios.post(
      `${SERVER}users/changeProfile`,
      { newProfile },
      { params: {}, headers: { "auth-token": token } }
    );
    return response.data;
  }

  // Get Users info
  static getAllUsers() {
    const token = cookie.getCookie("auth-token");
    return axios.get(`${SERVER}users/allUsers`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Start Stream
  static getCurrentlyStreaming(limit, status) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${SERVER}streams/getCurrentlyStream`,
      { limit, status },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );
  }

  // Start Stream
  static changePassword(password, newPassword) {
      const token = cookie.getCookie("auth-token");
      return axios.post(
        `${SERVER}auth/changePassword`,
        { password, newPassword },
        {
          params: {},
          headers: { "auth-token": token }
        }
      );
  }

  // Start Stream
  static startStream(
    streamTitle,
    description,
    thumbnail,
    isPrivate,
    password,
    streamBy,
    role
  ) {
    console.log("Start");
    const token = cookie.getCookie("auth-token");
    const route = role === "Device" ? "deviceStartStream" : "startStream";
    console.log(streamTitle + description + isPrivate + password);
    return axios.post(
      `${SERVER}streams/${route}`,
      {
        streamTitle,
        description,
        thumbnail,
        isPrivate,
        password,
        streamBy
      },
      { params: {}, headers: { "auth-token": token } }
    );
  }

  // Join Stream
  static async joinStream(streamCode, pwd) {
    const token = cookie.getCookie("auth-token");
    const result = await axios.post(
      `${SERVER}streams/joinStream`,
      {
        streamCode,
        pwd
      },
      { params: {}, headers: { "auth-token": token } }
    );

    if (result.data.errCode != undefined) {
      window.replace("/StreamNotFound");
    } else {
      return result.data;
    }
  }

  // Edit Stream
  static async editStream(streamCode, streamTitle, description) {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios.post(
      `${SERVER}streams/editstream`,
      {
        streamCode,
        streamTitle,
        description
      },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );

    return result.data;
  }

  // Stop stream
  static async stopStream(usedBy = "user", streamCode = "none") {
    let route = usedBy === "admin" ? "adminStopStream" : "stopStream";
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios
      .post(
        `${SERVER}streams/${route}`,
        {
          streamCode
        },
        {
          params: {},
          headers: { "auth-token": token }
        }
      )
      .catch(err => alert(err));
    return result;
  }

  // Get Stream detail
  static getStreamDetail(streamCode) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${SERVER}streams/getStreamDetail`,
      { streamCode },
      { params: {}, headers: { "auth-token": token } }
    );
  }

  // Post Data for signing up
  static async signUp(email, pwd, name) {
    return axios.post(`${SERVER}auth/signUp`, {
      email,
      pwd,
      name
    });
  }

  // Change userRole
  static async changeRole(email, role) {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios.post(
      `${SERVER}users/changeRole`,
      {
        email,
        role
      },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );

    return result.data;
  }

  // Change user's name
  static changeName(name, password) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${SERVER}users/changeName`,
      { name , password},
      {
        params: {},
        headers: { "auth-token": token }
      }
    );
  }

  // Post Data for login
  static async login(email, pwd) {
    const credential = await axios.post(`${SERVER}auth/login`, {
      email,
      pwd
    });
    const { message, success, token } = credential.data;
    if (success) {
      cookie.setCookie("auth-token", token, 30); //window.localStorage.setItem("auth-token",token)
      localStorage.setItem("LastLogged", Date.now());
      window.location.replace("/home");
    }
    return message;
  }

  static async deviceLogin(email, pwd) {
    const credential = await axios.post(`${SERVER}auth/login`, {
      email,
      pwd
    });
    const { token } = credential.data;
    if (token) {
      cookie.setCookie("auth-token", token, 30); //window.localStorage.setItem("auth-token",token)
      localStorage.setItem("LastLogged", Date.now());
      window.location.replace("/home");
      return null;
    } else {
      return { message: credential.data.message };
    }
  }

  // Logout from all browser tab
  static async logout() {
    cookie.setCookie("auth-token", "", 30);
    localStorage.setItem("LastLogged", Date.now());
  }

  // Get All Chats
  static async getAllChat(roomId) {
    const chat = await axios.post(`${CHAT_SERVER}getChat`, {
      roomId
    });
    if (chat.data != undefined) {
      console.log(chat);
      return {
        chats: chat.data.chats,
        questions: chat.data.questions,
        announcement: chat.data.announcement
      };
    } else {
      return null;
    }
  }
}

export default Service;
