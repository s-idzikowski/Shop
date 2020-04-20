import * as React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { CategoryData } from '../../../../gRPC/service_pb';

interface Props {
    index: number;
    category: CategoryData.AsObject;
    editHandler: (index: number) => void;
    removeHandler: (index: number) => void;
}

const CategoryRow: React.FunctionComponent<Props> = (props: Props) => {
    const cssColumn = "col-* p-1";
    const cssSub = "p-1 ml-4 mr-2 text-secondary";
    const cssValue = "font-weight-bold";
    const cssButtonRow = "row p-1 pr-3";
    const cssButton = "col p-1 m-1";
    const buttonDelete = props.category.active ? <MdDelete cursor="pointer" className={cssButton + " removeIcon"} onClick={(): void => props.removeHandler(props.index)} /> : "";

    return (
        <div className="row">
            <div className="col-8">
                <div className="row">
                    <div className={cssColumn}><sub className={cssSub}>Kategoria:</sub><strong className={cssValue}>{props.category.name}</strong></div>

                    <div className={cssColumn}><sub className={cssSub}>Aktywna:</sub><strong className={cssValue}>{props.category.active ? "T" : "N"}</strong></div>
                </div>
            </div>

            <div className="col-4">
                <div className={cssButtonRow}>
                    <FaEdit cursor="pointer" className={cssButton + " editIcon"} onClick={(): void => props.editHandler(props.index)} />
                    {buttonDelete}
                </div>
            </div>
        </div>
    );
}

export default CategoryRow;