import { FC } from 'react'
import { Result, Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

interface ResultPageProps {

}

const ResultPage: FC<ResultPageProps> = () => {
    const nav = useNavigate()
    const { id } = useParams()
    return (
        <Result
            status="success"
            title="提交成功"
            subTitle="感谢您的支持与配合"
            extra={
                <Button type="primary" onClick={() => nav(`/client/${id}`)}>
                    查看答卷
                </Button>
            }
        ></Result>
    );
}

export default ResultPage;