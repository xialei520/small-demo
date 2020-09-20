<?php
$crossUrl = 'https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10';   //向其他域下发出请求
$res = file_get_contents($crossUrl);
echo $res;
?>
