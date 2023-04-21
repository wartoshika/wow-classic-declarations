/** @noSelfInFile */

/**
 * Get cooldown information for an inventory item.
 *
 * @see https://wow.gamepedia.com/API_GetInventoryItemCooldown
 * @returns start, duration, isEnabled
 * @tupleReturn
 */
declare function GetInventoryItemCooldown(unit: WowUnitId, slotId: number): LuaMultiReturn<[number, number, WowFlag]>;

/**
 * Return the texture for an inventory item.
 *
 * @see https://wow.gamepedia.com/API_GetInventoryItemTexture
 * @returns The texture path for the item in the specified slot, or nil if the slot is empty.
 */
declare function GetInventoryItemTexture(unit: WowUnitId, slotId: number): WowTexturePath;

/**
 * Return information about a specific inventory slot
 *
 * @see https://wow.gamepedia.com/API_GetInventorySlotInfo
 * @returns slotId, textureName
 * @tupleReturn
 */
declare function GetInventorySlotInfo(slotName: string): LuaMultiReturn<[number, WowTexturePath]>;
