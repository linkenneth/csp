goog.require('goog.structs.PriorityQueue');

var Util = Util || {};

Util.Queue = function() {};
Util.Queue.prototype.push = Array.prototype.push;
Util.Queue.prototype.pop = Array.prototype.shift;
Util.Queue.prototype.length = Array.prototype.length;

/* Lower number is higher priority. */
Util.PriorityQueue = function(priorityFunc) {
  this.func = priorityFunc;
  this.queue = new goog.structs.PriorityQueue();
  this.length = 0;
};

Util.PriorityQueue.prototype.push = function(item) {
  this.queue.enqueue(this.func(item), item);
  this.length++;
};

Util.PriorityQueue.prototype.pop = function() {
  this.length--;
  return this.queue.dequeue();
};
