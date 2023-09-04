import React, { FC } from 'react'
import { Layout } from 'antd'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

import SidePanel from './SidePanel'
import StatHeader from './StatHeader'
import StatPanel from './StatPanel'

const Statistics: FC = () => {

    useLoadQuestionData();

    return (
        <div className={styles.container}>
            <Layout style={{ minHeight: '100vh' }}>
                <SidePanel />
                <div className={styles.right}>
                    <div className={styles.header}>
                        <StatHeader />
                    </div>
                    <div className={styles.main}>
                        <StatPanel />
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Statistics;
