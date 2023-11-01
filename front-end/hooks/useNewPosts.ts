import { DEFAULT_URL } from '@/config';
import Data from '@/interface/projectT.interface';

interface DataType{
  data: {
      content: Data[]
  },
  errorCode: number
}

const UseNewPosts = async() => {
  try {
    const requestHeaders: HeadersInit = new Headers();
    const res = await fetch(`${DEFAULT_URL}/api/projects?size=3`, {
        method: 'GET',
        headers: requestHeaders,
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
    const repo: DataType = await res.json();
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
export default UseNewPosts;