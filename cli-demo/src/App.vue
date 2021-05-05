<template>
    <div>
        <header>welcome to Vue !</header>
        <div class="layout">
            <div class="aside">
                <p v-for="(item, index) in list" :key="index" @click="onClick(item)">{{item.title}}</p>
            </div>
             <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Aside from "@/components/Aside"
export default {
    data(){
        return {
            list: [
                {
                    key: '01',
                    title: 'demo1',
                    router: '/demo1'
                },
                 {
                    key: '02',
                    title: 'demo2',
                    router: '/demo2'
                }
            ]
        }
    },
    components: {
        Aside
    },
    methods: {
        onClick(item){
            console.log(this)
            this.$router.push(item.title)
        }
    }
}
</script>
<style lang="less">
@import './base.less';

header{
    font-size: 30px;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    line-height: 100px;
}
.layout{
    display: flex;
    .aside{
        width: 15%;
        background: chocolate;
        p{
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            color: #fff
           
               

        }
        p:hover{
            background: green;
        }
    }
}
</style>