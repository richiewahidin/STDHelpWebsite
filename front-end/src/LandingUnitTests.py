from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import unittest
from selenium.webdriver.common.by import By

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

    def test_navbar_about(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        ref = "https://stdhelp.site/about"
        b= False
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == ref
        self.assertEqual(True,b)

    def test_navbar_counties(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        ref = "https://stdhelp.site/counties"
        b= False
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == ref
        self.assertEqual(True,b)

    def test_navbar_Locator(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        ref = "https://stdhelp.site/locator"
        b= False
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == ref
        self.assertEqual(True,b)

    def test_navbar_prevalence(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        ref = "https://stdhelp.site/prevalence"
        b= False
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == ref
        self.assertEqual(True,b)

    def test_navbar_home(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        ref = "https://stdhelp.site/"
        b= False
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == ref
            print(href_value)
        self.assertEqual(True,b)       

if __name__ == "__main__":
    unittest.main()
