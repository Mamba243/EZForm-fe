import React, { FC } from 'react'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

interface FormComponentProps {

}

// Info组件不需要Form.Item
const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { title, desc } = props
    const descList = desc.split('\n')
    return (
        <div>
            <Title level={3}>{title}</Title>
            {
                descList.map((d: any, index: any) => {
                    return <Paragraph style={{ color: '#999BA1', fontSize: '14px', marginBottom: '0' }} key={index}>{d}</Paragraph>
                })}
        </div>
    );
}

export default FormComponent;