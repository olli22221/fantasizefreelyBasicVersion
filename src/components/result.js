import React ,{  useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue,useResetRecoilState } from 'recoil'
import ScoreBox from './ScoreBox';
import { measure1 as measure1Atom,measure2 as measure2Atom,
    measure3 as measure3Atom,measure4 as measure4Atom,measure5 as measure5Atom,measure6 as measure6Atom,
    measure7 as measure7Atom,measure8 as measure8Atom, musicatResponse as musicatResponseAtom,originalityScore as originalityScoreAtom,
    fluencyScore as fluencyScoreAtom,flexabilityScore as flexabilityScoreAtom,
    submissions as submissionsAtom, jwtToken as jwtTokenAtom,
analogies as analogiesAtom, groups as groupsAtom, totalResult as totalResultAtom} from '../redux/store'
    
import { Progress } from 'react-sweet-progress';
import { Button } from '@mui/material';




function Result() {

    let nav = useNavigate();
    const maxTotalResult = 400
    
    const musicatResult = useRecoilValue(musicatResponseAtom);
    const analogies = useRecoilValue(analogiesAtom);
    const groups = useRecoilValue(groupsAtom);
    const totalResult = useRecoilValue(totalResultAtom);

    
    const [image, setImage] = useState("");
    const [submissions, setSubmissions] = useRecoilState(submissionsAtom);
    const [flexabilityScore, setFlexabilityScore] = useRecoilState(flexabilityScoreAtom);
    const [fluencyScore, setFluencyScore] = useRecoilState(fluencyScoreAtom);
    const [originalityScore, setOriginalityScore] = useRecoilState(originalityScoreAtom);
    const [jwtToken, setJwtToken] = useRecoilState(jwtTokenAtom);
    const [creativityCategory, setCreativityCategory] = useState(null);



    const nextComposition = () => {
        setFlexabilityScore(0)
        setFluencyScore(0)
        setOriginalityScore(0)
        nav("/compose")
    }

    const endTask = () => {
        setJwtToken([])
        setSubmissions(0)
        setFlexabilityScore(0)
        setFluencyScore(0)
        setOriginalityScore(0)
        nav("/")
        
    }

    useEffect(() => {

        console.log(totalResult)
        if (totalResult < 200) {
            setCreativityCategory(0)
            
        }
        else if(totalResult >= 200 && totalResult < 350) {
            setCreativityCategory(1)
        }
        else if(totalResult >= 350) {
            setCreativityCategory(2)
        }
        setImage("data:image/jpeg;charset=utf-8;base64,"+musicatResult)
        console.log(creativityCategory)


    },[musicatResult])
    


    return (

        <div>
            <div style={{backgroundColor:"#debd90" ,marginBottom:"30px",fontSize:"40px","fontWeight": "bold",textAlign:"center"}}> Grading your Composition  </div>

            <div style={{borderRadius:"30px",border:"dashed 10px #debd90",float:"left", margin:"25px",backgroundColor:"whitesmoke"}}>
           <div style={{marginTop:"30px",fontSize:"25px","fontWeight": "bold",textAlign:"center"}}> Musicats Listening Result </div>
                <img
                    width={1200}
                    height={700}
                    src= {image}
                />
                
            
            </div>
            <div>
                <div>
            <div style={{border:"solid 4px silver",borderRadius:"20px",backgroundColor:"#debd90" ,width:"400px", height:"300px", marginTop:"100px",alignItems:"center",display:"flex",justifyContent:"center"}}>
                <div style={{float:"left"}}>
                   
            <div style={{float:"left"}}>
                    <div style={{borderRadius:"8px",textAlign: "center",height:"30px",width:"130px","fontWeight": "bold",backgroundColor:"#399ddb" ,marginBottom:"30px"}}>
                    Creativity Score
                    </div>
            <Progress  type="circle" percent={(Math.floor((totalResult/maxTotalResult)*100))}  />
            </div>
            
            </div>
            </div>
            
            </div>
            {submissions < 5 && <Button onClick={nextComposition} style={{margin:"50px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"50px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}}>Next Composition</Button>}
            {submissions > 3 && <Button onClick={endTask} style={{margin:"50px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"50px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}}>End Task</Button>}


            </div>
            <div style={{backgroundColor:"#debd90",height:"350px"}}>
            {creativityCategory==2 && <div>    <span style={{fontSize: "200px", float:"left"}}>🤩</span>
                        <span style={{"fontWeight": "bold",fontSize: "50px"}}>WOW! That was highly creative. Congratulation!</span>
                        </div>}
            {creativityCategory==1 && <div>    <span style={{fontSize: "200px", float:"left"}}>😐</span>
                    <span style={{"fontWeight": "bold",fontSize: "40px"}}>That was moderately creative. Good Job but there is room for improvement! </span>
                    </div>}
            {creativityCategory==0 && <div>    <span style={{fontSize: "200px", float:"left"}}>😟</span>
                    <span style={{"fontWeight": "bold",fontSize: "40px"}}>That was not creative at all. You have to work on yourself!</span>
                    </div>}

                    </div>
            
        </div>


    );


    }



export default Result;