import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const LeftPanelLoader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={446}
    height={694}
    viewBox="0 0 446 694"
    backgroundColor="#17191d"
    foregroundColor="#32353b"
    {...props}
  >
    <path d="M 3 85.5 h 443" />
    <rect x="0" y="29" rx="10" ry="10" width="283" height="33" />
    <rect x="5" y="126" rx="10" ry="10" width="283" height="33" />
    <rect x="0" y="0" rx="10" ry="10" width="283" height="21" />
    <rect x="5" y="170" rx="10" ry="10" width="283" height="53" />
    <rect x="5" y="257" rx="10" ry="10" width="439" height="437" />
  </ContentLoader>
);

export default LeftPanelLoader;
