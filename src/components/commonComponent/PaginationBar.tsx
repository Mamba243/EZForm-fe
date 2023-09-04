import { FC } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface PaginationBarProps {
    total: number
    pageSize?: number
}

const PaginationBar: FC<PaginationBarProps> = (props: PaginationBarProps) => {
    const { total, pageSize = 10 } = props

    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    function handleChange(pageIndex: number, pageSize: number) {
        searchParams.set('pageIndex', pageIndex.toString())
        searchParams.set('pageSize', pageSize.toString())

        nav({
            pathname,
            search: searchParams.toString()
        })
    }

    return (
        <Pagination total={total} onChange={handleChange} pageSize={pageSize} />
    );
}

export default PaginationBar;
