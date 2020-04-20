import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import { UserRequest, CategoriesResponse, CategoryData, ChangeCategoryRequest, BasicResponse, AddCategoryRequest } from '../../../../gRPC/service_pb';
import Client from '../../../class/Client';
import Loading from '../../../components/Loading/Loading';
import ServiceError from '../../../components/ServiceError/ServiceError';
import Category from './Category';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CategoryRow from './CategoryRow';
import { toast } from 'react-toastify';

interface State {
    categories: Array<CategoryData.AsObject>;
    error: boolean;
    loading: boolean;
    category: CategoryData.AsObject;
    categoryIndex?: number;
}

class AdministrationCategories extends React.Component<Readonly<{}>, State> {
    state: State = {
        categories: null,
        error: false,
        loading: true,
        category: null,
        categoryIndex: null,
    };

    constructor(props: Readonly<{}>) {
        super(props);

        this.downloadHandler();
    }

    downloadHandler(): void {
        Client.Instance().getCategories(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: CategoriesResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        error: false,
                        loading: false,
                        categories: response.getCategorydataList().map((value) => value.toObject()),
                    });
                };

                const onError = (): void => {
                    this.setState({
                        error: true,
                        loading: false,
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    error: true,
                    loading: false,
                });
            });
        });
    }

    updateCategoryHandler = (category: CategoryData.AsObject): void => {
        this.setState({
            loading: true,
        });

        const changeCategoryRequest: ChangeCategoryRequest = new ChangeCategoryRequest();
        const categoryData: CategoryData = new CategoryData();
        categoryData.setId(category.id);
        categoryData.setName(category.name);
        categoryData.setActive(category.active);

        if (category.parent) {
            const parentData: CategoryData = new CategoryData();
            parentData.setId(category.parent.id);
            categoryData.setParent(parentData);
        }
        changeCategoryRequest.setCategorydata(categoryData);

        Client.Instance().categoryChange(changeCategoryRequest, Client.Header(), (err: grpcWeb.Error, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    toast.success("Kategoria została zaktualizowana.");

                    this.setState({
                        loading: false,
                    });

                    this.downloadHandler();
                };

                Client.CheckStatusCode(response.getStatuscode(), null, onSuccess, null);

            }, () => {
                this.setState({
                    loading: false,
                });
            });
        });
    };

    addCategoryHandler = (category: CategoryData.AsObject): void => {
        this.setState({
            loading: true,
        });

        const addCategoryRequest: AddCategoryRequest = new AddCategoryRequest();
        const categoryData: CategoryData = new CategoryData();
        categoryData.setId(category.id);
        categoryData.setName(category.name);
        categoryData.setActive(category.active);
        addCategoryRequest.setCategorydata(categoryData);

        Client.Instance().addCategory(addCategoryRequest, Client.Header(), (err: grpcWeb.Error, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    toast.success("Kategoria została dodana.");

                    this.setState({
                        loading: false,
                    });

                    this.downloadHandler();
                };

                Client.CheckStatusCode(response.getStatuscode(), null, onSuccess, null);

            }, () => {
                this.setState({
                    loading: false,
                });
            });
        });
    };

    addNewHandler = (): void => {
        this.setState({
            categoryIndex: null,
            category: new CategoryData().toObject(),
        });
    };

    editHandler(index: number): void {
        this.setState({
            categoryIndex: index,
            category: this.state.categories[index],
        });
    }

    removeHandler(index: number): void {
        const categories = this.state.categories;
        
        categories[index].active = false;

        this.setState({
            categories: categories,
        });

        this.updateCategoryHandler(categories[index]);
    }

    saveHandler(category: CategoryData.AsObject, index: number): void {
        const categories = this.state.categories;

        if (index != null) {
            categories[index] = category;
        } else {
            categories.push(category);
        }

        this.setState({
            categories: categories,
            categoryIndex: null,
            category: null,
        });

        if (category.id) {
            this.updateCategoryHandler(category);
        }
        else {
            this.addCategoryHandler(category);
        }
    }

    cancelHandler(): void {
        this.setState({
            categoryIndex: null,
            category: null,
        });
    }

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.loading) {
            return <Loading />
        }
        else if (this.state.category) {
            return <Category index={this.state.categoryIndex} category={this.state.category} saveHandler={this.saveHandler.bind(this)} cancelHandler={this.cancelHandler.bind(this)} />
        }

        const items = this.state.categories.map((value, index) => {
            return <CategoryRow key={index} category={value} index={index} editHandler={this.editHandler.bind(this)} removeHandler={this.removeHandler.bind(this)} />;
        });

        return (
            <div className="p-2">
                <div className="row p-2">
                    <AiOutlinePlusCircle cursor="pointer" className="col plusIcon p-2" onClick={this.addNewHandler.bind(this)} />
                </div>

                <div>
                    {items}
                </div>
            </div>
        );
    }
}

export default AdministrationCategories;