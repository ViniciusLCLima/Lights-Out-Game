import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  static defaultProps = {
    nRows:5,
    nCols:5,
    chanceLightStartsOn: 0.5
  }
constructor(props){
  super(props);
  this.state = {
    board: this.createBoard(),
    hasWon: false,
  }
}
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i = 0; i<this.props.nRows;i++){
      board.push([])  
      for(let n = 0; n<this.props.nCols; n++){
        board[i].push(Math.random()<this.props.chanceLightStartsOn);
      }
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord)=> {
    let ncols = this.props.nCols
    let nrows = this.props.nRows;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x)
    flipCell(y, x + 1)
    flipCell(y, x - 1)
    flipCell(y + 1, x)
    flipCell(y - 1, x)
    const hasWon = board.every(row=>row.every(cell=>!cell))

    this.setState({board:board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {
    const game = <div><h1 className="Board-title Board-msg">Lights Out</h1><table className="Board-table"><tbody>{this.state.board.map((row,idx) =>{
      return <tr key={idx}>{this.state.board[idx].map((isLit,i)=>{
        const coord = idx+"-"+i
        return <Cell key={coord} isLit={isLit} flipCellsAroundMe={()=>{this.flipCellsAround(coord)}} />
      })}</tr>
    })}</tbody></table></div>
    return <main className="Board">
      {this.state.hasWon? <p className="Board-won-msg Board-msg">You won!</p>: game}
    </main>
  }
}


export default Board;
