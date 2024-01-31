# An example usage of the "mini_express" module

import mini_express

def root_route(params):
    return "Hello, Everybody. Welcome to my web site."

def about_route(params):
    return "I am eight years old and like fishing."

def help_route(params):
    return "There isn't anything to help with. This site doesn't do anything :)"

def calculator_route(params):
    sum = float(params['a']) + float(params['b'])
    return f"Thanks for using the calculator.\n{params['a']} + {params['b']} = {sum}"

routes = {
    '/': root_route,
    '/about': about_route,
    '/help': help_route,
    '/calculator': calculator_route
}

mini_express.serve(routes, 8083)