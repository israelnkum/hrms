import {Card} from 'antd';
import {BiEnvelope, BiPhone} from 'react-icons/bi';
import TlaImage from '../../commons/tla-image';
import {People} from "../../types/people";

interface Props {
    data: People[]
}
function Grid({ data }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data.map((person) => (
                <Card key={person.id} className="p-4">
                    <div className="flex items-center">
                        <TlaImage size={50} src={'Avatar'} name={person.name} />
                        <div className="ml-3">
                            <p className="text-primary-800 text-lg font-bold">
                                {person.title} {person.name}
                            </p>
                            <p className="text-gray-600">{person.rank}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        {
                            person.work_email &&
                            <a href={`mailto:${person.work_email}`}>
                                <BiEnvelope className="inline mr-1" />
                                {person.work_email}
                            </a>
                        }

                        {
                            person.work_telephone &&
                            <a href={`tel:${person.work_telephone}`}>
                                <BiPhone className="inline mr-1" />
                                {person.work_telephone}
                            </a>
                        }
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default Grid;
