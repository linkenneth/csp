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

App.CSP.prototype.satisfiedBy = function(assignment) {
  return this.constraints.every(function(element, index, array) {
    return element(assignment);
  });
}

/* --- Naive search algorithms --- */

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
  fringe.push(csp.variables[0]);
  while (true) {
    if (!fringe.length) {
      return "FAILURE"  // TOOD - failure signal
    }
    var assignment = fringe.pop();  // node = {'v1':assign_1, 'v2':assign_2, ...}
    if (csp.satisfiedBy(assignment)) {
      return assignment;
    }
    var next_variable = csp.variables.keys.filter(function(element) {
      assignment.contains(element);
    })[0];
    for (var value in csp.variables[next_variable]) {
      var clone = goog.object.clone(assignment);
      clone[x] = value;
      fringe.push(clone);
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
function backtrack(assignment, csp) {}
App.backtracking_search = function(csp,
				   select_variable,
				   order_domain_values,
				   inference) {
  return backtrack({}, csp);
};

/* --- Filtering --- */

