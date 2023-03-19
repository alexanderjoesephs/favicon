import {useState, useEffect} from "react";
import './App.css';
import Searchbar from "./components/Searchbar"

function App() {
  const [query, setQuery] = useState(null);
  const [icon, setIcon] = useState({});
  const [loading, setLoading] = useState(false);

useEffect(  () => {
  
  if(query!==null){
    setLoading(true);
    let activeFetch = true;
    if(!query.includes('.')){
      setQuery((prevQuery)=> prevQuery + ".com" )
    }
    
    fetch(`https://favicongrabber.com/api/grab/${query}`)
    .then(response => response.json())
    .then(responseData => {
      if(activeFetch){
        setIcon(responseData)
        setLoading(false);
      }
    })
    .catch(error=>{
      console.log('error fetching and parsing data' + error)
      setIcon({error: error})
    });
    return () => {activeFetch=false}
  }
}, [query])


  

  const handleSearch = searchText =>{
    setQuery(searchText)
  }

  

  const findBiggest = (array) => {
    if (array!== undefined){
      let result = array.filter( obj => 'sizes' in obj && obj.sizes!=="any" )
      if(result.length===0){
        return array;
      }
      let sizes = result.map(obj => obj.sizes)
      for(let i=0;i<sizes.length;i++){
        let index = sizes[i].indexOf('x')
        sizes[i] = parseInt(sizes[i].slice(0, index))
      }
      let index = sizes.indexOf(Math.max(...sizes))
      let biggest =  result[index];
      return [biggest];
    }
    else return array;
  }



  const responseValid = () => {
    console.log('look')
    if (Object.keys(icon).length === 0){
      return false;
    }
    if ("error" in icon){
      return false;
    }
    if(icon.icons.length===0){
      console.log('its empty')
      return false;
    }
    else return true;
  }
  
  
  console.log(icon)
  responseValid();
  return (
    <div className="App">
      <h1>Favicon scraper</h1>
      <Searchbar search={handleSearch} />
      <br/>
      {  responseValid() && !loading ? <img   alt="favicon" src={findBiggest(icon.icons)[0].src}  ></img>  :"" }
      {!responseValid() && !loading && query!==null ?<h3>Error, couldn't retrieve favicon</h3>:"" }
      {loading? <h3>Loading..</h3>:""}
      
    </div>
  );
}

export default App;
//