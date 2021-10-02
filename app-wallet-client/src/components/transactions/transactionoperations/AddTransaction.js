import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createTransaction} from "../../../actions/projectActions";
import {connect} from "react-redux";

class AddTransaction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: "",
            description: "",
            type: "1"
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler = (event, fieldName, checkbox) => {
        this.setState({
            [fieldName]: checkbox ? event.target.checked : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newTransaction = {
            amount: this.state.amount,
            description: this.state.description,
            type: this.state.type
        }
        console.log(this.state)

        this.props.createTransaction(newTransaction, this.props.history, this.props.match.params.id);
    }

    render() {

        let id = this.props.match.params.id;
        const {amount, description, type} = this.state;

        return (
            <>

                <div className="add-PBI">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link to={`/transactions/${id}`} className="btn-btn-light">
                                    <button className="btn btn-outline-success">Back to Wallet</button>
                                </Link>
                                <h4 className="display-4 text-center">Record New Transaction</h4>
                                <p className="lead text-center">UBL Account</p>

                                <form onSubmit={(event) => this.handleSubmit(event)}>

                                    <div className="form-group">
                                        <input type="number" min="1"
                                               value={amount}
                                               onChange={event => this.changeHandler(event, "amount", false)}
                                               className="form-control form-control-lg"
                                               placeholder="Amount"/>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            value={description}
                                            onChange={event => this.changeHandler(event, "description", false)}
                                            className="form-control-lg form-control"
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="example">Transaction Type : </label>
                                        <div className="form-check form-check-inline">
                                            <span className="badge badge-success">
                                            <input checked type="radio"
                                                   id="income"
                                                   onChange={event => this.changeHandler(event, "type", false)}
                                                   className="form-check-input"
                                                   name="type"
                                                   value="1"
                                                   selected="true"
                                            />
                                            <label htmlFor="income" className="form-check-label">Income</label>
                                            </span>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <span className="badge badge-success">
                                            <input type="radio"
                                                   id="expense"
                                                   onChange={event => this.changeHandler(event, "type", false)}
                                                   className="form-check-input"
                                                   name="type"
                                                   value="2"
                                            />
                                            <label htmlFor="expense" className="form-check-label">Expense</label>
                                            </span>
                                        </div>
                                    </div>
                                    {/*<h6>Transaction Date</h6>*/}
                                    {/*<div className="form-group">*/}
                                    {/*    <input type="date" className="form-control form-control-lg"/>*/}
                                    {/*</div>*/}
                                    <input type="submit" className="btn btn-primary btn-block mt-4"/>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default connect(null, {createTransaction})(AddTransaction);