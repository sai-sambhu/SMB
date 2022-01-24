import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function App() {
	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [flatNo, setFlatNo] = useState('')
	const [block, setBlock] = useState('A')
	const [floor, setFloor] = useState('1')
	const [flat, setFlat] = useState('01')
	async function registerUser(event) {
		event.preventDefault()
        if (name === ""){
			alert("Name should not be empty");
			return;
		}
		
		else if (email === ""){
			alert("Email should not be empty");
			return;
		}
	
		else if (password === ""){
			alert("Password should not be empty");
			return;
		}
		else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)){
			
			alert("Password doesnt match the pattern, atleast one capital and small letter, one speacial character and more than 8 chars should be used");
			//"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
			return;
		}
		
		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				flatNo: block+floor+flat,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/login')
		}
		else if(data.status === 'error'){
			alert(data.error);

		}
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				
                <br />
				<label for="block">Block </label>
				<select name="block" id="block" onChange={(e) => setBlock(e.target.value)}>
				<option value="A">A</option>
				<option value="B">B</option>
				</select>

			    <label for="floor">Floor </label>
				<select name="floor" id="floor" onChange={(e) => setFloor(e.target.value)}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				</select>

				<label for="flat">Flat </label>
				<select name="flat" id="flat" onChange={(e) => setFlat(e.target.value)}>
				<option value="01">01</option>
				<option value="02">02</option>
				<option value="03">03</option>
				<option value="04">04</option>
				<option value="05">05</option>
				<option value="06">06</option>
				</select>

				<br />

				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

export default App
