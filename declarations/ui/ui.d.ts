/** @noSelfInFile */

/// <reference path="../global.d.ts" />

declare type WowHorizontalAlign = "LEFT" | "CENTER" | "RIGHT";
declare type WowVerticalAlign = "TOP" | "MIDDLE" | "BUTTOM";
declare type WowPoint = "TOP" | "RIGHT" | "BOTTOM" | "LEFT" | "TOPRIGHT" | "TOPLEFT" | "BOTTOMLEFT" | "BOTTOMRIGHT" | "CENTER";
declare type WowLayer = "BACKGROUND" | "ARTWORK" | "OVERLAY";
declare type WowFrameStrata = "WORLD" | "BACKGROUND" | "LOW" | "MEDIUM" | "HIGH" | "DIALOG" | "FULLSCREEN" | "FULLSCREEN_DIALOG" | "TOOLTIP";
declare type WowWrap = "CLAMP" | "CLAMPTOBLACK" | "CLAMPTOBLACKADDITIVE" | "CLAMPTOSHITE" | "REPEAT" | true | "MIRROR";
declare type WowMouseButton = "LeftButton" | "RightButton" | "Middle" | "Button4" | "Button5";
declare type WowFilterMode = "LINEAR" | "BILINEAR" | "TRILINEAR" | "NEAREST";
declare type WowMouseWheelDelta = 1 | -1;
declare type WowAlign = "HORIZONTAL" | "VERTICAL";

/**
 * global lua namespace
 */
declare const _G: { [prop: string]: any };
declare const InterfaceOptionsFramePanelContainer: WowRegion;
declare const UIParent: WowFrame;

// EVENTS
declare type WowEventOnEvent = "OnEvent";
declare type WowEventOnLoad = "OnLoad";
declare type WowEventOnUpdate = "OnUpdate";
declare type WowEventOnClick = "OnClick";
declare type WowEventOnEnter = "OnEnter";
declare type WowEventOnLeave = "OnLeave";
declare type WowEventOnHide = "OnHide";
declare type WowEventOnShow = "OnShow";
declare type WowEventOnMouseDown = "OnMouseDown";
declare type WowEventOnMouseUp = "OnMouseUp";
declare type WowEventOnMouseWheel = "OnMouseWheel";
declare type WowEventOnValueChanged = "OnValueChanged";
declare type WowEventOnTextChanged = "OnTextChanged";
// -----
declare type WowEventPlayerLogin = "PLAYER_LOGIN";
declare type WowEventPlayerLogout = "PLAYER_LOGOUT";
declare type WowEventUnitHealth = "UNIT_HEALTH";
declare type WowEventUnitPowerUpdate = "UNIT_POWER_UPDATE";
declare type WowEventUnitDisplaypower = "UNIT_DISPLAYPOWER";
declare type WowEventPlayerTargetChanged = "PLAYER_TARGET_CHANGED";
declare type WowEventUnitMaxhealth = "UNIT_MAXHEALTH";
declare type WowEventUnitMaxpower = "UNIT_MAXPOWER";
declare type WowEventGroupRosterUpdate = "GROUP_ROSTER_UPDATE";
declare type WowEventPlayerEnteringWorld = "PLAYER_ENTERING_WORLD";
declare type WowEventPlayerFocusChanged = "PLAYER_FOCUS_CHANGED";
declare type WowEventUnitEnteredVehicle = "UNIT_ENTERED_VEHICLE";
declare type WowEventUnitExitedVehicle = "UNIT_EXITED_VEHICLE";

// -----

declare type WowEventOnAny = WowEventOnEvent | WowEventOnLoad | WowEventOnUpdate | WowEventOnClick | WowEventOnEnter |
    WowEventOnLeave | WowEventOnHide | WowEventOnShow | WowEventOnMouseDown | WowEventOnMouseUp | WowEventOnMouseWheel |
    WowEventOnValueChanged | WowEventOnTextChanged;

declare type WowUiDropdownInfo = {
    text: string,
    func?: () => void,
    checked: boolean
};

