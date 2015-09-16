<?php
echo "<pre>";
$sql = mysqli_connect("localhost","root","","sqlc");

if (isset($_GET['save'])) {
	goto do_save;
}

$query = mysqli_query($sql, "SELECT * FROM dumm");
while ($result = mysqli_fetch_assoc($query)) {

	echo "<form action=\"?save&tbl=&id={$result['id']}\" method=\"post\">";

	foreach ($result as $k => $v) {
		if (strripos($k,"id") === false) {
			echo "{$k}: <input name=\"{$k}\" value=\"{$v}\">".PHP_EOL;
		}
	}

	echo "<input type=\"submit\" value=\"save\">";
	echo "</form>";
}
// ============================================================================
do_save:
if (!isset($_GET['save'])) {
	goto do_last;
}
include 'sql_u.php';
$data = sqlu($_POST);
mysqli_query($sql, "UPDATE dumm SET {$data} WHERE id='{$_GET['id']}'");
$back = basename(__FILE__);
echo "data: {$_GET['id']}, saved. <a href=\"{$back}\">back</a>";

do_last:
// nothing do here. huehuehuehue..,