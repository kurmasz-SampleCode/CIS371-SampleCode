<!-- This file demonstrates
    (1) How to set up a simple HTML form
    (2) How to use PHP to access the data
-->
<html>

<head>
    <title>Form Demo</title>
    <style type="text/css">
        #get,
        #post {
            vertical-align: top;
        }

        .key {
            display: inline-block;
            min-width: 225px;
            color: blue;
        }
    </style>
    </style>
</head>

<body>

    <h1>Form Demo</h1>

    <h2>Questions:</h2>

    <ul>
        <li>Can you get data in both <code>$_GET</code> and <code>$_POST</code> at the same time? If so, how? If not, why
            not?
        </li>
        <li>What happens if you leave a text box empty?</li>
        <li>Can you "unselect" all the radio buttons? If so, how. If not, why not?</li>
        <li>Can you select "Fred" and "Barney" at the same time? Can you select "Barney" and "Trumpet" at the same time?
            What's the difference?
        </li>
        <li>What happens if you unselect all the check boxes?</li>
        <li>How does PHP treat checkboxes differently when doing a POST than when doing a GET?</li>
        <li>How can you tell which submit button was pushed?</li>
    </ul>


    <table>
        <tr>
            <td id="get">
                <fieldset>
                    <legend>GET form</legend>
                    <form action="formDemo.php" method="get">
                        "text" type input named <code>theTopOne</code>
                        <input type="text" name="theTopOne" value="Value for Top input" /><br />

                        "text" type input named <code>theSecondOne</code>
                        <input type="text" name="theSecondOne" value="Value for Input #2" /><br />

                        Radio buttons named "flintstones":
                        Fred <input type="radio" name="flintstones" value="iChooseFred" checked="checked" />
                        Barney <input type="radio" name="flintstones" value="iChooseBarney">
                        Wilma <input type="radio" name="flintstones" value="iChooseWilma"></br>

                        Radio buttons named "instruments":
                        Saxophone <input type="radio" name="instrument" value="sax" />
                        Trumpet <input type="radio" name="instrument" value="tpt">
                        Piano <input type="radio" name="instrument" value="piano" checked="checked"></br>

                        Checkboxes named "courses":
                        451 <input type="checkbox" name="course451" value="451" />
                        452 <input type="checkbox" name="course452" value="452" />
                        457 <input type="checkbox" name="course457" value="457" /><br />

                        <input type="submit" name="getSubmit1" value="Submit Button 1" />
                        <input type="submit" name="getSubmit2" value="Submit Button 2" />

                    </form>
                </fieldset>

                <table>
                    <tr>
                        <th colspan=2>Contents of <code>$_GET</code></th>
                    </tr>
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


            </td>
            <td id="post">

                <fieldset>
                    <legend>POST form</legend>
                    <form action="formDemo.php" method="post">
                        "text" type input named <code>theFirstPost</code>
                        <input type="text" name="theFirstPost" value="Value for first POST input" /><br />
                        "text" type input named <code>theSecondPost</code>
                        <input type="text" name="theSecondPost" value="Value for Post #2" /><br />
                        Radio buttons named "interest":
                        Cool <input type="radio" name="interest" value="itsCool" checked="checked" />
                        OK <input type="radio" name="interest" value="itsOK">
                        Boring <input type="radio" name="interest" value="itsBoring"></br>

                        Radio buttons named "bestState":
                        Georgia <input type="radio" name="bestState" value="GA" />
                        Michigan <input type="radio" name="bestState" value="MI">
                        California <input type="radio" name="bestState" value="CA" checked="checked"></br>

                        Checkboxes named "IScourses":
                        260 <input type="checkbox" name="IScourses[]" value="cis260" checked="checked" />
                        333 <input type="checkbox" name="IScourses[]" value="cis333" />
                        463 <input type="checkbox" name="IScourses[]" value="cis463" /><br />

                        <input type="submit" name="postSubmit1" value="Submit Button 1" />
                        <input type="submit" name="postSubmit2" value="Submit Button 2" />

                    </form>
                </fieldset>

                <table>
                    <tr>
                        <th colspan=2>Contents of <code>$_POST</code></th>
                    </tr>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    <?php
                    foreach ($_POST as $key => $value) {
                        $printMe = $value;
                        if (is_array($value)) {
                            $printMe = "[" . implode($value, ", ") . "]";
                        }
                        echo "<tr><td>$key</td><td>$printMe</td></tr>\n";
                    }
                    ?>
                </table>


            </td>
    </table>

    <hr>

    Content of request body:

    <?php echo file_get_contents("php://input"); ?>
    <hr>



<?php
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
 dump_array($_SERVER); ?>
</body>

</html>