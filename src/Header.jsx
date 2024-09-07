import './Header.css';

function Header(props) {
    return (
        <div className='header'>
            <p className='title'>MEMORY GAME</p>
            <div className='description'>
                <p> - Get points by clicking all different pokemon shown, without clicking the same one twice in each round</p>
                <p> - Once a round is finished, new set of pokemon will appear</p>
                <p> - Each round gets harder but you get bonus points!</p>
                <p> - Clicking smae pokemon will resets you back to round 1</p>
            </div>
            <div className='scoreboard'>
                <p> Round : {props.round}</p>
                <p> Score : {props.score}</p>
                <p> Highscore : {props.highscore}</p>
            </div>
        </div>
    )
}

export default Header;