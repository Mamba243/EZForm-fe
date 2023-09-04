import { useRequest } from 'ahooks'
import { useParams } from "react-router-dom"
import { statRawDataService } from '../services/question'

function useLoadStatRowData() {
    const { id = '' } = useParams()

    const { data, loading, error, refresh } = useRequest(
        async () => {
            if (!id) return;
            const data = await statRawDataService(id)
            return data
        }
    )
    return { loading, error, data, refresh };
}

export default useLoadStatRowData

