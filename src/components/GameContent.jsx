import { useState, useEffect } from "react";
import '../style/GameContent.css'
import _ from 'lodash';

function GameContent() {

    function ImageClickedEvent(id){

            RamdomOrganize();

            IsTheSameAsTheLastOne( id )
    
        }

    function RamdomOrganize(){

    // This function shuffles the position of the objects in the array
    // It will not change any element, but rearrange the elements in the DOM thanks to setImagesData

            setImagesData( prevData => _.shuffle(prevData) )

    }

    function IsTheSameAsTheLastOne(idSelected) {
        // Check if the image clicked is the same as the one clicked before it
        if (idSelected === id) {
            // If equal, check if the score is greater than the best score
            if (score > bestScore) {
                // If greater, update the best score
                setBestScore(score);
            }
            // Reset the ID and score
            setId(null);
            setScore(0);
        } else {
            // If not equal, increment the score by 1
            setScore(prevScore => prevScore + 1);
            // Set the ID of the clicked image
            setId(idSelected);
        }
    }

    useEffect(() => {

        const ApiCall = () => {
          
            fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(res => {
        
                const resAr = res.results

                resAr.forEach(element => {
                    
                    setImagesData(prevImagesUrl => [...prevImagesUrl, {id: element.login.uuid,
                    imageurl: element.picture.large
                    }]);
                    console.log(resAr)

                });
        
            })

        };

        ApiCall();
    
        return () => {
          
        };
      }, [])

    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [ImagesData, setImagesData] = useState([]);
    const [id, setId] = useState(null);

    return (
        <div id="GameContentDiv">
            <div id="DataDiv">
                <p className="RegularText">Score: {score}</p>
                <p className="RegularText">Best score: {bestScore}</p>
            </div>

            <div id="ImageCardDiv">
            {
                ImagesData.map((element) => (
                    <img key={element.imageurl} src={element.imageurl} alt="image" className="ImageDiv" onClick={() => ImageClickedEvent(element.imageurl)}/>
                ))
            }
            </div>

        </div>    
    );
}

export default GameContent;
