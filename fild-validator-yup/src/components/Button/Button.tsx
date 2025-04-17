import { FC } from 'react'

interface IButton{
    state:boolean
}

export const Button:FC<IButton> = ({state}) => {
  return (
    <>
     <button type="submit" disabled={!state} >Send</button>
    </>
  )
}
