function mudarPagina(pagina) {

}

async function carregarRequisicoes(posicao = 0) {
 const reqLista = await API.fetchDados("/requisicoes", "GET");
 const items = document.getElementById("items");

 if(reqLista.dados.length) {
  items.innerHTML = "";
   reqLista.dados.forEach((requisicao) => {
    items.innerHTML += `
     <div class="item-box" onclick="location.replace('/requisicao.html?reqID=${requisicao.id}');" data-id="${requisicao.req}">
      <div class="item item-requisicao">${requisicao.req}</div>
      <div class="item item-centro-custo">${requisicao.centro_custo.codigo + " - " +requisicao.centro_custo.nome + " - " + requisicao.centro_custo.unidade}</div>
      <div class="item item-justificativa">${requisicao.observacao}</div>
      <div class="item item-justificativa">${requisicao.justificativa}</div>
     </div>
    `;
   })
 } else {
  items.innerHTML += "Não há requisição";
 }
}

carregarRequisicoes();

