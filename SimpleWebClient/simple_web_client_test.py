import unittest
import subprocess
from simple_web_client import parse_url, fetch

class TestParseUrl(unittest.TestCase):

#
# parse_url
#

    def test_valid_url_with_port_and_path(self):
        url = "http://example.com:8080/some/path"
        expected = ("http", "example.com", 8080, "some/path")
        self.assertEqual(parse_url(url), expected)

    def test_valid_url_with_port_and_path_with_slash(self):
        url = "http://example.com:8080/some/path/"
        expected = ("http", "example.com", 8080, "some/path/")
        self.assertEqual(parse_url(url), expected)

    def test_valid_url_without_port_with_path(self):
        url = "https://example.com/some/path"
        expected = ("https", "example.com", None, "some/path")
        self.assertEqual(parse_url(url), expected)

    def test_valid_url_with_port_without_path(self):
        url = "ftp://example.com:21"
        expected = ("ftp", "example.com", 21, '/')
        self.assertEqual(parse_url(url), expected)

    def test_valid_url_with_port_with_slash_without_path(self):
        url = "ftp://example.com:21/"
        expected = ("ftp", "example.com", 21, '/')
        self.assertEqual(parse_url(url), expected)

    def test_valid_url_without_port_and_path(self):
        url = "http://example.com"
        expected = ("http", "example.com", None, '/')
        self.assertEqual(parse_url(url), expected)

    def test_valid_url_with_slash_without_port_and_path(self):
        url = "http://example.com"
        expected = ("http", "example.com", None, '/')
        self.assertEqual(parse_url(url), expected)

    def test_invalid_url_missing_protocol(self):
        url = "example.com"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_missing_hostname(self):
        url = "http:///some/path"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_with_port_missing_hostname(self):
        url = "http://:8838/some/path"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_no_slash_after_port(self):
        url = "http://myhost.com:8838some/path"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_query_string(self):
        url = "http://myhost.com:8838/some/path?key=value"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_query_string_no_path(self):
        url = "http://myhost.com:8838?key=value"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_query_string_no_path_no_port(self):
        url = "http://myhost.com?key=value"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_empty_query_string(self):
        url = "http://myhost.com:8838/some/path?key=value"
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_invalid_url_empty_string(self):
        url = ""
        with self.assertRaises(ValueError):
            parse_url(url)

    def test_edge_case_protocol_with_numbers(self):
        url = "h2://example.com:8080/path"
        expected = ("h2", "example.com", 8080, "path")
        self.assertEqual(parse_url(url), expected)

    def test_edge_case_uncommon_protocol(self):
        url = "custom_protocol://example.com"
        expected = ("custom_protocol", "example.com", None, '/')
        self.assertEqual(parse_url(url), expected)


    def test_protocol_returned_lower_case(self):
        url = "HTTP://example.com"
        expected = ("http", "example.com", None, '/')
        self.assertEqual(parse_url(url), expected)

    def test_protocol_returned_lower_case_from_mixed(self):
        url = "HttP://example.com"
        expected = ("http", "example.com", None, '/')
        self.assertEqual(parse_url(url), expected)

#
# fetch
#

    def test_fetch_http_content(self):
        # Use `curl` to fetch the real data from example.com
        curl_output = subprocess.check_output(['curl', '-s', 'http://example.com'])
        curl_output_lines = curl_output.decode('utf-8').splitlines(keepends=True)
        
        # Call the `fetch` function
        response, headers, content = fetch("http://example.com")

        self.assertEqual(curl_output_lines, content)


    def test_fetch_https_content(self):
        # Use `curl` to fetch the real data from example.com
        curl_output = subprocess.check_output(['curl', '-s', 'https://example.com'])
        curl_output_lines = curl_output.decode('utf-8').splitlines(keepends=True)
        
        # Call the `fetch` function
        response, headers, content = fetch("https://example.com")

        self.assertEqual(curl_output_lines, content)     


    def test_fetch_non_trivial_https_content(self):
        url = 'https://kurmasgvsu.github.io'

        # Use `curl` to fetch the real data from example.com
        curl_output = subprocess.check_output(['curl', '-s', url])
        curl_output_lines = curl_output.decode('utf-8').splitlines(keepends=True)
        
        # Call the `fetch` function
        response, headers, content = fetch(url)

        self.assertEqual(curl_output_lines, content) 


if __name__ == "__main__":#
    unittest.main()
