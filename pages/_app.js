import StoreProvider from 'sources/stores'
import Content from 'components/content'
import { useState, useEffect } from 'react'
import Head from 'next/head'

const App = ({ Component, pageProps }) => {

	const [ mounted, setMounted ] = useState(false)

	useEffect(() => {
		setMounted(true)
	})

	return mounted && (
		<StoreProvider>
			<Head>
				<title>Employee Management System</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" />
			</Head>

			<Content>
				<Component { ...pageProps } />
			</Content>
		</StoreProvider>
	)
}

export default App