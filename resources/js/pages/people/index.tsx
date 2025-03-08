import {Button} from 'antd';
import {useEffect, useState} from 'react';
import {BiGridAlt, BiListUl} from 'react-icons/bi';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchPeople} from '../../services/people.service';
import {unwrapResult} from '@reduxjs/toolkit';
import List from "./list";
import Grid from "./grid";
import Loading from "../../components/loading.tsx";


function People() {
    const { people, filter } = useAppSelector((state) => state.people);
    const { data } = people;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

    useEffect(() => {
        dispatch(fetchPeople(new URLSearchParams(filter)))
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading text={''}/>

    return (
        <div>
            {/* Toggle Buttons */}
            <div className="flex justify-end gap-2 mb-4">
                <Button onClick={() => setViewMode('table')} icon={<BiListUl />}/>
                <Button onClick={() => setViewMode('grid')} icon={<BiGridAlt />}/>
            </div>

            {/* Table View */}
            {viewMode === 'table' ? <List data={people} filter={filter}/>: <Grid data={data}/>}
        </div>
    );
}

export default People;
