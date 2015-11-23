	var turn = 1; //Variable for turns
	var win = [9, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //array to detect what square has what for winning
	var gameFinished = 0;

	var player1Win = 0; //player1 wins
	var player2Win = 0; //player 2 wins
	var draw = 0; //draws

	var AI = 0;
	var lastMove = 0;
	var player = "Dragon";

	function allowDrop(ev) {
	    ev.preventDefault();
	}

	function drag(ev) {
	    ev.dataTransfer.setData("Text", ev.target.id);
	}

	function drop(ev) {
	    var data = ev.dataTransfer.getData("Text");
	    var clone = document.getElementById(data).cloneNode(true);
	    var lastMove = 0;

	    if (turn == 1) //player 1 turn
	    {
	        if (data == "drag1") //IDs for each X(player 1)
	        {
	            if (AI != 1)
	                document.getElementById("player").innerHTML = "Dragon's turn";
					ev.target.style.backgroundColor = "Red"; //sets background color of square to red
					ev.target.appendChild(clone); //adds X to div tag
					clone.id = 'drag3';
					document.getElementById("drag3").setAttribute("draggable", "false");
					ev.preventDefault(); //prevents image from opening in new window
					win[getSquareID(clone)] = turn; //sets the corresponding part of the array to whatever parent is (1 for X, 2 for O)
					hasWon();
					if (AI != 1)
						turn++;

	        } else {
	            ev.preventDefault(); //if dragging an O, prevents it from opening a new window
	        }
	    }

	    if (AI != 1) {
	        if (turn == 2) //player 2 turn
	        {
	            if (data == "drag2") //IDs for each O(player 2)
	            {
	                document.getElementById("player").innerHTML = "Tiger's turn";
	                ev.target.style.backgroundColor = "Blue"; //sets background color of square to blue
	                ev.target.appendChild(clone); //adds X to div tag
	                clone.id = 'drag4';
	                ev.preventDefault(); //prevents image from opening in new window
	                win[getSquareID(clone)] = turn; //sets the corresponding part of the array to whatever parent is (1 for X, 2 for O)
	                hasWon();
	                turn--; //decrements turn counter so it's X's turn
	            } else {
	                ev.preventDefault(); //if dragging an X, prevents it from opening a new window
	            }
	        }
	    } else {
	        if (gameFinished != 1) {
	            ai()
	            turn++;
	            hasWon(); //checks to see if someone has won
	            turn--;
	        }
	    }
	}

	function appendAndColor(turn, color) {}

	function getSquareID(ID) {
	    var parent = ID.parentNode;
	    parent.removeAttribute("ondragover"); //removes the ondragover event so it can't be overwritten with a different image
	    parent = parent.getAttribute('id'); //gets the id of the div tag. If dragged in the first square for example, returns div1.
	    parent = parent.substring(3); //cuts off the div part of the id. div1 turns into 1.
	    return parent;
	}

	/* Checks if a player has won using an array.
win[1] corresponds to the first square.
win[2] corresponds to the second square and so on.
endGame() clears all the ondragover events from each div tag so the player cannot drag anything else onto the board.
*/
	function hasWon() { //Final
	    if (win[1] == 1 && win[2] == 1 && win[3] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[7] == 1 && win[8] == 1 && win[9] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[1] == 1 && win[4] == 1 && win[7] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[2] == 1 && win[5] == 1 && win[8] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[3] == 1 && win[6] == 1 && win[9] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[1] == 1 && win[5] == 1 && win[9] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[3] == 1 && win[5] == 1 && win[7] == 1) {
	        alert("Tiger has won.");
	        endGame(true)
	    } else if (win[1] == 2 && win[2] == 2 && win[3] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[4] == 2 && win[5] == 2 && win[6] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[7] == 2 && win[8] == 2 && win[9] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[1] == 2 && win[4] == 2 && win[7] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[2] == 2 && win[5] == 2 && win[8] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[3] == 2 && win[6] == 2 && win[9] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[1] == 2 && win[5] == 2 && win[9] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    } else if (win[3] == 2 && win[5] == 2 && win[7] == 2) {
	        alert(player + " has won.");
	        endGame(true)
	    }
	    /*indexOf searches the array for a value of 0 which in this case means a square is unfilled.
If 0 is not found (all squares are filled) a -1 is returned instead.*/
	    else if (win.indexOf(0) == -1) {
	        alert("Draw.");
	        endGame(false)
	    }
	    return true;
	}

	function endGame(won) { //Final
	    for (i = 1; i <= 9; i++) { //for loop to go between div1 to div9
	        var element = document.getElementById("div" + i); //gets id of individual div tag
	        element.removeAttribute("ondragover"); //removes on dragover event for each div element so play can't continue
	    }
	    document.getElementById("player").innerHTML = ""; //Clears players turns

	    if (won == false) {
	        draw++;
	        document.getElementById("draw").innerHTML = "Draws:  " + draw;
	        gameFinished = 1;
	    } else if (turn == 1) {
	        player1Win++; //adds 1 to player 1 wins
	        document.getElementById("p1").innerHTML = "Tiger: " + player1Win; //adds wins to table
	        gameFinished = 1;
	    } else if (turn == 2) {
	        player2Win++; //adds 1 to player 2 wins
	        document.getElementById("p2").innerHTML = player + " " + player2Win; //adds wins to table
	        gameFinished = 1;
	    }
	}

	function reset() {
	    for (i = 1; i <= 9; i++) { //for loop to go between div1 to div9
	        var element = document.getElementById("div" + i); //gets id of individual div tag
	        element.setAttribute("ondragover", "allowDrop(event)"); //adds ondragover event so play can continue
	        element.style.backgroundColor = "#FFFFFF"; //resets background color to white
	        if (win[i] > 0)
	            element.removeChild(element.lastChild); //removes child element of div (image)
	    }
	    //Variable resetting
	    win = [9, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //resets array
	    turn = 1; //resets turn counter
	    document.getElementById("player").innerHTML = "Tiger's turn";
	    gameFinished = 0;
	}

	function startai() {
	    if (win.indexOf(1) != -1)
	        alert("Game has started. Cannot do that.");

	    else if (AI == 0) {
	        AI++;
			player = "Medhat";
			player2Win = 0;
			drag2.src = "images/medhat.png";
			document.getElementById("p2").innerHTML = "Medhat : 0";
	        document.getElementById("drag2").setAttribute("draggable", "false");
	        document.getElementById("aion").innerHTML = "AI: on";
	    } else if (AI == 1) {
	        AI--;
			player = "Dragon";
			drag2.src = "images/dragon.png";
			document.body.style.backgroundImage = "";
			document.getElementById("p2").innerHTML = "Dragon: 0";
	        document.getElementById("drag2").setAttribute("draggable", "true");
	        document.getElementById("aion").innerHTML = "AI: off";
	    }
	}

	function ai() {
	    move = genMove(); //generate square to play
	    move = aiLogic(move);
	    move = isValid(move) //test is square is filled, if so, return new value

	    var square = document.getElementById("div" + move); //get div tag for square
	    var AIclone = document.getElementById("drag2").cloneNode(true); //create clone to place
	    square.style.backgroundColor = "Blue"; //sets background color of square to blue
	    square.appendChild(AIclone); //adds O to div tag
	    getSquareID(AIclone);

	    AIclone.id = 'drag4';
	    win[move] = 2;
	}

	function isValid(moveMade) { //checks if AI move is valid
	    if (win.indexOf(0) != -1) {
	        while (win[moveMade] > 0) {
	            moveMade = genMove();
	        }
	    }
	    lastMove = moveMade;
	    return moveMade;
	}

	function genMove() { //generates new move for AI
	    var move = Math.floor((Math.random() * 9) + 1); //random number from 1-9
	    return move;
	}

	function aiLogic(move) {
	    var column = Math.floor((Math.random() * 10) + 1); //random number from 1-9
	    var row = Math.floor((Math.random() * 10) + 1); //random number from 1-9
	    var buffer = 0;

	    if (win.indexOf(2) == -1) //if AI hasn't played, don't apply logic
	        lastMove = move;

	    else {
	        if (column > row) {
	            if (lastMove <= 3) {
	                move = lastMove + 3;
	                buffer = isValid(move);
	                if (buffer != move) {
	                    move = move + 3;
	                }
	            } else if (lastMove >= 7) {
	                move = lastMove - 3;
	                buffer = isValid(move);
	                if (buffer != move) {
	                    move = move - 3;
	                }
	            } else {
	                if (column >= 5) {
	                    move = lastMove + 3;
	                    buffer = isValid(move);
	                    if (buffer != move) {
	                        move = move - 6;
	                    }
	                } else {
	                    move = lastMove - 3;
	                    buffer = isValid(move);
	                    if (buffer != move) {
	                        move = move + 6;
	                    }
	                }
	            }
	        } else if (row >= column) {
	            if (lastMove == 1 || lastMove == 4 || lastMove == 7) {
	                move = lastMove + 1;
	                buffer = isValid(move);
	                if (buffer != move) {
	                    move = move + 1;
	                }
	            } else if (lastMove == 3 || lastMove == 6 || lastMove == 9) {
	                move = lastMove - 1;
	                buffer = isValid(move);
	                if (buffer != move) {
	                    move = move - 1;
	                }
	            }
	        } else {
	            if (row >= 5) {
	                move = lastMove + 1;
	                buffer = isValid(move);
	                if (buffer != move) {
	                    move = move - 2;
	                }
	            } else {
	                move = lastMove - 1;
	                buffer = isValid(move);
	                if (buffer != move) {
	                    move = move + 2;
	                }
	            }
	        }
	    }
	    var winningMove = checkForWinning();
	    var blockMove = blockWin();

	    var middle = Math.floor((Math.random() * 10) + 1); //random number from 1-9
	    if (win[5] == 0) {
	        if (middle > 5)
	            move = 5;
	    } else if (winningMove > 0)
	        move = winningMove;
	    else if (blockMove > 0)
	        move = blockMove;
	    return move;
	}

	function checkForWinning() {
	    var winMove = [9, 0, 0, 0];
	    var winSquare = 0;

	    winMove[1] = win[1] //row 1
	    winMove[2] = win[2]
	    winMove[3] = win[3]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0);
	            return winSquare;
	        }
	    }

	    winMove[1] = win[4] //row 2
	    winMove[2] = win[5]
	    winMove[3] = win[6]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0) + 3;
	            return winSquare;
	        }
	    }

	    winMove[1] = win[7] //row 3
	    winMove[2] = win[8]
	    winMove[3] = win[9]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0) + 6;
	            return winSquare;
	        }
	    }

	    winMove[1] = win[1] //column 1
	    winMove[2] = win[4]
	    winMove[3] = win[7]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0);
	            if (winSquare == 2)
	                winSquare = 4;
	            if (winSquare == 3)
	                winSquare = 7;
	            return winSquare;
	        }
	    }

	    winMove[1] = win[2] //column 2
	    winMove[2] = win[5]
	    winMove[3] = win[8]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0);
	            if (winSquare == 1)
	                winSquare = 2;
	            else if (winSquare == 2)
	                winSquare = 5;
	            else if (winSquare == 3)
	                winSquare = 8;
	            return winSquare;
	        }
	    }

	    winMove[1] = win[3] //column 3
	    winMove[2] = win[6]
	    winMove[3] = win[9]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0);
	            if (winSquare == 1)
	                winSquare = 3;
	            else if (winSquare == 2)
	                winSquare = 6;
	            else if (winSquare == 3)
	                winSquare = 9;
	            return winSquare;
	        }
	    }

	    winMove[1] = win[1] //diagonal 1
	    winMove[2] = win[5]
	    winMove[3] = win[9]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0);
	            if (winSquare == 2)
	                winSquare = 5;
	            if (winSquare == 3)
	                winSquare = 9;
	            return winSquare;
	        }
	    }

	    winMove[1] = win[3] //diagonal 2
	    winMove[2] = win[5]
	    winMove[3] = win[7]
	    if (winMove[1] + winMove[2] + winMove[3] == 4) {
	        if (winMove[1] == 0 || winMove[2] == 0 || winMove[3] == 0) {
	            winSquare = winMove.indexOf(0);
	            if (winSquare == 1)
	                winSquare = 3;
	            else if (winSquare == 2)
	                winSquare = 5;
	            else if (winSquare == 3)
	                winSquare = 7;
	            return winSquare;
	        }
	    }
	}

	function blockWin() {
	    var blockMove = [9, 0, 0, 0];
	    var blockSquare = 0;

	    blockMove[1] = win[1] //row 1
	    blockMove[2] = win[2]
	    blockMove[3] = win[3]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0);
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[4] //row 2
	    blockMove[2] = win[5]
	    blockMove[3] = win[6]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0) + 3;
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[7] //row 3
	    blockMove[2] = win[8]
	    blockMove[3] = win[9]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0) + 6;
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[1] //column 1
	    blockMove[2] = win[4]
	    blockMove[3] = win[7]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0);
	            if (blockSquare == 2)
	                blockSquare = 4;
	            else if (blockSquare == 3)
	                blockSquare = 7;
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[2] //column 2
	    blockMove[2] = win[5]
	    blockMove[3] = win[8]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0);
	            if (blockSquare == 1)
	                blockSquare = 2;
	            else if (blockSquare == 2)
	                blockSquare = 5;
	            else if (blockSquare == 3)
	                blockSquare = 8;
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[3] //column 3
	    blockMove[2] = win[6]
	    blockMove[3] = win[9]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0);
				if (blockSquare == 1)
	                blockSquare = 3;
	            else if (blockSquare == 2)
	                blockSquare = 6;
	            else if (blockSquare == 3)
	                blockSquare = 9;
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[1] //diagonal 1
	    blockMove[2] = win[5]
	    blockMove[3] = win[9]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0);
	            if (blockSquare == 2)
	                blockSquare = 5;
	            else if (blockSquare == 3)
	                blockSquare = 9;
	            return blockSquare;
	        }
	    }

	    blockMove[1] = win[3] //diagonal 2
	    blockMove[2] = win[5]
	    blockMove[3] = win[7]
	    if (blockMove[1] + blockMove[2] + blockMove[3] == 2) {
	        if (blockMove[1] > 0 && blockMove[2] > 0 || blockMove[2] > 0 && blockMove[3] > 0 || blockMove[1] > 0 && blockMove[3] > 0) {
	            blockSquare = blockMove.indexOf(0);
	            if (blockSquare == 2)
	                blockSquare = 5;
	            else if (blockSquare == 3)
	                blockSquare = 7;
	            else
	                blockSquare = 3;
	            return blockSquare;
	        }
	    }
	}