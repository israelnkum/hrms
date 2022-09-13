import React from 'react'
import {Table, Space, Button} from 'antd'
import {connect} from "react-redux";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";

const { Column } = Table
const test = [
    {
        id: 1,
        institute: 'BlueCrest College',
        major: 'Web Development',
        startDate: '2012-08-24',
        endDate: '2016-10-09',
        key: 'name',
    },
];
function Qualifications () {
    return (
       <>
           <TlaTableWrapper extra={
               <TlaAddNew link={'add'}>
                   <Button>Add Qualification</Button>
               </TlaAddNew>
           } callbackFunction={() => {}} data={test}>
               <Column title="Institute" render={({institute}) => (
                   <Space size={0} direction={'vertical'}>
                       {institute}
                   </Space>
               )}/>
               <Column title="Major" render={({major}) => (
                   <Space size={0} direction={'vertical'}>
                       {major}
                   </Space>
               )}/>
               <Column title="Start Date" dataIndex={'startDate'}/>
               <Column title="End Date" dataIndex={'endDate'}/>
               <Column  title="Action" render={() => (
                   <Space size={0}>
                       <TlaEdit icon data={{}} link={'#'} type={'text'}/>
                       <TlaConfirm title={'Dependant'} callBack={()=>{}}/>
                   </Space>
               )}/>
           </TlaTableWrapper>
       </>
    )
}

Qualifications.propTypes = {
}

export default connect()(Qualifications)