/**
 * ##################################
 * FRAME MANAGEMENT
 * ##################################
 */

// global frame related functions

/**
 * set the width for the given dropdown frame
 *
 * @param dropdown the dropdown frame
 * @param width the new width
 */
declare function UIDropDownMenu_SetWidth(dropdown: WowFrame, width: number): void;

/**
 * set the text for the given dropdown frame
 *
 * @param dropdown the dropdown frame
 * @param text the text to set
 */
declare function UIDropDownMenu_SetText(dropdown: WowFrame, text: string): void;

/**
 * initialize the given dropdown frame
 *
 * @param dropdown the dropdown frame
 * @param callback the initializer function
 */
declare function UIDropDownMenu_Initialize(dropdown: WowFrame, callback: (self: WowFrame, level: number, menuList: number) => void): void;

/**
 * create an info object for a dropdown element
 */
declare function UIDropDownMenu_CreateInfo(): WowUiDropdownInfo;

/**
 * add the given info object to the current inizialized dropdown frame
 *
 * @param info the info to add
 */
declare function UIDropDownMenu_AddButton(info: WowUiDropdownInfo): void;

/**
 * comma separated list of enabled flags
 */
declare type FontInstanceFlags = "OUTLINE" | "MONOCHROME" | "THICKOUTLINE";

/**
 * The Frame type
 */
declare type WowFrameType = "Frame" | "Button" | "Cooldown"
    | "ColorSelect" | "EditBox" | "GameTooltip" | "MessageFrame"
    | "Minimap" | "Model" | "ScrollFrame" | "ScrollingMessageFrame"
    | "SimpleHTML" | "Slider" | "StatusBar";

/**
 * the generic UIObject type
 */
declare interface WowUiObject {

    /**
     * get the parent UIObject
     */
    GetParent(): WowUiObject;

    /**
     * Get the current alpha value
     */
    GetAlpha(): number;

    /**
     * get the type of this object
     */
    GetObjectType(): WowFrameType;

    /**
     * Return the name of the object.
     */
    GetName(): string;

    /**
     * Gets the children of a frame
     * @tupleReturn
     */
    GetChildren(): LuaMultiReturn<[...WowUiObject[]]>;

    /**
     * Returns whether insecure interaction with a widget is forbidden.
     */
    IsForbidden(): boolean;

    /**
     * Determine if this object is of the specified type, or a subclass of that type.
     *
     * @param type the type to check for
     */
    IsObjectType(type: WowFrameType): boolean;

    /**
     * Set the object's alpha (opacity) value.
     *
     * @param alpha the new alpha value
     */
    SetAlpha(alpha: number): void;
}

/**
 * This is another abstract object type that groups together a number of font related methods that are used by multiple other widget types.
 * This doesn't have a direct correlation to a UI object. See FontInstance object information for details.
 */
declare interface WowFontInstance extends WowUiObject {

    /**
     * Returns detailed information on a font object.
     * @returns MultipleReturnValues:
     *  - **fontName**: Path to font file
     *  - **fontHeight**: Font height in pixels. Due to internal graphics engine workings, this will be ridiculously close to an integer number,
     *  but not quite ever fully.
     *  - **fontFlags**: See FontInstance:SetFont().
     * @tupleReturn
     */
    GetFont(): LuaMultiReturn<[string, number, string]>;

    /**
     * Gets the text color of of a Font Instance.
     * @return MultipleReturnValues:
     *  r: The red color
     *  g: The green color
     *  b: The blue color
     *  a?: the alpha (opacity)
     * @tupleReturn
     */
    GetTextColor(): LuaMultiReturn<[number, number, number, number?]>;

    /**
     * The function is used to set the font to use for displaying text.
     *
     * @param font path to the font file, relative to the WoW base directory.
     * @param size size in points.
     * @param flags any comma-delimited combination of "OUTLINE", "THICKOUTLINE" and "MONOCHROME".
     */
    SetFont(font: string, size: number, flags?: FontInstanceFlags): void;

