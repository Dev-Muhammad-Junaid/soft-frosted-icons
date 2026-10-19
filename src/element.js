/**
 * <frosted-icon> — a dependency-free custom element.
 *
 *   <frosted-icon name="bell"></frosted-icon>
 *   <frosted-icon name="bell" finish="duo" size="32" label="Notifications"></frosted-icon>
 *
 * Colour: set `color` (attribute), CSS `color` on the element, or `--sfi-color` anywhere above it.
 */
import { DEFAULT_COLOR, iconSVG, nextId } from "./render.js";

const BASE_STYLE = `:where(frosted-icon){display:inline-block;vertical-align:middle;line-height:0;color:var(--sfi-color, ${DEFAULT_COLOR})}`;

function injectBaseStyle(doc) {
  if (!doc || doc.getElementById("sfi-base")) return;
  const style = doc.createElement("style");
  style.id = "sfi-base";
  style.textContent = BASE_STYLE;
  (doc.head || doc.documentElement).prepend(style);
}

const Base = typeof HTMLElement === "undefined" ? class {} : HTMLElement;

export class FrostedIconElement extends Base {
  static get observedAttributes() {
    return ["name", "finish", "size", "color", "label", "animate"];
  }

  constructor() {
    super();
    this._id = nextId();
  }

  connectedCallback() {
    injectBaseStyle(this.ownerDocument);
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get name() { return this.getAttribute("name"); }
  set name(v) { this.setAttribute("name", v); }
  get finish() { return this.getAttribute("finish") === "duo" ? "duo" : "outline"; }
  set finish(v) { this.setAttribute("finish", v); }

  render() {
    const size = this.getAttribute("size");
    const label = this.getAttribute("label") || undefined;
    const svg = iconSVG(this.getAttribute("name"), {
      finish: this.finish,
      size: size ? (/^\d+(\.\d+)?$/.test(size) ? Number(size) : size) : 24,
      color: this.getAttribute("color") || "currentColor",
      label,
      id: this._id,
      className: this.hasAttribute("animate") ? "sfi-animate" : undefined,
    });
    this.innerHTML = svg;
    if (label) {
      this.removeAttribute("aria-hidden");
    } else {
      this.setAttribute("aria-hidden", "true");
    }
  }
}

/** Register <frosted-icon> (or a custom tag). Safe to call more than once. */
export function defineFrostedIcon(tag = "frosted-icon") {
  if (typeof customElements === "undefined" || customElements.get(tag)) return;
  customElements.define(tag, class extends FrostedIconElement {});
}
