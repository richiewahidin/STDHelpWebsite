from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import unittest
from selenium.webdriver.common.by import By

HOME_PAGE_URL = "https://stdhelp.site/about"

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
        self.assertEqual(next(iter(title)).text, "About STDHelp")

    def test_card_count(self):
        cards = self.soup.find_all('div', class_='card')
        self.assertEqual(len(cards), 13)

    def test_gitlab_link(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        b = False
        gitlabRef = "https://gitlab.com/tommyhuynh02n/cs373-group-20"
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == gitlabRef
        self.assertEqual(True,b)

    def test_postman_link(self):
        elements = self.driver.find_elements(By.TAG_NAME,"a")
        b = False
        postManRef = "https://www.postman.com/bmaloneut/workspace/stdhelp/api/c441db53-30a6-4e53-91ac-4842697ffc21"
        for element in elements:
            href_value = element.get_attribute("href")
            b = b or href_value == postManRef
        self.assertEqual(True,b)

if __name__ == "__main__":
    unittest.main()