    /**
     * Sets horizontal text justification
     *
     * @param align the new align
     */
    SetJustifyH(align: WowHorizontalAlign): void;

    /**
     * Sets vertical text justification
     *
     * @param align the new align
     */
    SetJustifyV(align: WowVerticalAlign): void;

    /**
     * Sets the default text color.
     *
     * @param r red color
     * @param g green color
     * @param b blue color
     * @param a alpha (opacity)
     */
    SetTextColor(r: number, g: number, b: number, a?: number): void;
}

/**
 * This is an abstract object type which cannot actually be created.
 * It gathers together a number of common methods which have identical behaviours across all widget types.
 * This object contains a collection of methods that are related to the size, location and visibility of a widget.
 * Note that it is not directly related to Frame:GetRegions() et al. See Region object information for details.
 */
declare interface WowRegion extends WowUiObject {

    /**
     * Clear all attachment points for this object.
     */
    ClearAllPoints(): void;

    /**
     * Set this object to hidden (it and all of its children will disappear).
     */
    Hide(): void;

    /**
     * Set this object to shown (it will appear if its parent is visible).
     */
    Show(): void;

    /**
     * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
     */
    GetBottom(): number;

    /**
     * Get the coordinates of the center of this frame - Moved in 1.10.
     */
    GetCenter(): number;

    /**
     * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
     */
    GetTop(): number;

    /**
     * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
     */
    GetLeft(): number;

    /**
     * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
     */
    GetRight(): number;

    /**
     * Get the width of this object.
     */
    GetWidth(): number;

    /**
     * Get the height of this object.
     */
    GetHeight(): number;

    /**
     * Returns information about the anchor point for a region.
     *
     * @see https://wow.gamepedia.com/API_Region_GetPoint
     * @tupleReturn
     * @returns point, relativeTo, relativePoint, xOfs, yOfs
     */
    GetPoint(index: number): LuaMultiReturn<[WowPoint, WowRegion, WowPoint, number, number]>;

    /**
     * Set the parent UIObject
     */
    SetParent(parent: WowUiObject | null): void;

    /**
     * Sets an attachment point of an UI component.
     *
     * @param point Point of the object to adjust based on the anchor.
     * @param relativeTo Name or reference to a Region to attach obj to. If not specified in the call's signature,
     * defaults to obj's parent (or, if obj has no parent, the entire screen), or if specified in the signature and passed nil, defaults to the entire screen.
     * @param relativePoint point of the relativeTo Region to attach point of obj to. If not specified, defaults to the value of point.
     * @param offsetX x-offset (negative values will move obj left, positive values will move obj right), defaults to 0 if not specified,
     * if ofsy is not specified, or if both relativeTo and relativePoint are specified and nil.
     * @param offsetY  y-offset (negative values will move obj down, positive values will move obj up), defaults to 0 if not specified,
     * if ofsx is not specified, or if both relativeTo and relativePoint are specified and nil.
     */
    SetPoint(point: WowPoint, relativeTo: WowRegion | string, relativePoint: WowPoint, offsetX: number, offsetY: number): void;
    SetPoint(point: WowPoint): void;
    SetPoint(point: WowPoint, offsetX: number, offsetY: number): void;
    SetPoint(point: WowPoint, relativeTo: WowRegion | string, relativePoint: WowPoint): void;

    /**
     * Sets an object to be positioned and sized exactly the same as another object.
     */
    SetAllPoints(relativeRegion?: WowRegion | string): void;

    /**
     * Sets the desired height of a frame-based object.
     *
     * @param height The desired height to set the frame-based object to (use 0 to clear the desired height).
     * Note that a frame whose height is determined based on its anchors will not use this height.
     */
    SetHeight(height: number): void;

    /**
     * Sets the width of a frame-based object.
     *
     * @param width The width to set the frame-based object to (use 0 to clear the desired width).
     * Note that a frame whose width is determined based on its anchors will not use this width.
     */
    SetWidth(width: number): void;

