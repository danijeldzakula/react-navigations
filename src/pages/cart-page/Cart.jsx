import Layout from '../../layouts/Layout';
import Header from './navbar';

export default function Cart(props) {
  const getCartItems = () => {
    if (typeof window !== 'undefined') {
      const items = window.localStorage.getItem('cart');

      if (!items) {
        return []
      } else { 
        return JSON.parse(items) || [];
      }
    }
  }

  const items = getCartItems().reverse();
  const itemsLength = items && items.length > 0;

  items.sort((first, second) => {
    if(first._id === 'sfbsdhfdshfhsd') return -1;
  });


  /***
   * Block for sort data
   */

  var array = ['apple','zebra','cherry','grap'];

  array.sort( (first, second) => {
    if(first === 'zebra') return -1;
  });
  
  array.sort( (first, second) => {
    if(second === 'zebra') return -1;
  });

  // console.log(array) // test case

  return (
    <Layout>
      <section className='section section__cart'>
        <div className='container'>
          <h2>Cart</h2>
        </div>

        <div className='container'>
          <Header.Header />
        </div>

        <div className='container'>
          {itemsLength ? (
            <div className="table" id="table">
              <div className="table__head table__head">
                <div className="thead">
                  <div className='tr'>
                    <div className="thead__span">Product</div>
                    <div className="thead__span">Description</div>
                    <div className="thead__span">Amount</div>
                    <div className="thead__span">Actions</div>
                  </div>
                </div>
              </div>
              <div className="table__body table__body">
                <div className="tbody">
                  {items.map((item) => {
                    return (
                      <div className="tr" key={item._id}>
                        <div className='tbody__span' data-key="Product">
                          <div className="inline-flex">{item.title}</div>
                        </div>
                        <div className='tbody__span' data-key="Description">
                          <div className="inline-flex">{item.description}</div>
                        </div>
                        <div className='tbody__span' data-key="Amount">
                          <div className="inline-flex">{item.qty}</div>
                        </div>
                        <div className='tbody__span' data-key="Actions">
                          <div className="inline-flex">
                            <button className="btn btn-small">Remove</button>
                          </div>
                        </div>                                                                                        
                      </div>
                    )
                  })}               
                </div>                            
              </div>
            </div>
          ) : (
            <div className='cart-fallback'>
              <h3>Your Cart is Empty!</h3>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}