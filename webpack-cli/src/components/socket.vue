<template>
    <div class="content">
        <div>
            <input type="text" v-model="text" />
            <button @click="send">发送</button>
        </div>
        <div>
            <ul v-for="(item,index) in chatData" :key="index">
                <li>{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
const io = require("socket.io-client");

export default {
    name: "HelloWorld",
    data() {
        return {
            chatData: [],
            text: ""
        };
    },
    methods: {
        send() {
            const socket = io.connect("http://localhost");

            socket.emit("send", { text: this.text });
            socket.on("receive", data => {
                console.log("我的年龄是：" + data.data);
                this.chatData.push(data.data);
                socket.close();
            });
        }
    },
    mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
