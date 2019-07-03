import React from 'react'

// need to pass props to cmpnt
export default function linkCard(props) {
  const {link} = props
  return (
    <div>
      <a target="_blank" href={`${link.url}`}>
        <div>
          <h4 className="link-title">{link.title}</h4>
          <img src={link.favicon} alt="favicon" />
          <div className="description-tag">
            <p>{link.description}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
