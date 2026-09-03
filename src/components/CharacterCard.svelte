<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Character, RoundType } from "../lib/types";
  import { Characters } from "../data/characters-v2";

  export let character: Character;
  export let roundType: RoundType;
  export let index: number;
  export let onSelect: (index: number) => void;
  export let onLockRequest: (index: number) => void = () => {};
  export let onLocked: (index: number) => void = () => {};
  // Round 1 reveal: ms this card shuffles once started (0 = already locked).
  export let revealDelay: number = 0;
  // Parent gates start order: card shuffles only after the previous one locks.
  export let canStart: boolean = true;
  // Parent raises this to force-lock cards at or before the clicked index.
  export let lockUpTo: number = -1;

  const SHUFFLE_TICK_MS = 80;

  let selfLocked = false;
  let started = false;
  let decoyURL = "";
  let shuffleTimer: ReturnType<typeof setInterval> | null = null;
  let lockTimer: ReturnType<typeof setTimeout> | null = null;

  function stopShuffle() {
    if (shuffleTimer !== null) {
      clearInterval(shuffleTimer);
      shuffleTimer = null;
    }
    if (lockTimer !== null) {
      clearTimeout(lockTimer);
      lockTimer = null;
    }
  }

  function lock() {
    selfLocked = true;
    stopShuffle();
  }

  function randomDecoy(): string {
    const pool = Characters.filter((c) => c.imageURL && c.id !== character.id);
    return pool[Math.floor(Math.random() * pool.length)]?.imageURL ?? "";
  }

  function start() {
    if (started) return;
    started = true;
    decoyURL = randomDecoy();
    shuffleTimer = setInterval(() => {
      if (!selfLocked) decoyURL = randomDecoy();
    }, SHUFFLE_TICK_MS);
    lockTimer = setTimeout(() => {
      lock();
      onLocked(index);
    }, revealDelay);
  }

  onMount(() => {
    if (revealDelay <= 0 || roundType !== "body") {
      selfLocked = true;
      return;
    }
    if (canStart) start();
  });

  onDestroy(stopShuffle);

  // Parent gates sequence order; parent-driven early lock.
  $: if (canStart && !started && !selfLocked && roundType === "body" && revealDelay > 0) start();
  $: if (lockUpTo >= index) lock();

  $: inReveal = roundType === "body" && revealDelay > 0;
  $: shuffling = inReveal && started && !selfLocked;
  $: waiting = inReveal && !started && !selfLocked;

  function handleClick() {
    if (shuffling || waiting) {
      onLockRequest(index);
      return;
    }
    onSelect(index);
  }

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
  class="relative flex w-full flex-col items-center gap-3 rounded-[10px] border border-hairline bg-canvas p-4 active:bg-surface-soft {waiting
    ? 'opacity-60'
    : ''}"
  on:click={handleClick}
>
  {#if showRarity && !shuffling && character.rarity !== "basic"}
    <span
      class="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase {rarityChip}"
    >
      {character.rarity}
    </span>
  {/if}

  <div
    class="relative -mx-4 -mt-4 flex aspect-square w-[calc(100%+2rem)] items-center justify-center overflow-hidden rounded-t-[10px] bg-surface-soft text-4xl text-ink"
  >
    {#if shuffling && decoyURL}
      <img src={decoyURL} alt="" class="h-full w-full object-cover" loading="eager" draggable="false" />
    {:else if waiting}
      <span>?</span>
    {:else if character.imageURL && !imageError}
      <img
        src={character.imageURL}
        alt={character.displayName}
        class="h-full w-full object-cover"
        loading="lazy"
        on:error={() => (imageError = true)}
      />
    {:else}
      <span>{shuffling ? "?" : character.displayName.charAt(0)}</span>
    {/if}
    <div
      class="text-art-outline pointer-events-none absolute inset-x-0 bottom-0 pb-2 text-center font-hand text-2xl leading-[1.1] font-normal text-yellow"
    >
      {#if shuffling || waiting}
        ?
      {:else if roundType === "body"}
        {character.fullName}
      {:else}
        {character.displayName}
      {/if}
    </div>
  </div>

  {#if roundType === "body" && !shuffling && !waiting}
    <span class="text-xs tracking-wider text-muted uppercase">
      {character.race}
    </span>
  {/if}

  {#if roundType !== "body" && currentHakiTier}
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
</button>
