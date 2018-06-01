<?php
$crossUrl = 'http://ip.ws.126.net/ipquery';   //向其他域下发出请求
$res = file_get_contents($crossUrl);
echo $res;
?>
