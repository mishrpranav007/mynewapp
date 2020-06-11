import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

let bookList = [
  {"title":"Hunger Games","author":"Roxane Grey","pages":"304"},
  {"title":"The Sun Also Rises","author":"Ernest Hemingway","pages":"260"},
  {"title":"White's Teeth","author":"Zadie Smith","pages":"480"},
  {"title":"Cat's Cradle","author":"Kurt Vonnengut","pages":"340"},

]
const Book = ({title,author,pages,freeBookmark}) => {
    return(
      <section>
          <h2>{title}</h2>
          <p>by:{author}</p>
          <p>Pages:{pages} pages</p>
    <p>Free Book Mark : {freeBookmark === true ? 'yes!' : 'no!'}</p>
      </section>
    )
}

const Hiring = () => {

    return(
      <div>
         <p>The library is hiring.Go to the official site www.library.com/jobs for more info</p>
      </div>
    )
}

const NotHiring = () => {

  return(
    <div>
       <p>The library is not hiring.Check back later for more info</p>
    </div>
  )
}

 class Library extends Component{

  state = {
    isopen : true,
    freeBookmark : false,
    hiring: false,
    data:[],
    loading:false
  };

  componentDidMount() {
      this.setState({loading : true});
      fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
      .then(data => data.json())
      .then(data => this.setState({data,loading:false}))
  }

  componentDidUpdate(){
    console.log("Component has just updated here");
  }

  toggleOpenorClosed = () => {
    this.setState({isopen : !this.state.isopen});
  }

   
 render(){
    const {books} = this.props
    return(
    <div>

    {this.state.hiring === true ? <Hiring /> : <NotHiring />}

    {this.state.loading ?
        "loading..." : 
         <div>
          {this.state.data.map(product => {
              return(
                <div key={product.id}>
                    
                   <h3>Library Product of the Week!</h3>
                   <p>Product Name : {product.name}</p>
                   <img src={product.image} alt="" height={100} />
                </div>
              )
          })}
        </div>
   }

    <h1>The library is {this.state.isopen ? 'open' : 'closed'}</h1>

    <button onClick={this.toggleOpenorClosed}>Click Me!</button>

         {books.map(
           (book,i) =>  
               <Book 
                  key={i}
                  title={book.title} 
                  author={book.author} 
                  pages={book.pages} 
                  freeBookmark={this.state.freeBookmark}
                />

         )}

      </div>
    )
   }
 }

Library.propTypes = {
  books : PropTypes.array
}
ReactDOM.render(
  <Library books={bookList} />,
  document.getElementById('root')
);