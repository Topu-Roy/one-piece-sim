<script lang="ts">
  import { REROLLS_TOTAL, ROUNDS, TOTAL_ROUNDS } from "../data/draftConfig";
  import { extractAttribute, generateRoundOptions } from "../lib/draftEngine";
  import type { DraftPick, DraftState } from "../lib/types";
  import StartScreen from "./StartScreen.svelte";
  import RoundHeader from "./RoundHeader.svelte";
  import CharacterCard from "./CharacterCard.svelte";
  import SummaryScreen from "./SummaryScreen.svelte";

  // Single source of truth for the live draft. The `phase` field drives which
  // screen renders; `options` holds the current round's four donors.
  let state = $state<DraftState>({
    currentRound: 0,
    rerollsLeft: REROLLS_TOTAL,
    options: [],
    picks: [],
    phase: "start",
  });

  function startDraft() {
    state.phase = "drafting";
    state.currentRound = 0;
    state.rerollsLeft = REROLLS_TOTAL;
    state.picks = [];
    state.options = generateRoundOptions(0);
  }

  function selectOption(optionIndex: number) {
    const option = state.options[optionIndex];
    if (!option) return;
    const round = ROUNDS[state.currentRound];
    const extracted = extractAttribute(option, round.key);

    const pick: DraftPick = {
      roundIndex: state.currentRound,
      characterId: option.id,
      characterName: option.name,
      tier: option.tier,
      value: extracted.value,
      description: extracted.description,
    };

    state.picks = [...state.picks, pick];

    if (state.currentRound + 1 >= TOTAL_ROUNDS) {
      state.phase = "summary";
    } else {
      state.currentRound += 1;
      state.options = generateRoundOptions(state.currentRound);
    }
  }

  function reroll() {
    if (state.rerollsLeft <= 0 || state.phase !== "drafting") return;
    state.rerollsLeft -= 1;
    state.options = generateRoundOptions(state.currentRound);
  }

  function resetDraft() {
    state.phase = "start";
    state.options = [];
    state.picks = [];
  }
</script>

{#if state.phase === "start"}
  <StartScreen onstart={startDraft} />
{:else if state.phase === "drafting"}
  <RoundHeader
    round={ROUNDS[state.currentRound]}
    roundNumber={state.currentRound + 1}
    total={TOTAL_ROUNDS}
    rerollsLeft={state.rerollsLeft}
    onreroll={reroll}
  />
  <div class="mx-auto grid max-w-[1300px] grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2">
    {#each state.options as option, i (option.id + "-" + i)}
      <CharacterCard {option} roundKey={ROUNDS[state.currentRound].key} onselect={() => selectOption(i)} />
    {/each}
  </div>
{:else}
  <SummaryScreen picks={state.picks} onrestart={resetDraft} />
{/if}
