import React from 'react'
import { Input } from 'antd';

const InputText = React.forwardRef((props, ref) => {
    return <Input ref={ref} {...props} onChange={v => props.onChange(v.target.value.toUpperCase())} />
})

const InputTextArea = React.forwardRef((props, ref) => {
    return <Input.TextArea ref={ref} {...props} onChange={v => props.onChange(v.target.value.toUpperCase())} />
})

export { InputText, InputTextArea }