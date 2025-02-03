
#
# A python decorator replaces  
#
def surprise(func):
    def new_function(*args, **kwargs):
        print("Surprise!")
    return new_function

@surprise
def greet():
    print("Hello there. Nice day.")

# The @surprise decorator replaced greet
# with new_function.
greet()
exit()
print("-------")

#
# At first this doesn't look very useful; but, 
# the new function can actually do clever things
# like wrap the original function:
#
def in_out(func):
    def wrapper(*args, **kwargs):
        print("IN")
        func(*args, **kwargs)
        print("OUT")
    return wrapper

@in_out
def say_hello(name):
    print(f"Hello, {name}!")

say_hello('George')
print("-------")

#
# @ can be followed by any expression, as long as 
# it evaluates to a callable (i.e., a function)
#
use_surprise = input("Shall I use the surprise decorator? ").lower().startswith('y')
@(surprise if use_surprise else in_out)
def say_greetings(name):
    print(f"Greetings, {name}!")

say_greetings("Sam")
print("-------")

#
# A more common approach to decorators is to use them 
# to call a function.
#
# The announce function is not a decorator. It _returns_
# a decorator. The decorator it returns prints a message 
# when it is applied, but then returns the function it 
# decorates, which means the decorator has no lasting 
# effect on the function.
#
# I know that must be confusing (it was for me); but, 
# this is the pattern that Flask's @app.route() decorator
# uses. 
def announce(adjective):
    def decorator(func):
        print(f"You just defined a {adjective} function!")
        return func
    return decorator

@announce('boring')
def sum_of_three(a, b, c):
    return a + b + c

@announce('useless')
def huh_what():
    return None