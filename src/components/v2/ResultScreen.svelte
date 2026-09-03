<script lang="ts">
  import { draft, finalStats } from "../../stores/draft-v2";
  import { Characters } from "../../data/characters-v2";
  import { rankBuild } from "../../lib/draft-v2";

  $: stats = $finalStats;
  $: picks = $draft.picks;
  $: appearancePick = picks.find((p) => p.roundType === "race");
  $: buildRank = stats ? rankBuild(stats.stats) : null;

  function getCharImage(name: string): string {
    const char = Characters.find((c) => c.displayName === name);
    return char?.imageURL ?? "";
  }

  let pickImageErrors: Record<number, boolean> = {};

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
    {#if buildRank}
      <div class="mb-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-surface-slate p-6 text-center">
        <h2 class="mb-2 font-mono text-xs tracking-widest text-[var(--color-jelly-mint)] uppercase">Your Rank</h2>
        <div class="font-display text-5xl font-bold text-white">
          #{buildRank.rank}
          <span class="font-mono text-sm font-normal text-[var(--color-dim-gray)]">
            of {buildRank.total}
          </span>
        </div>
        <div class="mt-1 font-mono text-xs text-[var(--color-secondary-text)]">
          BST {buildRank.bst.toLocaleString()}
          {#if buildRank.tied.length > 0}
            <span class="text-[var(--color-dim-gray)]">· tied with {buildRank.tied.join(", ")}</span>
          {/if}
        </div>
        <div class="mx-auto mt-4 flex max-w-md flex-col gap-1">
          {#if buildRank.above}
            <div class="flex items-center justify-between border-b border-white/5 py-1.5">
              <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">
                ▲ {buildRank.above.name}
              </span>
              <span class="font-mono text-xs text-[var(--color-secondary-text)]">
                {buildRank.above.bst.toLocaleString()}
              </span>
            </div>
          {/if}
          <div class="flex items-center justify-between border-b border-[var(--color-jelly-mint)]/30 py-1.5">
            <span class="font-mono text-[10px] tracking-wider text-[var(--color-jelly-mint)] uppercase">
              ● You
            </span>
            <span class="font-mono text-xs font-bold text-white">{buildRank.bst.toLocaleString()}</span>
          </div>
          {#if buildRank.below}
            <div class="flex items-center justify-between border-b border-white/5 py-1.5">
              <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">
                ▼ {buildRank.below.name}
              </span>
              <span class="font-mono text-xs text-[var(--color-secondary-text)]">
                {buildRank.below.bst.toLocaleString()}
              </span>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <div class="mb-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-surface-slate p-6">
      <h2 class="mb-4 font-mono text-xs tracking-widest text-[var(--color-jelly-mint)] uppercase">Final Stats</h2>
      <div class="grid grid-cols-4 gap-4 text-center md:grid-cols-7">
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">STR</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.strength}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">ATK</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.attack}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">DUR</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.durability}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">DEF</span>
          <span class="font-mono text-2xl font-bold text-white">{stats.stats.defense}</span>
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
          <div class="flex items-center gap-3 border-b border-white/5 py-2">
            <span
              class="w-20 shrink-0 font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase"
            >
              R{pick.round} — {pick.roundType.replace("_", " ")}
            </span>
            <div
              class="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[var(--color-canvas-black)]"
            >
              {#if getCharImage(pick.characterName) && !pickImageErrors[pick.round]}
                <img
                  src={getCharImage(pick.characterName)}
                  alt={pick.characterName}
                  class="h-full w-full object-cover"
                  loading="lazy"
                  on:error={() => (pickImageErrors[pick.round] = true)}
                />
              {:else}
                <span class="flex h-full w-full items-center justify-center text-xs text-white">
                  {pick.characterName.charAt(0)}
                </span>
              {/if}
            </div>
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
