import { FC } from "react"
import { Radio, Typography, Space } from "antd"
import { DefaultQuestionJudgeProps, QuestionJudgePropsType } from "./interface";
const { Paragraph } = Typography

const QuestionJudge: FC<QuestionJudgePropsType> = (props: QuestionJudgePropsType) => {
    const { title, isVertical, isRequired } = { ...DefaultQuestionJudgeProps, ...props }
    return (
        <div>
            <Paragraph strong><Space>{isRequired ? <span style={{ color: 'red' }}>*</span> : ""}{title}</Space></Paragraph>
            <Radio.Group >
                <Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
                    <Radio value={true}>对</Radio>
                    <Radio value={false}>错</Radio>
                </Space>
            </Radio.Group>
        </div>
    );
}

export default QuestionJudge;