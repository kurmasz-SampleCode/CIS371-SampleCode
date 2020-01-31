<?php $colors = ['red', 'green', 'blue', 'orange', 'pink', 'purple', 'violet', 'lightgreen', 'lightred'];

function make_li($color) {
  return "<li><span class='color-$color'>$color</span></li>";
}

?>

<html>
<head>
<title>Color Samples using PHP</title>
<style>


/* You can use PHP to generate CSS */
<?php foreach ($colors as $color) {  ?>
  .color-<?php echo  $color; ?> {
    color: <?php echo $color;?>;
  }
<?php } ?>
</style>

<body>

<h1> List Colors (PHP)</h1>

This section simply lists the color names because the code is simpler.

<ul>
<?php foreach ($colors as $color) {
   echo "<li>$color</li>\n";
 }
?>
</ul>

<h1> Show Colors </h1>
This section shows the colors.  Same ideas as above, but the code is a little harder to read.

<ul>
<?php foreach ($colors as $color) {
   echo "<li><span class='color-$color'>$color</span></li>\n";
 }
?> 
</ul>


<h1> Show Colors (v2) </h1>
This section also shows the colors, but uses the <code>map</code> method. Some may find this code easier to follow.

<ul>
<?php echo join("\n", array_map('make_li', $colors)); ?>  
</ul>


</body>
</html>