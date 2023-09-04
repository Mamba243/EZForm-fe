import { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import { QuestionCircleFilled } from '@ant-design/icons'
import { ComponentPropsType } from '../../../components/QuestionComponents'

interface ComponentPropsProps {

}

const NoProps: FC = () => {
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <QuestionCircleFilled style={{ fontSize: '50px', marginTop: '20px', marginBottom: '10px', color: '#E5E5E5' }} />
        <div style={{ color: '#999BA1', fontSize: '12px' }}>
            暂无选中组件
        </div>
    </div>
}

const ComponentProps: FC<ComponentPropsProps> = () => {
    const { selectedComponent } = useGetComponentInfo()
    const dispatch = useDispatch()

    const handlePropsChange = (newProps: ComponentPropsType) => {
        if (selectedComponent == null) return
        const { fe_id } = selectedComponent
        dispatch(changeComponentProps({ fe_id, newProps }))
    }

    // if (selectedComponent == null) return <NoProps />
    if (selectedComponent == null) return <span />

    const { type, props } = selectedComponent
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return <NoProps />

    const { PropsComponent } = componentConf

    return (
        <div style={{ margin: '0 12px' }}>
            <PropsComponent {...props} onChange={handlePropsChange} />
        </div>
    )
}

export default ComponentProps;