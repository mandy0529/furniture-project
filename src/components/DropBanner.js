import React, {useEffect, useState} from 'react';

const google = 'https://www.google.com/intl/ko/chrome/';
const edge = 'https://www.microsoft.com/ko-kr/edge';

const DropBanner = () => {
  const [isIe, setIsIe] = useState(false);
  const isIE = () => {
    if (
      navigator.userAgent.indexOf('MSIE') !== -1 ||
      !!document.documentMode === true
    ) {
      setIsIe(true);
    }
  };

  useEffect(() => {
    isIE();
  }, []);

  return (
    <>
      {isIe ? (
        <div className="drop-banner">
          지금 귀하가 사용하고 계신 Internet Explorer 브라우저는 지원이 곧 종료
          됩니다. <br /> 더 나은 서비스를 Microsoft Edge 혹은 Google Chrome
          브라우저에서 이용 가능합니다.
          <br />
          <div className="homepage">
            <a href={google} target="_blank" rel="noreferrer">
              Chrome
            </a>
            <a href={edge} target="_blank" rel="noreferrer">
              Edge
            </a>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default DropBanner;
