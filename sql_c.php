<?php
/**
*
* @author Anov Siradj (Mayendra Costanov) <anov.siradj22@(gmail|live).com>
* @version 201508131005AM (date created)
* @link (anovsiradj|ne-a-r).blogspot.com
*
* sqlc.
* generating rythm dynamic key and value for MySQL:insert query
*
* @param array, or explicit _POST.
* @return array, [0] the key and [1] the value.
*
*/

// tbl(dumm) = row(id,d_name,d_birthdate,d_gender,d_status);
function sqlc($arry) {
	$nk = array();
	$nv = array();
	foreach ($arry as $k => $v) {
		$nk[] = $k;
		$nv[] = "'{$v}'";
	}
	$nk2 = implode(",",$nk);
	$nv2 = implode(",",$nv);
	return array($nk2,$nv2);
}

$q = new mysqli("localhost","root","","sqlc");
$post = array(
	"d_name"=>"anovsiradj",
	"d_birthdate"=>date("Y-m-d"),
	"d_gender"=>"laki2x",
	"d_status"=>"sendiri"
);
$data = sqlc($post);
$q->query("INSERT INTO dumm({$data[0]}) VALUES({$data[1]})");

