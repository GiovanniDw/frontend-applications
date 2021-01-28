<h1> Frontend Applications </h1>

[Frontend Applications](https://cmda-tt.github.io/course-20-21/courses/frontend-applications/) is a course part of the [Tech Track](https://github.com/cmda-tt) given at [CMDA](https://github.com/cmda), and takes place during Project Information Design.

The Tech Track is an elective track of 3 courses:  
`functional-programming` `frontend-data` `frontend-applications`

Learn more about the [`tech-trach().and().this(course)`](https://github.com/cmda-tt/course-20-21)

> [The Wiki⤴︎](https://github.com/GiovanniDw/frontend-applications/wiki) which documents my process during these courses.

![image](https://github.com/GiovanniDw/frontend-applications/wiki/assets/visual.png)

<h2> Contents</h2>

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Assignment](#assignment)
  - [Concept](#concept)
    - [Research Questions](#research-questions)
- [Data Used](#data-used)
  - [Parking Data](#parking-data)
  - [GeoJson](#geojson)
- [Resources](#resources)
- [Credits](#credits)

## Description

Frontend Applications is the final course of the Tech-Track.  
During the Tech-Track we will be working on an assignment for 'De Volkskrant'.

**Assignment for De Volkskrant:**  
Visualise intresting insights about how The Netherlands deals with cars in different regions. Research and visualise data about parkinglots and parkingspaces, look for changes about this subject and compare differences for time, location and/or prices.

**Assignment for this course:**  
Create a client-side application in JavaScript which dynamically renders data to views using either a front-end framework or system created by you. Reflect on the merits and costs of frameworks together.

## Features

-   [x] Get external data from API.
-   [x] Clean external API data.
-   [x] Transform cleaned data.
-   [x] Use D3 & React to Create Visualisation.
-   [x] Zoom to clicked Province
-   [x] Transform data based on active province
-   [x] Display filtered points on a map, based on hovering over another component with the same value.

## Installation

First, clone the repo to your local machine.

```zsh
$ git clone https://github.com/GiovanniDw/frontend-data.git
```

Then `$ cd/frontend-applications` into the project folder and install.

```zsh
$ npm install
```

Now run the project!

```zsh
$ npm run start
```

## Assignment

> Visualise intresting insights about how The Netherlands deals with cars in different regions. Research and visualise data about parkinglots and parkingspaces, look for changes about this subject and compare differences for time, location and/or prices.

Detailed information about te assignments [the Wiki⤴︎](https://github.com/GiovanniDw/frontend-applications/wiki/Concept)

### Concept

#### Research Questions

-   **Wat voor parkeermogelijkheden zijn er in Nederland?**

    -   Welke parkeermogelijkheid zorgt voor de meeste parkeerplaatsen?

        Wat is het verschil per provincie?

    -   Is er een verband tussen de verschillende soorten parkeermogelijkheden en het gebied?

        Is er een verschil te zien binnen en buiten de randstad?

## Data Used

### Parking Data

The parking data that's used in this project - [api.openparking.nl⤴︎](https://www.parkeerdatacatalogus.nl/#parkeerdata)

```csv
id,name,staticDataUrl,dynamicDataUrl,limitedAccess,uuid,latitude,longitude,city,country_code,province,region,mark,usage,accessPoints,capacity,contactPersons,minimumHeightInMeters,openingTimes,tariffs,Operator
1,P+R Station Appingedam (Appingedam),https://npropendata.rdw.nl//parkingdata/v2/static/fc749565-1fe9-42f0-920a-3b4e718d62f9,,0,fc749565-1fe9-42f0-920a-3b4e718d62f9,53.325488634795,6.8620881539554,Appingedam,nl,Groningen,Noord-Nederland,good,park and ride,1,22,1,0,1,1,Appingedam
```

The `dsv()` fetching function from `d3` returns this Object.

```js
{
	"id": 1,
	"name": "P+R Station Appingedam (Appingedam)",
	"staticDataUrl": "https://npropendata.rdw.nl//parkingdata/v2/static/fc749565-1fe9-42f0-920a-3b4e718d62f9",
	"dynamicDataUrl": "",
	"limitedAccess": "0",
	"uuid": "fc749565-1fe9-42f0-920a-3b4e718d62f9",
	"latitude": 53.325488634795,
	"longitude": 6.8620881539554,
	"city": "Appingedam",
	"country_code": "nl",
	"province": "Groningen",
	"region": "Noord-Nederland",
	"mark": "good",
	"usage": "P+R Parkeerplaats",
	"accessPoints": "1",
	"capacity": 22,
	"contactPersons": "1",
	"minimumHeightInMeters": 0,
	"openingTimes": "1",
	"tariffs": "1",
	"Operator": "Appingedam"
},
{
	...
}

```

After removing values I dont need, this object is returned:

```js
{
	"id": 1,
	"name": "P+R Station Appingedam (Appingedam)",
	"province": "Groningen",
	"usage": "P+R Parkeerplaats",
	"city": "Appingedam",
	"latitude": 53.325488634795,
	"longitude": 6.8620881539554,
	"capacity": 22,
	"minHeign": 0
},{
	...
}

```

### GeoJson

The geojson used in this project - [Cartomap / nl](https://github.com/cartomap/nl)

```js
{"type":"FeatureCollection", "features": [
    {"type":"Feature",
    "geometry":
        {"type":"MultiPolygon","coordinates":[[[[269919,540356],[268516,541104],[...]]]]]},
    "properties":{
        "statcode":"PV20",
        "statnaam":"Groningen",
        "jrstatcode":"2021PV20",
        "rubriek":"provincie",
        "FID":"cbs_provincie_2021_gegeneraliseerd.1"},
        "id":"PV20"},
        {
            ...
        },...

```

## Resources

-   [CMDA Tech Track recource page](https://cmda-tt.github.io/course-20-21/resources/)
-   [Cartomap / nl](https://github.com/cartomap/nl)

## Credits

-   Teachers from the [Tech Track @CMD ⤴︎](https://github.com/cmda-tt/)
-   [adamcarter.dev](https://adamcarter.dev)/[creating-visualizations-with-d3-and-react/](https://adamcarter.dev/creating-visualizations-with-d3-and-react/)
-   [Curran Kelleher](https://github.com/curran)

---

<p align="center">
<a align="left" href="https://github.com/GiovanniDw/frontend-applications/blob/main/LICENSE"> MIT licenced </a>
 <span>|</span> 
 <a align="center" href="https://github.com/GiovanniDw/"><strong> GiovanniDw </strong> </a>
<span>|</span>
<a align="right" href="https://github.com/GiovanniDw/frontend-applications/wiki"> Wiki for more </a>
</p>
