import React, {useState} from 'react';
import Input from '../Input/index'
import logo from '../resources/logo512.png'

const App = (props) => {
    const [inputValue, setInputValue] = useState('')

    const onChangeInputValue = (value) => {
    setInputValue(value)
    }

    return(
        <>
            <div>
                <Input
                inputValue={inputValue}
                onChangeInputValue={onChangeInputValue}
                />
            </div>
            <img src={logo} alt={'logo'} />
        </>
    );
}
export default App;