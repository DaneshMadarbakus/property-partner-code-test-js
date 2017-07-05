function Grid(borderX, borderY) {
  const grid = this;

  grid.borderX = borderX;
  grid.borderY = borderY;

  grid.robots = [];
  grid.scents = [];

  function Robot(xCoord, yCoord, orientation) {

    var commandForwardMap = {
      E: createCoordMap(1, 0),
      S: createCoordMap(0, -1),
      W: createCoordMap(-1, -0),
      N: createCoordMap(0, 1)
    };

    var orientationArray = ['N', 'E', 'S', 'W'];
    var self = {
      position: {
        xCoord: Number(xCoord),
        yCoord: Number(yCoord),
        orientation: orientation,
        lost: null
      }
    };


        // -- util functions

    function createCoordMap(x, y) {
      return {
        x: x,
        y: y
      };
    }

    function moveForward(commands, position) {
      var newPosition = Object.assign({}, position);
      newPosition.xCoord += commands.x;
      newPosition.yCoord += commands.y;
      if(grid.scents.filter(function(scent){
        return scent.xCoord === newPosition.xCoord && scent.yCoord === newPosition.yCoord;
      }).length > 0){
        return position;
      } else{
        return newPosition;
      }
    }

    function getOutOfBoundsOrientationKey(newKey) {
      if(newKey < 0) {
        return orientationArray.length - 1;
      } else {
        return 0;
      }
    }

    function getNewOrientation(orientation, directionMove) {
      var newKey = orientationArray.indexOf(orientation) + directionMove;
      if(orientationArray[newKey]) {
        return orientationArray[newKey];
      } else {
        return orientationArray[getOutOfBoundsOrientationKey(newKey)];
      }
    }

    function changeOrientation(instruction, orientation) {
      var newOrientation;
      if(instruction === 'L'){
        newOrientation = getNewOrientation(orientation, - 1);
      } else{
        newOrientation = getNewOrientation(orientation, 1);
      }

      return newOrientation;

    }


    function runInstruction(position, instruction) {
      if(position.lost) return position;

      if (instruction === 'F') {
        position = moveForward(commandForwardMap[position.orientation], position);
      } else {
        position.orientation = changeOrientation(instruction, position.orientation);
      }

      if(position.xCoord > grid.borderX || position.xCoord < 0 || position.yCoord > grid.borderY || position.yCoord < 0) {
        position.lost = true;
        grid.scents.push(position);
      }
      return position;
    }


    var api = {

      move: function(instructions) {
        var moves = instructions.split('');

        return moves.reduce(function(position, move){
          return runInstruction(position, move);
        }, self.position);

      }
    };

    return api;
  }

  var api = {
    createRobot: function(xCoord, yCoord, orientation) {
      this.robots.push(new Robot(xCoord, yCoord, orientation));
      return this.robots.length - 1;
    },
    robots: this.robots
  };

  return api;

}


var firstGrid = new Grid(5, 3);

var firstRobotKey = firstGrid.createRobot(0,0,'E');
var secondRobotKey = firstGrid.createRobot(1,1,'E');
var thirdRobotKey = firstGrid.createRobot(0,0,'E');

console.log('finalPos', firstGrid.robots[firstRobotKey].move('LFFFFFFFFFFFFFFFFFFFFFFFFFFF'));
console.log('finalPos', firstGrid.robots[secondRobotKey].move('FFF'));
console.log('finalPos', firstGrid.robots[thirdRobotKey].move('LFFFFFFFFFFFFFFF'));

