import { IncomingMessage } from "http";
export const addressManager = {
    saveAddressToStorage: (address: string) => {
      sessionStorage.setItem('address', address);
    },
    getAddressFromStorage: () => {
      const data = sessionStorage.getItem('address');
      return data;
    },
      // getAddressFromServer는 getServerSideProps에서 사용됩니다.
    getAddressFromServer: ( req: IncomingMessage
    ) => {
      const forwarded = req.headers['x-forwarded-for'];
      const ip =
        typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
      return ip;
    },
  };