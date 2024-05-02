const table = document.getElementById("table");
const jogo = document.getElementById("jogo");
const difficulty = document.getElementById("difficulty");
const restart = document.getElementById("restart");
const restartButton = document.getElementById("restartButton");
const background = document.getElementById("background");
const timerDisplay = document.getElementById("cronometro");
var bestTimeElement = document.getElementById("bestTime");
var bestTimeEasy = 0;
var bestTimeMedium = 0;
var bestTimeHard = 0;
var bestTimeDisplayEasy = 0;
var bestTimeDisplayMedium = 0;
var bestTimeDisplayHard = 0;
var countOpenBlankCells;
var countOpenNumberCells;
var totalFlags = document.getElementById("totalFlags");
var amountFlags = 0;
var auxAmountFlags = 0;
var campo = [];
var auxtam;
let cronometroInterval;
let segundos = 0;
let minutos = 0;
let cronometroAtivo = false;
var countFlaggedBombs = 0;

export function geraLinha(tam, qtd) {
  campo = [];
  amountFlags = 0;
  auxtam = tam;

  for (var j = 0; j < tam; j++) {
    var linha = [];
    for (var i = 0; i < tam; i++) {
      linha.push({ value: "🟦", isBomb: false, bombCount: "0" });
    }
    campo.push(linha);
  }

    var qtdbombas = 0;
    while (qtdbombas < qtd) {
      var i = Math.floor(Math.random() * auxtam);
      var j = Math.floor(Math.random() * auxtam);
      if (campo[i][j].isBomb === false) {
        campo[i][j].isBomb = true;
        qtdbombas++;
        amountFlags += 1;
      } else {
        continue;
      }
    }
  
  totalFlags.innerHTML = amountFlags + " 🚩";
  auxAmountFlags = amountFlags;

  return campo;
}

export function printGrid(campo, tam) {
  var conteudoTable = "";
  for (var i = 0; i < tam; i++) {
    conteudoTable += "<tr>";
    for (var j = 0; j < tam; j++) {
      var classe = campo[i][j].isBomb ? "bomba" : "blank";
      var buttonId = "button_" + i + "_" + j;
      conteudoTable +=
        "<td><button type='button' id='" + buttonId + "' value='" + campo[i][j].value + "' class='" + classe + "'>" + campo[i][j].value + " " + "</button></td>";
    }
    conteudoTable += "</tr>";
  }
  table.innerHTML = conteudoTable;

  if (claro.classList.contains("selected")) {
    claro.click();
  }
}

export function checkSurroundings(campo, tam) {
  for (var i = 0; i < tam; i++) {
    for (var j = 0; j < tam; j++) {
      var n = 0;
      if (campo[i][j].isBomb) {
        if (i + 1 < tam && !campo[i + 1][j].isBomb) {
          campo[i + 1][j].bombCount = parseInt(campo[i + 1][j].bombCount) + 1;
          n += parseInt(campo[i + 1][j].bombCount);
          var z = i + 1;
          var element = document.getElementById("button_" + z + "_" + j);
          element.dataset.n = n;
        }

        if (i - 1 >= 0 && !campo[i - 1][j].isBomb) {
          var n = 0;
          campo[i - 1][j].bombCount = parseInt(campo[i - 1][j].bombCount) + 1;
          n += parseInt(campo[i - 1][j].bombCount);
          var z = i - 1;
          var element = document.getElementById("button_" + z + "_" + j);
          element.dataset.n = n;
        }

        if (j + 1 < tam && !campo[i][j + 1].isBomb) {
          var n = 0;
          campo[i][j + 1].bombCount = parseInt(campo[i][j + 1].bombCount) + 1;
          n += parseInt(campo[i][j + 1].bombCount);
          var y = j + 1;
          var element = document.getElementById("button_" + i + "_" + y);
          element.dataset.n = n;
        }

        if (j - 1 >= 0 && !campo[i][j - 1].isBomb) {
          var n = 0;
          campo[i][j - 1].bombCount = parseInt(campo[i][j - 1].bombCount) + 1;
          n += parseInt(campo[i][j - 1].bombCount);
          var y = j - 1;
          var element = document.getElementById("button_" + i + "_" + y);
          element.dataset.n = n;
        }

        if (i + 1 < tam && j + 1 < tam && !campo[i + 1][j + 1].isBomb) {
          var n = 0;
          campo[i + 1][j + 1].bombCount =
            parseInt(campo[i + 1][j + 1].bombCount) + 1;
          n += parseInt(campo[i + 1][j + 1].bombCount);
          var z = i + 1;
          var y = j + 1;
          var element = document.getElementById("button_" + z + "_" + y);
          element.dataset.n = n;
        }

        if (i - 1 >= 0 && j - 1 >= 0 && !campo[i - 1][j - 1].isBomb) {
          var n = 0;
          campo[i - 1][j - 1].bombCount =
            parseInt(campo[i - 1][j - 1].bombCount) + 1;
          n += parseInt(campo[i - 1][j - 1].bombCount);
          var z = i - 1;
          var y = j - 1;
          var element = document.getElementById("button_" + z + "_" + y);
          element.dataset.n = n;
        }

        if (i + 1 < tam && j - 1 >= 0 && !campo[i + 1][j - 1].isBomb) {
          var n = 0;
          campo[i + 1][j - 1].bombCount =
            parseInt(campo[i + 1][j - 1].bombCount) + 1;
          n += parseInt(campo[i + 1][j - 1].bombCount);
          var z = i + 1;
          var y = j - 1;
          var element = document.getElementById("button_" + z + "_" + y);
          element.dataset.n = n;
        }

        if (i - 1 >= 0 && j + 1 < tam && !campo[i - 1][j + 1].isBomb) {
          var n = 0;
          campo[i - 1][j + 1].bombCount =
            parseInt(campo[i - 1][j + 1].bombCount) + 1;
          n += parseInt(campo[i - 1][j + 1].bombCount);
          var z = i - 1;
          var y = j + 1;
          var element = document.getElementById("button_" + z + "_" + y);
          element.dataset.n = n;
        }
      }
    }
  }
}

