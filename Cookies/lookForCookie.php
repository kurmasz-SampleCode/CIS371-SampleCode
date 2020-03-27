<!-- This page looks for cookies set by simpleCookie.php.
     The cookies may or may or not be found depending on
     the specific parameters passed to setcookie.
     See simpleCookie.php for details. -->
<html>
<head>
    <title>Look for Cookie</title>
</head>

<body>

<h1>Looking for cookie</h1>

<?php
if (array_key_exists('nickname', $_COOKIE)) {
    $nn = $_COOKIE['nickname'];
    echo "<p>Hello, $nn.  I see you've been to one of my other web pages.</p>\n";
} else {
    echo "<p>Howdy. It looks like you're new around here.</p>";
}
?>

</html>

<?php
/**
 * Created by IntelliJ IDEA.
 * User: kurmasz
 * Date: 5/15/15
 * Time: 10:44 AM
 */ 