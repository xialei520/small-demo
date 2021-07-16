<template>
    <div>
        <Header />
        <Content />
    </div>
</template>

<script>
import "./style/base.css";
import Content from "./components/Content.vue";
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header,
        Content
    }
};
</script>

<style>
body {
}
</style>
