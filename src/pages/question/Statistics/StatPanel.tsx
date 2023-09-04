import React, { FC, useState } from 'react'
import { Segmented } from 'antd'
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons'
import styles from './StatPanel.module.scss'
import ChartPanel from './ChartPanel'
import ListPanel from './ListPanel'

interface StatPanelProps {

}

const StatPanel: FC<StatPanelProps> = () => {
    const [activeTab, setActiveTab] = useState('List');

    const handleTabChange = (value: any) => {
        setActiveTab(value);
    };

    return (
        <div className={styles.container} >
            <div className={styles.segmentd}>
                <Segmented
                    options={[
                        {
                            label: '原始数据',
                            value: 'List',
                            icon: <BarsOutlined />,
                        },
                        {
                            label: '统计报表', 
                            value: 'Chart',
                            icon: <AppstoreOutlined />,
                        },
                    ]}
                    onChange={handleTabChange}
                />
            </div>
            <div className={styles.tabPanel}>
                {activeTab === 'List' && (
                    <div className={styles.listPanel}>
                        <ListPanel />
                    </div>
                )}
                {activeTab === 'Chart' && (
                    <div className={styles.chartPanel}>
                        <ChartPanel />
                    </div>
                )}
            </div>
        </div >
    );
}

export default StatPanel;