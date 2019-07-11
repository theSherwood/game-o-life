<script>
  export let x = 100;
  export let y = 100;
  export let cellSize = 8;

  const board = new Array(y).fill(new Array(x).fill(0));

</script>

<section class="game-container">
  {#each board as row, i}
    <div class="row" style={`height: ${cellSize}px;`}>
      {#each row as cell, j}
        <div class="cell" style={`width: ${cellSize}px; height: ${cellSize}px;`}></div>
      {/each}
    </div>
  {/each}

</section>

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
    border: solid 1px black;
    display: inline-block;
  }
</style>
