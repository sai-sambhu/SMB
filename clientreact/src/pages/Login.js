import { useState } from 'react'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()
        //alert(0);
		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
        //alert(1);
		const data = await response.json()
        //alert(data.status);

		if (data.status==="ok") {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} 
		else if(data.status === 'error')
		{
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
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
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default App
