import { FC } from 'react'
import { DefaultQuestionInfoProps, QuestionInfoPropsType } from './interface'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title, desc } = { ...DefaultQuestionInfoProps, ...props }
    const descList = desc.split('\n')
    return (
        <div>
            <Title level={3}>{title}</Title>
            {
                descList.map((d, index) => {
                    return <Paragraph style={{ color: '#999BA1', fontSize: '14px', marginBottom: '0' }} key={index}>{d}</Paragraph>
                })}
        </div>
    );
}

export default QuestionInfo;