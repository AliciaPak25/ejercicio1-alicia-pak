import React, {useState, useEffect} from 'react'
import { getFakeData1, getFakeData2 } from '../fakeRequest'

export default function Input(props) {
    const [inputValueInComponent, setinputValueInComponent] = useState('')
    const [arrayNames, setArrayNames] = useState([])
    const [arrayLastNames, setArrayLastNames] = useState([])

    const getData = async() => {
        const firstNameWithId = await getFakeData1()
        const lastNameWithId = await getFakeData2()
        
        console.log({firstNameWithId, lastNameWithId})

        setArrayNames(firstNameWithId)
        setArrayLastNames(lastNameWithId)
    }
    useEffect(()=>{
        getData()
        
    },[])
    
    useEffect(()=>{
        setinputValueInComponent(props.inputValue)
    },[props.inputValue])

    const arrayFullNames = arrayNames.concat(arrayLastNames);
    
    var sameIdCount = 0;
        for(var i = 0; i < arrayNames.length; i++){
            for(var j= 0; j < arrayLastNames.length; j++){
                if(arrayNames[i].id === arrayLastNames[j].id)
                    sameIdCount++
            }
        }
    console.log(sameIdCount);

    let sortedArrayNames = [];
    arrayNames.map((name) => {
        sortedArrayNames[arrayLastNames.findIndex(surname => surname.id === name.id)] = name.firstName;
    });
    sortedArrayNames = sortedArrayNames.filter(v => v).sort()
    console.log(sortedArrayNames);
    
    let sortedArrayLastNames = [];
    arrayLastNames.map((surname) => {
        sortedArrayLastNames[arrayNames.findIndex(name => name.id === surname.id)] = surname.lastName;
    });
    sortedArrayLastNames = sortedArrayLastNames.filter(v => v).sort()
    console.log(sortedArrayLastNames);
    
    const filteredNames = sortedArrayNames.filter((fullName) => fullName.toLowerCase().includes(inputValueInComponent.toLowerCase()))
    
    const filteredLastNames = sortedArrayLastNames.filter((fullName) => fullName.toLowerCase().includes(inputValueInComponent.toLowerCase()))
    
    return (
        <>
            <input
                onChange={e => props.onChangeInputValue(e.target.value)}
                value={inputValueInComponent}
            />
            <div style={{display: 'flex', position: 'absolute'}}>
                <div style={{marginRight: '1em'}}>
                    {inputValueInComponent === '' ? (null) :
                        filteredNames?.map((name)=>
                        <p key={name}>{name}</p>
                    )}
                </div>
                <div>
                    {inputValueInComponent === '' ? (null) :
                        filteredLastNames?.map(surname=>
                        <p key={surname}>{surname}</p>
                    )}
                </div>
            </div> 
        </>
    )
}