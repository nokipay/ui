import { createJiti } from "C:/Users/hp/Documents/Present/Nokipay/ui/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@nokipay/ui": "C:/Users/hp/Documents/Present/Nokipay/ui"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("C:/Users/hp/Documents/Present/Nokipay/ui/src/module.js")} */
const _module = await jiti.import("C:/Users/hp/Documents/Present/Nokipay/ui/src/module.ts");

export default _module?.default ?? _module;