let datefns = require("date-fns");
let axios = require("axios");

let reportSearchUrl =
  "https://www.reddit.com/r/ffxiv/search.json?q=title:fashion report results&sort=new&restrict_sr=on";
axios
  .get(reportSearchUrl)
  .then(function(res) {
    let results = res.data.data.children;
    // console.log(res.data.data.children);
    results.map(result => {
      if (result.data.author === "kaiyoko") {
        console.log(result.data.title);
      }
    });
  })
  .catch(function(err) {
    console.log(err);
  });
