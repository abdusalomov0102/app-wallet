import React from "react";
import './App.css';
import Navbar from "./components/shared/Navbar";
import Welcome from "./components/Welcome";
import Dashboard from "./components/dashboard/Dashboard";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreateWallet from "./components/dashboard/dashboardoperations/CreateWallet";
import UpdateWallet from "./components/dashboard/dashboardoperations/UpdateWallet";
import NotFound from "./components/shared/NotFound";
import {Provider} from 'react-redux';
import store from './store';
import Transaction from "./components/transactions/Transaction";
import AddTransaction from "./components/transactions/transactionoperations/AddTransaction";

function App() {
    return (
        <>

            <Provider store={store}>
                <Router>
                    <Route path="/" component={Navbar}/>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/dashboard" exact component={Dashboard}/>
                        <Route path="/createWallet" exact component={CreateWallet}/>
                        <Route path="/updateWallet/:id" exact component={UpdateWallet}/>
                        <Route path="/transactions/:id" exact component={Transaction}/>
                        <Route path="/transactions/add/:id" exact component={AddTransaction}/>
                        <Route path="/" component={NotFound}/>
                    </Switch>
                </Router>
            </Provider>

        </>
    );
}

export default App;
