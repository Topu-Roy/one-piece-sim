<script lang="ts">
  import type { Character, RoundType } from "../lib/types";

  export let character: Character;
  export let roundType: RoundType;
  export let index: number;
  export let onSelect: (index: number) => void;

  $: showRarity = roundType !== "body";
  // Rarity chips: legend = dark navy, epic = forest, basic hidden. White type on both.
  $: rarityChip =
    character.rarity === "legend"
      ? "bg-surface-dark text-on-dark"
      : character.rarity === "epic"
        ? "bg-forest text-on-dark"
        : "";
  $: currentHakiTier =
    roundType === "armament"
      ? character.haki.armament.tier
      : roundType === "observation"
        ? character.haki.observation.tier
        : roundType === "conqueror"
          ? character.haki.conqueror.tier
          : null;

  let imageError = false;
</script>

<button
  class="relative flex w-full flex-col items-center gap-3 rounded-[10px] border border-hairline bg-canvas p-4 active:bg-surface-soft"
  on:click={() => onSelect(index)}
>
  {#if showRarity && character.rarity !== "basic"}
    <span
      class="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase {rarityChip}"
    >
      {character.rarity}
    </span>
  {/if}

  <div
    class="relative -mx-4 -mt-4 flex aspect-square w-[calc(100%+2rem)] items-center justify-center overflow-hidden rounded-t-[10px] bg-surface-soft text-4xl text-ink"
  >
    {#if character.imageURL && !imageError}
      <img
        src={character.imageURL}
        alt={character.displayName}
        class="h-full w-full object-cover"
        loading="lazy"
        on:error={() => (imageError = true)}
      />
    {:else}
      <span>{character.displayName.charAt(0)}</span>
    {/if}
  </div>

  {#if roundType === "body"}
    <span class="text-lg leading-[1.4] font-medium text-ink">{character.fullName}</span>
    <span class="text-xs tracking-wider text-muted uppercase">
      {character.race}
    </span>
  {:else}
    <span class="text-lg leading-[1.4] font-medium text-ink">{character.displayName}</span>

    {#if currentHakiTier}
      <span class="text-xs tracking-wider text-muted uppercase">
        Haki: {currentHakiTier}
      </span>
    {/if}

    {#if roundType === "devil_fruit" && character.devilFruit.type !== "none"}
      <span class="text-xs text-body">
        {character.devilFruit.englishName}
      </span>
      <span class="text-[10px] tracking-wider text-muted uppercase">
        {character.devilFruit.type.replace("_", " ")}
      </span>
    {/if}

    {#if roundType === "weapon" && character.weapon.type !== "none"}
      <span class="text-xs text-body">
        {character.weapon.name}
      </span>
      <span class="text-[10px] tracking-wider text-muted uppercase">
        {character.weapon.type}
      </span>
    {/if}

    {#if roundType === "intelligence"}
      <span class="text-xs text-body">
        Intelligence: {character.baseStats.intelligence}
      </span>
    {/if}

    {#if roundType === "battle_iq"}
      <span class="text-xs text-body">
        Battle IQ: {character.baseStats.battleIQ}
      </span>
    {/if}
  {/if}
</button>
