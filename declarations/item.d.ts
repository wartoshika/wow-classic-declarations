/** @noSelfInFile */

/// <reference path="auction.d.ts" />

declare type ITEM_QUALITY_GENERIC = -1;
declare type ITEM_QUALITY_POOR = 0;
declare type ITEM_QUALITY_COMMON = 1;
declare type ITEM_QUALITY_UNCOMMON = 2;
declare type ITEM_QUALITY_RARE = 3;
declare type ITEM_QUALITY_EPIC = 4;
declare type ITEM_QUALITY_LEGENDARY = 5;
declare type ITEM_QUALITY_ARTIFACT = 6;
declare type ITEM_QUALITY_HEIRLOOM = 7;

/**
 * all currently known item qualities
 */
declare type ITEM_QUALITY =
  | ITEM_QUALITY_GENERIC
  | ITEM_QUALITY_POOR
  | ITEM_QUALITY_COMMON
  | ITEM_QUALITY_UNCOMMON
  | ITEM_QUALITY_RARE
  | ITEM_QUALITY_EPIC
  | ITEM_QUALITY_LEGENDARY
  | ITEM_QUALITY_ARTIFACT
  | ITEM_QUALITY_HEIRLOOM;

declare type BIND_TYPE_NONE = 0;
declare type BIND_TYPE_PICKUP = 1;
declare type BIND_TYPE_EQUIP = 2;
declare type BIND_TYPE_USE = 3;
declare type BIND_TYPE_QUEST = 4;

/**
 * all currently known bind types
 */
declare type BIND_TYPE =
  | BIND_TYPE_NONE
  | BIND_TYPE_PICKUP
  | BIND_TYPE_EQUIP
  | BIND_TYPE_USE
  | BIND_TYPE_QUEST;

declare type WowEquippableItemType =
  | "Miscellaneous"
  | "Cloth"
  | "Leather"
  | "Mail"
  | "Plate"
  | "Shields"
  | "Librams"
  | "Idols"
  | "Totems"
  | "Sigils";

/**
 * a clickable ingame item link
 */
declare type WowItemLink = WowHyperlink;

/**
 * Equips an item, optionally into a specified slot
 * @param itemIdentifier itemId or "itemName" or "itemLink"
 * - **itemId**: The numeric ID of the item. ie. 12345
 * - **itemName**: The name of the item, ie "Worn Dagger". Partial names are valid inputs as well, ie "Worn". If several items with same piece
 * of name exists, the first one found will be equipped
 * - **itemLink**: The itemLink, when Shift-Clicking items
 * @param slot The inventory slot to put the item in, obtained via GetInventorySlotInfo().
 * @description When in combat this function now "picks up" the item instead of equipping it, similar to PickupInventoryItem. Out of combat, the
 * function behaves as expected. This change was made to address the issue of rogues using "poison swapping" addons to increase their DPS
 * @see https://wow.gamepedia.com/API_EquipItemByName
 */
declare function EquipItemByName(
  itemIdentifier: string | number | WowItemLink,
  slot?: WOW_INVENTORY_SLOT_ID
): void;

/**
 * Retrieves the itemLink of one item in the current retrieved list of items from the Auction House
 * @param type the type to query
 * @param index The index of the item in the list to retrieve info from (normally 1-50, inclusive)
 * @returns The itemLink for the specified item or nil, if type and/or index is invalid
 * @see https://wow.gamepedia.com/API_GetAuctionItemLink
 */
declare function GetAuctionItemLink(
  type: AUCTION_TYPE,
  index: number
): WowItemLink | null;

/**
 * Returns a link of the object located in the specified slot of a specified bag.
 * @param bagId Bag index (bagID). Valid indices are integers -2 through 11. 0 is the backpack
 * @param slotIndex Slot index within the specified bag, ascending from 1. Slot 1 is typically the leftmost topmost slot
 * @returns a chat link for the object in the specified bag slot; nil if there is no such object. This is typically, but not always an ItemLink
 * @see https://wow.gamepedia.com/API_GetContainerItemLink
 */
declare function GetContainerItemLink(
  bagId: WOW_CONTAINER_ID,
  slotIndex: number
): WowItemLink | null;

/**
 * Returns detailed item level information about a given item
 * @param itemIdentifier One of the following four ways to specify which item to query
 * - **itemId**: Numeric ID of the item. e.g. 30234 for  [Nordrassil Wrath-Kilt],
 * - **itemName**: Name of an item owned by the player at some point during this play session, e.g. "Nordrassil Wrath-Kilt"
 * - **itemString**: A fragment of the itemString for the item, e.g. "item:30234:0:0:0:0:0:0:0" or "item:30234"
 * - **itemLink**: The full itemLink
 * @returns **
 * - **effectiveILvl**: same as in tooltip
 * - **isPreview**: True means it would have a + in the tooltip, a minimal level for item used in loot preview in encounter journal
 * - **baseLevel**: base item level
 * @since 7.1.0
 * @see https://wow.gamepedia.com/API_GetDetailedItemLevelInfo
 * @tupleReturn
 */
