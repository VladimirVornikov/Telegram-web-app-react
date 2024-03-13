import React from 'react'

export default function Button() {
  return (
    <button {...props} className={'button' + props.className}>
        <X></X>
    </button>
  )
}
