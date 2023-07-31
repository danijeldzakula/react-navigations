export default function Header(props) {
  return (
    <div className='cart-header'>
        <ul>
            <li>Your Cart</li>
            <li className='disabled'>Shipping Address</li>
            <li className='disabled'>Payment Method</li>
        </ul>
    </div>
  )
}