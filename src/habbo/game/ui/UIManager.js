
import Vue from 'vue'
import App from "../../../ui/App";

export class UIManager {
    constructor() {
        this.vue = new Vue({el: '#app', render: h => h(App)});
    }

    getVue() {
        return this.vue;
    }
}