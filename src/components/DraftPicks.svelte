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

  // Tier-colored text (no chip): gold / navy / forest.
  function rarityText(rarity: DraftPick["rarity"]): string {
    switch (rarity) {
      case "god":
        return "text-mustard";
      case "legend":
        return "text-surface-dark";
      case "epic":
        return "text-forest";
      default:
        return "";
    }
  }

  let pickImageErrors: Record<number, boolean> = {};
</script>

<div class="w-full max-w-2xl rounded-[10px] border border-hairline bg-parchment p-4">
  <div class="mb-2 flex items-baseline justify-between">
    <h2 class="text-lg leading-[1.35] font-normal tracking-[0.12px] text-ink">Draft Picks</h2>
    <span class="text-xs font-medium tracking-wider text-muted uppercase">
      {picks.length}/{TOTAL_ROUNDS}
    </span>
  </div>
  <div class="flex flex-col gap-1">
    {#each rounds as round (round)}
      {@const pick = byRound.get(round)}
      {@const roundType = getRoundType(round)}
      {#if pick}
        <div class="flex items-center gap-2.5 border-b border-hairline py-1.5 last:border-b-0">
          <span class="w-28 shrink-0 text-[10px] font-medium tracking-wider text-muted uppercase">
            {roundName(pick.roundType)}
          </span>
          <div
            class="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-hairline bg-surface-soft"
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
          <span class="min-w-0 flex-1 truncate text-sm text-ink">
            {pick.characterName}
          </span>
          {#if pick.rarity !== "basic"}
            <span class="shrink-0 text-[10px] font-medium tracking-wider uppercase {rarityText(pick.rarity)}">
              {pick.rarity}
            </span>
          {/if}
        </div>
      {:else}
        <!-- Upcoming pick: ghost row doubles as draft progress. -->
        <div class="flex items-center gap-2.5 border-b border-hairline py-1.5 opacity-50 last:border-b-0">
          <span class="w-28 shrink-0 text-[10px] font-medium tracking-wider text-muted uppercase">
            {roundName(roundType)}
          </span>
          <div
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border-strong bg-canvas text-xs text-muted"
          >
            ?
          </div>
          <span class="text-sm text-muted"> Awaiting pick </span>
        </div>
      {/if}
    {/each}
  </div>
</div>
