<?php
/**
*
* @author Anov Siradj (Mayendra Costanov) <anov.siradj22@(gmail|live).com>
* @version 201508240951AM (date created)
* @link (anovsiradj|ne-a-r).blogspot.com
*
* sqlu.
* generating rythm dynamic setter key and value for MySQL:update query
*
* @param array, or explicit _POST.
* @return array, instant setter column.
*
*/

// tbl(dumm) = row(id,d_name,d_birthdate,d_gender,d_status);
function sqlu($arry) {
	$kv = array();
	foreach ($arry as $k => $v) {
		$kv[] = "{$k}='{$v}'";
	}
	$kv2 = implode(",",$kv);
	return $kv2;
}

$q = new mysqli("localhost","root","","sqlc");
$post = array(
	"d_name"=>"arashi",
	"d_status"=>"kegelapan"
);
$data = sqlu($post);
if ($q->query("UPDATE dumm SET {$data} WHERE id='3'")) {
	echo "<pre>berhasil";
};

