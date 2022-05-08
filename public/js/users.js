const deleteBtn = document.getElementById('delete-account');
const saveBtn = document.getElementById('save-btn');

const saveUser = (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input');
    const password = document.getElementById('password-input');
    let userID = 0;
    axios.get(`http://localhost:3005/api/users/?username=${localStorage.getItem("username")}`)
    .then(res => {
        console.log(res.data[0]);
        userID = res.data[0].user_id;   
        const updateUser = {
            user_username: username.value,
            user_password: password.value,
            user_id: userID
        }

        axios.put(`/api/users/`, updateUser)
        .then(response => {
            console.log('hit');
            document.getElementById('username-input').value = '';
            document.getElementById('password-input').value = '';
            localStorage.setItem('username', response.data[0].user_username);
            showUserInfo();
        }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));



}


const showUserInfo = () => {
    document.getElementById('username-input').value = localStorage.getItem("username");
}


const deleteUser = (e) => {
    e.preventDefault();
    axios.delete(`/api/users/?username=${localStorage.getItem("username")}`)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log(err));
}

saveBtn.addEventListener('click', saveUser);
deleteBtn.addEventListener('click', deleteUser);
showUserInfo();