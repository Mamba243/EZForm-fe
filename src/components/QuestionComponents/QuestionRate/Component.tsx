import { FC } from 'react'
import { DefaultQuestionRateProps, QuestionRatePropsType } from './interface'
import { Rate, Typography, Space } from 'antd'
const { Paragraph } = Typography

const QuestionRate: FC<QuestionRatePropsType> = (props: QuestionRatePropsType) => {
    const { title, rate, count, allowHalf, character, isRequired } = { ...DefaultQuestionRateProps, ...props }

    return (
        <div>
            <Paragraph strong><Space>{isRequired ? <span style={{ color: 'red' }}>*</span> : ""}{title}</Space></Paragraph>
            <Rate
                defaultValue={rate}
                count={count}
                allowHalf={allowHalf}
                allowClear
                character={character === 'score' ? ({ index }: { index?: number }) => (index !== undefined ? index + 1 : '') : undefined}
            />
        </div>
    );
}

export default QuestionRate;            
