async function carregarRequisicao(params) {
 const reqLista = await API.fetchDados(`/requisicao${params}`, "GET");
 const items = document.getElementById("items");
 const requisicaoNumero = document.getElementById("requisicao-numero");

 if(reqLista.dados) {

  requisicaoNumero.innerHTML = reqLista.dados.req;





  items.innerHTML = "";
   reqLista.dados.itens.forEach((requisicao) => {
    items.innerHTML += ""
/*
`
     <div class="item-box" onclick="location.assign('/requisicao.html?reqID=${requisicao.id}');" data-id="${requisicao.req}">
      <div class="item item-requisicao">${requisicao.req}</div>
      <div class="item item-centro-custo">${requisicao.centro_custo.codigo + " - " +requisicao.centro_custo.nome + " - " + requisicao.centro_custo.unidade}</div>
      <div class="item item-justificativa">${requisicao.observacao}</div>
      <div class="item item-justificativa">${requisicao.justificativa}</div>
     </div>
    `;

*/
   })
 } else {
  items.innerHTML += "Não há requisição";
 }
}
console.log(location.search)
carregarRequisicao(location.search);

