import { n as __exportAll, r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { h as isElement, i as useStableCallback, t as useIsoLayoutEffect } from "./useIsoLayoutEffect-CMFuT-rz.js";
import { r as EMPTY_OBJECT, s as useRefWithInit, t as useRenderElement } from "./useRenderElement-BqG7o_V4.js";
import { t as useButton } from "./useButton-DdCsVLmC.js";
import { C as CLICK_TRIGGER_IDENTIFIER, S as FloatingPortal, _ as useDismiss, a as CommonPopupDataAttributes, b as useFloatingParentNodeId, c as triggerOpenStateMapping, d as useInteractions, f as PopupTriggerMap, g as FloatingRootStore, gt as ReactStore, h as useTransitionStatus, i as inertValue, l as useOpenInteractionType, m as transitionStatusMapping, n as useScrollLock, o as popupStateMapping, p as useOpenChangeComplete, r as InternalBackdrop, rt as getFloatingFocusElement, t as COMPOSITE_KEYS, v as useClick, xt as useOnFirstRender, y as FloatingFocusManager, yt as createSelector } from "./composite-CuXdo4t0.js";
import { a as getTarget, c as closePress, d as imperativeAction, i as contains, n as useId, o as createChangeEventDetails, t as useBaseUiId } from "./useBaseUiId-DF6QvtrT.js";
import { t as require_jsx_runtime } from "./jsx-runtime-C-zScNOd.js";
//#region node_modules/@base-ui/react/esm/utils/popups/popupStoreUtils.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Returns a callback ref that registers/unregisters the trigger element in the store.
*
* @param store The Store instance where the trigger should be registered.
*/
function useTriggerRegistration(id, store) {
	const registeredElementIdRef = import_react.useRef(null);
	const registeredElementRef = import_react.useRef(null);
	return import_react.useCallback((element) => {
		if (id === void 0) return;
		if (registeredElementIdRef.current !== null) {
			const registeredId = registeredElementIdRef.current;
			const registeredElement = registeredElementRef.current;
			const currentElement = store.context.triggerElements.getById(registeredId);
			if (registeredElement && currentElement === registeredElement) store.context.triggerElements.delete(registeredId);
			registeredElementIdRef.current = null;
			registeredElementRef.current = null;
		}
		if (element !== null) {
			registeredElementIdRef.current = id;
			registeredElementRef.current = element;
			store.context.triggerElements.add(id, element);
		}
	}, [store, id]);
}
/**
* Sets up trigger data forwarding to the store.
*
* @param triggerId Id of the trigger.
* @param triggerElement The trigger DOM element.
* @param store The Store instance managing the popup state.
* @param stateUpdates An object with state updates to apply when the trigger is active.
*/
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
	const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId);
	const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
	const registerTrigger = useStableCallback((element) => {
		baseRegisterTrigger(element);
		if (!element || !store.select("open")) return;
		const activeTriggerId = store.select("activeTriggerId");
		if (activeTriggerId === triggerId) {
			store.update({
				activeTriggerElement: element,
				...stateUpdates
			});
			return;
		}
		if (activeTriggerId == null) store.update({
			activeTriggerId: triggerId,
			activeTriggerElement: element,
			...stateUpdates
		});
	});
	useIsoLayoutEffect(() => {
		if (isMountedByThisTrigger) store.update({
			activeTriggerElement: triggerElementRef.current,
			...stateUpdates
		});
	}, [
		isMountedByThisTrigger,
		store,
		triggerElementRef,
		...Object.values(stateUpdates)
	]);
	return {
		registerTrigger,
		isMountedByThisTrigger
	};
}
/**
* Ensures that when there's only one trigger element registered, it is set as the active trigger.
* This allows controlled popups to work correctly without an explicit triggerId, maintaining compatibility
* with the contained triggers.
*
* This should be called on the Root part.
*
* @param open Whether the popup is open.
* @param store The Store instance managing the popup state.
*/
function useImplicitActiveTrigger(store) {
	const open = store.useState("open");
	useIsoLayoutEffect(() => {
		if (open && !store.select("activeTriggerId") && store.context.triggerElements.size === 1) {
			const iteratorResult = store.context.triggerElements.entries().next();
			if (!iteratorResult.done) {
				const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
				store.update({
					activeTriggerId: implicitTriggerId,
					activeTriggerElement: implicitTriggerElement
				});
			}
		}
	}, [open, store]);
}
/**
* Mangages the mounted state of the popup.
* Sets up the transition status listeners and handles unmounting when needed.
* Updates the `mounted` and `transitionStatus` states in the store.
*
* @param open Whether the popup is open.
* @param store The Store instance managing the popup state.
* @param onUnmount Optional callback to be called when the popup is unmounted.
*
* @returns A function to forcibly unmount the popup.
*/
function useOpenStateTransitions(open, store, onUnmount) {
	const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);
	store.useSyncedValues({
		mounted,
		transitionStatus
	});
	const forceUnmount = useStableCallback(() => {
		setMounted(false);
		store.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: false
		});
		onUnmount?.();
		store.context.onOpenChangeComplete?.(false);
	});
	useOpenChangeComplete({
		enabled: !store.useState("preventUnmountingOnClose"),
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (!open) forceUnmount();
		}
	});
	return {
		forceUnmount,
		transitionStatus
	};
}
//#endregion
//#region node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js
function getEmptyRootContext() {
	return new FloatingRootStore({
		open: false,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new PopupTriggerMap(),
		floatingId: "",
		syncOnly: false,
		nested: false,
		onOpenChange: void 0
	});
}
//#endregion
//#region node_modules/@base-ui/react/esm/utils/popups/store.js
/**
* State common to all popup stores.
*/
function createInitialPopupStoreState() {
	return {
		open: false,
		openProp: void 0,
		mounted: false,
		transitionStatus: void 0,
		floatingRootContext: getEmptyRootContext(),
		preventUnmountingOnClose: false,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: EMPTY_OBJECT,
		inactiveTriggerProps: EMPTY_OBJECT,
		popupProps: EMPTY_OBJECT
	};
}
var activeTriggerIdSelector = createSelector((state) => state.triggerIdProp ?? state.activeTriggerId);
var popupStoreSelectors = {
	open: createSelector((state) => state.openProp ?? state.open),
	mounted: createSelector((state) => state.mounted),
	transitionStatus: createSelector((state) => state.transitionStatus),
	floatingRootContext: createSelector((state) => state.floatingRootContext),
	preventUnmountingOnClose: createSelector((state) => state.preventUnmountingOnClose),
	payload: createSelector((state) => state.payload),
	activeTriggerId: activeTriggerIdSelector,
	activeTriggerElement: createSelector((state) => state.mounted ? state.activeTriggerElement : null),
	/**
	* Whether the trigger with the given ID was used to open the popup.
	*/
	isTriggerActive: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId),
	/**
	* Whether the popup is open and was activated by a trigger with the given ID.
	*/
	isOpenedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.open),
	/**
	* Whether the popup is mounted and was activated by a trigger with the given ID.
	*/
	isMountedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.mounted),
	triggerProps: createSelector((state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps),
	popupProps: createSelector((state) => state.popupProps),
	popupElement: createSelector((state) => state.popupElement),
	positionerElement: createSelector((state) => state.positionerElement)
};
//#endregion
//#region node_modules/@base-ui/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js
/**
* Initializes a FloatingRootStore that is kept in sync with the provided PopupStore.
* The new instance is created only once and updated on every render.
*/
function useSyncedFloatingRootContext(options) {
	const { popupStore, treatPopupAsFloatingElement = false, onOpenChange } = options;
	const floatingId = useId();
	const nested = useFloatingParentNodeId() != null;
	const open = popupStore.useState("open");
	const referenceElement = popupStore.useState("activeTriggerElement");
	const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? "popupElement" : "positionerElement");
	const triggerElements = popupStore.context.triggerElements;
	const store = useRefWithInit(() => new FloatingRootStore({
		open,
		transitionStatus: void 0,
		referenceElement,
		floatingElement,
		triggerElements,
		onOpenChange,
		floatingId,
		syncOnly: true,
		nested
	})).current;
	useIsoLayoutEffect(() => {
		const valuesToSync = {
			open,
			floatingId,
			referenceElement,
			floatingElement
		};
		if (isElement(referenceElement)) valuesToSync.domReferenceElement = referenceElement;
		if (store.state.positionReference === store.state.referenceElement) valuesToSync.positionReference = referenceElement;
		store.update(valuesToSync);
	}, [
		open,
		floatingId,
		referenceElement,
		floatingElement,
		store
	]);
	store.context.onOpenChange = onOpenChange;
	store.context.nested = nested;
	return store;
}
//#endregion
//#region node_modules/@base-ui/react/esm/floating-ui-react/hooks/useRole.js
var componentRoleToAriaRoleMap = new Map([
	["select", "listbox"],
	["combobox", "listbox"],
	["label", false]
]);
/**
* Adds base screen reader props to the reference and floating elements for a
* given floating element `role`.
* @see https://floating-ui.com/docs/useRole
*/
function useRole(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const defaultFloatingId = store.useState("floatingId");
	const domReference = store.useState("domReferenceElement");
	const floatingElement = store.useState("floatingElement");
	const { role = "dialog" } = props;
	const defaultReferenceId = useId();
	const referenceId = domReference?.id || defaultReferenceId;
	const floatingId = import_react.useMemo(() => getFloatingFocusElement(floatingElement)?.id || defaultFloatingId, [floatingElement, defaultFloatingId]);
	const ariaRole = componentRoleToAriaRoleMap.get(role) ?? role;
	const isNested = useFloatingParentNodeId() != null;
	const trigger = import_react.useMemo(() => {
		if (ariaRole === "tooltip" || role === "label") return EMPTY_OBJECT;
		return {
			"aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
			"aria-expanded": "false",
			...ariaRole === "listbox" && { role: "combobox" },
			...ariaRole === "menu" && isNested && { role: "menuitem" },
			...role === "select" && { "aria-autocomplete": "none" },
			...role === "combobox" && { "aria-autocomplete": "list" }
		};
	}, [
		ariaRole,
		isNested,
		role
	]);
	const reference = import_react.useMemo(() => {
		if (ariaRole === "tooltip" || role === "label") return { [`aria-${role === "label" ? "labelledby" : "describedby"}`]: open ? floatingId : void 0 };
		return {
			...trigger,
			"aria-expanded": open ? "true" : "false",
			"aria-controls": open ? floatingId : void 0,
			...ariaRole === "menu" && { id: referenceId }
		};
	}, [
		ariaRole,
		floatingId,
		open,
		referenceId,
		role,
		trigger
	]);
	const floating = import_react.useMemo(() => {
		const floatingProps = {
			id: floatingId,
			...ariaRole && { role: ariaRole }
		};
		if (ariaRole === "tooltip" || role === "label") return floatingProps;
		return {
			...floatingProps,
			...ariaRole === "menu" && { "aria-labelledby": referenceId }
		};
	}, [
		ariaRole,
		floatingId,
		referenceId,
		role
	]);
	const item = import_react.useCallback(({ active, selected }) => {
		const commonProps = {
			role: "option",
			...active && { id: `${floatingId}-fui-option` }
		};
		switch (role) {
			case "select":
			case "combobox": return {
				...commonProps,
				"aria-selected": selected
			};
			default:
		}
		return {};
	}, [floatingId, role]);
	return import_react.useMemo(() => ({
		reference,
		floating,
		item,
		trigger
	}), [
		reference,
		floating,
		trigger,
		item
	]);
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js
var DialogRootContext = /* @__PURE__ */ import_react.createContext(void 0);
DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
	const dialogRootContext = import_react.useContext(DialogRootContext);
	if (optional === false && dialogRootContext === void 0) throw new Error("Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.");
	return dialogRootContext;
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
var stateAttributesMapping$2 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* An overlay displayed beneath the popup.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogBackdrop = /* @__PURE__ */ import_react.forwardRef(function DialogBackdrop(componentProps, forwardedRef) {
	const { render, className, style, forceRender = false, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	const nested = store.useState("nested");
	const mounted = store.useState("mounted");
	return useRenderElement("div", componentProps, {
		state: {
			open,
			transitionStatus: store.useState("transitionStatus")
		},
		ref: [store.context.backdropRef, forwardedRef],
		stateAttributesMapping: stateAttributesMapping$2,
		props: [{
			role: "presentation",
			hidden: !mounted,
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			}
		}, elementProps],
		enabled: forceRender || !nested
	});
});
DialogBackdrop.displayName = "DialogBackdrop";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/close/DialogClose.js
/**
* A button that closes the dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogClose = /* @__PURE__ */ import_react.forwardRef(function DialogClose(componentProps, forwardedRef) {
	const { render, className, disabled = false, nativeButton = true, style, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	function handleClick(event) {
		if (open) store.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent));
	}
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	return useRenderElement("button", componentProps, {
		state: { disabled },
		ref: [forwardedRef, buttonRef],
		props: [
			{ onClick: handleClick },
			elementProps,
			getButtonProps
		]
	});
});
DialogClose.displayName = "DialogClose";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/description/DialogDescription.js
/**
* A paragraph with additional information about the dialog.
* Renders a `<p>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogDescription = /* @__PURE__ */ import_react.forwardRef(function DialogDescription(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("descriptionElementId", id);
	return useRenderElement("p", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
DialogDescription.displayName = "DialogDescription";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js
var DialogPopupCssVars = /* @__PURE__ */ function(DialogPopupCssVars) {
	/**
	* Indicates how many dialogs are nested within.
	* @type {number}
	*/
	DialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
	return DialogPopupCssVars;
}({});
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js
var DialogPopupDataAttributes = function(DialogPopupDataAttributes) {
	/**
	* Present when the dialog is open.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["open"] = CommonPopupDataAttributes.open] = "open";
	/**
	* Present when the dialog is closed.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["closed"] = CommonPopupDataAttributes.closed] = "closed";
	/**
	* Present when the dialog is animating in.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the dialog is animating out.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
	/**
	* Present when the dialog is nested within another dialog.
	*/
	DialogPopupDataAttributes["nested"] = "data-nested";
	/**
	* Present when the dialog has other open dialogs nested within it.
	*/
	DialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
	return DialogPopupDataAttributes;
}({});
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js
var DialogPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
	const value = import_react.useContext(DialogPortalContext);
	if (value === void 0) throw new Error("Base UI: <Dialog.Portal> is missing.");
	return value;
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js
var import_jsx_runtime = require_jsx_runtime();
var stateAttributesMapping$1 = {
	...popupStateMapping,
	...transitionStatusMapping,
	nestedDialogOpen(value) {
		return value ? { [DialogPopupDataAttributes.nestedDialogOpen]: "" } : null;
	}
};
/**
* A container for the dialog contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogPopup = /* @__PURE__ */ import_react.forwardRef(function DialogPopup(componentProps, forwardedRef) {
	const { className, finalFocus, initialFocus, render, style, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const descriptionElementId = store.useState("descriptionElementId");
	const disablePointerDismissal = store.useState("disablePointerDismissal");
	const floatingRootContext = store.useState("floatingRootContext");
	const rootPopupProps = store.useState("popupProps");
	const modal = store.useState("modal");
	const mounted = store.useState("mounted");
	const nested = store.useState("nested");
	const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
	const open = store.useState("open");
	const openMethod = store.useState("openMethod");
	const titleElementId = store.useState("titleElementId");
	const transitionStatus = store.useState("transitionStatus");
	const role = store.useState("role");
	useDialogPortalContext();
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	function defaultInitialFocus(interactionType) {
		if (interactionType === "touch") return store.context.popupRef.current;
		return true;
	}
	const resolvedInitialFocus = initialFocus === void 0 ? defaultInitialFocus : initialFocus;
	const element = useRenderElement("div", componentProps, {
		state: {
			open,
			nested,
			transitionStatus,
			nestedDialogOpen: nestedOpenDialogCount > 0
		},
		props: [
			rootPopupProps,
			{
				"aria-labelledby": titleElementId ?? void 0,
				"aria-describedby": descriptionElementId ?? void 0,
				role,
				tabIndex: -1,
				hidden: !mounted,
				onKeyDown(event) {
					if (COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
				},
				style: { [DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount }
			},
			elementProps
		],
		ref: [
			forwardedRef,
			store.context.popupRef,
			store.useStateSetter("popupElement")
		],
		stateAttributesMapping: stateAttributesMapping$1
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingRootContext,
		openInteractionType: openMethod,
		disabled: !mounted,
		closeOnFocusOut: !disablePointerDismissal,
		initialFocus: resolvedInitialFocus,
		returnFocus: finalFocus,
		modal: modal !== false,
		restoreFocus: "popup",
		children: element
	});
});
DialogPopup.displayName = "DialogPopup";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogPortal = /* @__PURE__ */ import_react.forwardRef(function DialogPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	const { store } = useDialogRootContext();
	const mounted = store.useState("mounted");
	const modal = store.useState("modal");
	const open = store.useState("open");
	if (!(mounted || keepMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps,
			children: [mounted && modal === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
				ref: store.context.internalBackdropRef,
				inert: inertValue(!open)
			}), props.children]
		})
	});
});
DialogPortal.displayName = "DialogPortal";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/root/useDialogRoot.js
function useDialogRoot(params) {
	const { store, parentContext, actionsRef, isDrawer } = params;
	const open = store.useState("open");
	const disablePointerDismissal = store.useState("disablePointerDismissal");
	const modal = store.useState("modal");
	const popupElement = store.useState("popupElement");
	const { openMethod, triggerProps } = useOpenInteractionType(open);
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store);
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	const floatingRootContext = useSyncedFloatingRootContext({
		popupStore: store,
		onOpenChange: store.setOpen,
		treatPopupAsFloatingElement: true
	});
	const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = import_react.useState(0);
	const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = import_react.useState(0);
	const isTopmost = ownNestedOpenDialogs === 0;
	const role = useRole(floatingRootContext);
	const dismiss = useDismiss(floatingRootContext, {
		outsidePressEvent() {
			if (store.context.internalBackdropRef.current || store.context.backdropRef.current) return "intentional";
			return {
				mouse: modal === "trap-focus" ? "sloppy" : "intentional",
				touch: "sloppy"
			};
		},
		outsidePress(event) {
			if (!store.context.outsidePressEnabledRef.current) return false;
			if ("button" in event && event.button !== 0) return false;
			if ("touches" in event && event.touches.length !== 1) return false;
			const target = getTarget(event);
			if (isTopmost && !disablePointerDismissal) {
				const eventTarget = target;
				if (modal) return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === eventTarget || store.context.backdropRef.current === eventTarget || contains(eventTarget, popupElement) && !eventTarget?.hasAttribute("data-base-ui-portal") : true;
				return true;
			}
			return false;
		},
		escapeKey: isTopmost
	});
	useScrollLock(open && modal === true, popupElement);
	const { getReferenceProps, getFloatingProps, getTriggerProps } = useInteractions([role, dismiss]);
	store.useContextCallback("onNestedDialogOpen", (dialogCount, drawerCount) => {
		setOwnNestedOpenDialogs(dialogCount);
		setOwnNestedOpenDrawers(drawerCount);
	});
	store.useContextCallback("onNestedDialogClose", () => {
		setOwnNestedOpenDialogs(0);
		setOwnNestedOpenDrawers(0);
	});
	import_react.useEffect(() => {
		if (parentContext?.onNestedDialogOpen && open) parentContext.onNestedDialogOpen(ownNestedOpenDialogs + 1, ownNestedOpenDrawers + (isDrawer ? 1 : 0));
		if (parentContext?.onNestedDialogClose && !open) parentContext.onNestedDialogClose();
		return () => {
			if (parentContext?.onNestedDialogClose && open) parentContext.onNestedDialogClose();
		};
	}, [
		isDrawer,
		open,
		ownNestedOpenDialogs,
		ownNestedOpenDrawers,
		parentContext
	]);
	const activeTriggerProps = import_react.useMemo(() => getReferenceProps(triggerProps), [getReferenceProps, triggerProps]);
	const inactiveTriggerProps = import_react.useMemo(() => getTriggerProps(triggerProps), [getTriggerProps, triggerProps]);
	const popupProps = import_react.useMemo(() => getFloatingProps(), [getFloatingProps]);
	store.useSyncedValues({
		openMethod,
		activeTriggerProps,
		inactiveTriggerProps,
		popupProps,
		floatingRootContext,
		nestedOpenDialogCount: ownNestedOpenDialogs,
		nestedOpenDrawerCount: ownNestedOpenDrawers
	});
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/store/DialogStore.js
var selectors = {
	...popupStoreSelectors,
	modal: createSelector((state) => state.modal),
	nested: createSelector((state) => state.nested),
	nestedOpenDialogCount: createSelector((state) => state.nestedOpenDialogCount),
	nestedOpenDrawerCount: createSelector((state) => state.nestedOpenDrawerCount),
	disablePointerDismissal: createSelector((state) => state.disablePointerDismissal),
	openMethod: createSelector((state) => state.openMethod),
	descriptionElementId: createSelector((state) => state.descriptionElementId),
	titleElementId: createSelector((state) => state.titleElementId),
	viewportElement: createSelector((state) => state.viewportElement),
	role: createSelector((state) => state.role)
};
var DialogStore = class DialogStore extends ReactStore {
	constructor(initialState) {
		super(createInitialState(initialState), {
			popupRef: /* @__PURE__ */ import_react.createRef(),
			backdropRef: /* @__PURE__ */ import_react.createRef(),
			internalBackdropRef: /* @__PURE__ */ import_react.createRef(),
			outsidePressEnabledRef: { current: true },
			triggerElements: new PopupTriggerMap(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0
		}, selectors);
	}
	setOpen = (nextOpen, eventDetails) => {
		eventDetails.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", true);
		};
		if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) eventDetails.trigger = this.state.activeTriggerElement ?? void 0;
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const updatedState = { open: nextOpen };
		const newTriggerId = eventDetails.trigger?.id ?? null;
		if (newTriggerId || nextOpen) {
			updatedState.activeTriggerId = newTriggerId;
			updatedState.activeTriggerElement = eventDetails.trigger ?? null;
		}
		this.update(updatedState);
	};
	static useStore(externalStore, initialState) {
		const internalStore = useRefWithInit(() => {
			return new DialogStore(initialState);
		}).current;
		return externalStore ?? internalStore;
	}
};
function createInitialState(initialState = {}) {
	return {
		...createInitialPopupStoreState(),
		modal: true,
		disablePointerDismissal: false,
		popupElement: null,
		viewportElement: null,
		descriptionElementId: void 0,
		titleElementId: void 0,
		openMethod: null,
		nested: false,
		nestedOpenDialogCount: 0,
		nestedOpenDrawerCount: 0,
		role: "dialog",
		...initialState
	};
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js
var IsDrawerContext = /* @__PURE__ */ import_react.createContext(false);
IsDrawerContext.displayName = "IsDrawerContext";
function DialogRoot(props) {
	const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, disablePointerDismissal = false, modal = true, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
	const parentDialogRootContext = useDialogRootContext(true);
	const isDrawer = import_react.useContext(IsDrawerContext);
	const nested = Boolean(parentDialogRootContext);
	const store = DialogStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp,
		modal,
		disablePointerDismissal,
		nested
	});
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen === true) store.update({
			open: true,
			activeTriggerId: defaultTriggerIdProp
		});
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useSyncedValues({
		disablePointerDismissal,
		nested,
		modal
	});
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const payload = store.useState("payload");
	useDialogRoot({
		store,
		actionsRef,
		parentContext: parentDialogRootContext?.store.context,
		isDrawer,
		onOpenChange,
		triggerIdProp
	});
	const contextValue = import_react.useMemo(() => ({ store }), [store]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsDrawerContext.Provider, {
		value: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRootContext.Provider, {
			value: contextValue,
			children: typeof children === "function" ? children({ payload }) : children
		})
	});
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/viewport/DialogViewportDataAttributes.js
var DialogViewportDataAttributes = function(DialogViewportDataAttributes) {
	/**
	* Present when the dialog is open.
	*/
	DialogViewportDataAttributes[DialogViewportDataAttributes["open"] = CommonPopupDataAttributes.open] = "open";
	/**
	* Present when the dialog is closed.
	*/
	DialogViewportDataAttributes[DialogViewportDataAttributes["closed"] = CommonPopupDataAttributes.closed] = "closed";
	/**
	* Present when the dialog is animating in.
	*/
	DialogViewportDataAttributes[DialogViewportDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the dialog is animating out.
	*/
	DialogViewportDataAttributes[DialogViewportDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
	/**
	* Present when the dialog is nested within another dialog.
	*/
	DialogViewportDataAttributes["nested"] = "data-nested";
	/**
	* Present when the dialog has other open dialogs nested within it.
	*/
	DialogViewportDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
	return DialogViewportDataAttributes;
}({});
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js
var stateAttributesMapping = {
	...popupStateMapping,
	...transitionStatusMapping,
	nested(value) {
		return value ? { [DialogViewportDataAttributes.nested]: "" } : null;
	},
	nestedDialogOpen(value) {
		return value ? { [DialogViewportDataAttributes.nestedDialogOpen]: "" } : null;
	}
};
/**
* A positioning container for the dialog popup that can be made scrollable.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogViewport = /* @__PURE__ */ import_react.forwardRef(function DialogViewport(componentProps, forwardedRef) {
	const { className, render, children, style, ...elementProps } = componentProps;
	const keepMounted = useDialogPortalContext();
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	const nested = store.useState("nested");
	const transitionStatus = store.useState("transitionStatus");
	const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
	const mounted = store.useState("mounted");
	return useRenderElement("div", componentProps, {
		enabled: keepMounted || mounted,
		state: {
			open,
			nested,
			transitionStatus,
			nestedDialogOpen: nestedOpenDialogCount > 0
		},
		ref: [forwardedRef, store.useStateSetter("viewportElement")],
		stateAttributesMapping,
		props: [{
			role: "presentation",
			hidden: !mounted,
			style: { pointerEvents: !open ? "none" : void 0 },
			children
		}, elementProps]
	});
});
DialogViewport.displayName = "DialogViewport";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js
/**
* A heading that labels the dialog.
* Renders an `<h2>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogTitle = /* @__PURE__ */ import_react.forwardRef(function DialogTitle(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("titleElementId", id);
	return useRenderElement("h2", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
DialogTitle.displayName = "DialogTitle";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js
/**
* A button that opens the dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogTrigger = /* @__PURE__ */ import_react.forwardRef(function DialogTrigger(componentProps, forwardedRef) {
	const { render, className, disabled = false, nativeButton = true, id: idProp, payload, handle, style, ...elementProps } = componentProps;
	const dialogRootContext = useDialogRootContext(true);
	const store = handle?.store ?? dialogRootContext?.store;
	if (!store) throw new Error("Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle.");
	const thisTriggerId = useBaseUiId(idProp);
	const floatingContext = store.useState("floatingRootContext");
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const triggerElementRef = import_react.useRef(null);
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, { payload });
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const localInteractionProps = useInteractions([useClick(floatingContext, { enabled: floatingContext != null })]);
	const state = {
		disabled,
		open: isOpenedByThisTrigger
	};
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	return useRenderElement("button", componentProps, {
		state,
		ref: [
			buttonRef,
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			localInteractionProps.getReferenceProps(),
			rootTriggerProps,
			{
				[CLICK_TRIGGER_IDENTIFIER]: "",
				id: thisTriggerId
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: triggerOpenStateMapping
	});
});
DialogTrigger.displayName = "DialogTrigger";
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/store/DialogHandle.js
/**
* A handle to control a Dialog imperatively and to associate detached triggers with it.
*/
var DialogHandle = class {
	/**
	* Internal store holding the dialog state.
	* @internal
	*/
	constructor(store) {
		this.store = store ?? new DialogStore();
	}
	/**
	* Opens the dialog and associates it with the trigger with the given id.
	* The trigger, if provided, must be a Dialog.Trigger component with this handle passed as a prop.
	*
	* This method should only be called in an event handler or an effect (not during rendering).
	*
	* @param triggerId ID of the trigger to associate with the dialog. If null, the dialog will open without a trigger association.
	*/
	open(triggerId) {
		const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : void 0;
		if (triggerId && !triggerElement) console.warn(`Base UI: DialogHandle.open: No trigger found with id "${triggerId}". The dialog will open, but the trigger will not be associated with the dialog.`);
		this.store.setOpen(true, createChangeEventDetails(imperativeAction, void 0, triggerElement));
	}
	/**
	* Opens the dialog and sets the payload.
	* Does not associate the dialog with any trigger.
	*
	* @param payload Payload to set when opening the dialog.
	*/
	openWithPayload(payload) {
		this.store.set("payload", payload);
		this.store.setOpen(true, createChangeEventDetails(imperativeAction, void 0, void 0));
	}
	/**
	* Closes the dialog.
	*/
	close() {
		this.store.setOpen(false, createChangeEventDetails(imperativeAction, void 0, void 0));
	}
	/**
	* Indicates whether the dialog is currently open.
	*/
	get isOpen() {
		return this.store.state.open;
	}
};
/**
* Creates a new handle to connect a Dialog.Root with detached Dialog.Trigger components.
*/
function createDialogHandle() {
	return new DialogHandle();
}
//#endregion
//#region node_modules/@base-ui/react/esm/dialog/index.parts.js
var index_parts_exports = /* @__PURE__ */ __exportAll({
	Backdrop: () => DialogBackdrop,
	Close: () => DialogClose,
	Description: () => DialogDescription,
	Handle: () => DialogHandle,
	Popup: () => DialogPopup,
	Portal: () => DialogPortal,
	Root: () => DialogRoot,
	Title: () => DialogTitle,
	Trigger: () => DialogTrigger,
	Viewport: () => DialogViewport,
	createHandle: () => createDialogHandle
});
//#endregion
export { index_parts_exports as Dialog };

//# sourceMappingURL=@base-ui_react_dialog.js.map