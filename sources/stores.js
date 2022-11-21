import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

export const Store = createContext()

const initialState = {
	sidebar: false,
	session: Cookies.get('SESSION') ? JSON.parse(Cookies.get('SESSION')) : null,

	employee_generate_id: '',
	employee_edit_data: {},
	employee_delete_id: '',

	position_edit_data: {},
	position_delete_id: '',

	workhours_edit_data: {},
	workhours_delete_id: '',

	payroll_view_id: '',

	deduction_edit_data: {},
	deduction_delete_id: '',

	deduction_delete_id: ''
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SIDEBAR':
			return {
				...state,
				sidebar: action.payload
			}
		
		case 'SESSION':
			return {
				...state,
				session: action.payload
			}

		case 'EMPLOYEE_GENERATE_ID':
			return {
				...state,
				employee_generate_id: action.payload
			}

		case 'EMPLOYEE_EDIT_DATA':
			return {
				...state,
				employee_edit_data: action.payload
			}

		case 'EMPLOYEE_DELETE_ID':
			return {
				...state,
				employee_delete_id: action.payload
			}

		case 'POSITION_EDIT_DATA':
			return {
				...state,
				position_edit_data: action.payload
			}

		case 'POSITION_DELETE_ID':
			return {
				...state,
				position_delete_id: action.payload
			}

		case 'WORKHOURS_EDIT_DATA':
			return {
				...state,
				workhours_edit_data: action.payload
			}

		case 'WORKHOURS_DELETE_ID':
			return {
				...state,
				workhours_delete_id: action.payload
			}

		case 'PAYROLL_VIEW_ID':
			return {
				...state,
				payroll_view_id: action.payload
			}

		case 'DEDUCTION_EDIT_DATA':
			return {
				...state,
				deduction_edit_data: action.payload
			}

		case 'DEDUCTION_DELETE_ID':
			return {
				...state,
				deduction_delete_id: action.payload
			}

		case 'ATTENDANCE_DELETE_ID':
			return {
				...state,
				attendance_delete_id: action.payload
			}

		default:
			return state
	}
}

const StoreProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initialState)
	const value = { state, dispatch }

	return (
		<Store.Provider value={ value }>
			{ children }
		</Store.Provider>
	)
}

export default StoreProvider