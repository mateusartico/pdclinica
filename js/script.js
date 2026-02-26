// Dark mode
const THEME_KEY = "theme";

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  updateIcons(theme);
  updateLogo(theme);
}

function updateIcons(theme) {
  document.querySelectorAll("[data-theme-toggle] i").forEach((icon) => {
    icon.className = theme === "dark" ? "bi bi-moon" : "bi bi-sun";
  });
}

function updateLogo(theme) {
  document.querySelectorAll(".logo").forEach((logo) => {
    if (theme === "dark") {
      logo.src = logo.src.replace(
        "Logo-PD-Clinica.png",
        "Logo-PD-Clinica-Dark.png",
      );
    } else {
      logo.src = logo.src.replace(
        "Logo-PD-Clinica-Dark.png",
        "Logo-PD-Clinica.png",
      );
    }
  });
}

const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = prefersDark ? "dark" : "light";
  applyTheme(systemTheme);
  localStorage.setItem(THEME_KEY, systemTheme);
}

document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
});

function filtrarEspecialidades() {
  let especialidadeSelecionada = document.getElementById("especialidade").value;

  let todasAsColunas = document.querySelectorAll(
    "#lista-especialidades > [id]",
  );

  todasAsColunas.forEach((coluna) => {
    if (
      especialidadeSelecionada === "" ||
      coluna.id === especialidadeSelecionada
    ) {
      coluna.style.display = "";
    } else {
      coluna.style.display = "none";
    }
  });
}

function filtrarVagas() {
  let vagaSelecionada = document.getElementById("busca-vaga").value;

  let todasAsVagas = document.querySelectorAll(".vaga");

  todasAsVagas.forEach((vaga) => {
    if (vagaSelecionada === "" || vaga.id === vagaSelecionada) {
      vaga.style.display = "";
    } else {
      vaga.style.display = "none";
    }
  });
}

/* SISTEMA DE TOASTS */

