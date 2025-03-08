import {Space, Table} from 'antd';
import {BiEnvelope, BiPhone} from 'react-icons/bi';
import TlaTableWrapper from '../../commons/table/tla-table-wrapper';
import TlaImage from '../../commons/tla-image';
import {fetchPeople} from '../../services/people.service';
import {PeopleType} from "../../types/people";

const {Column} = Table;

interface Props {
    data: PeopleType,
    filter: any
}

function List({data, filter}: Props) {
    return (
        <TlaTableWrapper
            numberColumn={false}
            filterObj={filter}
            callbackFunction={fetchPeople}
            data={data.data} meta={data.meta}>
            <Column
                render={(_, {title, name, rank}) => (
                    <Space>
                        <TlaImage size={50} src={'Avatar'} name={name}/>
                        <Space direction={'vertical'} size={1}>
                            <p className={'text-primary-800 text-lg md:text-2xl font-bold'}>
                                {title}&nbsp;{name}
                            </p>
                            {rank}
                        </Space>
                    </Space>
                )}
            />
            <Column
                render={(_, {work_email, work_telephone}) => (
                    <Space direction={'vertical'}>
                        { work_email && <a href={`mailto:${work_email}`} className={'flex items-center gap-2'}><BiEnvelope/> {work_email}</a> }
                        { work_telephone && <a href={`tel:${work_telephone}`} className={'flex items-center gap-2'}><BiPhone/> {work_telephone}</a> }
                    </Space>
                )}
            />
        </TlaTableWrapper>
    );
}

export default List;
