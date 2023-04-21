/** @noSelfInFile */

declare type WowUnitIdArena =
  | "arena1"
  | "arena2"
  | "arena3"
  | "arena4"
  | "arena5";
declare type WowUnitIdRaidPlayer =
  | "raid1"
  | "raid2"
  | "raid3"
  | "raid4"
  | "raid5"
  | "raid6"
  | "raid7"
  | "raid8"
  | "raid9"
  | "raid10"
  | "raid11"
  | "raid12"
  | "raid13"
  | "raid14"
  | "raid15"
  | "raid16"
  | "raid17"
  | "raid18"
  | "raid19"
  | "raid20"
  | "raid21"
  | "raid22"
  | "raid23"
  | "raid24"
  | "raid25"
  | "raid26"
  | "raid27"
  | "raid28"
  | "raid29"
  | "raid30"
  | "raid31"
  | "raid32"
  | "raid33"
  | "raid34"
  | "raid35"
  | "raid36"
  | "raid37"
  | "raid38"
  | "raid39"
  | "raid40";
declare type WowUnitIdRaidPlayerPet =
  | "raidpet1"
  | "raidpet2"
  | "raidpet3"
  | "raidpet4"
  | "raidpet5"
  | "raidpet6"
  | "raidpet7"
  | "raidpet8"
  | "raidpet9"
  | "raidpet10"
  | "raidpet11"
  | "raidpet12"
  | "raidpet13"
  | "raidpet14"
  | "raidpet15"
  | "raidpet16"
  | "raidpet17"
  | "raidpet18"
  | "raidpet19"
  | "raidpet20"
  | "raidpet21"
  | "raidpet22"
  | "raidpet23"
  | "raidpet24"
  | "raidpet25"
  | "raidpet26"
  | "raidpet27"
  | "raidpet28"
  | "raidpet29"
  | "raidpet30"
  | "raidpet31"
  | "raidpet32"
  | "raidpet33"
  | "raidpet34"
  | "raidpet35"
  | "raidpet36"
  | "raidpet37"
  | "raidpet38"
  | "raidpet39"
  | "raidpet40";
declare type WowUnitIdParty = "party1" | "party2" | "party3" | "party4";
declare type WowUnitIdPartyPet =
  | "partypet1"
  | "partypet2"
  | "partypet3"
  | "partypet4";
declare type WowUnitIdOther =
  | "player"
  | "pet"
  | "focus"
  | "mouseover"
  | "vehicle"
  | "target"
  | "none"
  | "npc"
  | "targettarget";
declare type WowUnitId =
  | WowUnitIdOther
  | WowUnitIdArena
  | WowUnitIdRaidPlayer
  | WowUnitIdRaidPlayerPet
  | WowUnitIdParty
  | WowUnitIdPartyPet;

declare type WowUnitRoleType = "TANK" | "DAMAGER" | "HEALER";

declare enum WowGuid {}

/**
 * Returns the GUID of the specified unit
 * @param unitId unit to look up the GUID of
 * @see https://wow.gamepedia.com/API_UnitGUID
 * @since 2.4.0
 */
declare function UnitGUID(unitId: WowUnitId): WowGuid;

/**
 * Returns basic information about another player from their GUID
 * @param unitGUID The GUID of the player you're querying about
 * @see https://wow.gamepedia.com/API_GetPlayerInfoByGUID
 * @since 3.2.0
 * @tupleReturn
 */
declare function GetPlayerInfoByGUID(
  unitGUID: WowGuid
): LuaMultiReturn<[string, number, string, number, number, string, string]>;

/**
 * Returns the name and realm of the specified unit
 * @param unitId The UnitId to query (e.g. "player", "party2", "pet", "target" etc.)
 * @see https://wow.gamepedia.com/API_GetUnitName
 */
declare function GetUnitName(
  unitId: WowUnitId,
  showServerName: boolean
): string;

/**
 * Determines if the unit exists
 * @param unitId The unit to query (e.g. "player", "party2", "pet", "target" etc.)
 * @see https://wow.gamepedia.com/API_UnitExists
 */
declare function UnitExists(unitId: WowUnitId): 1 | null;

/**
 * Checks if a specified unit is a player
 * @param unitId UnitId of the unit to check.
 * @see https://wow.gamepedia.com/API_UnitIsPlayer
 */
declare function UnitIsPlayer(unitId: WowUnitId): boolean;

/**
 * Returns the unit's level
 * @param unitId The unitId to get information from. (e.g. "player", "target")
 * @return The unit level. Returns -1 for bosses, or players more than 10 levels above the player
 * @see https://wow.gamepedia.com/API_UnitEffectiveLevel
 */
declare function UnitLevel(unitId: WowUnitId): number;

/**
 * Get the name of the faction (Horde/Alliance) a unit belongs to
 * @param unitId unit you want to get the faction for
 * @see https://wow.gamepedia.com/API_UnitFactionGroup
 * @tupleReturn
 */
declare function UnitFactionGroup(unitId: WowUnitId): LuaMultiReturn<[string, string]>;

/**
 * Returns the class of the specified unit
 * @param unitId unit to query, e.g. "player"
 * @see https://wow.gamepedia.com/API_UnitClass
 * @tupleReturn
 */
declare function UnitClass(unitId: WowUnitId): LuaMultiReturn<[string, string, number]>;

/**
 * Returns the current health of the specified unit
 * @param unitId identifies the unit to query health for
 * @see https://wow.gamepedia.com/API_UnitHealth
 */
declare function UnitHealth(unitId: WowUnitId): number;

/**
 * Returns the maximum health of the specified unit
 * @param unitId the unit whose max health to query
 * @see https://wow.gamepedia.com/API_UnitHealthMax
 */
declare function UnitHealthMax(unitId: WowUnitId): number;
