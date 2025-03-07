import React, {useState} from 'react'
import {Table} from 'antd'
import ReactPaginate from "react-paginate";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Meta} from "../../types/common";

interface TlaTableWrapperProps {
    meta: Meta;
    data: any[];
    callbackFunction: any;
    children: React.ReactNode;
    numberColumn?: boolean;
    numberColumnTitle?: string;
    hasSelection?: boolean;
    filterObj: Record<string, any> | null; // Object that holds filter data
    extra?: any; // Optional extra prop, you can replace "any" with a specific type if necessary
    formLoading: boolean;
}

const TlaTableWrapper: React.FC<TlaTableWrapperProps> = ({
                                                             meta,
                                                             data,
                                                             callbackFunction,
                                                             children,
                                                             numberColumn,
                                                             numberColumnTitle,
                                                             hasSelection,
                                                             filterObj,
                                                             extra,
                                                             formLoading
                                                         }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const handlePageClick = (event: any) => {
        callbackFunction({page: (event.selected + 1)})
    };

    return (
        <>
            <Table
                rootClassName={'w-full'}
                scroll={{x: 'max-content'}}
                pagination={false}
                loading={loading}
                dataSource={data}
                rowKey={'id'}
            >
                {numberColumn && (
                    <Table.Column
                        width={50}
                        title={numberColumnTitle}
                        render={(_text, _record, index) => {
                            let number = index + meta.from
                            return <>{`${number++}.`}</>
                        }}
                    />
                )}
                {children}
            </Table>
            <ReactPaginate
                className={"pagination"}
                breakLabel="..."
                nextLabel={<FiChevronRight/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={meta?.total}
                previousLabel={<FiChevronLeft/>}
                renderOnZeroPageCount={null}
            />
        </>
    )
}


export default TlaTableWrapper
