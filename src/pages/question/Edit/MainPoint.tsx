import { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './MainPoint.module.scss'

interface MainPointProps {

}

const MainPoint: FC<MainPointProps> = () => {
    const { componentList = [] } = useGetComponentInfo()
    return (
        <div style={{ margin: '0 12px' }}>
            {
                componentList.map((c, index) => {
                    const { title, props = {} } = c
                    return (
                        <div className={styles.wrapper}>
                            <span>
                                <span>{index + 1}、</span>
                                <span>{props.title}</span>
                            </span>
                            {/* <span>[{title}]</span> */}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MainPoint;