<template>
    <div class="scuti-main-component">
        <RoomView></RoomView>
    </div>
</template>

<script>

    import RoomView from "./components/room/RoomView";

    export default {
        name: "App",
        components: {
            RoomView,
        }
    }
</script>

<style scoped>
    body, html {
        width: 100%;
        height: 100%;
        font-family: Ubuntu,sans-serif;
        margin: 0;
        padding: 0;
        overflow: hidden;
        image-rendering: pixelated;
        -webkit-user-select: none;
        user-select: none;
        background-color: #212225;
    }

    body {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        text-align: left;
    }
</style>