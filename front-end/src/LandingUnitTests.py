from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import unittest

HOME_PAGE_URL = "https://stdhelp.site"

class TestGui(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        options = Options()
        options.add_argument("--no-sandbox")
        options.add_argument("--headless")
        cls.driver = webdriver.Chrome(options=options)
        cls.driver.get(HOME_PAGE_URL)
        cls.soup = BeautifulSoup(cls.driver.page_source, 'html.parser')
    
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
    
    # Tests the title for the homepage.
    def test_home_page_heading(self):
        title = self.soup.find('h1')

        self.assertEqual(len(title), 1)
        self.assertEqual(next(iter(title)).text, "STDHelp")

    def test_home_page_heading3(self):
        title = self.soup.find('h3')

        self.assertEqual(len(title), 1)
        self.assertEqual(next(iter(title)).text, "Here for you")
        

if __name__ == "__main__":
    unittest.main()
