
// #################################################################
// ###  EVENTO: SELECIONAR LINHA  #####################################
// ### pode ser utilizado em uma lista do tipo tabela para selecionar a linha quando
// ### passa por cima.
// #################################################################
function eventSelecionarLinhaQuery(classeLinhas) {
  document.querySelectorAll(classeLinhas).forEach((row) => {
    row.addEventListener("click", () => {
    document.querySelectorAll(classeLinhas).forEach((rowTwo) => rowTwo.classList.remove("selected"));
    row.classList.add("selected");
    });
  });
}