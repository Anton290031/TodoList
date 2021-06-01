import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <h1>index</h1>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
