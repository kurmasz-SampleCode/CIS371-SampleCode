# An example usage of the "mini_express" module

import mini_express

#
# Define action when route is requested
#

def root_route(params):
    return "Hello, Everybody. Welcome to my web site."

def about_route(params):
    return "I am eight years old and like fishing."

def help_route(params):
    return "There isn't anything to help with. This site doesn't do anything :)"

def calculator_route(params):
    sum = float(params['a']) + float(params['b'])
    return f"Thanks for using the calculator.\n{params['a']} + {params['b']} = {sum}"


#
# Configure and launch server
#

me = mini_express.MiniExpress()

# me.add_route('/', root_route)
# me.add_route('/about', about_route)
# me.add_route('/help', help_route)
# me.add_route('/calculator', calculator_route)

me.make_routes()

me.serve(8084)