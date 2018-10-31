<template>
    <div class="head">
        <a href="#/index" class="item1">{{tab1}}</a>
        <a href="#/home" class="item2">{{tab2}}</a>

    </div>

    
</template>
<script>
export default {
  data() {
    return {
       tab1: '首页',
       tab2: 'home'
    };
  }
};
</script>
<style lang="scss" scoped>
    $size : .2rem;
    .head{
        width: 100%;
        height: 1rem;
        display: flex;
        a{
            flex:1;
            line-height: 1rem;
            text-align: center;
             color: red;
        }
    }
    a{
       
        font-size:  $size;
    }
</style>

