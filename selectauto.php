<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="http://localhost/drpp/quirk/lib/jquery/jquery.js"></script>
</head>
<body>

<select name="" id="slc2">
<option value="">item</option>
<option value="1">item 1</option>
<option value="2">item 2</option>
<option value="3">item 3</option>
<option value="4">item 4</option>
<option value="5">item 5</option>
</select>


<script>
/**
* @author Anov Siradj (Mayendra Costanov)
* @version 201508140135PM (date created)
*/
(function($) {
	$.fn.cose = function(ov) {
		if (typeof ov !== undefined) {
			// this.children("option").each(function() {
			// 	if ($(this).prop("value") == ov) {
			// 		$(this).select();
			// 	};
			// });
			// console.log(this);
			// console.log(this.options);
			// console.log(this.children("option"));
			this.children("option").each(function() {
				// console.log($(this).val());
				if ($(this).val() === ov) {
					// console.log("yes");
					$(this).attr("selected","");
					// $(this).select();
					// console.log($(this)[0]);
					// console.log($(this).context);
				};
			});
		};
	}
})(jQuery);


$("#slc2").cose("4");
</script>
</body>
</html>