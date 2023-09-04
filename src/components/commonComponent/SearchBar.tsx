import { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { Input, Button } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

interface SearchBarProps {

}

const SearchBar: FC<SearchBarProps> = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [keyword, setKeyword] = useState('')

    const [searchParams] = useSearchParams()
    useEffect(() => {
        const curVal = searchParams.get('keyword') || ''
        setKeyword(curVal)
    }, [searchParams])

    function handleSearch() {
        nav({
            pathname,
            search: `keyword=${keyword}`
        })
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value)
    }

    return (
        <div style={{ display: 'flex' }}>
            <Input placeholder='请输入' onChange={handleChange} value={keyword}></Input>
            <Button type='link' onClick={handleSearch} style={{ paddingRight: 0 }}>搜索</Button>
        </div>
    );
}

export default SearchBar;