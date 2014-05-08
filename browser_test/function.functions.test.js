var Func = require('../public/app/board/functions/functions');

describe("GeometryFunction Factory", function() {
  var brd, a, b, c, p;
  before(function(done) {
    document.body.innerHTML = window.__html__['browser_test/fixtures/board.html'];
    brd = JXG.JSXGraph.initBoard('grid', {
      boundingbox:     [-50, 50, 50, -50],
      keepaspectratio: true,
      showCopyright:   false,
      showNavigation:  false,
      axis:            true
      });
     done();
  });
  describe("AngleFunction", function() {
    before(function(done) {
      a = brd.create('point', [-25, 25]);
      b = brd.create('point', [-25, 0]);
      c = brd.create('point', [0,   0]);
      p = brd.create('polygon', [a, b, c], {hasInnerPoints: true});   
      done();
    });
    it("should compute length of angle", function() {
      var angle = new Func(JXG, "angle", [c, b , a]);
      expect(( 180 / Math.PI) * angle.run()).to.equal(90);
    });
  });

  describe("PolygonAreaFunction", function() {
    var X = [], Y = [];
    before(function(done) {
      a = brd.create('point', [-25, 25]);
      b = brd.create('point', [-25, 0]);
      c = brd.create('point', [0,   0]);
      p = brd.create('polygon', [a, b, c], {hasInnerPoints: true});   
      X.push(a.coords.usrCoords[1]);
      X.push(b.coords.usrCoords[1]);
      X.push(c.coords.usrCoords[1]);
      Y.push(a.coords.usrCoords[2]);
      Y.push(b.coords.usrCoords[2]);
      Y.push(c.coords.usrCoords[2]);
      done();
    });
    it("should compute area of polygon", function() {
      var area = new Func(JXG, "polygon_area", {
        X: X,
        Y: Y,
        vertices: X.length
      });
      expect(area.run().toFixed(2)).to.equal("312.50");
    });
  });
  describe("CircleAreaFunction", function() {
    before(function(done) {
      c = brd.create('point', [0,   0]); 
      p = brd.create("circle", [c, 25]);     
      done();
    });
    it("should compute area of a disc", function() {
      var area = new Func(JXG, "circle_area", {
        radius: p.radius
      });
      expect(area.run().toFixed(1)).to.equal("1963.5");
    });
  })
});