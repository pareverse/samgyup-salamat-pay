import { GlobalStyles } from 'components/globals'
import { useState, useEffect, useContext } from 'react'
import { Themes } from 'components/themes'
import { XIcon } from 'components/icons'
import Headers from 'components/headers'
import Sidebar from 'components/sidebar'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Store } from 'sources/stores'

const Icons = styled.div`
	visibility: ${ props => props.useSide ? 'visible' : 'hidden' };
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	opacity: ${ props => props.useSide ? '1' : '0' };
	background-color: hsl(0, 0%, 100%);
	place-items: center;
	border-radius: 50%;
	transition: .5s;
	cursor: pointer;
	position: fixed;
	display: grid;
	z-index: 999;
	height: 50px;
	width: 50px;
	right: 30px;
	top: 30px;

	svg {
		stroke: hsl(230, 100%, 80%);
		height: 24px;
	}

	@media (${ Themes.Device.Laptop }) {
		display: none;
	}

	@media print {
		display: none !important;
	}
`

const Wrapper = styled.div`
	grid-template-rows: 70px 1fr;
	transition: .5s;
	display: grid;
	width: 100%;

	@media (${ Themes.Device.Laptop }) {
		width: ${ props => props.useSide ? 'calc(100% - 250px)' : '100%' };
	}
`

const Container = styled.div`
	justify-content: flex-end;
	position: relative;
	min-height: 100vh;
	display: flex;
	width: 100%;
`

const Content = ({ children }) => {

	const router = useRouter()

	const { state, dispatch } = useContext(Store)
	const { sidebar } = state

	const [ useSide, setUseSide ] = useState(false)

	useEffect(() => {
		if ( router.pathname === '/accounts' || router.pathname === '/' ) {
			setUseSide(false)
		}
	}, [router.pathname])

	const HANDLE_SIDEBAR = () => {
		useSide ? setUseSide(false) : setUseSide(true)
	}

	return (
		<>
			<GlobalStyles />

			<Container>
				{ router.pathname !== '/' && router.pathname !== '/accounts' && <Sidebar useSide={ useSide } /> }
				
				<Wrapper useSide={ useSide }>
					{ router.pathname !== '/' && router.pathname !== '/accounts' && <Headers HANDLE_SIDEBAR={ HANDLE_SIDEBAR } /> }
					{ children }
				</Wrapper>

				{
					router.pathname !== '/' && router.pathname !== '/accounts' && 
					<Icons useSide={ useSide } onClick={ HANDLE_SIDEBAR }>
						<XIcon />
					</Icons>
				}
			</Container>
		</>
	)
}

export default Content