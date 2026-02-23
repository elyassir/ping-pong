

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style_Files/Style.css';

import Avatar from "@mui/material/Avatar";
import { Button } from 'react-bootstrap';
import { UserContext } from '../Context/main';

const MyComponent = ({ socket }: { socket: any }) => {
	const [playerOneScore, setPlayerOneScore] = useState(0);
	const [playerTwoScore, setPlayerTwoScore] = useState(0);
	const [playeroneimg, setPlayeroneimg] = useState('');
	const [playertwoimg, setPlayertwoimg] = useState('');
	const [Gamersult, setGameResult] = useState('Loading...');
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const whoami = useContext(UserContext);


	useEffect(() => {
		fetchData();
		window.addEventListener('beforeunload', (event) => {
			sessionStorage.setItem('reload', 'true');
		});
	}, []);

	const fetchData = async () => {
		try {

			socket.emit('getGameResult', { token: sessionStorage.getItem('GameToken') });
			socket.on('GameResult', (Result: any) => {
				setPlayerOneScore(Result.playerOScore);
				setPlayerTwoScore(Result.playerTScore);
				setPlayeroneimg(Result.PlayerOImage);
				setPlayertwoimg(Result.PlayerTImage);
				if (Result.playerOScore > Result.playerTScore) {
					if (whoami.username === Result.playerOUsername)
						setGameResult('You Won!');
					else
						setGameResult('You Lost!');
				}
				else if (Result.playerOScore < Result.playerTScore) {
					if (whoami.username === Result.playerTUsername)
						setGameResult('You Won!');
					else
						setGameResult('You Lost!');
				}
				else
					setGameResult('Game Draw!');
				sessionStorage.removeItem('GameToken');
				setLoading(false);
			});
		} catch (error) {
			console.error('Error fetching data:', error);
			setGameResult('Opps! Something went wrong');
			setLoading(false);
		}
	};

	return (
		<div id='all' className='bg-black  flex flex-col justify-center h-screen w-screen items-center relative text-white'>
			{loading ? (
				<>
					<div id="background"></div>
					<div id="leftPaddle" className="paddle"></div>
					<div id="ball"></div>
					<div id="rightPaddle" className="paddle"></div>
				</>
			) :
				(
					<>


						<div id='result' className='flex flex-col items-center  space-y-20 a'>

							<div id='lineStatus' className='flex flex-row text-white h-36 w-full justify-center lineStatus'>

								<div id='player1' className='player1 ' >
									<Avatar className='playerimg1'
										alt="PlyerImage"
										src={playeroneimg}
										sx={{
											width: { xs: 45, sm: 75, md: 100 },
											height: { xs: 45, sm: 75, md: 100 }
										}}
									/>
									<div id='score' className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
										{playerOneScore}
									</div>

								</div>
								<div id="vsmiddle" className="tiri">
									-
								</div>
								<div id='player2' className='player2'>
									<div id='score' className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
										{playerTwoScore}
									</div>
									<Avatar className='playerimg2'
										alt="PlyerImage"
										src={playertwoimg}
										sx={{
											width: { xs: 45, sm: 75, md: 100 },
											height: { xs: 45, sm: 75, md: 100 }
										}}
									/>
								</div>
							</div>

							<div id='gameResult' className='text-white '>
								{Gamersult}
							</div>

							<div id='HOME' className=''>
								<Button
									style={{ borderRadius: '10px' }}
									onClick={() => { navigate('/') }}>HOME</Button>
							</div>
						</div>
					</>
				)}
		</div>
	)
};

export default MyComponent;
