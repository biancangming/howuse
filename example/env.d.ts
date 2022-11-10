/// <reference types="vite/client" />

declare module "*" {
    import type { ComponentOptions } from './vue/dist/vue.esm-browser.prod'
    const Component: ComponentOptions
    export default Component
}

declare module '*.md' {
    import type { ComponentOptions } from './vue/dist/vue.esm-browser.prod'
    const Component: ComponentOptions
    export default Component
}

declare module "Prism" 