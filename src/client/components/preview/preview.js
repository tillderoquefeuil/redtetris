import React from 'react';
import { connect } from 'react-redux';

import GameOver from '../board/gameOver.js';
import { PreviewsContainer, PreviewWrapper, PreviewScore, PreviewName } from '../board/styles.js';
import utils from '../board/utils.js';

const Previews = (props) => {

    if (!props.players || props.players.length === 1 || !props.name){
        return null;
    }

    let players = utils.getOtherPlayers(props.players, props.name);

    let previews = [];
    for (let i in players){
        previews.push(<Preview player={ players[i] } />)
    }

    return (
        <PreviewsContainer>
            { previews }
        </PreviewsContainer>
    );
};

const Preview = (props) => {

    if (!props.player.blocks){
        return null;
    }

    let blocks = utils.initPreview(props.player.blocks);

    return (
        <PreviewWrapper>
            <PreviewName>{ props.player.name }</PreviewName>
            { utils.buildBoard(blocks, true) }
            <GameOver gameOver={ props.player.gameOver } preview={ true } />
            <PreviewScore>{ props.player.score }</PreviewScore>
        </PreviewWrapper>
    );
};


function mapStateToProps(state) {
    return {
        players     : state.board.players,
        name        : state.login.name
    };
}

export default connect(mapStateToProps)(Previews);