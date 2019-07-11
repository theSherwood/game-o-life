<script>
  export let x = 100;
  export let y = 100;

  const board = new Array(y).fill(new Array(x).fill(0));

  console.log(board);
</script>

<section class="game-container"></section>

<style>
  .game-container {
    border: solid 1px black;
  }
</style>
