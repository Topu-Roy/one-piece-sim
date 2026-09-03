<script lang="ts">
  import type { Character, RoundType } from "../lib/types";
  import { getRaceModifier } from "../data/races";

  export let character: Character;
  export let roundType: RoundType;
  export let index: number;
  export let onSelect: (index: number) => void;

  // Per-character base (attack/defense derive later from haki/DF/weapon, start at 0)
  $: raceStats = roundType === "body" ? character.baseStats : null;
  $: raceMod = roundType === "body" ? getRaceModifier(character.race) : null;
  $: raceModLabel =
    raceMod !== null
      ? (
          [
            ["STR", raceMod.strength],
            ["DUR", raceMod.durability],
            ["SPD", raceMod.speed],
            ["AWR", raceMod.awareness],
            ["STA", raceMod.stamina],
          ] as const
        )
          .filter(([, v]) => v !== 0)
          .map(([k, v]) => `${k} ${v > 0 ? "+" : ""}${v}%`)
          .join(" · ")
      : "";
  $: showRarity = roundType !== "body";
  $: rarityColor =
    character.rarity === "legend"
      ? "text-yellow-400"
      : character.rarity === "epic"
        ? "text-purple-400"
        : "text-gray-400";
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
  class="group relative flex w-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface-slate p-6 transition-all hover:border-[var(--color-jelly-mint)] hover:bg-surface-slate/80"
  on:click={() => onSelect(index)}
>
  {#if showRarity && character.rarity !== "basic"}
    <span
      class="absolute top-3 right-3 rounded-full border border-white/20 px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase {rarityColor}"
    >
      {character.rarity}
    </span>
  {/if}

  <div
    class="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[var(--color-canvas-black)] text-2xl"
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
    <span class="text-sm font-bold text-white">{character.fullName}</span>
    <span class="font-mono text-xs tracking-wider text-[var(--color-secondary-text)] uppercase">
      {character.race}
    </span>
    {#if raceModLabel}
      <span class="font-mono text-[10px] tracking-wider text-[var(--color-jelly-mint)] uppercase">
        {raceModLabel}
      </span>
    {/if}
    <div class="grid w-full grid-cols-5 gap-1 text-center">
      <div class="flex flex-col">
        <span class="font-mono text-[9px] tracking-wider text-[var(--color-dim-gray)] uppercase">STR</span>
        <span class="font-mono text-xs text-[var(--color-jelly-mint)]">{raceStats?.strength}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-[9px] tracking-wider text-[var(--color-dim-gray)] uppercase">DUR</span>
        <span class="font-mono text-xs text-[var(--color-jelly-mint)]">{raceStats?.durability}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-[9px] tracking-wider text-[var(--color-dim-gray)] uppercase">SPD</span>
        <span class="font-mono text-xs text-[var(--color-jelly-mint)]">{raceStats?.speed}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-[9px] tracking-wider text-[var(--color-dim-gray)] uppercase">AWR</span>
        <span class="font-mono text-xs text-[var(--color-jelly-mint)]">{raceStats?.awareness}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-mono text-[9px] tracking-wider text-[var(--color-dim-gray)] uppercase">STA</span>
        <span class="font-mono text-xs text-[var(--color-jelly-mint)]">{raceStats?.stamina}</span>
      </div>
    </div>
  {:else}
    <span class="text-sm font-bold text-white">{character.displayName}</span>

    {#if currentHakiTier}
      <span class="font-mono text-xs tracking-wider text-[var(--color-secondary-text)] uppercase">
        Haki: {currentHakiTier}
      </span>
    {/if}

    {#if roundType === "devil_fruit" && character.devilFruit.type !== "none"}
      <span class="font-mono text-xs text-[var(--color-secondary-text)]">
        {character.devilFruit.englishName}
      </span>
      <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">
        {character.devilFruit.type.replace("_", " ")}
      </span>
    {/if}

    {#if roundType === "weapon" && character.weapon.type !== "none"}
      <span class="font-mono text-xs text-[var(--color-secondary-text)]">
        {character.weapon.name}
      </span>
      <span class="font-mono text-[10px] tracking-wider text-[var(--color-dim-gray)] uppercase">
        {character.weapon.type}
      </span>
    {/if}

    {#if roundType === "intelligence"}
      <span class="font-mono text-xs text-[var(--color-secondary-text)]">
        Intelligence: {character.baseStats.intelligence}
      </span>
    {/if}

    {#if roundType === "battle_iq"}
      <span class="font-mono text-xs text-[var(--color-secondary-text)]">
        Battle IQ: {character.baseStats.battleIQ}
      </span>
    {/if}
  {/if}
</button>
