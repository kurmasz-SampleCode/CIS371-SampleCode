<?php
$names = ["Nolan", "Chris", "Steven", "Laura"];
?>

<html>

<head>
    <title>Hello, World</title>
</head>

<body>
<h1>Hello, World!</h1>


<p>List of names in the array:</p>

<ul>
    <?php
    foreach ($names as $name) {
        echo "<li>$name</li>\n";
    }
    ?>
</ul>
<hr>
</body>

</html>
