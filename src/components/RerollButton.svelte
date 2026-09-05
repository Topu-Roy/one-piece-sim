<script lang="ts">
  import { draft, rerollsLeft } from "../stores/draft";

  $: rerolls = $rerollsLeft;
  $: canReroll = rerolls > 0;

  function handleReroll() {
    if (canReroll) {
      draft.reroll();
    }
  }
</script>

<button
  class="flex items-center gap-1.5 rounded-full border border-hairline bg-surface-soft px-4 py-2 text-sm font-medium text-ink transition-colors active:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-40"
  on:click={handleReroll}
  disabled={!canReroll}
  title={canReroll ? "Replace these 4 options" : "No rerolls left"}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-3.5 w-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
  Reroll · {rerolls}
</button>
