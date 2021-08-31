import React from 'react'
import ReactDOM from 'react-dom'

import './test.less'
import './test.css'
import './test.sass'


const Test = () => {
    return (
        <h1>Test Success!</h1>
    )
}

ReactDOM.render(
    <React.StrictMode >

        <Test />

    </React.StrictMode>,
    document.getElementById('test')
);
console.log('js')