<?php

// Demonstrates the use of cookies.

$names = ["spots", "lefty", "mac", "Neon"];

// check to see if a cookie has been set with the key of "nickname"
if (!array_key_exists("nickname", $_COOKIE)) {

    // If not, assume this is the first visit to the web page.
    $new_visitor = true;

    // Generate a nickname at random
    $nickname = $names[rand(0, count($names) - 1)] . rand(3, 24);


    # Use default parameters.  Cookie expires at the end of the session.
    # To verify, close the browser, re-open it and see what happens.
    setcookie('nickname', $nickname);

    # Expire:
    # Set cookie to expire in 30 seconds.  Refresh a few times, then wait.
    //setcookie('nickname', $nickname, time() + 20);

    # Path:
    # Specify what other pages can see this cookie.
    # First, notice that neither http:/www.cis.gvsu.edu/~kurmasz/lookForCookie.php, nor
    # http://www.cis.gvsu.edu/~kurmasz2/lookForCookie.php can see the nickname. However, 
    # http://www.cis.gvsu.edu/~kurmasz/CS371_SampleCode/CookiesAndSessions/lookForCookie.php can see it.
    #
    # Next, uncomment the line below and notice that all three pages can see it.
    #
    # Finally, change "/" to /~kurmasz/ and notice that the page at ~kurmasz2 can no longer see the cookie
    //setcookie('nickname', $nickname, time() + 60, "/");

    # Secure only:
    # Set cookie to only send over a secure connection.
    # Notice that the cookie only works when using https
    #setcookie('nickname', $nickname, time() + 60, "/", "cis.gvsu.edu", true);

    # HttpOnly
    # Specifies that cookie is not available in Javascript
    # Open a console, type "document.cookie" and notice that "nickname" isn't present, but "visits" is.
     //setcookie('nickname', $nickname, time() + 60, "/", "cis.gvsu.edu", false, true);


    setcookie('visits', 0);
} else {

    // If the cookie "nickname" has been set, use its value in the web page.
    $new_visitor = false;
    $nickname = $_COOKIE['nickname'];

    // Also, increment and re-set the value of the 'visits' cookie.
    $visits = intval($_COOKIE['visits']) + 1;
    setcookie('visits', $visits);
}


?>

<html>
<head>
    <title>Simple Cookie Demo</title>
</head>
<body>
<h1>Cookie Demo</h1>

<?php

if ($new_visitor)
    echo "<p>It looks like you are new here.  I'll call you \"$nickname\".</p>\n";
else {
    echo "<p>Welcome back, ${nickname}.  This is visit number $visits for you.</p>";
}
?>

<hr>
<p>Check out the <a href="http://php.net/manual/en/function.setcookie.php"><code>setcookie</code> API</a>.</p>

<ul>
    <li><code>name</code></li>
    <li><code>value</code></li>
    <li><code>expire</code> (time at which cookie expires. Set to 0 for cookie to expire at end of session.)</li>
    <li><code>domain</code> (the subdomain for which this cookie is available (e.g., <code>www.cis.gvsu.edu</code>)</li>
    <li><code>secure</code> (only sent when using <code>https</code></li>
    <li><code>httpOnly</code> (when set to <code>true</code>, Javascript can't access this cookie)</li>

</ul>
</body>


</html>