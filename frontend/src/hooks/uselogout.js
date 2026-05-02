import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "../components/useworkoutscontext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')
        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        // clear workouts
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }

    return { logout }
}