import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const MultiSelect = ({otherRooms,setOtherRooms}) => {

    const colourOptions = [
      { value: 'Pooja', label: 'Pooja' },
      { value: 'Study', label: 'Study' },
      { value: 'Servant', label: 'Servant' },
    ]
    const handleRoomSelection = (selectedRooms) => {
    // Update the selected rooms
    setOtherRooms(selectedRooms);
  };
    // console.log(otherRooms)
  return (
    <>
     <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      placeholder="Example: Pooja"
      className='mt-2 border  border-blue-600 rounded-md'
      isMulti
      options={colourOptions}
      onChange={setOtherRooms}
    />

    </>
  )
}

export default MultiSelect
