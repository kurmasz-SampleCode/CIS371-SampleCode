<!-- Shows all the variables that are automatically set up and available
     for your use.  Also demonstrates how the key/value pairs in query
     strings are placed into variables.  Append a query string to the
     URL and see what happens.
-->
<?php
$_SERVER;
$_ENV; # This line simply "touches" the $_SERVER superglobal variable to make sure that it gets loaded in $GLOBALS.

# Dump the top two levels of an associative array
function dump_array($the_array)
{
    echo "<ul>";

    foreach ($the_array as $key1 => $value1) {
        echo "<li><span class='key'>$key1</span>";

        # If the value is itself an array, then print that as well.
        if (is_array($value1)) {
            echo "<ul>";
            foreach ($value1 as $key2 => $value2) {
                $pvalue = $value2;
                if (is_array($value2)) {
                    $pvalue = "&lt;an array&gt;";
                }
                echo "<li><span class='key'>$key2</span><span class='value'> $pvalue</span></li>\n";
            } # end inner foreach ($value1 as $key2 => $value2)
            echo "</ul></li>\n";
        } else {
            echo "<span class='value'> $value1</span></li>\n";
        }
    } # end outer foreach ($the_array as $key1 => $value1)
    echo "</ul>\n";
}

?>

<html>

<head>
    <title>PHP Environment</title>
    <style>
        .key {
            display: inline-block;
            min-width: 225px;
            color: blue;
        }
    </style>
</head>

<body>
    <h1>Environment Variables</h1>

    These are the variables that the web server passes to the PHP process:

    <?php dump_array($_SERVER) ?>


    <hr>

    <h1>Query String</h1>


    <p>As a convenience for programmers, PHP parses the <code>QUERY_STRING</code> variable and places it in <code>$_GET</code>.

        <table>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
            <?php
            foreach ($_GET as $key => $value) {
                echo "<tr><td>$key</td><td>$value</td></tr>\n";
            }
            ?>
        </table>
        <hr>

        <h1>Globals</h1>

        <p>A list of global variables.</p>

        <?php dump_array($GLOBALS); ?>

        </ul>

        <hr>

</body>

</html>