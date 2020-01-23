

target = "kurmasz"

# Globals are gross.  Don't use them :)
$found_at = []

def find_on_machine(person, machine)
  output = `ssh #{machine} who | grep #{person}`

  #puts "#{machine} returned =>#{output}<= (#{output.length})"
  $found_at << machine if output.length > 0
end

clusters = {
  arch: 10,
}

threads = []
clusters.each do |cluster, num_machines|
  (1..num_machines).each do |num|
    fnum = "%02d" % [num]
    threads << Thread.new {find_on_machine(target, "#{cluster}#{fnum}.cis.gvsu.edu")}
  end
end

threads.each {|t| t.join}
list = $found_at.map { |machine| "<li>#{machine}</li>" }.join('\n')

puts File.read("#{__dir__}/findSomeone.thtml").gsub('$target', target).gsub('$list', list)