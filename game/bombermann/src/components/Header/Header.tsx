import React from "react";
import './Header.scss'

export class Header extends React.Component {

  public render(): JSX.Element {
    return (
      <div className='header'>
        <img src='/header_pic.png'/>
        <small className="text-muted grey">*Typo on purpose</small>
      </div>
    )
  }

  
}