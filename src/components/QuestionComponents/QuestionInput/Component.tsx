import { FC } from "react";
import { Input, Typography, Space } from 'antd'
import { QuestionInputPropsType, DefaultQuestionInputProps } from './interface'
const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const { placeholder, title, answer, isRequired } = { ...DefaultQuestionInputProps, ...props }
    return (
        <div>
            <Paragraph strong><Space>{isRequired ? <span style={{ color: 'red' }}>*</span> : ""}{title}</Space></Paragraph>
            <Input placeholder={placeholder} value={answer}></Input>
        </div>
    );
}

export default QuestionInput;