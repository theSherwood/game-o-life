<script>
  import {timeStep, randomSeed} from '../helpers/gameOfLife';

  let x = 160;
  let y = 160;
  let cellSize = 8;
  let stepSize = 500;
  let intervalId;
  let board;
  let paused = true;
  let gliders = false;

  emptyBoard()

  function emptyBoard() {
    const newBoard = new Array(y).fill(0);
    board = newBoard.map(val => {
      return new Array(x).fill(0)
    })
  }
  
  function run() {
    paused = false;
    intervalId = setInterval(() => {
      board = timeStep(board);
    }, stepSize)
  }

  function pause() {
    paused = true;
    clearInterval(intervalId);
  }

  function handleClick(i, j) {
    if (gliders) {
      makeGlider(i, j)
    } else {
      board[i][j] = board[i][j] === 0 ? 1 : 0;
    }
    board = board;
  }

  function seed() {
    board = randomSeed(board);
  }

  function faster() {
    if (stepSize > 50) {
      pause()
      stepSize = Math.round(stepSize/2)
      run()
    }
  }

  function slower() {
    if (stepSize < 1000) {
      pause()
      stepSize = stepSize * 2
      run()
    }
  }

  function bigger() {
    x = x < 220 ? x + 10 : x;
    y = y < 220 ? y + 10 : y;
    emptyBoard();
  }

  function smaller() {
    x = x > 70 ? x - 10 : x;
    y = y > 70 ? y - 10 : y;
    emptyBoard();
  }

  function toggleGliders() {
    gliders = !gliders;
  }

  function makeGlider(i, j) {
    try {
      board[i][j] = 1;
      board[i][j-1] = 1;
      board[i][j-2] = 1;
      board[i-1][j] = 1;
      board[i-2][j-1] = 1;
    } catch (err) {
      board[i][j] = board[i][j] === 0 ? 1 : 0;
    }
  }
</script>

<section class="game-container">
  <section class="controls">
    <button on:click={run} class:disabled={!paused}>Run</button>
    <button on:click={pause} class:disabled={paused}>Pause</button>
    <button on:click={emptyBoard}>Clear</button>
    <button on:click={seed}>Seed</button>
    <button on:click={faster} class:disabled={stepSize <= 50}>Faster</button>
    <button on:click={slower} class:disabled={stepSize >= 1000}>Slower</button>
    <button on:click={bigger} class:disabled={x >= 220}>Bigger</button>
    <button on:click={smaller} class:disabled={x <= 70}>Smaller</button>
    <button on:click={toggleGliders} class:disabled={gliders}>Gliders</button>
  </section>
  <section class="board-container">
    {#each board as row, i}
      {#if (i>29 && i<board.length - 30)}
        <div class="row" style={`height: ${cellSize}px;`}>
          {#each row as cell, j}
            {#if (j>29 && j<board[0].length - 30)}
              <div class="cell" class:active="{cell === 1}" style={`width: ${cellSize}px; height: ${cellSize}px;`} on:click="{() => handleClick(i, j)}"></div>
            {/if}
          {/each}
        </div>
      {/if}
    {/each}
  </section>
</section>

<style>
  .game-container :global(*) {
    box-sizing: border-box;
  }

  .game-container {
    margin: auto;
    width: max-content;
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  button {
    flex: 1 1 auto;
  }

  .board-container {
    width: max-content;
    height: max-content;
    margin: auto;
  }

  .row {
    width: max-content;
    line-height: 0;
  }

  .cell {
    background: #333;
    display: inline-block;
  }

  .active {
    background: white;
  }

  .disabled {
    background: darkgray;
    color: gray;
  }
</style>
