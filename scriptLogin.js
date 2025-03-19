const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  console.log(username, password);
  if (username === "") {
    alert("Please enter a username");
  } else if (password === "") {
    alert("Please enter a password");
  } else {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      let userStatus = {
        user: user,
        status: "loggedIn",
      };
      sessionStorage.setItem("userStatus", JSON.stringify(userStatus));
      self.opener = null;
      window.close();
    } else {
      alert("Invalid username or password");
    }
  }
});
