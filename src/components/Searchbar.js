import React, {useRef} from 'react';

const Searchbar = props => {

    const searchText = useRef(null);
    
    const handleSubmit = event => {
        event.preventDefault();
        props.search(searchText.current.value);
        event.currentTarget.reset();
    }
    
    return(
        <form onSubmit={event => handleSubmit(event)}>
            <input type="search" ref={searchText} name="search" placeholder="Search.."/>
            <button type="submit">Search</button>
        </form>
    );
}

export default Searchbar;