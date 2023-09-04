import { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import ComponentProps from './ComponentProps'
import PageSetting from './PageSetting'
import { SlidersOutlined, SettingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'



interface RightPanelProps {

}

const RightPanel: FC<RightPanelProps> = () => {
    const [activeKey, setActiveKey] = useState('setting')

    const { selectedId } = useGetComponentInfo()
    useEffect(() => {
        if (selectedId) {
            setActiveKey('props')
        } else {
            setActiveKey('setting')
        }
    }, [selectedId])

    const items = [
        {
            key: 'props',
            label: (
                <span>
                    <SlidersOutlined />
                    属性
                </span>
            ),
            children: <ComponentProps></ComponentProps>,
        },
        {
            key: 'setting',
            label: (
                <span>
                    <SettingOutlined />
                    设置
                </span>
            ),
            children: <PageSetting></PageSetting>,
        }
    ]
    return (
        <div>
            <Tabs
                defaultActiveKey="props" items={items}
                activeKey={activeKey}
            />
        </div>
    );
}

export default RightPanel;

