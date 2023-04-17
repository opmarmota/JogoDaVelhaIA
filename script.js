// Variáveis
let currentPlayer = "X";
let cells = document.getElementsByClassName("cell");
let gameOver = false;

// Faz as jogadas do player
function makeMove(index) {
  if (!cells[index].innerHTML && !gameOver) {
    cells[index].innerHTML = currentPlayer;
    cells[index].classList.add(currentPlayer);
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    checkWinner();
    if (!gameOver && currentPlayer === "O") {
      makeAIMove();
    }
  }
}

// Faz as jogadas da "IA", é random
function makeAIMove() {
  let emptyCells = Array.from(cells).filter(cell => !cell.innerHTML);
  if (emptyCells.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    setTimeout(() => {
      emptyCells[randomIndex].innerHTML = currentPlayer;
      emptyCells[randomIndex].classList.add(currentPlayer);
      currentPlayer = (currentPlayer === "X") ? "O" : "X";
      checkWinner();
    }, 500);
  }
}

// Reinicia o jogo
function restartGame() {
  for (let cell of cells) {
    cell.innerHTML = "";
    cell.classList.remove("X", "O", "winner");
  }
  currentPlayer = "X";
  gameOver = false;
}

// Verificar se houve vencedor ou empate
function checkWinner() {
  // Possibilidades de vitória
  let winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];
  // Verifica se alguém ganhou, e manda a mensagem de vitória
  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      if (cells[a].innerHTML === "O") {
        alert("A IA venceu, tente novamente...");
      } else {
        alert("Parabéns, você venceu!");
      }
      gameOver = true;
      return true;
    }
  }
  // Se não tiverem células nulas e não ter vencedor, então é empate
  let isTie = Array.from(cells).every(cell => cell.innerHTML !== "");
  if (isTie) {
    alert("Empate!");
    gameOver = true;
    return true;
  }
  return false;
}

// Adicionar evento de clique às células
document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => makeMove(index));
});

// Adicionar evento de clique ao botão de reiniciar
document.getElementById("restart").addEventListener("click", restartGame);