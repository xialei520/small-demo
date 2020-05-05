<template>
    <div id="app">
        <div class="title">
            <p @click="jump(1)">手势登陆</p>
            <p @click="jump(2)">其他</p>
            <p @click="jump(3)">其他</p>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    methods: {
        jump(res) {
            if (res === 1 || res === 2 || res === 3) {
                this.$router.push({ name: "gesture" });
            } else {
                this.$router.push({ name: "gesture" });
            }
        }
    }
};
</script>

<style lang="css">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.title {
    width: 100%;
    display: flex;
}
.title p {
    flex: 1;
}
</style>
