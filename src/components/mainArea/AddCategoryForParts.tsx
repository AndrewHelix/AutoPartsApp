export function AddCategoryForParts({value, items, onChange }: { value: string, items: string[], onChange: Function }) {
  return (
    <>
      {items.map((item) => (
        <div key={item}>
          <input
            type="radio"
            name={value}
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
