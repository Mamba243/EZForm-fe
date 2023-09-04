function useGetTitleByFeId(fe_id: string, componentList: any) {
    const selectedComponent = componentList.find((c: any) => c.fe_id === fe_id)
    if (!selectedComponent) return
    const { props } = selectedComponent
    return props.title
}

export default useGetTitleByFeId