# Martian robots 

###Adding scents

I assumed that if a robot is on the edge of the grid it is still not lost. So if the grid is 4x, 4y and a robots position is 4x, 4y it would still be in bounds. 

I defined const grid = this, so that I would be able to call grid.borderX (previously just this.borderX) and the other variables in nested fucntions  without worrying about scope. 

Within the runInstructions function I added an if statement to determine if an x or y co-ordinate of a robot's position is greater than the grid's boundaries in which case I changed the robots lost parameter to true and added its current position to the grid.scents array. I also added an if statement at the begining of the runInstructions function to check if the position of the robot is lost so that it doesn't continue to run the robots further instructions. 

Within the moveForward function I ran '.filter' on the grid.scents array to return a new array that would include any matches between the new position and scents. If the length of the array was more than one it would mean there has been a match so the newPosition should be disregarded and the original position would be returned thereby skipping that particular move. 

One problem I resolved was assigning the newPosition to the original position object as javascript was only making a refenrence to the object as opposed to creating a seperate clone of the object. The issue with this is that when I tried to return the original position after a match between scent and newPosition had been found, it would be modified to be the same as the newPosition. I resolved this by making the newPosition = Object.assign({}, postion) to create a new object exactly the same as the original position which can be changed without affecting the original.