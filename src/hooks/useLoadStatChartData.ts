import { useEffect } from "react"
import { useRequest } from 'ahooks'
import { useParams } from "react-router-dom"
import { statChartDataService } from '../services/question'

function useLoadStatChartData() {
    const { id = '' } = useParams()

    const { data, loading, error } = useRequest(
        async () => {
            if (!id) return;
            const data = await statChartDataService(id)
            return data
        }
    )

    return { loading, error, data }
}

export default useLoadStatChartData

