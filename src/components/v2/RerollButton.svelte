<script lang="ts">
  import { draft, rerollsLeft } from "../../stores/draft-v2";

  $: rerolls = $rerollsLeft;
  $: canReroll = rerolls > 0;

  function handleReroll() {
    if (canReroll) {
      draft.reroll();
    }
  }
</script>

<button
  class="flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all {canReroll
    ? 'border-[var(--color-jelly-mint)] text-[var(--color-jelly-mint)] hover:bg-[var(--color-jelly-mint)] hover:text-black'
    : 'cursor-not-allowed border-white/10 text-[var(--color-dim-gray)]'}"
  on:click={handleReroll}
  disabled={!canReroll}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
  Reroll ({rerolls})
</button>
