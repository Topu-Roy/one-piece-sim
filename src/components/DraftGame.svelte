<script lang="ts">
  import { isComplete } from "../stores/draft";
  import RoundScreen from "./RoundScreen.svelte";
  import ResultScreen from "./ResultScreen.svelte";
  import NavBar from "./NavBar.svelte";
</script>

<!-- Parchment canvas per the Wanted Poster system — no atmospheric
     backdrop. Cards carry their own white surfaces so text stays legible. -->
<div class="relative min-h-screen bg-paper text-cocoa">
  <!-- No round transition here: it lives on the options grid only,
       so the header and Draft Picks table never replay it. -->
  <div class="relative">
    <NavBar />
    {#if $isComplete}
      <ResultScreen />
    {:else}
      <RoundScreen />
    {/if}
  </div>
</div>
