import React,{useState,useEffect} from 'react'
import { Img } from './assets/img'

const Bai2 = () => {
    
    const [jar1,setJar1] = useState(0);
    const [jar2,setJar2] = useState(0);
    const [max1,setMax1] = useState(0);
    const [max2,setMax2] = useState(0);
    const [target,setTarget] = useState(0);
    
    const [list,setList] =useState([]);
    
    

    const handleClick1 = () => {
        
        let newJar = parseInt(jar1) + parseInt(jar2);
        let oldJar
        if(jar2 ===0){
             oldJar = (parseInt(jar1) - parseInt(max2))>0 ? (parseInt(jar1) - parseInt(max2)):0;
        }
        if(jar2 !==0){
             oldJar = (parseInt(jar1) - (parseInt(max2)-parseInt(jar2)))>0 ? (parseInt(jar1) - (parseInt(max2)-parseInt(jar2))):0;

        }

        
        if(newJar>max2){
            newJar=max2;
        }
        setJar2(newJar)
        setJar1(oldJar);
        
        
    }
    const handleClick2 = () => {
        let newJar = parseInt(jar1) + parseInt(jar2);
        let oldJar
        if(jar1 ===0){
             oldJar = (parseInt(jar2) - parseInt(max1))>0 ? (parseInt(jar2) - parseInt(max1)):0;
        }
        if(jar1 !==0){
             oldJar = (parseInt(jar2) - (parseInt(max1)-parseInt(jar1)))>0 ? (parseInt(jar2) - (parseInt(max1)-parseInt(jar1))):0;

        }
        
        if(newJar>max1){
            newJar=max1;
        }
        setJar1(newJar)
        setJar2(oldJar);
        
    }
    const handleClick3 = () => {
        let newJar = parseInt(max1)
        setJar1(newJar);
    }
    const handleClick4 = () => {
        let newJar = parseInt(max2)
        setJar2(newJar);
    }


    useEffect(()=>{
        if((parseInt(jar1)===parseInt(target) || parseInt(jar2)===parseInt(target))&& parseInt(target)!==0){
            alert('Victory')
            
            
        }
    },[jar1,jar2])

    const handleBfs = () => {
        setList([]);
        let bottle1 = 0;
        let bottle2 = 0;
        let queue = [{action:'begin',bottle1,bottle2}];
        let father = [{action:'begin',bottle1,bottle2}]
        const one = parseInt(max1);
        const two = parseInt(max2);
        while (true) {
            let tempQueue = [];
            let tempObject = queue.shift()
            
            console.log(tempObject?.action, tempObject?.bottle1, tempObject?.bottle2);
            if(tempObject !== undefined){
                bottle1 = tempObject.bottle1;
                bottle2 = tempObject.bottle2;
                
                if (bottle1 === parseInt(target) || bottle2 === parseInt(target)) {
                    console.log('Founded');
                    break;
                }
                if(bottle1 === 0){
                    if (bottle2 === 0) {
                        tempQueue.push({
                            action: 'Đổ đầy bình 1',
                            bottle1: one,
                            bottle2: 0,
                        });
                        tempQueue.push({
                            action: 'Đổ đầy bình 2',
                            bottle1: 0,
                            bottle2: two,
                        });
                    } else if (bottle2 === two) {
                        if (one >= two) {
                            tempQueue.push({
                            action: 'Đổ bình 2 sang bình 1',
                            bottle1: two,
                            bottle2: 0,
                            });
                        } else {
                            tempQueue.push({
                            action: 'Đổ bình 2 sang bình 1',
                            bottle1: one,
                            bottle2: two - one,
                            });
                        }
                        } else {
                        if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== bottle2
                        )
                            tempQueue.push({
                            action: 'Đổ đầy bình 1',
                            bottle1: one,
                            bottle2: bottle2,
                            });
                        if (one >= two) {
                            if (
                            father[father.length - 2].bottle1 !== bottle2 ||
                            father[father.length - 2].bottle2 !== 0
                            )
                            tempQueue.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: bottle2,
                                bottle2: 0,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== bottle2 - one
                            )
                            tempQueue.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: one,
                                bottle2: bottle2 - one,
                            });
                        }
                        }
                }
                else if(bottle1 === one){
                    if (bottle2 === 0) {
                        if (one >= two) {
                            if (
                            father[father.length - 2].bottle1 !== one - two ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempQueue.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: one - two,
                                bottle2: two,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== one
                            )
                            tempQueue.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: 0,
                                bottle2: one,
                            });
                        }
                        } else if (bottle2 === two) {
                        if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle2
                        )
                            tempQueue.push({
                            action: 'Bỏ nước trong bình 1',
                            bottle1: 0,
                            bottle2,
                            });
                        if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== 0
                        )
                            tempQueue.push({
                            action: 'Bỏ nước trong bình 2',
                            bottle1,
                            bottle2: 0,
                            });
                        } else {
                        if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle2
                        )
                            tempQueue.push({
                            action: 'Bỏ nước trong bình 1',
                            bottle1: 0,
                            bottle2,
                            });
                        if (
                            father[father.length - 2].bottle1 !== bottle1 - (two - bottle2) ||
                            father[father.length - 2].bottle2 !== two
                        )
                            tempQueue.push({
                            action: 'Đổ bình 1 sang bình 2',
                            bottle1: bottle1 - (two - bottle2),
                            bottle2: two,
                            });
                        }
                }
                else{
                    if (bottle2 === 0) {
                        if (bottle1 >= two) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 - two ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempQueue.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: bottle1 - two,
                                bottle2: two,
                            });
                            if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempQueue.push({
                                action: 'Đổ đầy bình 2',
                                bottle1,
                                bottle2: two,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle1
                            )
                            tempQueue.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: 0,
                                bottle2: bottle1,
                            });
                            if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempQueue.push({
                                action: 'Đổ đầy bình 2',
                                bottle1,
                                bottle2: two,
                            });
                        }
                        } else if (bottle2 === two) {
                        if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== 0
                        )
                            tempQueue.push({
                            action: 'Bỏ nước trong bình 2',
                            bottle1,
                            bottle2: 0,
                            });
                        if (bottle2 <= one - bottle1) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 + two ||
                            father[father.length - 2].bottle2 !== 0
                            )
                            tempQueue.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: bottle1 + two,
                                bottle2: 0,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== two - (one - bottle1)
                            )
                            tempQueue.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: one,
                                bottle2: two - (one - bottle1),
                            });
                        }
                        } else {
                        if (bottle1 >= two - bottle2) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 - (two - bottle2) ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempQueue.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: bottle1 - (two - bottle2),
                                bottle2: two,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle1 + bottle2
                            )
                            tempQueue.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: 0,
                                bottle2: bottle1 + bottle2,
                            });
                        }
                        if (one - bottle1 <= bottle2) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 + bottle2 ||
                            father[father.length - 2].bottle2 !== 0
                            )
                            tempQueue.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: bottle1 + bottle2,
                                bottle2: 0,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== bottle2 - (one - bottle1)
                            )
                            tempQueue.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: one,
                                bottle2: bottle2 - (one - bottle1),
                            });
                        }
                        }
                }
                console.log(typeof bottle1)
            console.log('temp', tempQueue);
            let random = Math.floor(Math.random() * tempQueue.length);
            let newItem = tempQueue[random];
            queue.push(tempQueue[random]);
            setList((prev) => {
                return[...prev,newItem];
            })
            father.push(tempQueue[random]);
        }
    }
        father.shift();
        console.log(queue)
        
    }
    const handleDfs = () => {
        setList([]);
        let bottle1 = 0;
        let bottle2 = 0;
        let stack = [{action:'begin',bottle1,bottle2}];
        let father = [{action:'begin',bottle1,bottle2}]
        const one = parseInt(max1);
        const two = parseInt(max2);
        while (true) {
            let tempStack = [];
            let tempObject = stack.pop()
            
            console.log(tempObject?.action, tempObject?.bottle1, tempObject?.bottle2);
            if(tempObject !== undefined){
                bottle1 = tempObject.bottle1;
                bottle2 = tempObject.bottle2;
                
                if (bottle1 === parseInt(target) || bottle2 === parseInt(target)) {
                    console.log('Founded');
                    break;
                }
                if(bottle1 === 0){
                    if (bottle2 === 0) {
                        tempStack.push({
                            action: 'Đổ đầy bình 1',
                            bottle1: one,
                            bottle2: 0,
                        });
                        tempStack.push({
                            action: 'Đổ đầy bình 2',
                            bottle1: 0,
                            bottle2: two,
                        });
                    } else if (bottle2 === two) {
                        if (one >= two) {
                            tempStack.push({
                            action: 'Đổ bình 2 sang bình 1',
                            bottle1: two,
                            bottle2: 0,
                            });
                        } else {
                            tempStack.push({
                            action: 'Đổ bình 2 sang bình 1',
                            bottle1: one,
                            bottle2: two - one,
                            });
                        }
                        } else {
                        if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== bottle2
                        )
                            tempStack.push({
                            action: 'Đổ đầy bình 1',
                            bottle1: one,
                            bottle2: bottle2,
                            });
                        if (one >= two) {
                            if (
                            father[father.length - 2].bottle1 !== bottle2 ||
                            father[father.length - 2].bottle2 !== 0
                            )
                            tempStack.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: bottle2,
                                bottle2: 0,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== bottle2 - one
                            )
                            tempStack.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: one,
                                bottle2: bottle2 - one,
                            });
                        }
                        }
                }
                else if(bottle1 === one){
                    if (bottle2 === 0) {
                        if (one >= two) {
                            if (
                            father[father.length - 2].bottle1 !== one - two ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempStack.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: one - two,
                                bottle2: two,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== one
                            )
                            tempStack.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: 0,
                                bottle2: one,
                            });
                        }
                        } else if (bottle2 === two) {
                        if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle2
                        )
                            tempStack.push({
                            action: 'Bỏ nước trong bình 1',
                            bottle1: 0,
                            bottle2,
                            });
                        if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== 0
                        )
                            tempStack.push({
                            action: 'Bỏ nước trong bình 2',
                            bottle1,
                            bottle2: 0,
                            });
                        } else {
                        if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle2
                        )
                            tempStack.push({
                            action: 'Bỏ nước trong bình 1',
                            bottle1: 0,
                            bottle2,
                            });
                        if (
                            father[father.length - 2].bottle1 !== bottle1 - (two - bottle2) ||
                            father[father.length - 2].bottle2 !== two
                        )
                            tempStack.push({
                            action: 'Đổ bình 1 sang bình 2',
                            bottle1: bottle1 - (two - bottle2),
                            bottle2: two,
                            });
                        }
                }
                else{
                    if (bottle2 === 0) {
                        if (bottle1 >= two) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 - two ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempStack.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: bottle1 - two,
                                bottle2: two,
                            });
                            if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempStack.push({
                                action: 'Đổ đầy bình 2',
                                bottle1,
                                bottle2: two,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle1
                            )
                            tempStack.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: 0,
                                bottle2: bottle1,
                            });
                            if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempStack.push({
                                action: 'Đổ đầy bình 2',
                                bottle1,
                                bottle2: two,
                            });
                        }
                        } else if (bottle2 === two) {
                        if (
                            father[father.length - 2].bottle1 !== bottle1 ||
                            father[father.length - 2].bottle2 !== 0
                        )
                            tempStack.push({
                            action: 'Bỏ nước trong bình 2',
                            bottle1,
                            bottle2: 0,
                            });
                        if (bottle2 <= one - bottle1) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 + two ||
                            father[father.length - 2].bottle2 !== 0
                            )
                            tempStack.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: bottle1 + two,
                                bottle2: 0,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== two - (one - bottle1)
                            )
                            tempStack.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: one,
                                bottle2: two - (one - bottle1),
                            });
                        }
                        } else {
                        if (bottle1 >= two - bottle2) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 - (two - bottle2) ||
                            father[father.length - 2].bottle2 !== two
                            )
                            tempStack.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: bottle1 - (two - bottle2),
                                bottle2: two,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== 0 ||
                            father[father.length - 2].bottle2 !== bottle1 + bottle2
                            )
                            tempStack.push({
                                action: 'Đổ bình 1 sang bình 2',
                                bottle1: 0,
                                bottle2: bottle1 + bottle2,
                            });
                        }
                        if (one - bottle1 <= bottle2) {
                            if (
                            father[father.length - 2].bottle1 !== bottle1 + bottle2 ||
                            father[father.length - 2].bottle2 !== 0
                            )
                            tempStack.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: bottle1 + bottle2,
                                bottle2: 0,
                            });
                        } else {
                            if (
                            father[father.length - 2].bottle1 !== one ||
                            father[father.length - 2].bottle2 !== bottle2 - (one - bottle1)
                            )
                            tempStack.push({
                                action: 'Đổ bình 2 sang bình 1',
                                bottle1: one,
                                bottle2: bottle2 - (one - bottle1),
                            });
                        }
                        }
                }
                console.log(typeof bottle1)
            console.log('temp', tempStack);
            let random = Math.floor(Math.random() * tempStack.length);
            let newItem = tempStack[random];
            stack.push(tempStack[random]);
            setList((prev) => {
                return[...prev,newItem];
            })
            father.push(tempStack[random]);
        }
    }
        father.shift();
        console.log(stack)
        
    }
    return (
        <section className='bai2'>
            <div className='option'>
                <form className='target'>
                    <label for='target'>Mục tiêu: </label>
                    <input type='number'
                            value={target}
                            id='target'
                            name='target'
                            onChange={(e) => setTarget(e.target.value)}/>
                    
                </form>
            </div>
            <div className='jar-container'>
                <div className='section-left'>
                    <div className='center-item'>
                        <div className='relative'>
                            <img src={Img.jar} alt='jar' className='img'/>
                            <p className='water-item'>{jar1} L</p>
                        </div>
                        <div className='max-water'>
                            <p>max: </p>
                            <input type='number'
                                    placeholder='max bình 1'
                                    value={max1}
                                    onChange={(e) => setMax1(e.target.value)}
                                    
                                    />
                        </div>
                        <h3>Bình 1</h3>
                    </div>
                    <div className='center-item margin-top'>
                        <div className='relative'>
                            <img src={Img.jar} alt='jar' className='img2'/>
                            <p className='water-item'>{jar2} L</p>
                        </div>
                        <div className='max-water'>
                            <p>max: </p>
                            <input type='number'
                                    placeholder='max bình 1'
                                    value={max2}
                                    onChange={(e) => setMax2(e.target.value)}
                                    
                                    />
                        </div>
                        <h3>Bình 2</h3>
                    </div>
                </div>
                <div className='section-right'>
                    <button type='button' onClick={handleClick3}>Đổ đầy Bình 1</button>
                    <button type='button' onClick={handleClick4}>Đổ đầy Bình 2</button>
                    <button type='button' onClick={handleClick1}>Đổ Bình 1 sang Bình 2</button>
                    <button type='button' onClick={handleClick2}>Đổ Bình 2 sang Bình 1</button>
                    <button type='button' onClick={() => setJar1(0)}>Đổ Bỏ Bình 1</button>
                    <button type='button' onClick={() => setJar2(0)}>Đổ Bỏ Bình 2</button>
                </div>
            </div>
            <div className='bfs'>
                <button onClick={handleBfs}>Thuật toán BFS</button>
                <button onClick={handleDfs}>Thuật toán DFS</button>
                {list.length>0 && <h3>SHOW</h3>}
                <div className='show'>
                    {list.map((item,index)=>{
                        const {action,bottle1,bottle2} =item;
                        return(
                            <div key={index}>
                                <p>{action}</p>
                                <div>
                                    <p>Bình1: {bottle1}</p>
                                    <p>Bình1: {bottle2}</p>

                                </div>
                            </div>
                        );
                    })}
                </div>
                
            </div>
        </section>
    )
}

export default Bai2
