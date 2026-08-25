const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    account => account.email === email && account.password === password
  );

  // alert h 
  if (!user) {
    Swal.fire({
      icon: "error",
      title: "Invalid Login!",
      text: "Invalid email or password.",
      confirmButtonColor: "#6c63ff"
    });
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
// alert h ye bhi
  Swal.fire({
    icon: "success",
    title: "Login Successful!",
    text: `Welcome back, ${user.name}!`,
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    window.location.href = "home.html";
  });
});
