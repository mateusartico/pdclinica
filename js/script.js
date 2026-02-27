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

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    e.target.value = value;
  });
}

function filtrarEspecialidades() {
  let especialidadeSelecionada = document.getElementById("especialidade").value;
  let todasAsColunas = document.querySelectorAll(
    "#lista-especialidades > [id]",
  );

  todasAsColunas.forEach((coluna) => {
    coluna.style.display =
      especialidadeSelecionada === "" || coluna.id === especialidadeSelecionada
        ? ""
        : "none";
  });
}

function filtrarVagas() {
  let vagaSelecionada = document.getElementById("busca-vaga").value;
  let todasAsVagas = document.querySelectorAll(".vaga");

  todasAsVagas.forEach((vaga) => {
    vaga.style.display =
      vagaSelecionada === "" || vaga.id === vagaSelecionada ? "" : "none";
  });
}

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

function setError(input) {
  input.classList.add("input-error");
}

function clearError(input) {
  input.classList.remove("input-error");
}

const formAgendamento = document.getElementById("form-agendamento");

if (formAgendamento) {
  const btnAgendar = document.getElementById("btn-agendar");

  const inputTelefone = document.getElementById("telefone");
  if (inputTelefone) aplicarMascaraTelefone(inputTelefone);

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
      if (!msgErro) msgErro = "Informe seu nome completo.";
    }

    if (telefone.value.replace(/\D/g, "").length < 10) {
      setError(telefone);
      isValid = false;
      if (!msgErro) msgErro = "Informe um telefone válido.";
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
      if (!msgErro) msgErro = "Selecione uma data.";
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

const inputTel = document.getElementById("cad-telefone");
if (inputTel) aplicarMascaraTelefone(inputTel);

const inputTelContato = document.getElementById("contato-telefone");
if (inputTelContato) aplicarMascaraTelefone(inputTelContato);

const inputTelCand = document.getElementById("cand-telefone");
if (inputTelCand) aplicarMascaraTelefone(inputTelCand);

const linhasConfig = document.querySelectorAll(".linha-config");

if (linhasConfig.length > 0) {
  linhasConfig.forEach((opcao) => {
    opcao.style.cursor = "pointer";

    opcao.addEventListener("click", () => {
      showToast(
        "As configurações estão temporariamente indisponíveis.",
        "warning",
      );
    });
  });
}
