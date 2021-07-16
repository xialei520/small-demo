<template>
    <div class="content">
        <Aside class="content-aside" />
        <Body class="content-body" />
    </div>
</template>

<script>
import Aside from "./Aside.vue";
import Body from "./Body.vue";
export default {
    name: "",
    components: {
        Aside,
        Body
    }
};
</script>

<style  >
.content {
    height: 85vh;
    display: flex;
}
.content .content-aside {
    flex: 1;
}
.content .content-body {
    flex: 5;
}
</style>