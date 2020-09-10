# MovieRama

A movie details application for the upcoming theatrical productions using https://www.themoviedb.org/ as an endpoint

<h2>Setup:</h2>

- After cloning the application, create a .env file like the sample .env.example and paste your api Key.
- Install dependencies with <b> npm install / yarn add </b>
- Start the project with <b> npm start / yarn start </b>

<h2> Dependencies & decision making </h2>

- React was used for this SPA for the purpose of showcasing advanced redux usage, simulating a large scaling application structure, as well as custom utility hooks(Check helpers)
- For Css pre-processing node-sass was used.
- No external libraries were used for styling or any functionality part.
- Custom caching was used for preventing re-fetches of a movie clicked earlier(Check movieReducer, byId/ids implementation)
- For the situational CORS issue, I was sceptical about connecting an express server, but since in the directions it states it should be a client only Sigle Page Application,
  I used a heroku url proxy(check config.js)

<h2> Coding Practices </h2>

- The code is self-documented, it does not include many comments as the code should be self-described(function names should state how they are used).
- BEM methodology was used for class Naming.
- The tests included in the application are redux funcionality and they were added in the last step, in a more ideal scenario(more time) we would be doing Test driven
  development and we would start with the tests and then build our application to ensure high coverage and also include unit testing .
