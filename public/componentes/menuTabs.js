// #################################################################
// ###  MENU TABS  #################################################
// ###  seleciona os htmls das abas diferentes de uma página  ######
// #################################################################
class MenuTabs {
 static getBotoes(lista = []) {
  const botoes = lista.map((botao) => {
   return `<div class="tabs-buttons">
     <button onclick="MenuTabs.botaoSelecionado(this);${botao.callBack}"><img src="${botao.icone}" />${botao.nome}</button>
    </div>`
  })
  return botoes.join("");
 }

 static botaoSelecionado(botaoSelecionado) {
  const botoes = document.getElementsByClassName("tabs-buttons");
  for(botao in botoes){
    botao.classList.remove("tabs-button-selected");
  }

  botaoSelecionado.classList.add("tabs-button-selected")
  console.log(botoes)
  console.log(botaoSelecionado)
 }
}



