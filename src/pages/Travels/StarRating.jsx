import { Stack, Rating } from '@mui/material'
import { useState } from 'react'
import { useGlobalState } from "../../utils/stateContext";

export const StarRating = () => {
  const [value, setValue] = useState(null)
  const { dispatch } = useGlobalState();

  const handleChange = (event ) => {
    setValue(parseInt(event.target.value))
    dispatch({
      type: "setRating",
      data: event.target.value
    })
  }
  return (
    <Stack spacing={2}>
      <Rating
        value={value}
        onChange={handleChange}
        precision={0.5}
        style={{color:"black"}}
      />
    </Stack>
  )
}