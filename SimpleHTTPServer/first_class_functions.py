
students = [
    {"first_name": "Ella", "last_name": "Smith", "gpa": 3.6, "credit_hours": 103},
    {"first_name": "Liam", "last_name": "Johnson", "gpa": 2.9, "credit_hours": 60},
    {"first_name": "Noah", "last_name": "Williams", "gpa": 3.8, "credit_hours": 30},
    {"first_name": "Olivia", "last_name": "Brown", "gpa": 3.2, "credit_hours": 75},
    {"first_name": "Emma", "last_name": "Jones", "gpa": 3.4, "credit_hours": 93},
    {"first_name": "Ava", "last_name": "Garcia", "gpa": 1.7, "credit_hours": 50},
    {"first_name": "Sophia", "last_name": "Martinez", "gpa": 2.8, "credit_hours": 80},
    {"first_name": "Isabella", "last_name": "Davis", "gpa": 3.5, "credit_hours": 60},
    {"first_name": "Mia", "last_name": "Rodriguez", "gpa": 1.0, "credit_hours": 40},
    {"first_name": "Amelia", "last_name": "Hernandez", "gpa": 3.9, "credit_hours": 105}
]


def filter(the_list, the_filter):
    answer = []
    for item in the_list:
        if the_filter(item):
            answer.append(item)
    return answer


def is_senior(student):
    return student['credit_hours'] >= 90

def on_probation(student):
    return student['gpa'] < 2.0


seniors = filter(students, is_senior)
print(f"Seniors: {seniors}")

to_warn = filter(students, on_probation)
print(f"On probation: {to_warn}")