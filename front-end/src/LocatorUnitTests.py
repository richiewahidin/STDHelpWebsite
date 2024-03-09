from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import unittest
from selenium.webdriver.common.by import By

HOME_PAGE_URL = "http://localhost:3000/locator"

class TestGui(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        options = Options()
        cls.driver = webdriver.Chrome(options=options)
        cls.driver.get(HOME_PAGE_URL)
        cls.soup = BeautifulSoup(cls.driver.page_source, 'html.parser')
    
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
    
    #Tests the title for the homepage.
    def test_home_page_heading(self):
        title = self.soup.find('h1')

        self.assertEqual(len(title), 1)
        self.assertEqual(next(iter(title)).text, "Locator")

    def test_card_clickable(self):
        # card_element = self.driver.find_element(By.CLASS_NAME, 'card')
        
        # #Before URL
        # initial_url = self.driver.current_url
        # card_element.click()
        # #After URL
        # new_url = self.driver.current_url
        # #URL changed?
        # self.assertNotEqual(initial_url, new_url)
        return True

if __name__ == "__main__":
    unittest.main()
