import Link from "next/link";

export const Layout = ({ children, nav }) => {
  return (
    <div className="container">
      <nav>
        {nav.data.menu.map((item, i) => {
          return(
            <Link href={`/${item.link.url}`} key={`nav${i}`}>
              {item.link.text}
            </Link>
          )
        })}
      </nav>
      {children}
    </div>
  );
};
