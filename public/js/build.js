;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
$(function() {
  'use strict';
  // start board
  var board;
  (function() {
    /* Board Options */
    JXG.Options.angle.orthoType = "root";
    JXG.Options.angle.radius    = 25;
    JXG.Options.elements.fixed  = true;
    
    board        = JXG.JSXGraph.initBoard('grid', {
      boundingbox:     [-100,60,100,-60],
      keepaspectratio: true,
      showCopyright:   false,
      showNavigation:  false 
    });
    board.points = {};
    var axx      = board.create('axis',[[0,0],[1,0]]);
    var axy      = board.create('axis',[[0,0],[0,1]]);
     
    board.unsuspendUpdate();    
  })();
  
  // Attach creation events
  require('./events').create(board);


}); 
},{"./events":2}],2:[function(require,module,exports){
var Events     = {};

Events.create  = require('./events/create');

module.exports = Events;
},{"./events/create":3}],3:[function(require,module,exports){
var slider    = require('../slider'),
    element   = require('../element'),
    Events    = {};

/* Extend jQuery for input to coordinates */
jQuery.fn.coord = function() {
  if (this.val()) {
    if (this.val().indexOf(',') !== -1) {
      return this.val().split(',')
        .map(function(e) {
          return parseFloat(e);
        });
    }
  }
};

module.exports = function(board) {


  // Create Circle
  $('#elements .col:first-child .button:first-child').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="circle-p1">Center Point (x,y):</label><input type="text" name="center" class="inside" value="0.0,0.0" />',
      '<label for="radius">Radius:</label><input type="text" name="radius" class="inside" value="0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var circle = new element(board, "circle", {
        center: $('input[name="center"]').coord(),
        radius: parseFloat($('input[name="radius"]').val())
      });

      circle.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Angle
  $('#elements .col:first-child .button:first-child + .button').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Point 1 (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<label for="point2">Center Point (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<label for="point3">Point 3 (x,y):</label><input type="text" name="point3" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var angle = new element(board, "angle", {
        point1: $('input[name="point1"]').coord(),
        point2: $('input[name="point2"]').coord(),
        point3: $('input[name="point3"]').coord()
      });

      angle.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Arc
  $('#elements .col:first-child .button:first-child + .button + .button').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Center Point (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<label for="point2">Point 2 (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<label for="point3">Point 3 (x,y):</label><input type="text" name="point3" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var arc = new element(board, "arc", {
        point1: $('input[name="point1"]').coord(),
        point2: $('input[name="point2"]').coord(),
        point3: $('input[name="point3"]').coord()
      });

      arc.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Ellipse
  $('#elements .col:nth-child(2) .button:first-child').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Point 1 (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<label for="point2">Point 2 (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<label for="point3">Point 3 (x,y):</label><input type="text" name="point3" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var ellipse = new element(board, "ellipse", {
        point1: $('input[name="point1"]').coord(),
        point2: $('input[name="point2"]').coord(),
        point3: $('input[name="point3"]').coord()
      });

      ellipse.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Segment
  $('#elements .col:nth-child(2) .button:first-child + .button').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">End Point 1 (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<br/><label for="point2">End Point 2 (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var segment = new element(board, "segment", {
        point1: $('input[name="point1"]').coord(),
        point2: $('input[name="point2"]').coord(),
      });

      segment.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Line
  $('#elements .col:nth-child(2) .button:first-child + .button + .button').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Point 1 (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<label for="point2">Point 2 (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var line = new element(board, "line", {
        point1: $('input[name="point1"]').coord(),
        point2: $('input[name="point2"]').coord(),
      });

      line.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Parabola
  $('#elements .col:nth-child(3) .button:first-child ').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Line Point 1 (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<br /><label for="point2">Line point 2 (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<label for="point3">Center Point (x,y):</label><input type="text" name="point3" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var parabola = new element(board, "parabola", {
        point1: $('input[name="point1"]').coord(),
        point2: $('input[name="point2"]').coord(),
        point3: $('input[name="point3"]').coord(),
      });

      parabola.draw();

      $('.close-slider').click();
    });
  });

  //-----------------------------------------------------------------------

  // Create Polygon
  $('#elements .col:nth-child(3) .button:first-child + .button').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Point 1 (x,y):</label><input type="text" name="point1" class="inside" value="0.0,0.0" />',
      '<label for="point2">Point 2 (x,y):</label><input type="text" name="point2" class="inside" value="0.0,0.0" />',
      '<label for="point3">Point 3 (x,y):</label><input type="text" name="point3" class="inside" value="0.0,0.0" />',
      '<div class="button more">Add point</div>',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n"), 230, 'auto'); 

    var points   = 3,
        vertices = {};

    $('.more').click(function() {
      points++;
      var more = '<br /><label for="point'+ points + '">Point ' + points + ' (x,y):</label><input type="text" name="point'+ points +'" class="inside" value="0.0,0.0" />';
      $(this).before(more);
    });
    $('.draw').on('click', function() {
      $('.draw-element input').each(function(i,m) {
        vertices["point"+i] = $(m).coord();
      });

      var polygon = new element(board, "polygon", vertices);

      polygon.draw();

      $('.close-slider').click();
    });
  });


  //-----------------------------------------------------------------------

  // Create Point
  $('#elements .col:nth-child(3) .button:first-child + .button + .button').click(function() {
    slider([
      '<div class="draw-element">',
      '<label for="point1">Point (x,y):</label><input type="text" name="point" class="inside" value="0.0,0.0" />',
      '<div class="button draw">Draw to board</div>',
      '</div>'
    ].join("\n")); 

    $('.draw').click(function() {
      var point = new element(board, "point", {
        point: $('input[name="point"]').coord(),
      });

      point.draw();

      $('.close-slider').click();
    });
  });


};
},{"../slider":4,"../element":5}],4:[function(require,module,exports){
module.exports = function(content, width, height, top) {
  if ($('.slider').length) {
    return false;
  }
  $block = $('<div class="slider"> <div class="close-slider">x</div> </div>');
  $block.append(content)
    .appendTo('body')
    .css({
      width:  width  || 230,
      height: height || 200,
      position: 'absolute',
      top: top       || $('#elements').offset().top,
      left: -width   || -230
    })
  $block.animate({
    left: 0
  }, 400);
  $('.close-slider').click(function() {
    $(this).parent()
      .find('*')
      .unbind('click');
    $block.animate({
      left: -width || -230
    }, 400, function() {
      $(this).remove();
    });
  });
};
},{}],5:[function(require,module,exports){
var point = require('./point');

/*
  BoardElement Factory
  */

var BoardElement = function(board, element, options) {
  this.element = element;
  this.options = options;
  return new this[element](board, options);
}

BoardElement.prototype = (function() {

/*--
  Interface Element {
    public void   constructor(JSXGraph board, Object options)
    public void   draw()
  }
*--/

  /*
  Options: {
    center: [float, float],
    radius: float
  }
  */
  var circleElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  circleElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.center).add();

    this.board.create("circle", [p1, this.options.radius]);
  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point 1: [float, float],
    point 2: [float, float],
    point 3: [float, float]
  }
  */
  var angleElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  angleElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.point1).add();

    var p2 = new point(this.board, this.options.point2).add();

    var p3 = new point(this.board, this.options.point3).add();

    this.board.create("angle", [p1, p2, p3]);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point 1: [float, float],
    point 2: [float, float],
    point 3: [float, float]
  }
  */
  var arcElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  arcElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.point1).add(); 
    var p2 = new point(this.board, this.options.point2).add();
    var p3 = new point(this.board, this.options.point3).add();

    this.board.create("arc", [p1, p2, p3]);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point 1: [float, float],
    point 2: [float, float],
    point 3: [float, float]
  }
  */
  var ellipseElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  ellipseElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.point1).add();

    var p2 = new point(this.board, this.options.point2).add();

    var p3 = new point(this.board, this.options.point3).add();

    this.board.create("ellipse", [p1, p2, p3]);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point 1: [float, float],
    point 2: [float, float]
  }
  */
  var segmentElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  segmentElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.point1).add();

    var p2 = new point(this.board, this.options.point2).add();

    this.board.create("segment", [p1, p2]);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point 1: [float, float],
    point 2: [float, float]
  }
  */
  var lineElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  lineElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.point1).add();
    var p2 = new point(this.board, this.options.point2).add();

    this.board.create("line", [p1, p2]);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    line  1: [float, float],
    point 2: [float, float]
  }
  */
  var parabolaElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  parabolaElement.prototype.draw = function() {
    var p1 = new point(this.board, this.options.point1).add();  
    var p2 = new point(this.board, this.options.point2).add();

    var l1 = this.board.create("line",
      [p1, p2]
    );
    var p3 = new point(this.board, this.options.point3).add();

    this.board.create("parabola", [p3, l1]);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point 1: [float, float],
    ...
  }
  */
  var polygonElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  polygonElement.prototype.draw = function() {

    var vertices = [];
    for(i in this.options) {
      var point = new point(this.board, this.options[i]).add();
      vertices.push(point);      
    }

    this.board.create("polygon", vertices);

  };

  //-----------------------------------------------------------------------

  /*
  Options: {
    point: [float, float]
  }
  */
  var pointElement = function(board, options) {
    this.options = options;
    this.board   = board;
  };

  pointElement.prototype.draw = function() {
   
    return new point(this.board, this.options.point).add();
   
  };

  return {
    Constructor: BoardElement,
    circle:      circleElement,
    angle:       angleElement,
    arc:         arcElement,
    ellipse:     ellipseElement,
    segment:     segmentElement,
    line:        lineElement,
    parabola:    parabolaElement,
    polygon:     polygonElement,
    point:       pointElement
  };

})();

module.exports = BoardElement; 
},{"./point":6}],6:[function(require,module,exports){
var Point = function(board, coords) {
  this.board  = board;
  this.coords = coords;
};

Point.prototype = (function() {
  /* Private */
  var getPointIfExists = function() {
    var points = this.board.points;
    for (point in this.board.points) {
      if (this.board.points.hasOwnProperty(point)) {
        if (points[point].coords.usrCoords[1] == this.coords[0] &&
            points[point].coords.usrCoords[2] == this.coords[1]) {
          return points[point];
        }
      }
    }
    return false;
  };
  /* Public */
  return {
    Constructor: Point,
    add: function() {
      var point = getPointIfExists.call(this);
      if (!point) {
        var p = this.board.create("point", this.coords);
        Object.defineProperty(this.board.points, p.name, 
          {value: p,
           enumerable: true});
        return p;
      } else {
        return point;
      }
    }
  } 

})();

module.exports = Point;
},{}]},{},[1])
;