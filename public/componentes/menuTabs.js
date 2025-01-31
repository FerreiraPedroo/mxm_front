// #################################################################
// ###  MENU TABS  #################################################
// ###  seleciona os htmls das abas diferentes de uma página  ######
// #################################################################
function menuTabs(tabs) {

 let menuTabsHTML = "";
  switch(tabs) {
   case "requisicao-selecionada":
    menuTabsHTML = requisicaoSelecionada();
   break;

   default:
    menuTabsHTML = () => null
   break;
  }

 return menuTabsHTML;
}




// #################################################################
// ###  REQUISIÇÃO SELECIONADA  ####################################
// #################################################################
// ###  FUNÇÕES DO ONCLICK ("./pages/requisicaoSelecionada/requisicaoSelecionada.js")
function requisicaoSelecionada() {
 //const URLAtual = new URL(window.location.href);
 //const URLParams = new URLSearchParams(URLAtual.search);
 //const URLChangePage = `${URLAtual.origin}${URLAtual.pathname}"/info"${URLAtual.search}`;
/*
URLAtual: URL
hash: ""
host: "localhost:3000"
hostname: "localhost"
href: "http://localhost:3000/requisicao-selecionada?requisicaoID=1"
origin: "http://localhost:3000"
password: ""
pathname: "/requisicao-selecionada"
port: "3000"
protocol: "http:"
search: "?requisicaoID=1"
searchParams: URLSearchParams {size: 1}
username
: 
""
*/



  return `
    <div class="tabs-buttons">
      <button onclick="changePageTabHTML('informacoes')" ><img src="./assets/imagens/requisicaoSelecionada/requisicao-informacoes-32.png" />Informações</button>
    </div>
    <div class="tabs-buttons">
      <button onclick="changePageTabHTML('pedidos-compras')" ><img src="./assets/imagens/comum/pedido-compras-32.png" />Pedidos de compras</button>
    </div>
    <div class="tabs-buttons">
      <button onclick="changePageTabHTML('notas-fiscais')" ><img src="./assets/imagens/comum/nota-fiscal-32.png" />Notas fiscals</button>
    </div>
    <div class="tabs-buttons">
      <button onclick="changePageTabHTML('materiais')" ><img src="./assets/imagens/comum/material-32.png" />Materiais</button>
    </div>
  `; 
}

