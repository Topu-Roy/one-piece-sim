<script lang="ts">
  import { draft, currentRound, roundOptions, rerollsLeft } from "../stores/draft";
  import { getRoundLabel, getRoundType } from "../lib/draft";
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

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-6 py-24">
  <div class="mb-12 text-center">
    <p class="mb-4 text-sm font-medium tracking-[0.16px] text-muted uppercase">
      Round {round} of 8
    </p>
    <h1 class="font-display text-4xl leading-[1.2] font-normal text-ink md:text-[40px]">
      {label}
    </h1>
  </div>

  {#if showReroll}
    <div class="mb-8">
      <RerollButton />
    </div>
  {/if}

  <div class="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
    {#each options as character, i (character.id)}
      <CharacterCard {character} {roundType} index={i} onSelect={handleSelect} />
    {/each}
  </div>

  {#if $draft.picks.length > 0}
    <div class="mt-12 w-full">
      <h2 class="mb-3 text-sm font-medium tracking-[0.16px] text-muted uppercase">Your Picks</h2>
      <div class="flex flex-wrap gap-2">
        {#each $draft.picks as pick (pick.round)}
          <span
            class="rounded-full border border-hairline bg-canvas px-3 py-1 text-xs font-medium tracking-wider text-body uppercase"
          >
            R{pick.round}: {pick.characterName}
          </span>
        {/each}
      </div>
    </div>
  {/if}
</div>
