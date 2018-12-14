// Zipping Arrays
// Sometimes we need to combine two arrays by progressively taking an item from each and 
// combining the pair. If you visualize a zipper, where each side is an array, and each 
// tooth is an item, you'll have a good idea of how the zip operation works.

// Exercise 21: Combine videos and bookmarks by index
// Use a for loop to traverse the videos and bookmarks array at the same time. For each
// video and bookmark pair, create a {videoId, bookmarkId} pair and add it to the 
// videoIdAndBookmarkIdPairs array.

const videos = [
  {
    "id": 70111470,
    "title": "Die Hard",
    "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.0,
  },
  {
    "id": 654356453,
    "title": "Bad Boys",
    "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 5.0,
  },
  {
    "id": 65432445,
    "title": "The Chamber",
    "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.0,
  },
  {
    "id": 675465,
    "title": "Fracture",
    "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 5.0,
  }
];

const bookmarks = [
  {id: 470, time: 23432},
  {id: 453, time: 234324},
  {id: 445, time: 987834}
];

const pairIds = function() {
  let counter;
  const videoIdAndBookmarkIdPairs = [];

  for(counter = 0; counter < Math.min(videos.length, bookmarks.length); counter++) {
    videoIdAndBookmarkIdPairs.push({ videoId: videos[counter].id, bookmarkId: bookmarks[counter].id });
  }

  return videoIdAndBookmarkIdPairs;
}

// console.log(pairIds());

// Exercise 22: Implement zip
// Let's add a static zip() function to the Array type. The zip function accepts a combiner function, traverses each 
// array at the same time, and calls the combiner function on the current item on the left-hand-side and 
// right-hand-side. The zip function requires an item from each array in order to call the combiner function, 
// therefore the array returned by zip will only be as large as the smallest input array.

// JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]'

Array.zip = function(left, right, combinerFunction) {
  let counter,
    results = [];

  for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
    // Add code here to apply the combinerFunction to the left and right-hand items in the respective arrays
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};

// console.log(JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]');

// Exercise 23: Combine videos and bookmarks by index
// Let's repeat exercise 21, but this time lets use your new zip() function. For each video and 
// bookmark pair, create a {videoId, bookmarkId} pair.

const pairIds2 = () => {
  return Array.
    zip(
      videos, 
      bookmarks, 
      (video, bookmark) => ({ videoId: video.id, bookmarkId: bookmark.id}));
}

console.log(pairIds2());
