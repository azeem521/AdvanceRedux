import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY=[
  {
    id:'p1',
    title:'First',
    price:6,
    description:'This is a first product - amazing!'
  },
  {
    id:'p2',
    title:'Second',
    price:12,
    description:'This is a Second product - amazing!'
  },
  {
    id:'p3',
    title:'Third',
    price:8,
    description:'This is a Third product - amazing!'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY.map((prod)=>(
            <ProductItem
            key={prod.id}
            id={prod.id}
          title={prod.title}
          price={prod.price}
          description={prod.description}
        />
          ))
        }
        
      </ul>
    </section>
  );
};

export default Products;
