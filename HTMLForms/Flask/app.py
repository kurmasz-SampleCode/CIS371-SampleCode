"""
  Demonstrates the different input choices for an HTML form.

  GVSU CIS 371 W25    
"""

import flask
import argparse

app = flask.Flask(__name__)


#
# Default route. Returns a specific HTML file.
#
@app.route('/', methods=['GET', 'POST'])
def root_route():
    # Note: flask.request.args and flask.request.form are both 
    # ImmutableMultiDict because there may be more than one input
    # in the form with the same name --- especially with checkboxes
    print(flask.request.args)
    return flask.render_template('form_demo.j2',
                                 query_string = flask.request.args,
                                 form_data = flask.request.form)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run a Flask server to serve files from the public directory.')
    parser.add_argument('--port', '-p', type=int, default=5000, help='Port to run the server on (default: 5000)')
    args = parser.parse_args()

    app.run(debug=True, port=args.port)


  