import { DEFAULT_URL } from "@/config";
import { useState } from "react";

export 

const Sign = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");

    async function createUser() {

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append('Content-Type', 'application/json')
        requestHeaders.append('Access-Control-Allow-Origin', '*')
        requestHeaders.append('Access-Control-Allow-Credentials', 'true')
        requestHeaders.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, locale')
        requestHeaders.append('Access-Control-Allow-Methods', '*')
        
        const body = JSON.stringify({ nickname, email, password })
        console.log(body);
    
        try {
            const res = await fetch(`${DEFAULT_URL}/auth/signup`, {
                method: 'POST',
                headers: requestHeaders,
                body: body
            });
    
            if (!res.ok) {
                console.error('데이터를 보내는데 문제가 발생했습니다.');
                return;
            }
    
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('데이터를 가져오는데 문제가 발생했습니다.', error);
        }
    }

    return (
        <>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-slate-300 text-sm font-bold mb-2"
          >
            Nickname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nickname"
            type="text"
            placeholder="Nickname"
            required
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <label
            className="block text-gray-700 dark:text-slate-300 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-slate-300 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={createUser}
          >
            Sign in
          </button>
        </div>
        </>
    )
}

export default Sign;