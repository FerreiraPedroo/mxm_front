// #################################################################
// ###  MENU AÇOES  ################################################
// ###  seleciona os htmls dos menus diferentes ####################
// #################################################################
class MenuAcoes {
  static getBotoes(lista = []) {
    let HTML = `<div class="navbar-acoes-container">`;

    const botoes = lista.reduce((acc, botao) => {
      return acc += `      
       <div class="navbar-acoes-botoes-box">
        <button onclick="${botao.callBack}" class="navbar-acoes-botao"><img src="${botao.icone}" class="navbar-acoes-botao-img"/>${botao.nome}</button>
       </div>`
    }, "")

    HTML += botoes;
    HTML += `</div>`

    return HTML;
  }
}

// #################################################################
// ###  REQUISIÇÃO LISTA  ##########################################
// #################################################################
function requisicaoLista() {
  return `
    <div class="navbar-acoes-buttons">
      <button onclick="roteador('requisicao-novo')" ><img src="./assets/imagens/requisicaoLista/requisicao.png">Nova requisição</button>
    </div>
  `;
}




// #################################################################
// ###  REQUISIÇÃO LISTA  ##########################################
// #################################################################
function orcamentoLista() {
  return `
  <div class="navbar-acoes-buttons">
   <button><i class="fas fa-share-alt"></i>Novo orçamento</button>
  </div>
 `;
}






function modelo() {
  return `
  <nav class="navbar-acoes">

    <div class="navbar-acoes-buttons">
      <button><i class="fas fa-share-alt"></i> Compartilhar</button>
      <button><i class="fas fa-trash-alt"></i> Excluir</button>
      <button><i class="fas fa-folder"></i> Mover para</button>
      <button><i class="fas fa-copy"></i> Copiar para</button>
      <button><i class="fas fa-download"></i> Baixar</button>
      <button><i class="fas fa-pen"></i> Renomear</button>
      <button><i class="fas fa-ellipsis-h"></i></button>
    </div>

    <div class="navbar-acoes-right">
      <div class="dropdown-acoes">
        <button class="dropdown-acoes-toggle">
          <i class="fas fa-list"></i> Lista
        </button>
        <div class="dropdown-acoes-menu">
          <button><i class="fas fa-list"></i> Lista</button>
          <button><i class="fas fa-th-list"></i> Lista Compacta</button>
          <button><i class="fas fa-th"></i> Blocos</button>
        </div>
      </div>

      <button><i class="fas fa-info-circle"></i> Detalhes</button>

    </div>

  </nav>
`;

}


// #################################################################
// ###  MENUS EVENT LISTENER  ######################################
// #################################################################

function eventoToggleMenuAcoes() {
  const dropdownToggle = document.querySelector(".dropdown-acoes-toggle");
  const dropdownMenu = document.querySelector(".dropdown-acoes-menu");

  dropdownToggle.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  dropdownMenu.addEventListener("click", (event) => {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
    }
  });

}





