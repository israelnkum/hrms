import {Form} from "antd";
import TlaSelect from "../../commons/tla/TlaSelect";
import {useAppSelector} from "../../hooks";
import TlaDrawer from "../../commons/pop-ups/tla-drawer";

function FilterEmployees() {
    const {departments, ranks, jobCategories} = useAppSelector(state => state.common.commons)
    const filter = useAppSelector(state => state.employee.filter)

    // const { submitFilter, filter, exportFilter, departments, ranks, jobCategories } = props
    const initials = {
        ...filter,
        export: false
    }

    return (
        <TlaDrawer className={'w-92'}>
            <div className={'p-5'}>
                <Form layout={'vertical'} className={'capitalize'} size={'large'}>
                    <div className={'grid grid-cols-1'}>
                        <TlaSelect hasAll name={'department_id'} optionKey={'name'} options={departments}
                                   label={'departments'}/>
                        <TlaSelect hasAll name={'rank_id'} optionKey={'name'} options={ranks} label={'ranks'}/>
                        <TlaSelect hasAll name={'job_category_id'} optionKey={'name'} options={jobCategories}
                                   label={'job Categories'}/>
                    </div>
                </Form>
            </div>
        </TlaDrawer>
    )
}

export default FilterEmployees
