export * from "./colors.js";
export * from "./typography.js";
import { CSS_VARIABLES } from "./colors.js";
import { FONT_CSS_VARIABLES } from "./typography.js";
export const ALL_CSS_VARIABLES = {
  ...CSS_VARIABLES,
  ...FONT_CSS_VARIABLES
};
export function injectCSSVariables() {
  const root = document.documentElement;
  Object.entries(ALL_CSS_VARIABLES).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}
