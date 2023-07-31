import React, { useState } from 'react';
import Layout from '../../layouts/Layout';

const data = [
    { _id: 'fjksdhfjksdhfjksdf', title: 'Pepsi', qty: 3, eligible: ['WIC'] },
    { _id: 'fdfgdfgdfgfgweweww', title: 'Chips', qty: 5, eligible: ['WIC'] },
    { _id: 'gtgkgdficmsxicsows', title: 'Paper', qty: 2, eligible: [] }
];

export default function SignIn(props) {
    const [products, setProducts] = useState(data);

    const [items, setItems] = useState({
        wic: products.filter(({ eligible }) => eligible.includes('WIC')).map((product) => ({ ...product, currentQty: product.qty })),
        rest: products.map((product) => ({ ...product, currentQty: product.qty })),
        products: products.map((product) => ({ ...product, currentQty: product.qty })),
        selected: []
    });

    const onClick = ({ state, action }) => {
        if (action.type === 'decrease') {
            setItems((prev) => {
                // wic
                let wic = prev.wic;
                let findIndex = wic.findIndex((w) => w._id === state._id);
                let findElement = wic.find((w) => w._id === state._id);

                // rest
                let rest = prev.rest;
                let findRestIndex = rest.findIndex((r) => r._id === state._id);
                let findRestElement = prev.products.find((p) => p._id === state._id);

                findElement.currentQty = findElement.currentQty - 1;

                if (findElement.currentQty <= 1) {
                    findElement.currentQty = 1
                }

                let restCurrentQty = findRestElement.currentQty - findElement.currentQty;
                findRestElement = {
                    ...findRestElement,
                    currentQty: restCurrentQty
                }

                let oldRestElement = rest.filter((r) => r._id !== state._id);       

                if (findIndex === -1) {
                    return {
                        ...prev,
                        wic: { ...wic, findElement }
                    }
                } else {
                    if (findRestIndex === -1) {
                        return {
                            ...prev,
                            rest: [ ...rest, findRestElement ]
                        }
                    } else {
                        return {
                            ...prev,
                            rest: [...oldRestElement, findRestElement]
                        }
                    }
                }
            });
        }

        if (action.type === 'increase') {
             setItems((prev) => {
                // wic
                let wic = prev.wic;
                let findIndex = wic.findIndex((w) => w._id === state._id);
                let findElement = wic.find((w) => w._id === state._id);

                // rest
                let rest = prev.rest;
                let findRestIndex = rest.findIndex((r) => r._id === state._id);
                let findRestElement = prev.products.find((p) => p._id === state._id);

                findElement.currentQty = findElement.currentQty + 1;
                
                if (findElement.currentQty >= findElement.qty) {
                    findElement.currentQty = findElement.qty
                }

                let restCurrentQty = findRestElement.currentQty - findElement.currentQty;
                findRestElement = {
                    ...findRestElement,
                    currentQty: restCurrentQty
                }
         
                let oldRestElement = rest.filter((r) => r._id !== state._id);       

                if (findIndex === -1) {                    
                    return {
                        ...prev,
                        wic: { ...wic, findElement }
                    }
                } else {
                    if (findRestIndex === -1) {
                        return {
                            ...prev,
                            rest: oldRestElement
                        }
                    } else {
                        if (findRestElement.currentQty < 1) {
                            return {
                                ...prev,
                                rest: oldRestElement
                            }
                        }

                        return {
                            ...prev,
                            rest: [...oldRestElement, findRestElement]
                        }
                    }
                }
            });
        }

        if (action.type === 'selected') {
            const { checked, value } = action.event.target;
            
            if (checked) {
                setItems((prev) => {
                    let rest = prev.rest.filter((p) => p._id !== state._id);
                    let selected = [ ...prev.selected, value ]
                    return {
                        ...prev,
                        rest: rest,
                        selected: selected
                    };
                });
            } else {
                setItems((prev) => {
                    let prevRest = prev.rest;
                    let rest = prev.products.find((p) => p._id === state._id);
                    let selected = prev.selected.filter((p) => p !== value);

                    rest.currentQty = rest.qty;
                    return {
                        ...prev,
                        rest: [...prevRest, rest],
                        selected: selected
                    };
                });
            }
        }
    }
 
    return (
        <Layout>
            <section className='section section__payment'>
                <div className='container'>
                    <Wic products={items.wic} selected={items.selected} onClick={onClick} />
                    <hr className='hr' />
                    <Rest products={items.rest} />
                </div>
            </section>
        </Layout>
    )
}

function Wic({ products, selected, onClick }) {
    return (
        <div style={{ display: 'grid', gridGap: '15px' }}>
            <h3>Wic Purchase</h3>

            {products.map((product) => {
                return (
                    <div style={{ display: 'flex', gridGap: '15px', alignItems: 'center', justifyContent: 'space-between' }} key={product._id}>
                        <div className='left' style={{ display: 'flex', gridGap: '15px' }}>
                            <input checked={selected.includes(product._id)} name='checkbox' value={product._id} id={product._id} type='checkbox' onChange={(e) => onClick({ state: product, action: { type: 'selected', event: e }})} />    
                            <label htmlFor={product._id}>
                                <p>{product.title} {isWic(product.eligible)} - ({product.currentQty})</p>
                            </label>
                        </div>

                        <div className='right' style={{ display: 'flex', gridGap: '15px' }}>
                            <button disabled={isDisabled(selected.includes(product._id))} onClick={() => onClick({ state: product, action: { type: 'decrease' } })} type='button'>-</button>
                            <span>{product.currentQty}</span>
                            <button disabled={isDisabled(selected.includes(product._id))} onClick={() => onClick({ state: product, action: { type: 'increase' } })} type='button'>+</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function Rest({ products }) {
    return (
        <div style={{ display: 'grid', gridGap: '15px' }}>
            <h3>Rest to pay</h3>

            {products.map((product) => {
                return (
                    <div style={{ display: 'flex', gridGap: '15px' }} key={product._id}>
                        <p>{product.title} {isWic(product.eligible)} - ({product.currentQty})</p>
                    </div>
                )
            })}
        </div>
    )
}

// Helpers Function
function isWic(eligible) {
    const isAllowed = 'WIC';
    if (eligible.includes(isAllowed)) {
        return <span style={{ color: 'red' }}>{isAllowed}</span>
    }
} 

function isDisabled(selected) {
    return !selected;
}