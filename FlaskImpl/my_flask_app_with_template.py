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


# This decorator is just a short-cut for calling app.add_route
@app.route('/current_temperature_query')
def current_temperature_query():
    parameters = my_flask.request.args

    html_lines = []
    html_lines.append('<h1>Current Temperature</h1>')

    if not 'zip' in parameters:
        html_lines.append('Unable to display temperature: No zip provided')
    else:
        place=fetch_temp_data.info_for_zip(parameters['zip'])
        temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
        html_lines.append(f"Currently, it is {temperature}&deg;F in {place['place name']}, {place['state abbreviation']}")

    html_lines.append('<hr>')
    html_lines.append('<h1>Query Parameters</h1>')
    html_lines.append('<ul>')
    for key, value in parameters.items():
        html_lines.append(f"<li>{key}: {value}")
    html_lines.append('</ul>')
 
    return "\n".join(html_lines)

@app.route(r'/current_temperature_route/(\d{5})')
def current_temperature_path(zip_code):
    place=fetch_temp_data.info_for_zip(zip_code)
    temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
            
    html_lines = []
    html_lines.append('<h1>Current Temperature</h1>')
    html_lines.append(f"Currently, it is {temperature}&deg;F in {place['place name']}, {place['state abbreviation']}.")

    return "\n".join(html_lines)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run my custom "pretend" Flask server.')
    parser.add_argument('--port', '-p', type=int, default=my_flask.DEFAULT_PORT, 
                        help=f'Port to run the server on (default: {my_flask.DEFAULT_PORT})')
    args = parser.parse_args()

    app.run(port=args.port)









