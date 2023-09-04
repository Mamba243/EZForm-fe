import React, { FC } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

interface EditProps {

}


const Edit: FC<EditProps> = () => {
    const dispatch = useDispatch()
    const { loading } = useLoadQuestionData()

    function clearSelectedId() {
        dispatch(changeSelectedId(''))
    }

    return (
        <div className={styles.container}>
            <EditHeader></EditHeader>
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel></LeftPanel>
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas loading={loading}></EditCanvas>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel></RightPanel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
