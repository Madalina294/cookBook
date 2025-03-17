const signInForm = document.querySelector(".signinForm");
const signInBtn = document.querySelector("#signInBtn");

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#passwordConfirm").value;

  if (username === "") {
    alert("Please enter a username");
  } else if (password === "") {
    alert("Please enter a password");
  } else if (passwordConfirm === "") {
    alert("Please confirm the password");
  } else if (password !== passwordConfirm) {
    alert("The passwords do not match");
  } else {
    console.log(username, password);
    let user = {
      username: username,
      password: password,
    };
    localStorage.setItem("user", user);
    signInForm.innerHTML = `<p>You have successfully signed in.</p>`;
    const goBackBtn = document.createElement("button");
    goBackBtn.classList.add("goBackBtn");
    goBackBtn.innerText = "Go Back";
    goBackBtn.addEventListener("click", () => {
      goBackAndClose();
    });
    signInForm.appendChild(goBackBtn);
  }
});

function goBackAndClose() {
  if (window.opener) {
    window.opener.focus(); // Bring the previous tab into focus
  }
  window.close(); // Close the current tab
}
