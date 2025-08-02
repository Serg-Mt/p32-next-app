import { memo, useCallback, useRef, useState } from 'react';

class Item {
  id = Math.random() + '-' + Date.now();
  checked = false;
  text = '-default-';
  constructor(text) {
    Object.assign(this, { text }); //this.text = text;
  }


  toggleCheck() {
    return Object.assign(new Item, this, { checked: !this.checked });
  }
}

const Button = memo(function Button({ onClick, children }) {
  console.log('Button render', children);
  return <button onClick={onClick}>{children}</button>
});

/**
 * 
 * @param {object} props
 * @param {Item} props.item
 * @returns {JSX.Element}
 */
function ToDoItem({ item, delItem, toggleCheck }) {
  console.log('Item render', item.text);
  const onClick = useCallback(() => delItem(item.id), []);
  return <li>
    <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.id)} />
    {item.text}
    {item.checked && '✔'}
    <Button onClick={onClick}> ❌</Button>
  </li>
}

const ToDoItemPure = memo(ToDoItem);



const Form = memo(function Form({ addItem }) {
  const
    [value, setValue] = useState('-text-'),
    onClick = useCallback(() => addItem(ref.current), []),
    ref = useRef(null);
  ref.current = value;
  console.log('Form render');
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={event => setValue(event.target.value)} />
    <Button onClick={onClick}>➕</Button>
  </fieldset>
});

export function ToDoApp() {
  console.log('ToDoApp render');
  const
    [list, setList] = useState([new Item('Дело 1'), new Item('Дело 2')]),
    addItem = useCallback(text => setList(prev => [...prev, new Item(text)]), []),
    delItem = useCallback(id => setList(prev => prev.filter(el => id !== el.id)), []),
    toggleCheck = useCallback(id => setList(prev => {
      const
        index = prev.findIndex(el => id === el.id),
        elem = prev[index];
      return prev.with(index, elem.toggleCheck());
    }), []);


  return <>
    <Form addItem={addItem} />
    <List list={list} delItem={delItem} toggleCheck={toggleCheck} />
  </>
}




function List({ list, delItem, toggleCheck }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <ToDoItemPure key={item.id} item={item} delItem={delItem} toggleCheck={toggleCheck} />)}
    </ol>
  </fieldset>
}








