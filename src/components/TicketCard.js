import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const TicketCard = ({
  title,
  description,
  date,
  price,
  type,
  onEdit,
  onDelete,
  id,
}) => {
  let colorClass = ''

  switch (type) {
    case 'premium':
      colorClass =
        'bg-gradient-to-r from-red-500 via-yellow-500 to-yellow-400 text-white'
      break
    case 'Movie':
      colorClass =
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
      break
    case 'normal':
      colorClass =
        'bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500 text-white'
      break
    default:
      colorClass =
        'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
      break
  }

  return (
    <div className='shadow-md rounded-md overflow-hidden'>
      <div className={`px-4 py-2 ${colorClass} font-bold text-center relative`}>
        <h1 className='text-lg'>{title}</h1>
        <div className='absolute right-0 top-0 mt-2 mr-2'>
          <button onClick={() => onEdit(id)} className='text-white mr-2'>
            <FaEdit />
          </button>
          <button onClick={() => onDelete(id)} className='text-white'>
            <FaTrash />
          </button>
        </div>
      </div>
      <div className='px-4 py-2'>
        <p className='text-gray-700 text-sm'>{description}</p>
      </div>
      <div className='px-4 py-2'>
        <span className='bg-gray-200 rounded-full py-1 px-3 text-sm font-semibold text-gray-700 mr-2'>
          {type}
        </span>
        <span className='text-gray-600 text-sm'>{date}</span>
      </div>
      <div className={`px-4 py-2 ${colorClass} font-bold text-center relative`}>
        <span className='text-xl'>{price}</span>
      </div>
    </div>
  )
}

export default TicketCard
