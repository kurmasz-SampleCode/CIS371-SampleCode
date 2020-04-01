// Demonstrates several ways to use Promises.
// Note: If you want to use the Rails app as the back-end
// be sure to load the .html page from port 3000.

// Also, fetch is a browser function, not a Node.js 
// function, so this won't work as a stand-alone.


function myFetch(url) {
  console.log("Fetching " + url);
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject({ status: xhr.status, response: xhr.response });
        }
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  });
}

const apiURL = 'https://railsapi-kurmasz.codeanyapp.com';

/*
// Successful fetch #1
myFetch(`${apiURL}/authors`).then((data) => {
  console.log("Got good data");
  console.log(data);
});


// Successful fetch #2
myFetch(`${apiURL}/authors/1`).then((data) => {
  console.log("Got more good data");
  console.log(data);
});


// Fetch fails with 404
myFetch(`${apiURL}/authors/4`).then((data) => {
  console.log("Got unexpected good data");
  console.log(data);
}).catch(({ status, response }) => {
  console.log("Fetch failed with status " + status);
  console.log(response);
});

// Fetch fails with 0
myFetch(`${apiURL}z/authors/4`).then((data) => {
  console.log("Got unexpected good data");
  console.log(data);
}).catch(({ status, response }) => {
  console.log("Fetch failed with status " + status);
  console.log(response);
});

//
// Chain calls together
//
myFetch(`${apiURL}/authors`).then((rawData) => {
  let data = JSON.parse(rawData);
  let lastID = data[data.length - 1].id;
  return myFetch(`${apiURL}/authors/${lastID}`);
}).then((data2) => {
  console.log("The last author");
  console.log(data2);
})


//
// Chain calls together and gracefully handle errors
//
myFetch(`${apiURL}/authors`).then((rawData) => {
  let data = JSON.parse("fred" + rawData); // should be a parse error
  let lastID = data[data.length - 1].id;
  return myFetch(`${apiURL}/authors/${lastID}`);
}).then((data2) => {
  console.log("The last author");
  console.log(data2);
}).catch((obj) => {
  console.log("Caught an error");
  console.log(obj);
});

*/


// 
// Make calls in parallel.
//
let desiredAuthors = [1, 5, 7];

let promises = desiredAuthors.map((id) => myFetch(`${apiURL}/authors/${id}`));

Promise.all(promises).then((data) => {
  console.log("All promises done");
  console.log(data)
}).catch((err) => {
  console.log("Some promise failed.")
  console.log(err);
});
