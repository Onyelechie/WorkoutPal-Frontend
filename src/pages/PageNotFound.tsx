import { useAppNavigation } from "../hooks/useAppNavigation";

export default function PageNotFound() {
  const { navHome } = useAppNavigation();

  return (
    <>
      {/* Inline styles used here to avoid bloating CSS files */}
      <div style={{ textAlign: "center", padding: "2em" }}>
        <h1>Page not found! {":("}</h1>
        <button onClick={navHome}>Go back to home page</button>
      </div>
    </>
  );
}
