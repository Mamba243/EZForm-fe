import { FC } from "react"
import useLoadStatChartData from "../../../hooks/useLoadStatChartData"
import { getComponentConfByType, typeMapping, QuestionType } from '../../../components/QuestionComponents'
import styles from './ChartPanel.module.scss'

const ChartPanel: FC = () => {
    const { loading, data } = useLoadStatChartData()
    if (!data) return (null);
    const { list: stat } = data

    // 生成统计图表
    function genStatElem(type: string, children: []) {
        const { StatComponent } = getComponentConfByType(type) || {}
        if (StatComponent == null) return <div>该组件无统计图表</div>
        return <StatComponent stat={children} />
    }

    return (
        <>
            {stat.map((item: any) => {
                console.log(item);
                const { type, children, title } = item
                const subtitle = typeMapping[type as QuestionType]
                if (!subtitle) return;

                return (
                    <div className={styles.chart}>
                        <div className={styles.title}>
                            Q:{title}
                        </div>
                        <div className={styles.subtitle}>
                            {subtitle + ' / 回答人数:1'}
                        </div>
                        {genStatElem(type, children)}
                    </div>
                )
            })}
        </>
    );
}

export default ChartPanel;