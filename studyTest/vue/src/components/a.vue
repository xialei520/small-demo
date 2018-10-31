<template>
    <div>{{text}}
         <p>{{content}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            text: '这是a组件',
            content: ''
        }
    },
    mounted(){
        console.log(this.$store);
        this.text = this.$store.state.name;
        this.$store.commit('setName', '9999')
        this.content = this.$store.state.title;
    }
}
</script>
<style>
    div{
        color: yellow;
        font-size: .4rem;
    }
</style>


