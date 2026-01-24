<html>
    <head>
        <title>Count to Ten</title>
    </head>

    <body>
        <h1>Count to Ten</h1>

        Let's count!

        <ul>
        <?php
            for ($i = 1; $i <= 10; $i++) {
                echo "<li>"  . $i . "</li>";
            }
        ?>
        </ul>
    </body>
</html>
