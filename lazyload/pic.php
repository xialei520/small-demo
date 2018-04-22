<?php
$crossUrl = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/200/1';   //向其他域下发出请求
$res = file_get_contents($crossUrl);
echo $res;
?>
