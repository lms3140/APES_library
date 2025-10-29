export function Menu({ href, name, click }) {
  console.log(name);
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
