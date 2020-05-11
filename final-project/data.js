 var _ = require("underscore");


exports.getShows = function(ids) {
  var year = 4000;
  var contents = "";
  _.each(ids, function(i) {
      if(i.year < year){
        year = i.year;
      contents = i;
      }
  });
    return contents;
        }
