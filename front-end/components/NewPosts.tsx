import Link from 'next/link';

import UseNewPosts from '@/hooks/useNewPosts';
import Data from '@/interface/projectT.interface';

import { relativeTime } from '@/helpers/date';
import { useEffect, useState } from 'react';

interface DataType{
  data: {
    content: Data[]
  },
  errorCode: number
}

const NewPosts = () => {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await UseNewPosts() as unknown as DataType;
      setData(result);
    }
    fetchData();
  }, []);
  
  if (!data) {
    return null;
  }
  const datas: Data[] = data.data.content;
  return (
    <div className='flex flex-col gap-4'>
      <div
        className='scrollbar-hide flex flex-1 flex-col gap-4 overflow-y-auto p-2 pb-5'>
        {datas?.map(({ id, title, createdAt, category }) => {
            const link = category === 'blog' ? `/blog/${id}` : `/today-i-learned`;

            return (
              <div key={createdAt}>
                <Link
                  href={link}
                  className='border border-divider-light dark:border-divider-dark recent-card'>
                  <div
                    className='mb-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400'>
                    <span
                      className='bg-accent-100 text-accent-900 flex h-5 items-center rounded-md px-1.5 text-[11px] font-black dark:bg-accent-800 dark:text-accent-100'>
                      {category.toUpperCase()} POST &nbsp; 🔥
                    </span>
                    <span>{relativeTime(createdAt)}</span>
                  </div>
                  <span className='text-base font-medium'>{title}</span>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default NewPosts;