import React from 'react';

export default class Test extends React.Component {
    componentDidMount() {
        console.log('called compoentDidMount....................');
    }

    render() {
        return (<h1>Test component</h1>)
    }
}