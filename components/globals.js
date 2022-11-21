import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*, *::before, *::after {
		letter-spacing: 0.03rem;
		box-sizing: border-box;
		outline: 0;
		padding: 0;
		margin: 0;
	}

	::-webkit-scrollbar {
		width: 0;
	}

	html {
		font-size: 62.5%;
	}

	body {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		background-color: hsl(230, 100%, 98%);
		font-family: 'Inter', sans-serif;
		color: hsl(230, 25%, 25%);
		font-size: 1.6rem;
		line-height: 1.5;
	}

	button, input {
		font-family: inherit;
		color: inherit;
	}

	button, input[type=button], input[type=submit] {
		cursor: pointer;
		border: none;
	}

	[disabled] {
		cursor: not-allowed;
	}
`