
'use client'

import { useState, useEffect } from 'react'

const AppAlert = ({error}) => {

  return (
    <>
    { error && (<div className="alert alert-danger text-center">{error}</div>) }
    </>
  )
}

export default AppAlert