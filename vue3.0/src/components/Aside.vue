<template>
    <div class="content-aside">
        <ul>
            <li v-for="(item, index) in list" :key="index">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: ["vue指令", "路由"]
        };
    }
};
</script>

<style>
.content-aside {
    height: 100%;
    border-right: 2px solid green;
    padding-top: 12px;
}
.content-aside ul li {
    font-size: 18px;
    color: green;
    text-align: center;
    padding: 3px 0;
}

.content-aside ul li:hover {
    background: chocolate;
    color: #fff;
    cursor: pointer;
    animation: move 3s;
}
@keyframes move {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
</style>