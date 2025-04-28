// CARREGAR OS DADOS DA REQUISIÇÃO E ENVIA PARA HTML
async function carregarRequisicao() {
 const query = new URLSearchParams(location.search);
 const requisicaoInfo = await API.fetchDados(`/requisicao?requisicaoID=${query.get("requisicaoID")}`, "GET");

 if (requisicaoInfo.dados) {
  // NUMERO DA REQUISIÇÃO ////////////////////////////////////////////
  const requisicaoNumeroEl = document.getElementById("requisicao-numero");
  requisicaoNumeroEl.innerHTML = requisicaoInfo.dados.req;

  // DATAS DA REQUISIÇÃO ////////////////////////////////////////////
  const requisicaoDatas = document.getElementsByClassName("data-input");
  for (reqDados of requisicaoDatas) {
   if (requisicaoInfo.dados[reqDados.name]) {
    reqDados.value = requisicaoInfo.dados[reqDados.name].split("/").reverse().join("-");
   }
  }

  // ITEMS DA REQUISIÇÃO ////////////////////////////////////////////
  const itemsEl = document.getElementById("items");

  if (requisicaoInfo.dados.itens.length) {
   itemsEl.innerHTML = "";

   // NFs - quantidade entregue.
   requisicaoInfo.dados.itens.forEach((item) => {
    let notasFiscaisQuantidade = 0
    if (requisicaoInfo.dados.notas_fiscais) {
     notasFiscaisQuantidade = requisicaoInfo.dados.notas_fiscais.reduce((acc, nf) => {

      nf.materiais.forEach(nfMatItem => {
       if (nfMatItem.item_id == item.id) {
        acc += nfMatItem.quantidade;
       }
      })

      return acc;

     }, 0)

    }

    // HTML DOS ITENS
    itemsEl.innerHTML += `
      <div class="item-box">
       <img class="item-imagem" src="default.png"/>
       <div class="item-info">
        <div class="item-nome">${item.item_info.nome}</div>
       </div>
       <div class="item-quantidade">Total: ${item.quantidade}</div>
       <div class="item-pendente">Pendente: ${item.quantidade - notasFiscaisQuantidade}</div>
       <div class="item-entregue">Entregue: ${notasFiscaisQuantidade}</div>
      </div>
     `;
   })
  } else {
   itemsEl.innerHTML += `
     <div class="item-box">
      <div class="item-vazio">Não há materiais.</div>
     </div>
   `;
  }

 }

 return requisicaoInfo;
}

// VERIFICA SE AS DATAS FORAM ALTERADAS E HABILITA O BOTÃO DE SALVAR 
async function adicionarEventListener(requisicaoInfo, requisicaoDatas) {

 function eventoHandle(event, requisicaoInfo, requisicaoDatas) {

  // SE A DATA FOI ALTERADA MUDA A COR DO INPUT.
  if (Object.hasOwn(requisicaoInfo.dados, event.target.name)) {
   const originalData = requisicaoInfo.dados[event.target.name].split("/").reverse().join("-");
   if (event.target.value != originalData) {
    event.target.classList.add("data-alterada")
   } else {
    event.target.classList.remove("data-alterada")
   }
  }

  // VERIFICA SE A DATA DE ALGUM INPUT FOI MODIFICADO.
  let dataModificada = false;
  for (data of requisicaoDatas) {
   if (Object.hasOwn(requisicaoInfo.dados, data.name)) {
    const originalData = requisicaoInfo.dados[data.name].split("/").reverse().join("-");
    if (data.value != originalData) {
     dataModificada = true;
     break;
    } else {
     dataModificada = false;
    }
   }
  }

  // SE ALGUMA DATA FOI MODIFICADA EXIBE O BOTÃO DE SALVAR.
  const dataSaveButton = document.getElementById("data-salvar-botao");
  if (dataModificada) {
   dataSaveButton.classList.remove("data-salvar-botao-desabilitado");
  } else {
   dataSaveButton.classList.add("data-salvar-botao-desabilitado");
  }

 }

 for (data of requisicaoDatas) {
  data.addEventListener("change", (event) => eventoHandle(event, requisicaoInfo, requisicaoDatas))
 }

}


async function principal() {
 const requisicaoDatas = document.getElementsByClassName("data-input");
 const requisicaoInfo = await carregarRequisicao();

 await adicionarEventListener(requisicaoInfo, requisicaoDatas);
}


principal();
