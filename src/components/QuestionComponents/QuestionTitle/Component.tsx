import { FC } from "react";
import { Typography } from 'antd'
import { QuestionTitlePropsType, DefaultQuestionTitleProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { level, title, isCenter } = { ...DefaultQuestionTitleProps, ...props }

    return (
        <Title level={level} style={{
            textAlign: isCenter ? 'center' : 'start',
            marginBottom: '0',
        }}>
            {title}
        </Title >
    );
}

export default QuestionTitle;