<script lang="ts">
  import type { DraftPick } from "../lib/types";
  import { TOTAL_ROUNDS, getRoundType } from "../lib/draft";
  import { Characters } from "../data/characters-v2";

  export let picks: DraftPick[];

  // Reactive: rebuild every time picks changes, or the list never updates.
  $: byRound = new Map(picks.map((p) => [p.round, p]));
  const rounds = Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1);

  function getCharImage(name: string): string {
    const char = Characters.find((c) => c.displayName === name);
    return char?.imageURL ?? "";
  }

  // Badge labels: "body" → "Body", "battle_iq" → "Battle IQ".
  function roundName(roundType: string): string {
    return roundType
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  // Tier-colored text for the dark panel: gold / white / mint.
  function rarityText(rarity: DraftPick["rarity"]): string {
    switch (rarity) {
      case "god":
        return "text-mustard";
      case "legend":
        return "text-on-dark";
      case "epic":
        return "text-mint";
      default:
        return "";
    }
  }

  let pickImageErrors: Record<number, boolean> = {};
</script>

<div class="w-full max-w-lg rounded-[10px] border border-white/10 bg-surface-dark p-4">
  <div class="mb-2 flex items-baseline justify-between">
    <h2 class="text-lg leading-[1.35] font-normal tracking-[0.12px] text-on-dark">Draft Picks</h2>
    <span class="text-xs font-medium tracking-wider text-on-dark/60 uppercase">
      {picks.length}/{TOTAL_ROUNDS}
    </span>
  </div>
  <div class="flex flex-col gap-1">
    {#each rounds as round (round)}
      {@const pick = byRound.get(round)}
      {@const roundType = getRoundType(round)}
      {#if pick}
        <!-- Zones: round name left, avatar+name centered, tier right. -->
        <div class="flex items-center gap-2.5 border-b border-white/10 py-1.5 last:border-b-0">
          <span class="w-28 shrink-0 text-center text-[10px] font-medium tracking-wider text-on-dark/60 uppercase">
            {roundName(pick.roundType)}
          </span>
          <div class="flex min-w-0 flex-1 items-center justify-center">
            <div class="flex w-30 justify-start gap-2">
              <div
                class="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/20 bg-surface-dark"
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
                  <span class="flex h-full w-full items-center justify-center text-xs text-on-dark">
                    {pick.characterName.charAt(0)}
                  </span>
                {/if}
              </div>
              <span class="min-w-0 truncate text-sm text-on-dark">
                {pick.characterName}
              </span>
            </div>
          </div>
          <!-- Picked rows always show their tier, basic included. -->
          <span
            class="w-14 shrink-0 text-right text-[10px] font-medium tracking-wider uppercase {pick.rarity ===
            'basic'
              ? 'text-on-dark/60'
              : rarityText(pick.rarity)}"
          >
            {pick.rarity}
          </span>
        </div>
      {:else}
        <!-- Upcoming pick: ghost row doubles as draft progress. -->
        <div class="flex items-center gap-2.5 border-b border-white/10 py-1.5 opacity-50 last:border-b-0">
          <span class="w-28 shrink-0 text-center text-[10px] font-medium tracking-wider text-on-dark/60 uppercase">
            {roundName(roundType)}
          </span>
          <div class="flex min-w-0 flex-1 items-center justify-center">
            <div class="flex w-30 justify-start gap-2">
              <div
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-white/20 text-xs text-on-dark/60"
              >
                ?
              </div>
              <span class="min-w-0 truncate text-sm text-on-dark/60"> Awaiting pick </span>
            </div>
          </div>
          <span class="w-14 shrink-0 text-right text-[10px] font-medium tracking-wider text-on-dark/60 uppercase">
            --
          </span>
        </div>
      {/if}
    {/each}
  </div>
</div>
