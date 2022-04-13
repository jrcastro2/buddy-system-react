export default class tokenManager {
  static getToken() {
    const userToken = localStorage.getItem("token");
    return userToken && userToken;
  }

  static saveToken(userToken) {
    console.log("inside set token:", userToken);

    localStorage.setItem("token", userToken);
  }

  static removeToken() {
    localStorage.removeItem("token");
  }
}