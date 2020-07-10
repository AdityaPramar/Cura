import { IonContent, IonCol, IonPage, IonButton, IonFab, IonFabButton, IonFabList, IonIcon, IonGrid } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
// import { getCurrentUser } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebaseConfig'
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';
// import { error } from 'console';
const axios = require('axios')


const Dashboard: React.FC = () => {
	const [vaccine, setVaccine] = useState('')
	const [confirmed, setConfirmed] = useState()
	const [recovered, setRecovered] = useState()
	const [deaths, setDeaths] = useState()
	const [user, setUser] = useState([{
		username: '',
		Vaccinated: false
	}])
	const username = useSelector((state: any) => state.user.username)
	const history = useHistory()


	async function logout() {
		await logoutUser()
		history.replace('/login')
	}

	//HAAN
	useEffect(() =>{
		if (username === 'minet'){
			history.replace('/admindash')
		}
	},[history,username])

	useEffect(() => {
		axios.post('https://api.arhaanb.co/cura/user', {
			username: username
		}).then((res: any) => {
			setUser(res.data.vaccinated)
		}).catch((error: any) => {
			// console.log(error)
		});
	}, [username])

	useEffect(() => {
		axios.get('https://covid19.mathdro.id/api/countries/india')
			.then((res: any) => {
				// console.log(res.data)
				setConfirmed(res.data.confirmed.value)
				setRecovered(res.data.recovered.value)
				setDeaths(res.data.deaths.value)
			})
	}, [])

	useEffect(() => {
		if (Boolean(user) === true) {
			const vaccineStatus = 'true'
			setVaccine(vaccineStatus)
		} else {
			const vaccineStaus = 'false'
			setVaccine(vaccineStaus)
		}

	},[user])


	// console.log(user)
	//{username} is the registered username so use that kbye
	return (
		<IonPage>
			<IonContent>
				<IonGrid>
					<IonCol>


						<div className="header">
							<h1 className="center title">Hi, {username}</h1>
							{vaccine === 'true' &&
								<div>
									<div className="status">
										<div className="circle green"></div>
										<p className="center success">Vaccinated</p>
										<p className="center success"></p>
									</div>
									<p className="center">
										<img src="https://i.postimg.cc/WbnJRwcC/badge.png" alt="" className="badge" />
									</p>
								</div>
							}

							{vaccine === 'false' &&
								<div>
									<div className="status">
										<div className="circle red"></div>
										<p className="center fail">Not Vaccinated</p>
									</div>
									<p className="center">Book an appointment and get <Link to='/hospitals'>vaccinated</Link></p>
								</div>
							}
						</div>

						<h1 className="medium">Recent stats</h1>
						<p className="center fail" key={confirmed}>{confirmed}</p>
						<p className="center fail" key={recovered}>{recovered}</p>
						<p className="center fail" key={deaths}>{deaths}</p>
						<IonButton className='logoutButton' expand="block" onClick={logout}>Logout</IonButton>


					</IonCol>
				</IonGrid>
				<IonFab slot='fixed' vertical='bottom' horizontal='end'>
					<IonFabButton>
						<IonFabButton>
							<IonIcon icon={analyticsOutline} />
						</IonFabButton>
					</IonFabButton>
					<IonFabList side='top'>
						<IonFabButton routerLink='/Vaccines'>
							<IonIcon icon={eyedropOutline} />
						</IonFabButton>
						<IonFabButton routerLink='/news'>
							<IonIcon icon={barChartOutline}></IonIcon>
						</IonFabButton>
						<IonFabButton routerLink='/hospitals'>
							<IonIcon icon={heartOutline}></IonIcon>
						</IonFabButton>
						<IonFabButton routerLink='/dashboard'>
							<IonIcon icon={personOutline}></IonIcon>
						</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Dashboard;
