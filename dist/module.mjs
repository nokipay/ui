import { createJiti } from "C:/Users/reill/Documents/Work/Present/ui/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@nxpay/ui": "C:/Users/reill/Documents/Work/Present/ui"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("C:/Users/reill/Documents/Work/Present/ui/src/module.js")} */
const _module = await jiti.import("C:/Users/reill/Documents/Work/Present/ui/src/module.ts");

export default _module?.default ?? _module;