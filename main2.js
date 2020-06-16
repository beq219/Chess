class Board{
	constructor(){
		this.pieces = this.createPieces();
		this.possibleCells = [];
	}

	createPieces(){
		let pieces = {
			"PawnW": [new Pawn("PawnW.png", [6,0]), new Pawn("PawnW.png", [6,1]), new Pawn("PawnW.png", [6,2]), new Pawn("PawnW.png", [6,3]), new Pawn("PawnW.png", [6,4]), new Pawn("PawnW.png", [6,5]), new Pawn("PawnW.png", [6,6]), new Pawn("PawnW.png", [6,7])],
			"PawnB": [new Pawn("PawnB.png", [1,0]), new Pawn("PawnB.png", [1,1]), new Pawn("PawnB.png", [1,2]), new Pawn("PawnB.png", [1,3]), new Pawn("PawnB.png", [1,4]), new Pawn("PawnB.png", [1,5]), new Pawn("PawnB.png", [1,6]), new Pawn("PawnB.png", [1,7])],
			"Blank": [
				new Blank("Blank.png",[5,0]), new Blank("Blank.png",[5,1]), new Blank("Blank.png",[5,2]),
				new Blank("Blank.png",[5,3]), new Blank("Blank.png",[5,4]), new Blank("Blank.png",[5,5]), 
				new Blank("Blank.png",[5,6]), new Blank("Blank.png",[5,7]), new Blank("Blank.png",[4,0]),  
				new Blank("Blank.png",[4,1]), new Blank("Blank.png",[4,2]), new Blank("Blank.png",[4,3]), 
				new Blank("Blank.png",[4,4]), new Blank("Blank.png",[4,5]), new Blank("Blank.png",[4,6]),
				new Blank("Blank.png",[4,7]), new Blank("Blank.png",[3,0]), new Blank("Blank.png",[3,1]),
				new Blank("Blank.png",[3,2]), new Blank("Blank.png",[3,3]), new Blank("Blank.png",[3,4]),
				new Blank("Blank.png",[3,5]), new Blank("Blank.png",[3,6]), new Blank("Blank.png",[3,7]), 
				new Blank("Blank.png",[2,0]), new Blank("Blank.png",[2,1]), new Blank("Blank.png",[2,2]), 
				new Blank("Blank.png",[2,3]), new Blank("Blank.png",[2,4]), new Blank("Blank.png",[2,5]),
				new Blank("Blank.png",[2,6]), new Blank("Blank.png",[3,7])
				],
			"RookW": [new Rook("RookW.png", [7,0]), new Rook("RookW.png", [7,7])],
			"RookB": [new Rook("RookB.png", [0,0]), new Rook("RookB.png", [0,7])],
			"KnightW": [new Knight("KnightW.png", [7,1]), new Knight("KnightW.png", [7,6])],
			"KnightB": [new Knight("KnightB.png", [0,1]), new Knight("KnightB.png", [0,6])],
			"BishopW": [new Bishop("BishopW.png", [7,2]), new Bishop("BishopW.png", [7,5])],
			"BishopB": [new Bishop("BishopB.png", [0,2]), new Bishop("BishopB.png", [0,5])],
			"QueenW": [new Queen("QueenW.png", [7,3])],
			"QueenB": [new Queen("QueenB.png", [0,3])],
			"KingW": [new King("KingW.png", [7,4])],
			"KingB": [new King("KingB.png", [0,4])]
		}
		return pieces;
	}

	getPiece(x, y){
		let current_location = [x,y]
	    for (let piece in board.pieces){
	        // console.log(board.pieces[piece]);
	        for (let i in board.pieces[piece]){
	        	// console.log(board.pieces[piece][i].imgId+" "+board.pieces[piece][i].location);
	        	if (JSON.stringify(current_location) === JSON.stringify(board.pieces[piece][i].location)){
	        		// console.log("you've selected: "+board.pieces[piece][i].imgId);
	        		return board.pieces[piece][i];
	        	}
	        }
	    }
	}

	getImgId(path){
		let idWithExtension = path.split(/\//).pop();
		//console.log("id with extension= " + idWithExtension);
		//let id = splitPath.split(/\./)[0];
		// console.log(id);
		return idWithExtension;
	}

	setImgId(id, row, col){
		console.log("piece to be replaced: " + $("tr").eq(row).find('td').eq(col).find('img').attr('src'));
		let idToBeReplaced = $("tr").eq(row).find('td').eq(col).find('img');
		//let selectedTd = $("tr").eq(row).find('td').eq(col);
		idToBeReplaced.attr('src', "images/"+id);
		idToBeReplaced.addClass("draggable ui-draggable ui-draggable-handle");
		// selectedTd.addClass("droppable ui-droppable");
		return idToBeReplaced
	}

	move(oldRow, oldCol, id, newRow, newCol){
		let oldPiece = this.getPiece(oldRow, oldCol);
		let newPiece = this.getPiece(newRow, newCol);
		console.log(oldPiece)
		console.log(newPiece)
		board.setImgId(id, newRow, newCol);

		//TODO: don't just replace the old position with blank
		board.setImgId("Blank.png",oldRow, oldCol);
	}

	highlightCell(cell){
		console.log("higlight " + cell);
	    $("tr").eq(cell[0]).find('td').eq(cell[1]).css('border', '2px solid red');
	    // TODO: highlight green for a cell to capture
	    // if(getImgIdRowCol(row,col) == "KingW.png"){
	    //     $("tr").eq(row).find('td').eq(col).css('border', '2px solid green');
	    // }
	}

	unHighlightCell(cell){
    	$("tr").eq(cell[0]).find('td').eq(cell[1]).css('border', '1px solid black');
	}

	isEmpty(cell){
		let cellImg = $("tr").eq(cell[0]).find('td').eq(cell[1]).find('img').attr('src').split("/").pop();
		console.log("cellImg: "+cellImg);
		if (cellImg == "Blank.png"){
			console.log("Empty");
			return true;
		}else{
			console.log("Not Empty");
			return false;
		}
	}

	showPossibleCells(){
		console.log("hello");
		console.log("possible cells length: "+this.possibleCells.length);
		// let selectedCell = document.getElementById(draggedPiece);
		for (let cell = 0; cell < this.possibleCells.length; cell++){
			// console.log("cell: "+this.possibleCells[cell]);
			let selectedPiece = this.getPiece(this.possibleCells[cell][0],this.possibleCells[cell][1]);
			console.log("selected piece: "+ selectedPiece);
			// let idToBeReplaced = $("tr").eq(selectedPiece.location[0]).find('td').eq(selectedPiece.location[1]).find('img');
			let idToBeReplaced = $("tr").eq(selectedPiece.location[0]).find('td').eq(selectedPiece.location[1]);
			console.dir(idToBeReplaced);
			idToBeReplaced.addClass("hello");
			console.log("id to be replaced: "+ idToBeReplaced);
			// idToBeReplaced.attr('id', 'test');
			// selectedPiece = document.getElementById(selectedPiece.imgId);
			// console.log("selected piece: "+ selectedPiece)
			// console.log("at "+cell);
			$(".hello").css("border","2px solid red");
			// idToBeReplaced.style.borderStyle = "solid";
			// idToBeReplaced.style.borderColor = "red";
		}
	}
}

class Piece{
	constructor(imgId, location){
		this.imgId = imgId;
		this.location = location;
		this.possibleMoves = []; 
	}

	getPossibleMoves(x,y){
		return [];
	}
}

class Blank extends Piece{
	constructor(imgId, location){
		super(imgId, location);
	}
}

class Pawn extends Piece{
	constructor(imgId, location, possibleCells, hasMoved){
		super(imgId, location);
		this.hasMoved = false;
	}

	getPossibleMoves(x,y){
		let possibleMoves = []
		switch (this.imgId){
			case "PawnW.png":
				let north = board.getPiece(x-1, y); 
				let northDouble = board.getPiece(x-2, y);
				let northWest = board.getPiece(x-1,y-1);
				let northEast = board.getPiece(x-1, y+1);

				if (this.hasMoved){
					//check front space
					if (board.isEmpty(north.location)){
						possibleMoves.push(north.location);
					}
					// check if corners have enemies
					if (!board.isEmpty(northWest.location) && !northWest.imgId.endsWith("W.png")){
						possibleMoves.push(northWest.location);
					}
					if (!board.isEmpty(northEast.location) && !northEast.imgId.endsWith("W.png")){
						possibleMoves.push(northEast.location);
					}
				}else{
					possibleMoves.push(north.location);
					possibleMoves.push(northDouble.location);
					// check if corners have enemies
					if (!board.isEmpty(northWest.location) && !northWest.imgId.endsWith("W.png")){
						possibleMoves.push(northWest.location);
					}
					if (!board.isEmpty(northEast.location) && !northEast.imgId.endsWith("W.png")){
						possibleMoves.push(northEast.location);
					}
				}
				console.log("possible moves: " + possibleMoves);
				return possibleMoves;
			case "PawnB.png":
				let south = board.getPiece(x+1, y); 
				let southDouble = board.getPiece(x+2, y);
				let southWest = board.getPiece(x+1,y+1);
				let southEast = board.getPiece(x+1, y-1);

				if (this.hasMoved){
					//check front space
					if (board.isEmpty(south.location)){
						possibleMoves.push(south.location);
					}
					// check if corners have enemies
					if (!board.isEmpty(southWest.location) && !southWest.imgId.endsWith("B.png")){
						possibleMoves.push(southWest.location);
					}
					if (!board.isEmpty(southEast.location) && !southEast.imgId.endsWith("B.png")){
						possibleMoves.push(southEast.location);
					}
				}else{
					possibleMoves.push(south.location);
					possibleMoves.push(southDouble.location);
					// check if corners have enemies
					if (!board.isEmpty(southWest.location) && !southWest.imgId.endsWith("B.png")){
						possibleMoves.push(southWest.location);
					}
					if (!board.isEmpty(southEast.location) && !southEast.imgId.endsWith("B.png")){
						possibleMoves.push(southEast.location);
					}
				}
				console.log("possible moves: " + possibleMoves);
				return possibleMoves;
		}
	}
}

class Rook extends Piece{
	constructor(imgId, location, hasMoved){
		super(imgId, location);
		this.hasMoved = false;
	}
}

class Knight extends Piece{
	constructor(imgId, location){
		super(imgId, location);
	}
}

class Bishop extends Piece{
	constructor(imgId, location){
		super(imgId, location);
	}
}

class Queen extends Piece{
	constructor(imgId, location){
		super(imgId, location);
	}
}

class King extends Piece{
	constructor(imgId, location, hasMoved){
		super(imgId, location);
		this.hasMoved = false;
	}
}


function setup(){
	board = new Board()
	let draggedPiece;

	// $("td img").hover(function(){
	// 	try{
	// 		let path = this.src;
	//         let imgId = board.getImgId(path);
	//         // console.log(imgId);

	//         let cellRowIndex = this.closest("tr").rowIndex;
	//         let cellColIndex = this.closest("td").cellIndex;
	//         //console.log(imgId);
	        
	//         // console.log("row: "+ cellRowIndex);
	//         // console.log("col: "+ cellColIndex);

	//         let hover_piece = board.getPiece(cellRowIndex, cellColIndex);
	//         console.log("hover piece: "+ hover_piece.imgId + " " + hover_piece.location);
	//         switch(hover_piece.imgId){
	//         	case "PawnW.png":
	//         		if (hover_piece.hasMoved === false){
	//         			board.possibleCells.push([cellRowIndex-2,cellColIndex]);
	//         			board.possibleCells.push([cellRowIndex-1,cellColIndex]);
	//         		}else{
	//         			board.possibleCells.push([cellRowIndex-1,cellColIndex]);
	//         		}
	//         		console.log("possible cells: " + board.possibleCells);
	//         		board.showPossibleCells();
	//         		break;
	//         }
	//     }catch(err){}
	// }, function(){
 //        board.possibleCells = [];
 //        $(".hello").css("border","1px solid black");
 //        $(".td").removeClass("hello");
 //    });
	

	$(".draggable").draggable({
		helper: "clone",
        distance: 15, 
        revert: "invalid",
        start: function(event,ui){
	        // board.showPossibleCells();
        	// makes cursor center of dragged piece
        	$(this).draggable('instance').offset.click = {
        		left: Math.floor(ui.helper.width() / 2),
        		top: Math.floor(ui.helper.height() / 2)
        	}; 

            let imgId = ui.helper.attr("src").split(/\//).pop();
            let cellRowIndex = this.closest("tr").rowIndex;
            let cellColIndex = this.closest("td").cellIndex;
            console.log([cellRowIndex,cellColIndex]);
            draggedPiece = board.getPiece(cellRowIndex, cellColIndex);
            draggedPiece.possibleMoves = draggedPiece.getPossibleMoves(cellRowIndex,cellColIndex);
            draggedPiece.possibleMoves.forEach(board.highlightCell);
            // console.log("possible moves: "+ draggedPiece.possibleMoves);
        },
        snap: ".draggable",
        snapMode: "inner",
        snapTolerance: 15,
        stop: function(event, ui){
            let cellRowIndex = this.closest("tr").rowIndex;
            let cellColIndex = this.closest("td").cellIndex;
            console.log("dragged from row: "+ cellRowIndex+" col: "+ cellColIndex);

            draggedPiece.possibleMoves.forEach(board.unHighlightCell);
        }
	});

	$(".droppable").droppable({
		drop: function(event, ui){
			console.log("dragged:"+ui.draggable.attr("src"));
            let imgId = ui.draggable.attr("src").split(/\//).pop();
            let cellColIndex = this.closest("td").cellIndex;
            let cellRowIndex = this.closest("tr").rowIndex;
            let drop_piece = board.getPiece(cellRowIndex, cellColIndex);
            console.log("dropped on piece: "+drop_piece.imgId+" on "+drop_piece.location);
            console.log(draggedPiece.possibleMoves)

			//TODO: only move piece if the drop_piece is in possible moves 
			if(draggedPiece.possibleMoves.includes(drop_piece.location)){
				board.move(draggedPiece.location[0],draggedPiece.location[1],imgId,cellRowIndex,cellColIndex);
				draggedPiece.location = [cellRowIndex,cellColIndex];

				if(draggedPiece.imgId === "PawnW.png" || draggedPiece.imgId === "PawnB.png"){
					draggedPiece.hasMoved = true;
				}
			}
		}
	});
}

$(window).on("load",setup());