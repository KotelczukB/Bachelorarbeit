import React from 'react';
import Phaser from 'phaser';
import LoadScene from '../../phaser/LoadScene';
import GameScene from '../../phaser/GameScene';
import { MenuScene } from '../../phaser/MenuScene';
import { StartScene } from '../../phaser/StartScene';

export interface IGameProps {
	client_service : Promise<any>;
	token: string;
}

export interface IGameState {}

export class PhaserGame extends React.Component<IGameProps, IGameState> {
	componentDidMount() {
		const game = new Phaser.Game({
			type: Phaser.AUTO,
			width: '100%',
			height: '100%',
			parent: 'phaser-game',
			scene: [LoadScene, StartScene, MenuScene, GameScene],
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
		console.log('phaser', this.props.client_service)
		game.scene.start('LOAD', {client: this.props.client_service, token: this.props.token })
		
	}

	shouldComponentUpdate() {
		return true;
	}

	public render = (): JSX.Element => {
		return (
				<div className="game-container" id="phaser-game" />
		);
	};
}