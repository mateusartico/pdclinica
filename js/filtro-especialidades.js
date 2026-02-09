function filtrarEspecialidades() {
  let especialidadeSelecionada = document.getElementById("especialidade").value;

  let todasAsCards = document.querySelectorAll(".card");

  todasAsCards.forEach((card) => {
    if (
      especialidadeSelecionada === "" ||
      card.id === especialidadeSelecionada
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
