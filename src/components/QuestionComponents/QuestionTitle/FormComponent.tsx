import React, { FC } from 'react'
import { Typography } from 'antd'
const { Title } = Typography

interface FormComponentProps {

}

const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { level, title, isCenter } = props
    return (
        <Title level={level} style={{
            textAlign: isCenter ? 'center' : 'start',
            marginBottom: '0',
        }}>
            {title}
        </Title >
    );
}

export default FormComponent;