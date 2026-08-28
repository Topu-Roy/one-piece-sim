// Shared domain types for the One Piece Character Draft Builder.
// Stats are hand-authored per character (no derived formulas), matching CORE_IDEA.md.

/** A character's species — biases certain physical ceilings but is mostly flavor. */
export type Race =
  | "Human"
  | "Fish-Man"
  | "Giant"
  | "Mink"
  | "Skypiean"
  | "Cyborg"
  | "Lunarian"
  | "Longarm"
  | "Snakeneck"
  | "Three-Eye";

/** Haki tiers for Armament and Observation Haki. */
export type HakiTier = "None" | "Basic" | "Advanced" | "Supreme";

/** Conqueror's Haki: presence plus a control sub-level when present. */
export type ConquerorState = { has: false } | { has: true; control: "Uncontrolled" | "Directional" | "Full" };

/** Devil Fruit category, or None if the character has no fruit. */
export type DevilFruitType = "Paramecia" | "Zoan" | "Logia" | "None";

/**
 * A hand-authored Devil Fruit profile. Offense/Defense/Versatility are
 * individually assigned per character, not derived from the fruit type.
 */
export interface DevilFruit {
  type: DevilFruitType;
  awakened: boolean;
  offense: number;
  defense: number;
  versatility: number;
}

/** Weapon proficiency for a character. */
export interface Weapon {
  type: "Swordsmanship" | "Marksmanship" | "Staff" | "Hand-to-Hand" | "None";
  proficiency: number;
}

/** A full character profile. Not every attribute is meaningful for every round. */
export interface Character {
  id: string;
  name: string;
  race: Race;
  armament: HakiTier;
  observation: HakiTier;
  conqueror: ConquerorState;
  devilFruit: DevilFruit;
  weapon: Weapon;
  strength: number;
  speed: number;
  durability: number;
  intelligence: number;
}

/** Rarity label applied to a character when it appears in a round. */
export type Tier = "Normal" | "Epic" | "Legend";

/**
 * A character as presented in a draft round, carrying the tier it appeared at.
 * Tier is a rarity label only (values stay hand-tuned per CORE_IDEA.md).
 */
export interface DraftOption extends Character {
  tier: Tier;
}

/** The 10 draftable attributes, in play order. */
export type RoundKey =
  | "race"
  | "armament"
  | "observation"
  | "conqueror"
  | "devilFruit"
  | "weapon"
  | "strength"
  | "speed"
  | "durability"
  | "intelligence";

/** Static definition for one draft round. */
export interface RoundDef {
  key: RoundKey;
  /** UPPERCASE mono kicker shown above the round. */
  label: string;
  /** Human-readable prompt for the round. */
  prompt: string;
}

/** A single committed pick during a draft. */
export interface DraftPick {
  roundIndex: number;
  characterId: string;
  characterName: string;
  tier: Tier;
  /** The drafted attribute value, typed loosely for display purposes. */
  value: unknown;
  /** Pre-rendered readable description of the drafted value. */
  description: string;
}

/** Mutable state for an in-progress draft. */
export interface DraftState {
  currentRound: number;
  rerollsLeft: number;
  options: DraftOption[];
  picks: DraftPick[];
  phase: "start" | "drafting" | "summary";
}
