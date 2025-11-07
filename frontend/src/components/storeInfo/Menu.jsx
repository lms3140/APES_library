export function Menu({ href, name, click }) {
  return (
    <a
      href={href}
      onClick={() => {
        click(name);
      }}
    >
      {name}
    </a>
  );
}
