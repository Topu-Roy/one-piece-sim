<script lang="ts">
  import { draft, finalStats } from "../stores/draft";

  $: stats = $finalStats;
  $: picks = $draft.picks;
  $: appearancePick = picks.find((p) => p.roundType === "appearance");

  function handleNewDraft() {
    draft.reset();
  }
</script>

<div class="flex min-h-screen flex-col items-center px-4 py-8">
  <div class="mb-8 text-center">
    <span
      class="mb-2 inline-block rounded-full border border-[var(--color-jelly-mint)]/30 px-3 py-1 font-mono text-[10px] tracking-widest text-[var(--color-jelly-mint)] uppercase"
    >
      Draft Complete
    </span>
    <h1 class="font-display text-3xl font-bold tracking-tight text-white uppercase md:text-4xl">
      {appearancePick?.characterName ?? "Your Character"}
    </h1>
  </div>

  {#if stats}
    <div class="mb-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-surface-slate p-6">
      <h2 class="mb-4 font-mono text-xs tracking-widest text-[var(--color-jelly-mint)] uppercase">Final Stats</h2>
      <div class="grid grid-cols-5 gap-4 text-center">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">STR</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.strength}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">DEF</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.durability}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">SPD</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.speed}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">AWR</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.awareness}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">STA</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.stamina}</span>
        </div>
      </div>
    </div>

    <div class="mb-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-surface-slate p-6">
      <h2 class="mb-4 font-mono text-xs tracking-widest text-[var(--color-jelly-mint)] uppercase">
        Stat Breakdown
      </h2>
      <div class="flex flex-col gap-2">
        {#each stats.breakdown as item (item.label)}
          <div class="flex items-center justify-between border-b border-white/5 py-2">
            <span class="font-mono text-xs text-white">{item.label}</span>
            <span class="font-mono text-[10px] text-[var(--color-secondary-text)]">{item.modifier}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-surface-slate p-6">
      <h2 class="mb-4 font-mono text-xs tracking-widest text-[var(--color-jelly-mint)] uppercase">Draft Picks</h2>
      <div class="flex flex-col gap-2">
        {#each picks as pick (pick.round)}
          <div class="flex items-center justify-between border-b border-white/5 py-2">
            <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">
              R{pick.round} — {pick.roundType.replace("_", " ")}
            </span>
            <span class="font-mono text-xs text-white">
              {pick.characterName}
              {#if pick.rarity !== "basic"}
                <span class="ml-1 text-[10px] text-[var(--color-dim-gray)]">({pick.rarity})</span>
              {/if}
            </span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <button
    class="rounded-full bg-[var(--color-jelly-mint)] px-6 py-3 font-mono text-xs tracking-widest text-black uppercase transition-all hover:bg-white"
    on:click={handleNewDraft}
  >
    New Draft
  </button>
</div>
