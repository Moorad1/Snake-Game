# Snake
___
This is a little snake game that I made and It is really simple

## What is in this game
___
- This game has a _singleplayer mode_
- There is a score and Highscore system
- You can change the Theme of the game (mid-game)
- It supports the __arrow keys__, __WASD keys__ and it supports __Game Controllers__ including XBox 360,XBox One, PS4 AND PS3 Controllers 🎮
- It has a _multiplayer mode_
- A realtime leaderboard in _multiplayer mode_
- A leaderboard in Main Menu for the highest scores in multiplayer ever recorded
- You have a chance of getting more point than Usual (3<) when you eat an apple

## How to Play#
___
Controlling the Snake - You can use
__W A S D__ or use the __arrow keys__

Toggling Themes
Use the __T__ key in your keyboard


##How is it made
___
### HTML & JavaScript
___
I used HTML to create the canvas and used JavaScript to render all the themes and recieve and emit data to my server. JavaScript also detects keypress and gamepads and loads the Main Menu, Singleplayer mode and Multiplayer mode.

### Gampad.js
___
I used Gamepad.js from Neogeek that simplifies the programming of gamepads and detecting the keypresses

[Gampad.js](https://github.com/neogeek/gamepad.js)

### Node.js
___
For my backend I used node.js.
#### Socket.io
I used Socket.io to use websockets and connect people and emit and recieve data if the player is in multiplayer mode.
#### Express
I used express to send the files to the user and to run a server.

### MongoDB
For the leaderboard I used MongoDB and used [MLab](https://mlab.com) to store the highest 10 scores. Only the top 10 scores are stored so the database doesn't get full.