declare function GetDetailedItemLevelInfo(
  itemIdentifier: string | number | WowItemLink
): LuaMultiReturn<[number, boolean, number]>;

/**
 * Returns cooldown information for the item
 * @param itemId The numeric ID of the item. ie. 12345
 * @returns **startTime, duration, enable**
 * - **startTime**: The time when the cooldown started (as returned by GetTime()) or zero if no cooldown
 * - **duration**: The number of seconds the cooldown will last, or zero if no cooldown
 * - **enable**: 1 if the item is ready or on cooldown, 0 if the item is used, but the cooldown didn't start yet (e.g. potion in combat)
 * @see https://wow.gamepedia.com/API_GetItemCooldown
 * @tupleReturn
 */
declare function GetItemCooldown(itemId: number): LuaMultiReturn<[number, number, WowFlag]>;

/**
 * Returns count information for the item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @param includeBank count includes bank items
 * @param includeCharges count is charges if any, otherwise number of items
 * @returns The number of items in your possesion, or charges if includeCharges is true and the item has charges
 * @see https://wow.gamepedia.com/API_GetItemCount
 */
declare function GetItemCount(
  itemIdentifier: string | number | WowItemLink,
  includeBank?: boolean,
  includeCharges?: boolean
): number;

/**
 * Gets the bitfield of what types of bags an item can go into or contain
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns What type of bags an item can go into or if the item is a container what it can contain
 * @see https://wow.gamepedia.com/API_GetItemFamily
 */
declare function GetItemFamily(
  itemIdentifier: string | number | WowItemLink
): BAG_TYPE;

/**
 * Returns an item's icon texture
 * @param itemId The numeric ID of the item to query e.g. 23405 for  [Farstrider's Tunic].
 * @returns Icon texture used by the item
 * @see https://wow.gamepedia.com/API_GetItemIcon
 */
declare function GetItemIcon(itemId: number): WowTexturePath;

/**
 * Return information about a specific item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns
 * - **itemName**: The localized name of the item
 * - **itemLink**: The localized item link of the item
 * - **itemRarity**: The quality of the item. The value is 0 to 7, which represents Poor to Heirloom. This appears to include gains from upgrades/bonuses
 * - **itemLevel**: The base item level of this item, not including item levels gained from upgrades. Use GetDetailedItemLevelInfo to get the
 * actual current level of the item
 * - **itemMinLevel**: The minimum level required to use the item, 0 meaning no level requirement
 * - **itemType**: The localized type of the item: Armor, Weapon, Quest, Key, etc
 * - **itemSubType**: The localized sub-type of the item: Enchanting, Cloth, Sword, etc. See itemType
 * - **itemStackCount**: How many of the item per stack: 20 for Runecloth, 1 for weapon, 100 for Alterac Ram Hide, etc
 * - **itemEquipLocation**: The type of inventory equipment location in which the item may be equipped, or "" if it can't be equippable. The
 * string returned is also the name of a global string variable e.g. if "INVTYPE_WEAPONMAINHAND" is returned, _G["INVTYPE_WEAPONMAINHAND"] will
 * be the localized, displayable name of the location
 * - **itemIcon**: The icon texture for the item
 * - **itemSellPrice**: The price, in copper, a vendor is willing to pay for this item, 0 for items that cannot be sold
 * - **itemClassId**: This is the numerical value that determines the string to display for 'itemType'
 * - **itemSubClassId**: This is the numerical value that determines the string to display for 'itemSubType'
 * - **bindType**: Item binding type: 0 - none; 1 - on pickup; 2 - on equip; 3 - on use; 4 - quest
 * - **expactId**: unknown
 * - **itemSetId**: unknown
 * - **isCraftingReagent**: unknown
 * @see https://wow.gamepedia.com/API_GetItemInfo
 * @tupleReturn
 */
// tslint:disable-next-line max-line-length
declare function GetItemInfo(
  itemIdentifier: string | number | WowItemLink
): LuaMultiReturn<[
  string,
  WowItemLink,
  ITEM_QUALITY,
  number,
  number,
  string,
  string,
  number,
  WOW_INVENTORY_SLOT_ID,
  WowTexturePath,
  number,
  number,
  number,
  BIND_TYPE,
  number,
  number,
  boolean
]>;

