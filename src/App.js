import React,{Suspense,lazy} from "react";
import './App.css';
import {
    Switch,
    Route,

} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import {Loading} from './components/Loading';

const Home = lazy(() => import('./views/Home'));
const History = lazy(() => import('./views/History'));
const About= lazy(() => import('./views/About'));
const Login = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));


function App() {
    return (
        <>
        <Header/>
        <main>
            <Suspense fallback={<Loading />}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/history" component={History} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
            </Suspense>
        </main>
         <Footer/>
        </>
    );
}

export default App;
