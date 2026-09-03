<script lang="ts">
  import type { DraftPick } from "../lib/types";
  import { Characters } from "../data/characters-v2";

  export let picks: DraftPick[];

  function getCharImage(name: string): string {
    const char = Characters.find((c) => c.displayName === name);
    return char?.imageURL ?? "";
  }

  let pickImageErrors: Record<number, boolean> = {};
</script>

<div class="w-full max-w-2xl rounded-[10px] border border-hairline bg-canvas p-6">
  <h2 class="mb-4 text-2xl leading-[1.35] font-normal tracking-[0.12px] text-ink">Draft Picks</h2>
  <div class="flex flex-col gap-2">
    {#each picks as pick (pick.round)}
      <div class="flex items-center gap-3 border-b border-hairline py-2">
        <span class="w-20 shrink-0 text-[10px] font-medium tracking-wider text-muted uppercase">
          R{pick.round} — {pick.roundType.replace("_", " ")}
        </span>
        <div class="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-hairline bg-surface-soft">
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
