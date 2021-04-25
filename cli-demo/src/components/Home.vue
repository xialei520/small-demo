<template>
  <div>
    <header>home</header>
	<input type="text" v-model="value" @blur="onBlur">
  </div>
</template>

<script>
export default {
	data(){
		return {
			value: ''
		}
	},
	methods: {
		onBlur(){
			let emoji = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
			if(emoji.test(this.value)){
				alert('不能包含emoji表情')
			}
		}
	}

}
</script>

<style>

</style>