const baseURL = `http://localhost:3005/api/user/auth`;
const loginDiv = document.querySelector(".login");
const register = `
    <div class="login-sign-in register">
        <h2 class="title" >Register</h2>

        <input placeholder="Enter your username" type="text" id="username"/>
        <input placeholder="Enter your password" type="password" id="password"/>
        <input placeholder="Confirm your password" type="password" id="confirm-password"/>

        <button class="top-button" onclick="changeScreen()">Sign In</button>
        <button class="bottom-button" onclick="registerUser()">Register</button>

    </div>`;

const login = `
    <div class="login-sign-in login">
        <h2 class="title" >Sign In</h2>

        <input placeholder="Enter your username" type="text" id="username"/>
        <input placeholder="Enter your password" type="password" id="password"/>


        <button class="top-button" onclick="changeScreen()">Register</button>
        <button class="bottom-button" onclick="loginUser()">Sign In</button>

    </div>`;

loginDiv.innerHTML = login;
let value = true;

const changeScreen = () => {
  loginDiv.innerHTML = "";
  if (value) {
    loginDiv.innerHTML = register;
    value = !value;
  } else {
    loginDiv.innerHTML = login;
    value = !value;
  }
};

const loginUser = () => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    
    const signIn = {
        username: username.value,
        password: password.value
    };
    
    console.log(signIn);
    axios
      .post(baseURL, signIn)
      .then((response) => {
        sessionStorage.setItem("username", response.data.user_username);
        sessionStorage.setItem("user_id", response.data.user_id);
        if (response.data.user_username === username.value) {
            window.location.href = "/projects";
        }
      })
      .catch((error) => console.log(error));
}

const registerUser = () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const confirmationPassword = document.querySelector("#confirm-password").value;

    if (password === confirmationPassword) {
        const registerUsr = {
            username: username,
            password: password
        };
        axios
          .put(baseURL, registerUsr)
          .then((response) => {
            sessionStorage.setItem("username", response.data.user_username);
            sessionStorage.setItem("user_id", response.data.user_id)
            window.location.href = "/projects";
          })
          .catch((error) => console.log(error));
    } else {
        console.log('passwords do not match');
    }

}