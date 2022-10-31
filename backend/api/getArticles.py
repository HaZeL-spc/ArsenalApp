import requests
from bs4 import BeautifulSoup
import urllib.request
import time


def searchArsenal():
    url = 'https://www.arsenal.com/news'
    response = requests.get(url)
    src = response.content
    soup = BeautifulSoup(src, 'lxml')
    mydivs = soup.findAll("a", {"class": "article-card__wrapper"})
    searched_content = []

    for article_card in mydivs[:5]:
        dictionary_of_data = {}
        # print(article_card['href'])
        dictionary_of_data['href'] = "https://www.arsenal.com/" + \
            article_card['href']
        children = article_card.findChildren(
            'div', {'class': "article-card__image"})[0]

        dictionary_of_data['image'] = "https://www.arsenal.com/" + \
            children['data-src']

        url = f'https://www.arsenal.com{article_card["href"]}'
        response = requests.get(url)
        src = response.content
        soup = BeautifulSoup(src, 'lxml')
        myArticle = soup.findAll(
            "h1", {"class": "article-card-header__title"})
        firstLines = soup.find(
            "div", {"class": "article-body"}).findChildren("p")

        dictionary_of_data["articleAbout"] = firstLines[0].text.strip()
        dictionary_of_data["articleHeader"] = myArticle[0].attrs['title']

        searched_content.append(dictionary_of_data)

    return searched_content


def searchArticles(name):
    if name == "arsenal":
        return searchArsenal()


searchArticles("arsenal")
