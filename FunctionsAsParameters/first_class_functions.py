"""
first_class_functions.py

Demonstrates the use of functions as parameters to other functions in Python.
(Also demonstrates lambdas and closures.)

GVSU 2025
"""

students = [
    {"first_name": "Ella", "last_name": "Smith", "gpa": 3.6, "credit_hours": 103},
    {"first_name": "Liam", "last_name": "Johnson", "gpa": 2.9, "credit_hours": 60},
    {"first_name": "Noah", "last_name": "Williams", "gpa": 3.8, "credit_hours": 15},
    {"first_name": "Olivia", "last_name": "Brown", "gpa": 3.2, "credit_hours": 75},
    {"first_name": "Emma", "last_name": "Jones", "gpa": 3.4, "credit_hours": 93},
    {"first_name": "Ava", "last_name": "Garcia", "gpa": 1.7, "credit_hours": 50},
    {"first_name": "Sophia", "last_name": "Martinez", "gpa": 2.8, "credit_hours": 80},
    {"first_name": "Isabella", "last_name": "Davis", "gpa": 3.5, "credit_hours": 60},
    {"first_name": "Mia", "last_name": "Rodriguez", "gpa": 1.0, "credit_hours": 40},
    {"first_name": "Amelia", "last_name": "Hernandez", "gpa": 3.9, "credit_hours": 105}
]

#
# Notice that the two functions below are nearly identical. 
# The only difference is the "if" condition.
#
def filter_for_probation(students, threshold):
    answer = []
    for s in students: 
        if s['gpa'] < threshold:
            answer.append(s)
    return answer

def filter_by_credit_hours(students, low, high):
    answer = []
    for s in students:
        if s['credit_hours'] >= low and s['credit_hours'] <= high:
            answer.append(s)
    return answer

#
# If we can pass code as a parameter, we can abstract the 
# two functions above:
#
def filter(students, filter_condition):
    answer = []
    for s in students: 
        if filter_condition(s):
            answer.append(s)
    return answer

def on_probation(s):
    return s['gpa'] < 2.0

def is_senior(s):
    return s['credit_hours'] >= 90

to_warn = filter(students, on_probation)
print(f"On probation: {to_warn}")

seniors = filter(students, is_senior)
print(f"Seniors: {seniors}")

#
# So far, so good.  But, notice that we are writing an entire function that 
# is only used once: as a parameter to another function. 
#
# Python allows you to create anonymous functions. These are called "lambdas"
#
to_warn = filter(students, lambda s : s['gpa'] < 2.0)
print(f"On probation: {to_warn}")

seniors = filter(students, lambda s : s['credit_hours'] >= 90)
print(f"Seniors: {seniors}")

juniors = filter(students, lambda s : s['credit_hours'] >= 60 and s['credit_hours'] < 90)
print(f"Juniors: {juniors}")

# In python, lambdas are limited to a single expression
# This is not true for most programming languages

#
# Closure 
#
# You can use the idea of a closure to build more complex filters.
# The "make_gpa_filter" function "closes" around the threshold 
# variable allowing you to effectively use it inside filter


def make_credit_hour_filter(low, high):
    return lambda s : s['credit_hours'] >= low and s['credit_hours'] < high

freshmen = filter(students, make_credit_hour_filter(0, 30))
sophomore = filter(students, make_credit_hour_filter(30, 60))
junior = filter(students, make_credit_hour_filter(60, 90))
senior = filter(students, make_credit_hour_filter(90, 10000))

print(f"Freshmen {freshmen}")
print(f"Sophomore {sophomore}")
print(f"Junior {junior}")
print(f"Senior {senior}")

