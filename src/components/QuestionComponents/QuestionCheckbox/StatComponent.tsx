import React, { FC, useMemo } from 'react'
import { QuestionCheckboxStatPropsType } from './interface'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from '../StatComponent.module.scss'

function format(n: number) {
    return (n * 100).toFixed(2)
}

const StatComponent: FC<QuestionCheckboxStatPropsType> = (props: QuestionCheckboxStatPropsType) => {
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
            <BarChart
                width={400}
                height={300}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="value" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
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