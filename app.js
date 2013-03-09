goog.require('goog.object');

var App = App || {};

/* A Constraint is a function that takes an object of the variables as an
 * argument and returns whether or not the Constraint has been
 * satisfied.
 *
 * Each variable X_i has an associated domain D_i represented by the list
 * of values it can take on. For now, we assume that the domains are finite
 * and can be represented by such a list.
 */

/* Creates a new Constraint Satisfaction Problem. A CSP is defined by its
 * variables and constraints.
 *
 * --variables = object of the form { 'variable': [domain1, domain2, ...] }
 * --constraints = list of functions that defines the constraints between
 *                 variables
 */
App.CSP = function(variables, constraints) {
  this.variables = variables;
  this.constraints = constraints;
};

App.CSP.prototype.assignmentComplete = function(assignment) {
  for (var i in assignment) {
    if (!i.assigned) {
      return false;
    }
  }
  return true;
};

App.CSP.prototype.emptyAssignment = function() {
  var result = {};
  for (var variable in this.variables) {
    result[variable] = { assigned : false };
    result[variable]['domain'] = this.variables[variable];
  }
  return result;
};

App.CSP.prototype.satisfiedBy = function(assignment) {
  return this.assignmentComplete(assignment) &&
    this.constraints.every(function(element, index, array) {
      return element(assignment);
    });
};

/* --- Naive search algorithms --- */
/*
 * An assignment is defined slightly unintuitively as we need to keep track
 * of variable domains. An assignment is defined as an object
 *    { var : { assigned : value/undefined, domain : [...] }, ... }
 */

/* A naive search uses standard search algorithms to try and compute an
 * answer. We can vary the strategy of each search by changing the type of
 * data structure we use for the fringe.
 *
 * Regardless of strategy, however, naive search fails to be useful for
 * CSPs because they do not take advantage of the fact that CSPs are
 * commutative. This means that, instead of a runtime of O(d^n), they
 * instead have a runtime of O(n!d^n). Further, they do not use any sort of
 * logic to infer possible outcomes.
 */
App.naive_search = function(csp) {
  fringe = [];
  fringe.push(csp.emptyAssignment());
  var keys = Object.keys(csp.variables)
  while (true) {
    if (!fringe.length) {
      return "FAILURE"  // TOOD - failure signal
    }
    var assignment = fringe.pop();  // node = {'v1':assign_1, 'v2':assign_2, ...}
    if (csp.satisfiedBy(assignment)) {
      return assignment;
    }
    var next_variable = keys.filter(function(element) {
      return !assignment[element].assigned;
    })[0];
    console.log(next_variable);
    if (next_variable) {
      for (var i = 0; i < csp.variables[next_variable].length; i++) {
	var clone = goog.object.clone(assignment);
	clone[next_variable].assigned = csp.variables[next_variable][i];
	fringe.push(clone);
      }
    }
  }
};

/* --- Backtracking search --- */

/* Backtracking search drastically improves on naive search as it not only
 * takes advantage of commutativity, but also checks constraints as it
 * progresses deeper into the tree, allowing it to prune large portions of
 * the tree. Combined with inference techniques, it becomes one of the main
 * ways we solve generic CSPs.
 */
function backtrack(assignment, csp, select_variable,
		   order_domain_values, inference) {
  if (csp.assignmentComplete(assignment)) {
    return assignment;
  }
  var variable = select_variable(csp.variables, assignment);
  var values = order_domain_values(variable, assignment, csp);
  for (var i = 0; i < values.length; i++) {
    assignment[variable] = values[i];
    var result = backtrack(assignment, csp, select_variable,
			   order_domain_values, inference);
    if (result != "FAILURE") {
      return result;
    }
    delete assignment[variable];
  }
  return "FAILURE";
}

App.select_mrv = function(variables, assignment) {
  var keys = Object.keys(variables);
  var domains = keys.map(function(key) {
    return variables[key].filter(function(value) {
      return !assignment[value]
    });
  });
};

App.backtracking_search = function(csp,
				   select_variable,
				   order_domain_values,
				   inference) {
  select_variable = select_variable || select_mrv;
  return backtrack({}, csp, select_variable, order_domain_values, inference);
};

/* --- Filtering --- */

