import requests
from bs4 import BeautifulSoup
import urllib.request
import time


def searchTable():
    url = 'https://www.premierleague.com/tables'
    response = requests.get(url)
    src = response.content
    soup = BeautifulSoup(src, 'lxml')
    table = soup.find("tbody", {"class": "tableBodyContainer"})
    rows = table.findChildren("tr")
    searched_content = []

    for place, element in enumerate(rows, start=1):
        if place % 2 == 1:
            dictionary_of_data = {}
            dictionary_of_data["place"] = place // 2 + 1

            image_href = element.find(
                "img", {"class": "badge-image"}).attrs["src"]
            dictionary_of_data["image_href"] = image_href
            short_name = element.find("span", {"class": "short"}).text
            dictionary_of_data["short_name"] = short_name
            long_name = element.find("span", {"class": "long"}).text
            dictionary_of_data["long_name"] = long_name
            points = element.find("td", {"class": "points"})
            dictionary_of_data["points"] = points.text

            played = element.find("td", {"class": "team"}).findNext('td')
            dictionary_of_data["played"] = played.text
            won = played.findNext("td")
            dictionary_of_data["won"] = won.text
            draw = won.findNext("td")
            dictionary_of_data["draw"] = draw.text
            lost = draw.findNext("td")
            dictionary_of_data["lost"] = lost.text
            goalsFor = lost.findNext("td")
            dictionary_of_data["goalsFor"] = goalsFor.text
            goalsAgainst = goalsFor.findNext("td")
            dictionary_of_data["goalsAgainst"] = goalsAgainst.text

            next = element.find("span", {"class": "nextMatch"})
            print(next.findChildren("img")[0].attrs["src"])
            dictionary_of_data["next"] = next.findChildren("img")[0].attrs["src"]

            form_parent = element.find("td", {"class": "form"})

            form_list = []
            for match in form_parent.findChildren("li"):
                form_list.append(match.attrs['class'][0])

            dictionary_of_data["form"] = form_list
            searched_content.append(dictionary_of_data)

    return searched_content
