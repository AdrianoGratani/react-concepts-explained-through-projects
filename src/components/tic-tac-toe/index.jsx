//version 2;
import React, { useEffect, useState } from 'react';
import "./Styles.css";
function S({sq, onClick}) {  return <button className="s" onClick={onClick}>{sq}</button>  }

export default function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState(true);
    const [txt, setTxt] = useState(`move: ${turn ? 'X' : 'O'}` );

    function restart() { setSquares(Array(9).fill(''));    setTurn(true); setTxt(`move: ${turn ? 'X' : 'O'}`) }
    function hC(squareNum) {   if(squares[squareNum] !== '') {return;};
        let cpyArr = [...squares];          const squareVal = turn ? 'X' : 'O';          cpyArr[squareNum] = squareVal;         setSquares(cpyArr);     setTurn(!turn);                 
    }
    function wl(s) {      const p = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        for (let i = 0; i < p.length; i++) {  const [a, b, c] = p[i];       let pFound = s[a] && s[a] === s[b] && s[a] === s[c];      if(pFound){ return s[a] }; }
        return null;
    }
    function status(s) {
        const fullSquares = s.every((square)=> square !== '');      
        let wonLoseDraw = wl(s);                                   
        if (wonLoseDraw === null && !fullSquares) {setTxt(`move: ${turn ? 'X' : 'O'}`)}
        if (wonLoseDraw === null && fullSquares) {setTxt("game ended in a draw.")}
        if (wonLoseDraw === true && wonLoseDraw === 'X') {setTxt("X won the game."); setTimeout(()=> {restart()}, 3000)}                         
        if (wonLoseDraw === true && wonLoseDraw === 'O') {setTxt("O won the game."); setTimeout(()=> {restart()}, 3000)}
    }
    useEffect(()=> { status(squares); },[turn, squares])

    return (
        <div className="app-container">
            <h1 className="app-title">Tic-Tac-Toe React App</h1>
            <div className="row"> <S sq={squares[0]} onClick={()=> {hC(0); status(squares)}}/>    <S sq={squares[1]} onClick={()=> {hC(1); status(squares)}}/>     <S sq={squares[2]} onClick={()=> {hC(2); status(squares)}}/> </div>
            <div className="row"> <S sq={squares[3]} onClick={()=> {hC(3); status(squares)}}/>    <S sq={squares[4]} onClick={()=> {hC(4); status(squares)}}/>     <S sq={squares[5]} onClick={()=> {hC(5); status(squares)}}/> </div>
            <div className="row"> <S sq={squares[6]} onClick={()=> {hC(6); status(squares)}}/>    <S sq={squares[7]} onClick={()=> {hC(7); status(squares)}}/>     <S sq={squares[8]} onClick={()=> {hC(8); status(squares)}}/> </div>
            <div className="status">{txt}</div>
        </div>
    )
}


// version 1;

// import React, { useEffect, useState } from 'react';
// import Square from './Square';
// import "./Styles.css";

// export default function TicTacToe() {
//     const [squares, setSquares] = useState(Array(9).fill('')); const [isXTurn, setIsXTurn] = useState(true); const [gameStatus, setGameStatus] = useState('');

//     function determineWinner(squares) {        console.log(12341234)   
//         const p = [  [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]  ];
//         for (let i = 0; i < 10; i++){console.log(i+ 1)}
//         for (let i = 0; i < p.length; i++) {  const [a, b, c] = p[i];   console.log(i)
//             if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) { return squares[a]; };
//         }
//         return null;
//     }
    
//     function handleClick(squareCurr) {
//         let copySquares = [...squares];  if(copySquares[squareCurr]) return;  copySquares[squareCurr] = isXTurn ? "X" : "O";        
//         setIsXTurn(!isXTurn);    setSquares(copySquares);           // console.log("copy: " + copySquares);
//     }

//     useEffect(()=> {               
//         if (squares.every((item) => item !== '') && !determineWinner(squares)) { setGameStatus("Game finished in a draw."); }
//         if (determineWinner(squares)) {  setGameStatus(`The winner is ${determineWinner(squares)}`) } 
//         else {  setGameStatus(`Player ${isXTurn ? "X" : "O"}, it's your turn!`); }
//     }, [squares, isXTurn]);

//     return (
//         <div className="tic-tac-toe-container">
//             <h1>Tic Tac Toe Game App</h1>
//             <div className="row"><Square value={squares[0]} onClick={()=> handleClick(0)}/><Square value={squares[1]} onClick={()=> handleClick(1)}/><Square value={squares[2]} onClick={()=> handleClick(2)}/></div>
//             <div className="row"><Square value={squares[3]} onClick={()=> handleClick(3)}/><Square value={squares[4]} onClick={()=> handleClick(4)}/><Square value={squares[5]} onClick={()=> handleClick(5)}/></div>
//             <div className="row"><Square value={squares[6]} onClick={()=> handleClick(6)}/><Square value={squares[7]} onClick={()=> handleClick(7)}/><Square value={squares[8]} onClick={()=> handleClick(8)}/></div>
//             <h1>{gameStatus}</h1>
//         </div>
//     )
// }




// dai useState(squares[]) a questa funzione: ti dira' se c'e' un vincitore analizzando l'array e riscontrando eventuali pattern;
                // console.log("squares" + squares);
        // ['', '', ''],        // ['X', 'X', 'X'], => square[0] && square[0] === square[1] && square[0] === square[2]  = EXPLANATION:
        // squares['']: useStateSquare[partition] EMPTY;  squares['X'] = NOT EMPTY                     this partition pattern is stored, in an array which has ALL winning partition patterns; 
        // ['', '', ''],        // ['O', 'O', 'X'],                                                    you loop over (let i ...) this partition pattern array, every time a player makes a choice,
        // ['', '', ''],        // ['X', 'O', 'O'],                                                    and destructure each single pattern with array destructuring: [a, b, c] = patterns[i],
//                                                                                                     next, check if the value stored in useState squares[a] is NOT empty,  
        // [squares[0], squares[1], squares[2]],                                                       AND if is equal to useState squares[b], AND if is equal to useState squares[c]  
        // [squares[3], squares[4], squares[5]],
        // [squares[6], squares[7], squares[8]],