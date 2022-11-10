/// <reference types="vite/client" />
/// <reference types="unplugin-vue2-script-setup/shims" />

declare module "*" {
    import Vue from './vue/dist/vue.esm-browser.prod'
    export default Vue
}
declare global {
    namespace JSX {
      // tslint:disable no-empty-interface
      interface Element extends VNode {}
      // tslint:disable no-empty-interface
      interface ElementClass extends Vue {}
      interface IntrinsicElements {
        [elem: string]: any;
      }
    }
  }