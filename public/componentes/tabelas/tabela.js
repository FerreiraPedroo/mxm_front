function tabelaHTML(URL, cabecalhoInfo, linhas = []) {
 let HTML = "";

 // ADICIONAR CABEÇALHO #################################################################################
 HTML += `<div class="lista-cabecalho">`;
 cabecalhoInfo.forEach((cabecalho) => {
  HTML += `<div class="lista-coluna g-col-size-${cabecalho.tamanhoClasse}">${cabecalho.coluna}</div>`;
 });
 HTML += `</div>`;

 // ADICIONAR LINHAS ####################################################################################
 if (linhas.length) {
  linhas.forEach((linha) => {
   HTML += `<div class="lista-linha" data-id="${linha.id}" ${URL ? `onclick="roteador('${URL}',${linha.id})` : ""}">`;
   
   cabecalhoInfo.forEach((cabecalho) => {
    let linhaHTML = obterProximoValor(linha, cabecalho.linha)
    HTML += `<div class="lista-coluna g-col-size-${cabecalho.tamanhoClasse}">${linhaHTML}</div>`;
   });

   HTML += `</div>`;
  });
 } else {
  HTML += `<div id="lista-linha-vazia">VAZIO</div>`;
 }

 return HTML;
}


function obterProximoValor(obj, keys) {
 return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}