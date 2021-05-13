import ContentLoader from 'react-content-loader';

export default function CardLoader(props: any) {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={97}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="17" y="29" rx="2" ry="2" width="78" height="72" />
      <rect x="103" y="32" rx="0" ry="0" width="50%" height="15" />
      <rect x="104" y="57" rx="0" ry="0" width="30%" height="15" />
      <rect x="103" y="83" rx="0" ry="0" width="70%" height="15" />
    </ContentLoader>
  );
}
