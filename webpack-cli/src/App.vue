<template>
    <div id="app">
        <!-- <div class="title">
            <p @click="jump(1)">手势登陆</p>
            <p @click="jump(2)">其他</p>
            <p @click="jump(3)">其他</p>
        </div> -->
        <aside class="aside-bar">
            <p class="aside-item" v-for="(item, index) in list" :key="index" @click="jump(item)">{{item.title}}</p>
        </aside>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return {
            list: [
                {
                    key: '01',
                    title: '手势登陆'
                }, 
                {
                    key: '02',
                    title: 'test1'
                }, 
                {
                    key: '03',
                    title: 'test2'
                }
            ]
        }
    },
    methods: {
        jump(item) {
            if (item.key === 1 || item.key === 2) {
                this.$router.push({ name: "gesture" });
            } else {
                this.$router.push({ name: "socket" });
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
.aside-bar{
    width: 20%;
    border: 1px solid red;
}
</style>
