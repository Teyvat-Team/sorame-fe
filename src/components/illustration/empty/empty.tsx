import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactComponent as EmptyIllustration } from '@/assets/illustration/empty.svg';

import { Typography } from 'antd';

const { Title } = Typography;

const { useRef, useState, useEffect, useMemo } = React;

interface EmptyProps {
  title?: string;
  desc?: string;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
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
`;

const Empty: React.FC<EmptyProps> = (props: EmptyProps) => {
  const { title = '没有数据', desc = '', style = {}, titleStyle = {} } = props;

  return (
    <IllustrationWrapperSection style={style}>
      <IllustrationSection>
        <EmptyIllustration width={380} height={380} />
      </IllustrationSection>
      {title && (
        <TitleSection style={titleStyle}>
          <Title level={5}>{title}</Title>
        </TitleSection>
      )}
      {desc && <DescSection>{desc}</DescSection>}
    </IllustrationWrapperSection>
  );
};

export default Empty;
