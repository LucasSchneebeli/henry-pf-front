export default function Order(props){
    
    function handleClick(e){
        if(e.target.value === "ascending"){
            props.setDisplayedMotorcycles([...props.displayedMotorcycles.sort((a, b) => a.price - b.price)])
        } else if (e.target.value === "descending"){
            props.setDisplayedMotorcycles([...props.displayedMotorcycles.sort((a, b) => b.price - a.price)])
        }
    }

    return<>
    <h3>Order by price</h3>
    <input type="radio" value="ascending" name="order" id="ascending" onClick={handleClick} ref={props.refAsc}/> <label htmlFor="ascending">Ascending</label>
    <input type="radio" value="descending" name="order" id="descending" onClick={handleClick} ref={props.refDesc}/> <label htmlFor="descending">Descending</label>
    </>
}