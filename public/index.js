// #################################################################
// ###  CAMINHOS DOS ARQUIVOS DE SCRIPT  ###########################
// #################################################################

const arquivosDeScriptInicial = [
 "./servicos/API.js",
]

const arquivoPorLocalizacao = {
 "/lista-requisicoes.html": "./assets/script/lista-requisicoes.js",
 "/requisicao.html": "./assets/script/requisicao.js",
 "/requisicao-adicionar-nota-fiscal.html": "./assets/script/requisicao-adicionar-nota-fiscal.js"
}

const arquivosDeScriptPaginas = [];
const arquivoDaPagina = arquivoPorLocalizacao[window.location.pathname];
if(arquivoDaPagina){
 arquivosDeScriptPaginas.push(arquivoDaPagina)
}


// #################################################################
// ###  CARREGAMENTO DE SCRIPTS PARA HTML  #########################
// #################################################################
const todosScripts = [...arquivosDeScriptInicial, ...arquivosDeScriptPaginas];

function carregarScriptsParaHTML(script){
 return new Promise((resolve, reject) => {
  const scriptEl = document.createElement('script');
  scriptEl.src = script;
  scriptEl.onload = () => resolve(script);
  scriptEl.onerror = () => reject(new Error(`Erro ao carregar ${script}`));
  document.body.appendChild(scriptEl);
 });
}

async function carregarScripts(arquivoDeScripts, posicaoArqScript = 0) {
 const arquivoCarregado = await carregarScriptsParaHTML(arquivoDeScripts[posicaoArqScript]);
 if(posicaoArqScript < arquivoDeScripts.length - 1) {
  await carregarScripts(arquivoDeScripts, posicaoArqScript + 1)
 }
}

carregarScripts(todosScripts, 0)





