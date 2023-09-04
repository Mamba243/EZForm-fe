import React, { FC, MouseEvent, useState } from 'react'
import { Layout, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import { ComponentInfoType } from '../../../store/componentsReducer/index'
import styles from './SidePanel.module.scss'
import classnames from 'classnames'

const { Sider } = Layout

interface SiderProps {

}

const SidePanel: FC<SiderProps> = () => {
    const [collapsed, setCollapsed] = useState(false)
    const { componentList, selectedId } = useGetComponentInfo()

    function getComponent(componentInfo: ComponentInfoType) {
        const { type, props } = componentInfo
        const componentConf = getComponentConfByType(type)
        if (componentConf == null) return null

        const { Component } = componentConf
        return <Component {...props} />
    }

    // 点击组件
    const handleClick = (e: MouseEvent, id: string) => {
        e.stopPropagation();
        // dispatch(changeSelectedId(id))
    }

    return (
        <Sider collapsible collapsed={collapsed}
            onCollapse={(value) => { setCollapsed(value) }}
            collapsedWidth={0} theme='light'
            trigger={<Button
                style={{ position: 'relative', left: '-5px', border: 'none' }}
                icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            />}
            width={300}
        >
            {!collapsed ?
                <div className={styles.sider}>
                    {componentList.map((c: any, index: number) => {
                        const defaultClassName = styles['component-wrapper']
                        const selectedClassName = styles.selected

                        const wrapperClassName = classnames({
                            [defaultClassName]: true,
                            [selectedClassName]: c.fe_id === selectedId
                        })

                        const defaultBarClassName = styles.bar
                        const displayClassName = styles['display-none']

                        const barClassName = classnames({
                            [defaultBarClassName]: true,
                        })

                        return (
                            <div className={wrapperClassName} key={c.fe_id} onClick={e => handleClick(e, c.fe_id)}>
                                <div className={styles.component}>
                                    <div className={styles.content}>
                                        {getComponent(c)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div> : ''
            }
        </Sider>
    );
}

export default SidePanel;