table.addEventListener("click", function (event) {
  if (!cronometroAtivo) {
    startTimer();
    cronometroAtivo = true;
  }

  jogo.classList.remove("free-animation");
  const target = event.target;
  const targetClass = target.className;

  if (targetClass === "bomba") {
    clearInterval(cronometroInterval);
    cronometroAtivo = true;
    const allBombs = document.getElementsByClassName("bomba");
    const allFlaggedBombs = document.getElementsByClassName("flaggedbomb");
    for (let bombButton of allBombs) {
      bombButton.innerText = "💥";
    }
    for (let bombButton of allFlaggedBombs) {
      const td = bombButton.parentNode;
      td.classList.add("rightFlag");
    }
    const allFlaggedBlanks = document.getElementsByClassName("flaggedblank");
    for (let bombButton of allFlaggedBlanks) {
      const td = bombButton.parentNode;
      td.classList.add("wrongFlag");
    }
    const allFlaggedNumbers = document.getElementsByClassName("flaggednumber");
    for (let bombButton of allFlaggedNumbers) {
      const td = bombButton.parentNode;
      td.classList.add("wrongFlag");
    }
    const allButtons = document.getElementsByTagName("button");
    for (let button of allButtons) {
      if (button.closest("table") === table) {
        button.setAttribute("Disabled", "true");
      }
    }

    jogo.classList.add("lose-animation");

    restart.style.display = "flex";
    restart.classList.add("restart-animation");
    restartButton.classList.add("restartButton-animation");
  }
  if (targetClass === "blank") {
    if (!target.dataset.n) {
      target.innerText = "";
      const td = target.parentNode;
      const row = td.parentNode.rowIndex;
      const col = td.cellIndex;
      if (target.getAttribute("openblank") !== "true") {
        openNeighbours(row, col, auxtam);
      }
      target.setAttribute("openblank", "true");
    } else {
      target.innerText = target.dataset.n;
      target.setAttribute("value", target.dataset.n);
    }
  }
  checkWinCondition();
});

