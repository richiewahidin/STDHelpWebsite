from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import unittest
from selenium.webdriver.common.by import By

HOME_PAGE_URL = "https://stdhelp.site/prevalence"

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
    
    #Tests the title for the homepage.
    def test_home_page_heading(self):
        title = self.soup.find('h1')

        self.assertEqual(len(title), 1)
        self.assertEqual(next(iter(title)).text, "Prevalence of STDs from 2003-2021")

    def test_card_clickable(self):
        card = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "card"))
        ) 
        #Before URL
        initial_url = self.driver.current_url
        card.click()
        #After URL
        new_url = self.driver.current_url
        #URL changed?
        self.assertNotEqual(initial_url, new_url)

    def test_button(self):
        #elements = self.driver.find_elements(By.CLASS_NAME,"dropdown-button dropdown")
        elements = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "container"))
        )
        x = (elements.find_elements(By.TAG_NAME,"button"))
        self.assertGreater(len(x), 0)

if __name__ == "__main__":
    unittest.main()
