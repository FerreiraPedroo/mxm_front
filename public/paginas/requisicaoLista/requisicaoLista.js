let requisicoesListaInfo = [];

// #################################################################
// ###  INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA  #######################
// #################################################################

(async ()=> {

// CARREGA O HTML DA TABS (./componentes/menuAcoes.js)  ############
const menuAcoesEl = document.getElementById("navbar-acoes");
menuAcoesEl.innerHTML = menuAcoes("requisicao-lista");

// CARREGAR DADOS DA API (./serviços/API.js)  ######################
requisicoesListaInfo = await API.reqLista()
console.log(requisicoesListaInfo)
// CARREGA LISTA DAS REQUISIÇÕES PARA O HTML  ######################
await listarRequisicoes();

})()



// #################################################################
// ###  RENDERIZAR LISTA DE REQUISIÇÕES  ###########################
// #################################################################
function listarRequisicoes() {
let rowsHTML = `<div id="list-row-empyt">VAZIO</div>`;
if (requisicoesListaInfo.length) {
  rowsHTML = requisicoesListaInfo.reduce((acc, cur) => {
  const html = `
  <div class="list-row" data-id="${cur.id}" onclick="roteador('requisicao-selecionada',${cur.id})">
    <div class="list-column g-col-size-128">${cur.dt_solicitacao_req}</div>
    <div class="list-column g-col-size-80">${cur.req}</div>
    <div class="list-column g-col-size-128x">${cur.justificativa}</div>
    <div class="list-column g-col-size-96">${cur.orcado}</div>
    <div class="list-column g-col-size-160">${cur.classificacao}</div>
    <div class="list-column g-col-size-96">${cur.urgente}</div>
  </div>
  `;
  acc += html;
  return acc;
  },"");
 }

const requisicoesListaEl = document.getElementById("list-rows-box");
requisicoesListaEl.innerHTML = rowsHTML;

}