    /**
     * Set the size (width and height) of the object with one function
     *
     * @param width The new width
     * @param height The new height
     */
    SetSize(width: number, height: number): void;

    /**
     * Checks if mouse is over a given region.
     *
     * @return True if the mouse cursor is currently over the region (as modified by the offset arguments); false otherwise.
     */
    IsMouseOver(): boolean;
    IsMouseOver(top: number, bottom: number, left: number, right: number): boolean;

    /**
     * Determine if this object can be manipulated in certain ways by tainted code in combat or not
     */
    IsProtected(): boolean;

    /**
     * Determine if this object is shown (would be visible if its parent was visible).
     */
    IsShown(): boolean;

    /**
     * Get whether the object is visible on screen (logically (IsShown() and GetParent():IsVisible()));
     */
    IsVisible(): boolean;
}

/**
 * Another abstract type, for objects that represent only a rendering process onto the screen, rather than a full blown frame.
 * (See LayeredRegion object information for details)
 */
declare interface WowLayeredRegion extends WowRegion {

    /**
     * Returns the draw layer for the Region.
     */
    GetDrawLayer(): number;

    /**
     * Sets the layer in which the LayeredRegion is drawn.
     *
     * @param layer coarse layer to draw the region in, e.g. "BACKGROUND" or "ARTWORK".
     * @param sublevel Integer between -8 and 7 (inclusive), controls rendering order within the specified layer.
     * Regions with lower sublevel values are drawn below those with higher ones.
     */
    SetDrawLayer(layer: WowLayer, sublevel?: number): void;

    /**
     * Sets the color of an object.
     *
     * @param r The red color value to set the object to. The range is 0 to 1.
     * @param g The green color value to set the object to. The range is 0 to 1.
     * @param b The blue color value to set the object to. The range is 0 to 1.
     * @param a The alpha value to set the object to. The range is 0 to 1.
     */
    SetVertexColor(r: number, g: number, b: number, a?: number): void;
}

/**
 * See Texture object information for details.
 */
declare interface WowTexture extends WowLayeredRegion {

    /**
     * Returns the texture string from any Texture object.
     *
     * @returns The path/filename without extension of the texture
     */
    GetTexture(): string;

    /**
     * Applies a counter-clockwise rotation to the texture.
     *
     * @param angle Rotation angle in radians. Positive values rotate the texture counter-clockwise.
     * @param cx Horizontal coordinate of the rotation "center" point, defaults to 0.5.
     * @param cy Vertical coordinate of the rotation "center" point, defaults to 0.5.
     */
    SetRotation(angle: number, cx: number, cy: number): void;
    SetRotation(angle: number): void;

    /**
     * Modifies the region of a texture drawn by the Texture widget.
     */
    SetTextCoord(left: number, right: number, top: number, bottom: number): void;
    SetTextCoord(ULx: number, ULy: number, LLx: number, LLy: number, URx: number, URy: number, LRx: number, LRy: number): void;

    /**
     * Changes the texture of a Texture widget.
     *
     * @param file Path to a texture image. | ID number specifying a Blizzard texture file. Returned by various API functions.
     * @param horizWrap Wrap behavior specifying what should appear when sampling pixels with an x coordinate outside the (0, 1)
     * region of the texture coordinate space
     * @param vertWrap Wrap behavior specifying what should appear when sampling pixels with a y coordinate outside the (0, 1)
     * region of the texture coordinate space.
     * @param filterMode Texture filtering mode to use
     */
    SetTexture(file: string | number, horizWrap?: WowWrap, vertWrap?: WowWrap, filterMode?: WowFilterMode): void;

    /**
     * Changes the color of a texture.
     *
     * @param r Red component.
     * @param g Green component.
     * @param b Blue component.
     * @param a Alpha component (1.0 is opaque, 0.0 is transparent). The default value is 1.0.
     */
    SetColorTexture(r: number, g: number, b: number, a?: number): void;
}

/**
 * a font string object
 */
declare interface WowFontString extends WowFontInstance, WowLayeredRegion {

