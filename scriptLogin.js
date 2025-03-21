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
      user.status = "loggedIn";
      localStorage.setItem("users", JSON.stringify(users));
      console.log(user.status);
      goBackAndClose();
    } else {
      alert("Invalid username or password");
    }
  }
});

function goBackAndClose() {
  if (window.opener) {
    window.opener.focus(); // Bring the previous tab into focus
  }
  window.close(); // Close the current tab
}
