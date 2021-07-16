
<template>
    <router-view></router-view>
</template>
<script>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    setup() {
        onMounted(() => {
            console.log(route);
            console.log(router);
        });
        const route = useRoute();
        const router = useRouter();
        return {};
    }
};
</script>

<style>
.content-body {
}
</style>