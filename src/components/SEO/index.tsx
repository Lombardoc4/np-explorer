import { useEffect, useState } from 'react';

const SEO = ({
  title,
  description,
  name,
  type,
}: {
  title: string;
  description: string;
  name?: string;
  type?: string;
}) => {
  const [load, setLoad] = useState(false);
  title = 'NPE | ' + title;
  useEffect(() => {
    setLoad(true);
  }, []);

  if (!load) return null;
  return (
    <>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {/* End Twitter tags */}
    </>
  );
};

export default SEO;
