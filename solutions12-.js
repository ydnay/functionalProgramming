const movieLists = [
  {
    name: "Instant Queue",
    videos : [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxarts": [
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxarts": [
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
      }
    ]
  },
  {
    name: "New Releases",
    videos: [
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxarts": [
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxarts": [
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
          { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
      }
    ]
  }
];

Array.prototype.myConcatAll = function(arr) {
  const res = [];
  this.forEach(nestedArr => nestedArr.forEach(elem => res.push(elem)));

  return res;
}

// Exercise 12: Retrieve id, title, and a 150x200 box art url for every video

// You've managed to flatten a tree that's two levels deep, let's try for three! Let's say that instead of a single 
// boxart url on each video, we had a collection of boxart objects, each with a different size and url. Create a query 
// that selects {id, title, boxart} for every video in the movieLists. This time though, the boxart property in the 
// result will be the url of the boxart object with dimensions of 150x200px. Let's see if you can solve this problem 
// with map(), concatAll(), and filter().

const retrieveIdTitlePlus = arr => arr.
  map(genre => 
    genre.videos.
      map(video => 
        video.boxarts.
          filter(boxart => boxart.width === 150 && boxart.height === 200).
          map(boxart => ({
            id: video.id,
            title: video.title,
            boxart: boxart.url
          })))).
      myConcatAll().
  myConcatAll();

// const retrieveIdTitlePlus = function(arr) {
//   const res = [];
//   arr.map(genre => genre.videos.map(movie => res.push({ id: movie.id, title: movie.title, boxart: movie.boxarts.filter(
//     pic => (pic.width === 150 && pic.height === 200)
//   )})));

//   return res;
// }

// console.log(retrieveIdTitlePlus(movieLists)); 

// Exercise 13: Implement concatMap()

// Nearly every time we flatten a tree we chain map() and concatAll(). Sometimes, if we're dealing with a tree several 
// levels deep, we'll repeat this combination many times in our code. To save on typing, let's create a concatMap 
// function that's just a map operation, followed by a concatAll.

Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
  return this.
    map(function(item) {
      return projectionFunctionThatReturnsArray(item);
    }).
    myConcatAll();
};


var spanishFrenchEnglishWords = [ ["cero","rien","zero"], ["uno","un","one"], ["dos","deux","two"] ];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0,1,2].
  concatMap(function(index) {
    return spanishFrenchEnglishWords[index];
  });

// console.log(JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]');

// Exercise 14: Use concatMap() to retrieve id, title, and 150x200 box art url for every video

// Let's repeat the exercise we just performed. However this time we'll simplify the code by replacing the 
// map().concatAll() calls with concatMap().

const retrieveIdTitlePlus2 = arr => arr.
  concatMap(movieList =>
    movieList.videos.
      concatMap(video =>
        video.boxarts.
        filter(boxart => boxart.width === 150 && boxart.height === 200).
        map(boxart => ({
          id: video.id,
          title: video. title,
          boxart: boxart.url
        }))));

// console.log(retrieveIdTitlePlus2(movieLists));

// Reducing Arrays
// Sometimes we need to perform an operation on more than one item in the array at the same time. For example, let's
// say we need to find the largest integer in an array. We can't use a filter() operation, because it only examines 
// one item at a time. To find the largest integer we need to compare items in the array to each other.

// One approach could be to select an item in the array as the assumed largest number (perhaps the first item), and 
// then compare that value to every other item in the array. Each time we come across a number that was larger than 
// our assumed largest number, we'd replace it with the larger value, and continue the process until the entire array
// was traversed.

// If we replaced the specific size comparison with a closure, we could write a function that handled the array 
// traversal process for us. At each step our function would apply the closure to the last value and the current
// value and use the result as the last value the next time. Finally we'd be left with only one value. This process 
// is known as reducing because we reduce many values to a single value.

// Exercise 15: Use forEach to find the largest box art

// In this example we use forEach to find the largest box art. Each time we examine a new boxart we update a variable
// with the currently known maximumSize. If the boxart is smaller than the maximum size, we discard it. If it's 
// larger, we keep track of it. Finally we're left with a single boxart which must necessarily be the largest.

const boxarts = [
  { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
  { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
  { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
  { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
];

const getLargestBoxart = function(arr) {
  let maxSize = -1,
      currentSize,
      largestBoxart;

  boxarts.forEach(boxart => {
    currentSize = boxart.width * boxart.height;
    if(currentSize > maxSize) {
      largestBoxart = boxart;
    }
  })

  return largestBoxart;
}

console.log(getLargestBoxart(boxarts));
