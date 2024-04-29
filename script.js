import { geraLinha, checkSurroundings, printGrid } from "./func.js";

document.addEventListener("DOMContentLoaded", function () {
  const cronometro = document.getElementById("cronometro");
  const temas = document.getElementById("temas");
  const tabela = document.getElementById("tabela");
  const intro = document.getElementById("intro");

  var campo = [];

  if (x10) {
    x10.addEventListener("click", () => {
      cronometro.style.display = "block";
      var tam = 8;
      campo = geraLinha(tam);
      printGrid(campo, tam);
      checkSurroundings(campo, tam);
      restart.style.display = "none";
      temas.style.display = "table";
      tabela.style.display = "flex";
      intro.style.display = "none";

      x10.classList.remove("selected", "desselected");
      x15.classList.remove("selected", "desselected");
      x20.classList.remove("selected", "desselected");

      x10.classList.add("selected");
      x15.classList.add("desselected");
      x20.classList.add("desselected");

      if (restartButton) {
        restartButton.addEventListener("click", () => {
          const click = new Event("click");
          x10.dispatchEvent(click);
        });
      }
    });
  }

  if (x15) {
    x15.addEventListener("click", () => {
      cronometro.style.display = "block";
      var tam = 13;
      campo = geraLinha(tam);
      printGrid(campo, tam);
      checkSurroundings(campo, tam);
      restart.style.display = "none";
      temas.style.display = "table";
      tabela.style.display = "flex";
      intro.style.display = "none";

      x10.classList.remove("selected", "desselected");
      x15.classList.remove("selected", "desselected");
      x20.classList.remove("selected", "desselected");

      x10.classList.add("desselected");
      x15.classList.add("selected");
      x20.classList.add("desselected");

      if (restartButton) {
        restartButton.addEventListener("click", () => {
          const click = new Event("click");
          x15.dispatchEvent(click);
        });
      }
    });
  }

  if (x20) {
    x20.addEventListener("click", () => {
      cronometro.style.display = "block";
      var tam = 18;
      campo = geraLinha(tam);
      printGrid(campo, tam);
      checkSurroundings(campo, tam);
      restart.style.display = "none";
      temas.style.display = "table";
      tabela.style.display = "flex";
      intro.style.display = "none";

      x10.classList.remove("selected", "desselected");
      x15.classList.remove("selected", "desselected");
      x20.classList.remove("selected", "desselected");

      x10.classList.add("desselected");
      x15.classList.add("desselected");
      x20.classList.add("selected");

      if (restartButton) {
        restartButton.addEventListener("click", () => {
          const click = new Event("click");
          x20.dispatchEvent(click);
        });
      }
    });
  }
});
