const baseURL = `http://localhost:3005/api/user/auth`;
const loginDiv = document.querySelector(".login");
const register = `
    <div class="login-sign-in register">
        <h2>Register</h2>
        <div class="user-inputs">
            <input placeholder="Enter your username" type="text" id="username"/>
            <input placeholder="Enter your password" type="password" id="password"/>
            <input placeholder="Confirm your password" type="password" id="confirm-password"/>
        </div>
        <div class="sign-in-buttons">
            <button onclick="changeScreen()">Sign In</button>
            <button onclick="registerUser()">Register</button>
        </div>
    </div>`;

const login = `
    <div class="login-sign-in login">
        <h2>Sign In</h2>
        <div class="user-inputs">
            <input placeholder="Enter your username" type="text" id="username"/>
            <input placeholder="Enter your password" type="password" id="password"/>
        </div>
        <div class="sign-in-buttons">
            <button onclick="changeScreen()">Register</button>
            <button onclick="loginUser()">Sign In</button>
        </div>
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
        localStorage.setItem("username", response.data);
        if (response.data === username.value) {
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
            localStorage.setItem("username", response.data);
            window.location.href = "/projects";
          })
          .catch((error) => console.log(error));
    } else {
        console.log('passwords do not match');
    }

}