var Util = Util || {};

Util.Queue = function() {};
Util.Queue.prototype.push = Array.prototype.push;
Util.Queue.prototype.pop = Array.prototype.shift;
Util.Queue.prototype.length = Array.prototype.length;

Util.PriorityQueue = function(priorityFunc) {
  this.func = priorityFunc;
};

Util.PriorityQueue.prototype.push;
Util.PriorityQueue.prototype.pop;
Util.PriorityQueue.prototype.length;