/**
 * Returns instantly-available information about a specific item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns
 * - **itemId**: ID of the item
 * - **itemType**: The localized type of the item: Armor, Weapon, Quest, Key, etc
 * - **itemSubType**: The localized sub-type of the item: Enchanting, Cloth, Sword, etc. See itemType
 * - **itemEquipLocation**: The type of inventory equipment location in which the item may be equipped, or "" if it can't be equippable. The
 * string returned is also the name of a global string variable e.g. if "INVTYPE_WEAPONMAINHAND" is returned, _G["INVTYPE_WEAPONMAINHAND"] will be
 * the localized, displayable name of the location
 * - **itemIcon**: The icon texture for the item
 * - **itemClassId**: This is the numerical value that determines the string to display for 'itemType'
 * - **itemSubClassId**: This is the numerical value that determines the string to display for 'itemSubType'
 * @description Though it is not documented, this function apparently returns info available directly in client files. Because of that it returns
 * less data, but have several advantages over GetItemInfo: it always return data, when GetItemInfo can return nil for valid, but not loaded items
 * and it never initiates requests to server, that could be subject to throttling or forced disconnection.
 * @see https://wow.gamepedia.com/API_GetItemInfoInstant
 * @since 7.0.3
 * @tupleReturn
 */
// tslint:disable-next-line max-line-length
declare function GetItemInfoInstant(
  itemIdentifier: string | number | WowItemLink
): LuaMultiReturn<[
  number,
  string,
  string,
  WOW_INVENTORY_SLOT_ID,
  WowTexturePath,
  number,
  number
]>;

/**
 * Returns RGB color codes for an item quality
 * @param quality The numeric ID of the quality from 0 (Poor) to 7 (Heirloom)
 * @returns
 *  - **red**: The Red component of the color (0 to 1, inclusive)
 *  - **green**: The Green component of the color (0 to 1, inclusive)
 *  - **blue**: The Blue component of the color (0 to 1, inclusive)
 *  - **hex**: The UI escape sequence for this color, without the leading "|c".
 * @see https://wow.gamepedia.com/API_GetItemQualityColor
 * @tupleReturn
 */
declare function GetItemQualityColor(
  quality: ITEM_QUALITY
): LuaMultiReturn<[number, number, number, string]>;

/**
 * Return spell information about a specific item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns
 * - **spellName**: The name of the spell
 * - **spellRank**: The secondary text of the spell, displayed in the top right-hand corner of the spell's tooltip
 * - **spellId**: The spell's unique identifier
 * @see https://wow.gamepedia.com/API_GetItemSpell
 * @tupleReturn
 */
declare function GetItemSpell(
  itemIdentifier: string | number | WowItemLink
): LuaMultiReturn<[string, number]>;

/**
 * Returns a table of stats for an item
 * @param itemLink An item link for which to get stats
 * @param statTable An optional, empty table that will be filled with stats and returned. If this parameter is omitted, a new table is returned
 * @see https://wow.gamepedia.com/API_GetItemStats
 */
declare function GetItemStats(
  itemLink: WowItemLink,
  statTable?: {}
): { [index: string]: number };

/**
 * Returns a link to the indexed item in the merchant's inventory
 * @param merchantIndex The index of the item in the merchant's inventory
 * @returns returns a string that will show as a clickable link to the item
 * @see https://wow.gamepedia.com/API_GetMerchantItemLink
 */
declare function GetMerchantItemLink(merchantIndex: number): WowItemLink;

/**
 * Returns link to the quest item
 * @param type "required", "reward" or "choice"
 * @param index Quest reward item index
 * @returns The link to the quest item specified
 * @see https://wow.gamepedia.com/API_GetQuestItemLink
 */
declare function GetQuestItemLink(
  type: WowQuestType,
  index: number
): WowItemLink;

/**
 * Returns link to the quest item
 * @param type  "required", "reward" or "choice"
 * @param index Quest reward item index (starts with 1)
 * @returns The link to the quest item specified or nil, if the type and/or index is invalid, there is no active quest at the moment or if the
 * server did not transmit the item information until the timeout (which can happen, if the item is not in the local item cache yet)
 * @see https://wow.gamepedia.com/API_GetQuestLogItemLink
 */
declare function GetQuestLogItemLink(
  type: WowQuestType,
  index: number
): WowItemLink;

/**
 * Returns a single value: chat-ready item link
 * @param tradeSlotIndex index value of the "player's" (your character) trade slots (starts at 1 and proceeds to 6. 7 may be used for the
 * will-not-be-traded-slot.)
 * @returns a string that can be used to link items in the chat log
 * @see https://wow.gamepedia.com/API_GetTradePlayerItemLink
 */
declare function GetTradePlayerItemLink(tradeSlotIndex: number): WowItemLink;

/**
 * Gets the link string for a trade skill item
 * @param skillId The Id specifying which trade skill's link to get. Trade Skill window must be open for this to work. Indexes start at 1 which
 * is the general category of the tradeskill, if you have selected a sub-group of trade skills then 1 will be the name of that sub-group
 * @see https://wow.gamepedia.com/API_GetTradeSkillItemLink
 */
