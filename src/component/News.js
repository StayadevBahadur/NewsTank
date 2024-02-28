import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',

  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,

  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      currentPage: 1,
      totalResult: 0,
      date: 1
    }
  }
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    this.props.setProgress(100);
    this.setState({
      currentPage: this.state.currentPage,
      articles: parsedData.articles,
      totalResult: parsedData.totalResults,
      loading: false,
      date: parsedData.publishedAt,

    })

  }
  // updateNews = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.currentPage}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })

  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.articles,
  //     loading: false,
  //     totalResult: parsedData.totalResults,

  //   })


  // }
  //  {this.state.loading && <Spinner />}
  // handlePrevPage = async () => {
  //   this.setState({ currentPage: this.state.currentPage - 1 })
  //   this.updateNews();

  // }
  // handleNextPage = async () => {
  //   this.setState({ currentPage: this.state.currentPage })
  //   this.updateNews();
  // }
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.currentPage + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResult: parsedData.totalResults,
      currentPage: this.state.currentPage + 1,
    })


  }

  render() {



    return (

      <div className='container my-3'>
        {this.state.loading && <Spinner />}
        <h2 className='text-center'>Today's Top-Headlines</h2>
        <InfiniteScroll
        
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((element, index) => {
                return <div className="col-md-3 my-3" key={index}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} ImageUrl={!element.urlToImage ? `https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg` : element.urlToImage} newsUrl={element.url} author={element.author ? element.author : 'Unkown'} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} />
                </div>
              }

              )}
            </div>
          </div>
        </InfiniteScroll>
        {/* {!this.state.loading && <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark " onClick={this.handlePrevPage} disabled={this.state.currentPage === 1}>&laquo;Previous</button>
          <span>Page {this.state.currentPage}</span>
          <button type="button" className="btn btn-dark " onClick={this.handleNextPage} disabled={this.state.currentPage + 1 > Math.ceil(this.state.totalResult / 12)}>Next&#8250;</button>
        </div>} */}




      </div>
    )
  }
}

export default News
