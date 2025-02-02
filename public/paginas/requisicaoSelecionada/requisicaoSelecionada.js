const urlParams = new URLSearchParams(window.location.search);
const requisicaoID = urlParams.get("requisicaoID");

let requisicaoInfo = null;

const mesesDoAno = ["JANEIRO-25", "FEVEREIRO-25", "MARÇO-25", "ABRIL-25", "MAIO-25", "JUNHO-25", "JULHO-25", "AGOSTO-25", "SETEMBRO-25", "OUTUBRO-25", "NOVEMBRO-25", "DEZEMBRO-25"];


// #################################################################
// ###  INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA  #######################
// #################################################################
(async () => {
 // API: CARREGA OS DADOS DA REQUISIÇÃO SELECIONADA.  ###############
 requisicaoInfo = await API.reqSelecionada(requisicaoID);

 document.getElementById("page-title").innerHTML = `Informações da requisição: REQ ${requisicaoID}`;

 // HTML: CARREGA O HTML DA TABS (./componentes/menuTabs.js)  #######
 const botoesLista = [
  { nome: "Informações", icone: "./assets/imagens/requisicaoSelecionada/requisicao-informacoes-32.png", callBack: "tabChangePageHTML('informacoes')" },
  { nome: "Pedidos de compras", callBack: "tabChangePageHTML('pedidos-compras')", icone: "./assets/imagens/comum/pedido-compras-32.png" },
  { nome: "Notas fiscals", icone: "./assets/imagens/comum/nota-fiscal-32.png", callBack: "tabChangePageHTML('notas-fiscais')", },
  { nome: "Materiais", icone: "./assets/imagens/comum/material-32.png", callBack: "tabChangePageHTML('materiais')" }
 ]
 document.getElementById("tabs").innerHTML = MenuTabs.getBotoes(botoesLista);

 // HTML: CARREGA AS INFORMAÇÕES DA PÁGINA DA TAB INICIAL  ##########
 document.getElementById("campos").innerHTML = tabInformacoes();

})()


// #################################################################
// ###  FUNÇÃO: PARA MUDAR O HTML DAS TABS  ########################
// #################################################################
async function tabChangePageHTML(tab) {

 const urlParams = new URLSearchParams(window.location.search);
 const requisicaoID = urlParams.get("requisicaoID");

 let acoesEl = document.getElementById("acoes");
 let tabEl = document.getElementById("campos");

 acoesEl.innerHTML = "";

 switch (tab) {
  case "informacoes":
   tabEl.innerHTML = tabInformacoes();
   break;

  case "pedidos-compras":
   tabEl.innerHTML = tabPedidosCompras();
   break;

  case "notas-fiscais":
   const botoesAcoes = [
    { nome: "ADICIONAR NOTA FISCAL", icone: `./assets/imagens/comum/adicionar-32.png`, callBack: `modalOpen('requisicao-selecionada-nota-fiscal')` }
   ];

   acoesEl.innerHTML = MenuAcoes.getBotoes(botoesAcoes);
   tabEl.innerHTML = await tabNotasFiscais({ requisicaoID });
   break;

  case "materiais":
   tabEl.innerHTML = await tabMateriais({ requisicaoID });
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
 HTML += componenteInputReadOnlyHTML("centros_custo", "Centro de custo:", `${requisicaoInfo.centro_custo.codigo} - ${requisicaoInfo.centro_custo.nome} - ${requisicaoInfo.centro_custo.unidade}`);

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

 if (notasFiscais) {
  requisicaoNotasFiscais = notasFiscais.data
 }

 const cabecalhos = [
  { coluna: "RAZÃO SOCIAL", linha: ["fornecedor", "razao_social"], tamanhoClasse: "160x grow-4" },
  { coluna: "Nº NF", linha: ["nf_numero"], tamanhoClasse: "80x" },
  { coluna: "VALOR R$", linha: ["valor"], tamanhoClasse: "80x" },
  { coluna: "Nº PEDIDO", linha: ["pedido_compras"], tamanhoClasse: "80x" },
 ]

 const HTML = tabelaHTML(null, cabecalhos, requisicaoNotasFiscais);

 return HTML;
}


// ----------------------------------------------------------------
// --- TAB: MATERIAIS  --------------------------------------------
// ----------------------------------------------------------------
async function tabMateriais({ requisicaoID }) {
 let requisicaoMateriais = [];

 const materiais = await API.reqMateriais({ requisicaoID });
 if (materiais) {
  requisicaoMateriais = materiais;
 }

 const cabecalhos = [
  { coluna: "COD", linha: ["cod"], tamanhoClasse: "g-col-size-80" },
  { coluna: "DESCRIÇAO", linha: ["descricao"], tamanhoClasse: "g-col-size-128" },
  { coluna: "QUANTIDADE", linha: ["quantidade"], tamanhoClasse: "g-col-size-80" }
 ]

 const HTML = tabelaHTML(null, cabecalhos, requisicaoMateriais);
 console.log(HTML)
 return HTML;
}

