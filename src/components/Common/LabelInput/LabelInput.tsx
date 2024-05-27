import React from 'react'

interface inputprops{
    label?:string;
    placeholder?:string;
    type?:string;
    id?:string;
}
const LabelInput:React.FC<inputprops> = ({label,placeholder,type,id}) => {
  return (
  <div className="w-full px-3 mb-10">
  <label className="block uppercase tracking-wide text-dark text-sm font-bold mb-2">
    {label}
  </label>
  <input className="appearance-none block w-full bg-gray-200 text-dark border mt-4 border-gray-200 rounded py-5 px-5 leading-tight focus:outline-none focus:bg-white focus:border-dark outline-dark" id={id} type={type} placeholder={placeholder} />
</div>

  )
}

export default LabelInput