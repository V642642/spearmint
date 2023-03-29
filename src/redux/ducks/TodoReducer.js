import { createSlice } from '@reduxjs/toolkit'



export const addLegSlice = createSlice({
  name: 'addleg',
  initialState : [],
  reducers: {
    addLeg: (state, action) => {
      return [...state , action.payload]
    },
    deleteLeg: (state , action) => {
      const array = [...state];
      const newArray = array.filter(data => data.id !== action.payload)
      return newArray
    },
  },
})


export const { addLeg, deleteLeg } = addLegSlice.actions

export default addLegSlice.reducer