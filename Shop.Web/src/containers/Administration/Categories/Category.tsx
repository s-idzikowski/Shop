import * as React from 'react';

import { CategoryData } from '../../../../gRPC/service_pb';
import Loading from '../../../components/Loading/Loading';
import { Button, Label, Input } from 'reactstrap';
import ClientHelper from '../../../class/ClientHelper';
import { toast } from 'react-toastify';

interface Props {
    index?: number;
    category?: CategoryData.AsObject;
    saveHandler: (category: CategoryData.AsObject, index: number) => void;
    cancelHandler: () => void;
}

interface State {
    category: CategoryData.AsObject;
}

class Category extends React.Component<Props, State> {
    state: State = {
        category: null,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            category: props.category ?? new CategoryData().toObject()
        };
    }

    nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const category: CategoryData.AsObject = this.state.category;
        category.name = e.target.value;
        this.setState({
            category: category
        });
    }

    activeChangeHandler = (): void => {
        const category: CategoryData.AsObject = this.state.category;
        category.active = !category.active;
        this.setState({
            category: category
        });
    }
    
    saveHandler = (): void => {
        if (!this.validate())
            return;

        this.props.saveHandler(this.state.category, this.props.index);
    }

    validate = (): boolean => {
        let status = true;

        if (!ClientHelper.ValidateLength(this.state.category.name)) {
            status = false;
            toast.warn("Pole 'Nazwa kategorii' jest niepoprawne.");
        }

        return status;
    }

    render(): JSX.Element {
        if (!this.state.category) {
            return <Loading />
        }

        const cssRow = "row m-2";
        const cssColumn = "col-* p-1";
        const cssButton = "col p-1 m-1";

        return (
            <div>
                <div className={cssRow}>
                    <div className={cssColumn}>
                        <Label>Nazwa kategorii:</Label>
                    </div>
                    <div className={cssColumn}>
                        <Input value={this.state.category.name} onChange={this.nameChangeHandler.bind(this)} />
                    </div>
                    
                    <div className={cssColumn}>
                        <Label>Aktywność:</Label>
                    </div>
                    <div className={cssColumn}>
                        <input type="checkbox" checked={this.state.category.active} onChange={this.activeChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className={cssRow}>
                    <Button className={cssButton} onClick={this.saveHandler}>Zapisz</Button>
                    <Button className={cssButton} onClick={this.props.cancelHandler}>Anuluj</Button>
                </div>
            </div>
        );
    }
}

export default Category;