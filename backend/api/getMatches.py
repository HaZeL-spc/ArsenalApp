from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

PATH = "C:\Program Files (x86)\chromedriver.exe"
chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(PATH, options=chrome_options)


driver.get("https://www.premierleague.com/clubs/1/Arsenal/results")
sleep(5)
html = driver.execute_script(
    "return document.getElementsByTagName('html')[0].innerHTML")

print(html)
