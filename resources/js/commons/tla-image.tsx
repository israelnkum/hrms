import React from 'react';
import { Avatar, Image } from 'antd';
import PropTypes from 'prop-types';
import { getInitials } from '../utils';

interface TlaImageProps {
  src?: string | null;
  size?: number;
  name?: string;
  preview?: boolean;
}

const TlaImage: React.FC<TlaImageProps> = ({
  src = null,
  size = 120,
  name = "Default User",
  preview = false,
}) => {
  return (
    src ? (
      <Avatar
        className={'bg-primary-500'}
        size={size}
        src={preview ? <Image src={src} /> : src}
      >
        {getInitials(name)}
      </Avatar>
    ) : (
      <Avatar
        className={'bg-primary-500 border border-white'}
        size={size}
        src={src}
      >
        {getInitials(name)}
      </Avatar>
    )
  );
};

export default TlaImage;

TlaImage.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  name: PropTypes.string,
  preview: PropTypes.bool
}
