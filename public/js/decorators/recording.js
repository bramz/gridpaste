/*
  OperationDecorator
*/

module.exports = function(Operation) {
  var recording = false;
  
  var recorded  = [];

  Object.defineProperty(Operation.prototype, "getRecorded", {
    get: function() { return recorded; }
  });

  Operation.prototype.startRecording = function() {
    recording = true;
  };
  Operation.prototype.stopRecording  = function() {
    recording = false;
  };

  var execute = Operation.prototype.storeAndExecute;
  // proxy
  Operation.prototype.storeAndExecute = function() {
    execute.apply(this, arguments);
    if (recording) {
      recorded.push(this.commands[this.commands.length - 1]);
    }
  };

  var remove = Operation.prototype.undoLastExecute;
  // proxy
  Operation.prototype.undoLastExecute = function() {
    if (recording) {
      recorded.pop();
    }
    return remove.apply(this, arguments);
  };
};
