<script lang="ts">
  import { isComplete } from "../stores/draft";
  import RoundScreen from "./RoundScreen.svelte";
  import ResultScreen from "./ResultScreen.svelte";
</script>

{#if $isComplete}
  <ResultScreen />
{:else}
  <RoundScreen />
{/if}