declare function GetTradeSkillItemLink(skillId: number): WowItemLink;

/**
 * Gets the link string for a trade skill reagent
 * @param skillId The Id specifying which trade skill's reagent to link
 * @param reagentId The Id specifying which of the skill's reagents to link
 * @see https://wow.gamepedia.com/API_GetTradeSkillReagentItemLink
 */
declare function GetTradeSkillReagentItemLink(
  skillId: number,
  reagentId: number
): WowItemLink;

/**
 * Simply view, except this function is for your trading partner, ie, the other side of the trade window
 * @param tradeIndex index value of the "player's" (your character) trade slots (starts at 1 and proceeds to 6. 7 may be used for the will-not-be-traded-slot.)
 * @see https://wow.gamepedia.com/API_GetTradeTargetItemLink
 */
declare function GetTradeTargetItemLink(tradeIndex: number): WowItemLink;

/**
 * Returns usable, noMana
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @tupleReturn
 */
declare function IsUsableItem(
  itemIdentifier: string | number | WowItemLink
): LuaMultiReturn<[boolean, boolean]>;

/**
 * Returns whether an item is consumed when used
 * @param itemIdentifier An item ID (number), item link or item name (string) to query
 * @returns 1 if the item is consumed when used, nil otherwise
 * @see https://wow.gamepedia.com/API_IsConsumableItem
 */
declare function IsConsumableItem(
  itemIdentifier: string | number | WowItemLink
): WowFlag;

/**
 * unknown
 * @param itemIdentifier An item ID (number), item link or item name (string) to query
 */
declare function IsCurrentItem(
  itemIdentifier: string | number | WowItemLink
): WowFlag;

/**
 * Determines if an item is equipped
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @see https://wow.gamepedia.com/API_IsEquippedItem
 */
declare function IsEquippedItem(
  itemIdentifier: string | number | WowItemLink
): boolean;

/**
 * Returns 1 if item is an equip-able one at all, your character notwithstanding, or nil if not
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @see https://wow.gamepedia.com/API_IsEquippableItem
 */
declare function IsEquippableItem(
  itemIdentifier: string | number | WowItemLink
): boolean;

/**
 * Determines if an item of a given type is equipped
 * @param itemType any valid inventory type, item class, or item subclass
 * @see https://wow.gamepedia.com/API_IsEquippedItemType
 */
declare function IsEquippedItemType(itemType: WowEquippableItemType): boolean;

/**
 * Returns if you are in range of the specified unit to use the specified item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @param unit which unit the range should be checked to
 * @returns
 * - If the item is not in range, false; if the item is in range, true; if the query is invalid, nil
 * - If the item is not in range, 0; if the item is in range, 1; if the query is invalid, nil
 * @see https://wow.gamepedia.com/API_IsItemInRange
 */
declare function IsItemInRange(
  itemIdentifier: string | number | WowItemLink,
  unit?: WowUnitId
): LuaMultiReturn<[boolean, WowFlag]>;

/**
 * unknown
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 */
declare function ItemHasRange(
  itemIdentifier: string | number | WowItemLink
): boolean;

/**
 * Called to handle clicks on Blizzard hyperlinks in chat
 * @param link Link to Use, (eg 'item:3577:0:0:0:0:0:0:276308480' is a [Gold Bar], 'player:Kaso' is [Kaso]).
 * @param text The Text of the link, including Text Colour Infomation and itemlinks (eg The previous two examples
 * : '|cff1eff00|Hitem:3577:0:0:0:0:0:0:276308480|h[Gold Bar]|h|r' '|Hplayer:Kaso|h[Kaso]|h'
 * @param button The button used to click the notes 'LeftButton' or 'RightButton' Apparently, See Notes
 * @description
 *  - Do not insecurely hook this function to add your own link types; hook ChatFrame_OnHyperlinkShow(frame, link, text, button) instead.
 * Hooking this function insecurely will end up tainting Blizzard's combat log, which will taint UIParent's update routines and result in
 * "action has been blocked" messages
 *  - This function is affected by Shift and Ctrl keys, and depends on what is being clicked, according to the below table
 * @see https://wow.gamepedia.com/API_SetItemRef
 */
declare function SetItemRef(
  link: WowItemLink,
  text: string,
  button: WowMouseButton
): void;

/**
 * Uses an item, optionally on a specified target
 * @param itemName name of the item to use
 * @param target unit to use the item on, defaults to "target" for items that can be used on others
 * @protected
 * @see https://wow.gamepedia.com/API_UseItemByName
 */
declare function UseItemByName(itemName: string, target?: WowUnitId): void;
