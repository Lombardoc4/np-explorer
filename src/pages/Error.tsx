import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Header } from "../components/Header";
import App from "../Layout";

export default function ErrorPage() {
  const error: any = useRouteError();
  let errorMsg;
  if (isRouteErrorResponse(error)) {
    errorMsg = `${error.status} - ${error.statusText}`;
  } else {
    errorMsg = error.message || "Unknown Error"
  }


  return (
    <App>
      <Header
        title={errorMsg}
        description={<h2>
          {/* Fill Advertising */}
          Oops, let's go back to the <Link to="/">HOME PAGE</Link>
        </h2>}
      />
    </App>
  );
}