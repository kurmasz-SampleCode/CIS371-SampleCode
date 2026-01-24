"""
  This is a very simple demonstration of the Flask framework.
  It provides the same services as dynamic_content_server

  GVSU CIS 371 W25    
"""

import flask
import argparse
import json
import os
import fetch_temp_data

#
# The web server code (i.e., the part that handles HTTP 
# communications and other low-level details) is contained
# in the app object. At this point, the user can focus on 
# generating the content.
#
app = flask.Flask(__name__)

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')

#
# Simple static HTML content
#
@app.route('/static_content')
def static_content():
    # Note: I'm using a list and append instead of simply using += on a bunch of strings 
    # because the append is more efficient. However, for a program this size, it doesn't 
    # really matter.
    html_lines = []
    html_lines.append("<h1>First Example</h1>")
    html_lines.append("<p>This is a simple, boring route that simply serves static html content</p>")
    html_lines.append("<p>Notice that the content here is automatically placed inside of a <code>&lt;body&gt;</code> element.</p>")
    return "\n".join(html_lines)


#
# Simple static plain text response
#
@app.route('/static_plain_text')
def plaintext():
    # Plain text response
    return flask.Response("This response is plain text.", mimetype='text/plain')

#
# Simple static json (i.e., data) response
#
@app.route('/static_json')
def static_json():
    # JSON response
    data = {
        'fname': 'Harrison',
        'lname': 'Ford',
        'occupation': 'actor',
        'birth': {
            'month': 7,
            'day': 13,
            'year': 1942
        }
    }
    return flask.Response(json.dumps(data), mimetype='application/json')

#
# Dynamic HTML response 
# (Response generated "by hand")
#
@app.route('/current_allendale_temperature')
def current_allendale_temperature():
    temperature = fetch_temp_data.temp_for_location('42.9675','-85.9509')
        
    html_lines = []
    html_lines.append('<h1>Current Temperature</h1>')
    html_lines.append(f"Currently, it is {temperature}&deg;F in Allendale, MI.")
    return("\n".join(html_lines))

#
# Dynamic HTML response using query string
# (Response generated "by hand")
#
@app.route('/current_temperature_query')
def current_temperature_query():
    parameters = flask.request.args
    if not 'zip' in parameters:
        return ('Unable to display temperature: No zip provided')
    else:
        place=fetch_temp_data.info_for_zip(parameters['zip'])
        temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
       
        # IMPORTANT: Don't use this pattern in your own code! 
        # This example is only here to demonstrate how flask interacts with jinja.
        # When writing your own code, use the pattern in thet next route that calls 
        # render_template
        with open(f"templates/temperature_and_query.j2") as file: 
            import jinja2
            input = file.read()
            template = jinja2.Template(input)
            return template.render(temperature=temperature, 
                                place_name=place['place name'], 
                                place_state=place['state abbreviation'],
                                name=parameters.get('name', None),
                                query_dict = parameters)

#
# Route using part of the path as a parameter
# (Response generated using jinja)
#
@app.route('/current_temperature_route/<int:zip_code>')
def current_temperature_route(zip_code):
    place=fetch_temp_data.info_for_zip(zip_code)
    temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
            
    return flask.render_template("temperature.j2", temperature=temperature, 
                                place_name=place['place name'], 
                                place_state=place['state abbreviation'])

#
# Handle a POST request
#
@app.route('/current_temperature_post', methods=['POST'])
def current_temperature_post():
    zip_code = flask.request.form.get('zip')
    return current_temperature_route(zip_code)

#
# Serve any html file .
#
@app.route('/<path:basename>.html')
def serve_html(basename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return flask.send_from_directory(root_dir, f"{basename}.html")

#
# Default route. Returns a specific HTML file.
#
@app.route('/')
def root_route():
    return serve_html('all_routes')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run a Flask server to serve files from the public directory.')
    parser.add_argument('--port', '-p', type=int, default=5000, help='Port to run the server on (default: 5000)')
    args = parser.parse_args()

    app.run(debug=True, port=args.port)


  