    /**
     * Returns the text from any FontString UI object.
     *
     * @returns The text of the FontString. Returns nil if the FontString is an empty string.
     */
    GetText(): string;

    /**
     * Sets the text to be displayed in the fontstring. The text will have the color given to it via the fontinstance definition
     * (or a FontString:SetTextColor call). You may however use escape sequences to modify the string's appearance.
     *
     * @param text The text to set
     */
    SetText(text: string): void;

    /**
     * Returns how wide the string would be, in pixels, without wrapping
     * @see https://wow.gamepedia.com/API_FontString_GetStringWidth
     */
    GetStringWidth(): number;
}

/**
 * a generic hook script interface for reuse in other objects
 */
declare interface WowObjectHookScript<T extends WowUiObject> {

    /**
     * Securely post-hooks a script handler.
     *
     * @param event The handler to hook to, e.g. "OnShow". See Widget handlers.
     * @param handler The function to call; will be passed all arguments relevant for the hooked widget handler type. May not be nil.
     */
    HookScript(event: WowEventOnAny, handler: (frame: T, ...args: any[]) => void): void;
    HookScript(event: "OnClick", handler: (frame: T, button: WowMouseButton, down: boolean) => void): void;
    HookScript(event: "OnEnter" | "OnLeave", handler: (frame: T, motion: WowUnknown) => void): void;
    HookScript(event: "OnEvent", handler: (frame: T, eventName: WowEventOnAny & WowEvent, ...args: any[]) => void): void;
    HookScript(event: "OnHide" | "OnShow" | "OnLoad", handler: (frame: T) => void): void;
    HookScript(event: "OnMouseDown" | "OnMouseUp", handler: (frame: T, button: WowMouseButton) => void): void;
    HookScript(event: "OnMouseWheel", handler: (frame: T, delta: WowMouseWheelDelta) => void): void;
    HookScript(event: "OnUpdate", handler: (frame: T, elapsed: number) => void): void;
    HookScript(event: "OnValueChanged", handler: (frame: T, changed: any) => void): void;
    HookScript(event: "OnTextChanged", handler: (frame: T, text: string) => void): void;
    HookScript(event: WowEventOnAny, handler?: (frame: T, ...args: any[]) => void): void;
}

/**
 * a generoc set script interface for reuse in other objects
 */
declare interface WowObjectSetScript<T extends WowUiObject> {

    /**
     * Changes the specified widget script handler.
     *
     * @param event Name of the widget script handler to modify (OnShow, OnEvent, etc).
     * @param handler The function to call when handling the specified widget event, or nil to remove the handler.
     */
    SetScript(event: WowEventOnAny, handler: (frame: T, ...args: any[]) => void): void;
    SetScript(event: "OnClick", handler: (frame: T, button: WowMouseButton, down: boolean) => void): void;
    SetScript(event: "OnEnter" | "OnLeave", handler: (frame: T, motion: WowUnknown) => void): void;
    SetScript(event: "OnEvent", handler: (frame: T, eventName: WowEventOnAny | WowEvent, ...args: any[]) => void): void;
    SetScript(event: "OnHide" | "OnShow" | "OnLoad", handler: (frame: T) => void): void;
    SetScript(event: "OnMouseDown" | "OnMouseUp", handler: (frame: T, button: WowMouseButton) => void): void;
    SetScript(event: "OnMouseWheel", handler: (frame: T, delta: WowMouseWheelDelta) => void): void;
    SetScript(event: "OnUpdate", handler: (frame: T, elapsed: number) => void): void;
    SetScript(event: "OnValueChanged", handler: (frame: T, changed: any) => void): void;
    SetScript(event: "OnTextChanged", handler: (frame: T, isUserInput: boolean) => void): void;
    SetScript(event: WowEventOnAny, handler?: (frame: T, ...args: any[]) => void): void;
}

declare interface WowBackdrop {
    /**
     * Which texture file to use as frame background (.blp or .tga format)
     */
    bgFile?: string;

    /**
     * Which texture file to use as frame edge blp or .tga format)
     */
    edgeFile?: string;

