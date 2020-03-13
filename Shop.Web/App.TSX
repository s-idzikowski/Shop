import * as React from "react";

declare var require: any

//var React = require('react');
var ReactDOM = require('react-dom');
// test 2
export class Hello extends React.Component {
    render() {
        return (
            <h1>Welcome to React!! aaa</h1>
        );
    }

    renderaaa() {
        return (
            <h1>Welcome to React!! bbbb</h1>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));