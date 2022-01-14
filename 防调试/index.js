(() => {
    function block(){
        setInterval(() => {
            (function(){
                return false;
            }['constructor']('debugger'))['call']()
        }, 50)
    }
    try {
        block()
    }catch(e){}
})