    /**
     * whether background texture is tiled or streched
     */
    tile?: boolean;

    /**
     * Control how large each copy of the bgFile becomes on-screen
     */
    tileSize?: number;

    /**
     * Control how large each copy of the edgeFile becomes on-screen (i.e. border thickness and corner size)
     */
    edgeSize?: number;

    /**
     * Controls how far into the frame the background will be drawn (use higher values the thicker the edges are)
     */
    insets: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}

/**
 * The main wow frame object
 */
declare interface WowFrame extends WowRegion, WowObjectHookScript<WowFrame>, WowObjectSetScript<WowFrame> {

    /**
     * Creates a new FontString as a child of a frame.
     *
     * @param name The name for a global variable that points to the newly created font string.
     * If nil, the texture is anonymous and no global variable will be created.
     * @param layer The layer the font should be drawn in, e.g. "ARTWORK".
     * @param inheritsFrom The name of a virtual font string, created in XML, to inherit from. if nil, the font string does not inherit any properties.
     */
    CreateFontString(name?: string, layer?: WowLayer, inheritsFrom?: string): WowFontString;

    /**
     * Creates a Texture object within the specified widget.
     *
     * @param name Name of the newly created texture; the function will create a global variable mapping this value to the created texture.
     * If nil, the texture is anonymous and no global variable is created.
     * @param layer The layer to the texture should be drawn in, e.g. "ARTWORK".
     * @param inheritsFrom a comma-delimited list of names of virtual textures (created in XML) to inherit from; if nil,
     * the texture does not inherit any properties.
     * @param subLayer The order in which the texture should be drawn, within the same layer.
     */
    CreateTexture(name?: string, layer?: WowLayer, inheritsFrom?: string, subLayer?: number): WowTexture;

    /**
     * Allows this frame to receive keyboard input via OnKeyUp and OnKeyDown script handlers.
     *
     * @param enableFlag Whether to enable (true, default) or disable (false).
     */
    EnableKeyboard(enableFlag: boolean): void;

    /**
     * Allows a frame to receive mouse input via OnMouseDown, OnMouseUp or OnClick. The frame must be shown to receive mouse events.
     *
     * @param enableFlag Whether to enable (true, default) or disable (false).
     */
    EnableMouse(enableFlag: boolean): void;

    /**
     * Allows a frame to receive mouse wheel input.
     *
     * @param enableFlag Whether to enable (true, default) or disable (false).
     */
    EnableMouseWheel(enableFlag: boolean): void;

    /**
     * Returns the Frame Strata the frame is in.
     */
    GetFrameStrata(): WowFrameStrata;

    /**
     * returns whether the flag is enabled or not
     */
    IsKeyboardEnabled(): boolean;

    /**
     * returns whether the flag is enabled or not
     */
    IsMouseEnabled(): boolean;

    /**
     * returns whether the flag is enabled or not
     */
    IsMouseWheelEnabled(): boolean;

    /**
     * Registers which events the object would like to monitor.
     *
     * @param eventName The name of the event to register the object as monitoring.
     */
    RegisterEvent(eventName: WowEvent): void;

    /**
     * Sets the Frame Strata of the frame.
     *
     * @param frameStrata The Frame Strata the frame will be put in
     */
    SetFrameStrata(frameStrata: WowFrameStrata): void;

    /**
     * Specified a size scaling to be applied to the object (and its children).
     *
     * @param scale New scale applied to this object and its children; must be greater than 0, 1 indicates no additional scaling.
     */
    SetScale(scale: number): void;

    /**
     * set an attribute on the frame
     *
     * @param name the name of the attribute to set
     * @param value the value of the attribute
     */
    SetAttribute(name: string, value: any): void;

    /**
     * Unregisters the widget from receiving OnEvent notifications for a particular event.
     *
     * @param eventName The name of the event the object wishes to no longer monitor. See Events.
     */
    UnregisterEvent(eventName: WowEvent): void;

    /**
     * Unregisters all events that the object is currently monitoring.
     */
    UnregisterAllEvents(): void;

