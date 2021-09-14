import { render } from '@testing-library/react';
import React,{useEffect, useState} from 'react'

const Bai1 = () => {
    
    const data = [1,2,3,4,5,6,7,8,''];
    const randomData = data.sort(() => {
        return Math.random() - 0.5
    })
    
    const dataValueFirst = [{column:0,number:randomData[0]},{column:1,number:randomData[1]},{column:2,number:randomData[2]}];
    const dataValueSecond = [{column:0,number:randomData[3]},{column:1,number:randomData[4]},{column:2,number:randomData[5]}];
    const dataValueThird = [{column:0,number:randomData[6]},{column:1,number:randomData[7]},{column:2,number:randomData[8]}];
    
    const [dataFirst,setDataFirst] = useState(dataValueFirst);
    const [dataSecond,setDataSecond] = useState(dataValueSecond);
    const [dataThird,setDataThird] = useState(dataValueThird);
    // console.log('data1: ',dataFirst);
    // console.log('data2: ',dataSecond);
    // console.log('data3: ',dataThird);

    

    let items = [
        dataFirst,
        dataSecond,
        dataThird
    ];
    console.log('items: ',items)
    
    const findEmpty = () => {
        let emptyValue = dataFirst.find((data) => data.number==='');
        if(emptyValue){
            return {line:0,...emptyValue};
        } 
        else{
            emptyValue = dataSecond.find((data) => data.number==='');
            if(emptyValue){
                return {line:1,...emptyValue};

                
            }
            else{
                emptyValue = dataThird.find((data) => data.number==='');
                return {line:2,...emptyValue};

            }
        }
    }

    const handleClick  = (line,column) => {
        const emptyValue = findEmpty();
        console.log(items[emptyValue.line][emptyValue.column])
        console.log(emptyValue);
        console.log(line,column)
        if((line===emptyValue.line) && ((column===(emptyValue.column-1) )||( emptyValue.column===(column-1)))){
            if(line===0){
                let temp = dataFirst[column].number;
                dataFirst[column].number=dataFirst[emptyValue.column].number;
                dataFirst[emptyValue.column].number=temp;
                console.log(dataValueFirst)
                setDataFirst([...dataFirst]);
                console.log('data1: ',dataFirst)
            }
            if(line===1){
                let temp = dataSecond[column].number;
                dataSecond[column].number=dataSecond[emptyValue.column].number;
                dataSecond[emptyValue.column].number=temp;
                console.log(dataValueSecond)
                console.log(temp)
                setDataSecond([...dataSecond]);
                console.log('data2: ',dataSecond);
            }
            if(line===2){
                let temp = dataThird[column].number;
                dataThird[column].number=dataThird[emptyValue.column].number;
                dataThird[emptyValue.column].number=temp;
                console.log(dataValueThird)
                setDataThird([...dataThird]);
                console.log('data3: ',dataThird)
            }
        }
        if((column === emptyValue.column)&&((line===(emptyValue.line-1)||(emptyValue.line===(line-1))))){
            if(column === 0){
                let newColumn = [dataFirst[0].number,dataSecond[0].number,dataThird[0].number];
                let temp = newColumn[line];
                newColumn[line] = newColumn[emptyValue.line]
                newColumn[emptyValue.line]=temp;
                dataFirst[0].number=newColumn[0];
                dataSecond[0].number=newColumn[1];
                dataThird[0].number=newColumn[2];
                setDataFirst([...dataFirst]);
                setDataSecond([...dataSecond]);
                setDataThird([...dataThird]);
            }
            if(column === 1){
                let newColumn = [dataFirst[1].number,dataSecond[1].number,dataThird[1].number];
                let temp = newColumn[line];
                newColumn[line] = newColumn[emptyValue.line]
                newColumn[emptyValue.line]=temp;
                dataFirst[1].number=newColumn[0];
                dataSecond[1].number=newColumn[1];
                dataThird[1].number=newColumn[2];
                setDataFirst([...dataFirst]);
                setDataSecond([...dataSecond]);
                setDataThird([...dataThird]);
            }
            if(column === 2){
                let newColumn = [dataFirst[2].number,dataSecond[2].number,dataThird[2].number];
                let temp = newColumn[line];
                newColumn[line] = newColumn[emptyValue.line]
                newColumn[emptyValue.line]=temp;
                dataFirst[2].number=newColumn[0];
                dataSecond[2].number=newColumn[1];
                dataThird[2].number=newColumn[2];
                setDataFirst([...dataFirst]);
                setDataSecond([...dataSecond]);
                setDataThird([...dataThird]);
            }
        }
    }
    
    
    
    return (
        <div className='container'>
            <div className='title'>
                <h1>Bài toán Ta Canh</h1>
            </div>
            <div className='underline'></div>
            <ul className='list'>
                {dataFirst.map((data,index) => {
                    const {column,number} = data;
                    const line = 0;
                    return(<li key={column} className={`item ${number === '' && 'active-btn'}`} onClick={() => handleClick(line,column)}>
                        <button>{number}</button>
                    </li>)
                })}
            </ul>
            <ul className='list'>
                {dataSecond.map((data,index) => {
                    const {column,number} = data;
                    const line=1;
                    return(<li key={column} className={`item ${number ==='' && 'active-btn'}`} onClick={() => handleClick(line,column)}>
                        <button>{number}</button>
                    </li>)
                })}
            </ul>
            <ul className='list'>
                {dataThird.map((data,index) => {
                    const {column,number} = data;
                    const line=2;
                    return(<li key={column} className={`item ${number ==='' && 'active-btn'}`} onClick={() => handleClick(line,column)}>
                        <button>{number}</button>
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default Bai1
