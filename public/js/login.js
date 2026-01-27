$(document).ready(function () {
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    if (!email || !password) {
      showError("Please enter email and password");
      return;
    }

    // 🔴 TEMP: frontend-only test
    if (email === "admin@erm.local" && password === "admin") {
      window.location.href = "/dashboard";
    } else {
      showError("Invalid credentials");
    }
  });

  function showError(msg) {
    $("#loginError").removeClass("d-none").text(msg);
  }
});
