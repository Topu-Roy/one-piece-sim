<script lang="ts">
  import { draft } from "../stores/draft";

  function handleNewDraft() {
    draft.reset();
  }
</script>

<!-- Solid ink bar: yellow brand + ghost restart, always available. -->
<nav class="w-full bg-surface-dark">
  <div class="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
    <span class="font-hand text-2xl leading-none font-normal text-yellow">Anime Draft</span>

    <button
      class="rounded-full border border-white/30 px-4 py-1.5 text-xs font-medium tracking-wider text-on-dark uppercase transition-colors hover:bg-white/10"
      on:click={handleNewDraft}
    >
      New Draft
    </button>
  </div>
</nav>
