module.exports = {
    urlToJson(url){
        let dataObj = {}
        if(url){
            url.split('&').map(item => {
                let arr = item.split('=')
                dataObj[`${arr[0]}`] = `${arr[1]}`
            })
        }
        return dataObj
    },
    receivePostData(ctx){
        return new Promise((resolve, reject) => {

            let str = '';
            ctx.req.on('data', function(chunk){
                str += chunk;
            })
            ctx.req.on('end', (chunk) =>{
              
                resolve(this.urlToJson(str))
            })
        })
    }
} 
    