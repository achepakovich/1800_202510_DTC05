# Project Name

## Overview

DealHound saves shoppers time and money by organizing and searching for deals on groceries. This app is meant to eliminate the hastle of using flyers or more bloated apps. Key features include:

- Item browser and deal search
- Favourites
- Shopping list
- Linked accounts
- Sort and filter options for deals
  DealHound helps users ease pain-points of shopping frugally. The current goal for this app is to achieve the basic functionality that other methods/apps use in a distilled form. DealHound is developed in HTML, CSS, and Javascript, making use of Bootstrap for interface design.

---

## Features

- Item browser
  - View recommended deals
  - Search for deals
  - Add deals to favourites
- Favourites
  - View favourited deals
  - Remove favourited deals
- Shopping list
  - Add recommended items
  - Add custom items
  - View available deals
- Filters
  - By location
  - By end date
  - By item
  - By price
- Sort deals
  - By location
  - By end date
  - By item
  - By price

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firestore Hosting, Firestore Database

---

## Usage

Example:

1. Open your browser and visit `https://dtc05-e0f80.web.app/`.
2. Sign in or sign up to access personalized features like your shopping list or favourited deals, or;
3. Browse and search deals without personalized features.

---

## Project Structure

```
project-name/
├── images/
│   ├── hound.png
|   ├── shoppingListIcons
|   └── favicon.png
├── scripts/
|   ├── authentication.js
|   ├── batch_write.js
|   ├── favourites.js
|   ├── firestore.js
|   ├── index.js
|   ├── main.js
|   ├── navigateToSearch.js
|   ├── profiles.js
|   ├── saved.js
|   ├── script.js
|   ├── search.js
|   ├── shoppinglist.js
|   ├── skeleton.js
│   └── ui.js
├── styles/
│   └── style.css
├── index.html
├── aboutus.html
├── 404.html
├── favourites.html
├── login.html
├── main.html
├── profiles.html
├── search.html
├── shoppinglist.html
├── README.md
└── .gitignore
```

---

## Contributors

- Hi, my name is **Ben Le** I'm excited about this project because it helps people combat rising prices and enjoy life. Fun fact: I play the piano and my fav artist is Yann Tiersen
- Hi, my name is **Quinn Desforge-Major** I'm a first-time student in CST at BCIT, and I love problem solving and abstract maths. Fun fact: I have a self-taught background in computer graphics, and want to use that in developing beautiful and engaging applications!
- **Andrei Chepakovich** - BCIT CST Student with a passion for creating user-friendly applications. Fun fact: I love to play video games.
- Hi my name is **Mason**. I am looking forward to developing our application! Fun Fact: All the dogs that my family has owned have been Jack Russells

## Limitations and Future Work

### Limitations

- Currently, the app does not allow searching nearest groceries store by location of shopper
- The deals are not populated to database by any APIs
- The user interface (favourite and shoppinglist) can be further enhanced for user experience.
- Search feature is not flexible. It requires specific input for a general category of grocery item to see all related deals (e.g. search 'bread' for all deals pertaining to bread items)

### Future Work

- Input a map to pinpoint the shops on the map and number of available deals at each. 
- Add support for location-based deals detection using GPS.
- Create a dark mode for better usability in low-light conditions.
- Implement flexible search by incorporating Elasticsearch into our current seach feature. This would allow users to search and find deals using a much broader range of terms that might be found in the specific item name.
- ...

---

## Resources

- In-app icons flaticons (http://flaticon.com/)
- Logo homemade!

## Contact

- Ben Le - cle61@my.bcit.ca
- Andrei Chepakovich - achepakovich@my.bcit.ca
- Mason Young - myoung103@my.bcit.ca
- Quinn Desforge-Major - qdesforgemajor@my.bcit.ca

## Acknowledgements

- <a href="https://fonts.google.com/">Google Fonts</a>
- <a href="https://getbootstrap.com/">Bootstrap</a>
