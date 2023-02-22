document.getElementById("exemple").addEventListener("click", () => {
  document.getElementById("pasteArea").value = `    
Mestrado em Filosofia, especialização em Filosofia da Religião 
20 de abril de 2023 às 14:30h, na sala 2.1
Título da Dissertação: “Liberdade e Religião no Pensamento de Donoso Cortés”
Aluno: MIGUEL QUISSUA QUISSOLA 
Orientadora da Dissertação: Berta Maria Marinho Rodrigues Maia – UCP
Orientador do Relatório de Estágio: Paulo César Azevedo Dias - UCP
Presidente: Diana Patrícia da Silva Dias Moreira- UCP
Arguente do Relatório de Estágio: Fabrizia Raguso – UCP
Arguente da Dissertação: Ricardo Jorge de Oliveira Peixoto – UCP`;
});

function copyContent() {
  // Get the text field
  var copyText = document.getElementById("copyArea");

  // Select the text field
  copyText.select();

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
}

document.getElementById("update").addEventListener("click", () => update());
document.getElementById("copy").addEventListener("click", () => copyContent());

function update() {
  const content = document.getElementById("pasteArea").value;

  //Complet Date
  let datePart = content.match(/\d\d\sde.+/g)[0];
  let fullDate = getDate(datePart);

  //time
  let time = datePart.match(/\d\d:\d\d|\d\dh/);

  //Place
  let place = /video|vídeo|conferencia|conferência/i.test(datePart) == true ? " Zoom - Video Conferência " : datePart.match(/Sala.+/i);

  //Master degree
  let course = content.match(/Mestrado.+/g);

  //Title
  let titleDesc = content.match(/Título da .+:/g);
  let title = content.match(/“.+”/g);

  //all itens
  //first remove time
  let allItensDesc = content.match(/.+[a-zA-Z\s]:.+/g);
  let allItens = "";
  allItensDesc.forEach((item) => {
    allItens += "<b>" + item.match(/.+[a-zA-Z\s]:.+/g)[0].split(":")[0] + ":</b> ";
    allItens += item.match(/.+[a-zA-Z\s]:.+/g)[0].split(":")[1] + "<br>";
  });

  //Insert in site
  document.getElementById("date").innerHTML = fullDate;
  document.getElementById("week").innerHTML = getWeek(fullDate);
  document.getElementById("time").innerHTML = time;
  document.getElementById("place").innerHTML = place;
  document.getElementById("rightData").innerHTML = `
${course[0]} <br/>${allItens}
`;
  document.getElementById("copyArea").value = "<tr> " + document.getElementById("htmlToCopy").innerHTML + "</tr>";
}

function getDate(str) {
  let meses = ["error", "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  let month = 0;

  //pegar o dia
  let date = str.match(/\d\d/).toString();

  //pegar o ano
  let year = str.match(/\d\d\d\d/).toString();

  //pesquisa o nome do mes e devolve o valor
  let strLow = str.toLowerCase();
  for (let i = 1; i < meses.length; i++) {
    if (strLow.indexOf(meses[i]) != -1) month = i;
  }

  //acressentar 0 se mes menor que 10
  if (month < 10) month = "0" + month;
  return date + "/" + month + "/" + year;
}

function getWeek(fullDate) {
  let semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  let dateFormated = fullDate.split("/")[2] + "-" + fullDate.split("/")[1] + "-" + fullDate.split("/")[0];
  let d = new Date(dateFormated);
  return semana[d.getDay()];
}