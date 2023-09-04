import { FC } from "react"
import { Radio, Typography, Space } from "antd"
import { DefaultQuestionRadioProps, QuestionRadioPropsType } from "./interface";
const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, isVertical, value, options = [], isRequired } = { ...DefaultQuestionRadioProps, ...props }
    return (
        <div>
            <Paragraph strong><Space>{isRequired ? <span style={{ color: 'red' }}>*</span> : ""}{title}</Space></Paragraph>
            <Radio.Group value={value}>
                <Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
                    {options.map(opt => {
                        return <Radio value={opt.value} key={opt.value}>{opt.label}</Radio>
                    })}
                </Space>
            </Radio.Group>
        </div>
    );
}

export default QuestionRadio;