if (!document.getElementById("toast-container")) {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  const icon =
    type === "success"
      ? '<i class="bi bi-check-circle-fill toast-icon"></i>'
      : '<i class="bi bi-exclamation-circle-fill toast-icon"></i>';

  toast.innerHTML = `
        <div style="display:flex; align-items:center;">
            ${icon}
            <span>${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;

  container.appendChild(toast);

  const removeToast = () => {
    toast.style.animation = "fadeOut 0.3s ease forwards";
    toast.addEventListener("animationend", () => {
      if (toast.parentElement) toast.remove();
    });
  };

  setTimeout(removeToast, 4000);
  toast.querySelector(".toast-close").addEventListener("click", removeToast);
}

/* FUNÇÕES AUXILIARES (VISUAL) */

function setError(input) {
  input.classList.add("input-error");
}

function clearError(input) {
  input.classList.remove("input-error");
}

/* LÓGICA: FORMULÁRIO DE AGENDAMENTO */

const formAgendamento = document.getElementById("form-agendamento");

if (formAgendamento) {
  const btnAgendar = document.getElementById("btn-agendar");

  // Máscara Telefone
  const inputTelefone = document.getElementById("telefone");
  inputTelefone.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    e.target.value = value;
  });

  btnAgendar.addEventListener("click", (e) => {
    e.preventDefault();

    let isValid = true;
    let msgErro = null;

    const nome = document.getElementById("nome");
    const telefone = document.getElementById("telefone");
    const convenio = document.getElementById("select-convenio");
    const especialidade = document.getElementById("select-especialidade");
    const data = document.getElementById("data");

    [nome, telefone, convenio, especialidade, data].forEach(clearError);

    if (nome.value.trim().split(" ").length < 2) {
      setError(nome);
      isValid = false;
      if (!msgErro) msgErro = "Informe seu nome completo (Nome e Sobrenome).";
    }

    if (telefone.value.replace(/\D/g, "").length < 10) {
      setError(telefone);
      isValid = false;
      if (!msgErro) msgErro = "Informe um telefone válido (com DDD).";
    }

    if (convenio.value === "") {
      setError(convenio);
      isValid = false;
      if (!msgErro) msgErro = "Selecione o seu convênio.";
    }

    if (especialidade.value === "") {
      setError(especialidade);
      isValid = false;
      if (!msgErro) msgErro = "Selecione a especialidade médica.";
    }

    const dataSelecionada = new Date(data.value);
    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0);

    if (data.value === "") {
      setError(data);
      isValid = false;
      if (!msgErro) msgErro = "Selecione uma data para a consulta.";
    } else if (dataSelecionada < dataHoje) {
      setError(data);
      isValid = false;
      if (!msgErro) msgErro = "A data não pode ser anterior a hoje.";
    }

    if (!isValid) {
      showToast(msgErro, "error");
    } else {
      showToast("Agendamento realizado com sucesso!", "success");
      formAgendamento.reset();
    }
  });
}

/* LÓGICA: FORMULÁRIO DE LOGIN */

const formLogin = document.getElementById("form-login");

if (formLogin) {
  const btnEntrar = document.getElementById("btn-entrar");
  const inputEmail = document.getElementById("login-email");
  const inputSenha = document.getElementById("login-senha");

  btnEntrar.addEventListener("click", (e) => {
    e.preventDefault();

    clearError(inputEmail);
    clearError(inputSenha);

    const emailDigitado = inputEmail.value.trim();
    const senhaDigitada = inputSenha.value.trim();

    if (emailDigitado === "") {
      setError(inputEmail);
      showToast("Por favor, informe seu e-mail.", "error");
      return;
    }

    if (senhaDigitada === "") {
      setError(inputSenha);
      showToast("Por favor, informe sua senha.", "error");
      return;
    }

    if (senhaDigitada.length < 5) {
      setError(inputSenha);
      showToast("A senha deve ter no mínimo 5 caracteres.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailDigitado)) {
      setError(inputEmail);
      showToast("O formato do e-mail é inválido.", "error");
      return;
    }

    if (emailDigitado === "admin@gmail.com") {
      if (senhaDigitada === "12345") {
        showToast(
          "Login Administrativo realizado! Redirecionando...",
          "success",
        );
        setTimeout(() => {
          window.location.href = "area-administrativa.html";
        }, 2000);
      } else {
        setError(inputSenha);
        setError(inputEmail);
        inputSenha.value = "";
        showToast("E-mail ou senha incorretos.", "error");
      }
    } else {
      showToast(
        "Login realizado com sucesso! Acessando área do paciente...",
        "success",
      );
      setTimeout(() => {
        window.location.href = "area-paciente.html";
      }, 2000);
    }
  });
}

/* LÓGICA: FORMULÁRIO DE CADASTRO */

const formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
  const btnCadastrar = document.getElementById("btn-cadastrar");

  const inputTel = document.getElementById("cad-telefone");
  inputTel.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    e.target.value = v;
  });

  btnCadastrar.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("cad-nome");
    const telefone = document.getElementById("cad-telefone");
    const email = document.getElementById("cad-email");
    const senha = document.getElementById("cad-senha");
    const confirmaSenha = document.getElementById("cad-confirma-senha");
    const termos = document.getElementById("check-termos");

    [nome, telefone, email, senha, confirmaSenha].forEach(clearError);

    let isValid = true;
    let msgErro = null;

    if (nome.value.trim().split(" ").length < 2) {
      setError(nome);
      isValid = false;
      if (!msgErro) msgErro = "Informe seu nome completo.";
    }

    if (telefone.value.replace(/\D/g, "").length < 10) {
      setError(telefone);
      isValid = false;
      if (!msgErro) msgErro = "Informe um telefone válido.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email);
      isValid = false;
      if (!msgErro) msgErro = "Informe um e-mail válido.";
    }

    if (senha.value.length < 5) {
      setError(senha);
      isValid = false;
      if (!msgErro) msgErro = "A senha deve ter no mínimo 5 caracteres.";
    }

    if (senha.value !== confirmaSenha.value) {
      setError(confirmaSenha);
      isValid = false;
      if (!msgErro) msgErro = "As senhas não coincidem.";
    }

    if (!isValid) {
      showToast(msgErro, "error");
      return;
    }

    if (!termos.checked) {
      showToast("Você precisa aceitar os Termos de Uso.", "warning");
      return;
    }

    showToast("Cadastro realizado com sucesso! Redirecionando...", "success");

    formCadastro.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
}

/* LÓGICA: RECUPERAÇÃO DE SENHA */

const formRecuperacao = document.getElementById("form-recuperacao");

if (formRecuperacao) {
  const btnEnviar = document.getElementById("btn-enviar");
  const btnRecaptcha = document.getElementById("btn-recaptcha");
  const txtRecaptcha = document.getElementById("txt-recaptcha");

  let recaptchaMarcado = false;

  const toggleRecaptcha = () => {
    btnRecaptcha.classList.toggle("checked");

    recaptchaMarcado = btnRecaptcha.classList.contains("checked");
  };

  if (btnRecaptcha) btnRecaptcha.addEventListener("click", toggleRecaptcha);
  if (txtRecaptcha) txtRecaptcha.addEventListener("click", toggleRecaptcha);

  btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("rec-email");
    clearError(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email);
      showToast("Informe um e-mail válido.", "error");
      return;
    }

    if (!recaptchaMarcado) {
      showToast("Por favor, confirme que você não é um robô.", "warning");
      return;
    }

    showToast("E-mail de recuperação enviado!", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);
  });
}

/* LÓGICA: FORMULÁRIO DE CONTATO */

const formContato = document.getElementById("form-contato");

if (formContato) {
  const btnContato = document.getElementById("btn-contato");

  const inputTelContato = document.getElementById("contato-telefone");
  if (inputTelContato) {
    inputTelContato.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      e.target.value = v;
    });
  }

  btnContato.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("contato-nome");
    const telefone = document.getElementById("contato-telefone");
    const email = document.getElementById("contato-email");
    const mensagem = document.getElementById("contato-mensagem");

    [nome, telefone, email, mensagem].forEach(clearError);

    let isValid = true;
    let msgErro = null;

    if (nome.value.trim().split(" ").length < 2) {
      setError(nome);
      isValid = false;
      if (!msgErro) msgErro = "Informe seu nome completo.";
    }

    if (telefone.value.replace(/\D/g, "").length < 10) {
      setError(telefone);
      isValid = false;
      if (!msgErro) msgErro = "Informe um telefone válido.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email);
      isValid = false;
      if (!msgErro) msgErro = "Informe um e-mail válido.";
    }

    if (mensagem.value.trim().length < 10) {
      setError(mensagem);
      isValid = false;
      if (!msgErro) msgErro = "Sua mensagem deve ter pelo menos 10 caracteres.";
    }

    if (!isValid) {
      showToast(msgErro, "error");
    } else {
      showToast(
        "Mensagem enviada com sucesso! Entraremos em contato.",
        "success",
      );
      formContato.reset();
    }
  });
}

/* LÓGICA: TRABALHE CONOSCO */

const formTrabalhe = document.getElementById("form-trabalhe");

if (formTrabalhe) {
  const btnEnviarCurriculo = document.getElementById("btn-enviar-curriculo");

  const inputTelCand = document.getElementById("cand-telefone");
  if (inputTelCand) {
    inputTelCand.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      e.target.value = v;
    });
  }

  btnEnviarCurriculo.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("cand-nome");
    const telefone = document.getElementById("cand-telefone");
    const email = document.getElementById("cand-email");
    const curriculo = document.getElementById("cand-curriculo");

    [nome, telefone, email, curriculo].forEach(clearError);

    let isValid = true;
    let msgErro = null;

    if (nome.value.trim().split(" ").length < 2) {
      setError(nome);
      isValid = false;
      if (!msgErro) msgErro = "Informe seu nome completo.";
    }

    if (telefone.value.replace(/\D/g, "").length < 10) {
      setError(telefone);
      isValid = false;
      if (!msgErro) msgErro = "Informe um telefone válido.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email);
      isValid = false;
      if (!msgErro) msgErro = "Informe um e-mail válido.";
    }

    if (curriculo.files.length === 0) {
      setError(curriculo);
      isValid = false;
      if (!msgErro) msgErro = "Por favor, anexe seu currículo.";
    } else {
      const arquivo = curriculo.files[0];
      const extensoesPermitidas = ["application/pdf", "application/msword"];
      const tamanhoMaximo = 5 * 1024 * 1024; // 5MB

      if (!extensoesPermitidas.includes(arquivo.type)) {
        setError(curriculo);
        isValid = false;
        if (!msgErro) msgErro = "O arquivo deve ser .pdf ou .doc.";
      }

      if (arquivo.size > tamanhoMaximo) {
        setError(curriculo);
        isValid = false;
        if (!msgErro) msgErro = "O arquivo deve ter no máximo 5MB.";
      }
    }

    if (!isValid) {
      showToast(msgErro, "error");
    } else {
      showToast("Inscrição enviada com sucesso! Boa sorte.", "success");
      formTrabalhe.reset();
    }
  });
}
