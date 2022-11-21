import styled from 'styled-components'
import useSWR from 'swr'
import axios from 'axios'

const Items = styled.div`
	box-shadow: rgba(149, 157, 165, 0.1) 0px 5px 15px;
	background-color: hsl(0, 0%, 100%);
	border-radius: 5px;
`

const Wrapper = styled.div`
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 125px 1000px;
	max-width: 1166px;
	min-height: 100%;
	padding: 30px;
	display: grid;
	width: 100%;
	gap: 30px;
`

const Container = styled.div`
	justify-content: center;
	position: relative;
	min-height: 100%;
	display: flex;
	width: 100%;

	${ Wrapper } {
		${ Items } {
			&:nth-child(5) {
				grid-column: 1 / span 4;
			}
		}
	}
`

const Dashboard = () => {

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data: employee, error: employee_error } = useSWR('/api/employees', fetcher, { refreshInterval: 1000 })
	const { data: attendance, error: attendance_error } = useSWR('/api/attendance', fetcher, { refreshInterval: 1000 })

	return (
		<Container>
			<Wrapper>
				<Items>
					{ employee && employee.length }
				</Items>

				<Items>
					
				</Items>

				<Items>
					
				</Items>

				<Items>
					
				</Items>

				<Items>
					
				</Items>
			</Wrapper>
		</Container>
	)
}

export default Dashboard