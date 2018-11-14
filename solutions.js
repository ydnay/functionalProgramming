/*
Working with Arrays
The Array is Javascript's only collection type. Arrays are everywhere. We're going to add the five functions to the 
Array type, and in the process make it much more powerful and useful. As a matter of fact, Array already has the map, 
filter, and reduce functions! However we're going to reimplement these functions as a learning exercise.

This section will follow a pattern. First we'll solve problems the way you probably learned in school, or on your 
own by reading other people's code. In other words, we'll transform collections into new collections using loops and 
statements. Then we'll implement one of the five functions, and then use it to solve the same problem again without 
the loop. Once we've learned the five functions, you'll learn how to combine them to solve complex problems with 
very little code. The first two exercises have been completed in advance, but please look them over carefully!
*/

// Traversing an Array
// Exercise 1: Print all the names in an array

const names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];

const traverseArr = function(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// traverseArr(names);

// Exercise 2: Use forEach to print all the names in an array
// Let's repeat the previous exercise using the forEach function.

const traverseArr1 = function(arr) {
  names.forEach(name => console.log(name));
}

// traverseArr1(names);

// Projecting Arrays
// Applying a function to a value and creating a new value is called a projection. To project one array into another, 
// we apply a projection function to each item in the array and collect the results in a new array.

// Exercise 3: Project an array of videos into an array of {id,title} pairs using forEach()
// For each video, add a projected {id, title} pair to the videoAndTitlePairs array.

const newReleases = [
  {
    "id": 70111470,
    "title": "Die Hard",
    "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.0,
    "bookmark": []
  },
  {
    "id": 654356453,
    "title": "Bad Boys",
    "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 5.0,
    "bookmark": [{ id: 432534, time: 65876586 }]
  },
  {
    "id": 65432445,
    "title": "The Chamber",
    "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.0,
    "bookmark": []
  },
  {
    "id": 675465,
    "title": "Fracture",
    "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 5.0,
    "bookmark": [{ id: 432534, time: 65876586 }]
  }
]

const projectArr = function(arr) {
  const res = [];
  arr.forEach(obj => res.push({id: obj.id, title: obj.title}));
  return res;
}

// console.log(projectArr(newReleases));

// Exercise 4: Implement map()
// To make projections easier, let's add a map() function to the Array type. Map accepts the projection function to be 
// applied to each item in the source array, and returns the projected array.

Array.prototype.myMap = function(projectionFunct) {
  const res = [];
  this.forEach(elem => res.push(projectionFunct(elem)));

  return res;
}

// console.log(JSON.stringify([1,2,3].map(function(x) { return x + 1; })) === '[2,3,4]');
// console.log(JSON.stringify([1,2,3].myMap(function(x) { return x + 1; })) === '[2,3,4]');

// Exercise 5: Use map() to project an array of videos into an array of {id,title} pairs
// Let's repeat the exercise of collecting {id, title} pairs for each video in the newReleases array, but this time 
// we'll use our map function.

const projectArr1 = arr => arr.map(elem => ({id: elem.id, title: elem.title}));

// console.log(projectArr1(newReleases));

// Filtering Arrays
// Like projection, filtering an array is also a very common operation. To filter an array we apply a test to each 
// item in the array and collect the items that pass into a new array.

// Exercise 6: Use forEach() to collect only those videos with a rating of 5.0
// Use forEach() to loop through the videos in the newReleases array and, if a video has a rating of 5.0, add it to 
// the videos array.

const collectElem = arr => {
  const res = [];
  arr.forEach(elem => {
    if (elem.rating === 5) {
      res.push(elem);
    }
  })

  return res;
}

// console.log(collectElem(newReleases));

// Exercise 7: Implement filter()
// To make filtering easier, let's add a filter() function to the Array type. The filter() function accepts a 
// predicate. A predicate is a function that accepts an item in the array, and returns a boolean indicating whether 
// the item shoul be retained in the new array.

Array.prototype.myFilter = function(predicateFunct) {
  const res = [];
  this.forEach(function(elem) {
    if (predicateFunct(elem)) {
      res.push(elem);
    }
  })

  return res;
}

// console.log(JSON.stringify([1,2,3].filter(function(x) { return x > 2})) === "[3]");
// console.log(JSON.stringify([1,2,3].myFilter(function(x) { return x > 2})) === "[3]");

// Query Data by Chaining Method Calls
// Exercise 8: Chain filter and map to collect the ids of videos that have a rating of 5.0

const collectElem1 = arr => arr.
  filter(elem => elem.rating === 5).
  map(elem => elem.id);

// console.log(collectElem1(newReleases));

// Querying Trees
// Sometimes, in addition to flat arrays, we need to query trees. Trees pose a challenge because we need to flatten 
// them into arrays in order to apply filter() and map() operations on them. In this section we'll define a 
// concatAll() function that we can combine with map() and filter() to query trees.

// Exercise 9: Flatten the movieLists array into an array of video ids
// Let's start by using two nested forEach loops to collect the id of every video in the two-dimensional movieLists 
// array.

const movieLists = [
  {
    name: "New Releases",
    videos: [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
      }
    ]
  },
  {
    name: "Dramas",
    videos: [
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
      }
    ]
  }
];

const flattenArr = arr => {
  const res = [];
  arr.forEach(elem => elem.videos.forEach(video => res.push(video.id)));

  return res;
}

console.log(flattenArr(movieLists));
