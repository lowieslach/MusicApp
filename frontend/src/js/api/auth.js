export const authApi = {
  isAuthenticated: false,
  signin(newUser, callback) {
    console.log(newUser);
    this.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
