<script>
  import {timeStep, randomSeed} from '../helpers/gameOfLife';

  let x = 100;
  let y = 100;
  let cellSize = 8;
  let stepSize = 500;
  let intervalId;
  let board = new Array(y).fill(0)

  emptyBoard()

  function emptyBoard() {
    board = board.map(val => {
      return new Array(x).fill(0)
    })
  }
  
  function run() {
    intervalId = setInterval(() => {
      board = timeStep(board);
    }, stepSize)
  }

  function pause() {
    clearInterval(intervalId);
  }

  function handleClick(i, j) {
    board[i][j] = board[i][j] === 0 ? 1 : 0;
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

</script>

<section class="game-container">
  {#each board as row, i}
    <div class="row" style={`height: ${cellSize}px;`}>
      {#each row as cell, j}
        <div class="cell" class:active="{cell === 1}" style={`width: ${cellSize}px; height: ${cellSize}px;`} on:click="{() => handleClick(i, j)}"></div>
      {/each}
    </div>
  {/each}
</section>
<button on:click={run}>Run</button>
<button on:click={pause}>Pause</button>
<button on:click={seed}>Seed</button>
<button on:click={faster}>Faster</button>
<button on:click={slower}>Slower</button>
<button on:click={emptyBoard}>Clear</button>

<style>
  .game-container :global(*) {
    box-sizing: border-box;
  }

  .game-container {
    border: solid 1px black;
    width: max-content;
    height: max-content;
  }

  .row {
    width: max-content;
    line-height: 0;
  }

  .cell {
    background: #333;
    /* border: solid 1px black; */
    display: inline-block;
  }

  .active {
    background: white;
  }
</style>
