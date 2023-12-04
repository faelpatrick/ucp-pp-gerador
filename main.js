document.getElementById("exemple").addEventListener("click", () => {
  document.getElementById("pasteArea").value = `    
Mestrado em Filosofia, especialização em Filosofia da Religião 
1 de JULHO de 1991 às 12:30h, na sala 2.1
Título da Dissertação: “Utilização da programação: para agilizar o processo de trabalho: Aplicação Pratica”
Aluno: Rafael Patrick de Souza 
Orientador D: José Carlos Sant'Anna – FAJE
Orientadora da Dissertação: José Carlos Sant'Anna – FAJE
Orientador do Relatório de Estágio: Guilherme Rodrigues Cardoso - FAJE
Presidente: António Manuel  da Costa Machado - UCP
Arguente do Relatório de Estágio: Alana Agnes Figueiredo da Silva – FAMINAS
Arguente da Dissertação: Isaac Figueiredo de Souza – EMEI`;
});

// Set year on document
document.getElementById("year").innerHTML = new Date().getFullYear();

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
  let datePart = content.match(/\d?\d\sde.+/g)[0];
  datePart = datePart.match(/\d\d\sde.+/g) ? datePart : "0" + datePart;
  console.log("datePart: ", datePart);
  let fullDate = getDate(datePart);
  console.log("fullDate: ", fullDate);

  //time
  let time = datePart.match(/\d\d:\d\d|\d\dh/);

  //Place
  let place = /video|vídeo|conferencia|conferência|zoom|colibri/i.test(datePart) == true ? " Zoom - Video Conferência " : datePart.match(/Sala.+/i)[0];
  place = place.replace("sala", "Sala");

  //Master degree
  let course = content.match(/Mestrado.+/g);

  //all itens
  //first remove time
  let allItensDesc = content.match(/.+[a-zA-Z\s]:.+/g);
  let allItens = "";
  allItensDesc.forEach((item) => {
    //check abreviation and corrections
    if (item.match(/RE:/gi)) item = item.replace("RE:", "do Relatório de Estágio:");
    if (item.match(/D:/gi)) item = item.replace("D:", "da Dissertação:");

    //upper case Studant Name
    if (item.match(/Alun.:.+/gi)) {
      let [desc, name] = item.split(":");
      item = `${desc}: ${name.toUpperCase()}`;
    }

    //get line per line with regex by :
    let line = item.match(/.+[a-zA-Z\s]:.+/g);

    //Use spread operator to split description and content
    let [description, ...content] = line[0].split(":");

    // Reconstruir a parte do conteúdo com os ":" restantes
    content = content.join(":");

    allItens += "<b>" + description + ":</b> " + content + "<br>";
  });

  //Insert in site
  document.getElementById("date").innerHTML = fullDate;
  document.getElementById("week").innerHTML = getWeek(fullDate);
  document.getElementById("time").innerHTML = time;
  document.getElementById("place").innerHTML = place;
  document.getElementById("rightData").innerHTML = `${course[0]} <br/>${allItens}`;
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