table.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  if (!cronometroAtivo) {
    startTimer();
    cronometroAtivo = true;
  }

  const target = event.target;
  const targetClass = target.className;
  if (target.getAttribute("Disabled") == "true") {
    return;
  }

  if (amountFlags > 0) {
    if (target.getAttribute("openblank") == "true") {
      return;
    }
    if (target.getAttribute("value") !== "🟦") {
      return;
    }

    totalFlags.innerText = amountFlags + " 🚩";
    target.innerText = "🚩";

    if (targetClass == "bomba") {
      amountFlags -= 1;
      totalFlags.innerText = amountFlags + " 🚩";
      target.setAttribute("class", "flaggedBomb");
    }

    if (targetClass == "blank") {
      amountFlags -= 1;
      totalFlags.innerText = amountFlags + " 🚩";
      if (!target.dataset.n) {
        target.setAttribute("class", "flaggedBlank");
      } else {
        target.setAttribute("class", "flaggedNumber");
      }
    }
  }

  if (targetClass == "flaggedBomb") {
    amountFlags += 1;
    totalFlags.innerText = amountFlags + " 🚩";
    target.innerText = "🟦";
    target.setAttribute("class", "bomba");
    countFlaggedBombs--;
  }

  if (targetClass == "flaggedBlank" || targetClass == "flaggedNumber") {
    amountFlags += 1;
    totalFlags.innerText = amountFlags + " 🚩";
    target.innerText = "🟦";
    target.setAttribute("class", "blank");
    return;
  }
  checkWinCondition();
});

function openNeighbours(row, col, auxtam) {
  const visited = new Set();
  const stack = [{ row: row, col: col }];

  while (stack.length > 0) {
    const { row, col } = stack.pop();

    if (!visited.has(`${row}_${col}`)) {
      visited.add(`${row}_${col}`);

      const cell = document.getElementById("button_" + row + "_" + col);
      const cellClass = cell.className;
      if (
        cellClass.includes("flaggedNumber") ||
        cellClass.includes("flaggedBlank")
      ) {
        continue;
      }

      if (!cell.dataset.n) {
        cell.innerText = "";
        cell.setAttribute("openblank", "true");
        for (
          let i = Math.max(0, row - 1);
          i <= Math.min(row + 1, auxtam - 1);
          i++
        ) {
          for (
            let j = Math.max(0, col - 1);
            j <= Math.min(col + 1, auxtam - 1);
            j++
          ) {
            stack.push({ row: i, col: j });
          }
        }
      } else {
        cell.innerText = cell.dataset.n;
        cell.setAttribute("value", cell.dataset.n);
      }
      jogo.classList.add("free-animation");
      setTimeout(() => {
        jogo.classList.remove("free-animation");
      }, 1000);
    }
  }
}

