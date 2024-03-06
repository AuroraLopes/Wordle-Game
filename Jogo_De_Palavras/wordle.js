

var height = 6;
var width = 0;

var row = 0;
var col = 0;

var gameOver = false;

const keys = document.querySelectorAll(".keyboard-row button");

for (let i = 0; i < keys.length; i++) {
  keys[i].onclick = ({ target }) => {
    let letter = target.getAttribute("data-key");
    if (letter != 'Backspace' && letter != 'Enter') {
      letter = letter.toUpperCase()
    }

    handleKeyPress(letter)
  };
}

var bibliotecaPalavras = {
  animais: [
    'elefante',
    'girafa',
    'leão',
    'tigre',
    'macaco',
    'cobra',
    'gato',
    'cachorro',
    'pássaro',
    'peixe'
  ],
  transportes: [
    'carro',
    'ônibus',
    'bicicleta',
    'avião',
    'navio',
    'trem',
    'moto',
    'caminhão',
    'helicóptero',
    'barco'
  ],
  frutas: [
    'maçã',
    'banana',
    'laranja',
    'uva',
    'abacaxi',
    'morango',
    'melancia',
    'pera',
    'kiwi',
    'manga'
  ],
};

var categorias = Object.keys(bibliotecaPalavras);

var categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

var palavrasNaCategoria = bibliotecaPalavras[categoriaAleatoria];

var word = palavrasNaCategoria[Math.floor(Math.random() * palavrasNaCategoria.length)].toUpperCase();   

width = word.length;

window.onload = function () {
  intialize(word)
  document.getElementById("titulo").innerText = "Categoria: " + categoriaAleatoria.toUpperCase();
}



function handleKeyPress(key) {
  if (gameOver) return;

  if (key === "Backspace") {
    if (0 < col && col <= width) {
      col -= 1;
    }
    let currTile = document.getElementById(row.toString() + '-' + col.toString());
    currTile.innerText = "";
  } else if (key === "Enter") {
    if (col === width) {
      update();
      row += 1;
      col = 0;
    }
  } else if ("QWERTYUIOPASDFGHJKLZXCVBNM".includes(key)) {
    if (col < width) {
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      if (currTile.innerText == "") {
        currTile.innerText = key;
        col += 1;
      }
    }
  }

  if (!gameOver && row == height) {
    gameOver = true;
    document.getElementById("answer").innerText = word;
  }
}


function intialize() {
  var board = document.getElementById("board");
  board.style.width = (60 + (60 * width)) + 'px';
  // Create the game board
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      board.appendChild(tile);
    }
  }

  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      currTile.innerText = "";
    } else if (e.code == "Enter") {
      if (col === width) {
        update();
        row += 1;
        col = 0;
      }
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  });
}


function update() {
  let correct = 0;
  let letterCount = {};
  for (let i = 0; i < word.length; i++) {
    letter = word[i];
    if (letterCount[letter]) {
      letterCount[letter] += 1;
    } else {
      letterCount[letter] = 1;
    }
  }

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;

    if (word[c] == letter) {
      currTile.classList.add("correto");
      correct += 1;
      letterCount[letter] -= 1;
    }
    if (correct == width) {
      gameOver = true;
    }
  }

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;
    letterCount[letter] = 1;

    if (!currTile.classList.contains("correto")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        currTile.classList.add("presente");
      } else {
        currTile.classList.add("ausente")
      }
    }
  }
}
document.addEventListener("keyup", (e) => {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    // Lógica para preencher as letras no tabuleiro
  } else if (e.code == "Backspace") {
    // Lógica para apagar uma letra
  } else if (e.code == "Enter") {
    if (col === width) {
      // Se o jogo terminar, atualize o jogo
      update();
      row += 1;
      col = 0;

      // Verifique se o jogo terminou completamente
      if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;

        // Adicione um novo evento de teclado específico para a tecla "Enter" após o jogo terminar
        document.addEventListener("keyup", handleEnterKey);
      }
    }
  }
});

// Função para lidar com a tecla "Enter" após o jogo ter terminado
function handleEnterKey(e) {
  if (e.code == "Enter") {
    reiniciarJogo();

    // Atualize o título após a reinicialização
    document.getElementById("titulo").innerText = "Categoria: " + categoriaAleatoria.toUpperCase();

    // Remova o evento de teclado para evitar múltiplas reinicializações
    document.removeEventListener("keyup", handleEnterKey);
  }
}

function reiniciarJogo() {
  row = 0;
  col = 0;
  gameOver = false;

  // Limpa o tabuleiro
  var board = document.getElementById("board");
  board.innerHTML = "";

  // Limpa a resposta anterior
  document.getElementById("answer").innerText = "";

  // Obtém uma nova palavra e atualiza a largura do tabuleiro
  var newWord = palavrasNaCategoria[Math.floor(Math.random() * palavrasNaCategoria.length)].toUpperCase();
  width = newWord.length;
  document.getElementById("board").style.width = (60 + (60 * width)) + 'px';

  // Atualiza o título da categoria
  document.getElementById("titulo").innerText = "Categoria: " + categoriaAleatoria.toUpperCase();

  // Cria novamente o tabuleiro
  intialize();
}