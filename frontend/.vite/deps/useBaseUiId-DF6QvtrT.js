import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { b as isShadowRoot, n as SafeReact } from "./useIsoLayoutEffect-CMFuT-rz.js";
import { r as EMPTY_OBJECT } from "./useRenderElement-BqG7o_V4.js";
//#region node_modules/@base-ui/utils/esm/owner.js
function ownerDocument(node) {
	return node?.ownerDocument || document;
}
//#endregion
//#region node_modules/@base-ui/react/esm/internals/reason-parts.js
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var listNavigation = "list-navigation";
var cancelOpen = "cancel-open";
var imperativeAction = "imperative-action";
var windowResize = "window-resize";
//#endregion
//#region node_modules/@base-ui/react/esm/internals/createBaseUIEventDetails.js
/**
* Maps a change `reason` string to the corresponding native event type.
*/
/**
* Details of custom change events emitted by Base UI components.
*/
/**
* Details of custom generic events emitted by Base UI components.
*/
/**
* Creates a Base UI event details object with the given reason and utilities
* for preventing Base UI's internal event handling.
*/
function createChangeEventDetails(reason, event, trigger, customProperties) {
	let canceled = false;
	let allowPropagation = false;
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		cancel() {
			canceled = true;
		},
		allowPropagation() {
			allowPropagation = true;
		},
		get isCanceled() {
			return canceled;
		},
		get isPropagationAllowed() {
			return allowPropagation;
		},
		trigger,
		...custom
	};
}
//#endregion
//#region node_modules/@base-ui/react/esm/internals/shadowDom.js
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	const rootNode = child.getRootNode?.();
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getTarget(event) {
	if ("composedPath" in event) return event.composedPath()[0];
	return event.target;
}
//#endregion
//#region node_modules/@base-ui/utils/esm/useId.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`${prefix}-${globalId}`);
		}
	}, [defaultId, prefix]);
	return id;
}
var maybeReactUseId = SafeReact.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId(idOverride, prefix) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
	}
	return useGlobalId(idOverride, prefix);
}
//#endregion
//#region node_modules/@base-ui/react/esm/internals/useBaseUiId.js
/**
* Wraps `useId` and prefixes generated `id`s with `base-ui-`
* @param {string | undefined} idOverride overrides the generated id when provided
* @returns {string | undefined}
*/
function useBaseUiId(idOverride) {
	return useId(idOverride, "base-ui");
}
//#endregion
export { triggerPress as _, getTarget as a, closePress as c, imperativeAction as d, itemPress as f, triggerHover as g, outsidePress as h, contains as i, escapeKey as l, none as m, useId as n, createChangeEventDetails as o, listNavigation as p, activeElement as r, cancelOpen as s, useBaseUiId as t, focusOut as u, windowResize as v, ownerDocument as y };

//# sourceMappingURL=useBaseUiId-DF6QvtrT.js.map