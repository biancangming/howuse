/// <reference types="vite/client" />
/// <reference types="unplugin-vue2-script-setup/shims" />

declare module '*.vue' {
    import type { ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}

declare module '*.md' {
    import type { ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}

declare module "Prism" 