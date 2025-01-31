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




def filter_by_gpa(students, threshold):
    answer = []
    for s in students:
        if s['gpa'] > threshold:
            answer.append(s)
    return answer

def filter_by_credit_hours(students, threshold):
    answer = []
    for s in students:
        if s['credit_hours'] > threshold:
            answer.append(s)
    return answer


def filter(students, filter_fn):
    answer = []
    for s in students:
        if filter_fn(s):
            answer.append(s)
    return answer

def deans_list(student):
    return student['gpa'] >= 3.0

def senior(student):
    return student['credit_hours'] >= 90

filter(students, deans_list)
filter(students, senior)
