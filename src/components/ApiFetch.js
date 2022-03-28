
import firebase from '../data/firebase'
import axios from "axios"
import { useEffect, useState } from "react"

import Search from "./Search";

const ApiFetch = () => {


    const [robots, setRobots] = useState([]);
    const [errorAPI, setErrorAPI] = useState('');
    const [inputSearch, setInputSearch] = useState('');
    const [inputSearchTag, setInputSearchTag] = useState('');
    const [tagInput, setTagInput] = useState('');

    const [array, SetArray] = useState([]);

    const [indexArr , setIndexArr] = useState([]);
    const [contenu, setContenu] = useState([]);

    const [filteredData, setFilteredData] = useState([]);
    const [display, setDisplay] = useState(false);

    const [robotId, setRobotId] = useState('')
    const [tag, setTag] = useState({})

    const [grades, setGrades] = useState([])

    useEffect(() => {
        axios({
            url: "https://api.hatchways.io/assessment/students",
        }).then((response) => {
            setRobots(response.data.students);
            setFilteredData(response.data.students);
            console.log(robots)
        }).catch((error) => {
            if (error.response) {
                setErrorAPI('Sorry our API is unable to get the necessary information!')
            }
        })
    }, [])

    const handleChange = (searchValue) => {
        setInputSearch(searchValue);
        if (inputSearch !== '') {
            const filtered = robots.filter((robot) => {
                return Object.values(robot).join('').toLowerCase().includes(inputSearch.toLowerCase())
            })
            setFilteredData(filtered)
        }else{
            setFilteredData(robots)
        }
    }

    
    const handleClick = (robotId) => {
        setRobotId(robotId)
        setDisplay(!display)
        const preview = robots.find((robot) => robot.id == robotId)
        setGrades(preview.grades)
    }

    
    const handleTagName = (index, event) => {
        setTagInput(event.target.value)
    
    }

    const handleDisplay = (robotIdTag) => {
        // const dbRef = firebase.database().ref(`${robotIdTag}`)
        const dbRef = firebase.database().ref()
        dbRef.on('value', response => {
            const data = response.val()
            let newArr = {}
            for (let key in data) {
                newArr = Object.assign(data, key)
            }
            SetArray(newArr)
        })
    }
    

    array.map((array, index) => {

        let indexArr1 = []
        let contenu1 = []
        return(

            <li key={index}>

                {console.log(array, "array", index, "index")}
                {indexArr1.push(index)}
                
            </li>
        )
        //console.log(indexArr1)
    })
    //console.log(contenu)


    const handleSubmit = (robotIdTag, event) => {
        event.preventDefault();
        const dbRef = firebase.database().ref(`${robotIdTag}`)
        if (tagInput) {
            dbRef.push(tagInput)
        } 
        handleDisplay(robotIdTag)
    }

    const handleTagSearch = (tagValue) => {
        setInputSearchTag(tagValue);
        if (inputSearchTag !== '') {
            const filtered = tag.filter((robot) => {
                return Object.values(robot).join('').toLowerCase().includes(inputSearchTag.toLowerCase())
            })
            setFilteredData(filtered)
        }else{
            setFilteredData(robots)
        }
    }


    return (
        <div className="wrapper">
            <div className="ApiError">{errorAPI}</div>

            <label htmlFor="text"></label>
            <input type="text" id="text" value={inputSearch} onChange={(event) => handleChange(event.target.value)} placeholder="Search by name"/>

             
            <label htmlFor="tagSearch"></label>
            <input type="text" id="tagSearch" value={inputSearchTag} onChange={(event) => handleTagSearch(event.target.value)} placeholder="Search by tag"/>
            

            <ul>
                {
                    filteredData.map((robot, index) => {
                        return (
                          
                            <li key={robot.id}>
                                <div className="container">
                                    <img
                                        src={robot.pic}
                                        alt={robot.firstName}
                                    />
                                    <div className="innerContainer">
                                        <h2>{robot.firstName} {robot.lastName}</h2>
                                        <div className="info">
                                            <p>Email : {robot.email}</p>
                                            <p>Company: {robot.company}</p>
                                            <p>Skill: {robot.skill}</p>
                                            <p>Average: {robot.grades.reduce((a, b) => a + parseInt(b), 0) / robot.grades.length} %</p>
                                           

                                            {/* { 
                                                index == indexArr
                                            } */}
                                            
                                            {/* {tag} */}
                                            {/* {
                                                arrayOfObj.forEach((element, array, indexAr) => {
                                                    // array = index ? (
                                                    //     setTag(element)
                                                    // ) : (null)

                                                    // let newArr = []
                                                    // for (let key in element) {
                                                    //     newArr = Object.assign(element, key)
                                                    // }

                                                    
                                                    //console.log(newArr)

                                                    console.log(element, "element")
                                                    console.log(array, "array")
                                                    console.log(indexAr, "indexAr")
                                                })
                                            } */}
                                            {/* {tag} */}
                                                {/* {objts.forEach((element, indexAr, array) => {
                                                    console.log(element)
                                                    (indexAr == index) ? (
                                                        setTag(element)
                                                    ) : (null)
        
                                                })} */}
                                            {/* {Object.keys(objts).map(key => {
                                                const value = objts[key]

                                                const nested = value[key]
                                                //console.log(value, "value")
                                                
                                                //console.log(key, "key")
                                                
                                                    
                                            })} */}
                                            <form onSubmit={(e) => handleSubmit(`${robot.id}`, e)}>
                                                
                                                <label htmlFor="tags"></label>    
                                                <input 
                                                    type="tags" 
                                                    placeholder="Add a tag"
                                                    key={robot.id}
                                                    name={robot.id}
                                                    value={tagInput.index}
                                                    onChange={(e) => handleTagName(index, e)}/>
                                            </form>   
                                           
                                                    
                                            
                                            { (display && (robot.id == robotId)) ? (
                                                <div className="grades">
                                                    {grades.map((grade, index) => {
                                                        return(
                                                            <li key={robot.id}>
                                                                <p>Test {index + 1}</p>{grade} %
                                                            </li> 
                                                        )
                                                    })}
                                                </div>
                                            ): (null)}
                                            
                                        </div>
                                    </div>  
                                </div>
                                <button onClick= {() => handleClick(robot.id)}></button>
                            </li>
                        )                   
                    })
                }
            </ul>

        </div>
    )
}

export default ApiFetch