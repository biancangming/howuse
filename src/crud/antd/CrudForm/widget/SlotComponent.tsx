import { Emitter, EventType } from "mitt";
import { update } from "..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
import {ref} from "vue";


export default {
    props: _props,
    setup(props, {emit}) {
        const emitter = inject<Emitter<Record<EventType, unknown>>>(props.mittKey)
        const change = useChange(props, emit)
        const inputVal = ref(props.defaultValue)

        // 监听事件
        emitter?.on(update.updateSlotValue,({dataIndex, value}: any)=>{
            if(dataIndex == props.dataIndex){
                inputVal.value = value
                change(value)
            }
        })

        return () => (
            <>
                {props.slots[props.dataIndex]?.(inputVal)}
            </>
        )
    }
}
