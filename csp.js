/* Common constraints */
var allDiff = function(assignment, diff_variables) {
  diff_variables = diff_variables || Object.keys(assignment);
  console.log(diff_variables);
  for (var i = 0; i < diff_variables.length; i++) {
    var v1 = diff_variables[i];
    for (var j = 0; j < diff_variables.length; j++) {
      var v2 = diff_variables[j];
      if (v1 === v2) {
	continue;
      }
      if (assignment[v1].assigned === assignment[v2].assigned) {
	return false;
      }
    }
  }
  return true;
};

/* Basic Australia CSP. */
var AustraliaCSP = (function() {
  var colors = [ "RED", "BLUE", "GREEN" ];
  var regions = { "WA" : colors,
		  "NT" : colors,
		  "Q" : colors,
		  "NSW" : colors,
		  "V" : colors,
		  "SA" : colors,
		  "T" : colors };
  var constraints = [
    function(x) { return allDiff(x, ["NT", "WA"]); },
    function(x) { return allDiff(x, ["NT", "SA"]); },
    function(x) { return allDiff(x, ["NT", "Q"]); },
    function(x) { return allDiff(x, ["SA", "WA"]); },
    function(x) { return allDiff(x, ["SA", "Q"]); },
    function(x) { return allDiff(x, ["SA", "NSW"]); },
    function(x) { return allDiff(x, ["SA", "V"]); },
    function(x) { return allDiff(x, ["Q", "NSW"]); },
    function(x) { return allDiff(x, ["V", "NSW"]); }
  ];
  return new App.CSP(regions, constraints);
})();
