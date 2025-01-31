const urlParams = new URLSearchParams(window.location.search);
const requisicaoID = urlParams.get("requisicaoID");

const mesesDoAno = ["JANEIRO-25","FEVEREIRO-25","MARÇO-25","ABRIL-25","MAIO-25","JUNHO-25","JULHO-25","AGOSTO-25","SETEMBRO-25","OUTUBRO-25","NOVEMBRO-25","DEZEMBRO-25"];

let requisicaoInfo = null;


// #################################################################
// ###  INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA  #######################
// #################################################################
(async () => {

// API: CARREGA OS DADOS DA REQUISIÇÃO SELECIONADA.  ###############
requisicaoInfo = await API.reqSelecionada(requisicaoID);

// HTML: CARREGA O HTML DA TABS (./componentes/menuTabs.js)  #######
const tabEl = document.getElementById("tabs");
tabEl.innerHTML = menuTabs("requisicao-selecionada");

// HTML: CARREGA AS INFORMAÇÕES DA PÁGINA DA TAB INICIAL  ##########
const componentesEl = document.getElementById("campos");
componentesEl.innerHTML = tabInformacoes();

})()


// #################################################################
// ###  FUNÇÃO: PARA MUDAR O HTML DAS TABS  ########################
// #################################################################
async function changePageTabHTML(tab) {

 const urlParams = new URLSearchParams(window.location.search);
 const requisicaoID = urlParams.get("requisicaoID");

 let acoesEl = document.getElementById("acoes");
 let tabEl = document.getElementById("campos");

 switch(tab) {
  case "informacoes":
   tabEl.innerHTML = tabInformacoes();
  break;
  
  case "pedidos-compras":
   tabEl.innerHTML = tabPedidosCompras();
  break;
  
  case "notas-fiscais":
   acoesEl.innerHTML = await menuAcoesNotasFiscais();
   tabEl.innerHTML = await tabNotasFiscais({ requisicaoID });
  break;

  case "materiais":
   tabEl.innerHTML = tabMateriais({ requisicaoID });
  break;

 }
}
// #################################################################
// #################################################################
// ###  HTML: DAS TABS  ############################################
// #################################################################
// #################################################################

// ----------------------------------------------------------------
// --- TAB: INFORMAÇÕES  ------------------------------------------
// ----------------------------------------------------------------
function tabInformacoes() {
 let HTML = "";

 HTML += `<div class="input-dual-box">`;
 HTML += componenteInputReadOnlyHTML("requisicao", "Requisição:", requisicaoInfo.id);
 HTML += componenteInputReadOnlyHTML("dt_envio_req", "Data de envio:", requisicaoInfo.dt_envio_req);
 HTML += `</div>`;

 HTML += `<div class="input-dual-box">`;
 HTML += componenteInputReadOnlyHTML("orcado", "Orçado:", requisicaoInfo.orcado);
 HTML += componenteInputReadOnlyHTML("orcamento", "Orçamento:", requisicaoInfo.orcamento.cod_fac);

 HTML += `</div>`;

 HTML += `<div class="input-dual-box">`;
 HTML += componenteInputReadOnlyHTML("centros_custo", "Centro de custo:", `${requisicaoInfo.centro_custo.codigo} - ${requisicaoInfo.centro_custo.nome} - ${requisicaoInfo.centro_custo.unidade}` );

 HTML += componenteInputReadOnlyHTML("unidade", "Unidade:", requisicaoInfo.unidade.nome);
 HTML += `</div>`;

 HTML += `<div class="input-dual-box">`;
 HTML += componenteInputReadOnlyHTML("conta_contabil", "Conta contábil:", `${requisicaoInfo.centro_custo.codigo} - ${requisicaoInfo.centro_custo.nome}`);
 HTML += componenteInputReadOnlyHTML("classificacao", "Classificação:", requisicaoInfo.classificacao);

 HTML += `</div>`;

 HTML += `<div class="input-dual-box">`;
 HTML += componenteInputReadOnlyHTML("mes_orcado", "Custo p/mês:", mesesDoAno[requisicaoInfo.mes_orcado - 1]);
 HTML += componenteInputReadOnlyHTML("urgente", "Urgente:", requisicaoInfo.urgente);

 HTML += `</div>`;

 HTML += componenteInputReadOnlyHTML("projeto", "Projeto:", requisicaoInfo.projeto);
 HTML += componenteTextAreaReadOnlyHTML("justificativa", "Justificativa:", requisicaoInfo.justificativa);
 HTML += componenteTextAreaReadOnlyHTML("detalhes_pedido", "Detalhes do pedido:", requisicaoInfo.detalhes_pedido);
 HTML += componenteTextAreaReadOnlyHTML("observacao", "Observação:", requisicaoInfo.observacao);

 return HTML;
}


// ----------------------------------------------------------------
// --- TAB: PEDIDOS DE COMPRAS  -----------------------------------
// ----------------------------------------------------------------
function tabPedidosCompras() {
 let HTML = `<div id="lista-linha-vazia">VAZIO</div>`;
 return HTML;
}


// ----------------------------------------------------------------
// --- TAB: NOTAS FISCAIS  ----------------------------------------
// ----------------------------------------------------------------
async function tabNotasFiscais({ requisicaoID }) {
 let requisicaoNotasFiscais = [];

 const notasFiscais = await API.reqSelecionadaNFs(requisicaoID);

 if(notasFiscais){
  requisicaoNotasFiscais = notasFiscais.data
 }

 const cabecalhos = [
  { coluna: "RAZÃO SOCIAL", linha: ["fornecedor","razao_social"], tamanhoClasse: "160x grow-4" },
  { coluna: "Nº NF", linha: ["nf_numero"], tamanhoClasse: "80x" },
  { coluna: "VALOR R$", linha: ["valor"], tamanhoClasse: "80x" },
  { coluna: "Nº PEDIDO", linha: ["pedido_compras"], tamanhoClasse: "80x" },
 ]

 HTML = tabelaHTML(cabecalhos, requisicaoNotasFiscais);

 return HTML;
}


// ----------------------------------------------------------------
// --- TAB: MATERIAIS  --------------------------------------------
// ----------------------------------------------------------------
async function tabMateriais({requisicaoID}) {
 let requisicaoMateriais = [];

 const materiais = await requisicaoMateriais({ requisicaoID });
 if(materiais){
  requisicaoMateriais = materiais;
 }

 const cabecalhos = [
  { coluna: "COD", linha: ["cod"], tamanhoClasse: "g-col-size-80" },
  { coluna: "DESCRIÇAO", linha: ["descricao"], tamanhoClasse: "g-col-size-128" },
  { coluna: "QUANTIDADE", linha: ["quantidade"], tamanhoClasse: "g-col-size-80" }
 ]

 HTML = tabelaHTML(cabecalhos, requisicaoNotasFiscais);

 return HTML;
}



// #################################################################
// #################################################################
// ###  MENU AÇOES  ################################################
// ###  seleciona os htmls dos menus diferentes ####################
// #################################################################
// #################################################################
// ----------------------------------------------------------------
// --- MENU AÇOES: NOTAS FISCAIS  -------------------------------------
// ----------------------------------------------------------------

function menuAcoesNotasFiscais() {
 return `
  <div class="navbar-acoes-container">
   <div class="navbar-acoes-botoes-box">
    <button onclick="modalOpen('requisicao-selecionada-nota-fiscal')" class="navbar-acoes-botao"><img src="./assets/imagens/comum/adicionar-32.png" class="navbar-acoes-botao-img"/>ADICIONAR NOTA FISCAL</button>
   </div>
  </div>
  `; 
}
