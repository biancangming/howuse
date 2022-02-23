/// <reference types="vite/client" />
/// <reference types="unplugin-vue2-script-setup/shims" />

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}