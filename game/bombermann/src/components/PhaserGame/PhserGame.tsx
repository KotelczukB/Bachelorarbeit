import React from 'react';
import Phaser from 'phaser';
import LoadScene from '../../phaser/LoadScene';
import GameScene from '../../phaser/GameScene';
import { MenuScene } from '../../phaser/MenuScene';

export interface IGameProps {}

export interface IGameState {}

export class PhaserGame extends React.Component<IGameProps, IGameState> {
	componentDidMount() {
		const game = new Phaser.Game({
			type: Phaser.AUTO,
			width: '100%',
			height: '100%',
			parent: 'phaser-game',
			scene: [LoadScene, MenuScene, GameScene],
      render: {
        pixelArt: true
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false
        }
			}
		});
	}

	shouldComponentUpdate() {
		return false;
	}

	public render = (): JSX.Element => {
		return (
				<div className="game-container" id="phaser-game" />
		);
	};
}