let orcamentoListaInfo = [];

// #################################################################
// ###  INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA ###########################
// #################################################################
(async ()=> {
carregarMenuPrincipal();
menuAcoes("orcamento-lista")

orcamentoListaInfo = await orcamentosCarregarDados();
await listarOrcamentos();

})()


// #################################################################
// ###  RENDERIZAR LISTA DE REQUISIÇÕES ###############################
// #################################################################
function listarOrcamentos() {
let rowsHTML = `<div id="file-row-empyt">VAZIO</div>`;
if (orcamentoListaInfo.length) {
  rowsHTML = orcamentoListaInfo.reduce((acc, cur) => {
    const html = `
      <div class="file-row">
      <div class="file-column">${cur.cod_fac}</div>
      <div class="file-column">${cur.justificativa}</div>
      <div class="file-column">${cur.classificacao}</div>
      <div class="file-column">${cur.projeto ?? " - "}</div>
      </div>
      `;
    acc += html;
    return acc;
  },"");
 }

const requisicoesListaEl = document.getElementById("file-rows-box");
requisicoesListaEl.innerHTML = rowsHTML;

eventSelecionarLinhaQuery(".file-row")

}




















