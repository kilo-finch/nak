import React from 'react'

// need to pass props to cmpnt
export default function linkCard(props) {
  return (
    <div>
      <h4 className="link-title">{props.title}</h4>
      <img src={props.favicon} alt="favicon" />
      <div className="description-tag">
        <p>{props.description}</p>
      </div>
    </div>
  )
}
