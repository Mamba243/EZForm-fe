import { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input, InputNumber, Radio, Select, DatePicker } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

interface PageSettingProps {

}

const PageSetting: FC<PageSettingProps> = () => {
    const dispatch = useDispatch()
    const pageInfo = useGetPageInfo()

    const [form] = useForm()

    // 实时更新表单内容
    useEffect(() => {
        form.setFieldsValue(pageInfo)
    }, [pageInfo])

    // 修改问卷信息
    function handlePropsChange() {
        if (form == null) return;

        const newValues = form.getFieldsValue();

        if (newValues.dateRange) {
            const [startTime, endTime] = newValues.dateRange.map((date: any) => date.format('YYYY-MM-DD HH:mm'));
            newValues.startTime = startTime;
            newValues.endTime = endTime;
            delete newValues.dateRange;
        }
        dispatch(resetPageInfo(newValues));
    }

    return (
        <div style={{ margin: '0 12px' }}>
            <Form
                layout='vertical'
                initialValues={pageInfo}
                form={form}
                onValuesChange={handlePropsChange}
            >
                <Form.Item name='type' label='类型'>
                    <Select
                        options={[
                            { value: 0, label: '问卷' },
                            { value: 1, label: '考试' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name='title' label='问卷标题'>
                    <Input placeholder='请输入'></Input>
                </Form.Item>
                <Form.Item name='description' label='问卷描述'>
                    <Input placeholder='请输入'></Input>
                </Form.Item>
                <Form.Item name='dateRange' label='时间'>
                    <RangePicker showTime={{ format: 'HH:mm' }}
                        format='MM-DD HH:mm'
                        ranges={{
                            '今天': [dayjs().startOf('day'), dayjs().endOf('day')],
                            '本周': [dayjs().startOf('week'), dayjs().endOf('week')],
                            '本月': [dayjs().startOf('month'), dayjs().endOf('month')],
                            '1周后': [dayjs(), dayjs().add(1, 'week')],
                            '1个月后': [dayjs(), dayjs().add(1, 'month')],
                        }}
                    />
                </Form.Item>
                {
                    form.getFieldValue('type') === 1 ?
                        (<div>
                            <Form.Item name='progressBar' label='进度条'>
                                <Radio.Group>
                                    <Radio value={0}>开启</Radio>
                                    <Radio value={1}>关闭</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='oneQuestionPerPage' label='一页一题'>
                                <Radio.Group>
                                    <Radio value={0}>开启</Radio>
                                    <Radio value={1}>关闭</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='questionCard' label='答题卡'>
                                <Radio.Group>
                                    <Radio value={0}>开启</Radio>
                                    <Radio value={1}>关闭</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='copyQuestion' label='允许复制题目'>
                                <Radio.Group>
                                    <Radio value={0}>开启</Radio>
                                    <Radio value={1}>关闭</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='updateAnswer' label='允许修改答案'>
                                <Radio.Group>
                                    <Radio value={0}>开启</Radio>
                                    <Radio value={1}>关闭</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='swipingScreenMaxNum' label='最大切屏次数'>
                                <InputNumber min={0}
                                    style={{ width: '100%' }}
                                    defaultValue={3}
                                />
                            </Form.Item>
                            <Form.Item name='submitShortTime' label='最短提交时间'>
                                <InputNumber min={0}
                                    style={{ width: '100%' }}
                                    addonAfter="分钟"
                                />
                            </Form.Item>
                            <Form.Item name='submitLongTime' label='最长提交时间'>
                                <InputNumber min={0}
                                    style={{ width: '100%' }}
                                    addonAfter="分钟"
                                />
                            </Form.Item>
                        </div>
                        ) : ''
                }
            </Form>
        </div >
    );
}

export default PageSetting;

