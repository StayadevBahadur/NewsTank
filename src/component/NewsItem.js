import React, { Component } from 'react'
export class NewsItem extends Component {
  
  render() {
    let {title,description,ImageUrl,newsUrl,key,author,date,source} = this.props;
    return (
      <div>
        <div className="card" key={key} >
        <span className="position-absolute border border-1 top-0  translate-middle badge rounded-pill bg-danger" style={{left:"77%", zIndex :"1",width:"10rem"}}>{source}</span>
          <img src={ImageUrl} className="card-img-top" alt="..." style={{height:"100%"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target = "_blank"  rel="noreferrer" className="btn btn-dark btn-sm">Read more</a>
            <p className="card-text"><small className="text-body-secondary">By { author} on {date}</small></p>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
