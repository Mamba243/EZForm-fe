import type { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionRadioConf, { QuestionRadioPropsType } from "./QuestionRadio";
import QuestionJudgeConf, { QuestionJudgePropsType } from "./QuestionJudge";
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from "./QuestionCheckbox";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionRateConf, { QuestionRatePropsType } from "./QuestionRate";

// 统一 题型组件支持参数的类型
export type ComponentPropsType =
    QuestionInputPropsType &
    QuestionTitlePropsType &
    QuestionCheckboxPropsType &
    QuestionRadioPropsType &
    QuestionInfoPropsType &
    QuestionRatePropsType &
    QuestionJudgePropsType

// 统一 题型组件配置的类型
export type ComponentConfType = {
    title: string
    type: string
    Component: FC<any>
    FormComponent: FC<any>
    PropsComponent: FC<any>
    StatComponent?: FC<any>
    defaultProps: any
}

// 全部题型组件的配置列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf, QuestionInfoConf, QuestionRadioConf, QuestionCheckboxConf, QuestionRateConf, QuestionJudgeConf]

// 题型组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConf, QuestionTitleConf],
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf],
    },
    {
        groupId: 'selectGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf, QuestionCheckboxConf, QuestionJudgeConf, QuestionRateConf],
    }
]

// 根据type获取组题型件配置
export function getComponentConfByType(type: string) {
    return componentConfList.find(c => c.type === type)
}

export const typeMapping = {
    questionCheckbox: '多选题',
    questionRadio: '单选题',
    questionJudge: '判断题',
    questionRate: '评分',
    questionInput: '问答题',
};

// 统一 题型组件支持参数的类型
export type QuestionType =
    'questionCheckbox' &
    'questionRadio' &
    'questionJudge' &
    'questionInput'&
    'questionRate'