import { writable, derived } from "svelte/store";
import type { DraftState } from "../lib/types";
import {
  initDraft as initDraftLogic,
  rerollOptions as rerollOptionsLogic,
  pickOption as pickOptionLogic,
  calculateFinalStats,
} from "../lib/draft";

function createDraftStore() {
  const { subscribe, set, update } = writable<DraftState>(initDraftLogic());

  return {
    subscribe,

    /** Reset and start a new draft */
    reset() {
      set(initDraftLogic());
    },

    /** Reroll the current round's options (costs 1 reroll) */
    reroll() {
      update((state) => rerollOptionsLogic(state));
    },

    /** Pick an option by index and advance to next round */
    pick(index: number) {
      update((state) => pickOptionLogic(state, index));
    },

    /** Get the underlying state snapshot (for non-reactive reads) */
    snapshot(): DraftState {
      let snap: DraftState = {
        currentRound: 1,
        rerollsLeft: 2,
        picks: [],
        baseStats: null,
        roundOptions: [],
        isComplete: false,
      };
      subscribe((s) => (snap = s))();
      return snap;
    },
  };
}

export const draft = createDraftStore();

/** Derived store: current round number */
export const currentRound = derived(draft, ($d) => $d.currentRound);

/** Derived store: is draft complete */
export const isComplete = derived(draft, ($d) => $d.isComplete);

/** Derived store: rerolls left */
export const rerollsLeft = derived(draft, ($d) => $d.rerollsLeft);

/** Derived store: current round options */
export const roundOptions = derived(draft, ($d) => $d.roundOptions);

/** Derived store: all picks so far */
export const picks = derived(draft, ($d) => $d.picks);

/** Derived store: final stats (only when complete) */
export const finalStats = derived(draft, ($d) => {
  if (!$d.isComplete) return null;
  return calculateFinalStats($d.picks);
});
