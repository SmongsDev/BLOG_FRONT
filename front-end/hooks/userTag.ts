import TagType from '@/interface/projectT.interface';

const useTag = async() => {
    try {
      const res = await fetch(`https://http://ec2-15-165-14-252.ap-northeast-2.compute.amazonaws.com:8080/api/tags`, {
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
  export default useTag;