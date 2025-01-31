
// #################################################################
// ###  HTML DO MENU PRINCIPAL  #######################################
// #################################################################
window.carregarMenuPrincipal = function carregarMenuPrincipal() {
const menuPrincipalEl = document.getElementById("head");

menuPrincipalEl.innerHTML = `
  <div id="box-header">
    <div id="menu-header">
      <button id="hamburger" onclick="toggleMenu()">☰</button>
    </div>

  <!--
  <div id="search-header">
  <input type="text" placeholder="Pesquisar tudo">
  <button  class="button-action" onclick="loadData()">PESQUISAR</button>
  </div>
  -->

  </div>

  <nav id="menu-items" class="menu-items" >
    <div class="menu-item" onclick="roteador('orcamento-lista')"><img src="" alt="">Orçamento</div>
    <div class="menu-item" onclick="roteador('requisicao-lista')"><img src="./assets/imagens/menuPrincipal/requisicao-lista.png" alt="">Requisições</div>
    <div class="menu-item" onclick="roteador('unidade-lista')"><img src="" alt="">Unidades</div>
    <div class="menu-item" onclick="roteador('contacontabil-lista')"><img src="" alt="">Contas Contabéis</div>
  </nav>
`;

const menuHTML = document.getElementById("menu-items");
menuHTML.addEventListener("mouseleave", toggleMenu);

const menuHTML2 = document.getElementById("head");
menuHTML2.addEventListener("mouseleave", toggleMenu);

}



// #################################################################
// ###  EXIBIR E ESCONDER O MENU  ######################################
// #################################################################
// FUNÇÃO PARA EXIBIR / ESCONDER O MENU
window.toggleMenu = function toggleMenu(e) {
    const menuItems = document.getElementById('menu-items');
    
    if (menuItems.classList.contains("expanded")) {
        menuItems.classList.remove("expanded");
    } else if (!e) {
        menuItems.classList.add("expanded");
    }
}

carregarMenuPrincipal()
