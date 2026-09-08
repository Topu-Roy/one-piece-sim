<script lang="ts">
  // Shared chrome, but restart acts on the draft game's store (static pages
  // render with showRestart={false}, so the import is inert there).
  import { draft } from "../games/one-piece-draft/stores/draft";

  // Hub pages reuse the bar as chrome without the restart action.
  export let showRestart: boolean = true;

  function handleNewDraft() {
    draft.reset();
  }
</script>

<!-- Parchment bar, ink rule, Peralta brand + coral sticker restart. -->
<nav class="w-full border-b-4 border-cocoa bg-paper">
  <div class="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
    <a href="/" class="font-hand text-3xl leading-none font-normal text-cocoa">Anime Draft</a>

    {#if showRestart}
      <button
        class="rounded-2xl border-[3px] border-cocoa bg-coral px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-[4px_4px_0_#3a2a18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        on:click={handleNewDraft}
      >
        New Draft
      </button>
    {/if}
  </div>
</nav>
