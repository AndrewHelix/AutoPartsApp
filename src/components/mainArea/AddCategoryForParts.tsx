export function AddCategoryForParts({name, items, onChange }: { name: string, items: string[], onChange: Function }) {
  return (
    <>
      {items.map((item) => (
        <div key={item}>
          <input
            type="radio"
            name={name}
            key={item}
            id={item}
            value={item}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </>
  );
}
