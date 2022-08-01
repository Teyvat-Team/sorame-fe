import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/locales';
import NOtFoundIllustrator from '@/components/illustration/notFound/notFound';
import { css } from '@emotion/react';

const NotFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  return (
    <>
      <NOtFoundIllustrator />
      <section
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 12px;
        `}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate('/');
          }}
        >
          {formatMessage({ id: 'gloabal.tips.backHome' })}
        </Button>
      </section>
    </>
  );
};

export default NotFoundPage;
