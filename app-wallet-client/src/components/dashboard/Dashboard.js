import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DashboardItem from "./DashboardItem";
import {connect} from "react-redux";
import {getWallet} from "../../actions/projectActions";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalBalance: 0.0
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.wallets) {
            let totalBal = 0;
            for (let i = 0; i < nextProps.wallets.length; i++) {
                totalBal = totalBal + nextProps.wallets[i].currentBalance
            }
            // for (let wallet in nextProps.wallets) {
            //     console.log(wallet)
            //     totalBal += wallet.currentBalance
            // }
            this.setState({totalBalance: totalBal});
        }
    }

    componentDidMount() {
        this.props.getWallet();
    }

    render() {

        const wallets = this.props.wallets;

        const walletComponent = wallets.map(
            wallet => (
                <DashboardItem key={wallet.id} wallet={(wallet)}/>
            )
        )

        // console.log(walletComponent);

        return (
            <>

                <div className="projects">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4 text-center">My Wallets</h1>
                                <br/>
                                <div className="btn-group">
                                    <button className="btn btn-info btn-lg dropdown-toggle" data-toggle="dropdown">
                                        Create New
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link to="/createWallet" className="dropdown-item">Wallet</Link>
                                        <button disabled className="dropdown-item">Transaction</button>
                                    </div>
                                </div>
                                <br/>
                                <div className="card text-center">
                                    <div className="card-header bg-success text-white">
                                        <h4>Current Balance (Total)</h4>
                                        <h1>Rs. {this.state.totalBalance}</h1>
                                    </div>
                                </div>
                                <hr/>

                                {/*<DashboardItem/>*/}
                                {
                                    walletComponent.length !== 0 ? walletComponent :
                                        <div className="alert alert-info text-center">No Wallet Found!!!</div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    wallets: state.wallet.wallets
});

export default connect(mapStateToProps, {getWallet})(Dashboard);