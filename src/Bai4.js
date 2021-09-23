import React,{useState} from 'react'

const Bai4 = () => {    
    const arr = [];
    for (let i = 0; i < 64; i++) {
        arr[i]=''; 
    }
    const [isUser1,setIsUser1] = useState(true);
    const [data,setData] = useState(arr);
    const [items,setItems] =useState([]);
    
   
    
    
    const handleClick = (index,row,column,value) => {
        console.log('row,column',row,column,value)
        
        if(isUser1 && data[index]=== '' ){
            data[index] = 'X';
            setData([...data])
            setIsUser1(false);
            let itemX={row,column,value:'X'};
            setItems([...items,itemX]);
            
            
        }
        else if(!isUser1 && data[index] === ''){
            data[index] = 'O';
            setData([...data])
            setIsUser1(true);
            let itemY={row,column,value:'O'};
            setItems([...items,itemY]);
            
        }
        checkVictory(row,column,value);

        
    }

    const checkVictory = (row,column) => {
        
        handleCheckRow(row,column,'X');
        handleCheckRow(row,column,'O');
        handleCheckColumn(row,column,'X');
        handleCheckColumn(row,column,'O');
        handleMainDiagonal(row,column,'X');
        handleMainDiagonal(row,column,'O');
        handleAuxiliaryDiagonal(row,column,'X');
        handleAuxiliaryDiagonal(row,column,'O');


    }

    const handleCheckRow = (row,column,value='') => {
        
        let count = 0;
        for(let i=column;i>=0;i--){
            if(data[i+row*8]===value){
                count++;
            }
            else{
                break;
            }
        }
        for(let i=column+1;i<8;i++){
            if(data[i+row*8]===value){
                count++;
            }
            else{
                break;
            }
        }
        if(count >= 5){
            alert(`${isUser1 ? 'USER1':'USER2'} VICTORY`)
            setData(arr);
            setIsUser1(true);
        }
    }

    const handleCheckColumn = (row,column,value='') => {
       
        let count = 0;
        
        for(let i=row;i>=0;i--){
            if(data[i*8 + column]===value){
                count++;
            }
            else{
                break;
            }
        }
        for(let i=row+1;i<8;i++){
            if(data[i*8 + column]===value){
                count++;
            }
            else{
                break;
            }
        }
        
        if(count >= 5){
           alert(`${isUser1 ? 'USER1':'USER2'} VICTORY`)
           setData(arr);
           setIsUser1(true);
        }
    }

    const handleMainDiagonal = (row,column,value='') => {
        let count = 0;
        let tempRow = row
        for(let i=column;i>=0;i--){
            if(data[(i) + (8*(tempRow))]===value){
                count++;
            }
            else{
                break;
            }
            tempRow--;
        }
        for(let i=column+1;i<8;i++){
            if(data[(i)+(8*(row+1))]===value){
                count++;
            }
            else{
                break;
            }
            row++
        }
        console.log('count',count)
        if(count >= 5){
           alert(`${isUser1 ? 'USER1':'USER2'} VICTORY`)
           setData(arr);
           setIsUser1(true);
        }
    }

    const handleAuxiliaryDiagonal = (row,column,value='') => {
        let count = 0;
        let tempRow = row
        for(let i=column;i>=0;i--){
            if(data[(i) + (8*(tempRow))]===value){
                count++;
            }
            else{
                break;
            }
            tempRow++;
        }
        for(let i=column+1;i<8;i++){
            if(data[(i)+(8*(row-1))]===value){
                count++;
            }
            else{
                break;
            }
            row--;
        }
        console.log('count',count)
        if(count >= 5){
           alert(`${isUser1 ? 'USER1':'USER2'} VICTORY`)
           setData(arr);
           setIsUser1(true);
        }
    }

    return (
        <section className='container-2'>
            <header className='title-2'>
                <div className='user'>
                    <h3 className={isUser1 ?'active-user':''}>User1 (X)</h3>
                </div>
                <div className='user'>
                    <h3 className={!isUser1 ? 'active-user':''}>User2 (O)</h3>
                </div>
            </header>
            <div className='section-center'>
                {data.map((value,index) => {
                    const row = Math.floor(index/8);
                    const column = index%8;
                    return(
                        <div key={index} className='item'
                        onClick={()=>handleClick(index,row,column)}>{value}</div>

                    )
                })}
            </div>
        </section>
    )
}

export default Bai4
