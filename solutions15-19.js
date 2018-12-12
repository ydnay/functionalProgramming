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

// console.log(getLargestBoxart(boxarts));

// Exercise 16: Implement reduce()

// Let's add a reduce() function to the Array type. Like map. Take note this is different from the reduce in ES5,
// which returns a value instead of an Array!

Array.prototype.myReduce = function(combiner, initialValue) {
  var counter,
      accumulatedValue; 

  // If the array is empty, do nothing
  if (this.length === 0) {
    return this;
  }
  else {
    // If the user didn't pass an initial value, use the first item.
    if (arguments.length === 1) {
      counter = 1;
      accumulatedValue = this[0];
    }
    else if (arguments.length >= 2) {
      counter = 0;
      accumulatedValue = initialValue;
    }
    else {
      throw "Invalid arguments.";
    }

    // Loop through the array, feeding the current value and the result of
    // the previous computation back into the combiner function until
    // we've exhausted the entire array and are left with only one function.
    while(counter < this.length) {
      accumulatedValue = combiner(accumulatedValue, this[counter])
      counter++;
    }

    return [accumulatedValue];
  }
};

// console.log([1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; })); //=== [6];
// console.log([1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }, 10)); //=== [16];
// console.log([].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; })); // === []

// Exercise 17: Retrieve the largest rating.

// Let's use our new reduce function to isolate the largest value in an array of ratings.

const ratings = [2,3,1,4,5];

const getRating = arr => arr.myReduce((acc, cur) => acc > cur ? acc : cur)
const getRating2 = arr => arr.reduce((acc, cur) => acc > cur ? acc : cur)

// console.log(getRating(ratings));
// console.log(getRating2(ratings));

// Exercise 18: Retrieve url of the largest boxart

// Let's try combining reduce() with map() to reduce multiple boxart objects to a single value: the url of the 
// largest box art.

const getLargestBoxart2 = arr => arr.
  myReduce((acc, cur) => acc.width * acc.height > cur.width * cur.height ? acc : cur).
  map(boxart => boxart.url)

// console.log(getLargestBoxart2(boxarts));

// Exercise 19: Reducing with an initial value

// Sometimes when we reduce an array, we want the reduced value to be a different type than the items stored in the 
// array. Let's say we have an array of videos and we want to reduce them to a single map where the key is the video 
// id and the value is the video's title.

const videos = [
  {
    "id": 65432445,
    "title": "The Chamber"
  },
  {
    "id": 675465,
    "title": "Fracture"
  },
  {
    "id": 70111470,
    "title": "Die Hard"
  },
  {
    "id": 654356453,
    "title": "Bad Boys"
  }
];

function reduceWithIniVal(arr) {
  return arr.myReduce(function(acc, cur) {
    const clone = Object.create(acc);
    clone[cur.id] = cur.title;

    return Object.assign(acc, clone);
  }, {});
}

console.log(reduceWithIniVal(videos));