import React from "react"

export default function Meme() {
        const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });
    
    const [allMemes, setAllMemes] = React.useState([]);
    const [currentMemeNode, setCurrentMemeNode] = React.useState(null);
    const [headMemeNode, setHeadMemeNode] = React.useState(null);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                setAllMemes(data.data.memes);
                const randomNumber = Math.floor(Math.random() * data.data.memes.length);
                setMeme(prevMeme => ({
                    ...prevMeme,
                    randomImage: data.data.memes[randomNumber].url
                }));
            });
    }, []);
    
    function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    const newMemeNode = {
      topText: meme.topText,
      bottomText: meme.bottomText,
      randomImage: url,
      next: currentMemeNode,
    };

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));

    setCurrentMemeNode(newMemeNode);
    if (!headMemeNode) {
      setHeadMemeNode(newMemeNode);
    }
  }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function prevMemeImage() {
        if (currentMemeNode && currentMemeNode.next) {
          const prevMemeNode = currentMemeNode.next;
          setMeme({ 
            topText: prevMemeNode.topText,
            bottomText: prevMemeNode.bottomText,
            randomImage: prevMemeNode.randomImage,
          });
          setCurrentMemeNode(prevMemeNode);
        }
      }
    
    return (
        <main>
                <div className="form">
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                    <button 
                        className="form--button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image
                    </button>
                </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div>
                <div className="form">
                <button
                    className="form--button"
                    onClick={prevMemeImage}
                >
                    previousImage
                </button>

                </div>
            </div>
        </main>
    )
}