function startTimer() {
  cronometroInterval = setInterval(() => {
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }
    updateTimerDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(cronometroInterval);
  countFlaggedBombs = 0;
  countOpenNumberCells = 0;
  countOpenBlankCells = 0;
  segundos = 0;
  minutos = 0;
  jogo.classList.remove("lose-animation");
  jogo.classList.remove("win-animation");
  updateTimerDisplay();
}

document.getElementById("x10").addEventListener("click", function () {
  resetTimer();
  cronometroAtivo = false;
  if (bestTimeDisplayEasy == 0) {
    bestTime.innerText = "Recorde: \n 00:00 ⏱";
  } else {
    bestTime.innerText = bestTimeDisplayEasy;
  }
  jogo.classList.remove("jogomedio");
  jogo.classList.remove("jogodificil");
  jogo.classList.add("jogofacil");
});

document.getElementById("x15").addEventListener("click", function () {
  resetTimer();
  cronometroAtivo = false;
  if (bestTimeDisplayMedium == 0) {
    bestTime.innerText = "Recorde: \n 00:00 ⏱";
  } else {
    bestTime.innerText = bestTimeDisplayMedium;
  }

  jogo.classList.remove("jogofacil");
  jogo.classList.remove("jogodificil");
  jogo.classList.add("jogomedio");
});

document.getElementById("x20").addEventListener("click", function () {
  resetTimer();
  cronometroAtivo = false;
  if (bestTimeDisplayHard == 0) {
    bestTime.innerText = "Recorde: \n 00:00 ⏱";
  } else {
    bestTime.innerText = bestTimeDisplayHard;
  }

  jogo.classList.remove("jogomedio");
  jogo.classList.remove("jogofacil");
  jogo.classList.add("jogodificil");
});

function updateTimerDisplay() {
  timerDisplay.textContent = `${minutos < 10 ? "0" : ""}${minutos}:${
    segundos < 10 ? "0" : ""
  }${segundos + " ⏱"}`;
}

function checkWinCondition() {
  const cell = document.getElementsByClassName("flaggedBomb");
  countFlaggedBombs = cell.length;

  var countOpenBlank = document.querySelectorAll('button[openblank="true"]');
  var countOpenNumber = document.querySelectorAll(
    '#table button:not([value="🟦"])'
  );

  countOpenBlankCells = countOpenBlank.length;
  countOpenNumberCells = countOpenNumber.length;

  if (countFlaggedBombs == auxAmountFlags) {
    bestTime;
    if (
      countOpenBlankCells + countOpenNumberCells ==
      auxtam * auxtam - auxAmountFlags
    ) {
      if (auxtam == 8) {
        bestTimeDisplayEasy = bestTime.innerText;
        bestTimeEasy = calcBestTime(bestTimeEasy, bestTimeDisplayEasy);
      }

      if (auxtam == 13) {
        bestTimeDisplayMedium = bestTime.innerText;
        bestTimeMedium = calcBestTime(bestTimeMedium, bestTimeDisplayMedium);
      }

      if (auxtam == 18) {
        bestTimeDisplayHard = bestTime.innerText;
        bestTimeHard = calcBestTime(bestTimeHard, bestTimeDisplayHard);
      }

      jogo.classList.add("win-animation");
      clearInterval(cronometroInterval);
      cronometroAtivo = true;
      const allButtons = document.getElementsByTagName("button");
      for (let button of allButtons) {
        if (button.closest("table") === table) {
          button.setAttribute("Disabled", "true");
          restart.style.display = "flex";
          restart.classList.add("restart-animation");
          restartButton.classList.add("restartButton-animation");
        }
      }
    }
  }
}

if (claro) {
  claro.addEventListener("click", () => {
    claro.classList.remove("selected", "desselected");
    escuro.classList.remove("selected", "desselected");
    claro.classList.add("selected");
    escuro.classList.add("desselected");
    table.style.backgroundColor = "rgba(100, 100, 100, 0.3)";
    jogo.style.boxShadow = "0 0 2svw 0.1svw black";
    difficulty.style.boxShadow = "0 0 0.5svw 0.2svw black";
    background.style.backgroundImage = 'url("whiteMineSweeper.png")';
    const buttons = document.querySelectorAll("#table td button");
    buttons.forEach((button) => {
      button.style.color = "black";
    });
  });
}

if (escuro) {
  escuro.addEventListener("click", () => {
    claro.classList.remove("selected", "desselected");
    escuro.classList.remove("selected", "desselected");
    escuro.classList.add("selected");
    claro.classList.add("desselected");
    table.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    jogo.style.boxShadow = "0 0 2svw 0.1svw white";
    difficulty.style.boxShadow = "0 0 0.5svw 0.2svw white";
    background.style.backgroundImage = 'url("darkMineSweeper.png")';
    const buttons = document.querySelectorAll("#table td button");
    buttons.forEach((button) => {
      button.style.color = "white";
    });
  });
}

function calcBestTime(melhorTempo, bestTimeDisplay) {
  var totalSegundos = minutos * 60 + segundos;
  if (melhorTempo > 0) {
    if (totalSegundos < melhorTempo) {
      melhorTempo = totalSegundos;
      bestTimeDisplay = "Recorde: \n" + timerDisplay.innerText;
      bestTimeElement.innerText = bestTimeDisplay;

      if (auxtam == 8) {
        bestTimeDisplayEasy = bestTimeDisplay;
      }

      if (auxtam == 13) {
        bestTimeDisplayMedium = bestTimeDisplay;
      }

      if (auxtam == 18) {
        bestTimeDisplayHard = bestTimeDisplay;
      }

      return melhorTempo;
    } else {
      bestTimeElement.innerText = bestTimeDisplay;

      if (auxtam == 8) {
        bestTimeDisplayEasy = bestTimeDisplay;
      }

      if (auxtam == 13) {
        bestTimeDisplayMedium = bestTimeDisplay;
      }

      if (auxtam == 18) {
        bestTimeDisplayHard = bestTimeDisplay;
      }
      return melhorTempo;
    }
  } else {
    bestTimeDisplay = "Recorde: \n" + timerDisplay.innerText;
    melhorTempo = totalSegundos;
    bestTimeElement.innerText = bestTimeDisplay;

    if (auxtam == 8) {
      bestTimeDisplayEasy = bestTimeDisplay;
    }

    if (auxtam == 13) {
      bestTimeDisplayMedium = bestTimeDisplay;
    }

    if (auxtam == 18) {
      bestTimeDisplayHard = bestTimeDisplay;
    }
    return melhorTempo;
  }
}
