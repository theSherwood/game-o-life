<script>
  import {timeStep} from '../helpers/gameOfLife';

  export let x = 100;
  export let y = 100;
  export let cellSize = 8;
  export let stepSize = 100;

  let board = new Array(y).fill(0)
  board = board.map(val => {
    return new Array(x).fill(0)
  })

  let intervalId;
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