    /**
     * Applies a tint to the background component of a frame's backdrop
     * @param red red tint component, from 0 to 1 (red)
     * @param green green tint component, from 0 to 1 (green).
     * @param blue blue tint component, from 0 to 1 (blue)
     * @param alpha alpha value to apply to the backdrop's background, from 0 to 1 (opaque)
     * @see https://wow.gamepedia.com/API_Frame_SetBackdropColor
     */
    SetBackdropColor(red: number, green: number, blue: number, alpha: number): void;

    /**
     * Using 'nil' as the only parameter will remove the backdrop on the indicated frame
     * @param options
     */
    SetBackdrop(options: WowBackdrop | void): void;

    /**
     * Sets whether a frame widget can be moved
     * @param movable true to allow the frame to be moved using Frame:StartMoving(), false to disallow
     * @see https://wow.gamepedia.com/API_Frame_SetMovable
     */
    SetMovable(movable: boolean): void;

    /**
     * Starts moving the frame-inheriting widget as the user moves the mouse cursor
     * @see https://wow.gamepedia.com/API_Frame_StartMoving
     */
    StartMoving(): void;

    /**
     * Stops moving or resizing the widget
     * @see https://wow.gamepedia.com/API_Frame_StopMovingOrSizing
     */
    StopMovingOrSizing(): void;

    /**
     * Sets the Frame Level of the frame, within its Frame Strata
     * @param level the new strata level
     * @see https://wow.gamepedia.com/API_Frame_SetFrameLevel
     */
    SetFrameLevel(level: number): void;
}

/**
 * a normal WowFrame but with all given E properties
 */
declare type AdvancedWowFrame<F extends WowUiObject, E extends object> = {

    [P in keyof (E & F)]: (E & F)[P]
};

/**
 * The InterfaceOptions framework requires an addon to supply its own configuration frame (panel).
 * The supplied panel will be repositioned by FrameXML and displayed when the addon's configuration category is selected.
 * When the user presses the Okay, Cancel or Defaults buttons on the Interface Options frame, the panels will be notified by
 * calling specific functions in the supplied frame table.
 */
declare interface WowFrameInterfaceCategory extends WowFrame {

    /**
     * name displayed in the Interface Options category list (your addon name, or a panel-specific name)
     */
    name: string;

    /**
     * the panel.name value of the parent configuration panel, used to display a hierarchical category tree.
     * If the parent panel is not specified or does not exist, the panel is displayed as a top-level panel.
     */
    parent?: string;

    /**
     * called when the frame is initially displayed, and after requesting the default values to be restored.
     */
    refresh?: () => void;

    /**
     * called when the player presses the Okay button, indicating that settings should be saved.
     */
    okay?: () => void;

    /**
     * called when the player presses the Cancel button, indicating that changes made should be discarded.
     */
    cancel?: () => void;

    /**
     * called when the player presses the Defaults button, indicating that default settings for the addon should be restored.
     */
    default?: () => void;
}

/**
 * A slider for wow
 */
declare interface WowSlider extends WowFrame {

    /**
     * Disables the slider
     */
    Disable(): void;

    /**
     * Enables the slider
     */
    Enable(): void;

    /**
     * Returns the minimum and maximum values of a slider
     * @tupleReturn
     */
    GetMinMaxValues(): LuaMultiReturn<[number, number]>;

    /**
     * Get the current value of the slider
     */
    GetValue(): number;

    /**
     * Get the current step size of the slider
     */
    GetValueStep(): number;

    /**
     * set the minimun and maximum value of the slider
     *
     * @param min the min value
     * @param max the max value
     */
    SetMinMaxValues(min: number, max: number): void;

    /**
     * set the current value of the slider
     *
     * @param value the new value
     */
    SetValue(value: number): void;

    /**
     * set the new step value for the slider
     *
     * @param stepValue the new step value
     */
    SetValueStep(stepValue: number): void;

    /**
     * set the orientation of the slider
     *
     * @param orientation the orientation to set
     */
    SetOrientation(orientation: WowAlign): void;
}

