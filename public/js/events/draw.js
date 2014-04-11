var element = require('../board/element');

/* Commands */

/*--
  Interface Command {
    public void   constructor(JSXGraph board, Object Arguments)
    public void   remove()
    public object execute()
  }
--*/

var circle = function(board, args) {
  var args = args || {
    center: $('input[name="center"]:last').coord(),
    radius: parseFloat($('input[name="radius"]:last').val())
  };

  this.circle  = new element(board, "circle", args);
  this.remove  = function() {
    delete board.points[this.circleElement.center.name];
    board.removeObject(this.circleElement.center);
    board.removeObject(this.circleElement);
    board.shapes.pop();
  };
  this.execute = function() {
    this.circleElement = this.circle.draw(); 
    return args;
  };
};

var angle = function(board, args) {
  var args = args || {
    point1: $('input[name="point1"]:last').coord(),
    point2: $('input[name="point2"]:last').coord(),
    point3: $('input[name="point3"]:last').coord()
  };

  this.angle  = new element(board, "angle", args);
  this.remove = function() {
    console.log(this.angleElement);
    delete board.points[this.angleElement.point1.name];
    delete board.points[this.angleElement.point2.name];
    delete board.points[this.angleElement.point3.name];
    board.removeObject(this.angleElement.point1);
    board.removeObject(this.angleElement.point2);
    board.removeObject(this.angleElement.point3);
    board.removeObject(this.angleElement);
    board.shapes.pop();
  };
  this.execute = function() {
    this.angleElement = this.angle.draw();
    return args;
  };
};

var arc = function(board, args) {
  var args = args || {
    point1: $('input[name="point1"]:last').coord(),
    point2: $('input[name="point2"]:last').coord(),
    point3: $('input[name="point3"]:last').coord()
  };

   this.arc     = new element(board, "arc", args);
   this.remove  = function() {
      delete board.points[this.arcElement.point1.name];
      delete board.points[this.arcElement.point2.name];
      delete board.points[this.arcElement.point3.name];
      board.removeObject(this.arcElement.point1);
      board.removeObject(this.arcElement.point2);
      board.removeObject(this.arcElement.point3);
      board.removeObject(this.arcElement);
      board.shapes.pop();
   };
   this.execute = function() {
      this.arcElement = this.arc.draw();
      return args;
   };
};

var ellipse = function(board, args) {
  var args = args ||  {
    point1: $('input[name="point1"]:last').coord(),
    point2: $('input[name="point2"]:last').coord(),
    point3: $('input[name="point3"]:last').coord()
  };
  this.ellipse = new element(board, "ellipse", args);
  this.remove  = function() {
    delete board.points[this.ellipseElement.point1.name];
    delete board.points[this.ellipseElement.point2.name];
    delete board.points[this.ellipseElement.point3.name];
    board.removeObject(this.ellipseElement.point1);
    board.removeObject(this.ellipseElement.point2);
    board.removeObject(this.ellipseElement.point3);
    board.removeObject(this.ellipse);
    board.shapes.pop();
  };
  this.execute = function() {
    this.ellipseElement = this.ellipse.draw()
    return args;
  };
};

var segment = function(board, args) {
  var args = args || {
    point1: $('input[name="point1"]:last').coord(),
    point2: $('input[name="point2"]:last').coord(),
  };
  this.segment = new element(board, "segment", args);
  this.remove  = function() {
    delete board.points[this.segmentElement.point1.name];
    delete board.points[this.segmentElement.point2.name];
    board.removeObject(this.segmentElement.point1);
    board.removeObject(this.segmentElement.point2);
    board.removeObject(this.segmentElement);
    board.shapes.pop();
  };
  this.execute = function() {
    this.segmentElement = this.segment.draw();
    return args;
  };
};

var line = function(board, args) {
  var args = args || {
    point1: $('input[name="point1"]:last').coord(),
    point2: $('input[name="point2"]:last').coord(),
  };
  this.line    = new element(board, "line", args);
  this.remove  = function() {
    delete board.points[this.lineElement.point1.name];
    delete board.points[this.lineElement.point2.name];
    board.removeObject(this.lineElement.point1);
    board.removeObject(this.lineElement.point2);
    board.removeObject(this.lineElement);
    board.shapes.pop();
  };
  this.execute = function() {
    this.lineElement = this.line.draw();
    return args;
  };
};

var parabola = function(board, args) {
  var args = args || {
    point1: $('input[name="point1"]:last').coord(),
    point2: $('input[name="point2"]:last').coord(),
    point3: $('input[name="point3"]:last').coord(),
  };

  this.parabola = new element(board, "parabola", args);
  this.remove   = function() {
    delete board.points[this.parabolaElement.point1];
    delete board.points[this.parabolaElement.point2];
    delete board.points[this.parabolaElement.point3];
    board.removeObject(this.parabolaElement.point);
    board.removeObject(this.parabolaElement.point2);
    board.removeObject(this.parabolaElement.point3);    
    board.removeObject(this.parabolaElement);
    board.shapes.pop();
    // line
    board.shapes.pop();
  };
  this.execute  = function() {
    this.parabolaElement = this.parabola.draw();
    return args;
  };
};

var polygon = function(board, args) {
  var points   = 3,
      vertices = {};
  $('.draw-polygon:last input').each(function(i,m) {
    vertices["point"+i] = $(m).coord();
  });
  args = args || vertices;

  this.polygon = new element(board, "polygon", args);
  this.remove = function() {
    console.log(this.polygonElement);
    this.polygonElement.vertices.pop();
    this.polygonElement.vertices.forEach(function(vertex) {
      delete board.points[vertex.name];
      board.removeObject(vertex);
    });
    board.removeObject(this.polygonElement);
    board.shapes.pop();
  };
  this.execute = function() {
    this.polygonElement = this.polygon.draw();
    return args;
  };
};

var point = function(board, args) {
  var args = args || {
    point: $('input[name="point"]:last').coord(),
  };
  this.point = new element(board, "point", args);
  this.remove  = function() {
    delete board.points[this.pointElement.name];
    board.removeObject(this.pointElement);
  };
  this.execute = function() {
    this.pointElement = this.point.draw();
    return args;
  };
};

/* Extend jQuery for input to coordinates */
$.fn.coord = function() {
  if (this.val()) {
    if (this.val().indexOf(',') !== -1) {
      return this.val().split(',')
        .map(function(e) {
          return parseFloat(e);
        });
    }
  }
};

module.exports = {
  circle: circle,
  angle: angle,
  arc: arc,
  ellipse: ellipse,
  segment: segment,
  line: line,
  parabola: parabola,
  polygon: polygon,
  point: point
};