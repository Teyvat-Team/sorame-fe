import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactComponent as NotFoundIllustration } from '@/assets/illustration/not_found.svg';

import { Typography } from 'antd';
import { useLocale } from '@/locales';

const { Title } = Typography;

const { useRef, useState, useEffect, useMemo } = React;

interface NotFoundProps {
  title?: string;
  desc?: string;
}

const IllustrationWrapperSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const IllustrationSection = styled.section`
  display: flex;
  justify-content: center;
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: center;
`;

const DescSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const NotFoundIllustrator: React.FC<NotFoundProps> = (props: NotFoundProps) => {
  const { formatMessage } = useLocale();
  const { title = formatMessage({ id: 'gloabal.tips.notfound' }), desc = '' } =
    props;

  return (
    <IllustrationWrapperSection>
      <IllustrationSection>
        <NotFoundIllustration width={500} height={500} />
      </IllustrationSection>
      {title && (
        <TitleSection>
          <Title level={5}>{title}</Title>
        </TitleSection>
      )}
      {desc && <DescSection>{desc}</DescSection>}
    </IllustrationWrapperSection>
  );
};

export default NotFoundIllustrator;
