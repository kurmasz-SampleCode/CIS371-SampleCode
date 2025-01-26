"""
my_flask_using_add_route.rb

Demonstrates the use of MyFlask by calling the add_route method explicitly

GVSU CIS 371 W25
"""

import my_flask
import fetch_temp_data
import argparse

app = my_flask.MyFlask()

def current_allendale_temperature():
    temperature = fetch_temp_data.temp_for_location('42.9675','-85.9509')
        
    html_lines = []
    html_lines.append('<h1>Current Temperature</h1>')
    html_lines.append(f"Currently, it is {temperature}&deg;F in Allendale, MI.")
    return("\n".join(html_lines))
app.add_route('/current_allendale_temperature', current_allendale_temperature)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run a Flask server to serve files from the public directory.')
    parser.add_argument('--port', '-p', type=int, default=my_flask.DEFAULT_PORT, 
                        help=f'Port to run the server on (default: {my_flask.DEFAULT_PORT})')
    args = parser.parse_args()

    app.run(port=args.port)









