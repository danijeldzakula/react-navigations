import { useState, useEffect } from 'react';
import Layout from '../../layouts/Layout';

const products = [
  { _id: 'fhsdfdsghfsdhf', title: 'Banana', description: 'It is a long established fact that a reader will be distracted.' },
  { _id: 'sfbsdhfdshfhsd', title: 'Kiwi', description: 'The point of using Lorem Ipsum is that it has a more-or-less normal.'},
  { _id: 'dfvbsdfbsdfhdh', title: 'Orange', description: 'Content here, content here, making it look like readable English.'},
  { _id: 'sdjkfsdjfdfdff', title: 'Lemon', description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum.'},
  { _id: 'sdfhfgdhgdfhgg', title: 'Strawberry', description: 'There are many variations of passages of Lorem Ipsum available, but the majority.'},
  { _id: 'hdfgdfghdfhgfh', title: 'Mango', description: 'Suffered alteration in some form, by injected humour, or randomised words which.'},
]

function Card({ handleAddToCart, item }) {
  const { title, description } = item;

  return (
    <div className='card'>
      <div className='card-image'>
        <h3>{title}</h3>
      </div>

      <div className='card-body'>
        <p>{description}</p>

        <button onClick={() => handleAddToCart(item)} type='button' className='btn'>
          <span className='icon'></span>
          <span className='text'>Add to cart</span>
        </button>
      </div>
    </div>
  )
}

export default function Home(props) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const product = JSON.parse(window.localStorage.getItem('cart'));

      if (product !== null) {
        return product || []
      }
    }

    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart]);

  const handleAddToCart = (product) => {
    const items = Object.assign({}, product);
    const index = cart && cart.findIndex(item => item._id === items._id);

    if (index === -1) {
      setCart((prev) => {
        return [ ...prev, { ...items, qty: 1 }];
      });
    } else {
      setCart((prev) => {
        return prev.map((item, idx) => {
          if (idx === index) {
            return { ...item, qty: item.qty + 1 };
          } 

          return item;
        })
      })
    }
  }

  function getProductItems(items) {
    if (!items || !Array.isArray(items)) return [];

    let products = [];

    for (const item of items) {
      if (item.variations.length > 0) {
        const variations = item.variations;
        const newObj = { 
          _id: item._id,
          name: item.name,
          qty: item.qty
        }

        for (const variation of variations) {
          delete variation._id;
          products.push({ ...newObj, ...variation })
        }
      } else {
        delete item.variations;
        products.push(item);
      }
    }

    const totalAmount = getTotalAmount(products)

    return {
      products,
      totalAmount
    };
  }

  function getTotalAmount(arr) {
    if (!arr || !Array.isArray(arr)) return 0;

    return arr.reduce((a, b) => {
      return a + b.qty;
    }, 0);
  }

  // GENERETED ALL OF THE SHIPPING CART PRODUCT OF VARIATIONS COMBINATION
  useEffect(() => {
    const products = [
      { 
        _id: 'fdsfjksfsdfsdsdfj', 
        name: 'Banana', 
        qty: 2,
        variations: []
      },
      { 
        _id: 'sdfjfjhdjfhsdjfhd', 
        name: 'Orange', 
        qty: 9,
        variations: [
          { _id: 'sdfjfjhdjfhsdjfhd_fjdhdjkfhsdjkf', qty: 2, units: ['xxl', 'black'] },
          { _id: 'sdfjfjhdjfhsdjfhd_kvlbkbvkvkvdii', qty: 7, units: ['ls', 'white'] }
        ] 
      },
      { 
        _id: 'dfjsdhjfhdjfjssjj', 
        name: 'Lemon', 
        qty: 7,
        variations: [
          { _id: 'dfjsdhjfhdjfjssjj_dshfdsfhdjfjdf', qty: 4, units: ['md', 'yellow'] },
          { _id: 'dfjsdhjfhdjfjssjj_dsfhksdfjdhddd', qty: 3, units: ['sm', 'green'] }
        ] 
      }      
    ];

    console.time('doSomething')
    const productsPayload = getProductItems(products)
    console.log({ productsPayload: productsPayload });
    console.timeEnd('doSomething')
  }, []);

  return (
    <Layout>
      <section className='section section__home section__home--hero'>
        <div className='container'>
          <h2>Products</h2>
        </div>

        <div className='container pt-4'>
          <div className='row'>
            {products.map(item => {
              return (
                <div className='col' key={item._id}>
                 <Card item={item} handleAddToCart={handleAddToCart} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}
