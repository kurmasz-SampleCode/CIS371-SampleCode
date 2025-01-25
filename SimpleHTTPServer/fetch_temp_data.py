"""
fetch_demo_data.py

Use various APIs to fetch data for various demos.

GVSU CIS 371 W25
"""
import json
import urllib.request

def temp_for_location(latitude, longitude):
    """
    Use the open-meteo API to fetch the current temperature at a given location
    """
    url = f'https://api.open-meteo.com/v1/forecast?latitude={latitude}5&longitude={longitude}&current=temperature_2m&temperature_unit=fahrenheit'

    # Open a URL
    with urllib.request.urlopen(url) as response:
        content = response.read()
    
    data = json.loads(content.decode())
    return data['current']['temperature_2m']

def info_for_zip(zip_code):
    """ 
    Use the zippopatm API to get the location of a US zip code.
    """
    zip_url = f"https://api.zippopotam.us/us/{zip_code}"
    print(zip_url)
    with urllib.request.urlopen(zip_url) as response:
        content = response.read()
        zip_data = json.loads(content.decode())
    return zip_data['places'][0]