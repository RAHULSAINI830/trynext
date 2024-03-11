// import React, { useState } from 'react';
// import Autosuggest from 'react-autosuggest';

// const AutosuggestComponent = ({ suggestions, onSuggestionSelected, value, onChange }) => {
//   const [suggestionsList, setSuggestionsList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

//   const getSuggestions = (inputValue) => {
//     const inputValueLower = inputValue.trim().toLowerCase();
//     const inputLength = inputValueLower.length;

//     return inputLength === 0
//       ? []
//       : suggestions.filter(
//           (suggestion) =>
//             suggestion.property_name.toLowerCase().includes(inputValueLower) ||
//             (suggestion.address && suggestion.address.toLowerCase().includes(inputValueLower))
//         );
//   };

//   const onSuggestionsFetchRequested = ({ value }) => {
//     setSuggestionsList(getSuggestions(value));
//   };

//   const onSuggestionsClearRequested = () => {
//     setSuggestionsList([]);
//   };

//   const getSuggestionValue = (suggestion) => {
//     const queryLower = searchQuery.toLowerCase();
//     const propertyNameLower = suggestion.property_name.toLowerCase();
//     const locationLower = suggestion.address ? suggestion.address.toLowerCase() : '';

//     if (propertyNameLower.includes(queryLower)) {
//       return suggestion.property_name;
//     } else if (locationLower.includes(queryLower)) {
//       return suggestion.address;
//     }

//     return ''; // If neither property name nor location matches the query, return an empty string
//   };

//   const renderSuggestion = (suggestion) => {
//     const suggestionValue = getSuggestionValue(suggestion);

//     if (suggestionValue) {
//       return <div>{suggestionValue}</div>;
//     }

//     return null;
//   };
//   const clearInput = () => {
//     setSearchQuery('');
//     onChange(null, { newValue: '' }); // Clear the input value
//   };
//   return (
//     <div><Autosuggest
//       suggestions={suggestionsList}
//       onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//       onSuggestionsClearRequested={onSuggestionsClearRequested}
//       getSuggestionValue={getSuggestionValue}
//       renderSuggestion={renderSuggestion}
//       onSuggestionSelected={onSuggestionSelected}
//       inputProps={{
//         placeholder: 'Search by property name or location',
//         className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm',
//         value,
//         onChange: (event, { newValue }) => {
//           setSearchQuery(newValue); // Update the search query state
//           onChange(event, { newValue });
//         },
//       }}
//       theme={{
//         container: ' z-10  w-full',
//         suggestionsContainer: 'bg-white border border-gray-300 max-h-36 overflow-y-auto rounded-lg shadow-md', // Added shadow for the container
//         suggestion: 'p-2 cursor-pointer hover:bg-gray-100',
//         suggestionHighlighted: 'bg-blue-100',
//       }}
//     />
//     </div>
//   );
// };

// export default AutosuggestComponent;
export default function Autosuggest(){
  return(<></>)
}