/* Checkbox Visual do reCAPTCHA */

const checkbox = document.querySelector(".checkbox-recaptcha");

checkbox.addEventListener("click", () => {
  checkbox.classList.toggle("checked");
});

/* Controle de Fluxo de Usuários */

function entrar() {
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  if (email === "admin@gmail.com" && senha === "12345") {
    window.location.href = "area-administrativa.html";
  } else {
    window.location.href = "area-paciente.html";
  }
}
