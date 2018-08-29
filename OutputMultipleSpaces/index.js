var str = `ni    hao
    jjjj`;
if(str.indexOf(' ')){
    console.log('有空格')
}else{

    console.log(没有空格)
}
console.log(str.replace( / /g, '&nbsp;'))