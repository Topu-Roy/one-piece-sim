<script lang="ts">
  import { draft, currentRound, roundOptions, rerollsLeft } from "../../stores/draft-v2";
  import { getRoundLabel, getRoundType } from "../../lib/draft-v2";
  import CharacterCard from "./CharacterCard.svelte";
  import RerollButton from "./RerollButton.svelte";

  $: round = $currentRound;
  $: options = $roundOptions;
  $: roundType = getRoundType(round);
  $: label = getRoundLabel(round);
  $: showReroll = round <= 7;

  function handleSelect(index: number) {
    draft.pick(index);
  }
</script>

<div class="flex min-h-screen flex-col items-center px-4 py-8">
  <div class="mb-8 text-center">
    <span
      class="mb-2 inline-block rounded-full border border-[var(--color-jelly-mint)]/30 px-3 py-1 font-mono text-[10px] tracking-widest text-[var(--color-jelly-mint)] uppercase"
    >
      Round {round} of 8
    </span>
    <h1 class="font-display text-3xl font-bold tracking-tight text-white uppercase md:text-4xl">
      {label}
    </h1>
  </div>

  {#if showReroll}
    <div class="mb-6">
      <RerollButton />
    </div>
  {/if}

  <div class="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
    {#each options as character, i (character.id)}
      <CharacterCard {character} {roundType} index={i} onSelect={handleSelect} />
    {/each}
  </div>

  {#if $draft.picks.length > 0}
    <div class="mt-8 w-full max-w-4xl">
      <h2 class="mb-3 font-mono text-[10px] tracking-widest text-[var(--color-dim-gray)] uppercase">Your Picks</h2>
      <div class="flex flex-wrap gap-2">
        {#each $draft.picks as pick (pick.round)}
          <span
            class="rounded-full border border-white/10 bg-[var(--color-canvas-black)] px-3 py-1 font-mono text-[10px] tracking-wider text-[var(--color-secondary-text)] uppercase"
          >
            R{pick.round}: {pick.characterName}
          </span>
        {/each}
      </div>
    </div>
  {/if}
</div>
