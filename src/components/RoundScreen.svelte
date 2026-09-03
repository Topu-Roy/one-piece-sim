<script lang="ts">
  import { draft, currentRound, roundOptions, rerollsLeft } from "../stores/draft";
  import { getRoundLabel, getRoundType } from "../lib/draft";
  import CharacterCard from "./CharacterCard.svelte";
  import RerollButton from "./RerollButton.svelte";

  // Round 1 reveal: cards shuffle one at a time (~600ms each), left to right.
  // Each card owns its timers (see CharacterCard); {#key} remounts them per options.
  const LOCK_BASE_MS = 600;

  $: round = $currentRound;
  $: options = $roundOptions;
  $: roundType = getRoundType(round);
  $: label = getRoundLabel(round);
  $: showReroll = round <= 7;
  $: isBodyRound = roundType === "body";

  // Signature changes on new Round 1 options (initial + rerolls) → fresh cards.
  $: revealKey = roundType + ":" + options.map((o) => o.id).join(",");
  $: reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sequential reveal: card i shuffles only after card i-1 locks.
  // -1 = none forced. Reset whenever fresh options arrive.
  let lockUpTo = -1;
  let activeIndex = 0;
  $: {
    void revealKey;
    lockUpTo = -1;
    activeIndex = reducedMotion ? 99 : 0;
  }

  function handleSelect(index: number) {
    draft.pick(index);
  }

  function handleLockRequest(index: number) {
    lockUpTo = Math.max(lockUpTo, index);
    activeIndex = Math.max(activeIndex, index + 1);
  }

  function handleLocked(index: number) {
    activeIndex = Math.max(activeIndex, index + 1);
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

  {#key revealKey}
    <div class="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
      {#each options as character, i (character.id)}
        <CharacterCard
          {character}
          {roundType}
          index={i}
          onSelect={handleSelect}
          onLockRequest={handleLockRequest}
          onLocked={handleLocked}
          revealDelay={isBodyRound && !reducedMotion ? LOCK_BASE_MS : 0}
          canStart={i <= activeIndex}
          {lockUpTo}
        />
      {/each}
    </div>
  {/key}

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
