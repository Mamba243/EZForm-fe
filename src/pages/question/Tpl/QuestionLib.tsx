import { FC } from "react";
import { Typography } from 'antd'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents/index'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from 'nanoid'
import styles from './QuestionLib.module.scss'
const { Paragraph } = Typography

interface QuestionLibProps {

}

const QuestionLib: FC<QuestionLibProps> = () => {
    const dispatch = useDispatch()

    // TODO:为什么用ComponentConfType就会报错
    function getComponent(c: ComponentConfType) {
        const { Component, type, title, defaultProps } = c
        function handleClick() {
            dispatch(addComponent({
                fe_id: nanoid(5),
                title: title,
                type: type,
                props: defaultProps
            }))
        }

        return (
            <div key={type} className={styles.wrapper} onClick={handleClick}>
                <div className={styles.component}>
                    <Component />
                </div>
            </div>
        )
    }

    return (
        <div style={{ margin: '0 12px' }}>
            {
                componentConfGroup.map((group) => {
                    const { groupId, groupName, components } = group
                    return (
                        <div key={groupId}>
                            <Paragraph style={{ textAlign: 'start', color: '#999BA1', fontSize: '12px' }}>{groupName}</Paragraph>
                            <div>{components.map(c => getComponent(c))}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuestionLib;