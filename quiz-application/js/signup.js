const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    Swal.fire({
      icon: "error",
      title: "Account Already Exists!",
      text: "An account with this email already exists."
    });
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: "success",
    title: "Signup Successful!",
    text: "Your account has been created successfully.",
    confirmButtonColor: "#6c63ff"
  }).then(() => {
    window.location.href = "index.html";
  });
});
