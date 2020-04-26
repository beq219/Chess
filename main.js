function setUp(){
    //var pawnW1 = new Piece(6,0,"PawnW");
    //pawnW1.possibleCells = setPossibleCells(pawnW1);

    //isEmpty(6,0); yes
    //console.log(pawnW1.possibleCells);  
    //isEmpty(7,0); yes
    
    //setPossibleCells(pawnW1);
    $("td img").hover(function(){
        let path = this.src;
        let imgId = getImgId(path);
        console.log(imgId);

        let cellRowIndex = this.closest("tr").rowIndex;
        let cellColIndex = this.closest("td").cellIndex;
        //console.log(imgId);
        
        console.log("row: "+ cellRowIndex);
        console.log("col: "+ cellColIndex);
        //isEmpty(cellRowIndex,cellColIndex);
        let possibleCells = setPossibleCells(cellRowIndex, cellColIndex, imgId);
        for(let i = 0; i < possibleCells.length; i++){
            let cell = possibleCells[i];
            // for(let j = 0; j < cell.length; j++){
            //     console.log(cell[j]);
            // }
            highlightCell(cell[0],cell[1]);
        }
        let possibleOccupyCells = setOccupyCells(cellRowIndex,cellColIndex,imgId);
        for(let j = 0; j < possibleOccupyCells.length; j++){
            let occupyCell = possibleOccupyCells[j];
            // for(let j = 0; j < cell.length; j++){
            //     console.log(cell[j]);
            // }
            highlightCellOccupy(occupyCell[0],occupyCell[1]);
        }
    },function(){
        $('td').css('border', '');
        //setImgId(cellRowIndex,cellColIndex, "blank.png");
    });

    $(".draggable").draggable({
        helper: "clone",
        distance: 15,
        revert: "invalid",
        start:function(event,ui){
            let imgId = ui.helper.attr("src").split(/\//).pop();
            let cellRowIndex = this.closest("tr").rowIndex;
            let cellColIndex = this.closest("td").cellIndex;

            let possibleCells = setPossibleCells(cellRowIndex, cellColIndex, imgId);
            for(let i = 0; i < possibleCells.length; i++){
                let cell = possibleCells[i];
                highlightCell(cell[0],cell[1]);
             }

            let possibleOccupyCells = setOccupyCells(cellRowIndex,cellColIndex,imgId);
            for(let j = 0; j < possibleOccupyCells.length; j++){
                let occupyCell = possibleOccupyCells[j];
                // for(let j = 0; j < cell.length; j++){
                //     console.log(cell[j]);
                // }
                highlightCellOccupy(occupyCell[0],occupyCell[1]);
            }

        },
        stop: function(event, ui){
            let cellRowIndex = this.closest("tr").rowIndex;
            let cellColIndex = this.closest("td").cellIndex;

            console.log("dragged from row: "+ cellRowIndex+" col: "+ cellColIndex );
            //turn piece blank after moving
            $('td').css('border', '');
            console.log("dropping: " + getImgIdRowCol(cellRowIndex,cellColIndex));
            setImgId(cellRowIndex,cellColIndex, "blank.png");
        },
    });
    $(".droppable").droppable({
        hoverClasss: "ui-state-hover",
        drop: function(event, ui){
            console.log("dragged:"+ui.draggable.attr("src"));
            let imgId = ui.draggable.attr("src").split(/\//).pop();
            let cellRowIndex = this.closest("tr").rowIndex;
            let cellColIndex = this.closest("td").cellIndex;
            let borderColor = $("tr").eq(cellRowIndex).find('td').eq(cellColIndex);
            let dropRowCol = [cellRowIndex,cellColIndex];
            let possibleCells;
            if(imgId == "PawnWF.png"){
                console.log(borderColor.css("border"));
                // if(borderColor.css("border") == "1px solid rgb(255, 255, 0)"){
                    console.log("match!");
                    setImgId(cellRowIndex,cellColIndex, "PawnW.png");
                    //possibleCells = setPossibleCells(cellRowIndex,cellColIndex,"PawnW.png");
                // }
                //setImgId(cellRowIndex+1,cellColIndex, "blank.png");
                //setImgId(cellRowIndex,cellColIndex, "PawnW.png");
                
            }
            if(imgId == "PawnBF.png"){
                setImgId(cellRowIndex,cellColIndex, "PawnB.png");
            }
            if(imgId == "PawnW.png"){
                // if(borderColor.css("border") == "1px solid rgb(255, 255, 0)"){
                    console.log("match!");
                    //possibleCells = setPossibleCells(cellRowIndex,cellColIndex,imgId);
                    setImgId(cellRowIndex,cellColIndex, imgId);
                // } 
            }
            if(imgId == "PawnB.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "RookW.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "RookB.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "KnightW.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "KnightB.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "BishopW.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "BishopB.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "QueenW.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "QueenB.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "KingW.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            if(imgId == "KingB.png"){
                setImgId(cellRowIndex,cellColIndex, imgId);
            }
            
            console.log("row: " + cellRowIndex + "col: " + cellColIndex);
            // console.log("dragged from row: " + dragRowIndex + "dragged from col: " + dragColIndex);
        },
        out: function(event,ui){
            
        }
        
    });
}

function setOccupyCells(row,col,imgId){
    let occupyCells = [];
    if(imgId == "PawnW.png"){
        if(row-1 >=0 && col-1 >=0 ){
            if(!isEmpty(row-1,col-1)){
                occupyCells.push([row-1,col-1]);
            }
        }
        if(row-1 >=0 && col+1 <=7){
            if(!isEmpty(row-1,col+1)){
                occupyCells.push([row-1,col+1]);
            }
        }
    };
    if(imgId == "PawnB.png"){
        if(row+1 <=7 && col-1 >=0){
            if(!isEmpty(row-1,col-1)){
                occupyCells.push([row+1,col-1]);
            }
            
        }
        if(row+1 <=7 && col+1 <=7){
            if(!isEmpty(row-1,col+1)){
                occupyCells.push([row+1,col+1]);
            }
        }
    };
    if(imgId == "RookW.png"){
        //check up
        let i = 1;
        while((row-i >= 0)){
            if(!isEmpty(row-i,col)){
                occupyCells.push([row-i,col]);
                break;
            }
            i++;
            // break;
        }
        //check down
        let j = 1;
        while((row+j <= 7)){
            if(!isEmpty(row+j,col)){
                occupyCells.push([row+j,col]);
                break;
            }
            j++;
            // break;
        }
        //check right
        let k = 1;
        while((col+k <= 7)){
            if(!isEmpty(row,col+k)){
                occupyCells.push([row,col+k]);
                break;
            }
            k++;
            // break;
        }
        //check left
        let l = 1;
        while((col-l >= 0)){
            if(!isEmpty(row,col-l)){
                occupyCells.push([row,col-l]);
                break;
            }
            l++;
            // break;
        }
    };
    if(imgId == "KnightW.png"){
        //check top left in
        if((row-2 >= 0) && (col-1 >= 0)){
            if(!isEmpty(row-2,col-1)){
                occupyCells.push([row-2,col-1]);
            }
        }
        //check top right in
        if((row-2 >= 0) && (col+1 <= 7)){
            if(!isEmpty(row-2,col+1)){
                occupyCells.push([row-2,col+1])
            }
        }
        //check top left out
        if((row-1 >= 0) && (col-2 >= 0)){
            if(!isEmpty(row-1,col-2)){
                occupyCells.push([row-1,col-2])
            }
        }
        //check top right out
        if((row-1 >= 0) && (col+2 <= 7)){
            if(!isEmpty(row-1,col+2)){
                occupyCells.push([row-1,col+2])
            }
        }
        //check bot left in
        if((row+2 <= 7) && (col-1 >= 0)){
            if(!isEmpty(row+2,col-1)){
                occupyCells.push([row+2,col-1])
            }
        }
        //check bot right in
        if((row+2 <= 7) && (col+1 <= 7)){
            if(!isEmpty(row+2,col+1)){
                occupyCells.push([row+2,col+1])
            }
        }
        //check bot left out
        if((row+1 <= 7) && (col-2 >= 0)){
            if(!isEmpty(row+1,col-2)){
                occupyCells.push([row+1,col-2])
            }
        }
        //check bot right out
        if((row+1 <= 7) && (col+2 <= 7)){
            if(!isEmpty(row+1,col+2)){
                occupyCells.push([row+1,col+2]);
            }
        }
    };
    if(imgId == "BishopW.png"){
        //check top left
        let i = 1;
        while(row-i >= 0 && col-i >= 0){
            if(!isEmpty(row-i, col-i)){
                occupyCells.push([row-i,col-i]);
                break
            }
            i++;
        }
        //check top right
        let j = 1;
        while(row-j >= 0 && col+j <= 7){
            if(!isEmpty(row-j,col+j)){
                occupyCells.push([row-j,col+j]);
                break
            }
            j++;
        }
        //check bot left
        let k = 1;
        while(row+k <= 7 && col-k >= 0){
            if(!isEmpty(row+k,col-k)){
                occupyCells.push([row+k,col-k]);
                break
            }
            k++;
        }
        //check bot right
        let l = 1;
        while(row+l <= 7 && col+l <= 7){
            if(!isEmpty(row+l,col+l)){
                occupyCells.push([row+l,col+l]);
                break
            }
            l++;
        }
    };
    if(imgId == "QueenW.png"){
        //check up
        let i = 1;
        while((row-i >= 0)){
            if(!isEmpty(row-i,col)){
                occupyCells.push([row-i,col]);
                break;
            }
            i++;
            // break;
        }
        //check down
        let j = 1;
        while((row+j <= 7)){
            if(!isEmpty(row+j,col)){
                occupyCells.push([row+j,col]);
                break;
            }
            j++;
            // break;
        }
        //check right
        let k = 1;
        while((col+k <= 7)){
            if(!isEmpty(row,col+k)){
                occupyCells.push([row,col+k]);
                break;
            }
            k++;
            // break;
        }
        //check left
        let l = 1;
        while((col-l >= 0)){
            if(!isEmpty(row,col-l)){
                occupyCells.push([row,col-l]);
                break;
            }
            l++;
            // break;
        }
        //diagonals
        let m = 1;
        while(row-m >= 0 && col-m >= 0){
            if(!isEmpty(row-m, col-m)){
                occupyCells.push([row-m,col-m]);
                break
            }
            m++;
        }
        //check top right
        let n = 1;
        while(row-n >= 0 && col+n <= 7){
            if(!isEmpty(row-n,col+n)){
                occupyCells.push([row-n,col+n]);
                break
            }
            n++;
        }
        //check bot left
        let o = 1;
        while(row+o <= 7 && col-o >= 0){
            if(!isEmpty(row+o,col-o)){
                occupyCells.push([row+o,col-o]);
                break
            }
            o++;
        }
        //check bot right
        let p = 1;
        while(row+p <= 7 && col+p <= 7){
            if(!isEmpty(row+p,col+p)){
                occupyCells.push([row+p,col+p]);
                break
            }
            p++;
        }
        if(imgId == "KingW.png"){
            //check up
            if((row-1 >= 0)){
                if(!isEmpty(row-1,col)){
                    occupyCells.push([row-1,col])
                }
            }
            //check down
            if((row+1 <= 7)){
                if(!isEmpty(row-1,col)){
                    occupyCells.push([row+1,col])
                }            
            }
            //check right
            if((col+1 <= 7) && isEmpty(row,col+1)){
                if(!isEmpty(row,col+1)){
                    occupyCells.push([row,col+1])
                }
            }
            //check left
            if((col-1 >= 0) && isEmpty(row,col-1)){
                if(!isEmpty(row,col-1)){
                    occupyCells.push([row,col-1])
                }
            }
            //diagonals
            //check top left
            if(row-1 >= 0 && col-1 >= 0){
                if(isEmpty(row-1, col-1)){
                    occupyCells.push([row-1,col-1])
                }
            }
            //check top right
            if(row-1 >= 0 && col+1 <= 7){
                if(isEmpty(row-1,col+1)){
                    occupyCells.push([row-1,col+1])
                }
            }
            //check bot left
            if(row+1 <= 7 && col-1 >= 0){
                if(isEmpty(row+1,col-1)){
                    occupyCells.push([row+1,col-1])
                }
            }
            //check bot right
            if(row+1 <= 7 && col+1 <= 7 && isEmpty(row+1,col+1)){
                if(isEmpty(row+1,col+1)){
                    occupyCells.push([row+1,col+1])
                }
            }
        }
    };
    console.log(occupyCells);
    return occupyCells;
}

function setPossibleCells(row, col, imgId){
    let possibleCells = [];
    //White Pieces
    //only for first move of pawn
    if(imgId == "PawnWF.png"){
        console.log("hello");
        possibleCells.push([row-2,col]);
        possibleCells.push([row-1,col]);
    };
    if(imgId == "PawnW.png"){
        if(row-1 >=0 && isEmpty(row-1,col)){
            possibleCells.push([row-1,col]);
        }
    };
    if(imgId == "RookW.png"){
        //check up
        let i = 1;
        while((row-i >= 0) && isEmpty(row-i,col)){
            possibleCells.push([row-i,col]);
            i++;
        }
        //check down
        let j = 1;
        while((row+j <= 7) && isEmpty(row+j,col)){
            possibleCells.push([row+j,col]);
            j++;
        }
        //check right
        let k = 1;
        while((col+k <= 7) && isEmpty(row,col+k)){
            possibleCells.push([row,col+k]);
            k++;
        }
        //check left
        let l = 1;
        while((col-l >= 0) && isEmpty(row,col-l)){
            possibleCells.push([row,col-l]);
            l++;
        }
    };
    if(imgId == "KnightW.png"){
        //check top left in
        if((row-2 >= 0) && (col-1 >= 0) && isEmpty(row-2,col-1)){
            possibleCells.push([row-2,col-1]);
        }
        //check top right in
        if((row-2 >= 0) && (col+1 <= 7) && isEmpty(row-2,col+1)){
            possibleCells.push([row-2,col+1]);
        }
        //check top left out
        if((row-1 >= 0) && (col-2 >= 0) && isEmpty(row-1,col-2)){
            possibleCells.push([row-1,col-2]);
        }
        //check top right out
        if((row-1 >= 0) && (col+2 <= 7) && isEmpty(row-1,col+2)){
            possibleCells.push([row-1,col+2]);
        }
        //check bot left in
        if((row+2 <= 7) && (col-1 >= 0) && isEmpty(row+2,col-1)){
            possibleCells.push([row+2,col-1]);
        }
        //check bot right in
        if((row+2 <= 7) && (col+1 <= 7) && isEmpty(row+2,col+1)){
            possibleCells.push([row+2,col+1]);
        }
        //check bot left out
        if((row+1 <= 7) && (col-2 >= 0) && isEmpty(row+1,col-2)){
            possibleCells.push([row+1,col-2]);
        }
        //check bot right out
        if((row+1 <= 7) && (col+2 <= 7) && isEmpty(row+1,col+2)){
            possibleCells.push([row+1,col+2]);
        }

    };
    if(imgId == "BishopW.png"){
        //check top left
        let i = 1;
        while(row-i >= 0 && col-i >= 0 && isEmpty(row-i, col-i)){
            possibleCells.push([row-i,col-i]);
            i++;
        }
        //check top right
        let j = 1;
        while(row-j >= 0 && col+j <= 7 && isEmpty(row-j,col+j)){
            possibleCells.push([row-j,col+j]);
            j++;
        }
        //check bot left
        let k = 1;
        while(row+k <= 7 && col-k >= 0 && isEmpty(row+k,col-k)){
            possibleCells.push([row+k,col-k]);
            k++;
        }
        //check bot right
        let l = 1;
        while(row+l <= 7 && col+l <= 7 && isEmpty(row+l,col+l)){
            possibleCells.push([row+l,col+l]);
            l++;
        }
    };
    if(imgId == "QueenW.png"){
        //check up
        let i = 1;
        while((row-i >= 0) && isEmpty(row-i,col)){
            possibleCells.push([row-i,col]);
            i++;
        }
        //check down
        let j = 1;
        while((row+j <= 7) && isEmpty(row+j,col)){
            possibleCells.push([row+j,col]);
            j++;
        }
        //check right
        let k = 1;
        while((col+k <= 7) && isEmpty(row,col+k)){
            possibleCells.push([row,col+k]);
            k++;
        }
        //check left
        let l = 1;
        while((col-l >= 0) && isEmpty(row,col-l)){
            possibleCells.push([row,col-l]);
            l++;
        }
        //diagonals
        //check top left
        let m = 1;
        while(row-m >= 0 && col-m >= 0 && isEmpty(row-m, col-m)){
            possibleCells.push([row-m,col-m]);
            m++;
        }
        //check top right
        let n = 1;
        while(row-n >= 0 && col+n <= 7 && isEmpty(row-n,col+n)){
            possibleCells.push([row-n,col+n]);
            n++;
        }
        //check bot left
        let o = 1;
        while(row+o <= 7 && col-o >= 0 && isEmpty(row+o,col-o)){
            possibleCells.push([row+o,col-o]);
            o++;
        }
        //check bot right
        let p = 1;
        while(row+p <= 7 && col+p <= 7 && isEmpty(row+p,col+p)){
            possibleCells.push([row+p,col+p]);
            p++;
        }
    };
    if(imgId == "KingW.png"){
        //check up
        if((row-1 >= 0) && isEmpty(row-1,col)){
            possibleCells.push([row-1,col]);
        }
        //check down
        if((row+1 <= 7) && isEmpty(row+1,col)){
            possibleCells.push([row+1,col]);
        }
        //check right
        if((col+1 <= 7) && isEmpty(row,col+1)){
            possibleCells.push([row,col+1]);
        }
        //check left
        if((col-1 >= 0) && isEmpty(row,col-1)){
            possibleCells.push([row,col-1]);
        }
        //diagonals
        //check top left
        if(row-1 >= 0 && col-1 >= 0 && isEmpty(row-1, col-1)){
            possibleCells.push([row-1,col-1]);
        }
        //check top right
        if(row-1 >= 0 && col+1 <= 7 && isEmpty(row-1,col+1)){
            possibleCells.push([row-1,col+1]);
        }
        //check bot left
        if(row+1 <= 7 && col-1 >= 0 && isEmpty(row+1,col-1)){
            possibleCells.push([row+1,col-1]);
        }
        //check bot right
        if(row+1 <= 7 && col+1 <= 7 && isEmpty(row+1,col+1)){
            possibleCells.push([row+1,col+1]);
        }
    }

    //Black Pieces
    if(imgId == "PawnBF.png"){
        console.log("hello");
        possibleCells.push([row+2,col]);
        possibleCells.push([row+1,col]);
    };
    if(imgId == "PawnB.png"){
        if(row+1 <=7 && isEmpty(row+1,col)){
            possibleCells.push([row+1,col]);
        }
    };
    if(imgId == "RookB.png"){
        //check up
        let i = 1;
        while((row-i >= 0) && isEmpty(row-i,col)){
            possibleCells.push([row-i,col]);
            i++;
        }
        //check down
        let j = 1;
        while((row+j <= 7) && isEmpty(row+j,col)){
            possibleCells.push([row+j,col]);
            j++;
        }
        //check right
        let k = 1;
        while((col+k <= 7) && isEmpty(row,col+k)){
            possibleCells.push([row,col+k]);
            k++;
        }
        //check left
        let l = 1;
        while((col-l >= 0) && isEmpty(row,col-l)){
            possibleCells.push([row,col-l]);
            l++;
        }
    };
    if(imgId == "KnightB.png"){
        //check top left in
        if((row-2 >= 0) && (col-1 >= 0) && isEmpty(row-2,col-1)){
            possibleCells.push([row-2,col-1]);
        }
        //check top right in
        if((row-2 >= 0) && (col+1 <= 7) && isEmpty(row-2,col+1)){
            possibleCells.push([row-2,col+1]);
        }
        //check top left out
        if((row-1 >= 0) && (col-2 >= 0) && isEmpty(row-1,col-2)){
            possibleCells.push([row-1,col-2]);
        }
        //check top right out
        if((row-1 >= 0) && (col+2 <= 7) && isEmpty(row-1,col+2)){
            possibleCells.push([row-1,col+2]);
        }
        //check bot left in
        if((row+2 <= 7) && (col-1 >= 0) && isEmpty(row+2,col-1)){
            possibleCells.push([row+2,col-1]);
        }
        //check bot right in
        if((row+2 <= 7) && (col+1 <= 7) && isEmpty(row+2,col+1)){
            possibleCells.push([row+2,col+1]);
        }
        //check bot left out
        if((row+1 <= 7) && (col-2 >= 0) && isEmpty(row+1,col-2)){
            possibleCells.push([row+1,col-2]);
        }
        //check bot right out
        if((row+1 <= 7) && (col+2 <= 7) && isEmpty(row+1,col+2)){
            possibleCells.push([row+1,col+2]);
        }

    };
    if(imgId == "BishopB.png"){
        //check top left
        let i = 1;
        while(row-i >= 0 && col-i >= 0 && isEmpty(row-i, col-i)){
            possibleCells.push([row-i,col-i]);
            i++;
        }
        //check top right
        let j = 1;
        while(row-j >= 0 && col+j <= 7 && isEmpty(row-j,col+j)){
            possibleCells.push([row-j,col+j]);
            j++;
        }
        //check bot left
        let k = 1;
        while(row+k <= 7 && col-k >= 0 && isEmpty(row+k,col-k)){
            possibleCells.push([row+k,col-k]);
            k++;
        }
        //check bot right
        let l = 1;
        while(row+l <= 7 && col+l <= 7 && isEmpty(row+l,col+l)){
            possibleCells.push([row+l,col+l]);
            l++;
        }
    };
    if(imgId == "QueenB.png"){
        //check up
        let i = 1;
        while((row-i >= 0) && isEmpty(row-i,col)){
            possibleCells.push([row-i,col]);
            i++;
        }
        //check down
        let j = 1;
        while((row+j <= 7) && isEmpty(row+j,col)){
            possibleCells.push([row+j,col]);
            j++;
        }
        //check right
        let k = 1;
        while((col+k <= 7) && isEmpty(row,col+k)){
            possibleCells.push([row,col+k]);
            k++;
        }
        //check left
        let l = 1;
        while((col-l >= 0) && isEmpty(row,col-l)){
            possibleCells.push([row,col-l]);
            l++;
        }
        //diagonals
        //check top left
        let m = 1;
        while(row-m >= 0 && col-m >= 0 && isEmpty(row-m, col-m)){
            possibleCells.push([row-m,col-m]);
            m++;
        }
        //check top right
        let n = 1;
        while(row-n >= 0 && col+n <= 7 && isEmpty(row-n,col+n)){
            possibleCells.push([row-n,col+n]);
            n++;
        }
        //check bot left
        let o = 1;
        while(row+o <= 7 && col-o >= 0 && isEmpty(row+o,col-o)){
            possibleCells.push([row+o,col-o]);
            o++;
        }
        //check bot right
        let p = 1;
        while(row+p <= 7 && col+p <= 7 && isEmpty(row+p,col+p)){
            possibleCells.push([row+p,col+p]);
            p++;
        }
    };
    if(imgId == "KingB.png"){
        //check up
        if((row-1 >= 0) && isEmpty(row-1,col)){
            possibleCells.push([row-1,col]);
        }
        //check down
        if((row+1 <= 7) && isEmpty(row+1,col)){
            possibleCells.push([row+1,col]);
        }
        //check right
        if((col+1 <= 7) && isEmpty(row,col+1)){
            possibleCells.push([row,col+1]);
        }
        //check left
        if((col-1 >= 0) && isEmpty(row,col-1)){
            possibleCells.push([row,col-1]);
        }
        //diagonals
        //check top left
        if(row-1 >= 0 && col-1 >= 0 && isEmpty(row-1, col-1)){
            possibleCells.push([row-1,col-1]);
        }
        //check top right
        if(row-1 >= 0 && col+1 <= 7 && isEmpty(row-1,col+1)){
            possibleCells.push([row-1,col+1]);
        }
        //check bot left
        if(row+1 <= 7 && col-1 >= 0 && isEmpty(row+1,col-1)){
            possibleCells.push([row+1,col-1]);
        }
        //check bot right
        if(row+1 <= 7 && col+1 <= 7 && isEmpty(row+1,col+1)){
            possibleCells.push([row+1,col+1]);
        }
    }
    console.log(possibleCells);
    return possibleCells;
    //console.log(possibleCells);
}

function isEmpty(row, col){
    // console.log("piece: " + $("tr").eq(row).find('td').eq(col).find('img').attr('src').split(/\//).pop());
    let selectedId = $("tr").eq(row).find('td').eq(col).find('img').attr('src').split(/\//).pop();
    if(selectedId == "blank.png"){
        console.log("blank image")
        return true;
    }
    else{
        //console.log(selectedId + " is here");
        return false;
    }
}

function occupyCell(currentRow, currentCol, selectedId, replaceRow, replaceCol){
    // console.log("piece to be replaced: " + $("tr").eq(row).find('td').eq(col).find('img').attr('src').split(/\//).pop());
    //let idToBeReplaced = $("tr").eq(row).find('td').eq(col).find('img').attr('src').split(/\//).pop();
    if(selectedId == "PawnWF.png"){
        setImgId(replaceRow, replaceCol, "PawnW.png");
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "PawnBF.png"){
        setImgId(replaceRow, replaceCol, "PawnB.png");
        setImgId(currentRow, currentCol, "blank.png");
    }
    // setImgId(replaceRow, replaceCol, selectedId);
    if(selectedId == "PawnW.png"){
        setImgId(replaceRow, replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "PawnB.png"){
        setImgId(replaceRow, replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }

    if(selectedId == "KnightW.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "KnightB.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "BishopW.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "BishopB.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "QueenW.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "QueenB.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "KingW.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }
    if(selectedId == "KingB.png"){
        setImgId(replaceRow,replaceCol, selectedId);
        setImgId(currentRow, currentCol, "blank.png");
    }

    //set imgId of cell to be occupied with selected cell
    //set selected cell img to blank
}

function setImgId(row, col, id){
    console.log("piece to be replaced: " + $("tr").eq(row).find('td').eq(col).find('img').attr('src'));
    let idToBeReplaced = $("tr").eq(row).find('td').eq(col).find('img');
    //let selectedTd = $("tr").eq(row).find('td').eq(col);
    idToBeReplaced.attr('src', "images/"+id);
    idToBeReplaced.addClass("draggable ui-draggable ui-draggable-handle");
    // selectedTd.addClass("droppable ui-droppable");
    return idToBeReplaced
}

function getImgIdRowCol(row,col){
    return id = $("tr").eq(row).find('td').eq(col).find('img').attr('src').split(/\//).pop();
}

function getImgId(cellPath){
    let idWithExtension = cellPath.split(/\//).pop();
    //console.log("id with extension= " + idWithExtension);
    //let id = splitPath.split(/\./)[0];
    // console.log(id);
    return idWithExtension;
}

function highlightCellOccupy(row,col){
    console.log("red: " + getImgIdRowCol(row,col));
    $("tr").eq(row).find('td').eq(col).css('border', '2px solid red');
    if(getImgIdRowCol(row,col) == "KingW.png"){
        $("tr").eq(row).find('td').eq(col).css('border', '2px solid green');
    }
}

function highlightCell(row, col){
    $("tr").eq(row).find('td').eq(col).css('border', '2px solid yellow');
    if(getImgIdRowCol(row,col) == "KingW.png"){
        $("tr").eq(row).find('td').eq(col).css('border', '2px solid green');
    }
}

function unHighlightCell(row,col){
    $("tr").eq(row).find('td').eq(col).css('border', '');
}

// class Piece{
//     constructor(row, col, pieceId){
//         this.row = row;
//         this.col = col;
//         this.pieceId = pieceId;
//     }
// }
$(window).on("load",setUp());

