

names = ['Prof. Engelsma', 'Prof. Leidig', 'Prof. Wolffe', 'Prof. Moore', 'Prof. Scripps', 'Prof. Carrier']

puts <<HERE
<html>
<body>
<h2>Hello, World!</h2>

<p>Today, I'm randomly being mean to #{names.sample}.</p>

(from, Ruby)
</body>
</html>
HERE