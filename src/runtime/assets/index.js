export * from "./images/index.js";
export * from "./styles/index.js";
export function initializeAssets() {
  if (typeof document !== "undefined") {
    import("./styles/index.js").then(({ injectCSSVariables }) => {
      injectCSSVariables();
    });
  }
}