/**
 * a textbox like object
 */
declare interface WowEditBox extends WowFrame, WowFontInstance {

    /**
     * Clears the input text focus out of the EditBox. After this call EditBox will no longer receive input from keyboard.
     */
    ClearFocus(): void;

    /**
     * Returns the position of the editbox cursor.
     */
    GetCursorPosition(): number;

    /**
     * This function reads text entered into the editBox, tries to convert it into a number, and returns corresponding numerical value,
     * or 0 if text didn't look like a number.
     */
    GetNumber(): number;

    /**
     * Returns the String that is currently entered in the EditBox.
     */
    GetText(): string;

    /**
     * Inserts text at the current cursor position.
     *
     * @param text text to insert at the current cursor position.
     */
    Insert(text: string): void;

    /**
     * Sets the position of the cursor in the edit box.
     *
     * @param position New editing cursor position; the cursor is set after position'th character of the string
     */
    SetCursorPosition(position: number): void;

    /**
     * Sets editBox's text to the specified string
     *
     * @param text the string you want to appear in the EditBox
     */
    SetText(text: string): void;

    /**
     * Sets whether the cursor should automatically focus on the EditBox when it is shown
     *
     * @param state Whether autofocus should be enabled
     */
    SetAutoFocus(state: boolean): void;
}

/**
 * a wow button
 */
interface WowButton extends WowFrame {

    /**
     * Execute the click action of the button.
     */
    Click(): void;

    /**
     * Disable the Button so that it cannot be clicked
     */
    Disable(): void;

    /**
     * Enable to the Button so that it may be clicked
     */
    Enable(): void;

    /**
     * Get the text label for the Button
     */
    GetText(): string;

    /**
     * Get the height of the Button's text
     */
    GetTextHeight(): number;

    /**
     * Get the width of the Button's text
     */
    GetTextWidth(): number;

    /**
     * Determine whether the Button is enabled
     */
    IsEnabled(): boolean;

    /**
     * Sets the Button's text to the specified string
     *
     * @param text The text that will be written on the Button
     */
    SetText(text: string): void;
}

/**
 * Creates a new UI frame.
 *
 * @param frameType Type of the frame to be created (XML tag name): "Frame", "Button", etc. See UIOBJECT_Frame
 * @param frameName Name of the newly created frame. If nil, no frame name is assigned. The function will also set a global
 * variable of this name to point to the newly created frame.
 * @param parentFrame The frame object that will be used as the created Frame's parent (cannot be a string!) Does not default to UIParent if given nil.
 * @param inheritsFrame a comma-delimited list of names of virtual frames to inherit from (the same as in XML). If nil,
 * no frames will be inherited. These frames cannot be frames that were created using this function,
 * they must be created using XML with virtual="true" in the tag.
 * @param id ID to assign to the frame. See API Frame SetID
 */
declare function CreateFrame(frameType: WowFrameType, frameName?: string, parentFrame?: WowUiObject, inheritsFrame?: string, id?: number): WowUiObject;
declare function CreateFrame(frameType: "Frame", frameName?: string, parentFrame?: WowUiObject, inheritsFrame?: string, id?: number): WowFrame;
declare function CreateFrame(frameType: "Slider", frameName?: string, parentFrame?: WowUiObject, inheritsFrame?: string, id?: number): WowSlider;
declare function CreateFrame(frameType: "EditBox", frameName?: string, parentFrame?: WowUiObject, inheritsFrame?: string, id?: number): WowEditBox;
declare function CreateFrame(frameType: "Button", frameName?: string, parentFrame?: WowUiObject, inheritsFrame?: string, id?: number): WowButton;

/**
 * Adds a configuration panel (with the fields described in #Panel fields below set) to the category list.
 * The optional position argument (number) allows addons to insert top-level panels at arbitrary positions in the category list.
 *
 * @param panel the panel to add
 */
declare function InterfaceOptions_AddCategory(panel: WowFrameInterfaceCategory): void;
