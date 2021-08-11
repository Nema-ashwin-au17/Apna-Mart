import './index.css'
import { add_to_Cart, remove_from_cart } from '../../actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const Carouselitem = (props) => {
    const dispatch = useDispatch()
    const { itemname, itemdetails } = props

    const { count, price, image } = itemdetails
    const [itemcount, setitemcount] = useState(count)
    const disabled = count < 20 ? "" : "disabled"

    const Add_to_cart = () => {
        dispatch(add_to_Cart({ item: itemname }))
        setitemcount(itemcount + 1)
    }

    const Remove_from_cart = () => {
        dispatch(remove_from_cart({ item: itemname }))
        setitemcount(itemcount - 1)
    }

    return (
        <>
            <div className="productcarousel border ms-2">
                <div className="productcarouselimage text-center">
                    <img src={image} className="cardimage"/>
                </div>
                <span className="text-center">{itemname}</span>
                <span className="text-center">Rs. {price}</span>

                {itemcount == 0 ? <button onClick={Add_to_cart} className="btn btn-warning">Add to cart</button> : <>
                    <div className="addingbutton">
                        <button onClick={Remove_from_cart} className="btn btn-warning cartbutton rounded-circle d-flex justify-content-center">-</button>
                        <div className="itemcarouselcount">{itemcount}</div>
                        <button onClick={Add_to_cart} className={`btn btn-warning cartbutton rounded-circle d-flex justify-content-center ${disabled}`}>+</button>

                    </div>
                </>}
            </div>
        </>
    )
}

export default Carouselitem