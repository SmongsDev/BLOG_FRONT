import { DEFAULT_URL } from '@/config';
import TagType from '@/interface/projectT.interface';

const UseTag = async() => {
    try {
      const res = await fetch(`${DEFAULT_URL}/api/tags`, {
          method: 'GET'
      });
  
      if (!res.ok) {
        return {
          props: {
              repo: {
              errorCode: res.status,
              data: { content: [] },
              },
          },
        };
      }
      const repo: TagType = await res.json();
      return { repo };
  } catch (error) {
      console.error('데이터를 가져오는데 문제가 발생했습니다.', error);
      return {
          props: {
          repo: {
              errorCode: 500,
              data: { content: [] },
          },
          },
      };
  }
  }
  export default UseTag;