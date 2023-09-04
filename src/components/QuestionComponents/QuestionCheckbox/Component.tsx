import { FC } from "react"
import { Checkbox, Typography, Space } from "antd"
import { DefaultQuestionCheckboxProps, QuestionCheckboxPropsType } from "./interface";
const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const { title, isVertical, options = [], isRequired } = { ...DefaultQuestionCheckboxProps, ...props }
    return (
        <div>
            <Paragraph strong><Space>{isRequired ? <span style={{ color: 'red' }}>*</span> : ""}{title}</Space></Paragraph>
            <Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
                {options.map(opt => {
                    return <Checkbox value={opt.value} key={opt.value} checked={opt.checked}>{opt.label}</Checkbox>
                })}
            </Space>
        </div>
    );
}

export default QuestionCheckbox;