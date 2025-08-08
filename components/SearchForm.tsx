import React from 'react'
import Form from "next/form"
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({ query }: { query?: string }) => {
  // const query = 'Test';

  return (
    <Form action='/' scroll={false} className='search-form max-w-3xl w-full min-h-[72px] bg-white border-[5px] border-black rounded-[80px] text-[20px] mt-8 px-5 flex flex-row items-center gap-5'>
      <input
        name='query'
        role='search'
        defaultValue={query}
        placeholder='Search for startups, pitches, or entrepreneurs...'
        className='flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none'
      />

      <div className='flex gap-2'>
        {query && <SearchFormReset />}

        <button type='submit' className='search-btn size-[45px] rounded-full bg-black flex justify-center items-center !important text-white cursor-pointer'>
          <Search className='size-5'/>
        </button>
      </div>
    </Form>
  )
}

export default SearchForm