class API {
 static URLBase = "http://localhost:3030"
 constructor() { }

 static async fetchDados(URL, method, headersData = null, bodyData = null) {
  const fetchConfig = { method }
  if (headersData) fetchConfig["headers"] = headersData;
  if (bodyData) fetchConfig["body"] = JSON.stringify(bodyData);

  let respostaData = null
  try {
   const resposta = await fetch(this.URLBase + URL, fetchConfig)
   respostaData = await resposta.json();

  } catch (error) {
   console.log({ error })
  }
  return respostaData;
 }
}









