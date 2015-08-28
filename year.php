<?php
/**
*
* @author Anov Siradj (Mayendra Costanov) <anov.siradj22@(gmail|live).com>
* @version 20150812 (date created)
* @link (anovsiradj|ne-a-r).blogspot.com
*
* yearRange.
* knowing age by passing start date
*
* @param start date, format Y-m-d.
* @return probable age in year.
*
*/
function yearRange($date) {
	$start = strtotime($date);
	$range = time()-$start;
	$yearinsecond = 31104000;
	$res = floor($range/$yearinsecond);
	return $res;
}

echo yearRange('1996-05-22'); // it's my bithdate. hahahaha...