<script lang="ts">
  import { draft, finalStats } from "../stores/draft";
  import { Characters } from "../data/characters-v2";
  import { rankBuild } from "../lib/draft";

  $: stats = $finalStats;
  $: picks = $draft.picks;
  $: appearancePick = picks.find((p) => p.roundType === "body");
  $: buildRank = stats ? rankBuild(stats.stats) : null;

  // Demo-grid pastel cycle for the 7 stat tiles.
  const tileSurfaces = ["bg-peach", "bg-mint", "bg-cream", "bg-yellow", "bg-surface-soft", "bg-peach", "bg-mint"];

  function getCharImage(name: string): string {
    const char = Characters.find((c) => c.displayName === name);
    return char?.imageURL ?? "";
  }

  let pickImageErrors: Record<number, boolean> = {};

  function handleNewDraft() {
    draft.reset();
  }
</script>

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-6 py-24">
  <div class="mb-12 text-center">
    <p class="mb-4 text-sm font-medium tracking-[0.16px] text-muted uppercase">Draft Complete</p>
    <h1 class="font-display text-4xl leading-[1.2] font-normal text-ink md:text-[40px]">
      {appearancePick?.characterName ?? "Your Character"}
    </h1>
  </div>

  {#if stats}
    {#if buildRank}
      <div class="mb-12 w-full max-w-2xl rounded-xl bg-forest p-8 text-center md:p-12">
        <h2 class="mb-2 text-sm font-medium tracking-[0.16px] text-on-dark uppercase">Your Rank</h2>
        <div class="font-display text-[32px] leading-[1.2] font-normal text-on-dark">
          #{buildRank.rank}
          <span class="text-sm font-normal text-on-dark"> of {buildRank.total} </span>
        </div>
        <div class="mt-1 text-sm text-on-dark">
          BST {buildRank.bst.toLocaleString()}
          {#if buildRank.tied.length > 0}
            <span>· tied with {buildRank.tied.join(", ")}</span>
          {/if}
        </div>
        <div class="mx-auto mt-6 flex max-w-md flex-col gap-1">
          {#if buildRank.above}
            <div class="flex items-center justify-between border-b border-white/20 py-1.5">
              <span class="text-[10px] font-medium tracking-wider text-on-dark uppercase">
                ▲ {buildRank.above.name}
              </span>
              <span class="text-xs text-on-dark">
                {buildRank.above.bst.toLocaleString()}
              </span>
            </div>
          {/if}
          <div class="flex items-center justify-between border-b border-white/20 py-1.5">
            <span class="text-[10px] font-medium tracking-wider text-on-dark uppercase"> ● You </span>
            <span class="text-xs font-medium text-on-dark">{buildRank.bst.toLocaleString()}</span>
          </div>
          {#if buildRank.below}
            <div class="flex items-center justify-between border-b border-white/20 py-1.5">
              <span class="text-[10px] font-medium tracking-wider text-on-dark uppercase">
                ▼ {buildRank.below.name}
              </span>
              <span class="text-xs text-on-dark">
                {buildRank.below.bst.toLocaleString()}
              </span>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <div class="mb-12 w-full max-w-2xl">
      <h2 class="mb-4 text-2xl leading-[1.35] font-normal tracking-[0.12px] text-ink">Final Stats</h2>
      <div class="grid grid-cols-4 gap-3 text-center md:grid-cols-7">
        {#each [{ k: "STR", v: stats.stats.strength }, { k: "ATK", v: stats.stats.attack }, { k: "DUR", v: stats.stats.durability }, { k: "DEF", v: stats.stats.defense }, { k: "SPD", v: stats.stats.speed }, { k: "AWR", v: stats.stats.awareness }, { k: "STA", v: stats.stats.stamina }] as tile, i (tile.k)}
          <div class="flex flex-col gap-1 rounded-[10px] p-4 {tileSurfaces[i % tileSurfaces.length]}">
            <span class="text-[10px] font-medium tracking-wider text-muted uppercase">{tile.k}</span>
            <span class="font-display text-2xl leading-[1.2] font-normal text-ink">{tile.v}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-12 w-full max-w-2xl rounded-[10px] border border-hairline bg-canvas p-6">
      <h2 class="mb-4 text-2xl leading-[1.35] font-normal tracking-[0.12px] text-ink">Stat Breakdown</h2>
      <div class="flex flex-col gap-2">
        {#each stats.breakdown as item (item.label)}
          <div class="flex items-center justify-between border-b border-hairline py-2">
            <span class="text-sm text-ink">{item.label}</span>
            <span class="text-[10px] text-muted">{item.modifier}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-12 w-full max-w-2xl rounded-[10px] border border-hairline bg-canvas p-6">
      <h2 class="mb-4 text-2xl leading-[1.35] font-normal tracking-[0.12px] text-ink">Draft Picks</h2>
      <div class="flex flex-col gap-2">
        {#each picks as pick (pick.round)}
          <div class="flex items-center gap-3 border-b border-hairline py-2">
            <span class="w-20 shrink-0 text-[10px] font-medium tracking-wider text-muted uppercase">
              R{pick.round} — {pick.roundType.replace("_", " ")}
            </span>
            <div
              class="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-hairline bg-surface-soft"
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
                <span class="flex h-full w-full items-center justify-center text-xs text-ink">
                  {pick.characterName.charAt(0)}
                </span>
              {/if}
            </div>
            <span class="text-sm text-ink">
              {pick.characterName}
              {#if pick.rarity !== "basic"}
                <span class="ml-1 text-[10px] text-muted">({pick.rarity})</span>
              {/if}
            </span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <button
    class="rounded-xl bg-ink px-6 py-4 text-base font-medium text-on-dark active:bg-surface-dark"
    on:click={handleNewDraft}
  >
    New Draft
  </button>
</div>
