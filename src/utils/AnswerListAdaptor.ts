type ObjType = {
    [key: string]: string
}

type ArrayType = {
    componentId: string,
    value: string
}

export function toArrayFormat(ansObj: ObjType, componentList: any[]) {
    if (!ansObj) return;
    const answerList = Object.keys(ansObj).map(key => {
        const component = componentList.find(item => item.fe_id === key);
        if (component) {
            return {
                componentId: key,
                value: ansObj[key],
                type: component.type
            };
        }
        return null;
    }).filter(item => item !== null);
    return answerList;
}

export function toObjectFormat(ansArray: ArrayType[]) {
    if (!ansArray) return
    const ansObj: ObjType = {};
    ansArray.forEach(item => {
        ansObj[item.componentId] = item.value;
    });
    return ansObj;
}