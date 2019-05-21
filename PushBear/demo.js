function weixin_notify($header,$content){
    $SENDKEY = "12157-aefc4169dda6288e8b5542db850e2139";//微信通知KEY
    file_get_contents(`https://pushbear.ftqq.com/sub?sendkey=${SENDKEY}&text=${urlencode($header)}&desp=${urlencode($content)}`);
}

weixin_notify('kkkkkkkkkkkkkkkkk', 'lllllllllllllllll')