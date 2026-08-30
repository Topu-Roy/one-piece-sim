export type Race =
  | "human"
  | "fishman"
  | "giant"
  | "mink"
  | "skypiean"
  | "lunarian"
  | "longarm"
  | "longleg"
  | "merfolk"
  | "dwarf"
  | "oni"
  | "shandia";

export type HakiTier = "none" | "basic" | "advanced";
export type DevilFruitType = "paramecia" | "zoan" | "ancient_zoan" | "mythical_zoan" | "logia" | "none";
export type WeaponType = "sword" | "spear" | "club" | "rifle" | "slingshot" | "staff" | "mechanical" | "none";
export type Stats = "attack" | "durability" | "speed" | "awareness" | "stamina";
export type Rarity = "basic" | "epic" | "legend";

export type Character = {
  id: string;
  displayName: string; // "Monkey D. Luffy" - but Shorten extremely long names
  fullName: string; // "Monkey D. Luffy"
  imageURL: string;
  race: Race;

  haki: {
    // hand-authored per character
    armament: {
      tier: HakiTier;
      multiplier: number; // ( ex: 2, 1.5 ) If picked: base stat gets this multiplier
    };
    observation: {
      tier: HakiTier;
      multiplier: number; // same as armament
    };
    conqueror: {
      tier: HakiTier;
      multiplier: number; // same as armament
    };
  };

  devilFruit: {
    // hand-authored per DF
    japaneseName: string;
    englishName: string;
    type: DevilFruitType;
    state: { awakened: false } | { awakened: true; awakenedMultiplier: number; target: Stats[] };
    attackMultiplier: number;
    durabilityMultiplier: number;
    speedMultiplier: number;
    awarenessMultiplier: number;
    staminaMultiplier: number;
  };

  weapon: {
    // hand-authored per Weapon
    type: WeaponType;
    name: string;
    attackMultiplier: number;
    durabilityMultiplier: number;
    speedMultiplier: number;
    awarenessMultiplier: number;
    staminaMultiplier: number;
  };

  rarity: Rarity;
  intelligence: number; // Raw stats, but will be used in the calculations
  battleIQ: number; // Raw stats, but will be used in the calculations
};

// --- Draft types ---

export type StatBlock = {
  strength: number;
  durability: number;
  speed: number;
  awareness: number;
  stamina: number;
};

export type RoundType =
  | "race"
  | "armament"
  | "observation"
  | "conqueror"
  | "devil_fruit"
  | "weapon"
  | "intelligence"
  | "battle_iq"
  | "appearance";

export type DraftPick = {
  round: number;
  roundType: RoundType;
  characterId: string;
  characterName: string;
  rarity: Rarity;
};

export type DraftPickWithRace = DraftPick & {
  race: Race;
};

export type DraftPickWithHaki = DraftPick & {
  hakiTier: HakiTier;
  hakiMultiplier: number;
};

export type DraftPickWithDF = DraftPick & {
  dfName: string;
  dfType: DevilFruitType;
};

export type DraftPickWithWeapon = DraftPick & {
  weaponName: string;
  weaponType: WeaponType;
};

export type DraftPickWithStat = DraftPick & {
  value: number;
};

export type DraftState = {
  currentRound: number;
  rerollsLeft: number;
  picks: DraftPick[];
  baseStats: StatBlock | null;
  roundOptions: Character[];
  isComplete: boolean;
};
