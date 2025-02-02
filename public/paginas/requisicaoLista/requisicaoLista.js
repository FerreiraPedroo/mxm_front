let requisicoesListaInfo = [];

// #################################################################
// ###  INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA  #######################
// #################################################################

(async () => {

 // CARREGAR DADOS DA API (./serviços/API.js)  ######################
 requisicoesListaInfo = await API.reqLista()

 // CARREGA O HTML DA TABS (./componentes/menuAcoes.js)  ############
 const botoesAcoes = [{
  nome: "Nova requisição",
  icone: "./assets/imagens/requisicaoLista/requisicao.png",
  callBack: "roteador('requisicao-novo')"
 }]
 const menuAcoes = document.getElementById("navbar-acoes").innerHTML = MenuAcoes.getBotoes(botoesAcoes);

 // CARREGA LISTA DAS REQUISIÇÕES PARA O HTML  ######################
 listarRequisicoes();

})()


// #################################################################
// ###  RENDERIZAR LISTA DE REQUISIÇÕES  ###########################
// #################################################################
function listarRequisicoes() {
 const cabecalhos = [
  { coluna: "DT SOLICITAÇÃO", linha: ["dt_solicitacao_req"], tamanhoClasse: "128" },
  { coluna: "REQ", linha: ["req"], tamanhoClasse: "80" },
  { coluna: "JUSTIFICATIVA", linha: ["justificativa"], tamanhoClasse: "128x" },
  { coluna: "ORÇADO", linha: ["orcado"], tamanhoClasse: "96" },
  { coluna: "CLASSIFICAÇÃO", linha: ["classificacao"], tamanhoClasse: "160" },
  { coluna: "URGENTE", linha: ["urgente"], tamanhoClasse: "96" },
 ]

 const linhasHTML = tabelaHTML("requisicao-selecionada", cabecalhos, requisicoesListaInfo);

 const requisicoesListaEl = document.getElementById("list-rows-box");
 requisicoesListaEl.innerHTML = linhasHTML;

}








