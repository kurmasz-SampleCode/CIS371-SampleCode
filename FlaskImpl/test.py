def decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

print("Foo1")

@decorator
def say_whee():
    print("Whee!")

print("Foo2")

say_whee()