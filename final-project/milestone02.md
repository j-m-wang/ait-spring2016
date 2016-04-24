# Milestone 2
## Prototype With Some Implemented Functionality

* URL that shows form:
  * _http://localhost:3000/saved_
    * Form allows users to either input the city name or latitude/longitude of the location they're trying to save
  * _http://localhost:3000/location_
    * Form allows users to see the weather of the location they input
    * This form data is not saved!
* URL that shows page reading the data:
  * _http://localhost:3000/saved_
    * Saved locations will populate the page every time the user views the '/saved' page.
* URL/directory for research topic:
  * _http://localhost:3000/_, _views/main.hbs_
    * Bootstrap is running on all the pages (nav bar/responsive qualities)
  * _http://localhost:3000/saved_, _http://localhost:3000/location_
    * Google Maps JavaScript API partially implemented to create interactive maps
    * User's can add locations either through the map or inputing the city name/coordinates
    * gmaps.js didn't properly work/incorporate everything I wanted to use, so I switched to Google Maps

###### A note- I didn't use scaffolding so use the following to run the code.
```javascript
npm install
nodemon app.js
```
