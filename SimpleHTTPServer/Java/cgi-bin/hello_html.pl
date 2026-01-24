use POSIX;

my $time = strftime "%H:%M", localtime time;

print <<HERE
<html>
<body>
<h2> Hello, World!</h2>

<p>At the tone time time (at the server) will be $time.</p>

(from perl)
</body>
</html>
HERE
