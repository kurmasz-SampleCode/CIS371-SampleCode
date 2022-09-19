import sys
from jinja2 import Template

input = sys.stdin.read()
template = Template(input)
print(template.render())
