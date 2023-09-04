import React, { FC, useMemo } from 'react'
import { QuestionRadioStatPropsType } from './interface'
import { PieChart, Pie, Cell } from 'recharts'
import styles from '../StatComponent.module.scss'

function format(n: number) {
    return (n * 100).toFixed(2)
}

const StatComponent: FC<QuestionRadioStatPropsType> = (props: QuestionRadioStatPropsType) => {
    const { stat } = props

    // count 求和
    const sum = useMemo(() => {
        let s = 0
        stat.forEach(i => (s += i.subtotal))
        return s
    }, [stat])

    const data = stat.map((s: any) => {
        const { label, subtotal } = s
        return {
            name: label,
            value: subtotal
        }
    })

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

    return (
        <div className={styles.container}>
            <PieChart className={styles.chart} width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    label={i => `${i.name}: ${format(i.value / sum)}%`}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>选项</th>
                        <th>选择次数</th>
                        <th>占比</th>
                    </tr>
                </thead>
                <tbody>
                    {stat.map((s: any) => {
                        return (<tr>
                            <td>{s.label}</td>
                            <td>{s.subtotal}</td>
                            <td>{format(s.subtotal / sum)}%</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default StatComponent;
