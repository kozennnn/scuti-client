<template>
    <div class="loading-container">
        <div class="loading-duck-container">
            <keyframes loop="true">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_01.png">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_02.png">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_03.png">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_04.png">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_05.png">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_06.png">
                <img duration="200" src="../../../../public/images/loading_screen/connecting_duck_07.png">
            </keyframes>
        </div>
    </div>
</template>

<script>
    import {Keyframes} from 'vue-keyframes';
    import Vue from 'vue'
    import RoomView from "../room/RoomView";

    Vue.use(Keyframes);

    export default {
        name: "LoadingView",

    }
</script>

<style scoped>
    .loading-container {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgb(33,34,37);
        background: radial-gradient(circle, rgba(33,34,37,1) 0%, rgba(0,0,0,1) 100%);
    }
    .loading-duck-container {
        width: 326px;
        height: 174px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>