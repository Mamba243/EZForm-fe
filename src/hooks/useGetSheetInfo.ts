import { useSelector } from 'react-redux'
import type { StateType } from '../store'
import type { SheetInfoType } from '../store/sheetInfoReducer'


function useGetPageInfo() {
    const sheetInfo = useSelector<StateType>(state => state.sheetInfo) as SheetInfoType;
    return sheetInfo
}

export default useGetPageInfo