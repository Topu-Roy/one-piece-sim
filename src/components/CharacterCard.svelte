<script lang="ts">
  import type { DraftOption, RoundKey } from "../lib/types";
  import { extractAttribute } from "../lib/draftEngine";

  let { option, roundKey, onselect }: { option: DraftOption; roundKey: RoundKey; onselect: () => void } = $props();

  // The single attribute this round drafts from the character.
  const extracted = $derived(extractAttribute(option, roundKey));

  // Tier badges use solid hazard borders, never soft fills (DESIGN.md).
  const tierStyles: Record<string, string> = {
    Normal: "border-hazard-white text-hazard-white",
    Epic: "border-jelly-mint text-jelly-mint",
    Legend: "border-verge-uv text-verge-uv",
  };
</script>

<button
  onclick={onselect}
  class="group flex flex-col gap-3 rounded-[20px] border border-hazard-white bg-canvas-black p-6 text-left transition-colors duration-150 hover:border-focus-cyan"
>
  <div class="flex items-start justify-between gap-2">
    <span class="font-mono text-[11px] tracking-[1.5px] text-secondary-text uppercase">
      {option.race}
    </span>
    <span
      class="rounded-[20px] border px-2 py-1 font-mono text-[10px] font-semibold tracking-[1.5px] uppercase {tierStyles[
        option.tier
      ] ?? 'border-hazard-white text-hazard-white'}"
    >
      {option.tier}
    </span>
  </div>
  <h3
    class="font-ui text-[20px] leading-[1.1] font-bold text-hazard-white transition-colors duration-150 group-hover:text-deep-link"
  >
    {option.name}
  </h3>
  <p class="font-mono text-[12px] tracking-[1.5px] text-jelly-mint uppercase">
    {extracted.description}
  </p>
</button>
